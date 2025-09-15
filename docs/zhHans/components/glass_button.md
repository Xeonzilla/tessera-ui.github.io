---
title: Glass Button 组件
order: 13
---

# Glass Button

```rust
pub fn glass_button(
    args: impl Into<GlassButtonArgs>,
    ripple_state: Arc<RippleState>,
    child: impl FnOnce() + Send + Sync + 'static,
)
```

`glass_button` 组件是一个基于 `fluid_glass` 组件的玻璃态按钮组件。通常用作触发某个操作。可以被认为是 `button` 组件的玻璃态版本。它可以设置背景颜色、边框、折射、色散等属性，同时具有点击交互，水波动画等高级效果。

## 参数

- `args: impl Into<GlassButtonArgs>`

  此参数用于配置`glass_button`组件的样式和行为，包括背景颜色、边框、折射、色散等属性。可以通过`GlassButtonArgsBuilder`来构建这个参数。

- `ripple_state: Arc<RippleState>`
  此参数为点击水波纹动画的状态，必须传入一个有效的 `RippleState` 实例，以启用水波纹动画效果。这点不同于 `fluid_glass` 组件。

- `child: impl FnOnce() + Send + Sync + 'static`

  此参数为 `glass_button` 组件的子组件，可以是任何`#[tessera]`函数。

## 预览

![glass_button](/glass_button_example.gif)
