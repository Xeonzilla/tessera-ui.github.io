---
title: Spacer
order: 10
---

# Spacer

```rust
pub fn spacer(args: impl Into<SpacerArgs>)
```

`spacer` 组件用于在布局中创建一个可调整大小的空白区域，以便更好地控制其他组件的位置和间距。不实际渲染任何内容。

## 参数

- `args: impl Into<SpacerArgs>`

  该参数用于配置 `spacer` 组件的大小等属性。可以使用 `SpacerArgsBuilder` 来构建。
