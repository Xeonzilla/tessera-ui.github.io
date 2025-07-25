---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tessera"
  text: "A declarative, immediate-mode UI framework for Rust"
  actions:
    - theme: brand
      text: Get Started
      link: /quick-start/what-is-tessera

features:
  - title: Declarative Component Model
    details: Define and compose components using simple functions with the &#35;[tessera] macro, resulting in clean and intuitive code.
  - title: Powerful and Flexible Layout System
    details: A constraint-based (Fixed, Wrap, Fill) layout engine, combined with components like row and column (inspired by Jetpack Compose), makes it easy to implement responsive layouts from simple to complex.
  - title: Shader-first
    details: Shaders are first-class citizens in Tessera. The core of Tessera doesn't come with built-in drawing primitives like a "brush". Instead, it provides an easy-to-use WGPU rendering/compute pipeline plugin system, offering an experience closer to some game engines. 
---

