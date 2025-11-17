---
title: Bottom Navigation Bar
order: 20
---

# Bottom Navigation Bar

```rust
pub fn bottom_nav_bar<F>(state: BottomNavBarState, scope_config: F)
where
    F: FnOnce(&mut BottomNavBarScope),
```

`bottom_nav_bar` 组件是一个交互式的底部导航栏组件，允许用户在多个导航项之间切换。

## 参数

- `state: BottomNavBarState`

  此参数管理底部导航栏的状态，包括当前选中的导航项索引和动画进度等。`BottomNavBarState` 是一个可克隆的结构体，它内部封装了对状态的共享引用。可以使用它获取当前/上次选中的导航项索引。

- `scope_config: F`

  此参数是一个闭包，用于配置 `bottom_nav_bar` 组件的导航项。闭包接受一个 `&mut BottomNavBarScope` 参数，使用它的 `child` 方法来添加导航项。其方法签名如下:

  ```rust
  pub fn child<C, O>(&mut self, child: C, on_click: O)
  where
      C: FnOnce() + Send + Sync + 'static,
      O: FnOnce() + Send + Sync + 'static,
  ```

  其中， `child` 为导航项的 `tessera` 组件闭包，`on_click` 为点击导航项时的回调闭包，用户需要在其中调用实际的导航操作。

  举例说，可以在 `on_click` 闭包中使用 `tessera` 的 `shard` 导航特性，下面是一个例子

  ```rust
  // Add the "Profile" item.
  nav_scope.child(
      || text(TextArgsBuilder::default().text("Profile".to_string()).build().unwrap()),
      move || {
          Router::with_mut(|router| {
              router.reset_with(ProfileScreenDestination {});
          });
      },
  );
  ```

## 预览

<video autoplay loop muted>

<source src="/bottom_nav_bar_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
