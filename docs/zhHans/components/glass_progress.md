---
title: Glass Progress
order: 16
---

# Glass Progress

```rust
pub fn glass_progress(args: impl Into<GlassProgressArgs>)
```

`glass_progress` 组件用于显示一个进度条，可以表示任务的完成进度。表示某个任务的完成进度。此组件与 `glass_slider` 组件几乎一致，但不可交互。可以认为它是 `slider` 组件的玻璃风格变体。

## 参数

- `args: impl Into<GlassProgressArgs>`

  该参数用于配置 `glass_progress` 组件的样式，包括大小、颜色、边框等，同时也用于设置显示的进度。可以使用 `GlassProgressArgsBuilder` 来构建。

  不同于 `glass_slider` 组件，`glass_progress` 没有选择将进度放入一个独立的状态结构体中，而是直接作为参数传入，这是因为进度条用于数据的显示而非修改。

## 预览

![glass_progress](/glass_progress_example.png)
