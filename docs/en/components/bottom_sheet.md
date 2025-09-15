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

The `bottom_sheet_provider` is used to create a bottom sheet dialog in your application.

## Arguments

- `args: BottomSheetProviderArgs`

  This argument configures the style of the dialog. Notably, `bottom_sheet_provider` supports both glass-style and non-glass-style dialogs. You can configure this via the `style: BottomSheetStyle` field of `BottomSheetProviderArgs`. The default is `BottomSheetStyle::Material` (the non-glass version).

- `state: Arc<RwLock<BottomSheetProviderState>>`

  This argument manages the dialog's state, including whether the bottom sheet is open and the animation progress.

  Use its `open()` and `close()` methods to programmatically open and close the dialog.

- `main_content: impl FnOnce()`

  A closure used to render the main content — the content underneath the bottom sheet.

- `bottom_sheet_content: impl FnOnce() + Send + Sync + 'static`

  A closure used to render the bottom sheet's content.

## Preview

<video autoplay loop muted>

<source src="/bottom_sheet_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
