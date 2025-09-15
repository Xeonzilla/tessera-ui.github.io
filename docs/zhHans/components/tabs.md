---
title: Tabs 组件
order: 19
---

# Tabs

```rust
pub fn tabs<F>(args: TabsArgs, state: Arc<RwLock<TabsState>>, scope_config: F)
where
    F: FnOnce(&mut TabsScope<'_>),
```

`tabs` 组件是一个交互式的标签页组件，允许用户在多个选项卡之间切换。

## 参数

- `args: TabsArgs`

  此参数可以配置标签页的样式。可以使用 `TabsArgsBuilder` 来构建。

- `state: Arc<RwLock<TabsState>>`

  此参数管理标签页的状态，包括当前选中的标签页索引和动画进度等。值得一提的是也可以使用它程序化地切换标签页或者获取当前/上次选中的标签页索引。

- `scope_config: F`

  此参数是一个闭包，用于配置 `tabs` 组件的标题栏和内容区域，一个标题对应一个内容区域。闭包接受一个 `&mut TabsScope` 参数，使用它的 `child` 方法来添加标签页。其方法签名如下:

  ```rust
  pub fn child<F1, F2>(&mut self, title: F1, content: F2)
  where
      F1: FnOnce() + Send + Sync + 'static,
      F2: FnOnce() + Send + Sync + 'static,
  ```

  其中， `title` 为标签页标题的 `tessera` 组件闭包，`content` 为标签页内容的 `tessera` 组件闭包。

  需要注意的是，标签栏自动有点击切换标签页的交互行为，因此不需要在 `title` 闭包中添加点击组件。

## 预览

<video autoplay loop muted>

<source src="/tabs_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
