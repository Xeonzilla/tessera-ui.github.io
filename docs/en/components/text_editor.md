---
title: Text Editor
order: 18
---

# Text Editor

```rust
pub fn text_editor(
    args: impl Into<TextEditorArgs>,
    state: Arc<RwLock<TextEditorState>>,
)
```

The `text_editor` component is an interactive multi-line text editor that allows users to enter and edit text.

## Arguments

- `args: impl Into<TextEditorArgs>`

  This argument configures the editor's style and allows registering a callback for text changes.

  The most important field is `pub on_change: Arc<dyn Fn(String) -> String + Send + Sync>`, a callback invoked when the text changes. It receives the new text as an argument and should return the text to display. Use this callback to implement input filtering, formatting, etc. Its default behavior returns an empty string, so if you don't set this callback the editor will not accept input — take care.

- `state: Arc<RwLock<TextEditorState>>`

  Manages the editor state, including current text content, cursor position, and selection range.

## Preview

<video autoplay loop muted>

<source src="/text_editor_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
