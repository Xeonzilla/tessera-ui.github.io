---
title: Getting Started
order: 1
---

# Getting Started

This section guides you through creating a basic `tessera` application.

## Installation

### Prerequisites

- The [Rust](https://www.rust-lang.org) programming language

## Create a project

Install the `cargo-tessera` CLI, which bundles project scaffolding, dev server, build helpers, and platform tooling for Tessera apps (we'll rely on it throughout the docs).

```bash
cargo install cargo-tessera
cargo tessera new
```

The CLI walks you through naming the project and choosing a template—pick the `blank` template for this tutorial.

## Your first `tessera`

In `tessera`, every component is a function marked with the `tessera` macro, so we often call components “tessera” as well.

### Add a background

Open your project's `src/lib.rs` and locate the generated `app` function, which should currently look like:

```rust
#[tessera]
fn app() {
    // Empty application
}
```

We'll replace that empty body with a maximized white `surface` acting as the background.

```rust
#[tessera]
fn app() {
    surface(
        SurfaceArgsBuilder::default()
            .style(Color::WHITE.into()) // Background color
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

Once `cargo tessera dev` rebuilds (or after restarting it), you'll see a white window.

![White window](/getting-start-2.png)

### Add text

Next add a text component displaying “Hello, World!” on top of that surface.

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
            text("Hello, World!") // HELLO THERE :)
        },
    );
}
```

After the dev server rebuilds, you'll see a white window with black “Hello, World!” text.

![HelloHello](/getting-start-3.png)

## What's next

Nice work! You now have a minimal Tessera app running. Continue with the [Tessera component model](../guide/component.md) to learn how components compose and manage state.
