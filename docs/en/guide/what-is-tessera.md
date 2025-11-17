---
title: What is Tessera?
order: 0
---

# What is Tessera

Tessera is a declarative, immediate-mode UI framework for Rust that emphasizes performance, flexibility, and extensibility through a functional approach and a pluggable shader system.

## Core concepts

Tessera's architecture is built around several core concepts:

### Declarative function components

> "Programming can be liberated from the von Neumann style."
>
> — John Backus, 1977

Tessera uses Rust's macro system (`#[tessera]`) to let developers define UI components as functions; each component is a normal Rust function without special return types or structures. This approach makes components easy to compose and reuse.

For example, the following is a simple Tessera application that demonstrates how `tessera` composes:

```rust
#[tessera]
fn app() {
    surface(
        SurfaceArgsBuilder::default()
            .style(Color::WHITE.into())
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

### Immediate mode

Tessera adopts the immediate-mode UI paradigm, meaning the UI is rebuilt every frame rather than maintaining a persistent UI tree. This choice is driven by three main reasons:

- **Reduced mental overhead for state management**: immediate mode allows following a strict one-way data flow, `UI = f(state)`, simplifying state management.

For example, consider an application with state:

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
            .style(Color::WHITE.into())
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

Here you can clearly see how the `RippleState` used to control animation progress is passed into the `button` component, following a strict one-way data flow and ultimately originating in the `main` function.

![just-a-button](/what-is-tessera-2.png)

- **Natural animation implementation**: because the UI is rebuilt every frame, animations can be implemented simply by updating state and re-rendering without a complex animation system.

For example, the `bottom_sheet` component in `tessera-ui-basic-components` implements nonlinear bottom pop animations this way.

![show-bottom-sheet](/what-is-tessera-3.gif)

Or this glass-style `switch` component that I like:

![show-glass-switch](/what-is-tessera-4.gif)

- **Concurrent layout computation**: since the UI is reconstructed each frame, Tessera can leverage parallel computation to accelerate measurement and rendering. This is why state is always passed via `Arc`.

### Pluggable shaders

Perhaps Tessera's most distinctive feature is its pluggable shader system. Tessera does not ship with built-in components, shaders, or a canvas abstraction. Instead, it exposes low-level rendering pipeline interfaces that allow developers to register custom WGPU shaders and pipelines. At the lowest level, drawable components can output render commands during the measure and layout phases. This gives an experience closer to some game engines.

The most typical example is the `fluid_glass` component in `tessera-ui-basic-components`, which composes multiple render and compute pipelines (for post-processing and natural saturation computation) to achieve an advanced glass effect. Here is a portion of its component declaration to give an impression:

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

It looks like this

![fluild-glass](/what-is-tessera-5.png)

## Contributing to Tessera development

Tessera is an open community project and welcomes contributions of code, documentation, and feedback. If you're interested in the design or want to help build the next-generation Rust UI framework, please check our GitHub repository and read the contribution guide!

Github: <https://github.com/tessera-ui/tessera>

Contribution guide: <https://github.com/tessera-ui/tessera/blob/main/CONTRIBUTING.md>
