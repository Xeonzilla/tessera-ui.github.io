---
title: Fluid Glass
order: 12
---

# Fluid Glass

```rust
pub fn fluid_glass(
    args: FluidGlassArgs,
    ripple_state: Option<RippleState>,
    child: impl FnOnce(),
)
```

`fluid_glass` 组件，通常用作其他组件的背景或者容器使用。它可以设置颜色、边框、阴影等属性，同时具有点击交互，折射扭曲背景，高斯模糊，色散，水波动画等高级效果，是很多交互组件的基础。可以认为是 `surface` 组件的玻璃态版本。

## 参数

- `args: FluidGlassArgs`

  此参数用于配置`fluid_glass`组件的样式和行为，包括颜色、边框、阴影、圆角、模糊强度、折射率等属性。可以通过`FluidGlassArgsBuilder`来构建这个参数。

- `ripple_state: Option<RippleState>`

  此参数为点击水波纹动画的状态，如果传入`None`，则表示不启用水波纹动画。`RippleState` 是一个可克隆的结构体，它内部封装了对状态的共享引用。

- `child: impl FnOnce()`

  此参数为`fluid_glass`组件的子组件，可以是任何`#[tessera]`函数。

## 预览

<video autoplay loop muted>

<source src="/fluid_glass_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
