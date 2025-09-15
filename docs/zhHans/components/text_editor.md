---
title: Text Editor 组件
order: 18
---

# Text Editor

```rust
pub fn text_editor(
    args: impl Into<TextEditorArgs>,
    state: Arc<RwLock<TextEditorState>>,
)
```

`text_editor` 组件是一个交互式文本编辑器，允许用户输入和编辑多行文本。

## 参数

- `args: impl Into<TextEditorArgs>`

  该参数配置文本编辑器的样式，并可以注册文本变化事件的回调函数。

  其中最重要的字段为 `pub on_change: Arc<dyn Fn(String) -> String + Send + Sync>,` 回调函数，当文本内容发生变化时会被调用，接收新的文本内容作为参数，并返回最终要显示的文本内容。可以利用该回调函数实现输入过滤、格式化等功能。其默认行为是返回空字符串，因此如果不设置该回调函数，文本编辑器将无法输入任何内容，这点需要注意。

- `state: Arc<RwLock<TextEditorState>>`

  该参数管理文本编辑器的状态，包括当前文本内容、光标位置和选择范围。

## 预览

<video autoplay loop muted>

<source src="/text_editor_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
