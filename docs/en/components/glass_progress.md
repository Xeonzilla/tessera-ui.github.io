---
title: Glass Progress
order: 16
---

# Glass Progress

```rust
pub fn glass_progress(args: impl Into<GlassProgressArgs>)
```

The `glass_progress` component displays a progress bar indicating the completion progress of a task. It is nearly identical to the `glass_slider` component but is not interactive. Consider it the glass-style variant of the `slider` component.

## Arguments

- `args: impl Into<GlassProgressArgs>`

  This argument configures the style of the `glass_progress` component, including size, color, border, and also sets the displayed progress. Use `GlassProgressArgsBuilder` to construct it.

  Unlike the `glass_slider` component, `glass_progress` does not place the progress into a separate state struct; the progress is passed directly via arguments because the progress bar is for displaying data rather than modifying it.

## Preview

![glass_progress](/glass_progress_example.png)
