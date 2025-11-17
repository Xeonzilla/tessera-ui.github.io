---
title: Slider
order: 5
---

# Slider

```rust
pub fn slider(args: impl Into<SliderArgs>, state: SliderState)
```

The `slider` component displays an interactive slider that lets the user select a value within a range.

## Arguments

- `args: impl Into<SliderArgs>`

  This argument configures the slider's style, including size, color, border, progress, etc. It is also where you register progress update callbacks. You can use `SliderArgsBuilder` to construct it.

- `state: SliderState`

  Manages the state of the slider component. `SliderState` is a clonable struct that encapsulates a shared reference to the state internally.

## Preview

![slider](/slider_example.gif)
