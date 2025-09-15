---
title: Glass Button
order: 13
---

# Glass Button

```rust
pub fn glass_button(
    args: impl Into<GlassButtonArgs>,
    ripple_state: Arc<RippleState>,
    child: impl FnOnce() + Send + Sync + 'static,
)
```

The `glass_button` component is a glass-style button built on top of the `fluid_glass` component. It is typically used to trigger an action and can be considered the glass variant of the `button` component. It supports configuring background color, border, refraction, dispersion, etc., and provides click interactions, ripple animations, and other advanced effects.

## Arguments

- `args: impl Into<GlassButtonArgs>`

  This argument configures the style and behavior of the `glass_button` component, including background color, border, refraction, dispersion, and other properties. Use `GlassButtonArgsBuilder` to construct it.

- `ripple_state: Arc<RippleState>`

  The state for the click ripple animation. You must provide a valid `RippleState` instance to enable the ripple effect. This differs from the `fluid_glass` component.

- `child: impl FnOnce() + Send + Sync + 'static`

  The child component of `glass_button`, can be any `#[tessera]` function.

## Preview

![glass_button](/glass_button_example.gif)
