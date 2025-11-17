---
title: Button
order: 2
---

# Button

```rust
pub fn button(
    args: impl Into<ButtonArgs>,
    ripple_state: RippleState,
    child: impl FnOnce(),
)
```

The `button` component is a button typically used to trigger an action. It can configure background color, border, shadow, and other properties. It supports click interactions and advanced effects such as a ripple animation.

## Arguments

- `args: impl Into<ButtonArgs>`

  This argument configures the style and behavior of the `button` component, including background color, border, shadow, corner radius, etc. You can use `ButtonArgsBuilder` to construct this argument.

- `ripple_state: RippleState`

  The state for the click ripple animation. You must provide a valid `RippleState` instance to enable the ripple animation. `RippleState` is a clonable struct that encapsulates a shared reference to the state internally.

- `child: impl FnOnce()`

  The child component of the `button`, which can be any `#[tessera]` function.

## Preview

![button](/button_example.gif)
