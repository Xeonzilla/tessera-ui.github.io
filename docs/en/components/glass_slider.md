---
title: Glass Slider component
order: 15
---

# Glass Slider

```rust
pub fn glass_slider(
    args: impl Into<GlassSliderArgs>,
    state: Arc<RwLock<GlassSliderState>>,
)
```

The glass_slider component displays an interactive slider that allows selecting a value within a range. It is the glass variant of the `slider` component. The component supports configuring background color, border, refraction, dispersion, and more, and provides drag interaction.

## Arguments

- `args: impl Into<GlassSliderArgs>`

  This argument configures the style of the glass_slider component, including size, color, border, etc. Use `GlassSliderArgsBuilder` to construct it.

- `state: Arc<RwLock<GlassSliderState>>`

  This argument manages the state of the glass_slider component, including the current value.

## Preview

![glass_slider](/glass_slider_example.gif)