---
title: Spacer component
order: 10
---

# Spacer

```rust
pub fn spacer(args: impl Into<SpacerArgs>)
```

The `spacer` component creates a resizable empty area in layouts to better control the positioning and spacing of other components. It does not render any visible content.

## Arguments

- `args: impl Into<SpacerArgs>`

  This argument configures the size and other properties of the `spacer` component. You can use `SpacerArgsBuilder` to construct it.
