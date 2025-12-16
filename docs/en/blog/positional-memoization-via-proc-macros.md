---
title: Positional Memoization via Proc Macros in a Rust UI Framework
date: 2025-12-15T16:56:00+08:00
author: shadow3
githubName: shadow3aaa
---

# Positional Memoization via Proc Macros in a Rust UI Framework

Before diving in, I want to introduce what Tessera is. Tessera is a declarative, immediate-mode UI framework for Rust that emphasizes a friendly development experience through functional components while striving for extensibility and high performance.

One of the key goals for Tessera v3 is to introduce the `remember` mechanism. This will allow Tessera to truly support stateful components, avoiding the unconditional state hoisting issues common in traditional immediate-mode UIs. The feature is now complete, and the API design has been finalized. My primary focus has shifted to porting the complete MD3 component library, which will take some time. Therefore, now is a good time (while the details are still fresh in my mind) to explain the changes `remember` will bring to Tessera.

## The Problem with Full State Hoisting

Previously, Tessera was more like an immediate-mode GUI (imgui) that used functions to express components. We couldn't store state inside components, so all state had to be hoisted outside the component.

At that time, the signature of a component with animation state looked like this:

```rust
pub fn switch(args: impl Into<SwitchArgs>, state: SwitchState);
```

Here, `SwitchState` is a struct containing all state fields, such as whether the switch is currently on, the progress of the animation, etc. To use it, the user had to create and maintain this state outside the component:

```rust
let switch_state = state.switch_state.clone();
switch(
    SwitchArgs::default(),
    switch_state,
);
```

This was inconvenient because, most of the time, the parent component doesn't care about the switch's internal state, nor should it manipulate it. Only two things matter to the parent: whether it's toggled on, and its style. `SwitchArgs` is sufficient to express this. Passing an extra `SwitchState` serves no practical purpose for the parent component.

### State Bloat and Naming Issues

Here is a more complex example. We have a `layer0` component containing a `layer1` component, which in turn contains a `switch` component.

```rust
struct Layer1State {
    switch_state: SwitchState,
}

#[tessera]
fn layer1(state: Layer1State) {
    let switch_state = state.switch_state.clone();
    switch(
        SwitchArgs::default(),
        switch_state,
    );
}

struct Layer0State {
    layer1_state: Layer1State,
}

#[tessera]
fn layer0(state: Layer0State) {
    let layer1_state = state.layer1_state.clone();
    layer1(layer1_state);
}
```

As shown above, state hoisting leads to a lot of boilerplate code, especially when components are deeply nested. The boilerplate becomes very verbose because the parent component's state must explicitly include the state of every child component.

Worse still, state hoisting makes component reuse a major headache because you are forced to invent a name for the state of each new component instance. Consider this scene, which has fewer component declarations but is even more annoying:

```rust
struct LayerState {
    switch1_state: SwitchState,
    switch2_state: SwitchState,
    switch3_state: SwitchState,
    // ...
}

#[tessera]
fn foo(state: FooState) {
    let switch1_state = state.switch1_state.clone();
    switch(
        SwitchArgs::default(),
        switch1_state,
    );
    let switch2_state = state.switch2_state.clone();
    switch(
        SwitchArgs::default(),
        switch2_state,
    );
    let switch3_state = state.switch3_state.clone();
    switch(
        SwitchArgs::default(),
        switch3_state,
    );
    // ...
}
```

_There are only two hard things in Computer Science: cache invalidation and naming things._ And this is precisely a naming problem. Now we have to name the state for every stateful component, even though this state plays no part in the parent component's logic and exists solely to be passed down to the child. No one can truly figure out what it should be called, or if it has any meaning other than turning the state into a mess.

### Clone Hell

Another issue is "Clone Hell".

In Tessera, the process of rendering a component to the screen is divided into four stages:

- **Build Stage:** Executes component functions, naturally generating the component tree from the call stack bottom-up.
- **Measure and Place Stage:** Calculates the size and position of each component; some basic components generate corresponding draw commands.
- **Event Handling Stage:** Processes user input events and updates component state.
- **Paint Stage:** Submits draw commands to the GPU for rendering.

The first three stages all need access to component state. To ensure state is accessible across these four stages while allowing the measure and place stage to be parallelized, we generally wrap component state in `Arc<Lock<T>>`. However, being a functional UI framework, Tessera makes heavy use of `FnOnce` to represent child component types. Variables captured by `FnOnce` closures are moved into the closure, so they must be cloned before moving to avoid ownership issues.

Perhaps an example will clarify. Suppose we have a stateful animation component that grows one pixel wider each time it is clicked.

```rust
struct AnimatedBoxState {
    width: Arc<AtomicUsize>,
}

#[tessera]
fn animated_box(state: AnimatedBoxState) {
    let width = state.width.clone();

    let width_for_measure = width.clone();
    measure(Box::new(move |input| {
        let width = width_for_measure.load(Ordering::SeqCst);
        let width = Px::new(width as i32);
        Ok(ComputedData {
            height: Px::new(100),
            width,
        })
    }));

    let width_for_input = width.clone();
    input_handler(Box::new(move |input| {
        let pressed = // ... check if box is pressed ...
        if pressed {
            width_for_input.fetch_add(1, Ordering::SeqCst);
        }
        input.cursor_events.clear();
    }));
}
```

Both `width_for_measure` and `width_for_input` must clone `width`. Now imagine you are using 50 `animated_box` components inside a column and want to reuse the same state for each item. You would have to write `let animated_box_state_for_xxx = animated_box_state.clone()` 50 times. This is Clone Hell.

## Memoized State

The role of `remember` is to create state within a component that persists across frames.

```rust
#[tessera]
fn counter() {
    let count = remember(|| 0);
    count.with_mut(|c| *c += 1);
}
```

Now, when the `counter` component is built for the first time, `remember` creates a state with an initial value of 0. It increments it by 1 on every render. This state is only destroyed when the component is not built in a given frame.

Readers familiar with React or Compose might find this API very familiar; its design is indeed similar to React's `useState` and Compose's `remember`. However, unlike React hooks, `remember` has far fewer restrictions. You don't have to follow [`rules-of-hooks`](https://react.dev/reference/rules/rules-of-hooks); you can safely use it inside control flow statements like `if`, `loop`, `match`, etc.

However, components like virtual lists may not build all child components every frame. Using `remember` naively could cause state to drift to the next visible component instance. In such cases, you need to use a `key` to specify a stable identifier within a scope, allowing `remember` to correctly bind the state to the component instance.

`remember` perfectly solves the state hoisting problem mentioned earlier. Now, state that is irrelevant to the parent component can be kept directly inside the child component. This means the previous `layer0`/`layer1`/`switch` example can be simplified to:

```rust
#[tessera]
fn layer1() {
    switch(SwitchArgs::default());
}

#[tessera]
fn layer0() {
    layer1();
}
```

Similarly, the naming issue with multiple switch components is also resolved.

```rust
#[tessera]
fn foo() {
    switch(SwitchArgs::default());
    switch(SwitchArgs::default());
    switch(SwitchArgs::default());
}
```

Furthermore, `remember` solves the Clone Hell problem. The key lies in its return value. `remember` does not return an `Arc<Lock<T>>`, but a `State<T>`. This is a lightweight `Copy` handle, so it can be easily moved into `FnOnce` closures without any ownership transfer or cloning.

Now, the `animated_box` example above can be rewritten as:

```rust
#[tessera]
fn animated_box() {
    let width = remember(|| Px::new(100));

    measure(Box::new(move |input| {
        Ok(ComputedData {
            height: Px::new(100),
            width: width.get(),
        })
    }));

    input_handler(Box::new(move |input| {
        let pressed = // ... check if box is pressed ...
        if pressed {
            width.with_mut(|w| {
                *w += Px::new(1);
            });
        }
        input.cursor_events.clear();
    }));
}
```

## Complementary Features

In addition to `remember`, Tessera v3 introduces some similar but distinct features, such as the `context` feature for the theming system. `context` is orthogonal to `remember`. `context` is used to pass data across multiple levels of the component tree but cannot persist state across frames, while `remember` persists state across frames within a component but cannot pass data across component tree levels. Combining these features will greatly optimize Tessera's state management experience and code conciseness.

## Implementation Principles

The `remember` mechanism is essentially **positional memoization**. As far as I know, the earliest exploration of this mechanism in Rust UI was Raph Levien's [crochet](https://github.com/raphlinus/crochet). It used the then-new `#[track_caller]` feature to achieve this (I won't discuss the hooks mechanism used by libraries like Dioxus here; although they are broadly positional mechanisms, they have more restrictions). `#[track_caller]` allows a function to obtain the source code location of its caller via `std::panic::Location::caller()`, which can be used as a unique identifier for the state. This is feasible, but it has significant limitations, and ultimately, it is part of `std::panic` and not designed for this purpose.

Therefore, Tessera's `remember` mechanism does not use `#[track_caller]`. Instead, it employs a more complex but reliable procedural macro analysis mechanism. The `#[tessera]` procedural macro rewrites control flows like `if`, `loop`, and `match` to insert `GroupGuard`. After processing, various control flows look something like this:

```rust
if condition {
    let _group_guard = ::tessera_ui::runtime::GroupGuard::new(#group_id);
    original_statement;
}

for item in iterator {
    let _group_guard = ::tessera_ui::runtime::GroupGuard::new(#group_id);
    original_statement;
}

match value {
    Pattern1 => {
        let _group_guard = ::tessera_ui::runtime::GroupGuard::new(#group_id_1);
        original_statement_1;
    }
    Pattern2 => {
        let _group_guard = ::tessera_ui::runtime::GroupGuard::new(#group_id_2);
        original_statement_2;
    }
    // ...
}

loop {
    let _group_guard = ::tessera_ui::runtime::GroupGuard::new(#group_id);
    original_statement;
}
```

According to RAII principles, `_group_guard` is dropped immediately when the scope ends. Its `Drop` implementation tells Tessera that the current control flow block has finished. In this way, Tessera can precisely track the control flow position of every `remember` call, generating a unique identifier based on the actual runtime control flow position, thus achieving reliable state memoization.

Unfortunately, due to the limitations of macro expansion order, Tessera's `remember` mechanism currently does not fully support usage inside declarative macros. Since macros are not yet expanded at this stage, the `tessera` procedural macro cannot know the control flow structure inside the macro and therefore cannot generate correct identifiers for `remember` calls. For now, you must avoid using `remember` (or calling components that use it) inside macros unless the code generated by the declarative macro does not contain control flow that affects `remember`. Solving this would require future Rust support for influencing macro expansion order in some way.

State storage, i.e., `State<T>`, is implemented as a controllable Arena GC. You can refer to [gc-arena](https://github.com/kyren/gc-arena) for similar concepts. Tessera uses a specialized, lightweight implementation that marks states as live each frame based on calls to `remember`. States not marked are cleared at the end of the frame.
