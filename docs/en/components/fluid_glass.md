---
title: Fluid Glass
order: 12
---

# Fluid Glass

```rust
pub fn fluid_glass(
    args: FluidGlassArgs,
    ripple_state: Option<Arc<RippleState>>,
    child: impl FnOnce(),
)
```

The `fluid_glass` component is typically used as a background or container for other components. It can set color, border, shadow, and other properties, and supports click interaction, refractive background distortion, Gaussian blur, dispersion, ripple animation, and other advanced effects. It can be considered a glass-version of the `surface` component.

## Arguments

- `args: FluidGlassArgs`

  This argument configures the style and behavior of the `fluid_glass` component, including color, border, shadow, corner radius, blur intensity, refractive index, and other properties. Use `FluidGlassArgsBuilder` to construct it.

- `ripple_state: Option<Arc<RippleState>>`

  The state for the click ripple animation. Passing `None` disables the ripple animation.

- `child: impl FnOnce()`

  The child component of `fluid_glass`, can be any `#[tessera]` function.

## Preview

<video width="640" height="360" autoplay loop muted>

<source src="/fluid_glass_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
