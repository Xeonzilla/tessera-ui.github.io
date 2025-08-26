# Getting Started

This section guides you through creating a basic `tessera` application.

## Installation

### Prerequisites

- The [Rust](https://www.rust-lang.org) programming language

## Create a new project

Currently we don't provide a scaffolding tool to create new projects (planned for the future). You can manually create a new Rust project and initialize it as a `tessera` project with:

```bash
cargo new my-tessera-app
cd my-tessera-app
```

## Add dependencies

For a basic example we only need the `tessera-ui` and `tessera-ui-basic-components` dependencies.

`tessera-ui` is the core UI library for `tessera`, providing infrastructure and tools to build the UI, while `tessera-ui-basic-components` provides common base components. They are decoupled; if you don't need the basic components you can omit the second dependency.

For our simple example, reimplementing shaders and layouts is too complex, so `tessera-ui-basic-components` is required.

```bash
cargo add tessera-ui
cargo add tessera-ui-basic-components
```

## Create your first `tessera` app

This tutorial will guide you to create a basic `tessera` app with a simple white background and "Hello, World!" text.

### Create the renderer

The entry point of a `tessera` app is the renderer, which handles window management, the render loop, and event handling. We must create and run a renderer instance.

Replace the default `main` function in `src/main.rs` with the following code:

```rust
use tessera_ui::{Renderer, renderer::TesseraConfig};

fn main() {
    // Configure the renderer here
    let config = TesseraConfig {
        window_title: "Tessera Example".to_string(), // Window title
        ..Default::default()                         // Use default values for other settings
    };
    Renderer::run_with_config(
        || {}, // UI entry function—implemented in the next step; pass an empty closure for now
        |app| {
            tessera_ui_basic_components::pipelines::register_pipelines(app); // Register pipelines required by tessera-ui-basic-components
        },
        config,
    )
    .unwrap();
}
```

Run `cargo run` to see a black or transparent window.

![Black window](/getting-start-1.png)

### Add your first `tessera`

In `tessera`, each component is a function marked with the `tessera` macro; we also call components "tessera".

#### Add a background

First add a maximized white `surface` as the background.

```rust
use tessera_ui::{Color, DimensionValue, Renderer, renderer::TesseraConfig, tessera};
use tessera_ui_basic_components::surface::{SurfaceArgsBuilder, surface};

fn main() {
    // Configure the renderer here
    let config = TesseraConfig {
        window_title: "Tessera Example".to_string(), // Window title
        ..Default::default()                         // Use default values for other settings
    };
    Renderer::run_with_config(
        || app(), // UI entry function; app is the top-level tessera
        |app| {
            tessera_ui_basic_components::pipelines::register_pipelines(app); // Register pipelines required by tessera-ui-basic-components
        },
        config,
    )
    .unwrap();
}

#[tessera]
fn app() {
    surface(
        SurfaceArgsBuilder::default()
            .color(Color::WHITE) // Background color
            .width(DimensionValue::FILLED) // Fill parent width
            .height(DimensionValue::FILLED) // Fill parent height
            .build()
            .unwrap(),
        None, // Ripple state for click animations; None for background surface
        || {
            // surface is a container; place child content here; empty for now
        },
    );
}
```

Run `cargo run` again to see a white window.

![White window](/getting-start-2.png)

#### Add text

Next add a text component displaying "Hello, World!" on the background.

```rust
use tessera_ui::{Color, DimensionValue, Renderer, renderer::TesseraConfig, tessera};
use tessera_ui_basic_components::{surface::{surface, SurfaceArgsBuilder}, text::text};

fn main() {
    // Configure the renderer here
    let config = TesseraConfig {
        window_title: "Tessera Example".to_string(), // Window title
        ..Default::default()                         // Use default values for other settings
    };
    Renderer::run_with_config(
        || app(), // UI entry function is placed in app below; you can also write it inline
        |app| {
            tessera_ui_basic_components::pipelines::register_pipelines(app); // Register pipelines required by tessera-ui-basic-components
        },
        config,
    )
    .unwrap();
}

#[tessera]
fn app() {
    surface(
        SurfaceArgsBuilder::default()
            .color(Color::WHITE) // Background color
            .width(DimensionValue::FILLED) // Fill parent width
            .height(DimensionValue::FILLED) // Fill parent height
            .build()
            .unwrap(),
        None, // Ripple state for click animations; None for background surface
        || {
            text("Hello, World!") // HELLO THERE :)
        },
    );
}
```

Running `cargo run` now shows a white window with black "Hello, World!" text.

![HelloHello](/getting-start-3.png)
