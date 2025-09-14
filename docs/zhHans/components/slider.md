---
title: Slider 组件
order: 5
---

# Slider

```rust
pub fn slider(args: impl Into<SliderArgs>, state: Arc<RwLock<SliderState>>)
```

`slider` 组件用于显示一个可交互的滑动条，可以在一个范围内选择一个数值。

## 参数

- `args: impl Into<SliderArgs>`

  该参数用于配置 `slider` 组件的样式，包括大小、颜色、边框、进度等属性。同时滑动进度更新回调也需在此注册。可以使用 `SliderArgsBuilder` 来构建。

- `state: Arc<RwLock<SliderState>>`

  该参数用于管理 `slider` 组件的状态。

## 预览

![slider](/slider_example.gif)
