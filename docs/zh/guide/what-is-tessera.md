# 什么是 Tessera

Tessera 是一个面向 Rust 的声明式、立即模式 UI 框架，强调通过函数式方法与可插拔着色器系统实现的性能、灵活性和可扩展性。

## 核心概念

Tessera 的架构围绕几个核心概念构建：

### 声明式函数组件

> "Programming can be liberated from the von Neumann style."
>
> — John Backus, 1977

Tessera 使用 Rust 的宏系统（`#[tessera]`）允许开发者以函数的形式定义 UI 组件，每个组件都是一个 rust 函数，没有特殊的返回值或者结构要求。这种方法使得组件易于组合和重用。

举例说，以下是一个简单的 Tessera 应用，它展示了`tessera`是怎么组合的

```rust
#[tessera]
fn app() {
    surface(
        SurfaceArgsBuilder::default()
            .color(Color::WHITE)
            .width(DimensionValue::FILLED)
            .height(DimensionValue::FILLED)
            .build()
            .unwrap(),
        None,
        || {
            boxed(
                BoxedArgs {
                    width: DimensionValue::FILLED,
                    height: DimensionValue::FILLED,
                    alignment: Alignment::Center,
                },
                |scope| {
                    scope.child(|| text("Hello, Tessera!"))
                }
            )
        },
    );
}
```

![example-1](/what-is-tessera-1.png)

### 立即模式

Tessera 采用立即模式 UI 的范式，这意味着 UI 在每一帧都被重新构建，而不是维护一个持久的 UI 树。这主要是因为以下三个原因：

- **降低状态管理的心智负担**：采用即时模式意味着我们可以严格遵循单向数据流，`UI = f(state)`，这大大简化了状态管理。

举例来说，假设我们有一个带状态的应用：

```rust
fn main() {
    let config = TesseraConfig {
        window_title: "Tessera Example".to_string(),
        ..Default::default()
    };
    let ripple_state = Arc::new(RippleState::new());
    Renderer::run_with_config(
        || app(ripple_state.clone()),
        |app| {
            tessera_ui_basic_components::pipelines::register_pipelines(app);
        },
        config,
    )
    .unwrap();
}

#[tessera]
fn app(ripple_state: Arc<RippleState>) {
    surface(
        SurfaceArgsBuilder::default()
            .color(Color::WHITE)
            .width(DimensionValue::FILLED)
            .height(DimensionValue::FILLED)
            .build()
            .unwrap(),
        None,
        || {
            boxed(
                BoxedArgs {
                    width: DimensionValue::FILLED,
                    height: DimensionValue::FILLED,
                    alignment: Alignment::Center,
                },
                |scope| {
                    scope.child(|| button(
                            ButtonArgsBuilder::default()
                                .on_click(Arc::new(|| println!("HI!")))
                                .build()
                                .unwrap(),
                            ripple_state,
                            || text("Click me!"),
                        )
                    )
                }
            )
        },
    );
}
```

这里可以清晰的看到用于控制动画进度的状态 `RippleState` 是如何被传递到 `button` 组件中，严格遵循了单向数据流的原则，最后汇聚在 main 函数中。

![just-a-button](/what-is-tessera-2.png)

- **自然的动画实现**：由于 UI 在每一帧都被重新构建，动画可以通过简单地更新状态并重新渲染来实现，而不需要复杂的动画系统。

比如`tessera-ui-basic-components`中的`bottom_sheet`组件就是通过这种方式实现的非线性底部弹出动画。

![show-bottom-sheet](/what-is-tessera-3.gif)

或者这个我很喜欢的玻璃风格`switch`组件：

![show-glass-switch](/what-is-tessera-4.gif)

- **并发的布局计算**：既然 UI 在每一帧都被重新构建，Tessera 可以利用并行计算来加速布局测量和渲染。事实上这就是为什么状态总是通过 `Arc` 传递的原因。

### 可插拔着色器

可以说 Tessera 最独特的特性就是它的可插拔着色器系统。Tessera 其实不内置任何组件，着色器，或者类似`canvas`的东西。相反，它提供了一套低级的渲染管线接口，允许开发者注册自定义的 WGPU 着色器和渲染管线。而最底层的绘制组件可以在测量和布局阶段**输出渲染命令**。事实上，这提供了更接近某些游戏引擎的体验。

最典型的体现莫过于`tessera-ui-basic-components`中的`fluid_glass`组件，它组合了多个渲染管线和计算管线（用于后处理和计算自然饱和度）实现了高级的玻璃效果。这里展示一部分它的组件声明以给出一个直观的印象：

```rust
#[tessera]
pub fn fluid_glass(
    mut args: FluidGlassArgs,
    ripple_state: Option<Arc<RippleState>>,
    child: impl FnOnce(),
) {
    measure(Box::new(|input| {
        // ...

        if args.blur_radius > 0.0 {
            let blur_command = BlurCommand {
                radius: args.blur_radius,
                direction: (1.0, 0.0), // Horizontal
            };
            let blur_command2 = BlurCommand {
                radius: args.blur_radius,
                direction: (0.0, 1.0), // Vertical
            };
            let mut metadata = input.metadata_mut();
            metadata.push_compute_command(blur_command);
            metadata.push_compute_command(blur_command2);
        }

        if let Some(contrast_value) = args.contrast {
            let mean_command =
                MeanCommand::new(input.gpu, &mut input.compute_resource_manager.write());
            let contrast_command =
                ContrastCommand::new(contrast_value, mean_command.result_buffer_ref());
            let mut metadata = input.metadata_mut();
            metadata.push_compute_command(mean_command);
            metadata.push_compute_command(contrast_command);
        }

        let drawable = FluidGlassCommand {
            args: args_measure_clone.clone(),
        };

        input.metadata_mut().push_draw_command(drawable);

        // ...
    }));

    // ...
}
```

它看起来是这样的

![fluild-glass](/what-is-tessera-5.png)

## 加入 Tessera 的开发

Tessera 是一个开放的社区项目，我们欢迎任何形式的贡献，无论是代码、文档还是宝贵的建议。如果你对其设计理念感兴趣，或者想一起构建下一代 Rust UI 框架，请查看我们的 GitHub 仓库并阅读贡献指南！

Github: <https://github.com/tessera-ui/tessera>

贡献指南: <https://github.com/tessera-ui/tessera/blob/main/docs/CONTRIBUTING_zh-CN.md>
