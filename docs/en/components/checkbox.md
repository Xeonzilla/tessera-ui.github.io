---
title: Checkbox component
order: 17
---

# Checkbox

```rust
pub fn checkbox(args: impl Into<CheckboxArgs>, state: Arc<CheckboxState>)
```

The `checkbox` component is an interactive checkbox that allows users to select or deselect an option.

## Arguments

- `args: impl Into<CheckboxArgs>`

  This argument configures the style of the checkbox and can register a callback for change events.

- `state: Arc<CheckboxState>`

  This argument manages the checkbox state, including whether it is checked and animation progress.

## Preview

![checkbox](/checkbox_example.gif)
