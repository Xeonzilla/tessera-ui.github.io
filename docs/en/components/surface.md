---
title: Surface component
order: 1
---

# Surface

```rust
pub fn surface(
    args: SurfaceArgs,
    ripple_state: Option<Arc<RippleState>>,
    child: impl FnOnce(),
)
```

The `surface` component, as the name suggests, is a surface component, commonly used as a background or container for other components. It can set background color, border, shadow and other properties, and supports click interactions and ripple animations. It is the foundation for many interactive components.

## Arguments

- `args: SurfaceArgs`

This argument configures the style and behavior of the `surface` component, including background color, border, shadow, corner radius, etc. Use `SurfaceArgsBuilder` to build this argument.

- `ripple_state: Option<Arc<RippleState>>`

The state used for the click ripple animation. Passing `None` disables the ripple animation.

- `child: impl FnOnce()`

The child component of `surface`, can be any `#[tessera]` function.

## Preview

![surface](/surface_example.png)
