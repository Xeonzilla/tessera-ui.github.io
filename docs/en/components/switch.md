--- 
title: Switch
order: 4
---

# Switch

```rust
pub fn switch(args: impl Into<SwitchArgs>, state: SwitchState)
```

The `switch` component displays a toggle that can switch between on and off states.

## Arguments

- `args: impl Into<SwitchArgs>`

  This argument configures the style of the `switch` component, including size, color, border, and other properties. You can use `SwitchArgsBuilder` to construct it.

- `state: SwitchState`

  This argument manages the state of the `switch` component, including whether it is currently on or off. `SwitchState` is a clonable struct that encapsulates a shared reference to the state internally. You can create an initial state with `SwitchState::new(bool)`. Use the `state.toggle()` method to toggle the switch state.

## Preview

![switch](/switch_example.gif)

