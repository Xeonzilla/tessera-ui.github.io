---
title: 快速开始
order: 1
---

# 快速开始

此章节将引导你创建一个基础的`tessera`应用。

## 安装

### 前置条件

- 已安装 [Rust](https://www.rust-lang.org)

## 创建新项目

首先，确保你已经安装了 `cargo-tessera`，它集成了创建、开发基于 `tessera` App项目所需的各种功能。

```bash
cargo install cargo-tessera
```

然后，使用以下命令创建一个新的`tessera`项目：

```bash
cargo tessera new
```

`cargo-tessera` 会引导你完成项目创建的过程，并生成一个包含基本结构和示例代码的 `tessera` 项目，它会询问你项目名称、使用的模板等。对于本文，我们将使用 `blank` 模板。

## 第一个 `tessera`

在`tessera`中，每个组件都是一个被`tessera`宏标记的函数，所以我们也将组件称为`tessera`。

### 添加背景

首先我们添加一个白色的最大化`surface`作为背景，进入你的项目，打开 `src/lib.rs`，找到 `app` 函数，此时它看起来应该是这样的：

```rust
#[tessera]
fn app() {
    // Empty application
}
```

`blank` 模板创建的项目只有一个空组件，我们就在其中开始添加内容。

```rust
#[tessera]
fn app() {
    surface(
        SurfaceArgsBuilder::default()
            .color(Color::WHITE) // 设置surface的背景颜色为白色
            .width(DimensionValue::FILLED) // 这代表对surface的约束是填满父组件宽度
            .height(DimensionValue::FILLED) // 这代表对surface的约束是填满父组件高度
            .build()
            .unwrap(),
        None, // 第二个参数传入的是ripple动画状态，这是用于点击的水波纹动画的，我们的背景surface不需要点击，所以传None
        || {
            // surface是一个经典的容器组件，可以用来放置其他组件，目前我们放一个空闭包占位
        },
    );
}
```

等待 `cargo tessera dev` 完成一次自动重建（或手动重启它），就可以看到一个白色的窗口。

![白色的窗口](/getting-start-2.png)

### 添加文本

接下来我们在背景上添加一个文本组件，显示"Hello, World!"。

```rust
#[tessera]
fn app() {
    surface(
        SurfaceArgsBuilder::default()
            .style(Color::WHITE.into()) // 设置surface的背景颜色为白色
            .width(DimensionValue::FILLED) // 这代表对surface的约束是填满父组件宽度
            .height(DimensionValue::FILLED) // 这代表对surface的约束是填满父组件高度
            .build()
            .unwrap(),
        None, // 第二个参数传入的是ripple动画状态，这是用于点击的水波纹动画的，我们的背景surface不需要点击，所以传None
        || {
            text("Hello, World!") // HELLO THERE :)
        },
    );
}
```

当开发服务器再次重建完成，就可以看到一个白色的窗口和黑色的"Hello, World!"文本。

![泥嚎吖](/getting-start-3.png)

## 下一步

恭喜你！你已经成功创建了一个简单的`tessera`应用。接下来推荐进一步了解[tessera 组件模型](../guide/component.md)。
