---
title: Text 组件
order: 3
---

# Text

```rust
pub fn text(args: impl Into<TextArgs>)
```

`text` 组件用于显示文本内容。

## 参数

- `args: impl Into<TextArgs>`

此参数用于配置`text`组件的样式，包括文本内容、字体大小、颜色、对齐方式等属性。可以通过`TextArgsBuilder`来构建这个参数。

值得一提的是，由于为`str`、`String`等类型实现了`Into<TextArgs>`，因此可以使用`text("Hello, World!")`这样的简便写法。
