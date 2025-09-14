---
layout: home

hero:
  text: "<span class='rotating-words'><span>Declarative</span><span>Immediate-mode</span><span>Parallelized</span><span>Cross-platform</span><span>Shader-first</span></span><br>UI framework for Rust"
  tagline: "Build next-generation interfaces with GPU-first performance and a modern, ergonomic component model."
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Source Code
      link: https://github.com/tessera-ui/tessera
  image:
    src: /icon-T-3d.svg
    alt: Tessera Logo

features:
  - icon: 🧩
    title: Declarative Component Model
    details: Define and compose components using simple functions with the <code>&#35;[tessera]</code> macro, resulting in clean and intuitive code.
  - icon: 📐
    title: Powerful and Flexible Layout System
    details: A constraint-based layout engine (Fixed, Wrap, Fill) plus components like <code>row</code>, <code>boxed</code>, and <code>column</code> make responsive layouts effortless.
  - icon: 🎨
    title: Shader-first
    details: Shaders are first-class citizens in Tessera. Implement custom effects at any stage, or harness the GPU for general-purpose computing.
  - icon: 🖥️
    title: Cross-Platform
    details: built on wgpu and winit, supporting Windows, Linux, macOS, and more.
---
