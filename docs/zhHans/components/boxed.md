---
title: Boxed 组件
order: 8
---

# Boxed

```rust
pub fn boxed<F>(args: BoxedArgs, scope_config: F)
where
    F: FnOnce(&mut BoxedScope<'_>),
```

`boxed` 组件用于堆叠一组子组件。

不像别的容器组件，`boxed` 组件要求你使用 `BoxedScope::child` 等方法来添加子组件，而非直接在闭包中调用子组件函数。

::: warning
如果尝试在闭包中直接调用子组件函数，`boxed` 组件将在运行时崩溃。
:::

以下是一个正确使用 `boxed` 组件的例子：

```rust
use tessera_ui_basic_components::{
    boxed::{boxed, BoxedArgs},
    surface::{surface, SurfaceArgs},
    text::text,
};

boxed(
    BoxedArgs {
        alignment: Alignment::Center,
        ..Default::default()
    },
    |scope| {
        scope.child(|| {
            surface(
                SurfaceArgs {
                    width: DimensionValue::from(Dp(300.0)),
                    height: DimensionValue::from(Dp(300.0)),
                    ..Default::default()
                },
                None,
                || {},
            )
        });
        scope.child(|| text("test"));
    },
);
```

## 参数

- `args: BoxedArgs`

  该参数用于配置 `boxed` 组件的样式，包括宽高、对齐方式等。使用 `BoxedArgsBuilder` 来构建它。

- `scope_config: F`
  该参数是一个闭包，用于添加子组件到 `boxed` 组件中。闭包接收一个 `&mut BoxedScope` 参数，使用它的 `child`、`child_weighted` 等方法来添加子组件。

## 预览

![boxed](/boxed_example.png)
