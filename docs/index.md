---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tessera"
  text: "A <span class='rotating-words'><span>declarative</span><span>immediate-mode</span><span>parallelized</span><span>cross-platform</span><span>shader-first</span></span><br>UI framework for Rust"
  actions:
    - theme: brand
      text: Get Started
      link: /quick-start/what-is-tessera

features:
  - title: Declarative Component Model
    details: Define and compose components using simple functions with the &#35;[tessera] macro, resulting in clean and intuitive code.
  - title: Powerful and Flexible Layout System
    details: A constraint-based (Fixed, Wrap, Fill) layout engine, combined with components like row, boxed, and column, makes it easy to implement responsive layouts from simple to complex.
  - title: Shader-first
    details: Shaders are first-class citizens in Tessera. You can naturally implement any effect at any time, even using the GPU for general-purpose computing.
  - title: Highly Parallelized
    details: Due to its immediate-mode nature, Tessera's rendering and layout methods allow for full utilization of modern multi-core CPUs, delivering exceptional performance.
---
