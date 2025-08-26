# 快速开始

此章节将引导你创建一个基础的`tessera`应用。

## 安装

### 前置条件

- 已安装 [Rust](https://www.rust-lang.org)

## 创建新项目

目前，我们没有提供脚手架工具来创建新项目（计划在未来提供）。你可以通过以下命令手动创建一个新的 Rust 项目并手动初始化为一个`tessera`项目：

```bash
cargo new my-tessera-app
cd my-tessera-app
```

## 添加依赖

对于一个基础的例子，我们只需要`tessera-ui`和`tessera-ui-basic-components`这两个依赖。

其中`tessera-ui`是`tessera`的核心 UI 库，包含了构建 UI 所需的基础设施和工具，而`tessera-ui-basic-components`则提供了一些常用的基础组件。如果你不需要这些基础组件，可以选择不安装这个依赖，`tessera-ui`本身和`tessera-ui-basic-components`是完全解耦的。

对于我们的简单例子，从新去实现组件的 shader 和布局过于复杂，所以安装`tessera-ui-basic-components`是必须的。

```bash
cargo add tessera-ui
cargo add tessera-ui-basic-components
```

## 创建你的第一个`tessera`应用

以下教程会引导你创建一个基础的`tessera`应用。带有一个简单的白色背景和"Hello, World!"文本。

### 创建渲染器

`tessera`的入口是它的渲染器，它负责窗口管理，渲染循环，事件处理等。我们必须创建一个渲染器实例并且运行它。

在`src/main.rs`中，用以下代码替换默认的`main`函数：

```rust
use tessera_ui::{Renderer, renderer::TesseraConfig};

fn main() {
    // 这里可以配置渲染器
    let config = TesseraConfig {
        window_title: "Tessera Example".to_string(), // 设置窗口标题
        ..Default::default()                         // 其他配置目前使用默认值即可
    };
    Renderer::run_with_config(
        || {}, // UI入口函数，我们将在下一步骤中实现它，目前先传入一个空闭包
        |app| {
            tessera_ui_basic_components::pipelines::register_pipelines(app); // 注意，因为我们要使用tessera-ui-basic-components，所以必须注册它的渲染管线
        },
        config,
    )
    .unwrap();
}
```

运行`cargo run`，将会看到一个黑色或者透明的窗口。

![黑色窗口](/getting-start-1.png)

### 添加你的第一个`tessera`

在`tessera`中，每个组件都是一个被`tessera`宏标记的函数，所以我们也将组件称为`tessera`。

#### 添加背景

首先我们添加一个白色的最大化`surface`作为背景。

```rust
use tessera_ui::{Color, DimensionValue, Renderer, renderer::TesseraConfig, tessera};
use tessera_ui_basic_components::surface::{SurfaceArgsBuilder, surface};

fn main() {
    // 这里可以配置渲染器
    let config = TesseraConfig {
        window_title: "Tessera Example".to_string(), // 设置窗口标题
        ..Default::default()                         // 其他配置目前使用默认值即可
    };
    Renderer::run_with_config(
        || app(), // UI入口，也就是顶层的tessera
        |app| {
            tessera_ui_basic_components::pipelines::register_pipelines(app); // 注意，因为我们要使用tessera-ui-basic-components，所以必须注册它的渲染管线
        },
        config,
    )
    .unwrap();
}

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

再次运行`cargo run`，就可以看到一个白色的窗口。

![白色的窗口](/getting-start-2.png)

#### 添加文本

接下来我们在背景上添加一个文本组件，显示"Hello, World!"。

```rust
use tessera_ui::{Color, DimensionValue, Renderer, renderer::TesseraConfig, tessera};
use tessera_ui_basic_components::{surface::{surface, SurfaceArgsBuilder}, text::text};

fn main() {
    // 这里可以配置渲染器
    let config = TesseraConfig {
        window_title: "Tessera Example".to_string(), // 设置窗口标题
        ..Default::default()                         // 其他配置目前使用默认值即可
    };
    Renderer::run_with_config(
        || app(), // 我将UI入口放在了下面的app函数中，当然你也可以直接在这里写
        |app| {
            tessera_ui_basic_components::pipelines::register_pipelines(app); // 注意，因为我们要使用tessera-ui-basic-components，所以必须注册它的渲染管线
        },
        config,
    )
    .unwrap();
}

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
            text("Hello, World!") // HELLO THERE :)
        },
    );
}
```

此时运行`cargo run`，就可以看到一个白色的窗口和黑色的"Hello, World!"文本。

![泥嚎吖](/getting-start-3.png)
