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

The `dialog_provider` component is used to display dialogs in an application.

## Arguments

- `args: DialogProviderArgs`

  This argument configures the style of the dialog. Notably, `dialog_provider` supports both glass and non-glass dialog variants. It can be configured via the `style: DialogStyle` field of `DialogProviderArgs`. The default is `DialogStyle::Material`, i.e. the non-glass variant.

- `state: Arc<RwLock<DialogProviderState>>`

  This argument manages the dialog state, including whether the dialog is open and the animation progress.

  Use its `open()` and `close()` methods to programmatically open and close the dialog.

- `main_content: impl FnOnce()`

  A closure that renders the main content — the content underneath the dialog.

- `dialog_content: impl FnOnce(f32) + Send + Sync + 'static`

  A closure that renders the dialog content. It receives an `f32` parameter representing the dialog's fade level. It is recommended to use this value as an alpha multiplier for content colors to achieve better visual effects.

## Preview

<video autoplay loop muted>

<source src="/dialog_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
