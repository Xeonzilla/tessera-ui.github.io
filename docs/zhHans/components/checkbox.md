---
title: CheckBox
order: 17
---

# CheckBox

```rust
pub fn checkbox(args: impl Into<CheckboxArgs>, state: CheckboxState)
```

`checkbox` 组件是一个可以交互的复选框，允许用户选择或取消选择某个选项。

## 参数

- `args: impl Into<CheckboxArgs>`

  此参数用于配置复选框的样式，以及注册改变时的回调函数。

- `state: CheckboxState`

  此参数用于管理复选框的状态，包括是否被选中，动画进度等。`CheckboxState` 是一个可克隆的结构体，它内部封装了对状态的共享引用。

## 预览

![checkbox](/checkbox_example.gif)
