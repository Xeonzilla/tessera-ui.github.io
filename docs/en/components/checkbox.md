---
title: Checkbox
order: 17
---

# Checkbox

```rust
pub fn checkbox(args: impl Into<CheckboxArgs>, state: CheckboxState)
```

The `checkbox` component is an interactive checkbox that allows users to select or deselect an option.

## Arguments

- `args: impl Into<CheckboxArgs>`

  This argument configures the style of the checkbox and can register a callback for change events.

- `state: CheckboxState`

  This argument manages the checkbox state, including whether it is checked and animation progress. `CheckboxState` is a clonable struct that encapsulates a shared reference to the state internally.

## Preview

![checkbox](/checkbox_example.gif)
