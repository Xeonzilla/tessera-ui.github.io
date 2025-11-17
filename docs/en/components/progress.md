---
title: Progress
order: 9
---

# Progress

```rust
pub fn progress(args: impl Into<ProgressArgs>)
```

Displays a progress bar indicating the completion progress of a task. This component is almost identical to the `slider` component but is not interactive.

## Arguments

- `args: impl Into<ProgressArgs>`
  This argument configures the style of the `progress` component, including progress value, width, height, and colors. You can use `ProgressArgsBuilder` to construct it.

## Preview

![progress](/progress_example.png)
