---
title: Glass Switch
order: 14
---

# Glass Switch

```rust
pub fn glass_switch(
    args: impl Into<GlassSwitchArgs>,
    state: GlassSwitchState,
)
```

`glass_switch` 组件是一个玻璃风格的开关，可以在开启和关闭状态之间切换。它可以被视为 `switch` 组件的玻璃变体。该组件支持配置背景颜色、边框、折射、色散等属性，并提供点击交互。

## 参数

- `args: impl Into<GlassSwitchArgs>`

  该参数用于配置 `glass_switch` 组件的样式，包括大小、颜色、边框等属性。可以使用 `GlassSwitchArgsBuilder` 来构建。

- `state: GlassSwitchState`

  该参数用于管理 `glass_switch` 组件的状态，包括当前是开启还是关闭状态。可以通过 `GlassSwitchState::new(bool)` 来创建初始状态。`GlassSwitchState` 是一个可克隆的结构体，它内部封装了对状态的共享引用。使用 `state.toggle()` 方法可以切换开关状态。

## 预览

![glass_switch](/glass_switch_example.gif)
