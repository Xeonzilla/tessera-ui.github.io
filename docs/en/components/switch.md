---
title: Switch
order: 4
---

# Switch

```rust
pub fn switch(args: impl Into<SwitchArgs>, state: Arc<RwLock<SwitchState>>)
```

The `switch` component displays a toggle that can switch between on and off states.

## Arguments

- `args: impl Into<SwitchArgs>`

  This argument configures the style of the `switch` component, including size, color, border, and other properties. Use `SwitchArgsBuilder` to construct it.

- `state: Arc<RwLock<SwitchState>>`

  This argument manages the state of the `switch` component, including whether it is currently on or off. You can create an initial state with `SwitchState::new(bool)`. Use the `SwitchState::toggle(&mut self)` method to toggle the switch state.

## Preview

![switch](/switch_example.gif)
