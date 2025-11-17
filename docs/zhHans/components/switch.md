---
title: Switch
order: 4
---

# Switch

```rust
pub fn switch(args: impl Into<SwitchArgs>, state: SwitchState)
```

`switch` 组件用于显示一个开关，可以在开启和关闭状态之间切换。

## 参数

- `args: impl Into<SwitchArgs>`

  该参数用于配置 `switch` 组件的样式，包括大小、颜色、边框等属性。可以使用 `SwitchArgsBuilder` 来构建。

- `state: SwitchState`

  该参数用于管理 `switch` 组件的状态，包括当前是开启还是关闭状态。可以通过 `SwitchState::new(bool)` 来创建初始状态。`SwitchState` 是一个可克隆的结构体，它内部封装了对状态的共享引用。使用 `state.toggle()` 方法可以切换开关状态。

## 预览

![switch](/switch_example.gif)
