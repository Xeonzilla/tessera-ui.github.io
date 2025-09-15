---
title: Glass Switch
order: 14
---

# Glass Switch

```rust
pub fn glass_switch(
    args: impl Into<GlassSwitchArgs>,
    state: Arc<RwLock<GlassSwitchState>>,
)
```

The glass_switch component is a glass-style switch that toggles between on and off states. It is the glass variant of the `switch` component. The component supports configuring background color, border, refraction, dispersion, and more, and provides click interaction.

## Arguments

- `args: impl Into<GlassSwitchArgs>`

  This argument configures the style of the glass_switch component, including size, color, border, etc. Use `GlassSwitchArgsBuilder` to construct it.

- `state: Arc<RwLock<GlassSwitchState>>`

  This argument manages the state of the glass_switch component, including whether it is currently on or off. You can create an initial state with `GlassSwitchState::new(bool)`. Use `GlassSwitchState::toggle(&mut self)` to toggle the switch state.

## Preview

![glass_switch](/glass_switch_example.gif)
