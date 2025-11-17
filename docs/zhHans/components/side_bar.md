---
title: Side Bar
order: 23
---

# Side Bar

```rust
pub fn side_bar_provider(
    args: SideBarProviderArgs,
    state: SideBarProviderState,
    main_content: impl FnOnce() + Send + Sync + 'static,
    side_bar_content: impl FnOnce() + Send + Sync + 'static,
)
```

`side_bar_provider` 用于在应用中创建一个侧面弹出的对话框。

## 参数

- `args: SideBarProviderArgs`

  该参数配置对话框的样式。值得一提的是，`side_bar_provider` 同时支持玻璃态版本和非玻璃态版本的对话框。它可以通过 `SideBarProviderArgs` 的 `style: SideBarStyle` 字段来配置。默认为 `SideBarStyle::Material`，即非玻璃态版本。

- `state: SideBarProviderState`

  该参数管理对话框的状态，包括底部对话框是否弹出以及动画进度。`SideBarProviderState` 是一个可克隆的结构体，它内部封装了对状态的共享引用。

  使用其 `open()` 和 `close()` 方法可以程序化的打开和关闭对话框。

- `main_content: impl FnOnce()`

  该参数是一个闭包，用于渲染主内容。即对话框下方的内容。

- `side_bar_content: impl FnOnce() + Send + Sync + 'static`

  该参数是一个闭包，用于渲染侧边对话框内容。

## 预览

<video autoplay loop muted>

<source src="/side_bar_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
