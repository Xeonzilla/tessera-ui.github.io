---
title: Tabs
order: 19
---

# Tabs

```rust
pub fn tabs<F>(args: TabsArgs, state: Arc<RwLock<TabsState>>, scope_config: F)
where
    F: FnOnce(&mut TabsScope<'_>),
```

The `tabs` component is an interactive tab component that allows users to switch between multiple tabs.

## Arguments

- `args: TabsArgs`

  This argument configures the tabs' style. You can use `TabsArgsBuilder` to construct it.

- `state: Arc<RwLock<TabsState>>`

  This argument manages the tabs' state, including the currently selected tab index and animation progress. It can also be used to programmatically switch tabs or to get the current/previous selected index.

- `scope_config: F`

  This argument is a closure used to configure the tabs' title bar and content areas — one title corresponds to one content area. The closure receives a `&mut TabsScope` parameter; use its `child` method to add tab pages. Its signature is:

  ```rust
  pub fn child<F1, F2>(&mut self, title: F1, content: F2)
  where
      F1: FnOnce() + Send + Sync + 'static,
      F2: FnOnce() + Send + Sync + 'static,
  ```

  Where `title` is a tessera component closure for the tab title, and `content` is a tessera component closure for the tab content.

  Note that the tab bar automatically handles click-to-switch behavior, so you should not add click components inside the `title` closure.

## Preview

<video autoplay loop muted>

<source src="/tabs_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
