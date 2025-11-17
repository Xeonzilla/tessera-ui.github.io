---
title: Progress
order: 9
---

# Progress

```rust
pub fn progress(args: impl Into<ProgressArgs>)
```

显示一个进度条，表示某个任务的完成进度。此组件与 `slider` 组件几乎一致，但不可交互。

## 参数

- `args: impl Into<ProgressArgs>`
  该参数用于配置 `progress` 组件的样式，包括进度值、宽高、颜色等。可以使用 `ProgressArgsBuilder` 来构建。

## 预览

![progress](/progress_example.png)
