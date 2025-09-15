---
title: Side Bar
order: 23
---

# Side Bar

```rust
pub fn side_bar_provider(
    args: SideBarProviderArgs,
    state: Arc<RwLock<SideBarProviderState>>,
    main_content: impl FnOnce() + Send + Sync + 'static,
    side_bar_content: impl FnOnce() + Send + Sync + 'static,
)
```

The `side_bar_provider` is used to create a side-docked dialog in an application.

## Arguments

- `args: SideBarProviderArgs`

  This argument configures the dialog's style. Notably, `side_bar_provider` supports both glass and non-glass variants. You can configure it via the `style: SideBarStyle` field of `SideBarProviderArgs`. The default is `SideBarStyle::Material` (non-glass).

- `state: Arc<RwLock<SideBarProviderState>>`

  Manages the dialog state, including whether the sidebar is open and the animation progress.

  Use its `open()` and `close()` methods to programmatically open and close the dialog.

- `main_content: impl FnOnce() + Send + Sync + 'static`

  A closure that renders the main content — the content below the dialog.

- `side_bar_content: impl FnOnce() + Send + Sync + 'static`

  A closure that renders the side dialog content.

## Preview

<video autoplay loop muted>

<source src="/side_bar_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
