---
title: Bottom Sheet
order: 22
---

# Bottom Sheet

```rust
pub fn bottom_sheet_provider(
    args: BottomSheetProviderArgs,
    state: Arc<RwLock<BottomSheetProviderState>>,
    main_content: impl FnOnce() + Send + Sync + 'static,
    bottom_sheet_content: impl FnOnce() + Send + Sync + 'static,
)
```

`bottom_sheet_provider` 用于在应用中创建一个底部弹出的对话框。

## 参数

- `args: BottomSheetProviderArgs`

  该参数配置对话框的样式。值得一提的是，`bottom_sheet_provider` 同时支持玻璃态版本和非玻璃态版本的对话框。它可以通过 `BottomSheetProviderArgs` 的 `style: BottomSheetStyle` 字段来配置。默认为 `BottomSheetStyle::Material`，即非玻璃态版本。

- `state: Arc<RwLock<BottomSheetProviderState>>`

  该参数管理对话框的状态，包括底部对话框是否弹出以及动画进度。

  使用其 `open()` 和 `close()` 方法可以程序化的打开和关闭对话框。

- `main_content: impl FnOnce()`

  该参数是一个闭包，用于渲染主内容。即对话框下方的内容。

- `dialog_content: impl FnOnce() + Send + Sync + 'static`

  该参数是一个闭包，用于渲染底部对话框内容。

## 预览

<video autoplay loop muted>

<source src="/bottom_sheet_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
