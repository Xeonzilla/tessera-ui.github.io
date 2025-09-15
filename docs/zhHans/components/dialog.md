---
title: Dialog
order: 21
---

# Dialog

```rust
pub fn dialog_provider(
    args: DialogProviderArgs,
    state: Arc<RwLock<DialogProviderState>>,
    main_content: impl FnOnce(),
    dialog_content: impl FnOnce(f32) + Send + Sync + 'static,
)
```

`dialog_provider` 组件用于在应用程序中显示对话框。

## 参数

- `args: DialogProviderArgs`

  该参数配置对话框的样式。值得一提的是，`dialog_provider` 同时支持玻璃态版本和非玻璃态版本的对话框。它可以通过 `DialogProviderArgs` 的 `style: DialogStyle` 字段来配置。默认为 `DialogStyle::Material`，即非玻璃态版本。

- `state: Arc<RwLock<DialogProviderState>>`

  该参数管理对话框的状态，包括对话框是否打开以及动画进度。

  使用其 `open()` 和 `close()` 方法可以程序化的打开和关闭对话框。

- `main_content: impl FnOnce()`

  该参数是一个闭包，用于渲染主内容。即对话框下方的内容。

- `dialog_content: impl FnOnce(f32) + Send + Sync + 'static`

  该参数是一个闭包，用于渲染对话框内容。它接受一个 `f32` 类型的参数，表示对话框的淡出程度。建议对对话框的内容的颜色也使用它作为透明度系数进行调节，以实现更好的视觉效果。

## 预览

<video autoplay loop muted>

<source src="/dialog_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
