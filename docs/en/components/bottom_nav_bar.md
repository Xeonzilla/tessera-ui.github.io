---
title: Bottom Navigation Bar
order: 20
---

# Bottom Navigation Bar

```rust
pub fn bottom_nav_bar<F>(state: Arc<RwLock<BottomNavBarState>>, scope_config: F)
where
    F: FnOnce(&mut BottomNavBarScope<'_>),
```

The `bottom_nav_bar` component is an interactive bottom navigation bar that allows users to switch between multiple navigation items.

## Arguments

- `state: Arc<RwLock<BottomNavBarState>>`

  This argument manages the bottom navigation bar's state, including the currently selected item index and animation progress. It can also be used to get the current/previous selected index.

- `scope_config: F`

  A closure used to configure the navigation items of the `bottom_nav_bar`. The closure receives a `&mut BottomNavBarScope`; use its `child` method to add navigation items. Its signature is:

  ```rust
  pub fn child<C, O>(&mut self, child: C, on_click: O)
  where
      C: FnOnce() + Send + Sync + 'static,
      O: FnOnce() + Send + Sync + 'static,
  ```

  Where `child` is a tessera component closure for the navigation item, and `on_click` is a callback closure invoked when the item is clicked — you should perform the actual navigation action inside it.

  For example, you can use tessera's shard-based navigation in the `on_click` closure. Here's an example:

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

## Preview

<video autoplay loop muted>

<source src="/bottom_nav_bar_example.mp4" type="video/mp4">
Your browser does not support the video tag
</video>
