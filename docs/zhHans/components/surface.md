---
title: Surface 组件
order: 1
---

# Surface

```rust
pub fn surface(
    args: SurfaceArgs,
    ripple_state: Option<Arc<RippleState>>,
    child: impl FnOnce(),
)
```

`surface` 组件，顾名思义，是一个平面组件，通常用作其他组件的背景或者容器使用。它可以设置背景颜色、边框、阴影等属性，同时具有点击交互，水波动画等高级效果，是很多交互组件的基础。

## 参数

- `args: SurfaceArgs`

此参数用于配置`surface`组件的样式和行为，包括背景颜色、边框、阴影、圆角等属性。可以通过`SurfaceArgsBuilder`来构建这个参数。

- `ripple_state: Option<Arc<RippleState>>`

此参数为点击水波纹动画的状态，如果传入`None`，则表示不启用水波纹动画。

- `child: impl FnOnce()`

此参数为`surface`组件的子组件，可以是任何`#[tessera]`函数。

## 预览

![surface](/surface_example.png)
