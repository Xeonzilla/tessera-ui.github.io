---
title: Button component
order: 2
---

# Button

```rust
pub fn button(
    args: impl Into<ButtonArgs>,
    ripple_state: Arc<RippleState>,
    child: impl FnOnce(),
)
```

The `button` component is a button typically used to trigger an action. It can configure background color, border, shadow, and other properties. It supports click interactions and advanced effects such as a ripple animation.

## Arguments

- `args: impl Into<ButtonArgs>`

This argument configures the style and behavior of the `button` component, including background color, border, shadow, corner radius, etc. Use `ButtonArgsBuilder` to construct this argument.

- `ripple_state: Arc<RippleState>`

The state for the click ripple animation. You must provide a valid `RippleState` instance to enable the ripple animation. This differs from the `surface` component, whose `ripple_state` parameter can be passed as `None` to disable the ripple.

- `child: impl FnOnce()`

The child component of the `button`, which can be any `#[tessera]` function.

## Preview

![button](/button_example.gif)
