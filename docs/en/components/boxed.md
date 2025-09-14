---
title: Boxed component
order: 8
---

# Boxed

```rust
pub fn boxed<F>(args: BoxedArgs, scope_config: F)
where
    F: FnOnce(&mut BoxedScope<'_>),
```

The `boxed` component is used to stack a set of child components.

Unlike other container components, `boxed` requires you to use methods like `BoxedScope::child` to add children, instead of calling child component functions directly inside the closure.

::: warning
If you attempt to call child component functions directly inside the closure, the `boxed` component will panic at runtime.
:::

Below is a correct example of using `boxed`:

```rust
use tessera_ui_basic_components::{
    boxed::{boxed, BoxedArgs},
    surface::{surface, SurfaceArgs},
    text::text,
};

boxed(
    BoxedArgs {
        alignment: Alignment::Center,
        ..Default::default()
    },
    |scope| {
        scope.child(|| {
            surface(
                SurfaceArgs {
                    width: DimensionValue::from(Dp(300.0)),
                    height: DimensionValue::from(Dp(300.0)),
                    ..Default::default()
                },
                None,
                || {},
            )
        });
        scope.child(|| text("test"));
    },
);
```

## Arguments

- `args: BoxedArgs`

  This argument configures the `boxed` component's style, including width, height, alignment, etc. You can use `BoxedArgsBuilder` to construct it.

- `scope_config: F`

  A closure used to add child components into the `boxed` component. The closure receives a `&mut BoxedScope` and you should use its `child`, `child_weighted`, etc. methods to add children.

## Preview

![boxed](/boxed_example.png)
