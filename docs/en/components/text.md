---
title: Text
order: 3
---

# Text

```rust
pub fn text(args: impl Into<TextArgs>)
```

The Text component is used to display textual content.

## Arguments

- `args: impl Into<TextArgs>`

This argument configures the style of the `text` component, including content, font size, color, alignment, and other properties. You can build it via `TextArgsBuilder`.

Note that since `Into<TextArgs>` is implemented for types like `str` and `String`, you can use the shorthand `text("Hello, World!")`.
