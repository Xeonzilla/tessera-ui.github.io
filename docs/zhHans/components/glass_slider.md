---
title: Glass Slider
order: 15
---

# Glass Slider

```rust
pub fn glass_slider(
    args: impl Into<GlassSliderArgs>,
    state: GlassSliderState,
)
```

`glass_slider` 组件用于显示一个可交互的滑动条，可以在一个范围内选择一个数值。可以认为它是 `slider` 组件的玻璃风格变体。该组件支持配置背景色、边框、折射率、色散等，并提供拖动交互。

## 参数

- `args: impl Into<GlassSliderArgs>`

  该参数用于配置 `glass_slider` 组件的样式，包括大小、颜色、边框等。可以使用 `GlassSliderArgsBuilder` 来构建。

- `state: GlassSliderState`

  该参数用于管理 `glass_slider` 组件的状态。`GlassSliderState` 是一个可克隆的结构体，它内部封装了对状态的共享引用。

## 预览

![glass_slider](/glass_slider_example.gif)
