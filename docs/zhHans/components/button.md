---
title: Button 组件
order: 2
---

# Button

```rust
pub fn button(
    args: impl Into<ButtonArgs>,
    ripple_state: Arc<RippleState>,
    child: impl FnOnce(),
)
```

`button` 组件是一个按钮组件，通常用作触发某个操作。它可以设置背景颜色、边框、阴影等属性，同时具有点击交互，水波动画等高级效果。

## 参数

- `args: impl Into<ButtonArgs>`

此参数用于配置`button`组件的样式和行为，包括背景颜色、边框、阴影、圆角等属性。可以通过`ButtonArgsBuilder`来构建这个参数。

- `ripple_state: Arc<RippleState>`

此参数为点击水波纹动画的状态，必须传入一个有效的`RippleState`实例，以启用水波纹动画效果。这点不同于`surface`组件，其`ripple_state`参数可以传入`None`来禁用水波纹动画。

- `child: impl FnOnce()`

此参数为`button`组件的子组件，可以是任何`#[tessera]`函数。
