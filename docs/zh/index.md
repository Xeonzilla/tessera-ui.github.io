---
layout: home

hero:
  text: "为 Rust 设计的<br><span class='rotating-words'><span>声明式</span><span>立即模式</span><span>并行化</span><span>跨平台</span><span>着色器优先</span></span><br>UI 框架"
  tagline: "在 Rust 中构建下一代界面 —— GPU 优先的性能与现代化、符合人体工程学的组件模型。"
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: 源代码
      link: https://github.com/tessera-ui/tessera
  image:
    src: /icon-T-3d.svg
    alt: Tessera Logo

features:
  - icon: 🧩
    title: 声明式组件模型
    details: 使用 <code>&#35;[tessera]</code> 宏，通过简单的函数定义并组合组件，风格简洁且符合 Rust 的习惯用法。
  - icon: 📐
    title: 强大而灵活的布局系统
    details: 基于约束（Fixed、Wrap、Fill）的布局引擎，以及 <code>row</code>、<code>boxed</code> 与 <code>column</code> 等组件，使响应式布局变得轻松。
  - icon: 🎨
    title: 着色器优先
    details: 着色器为一等公民，可在任意阶段实现自定义视觉效果，或使用 GPU 进行通用计算。
  - icon: ⚡
    title: 高度并行化
    details: 立即模式的渲染与布局充分利用多核 CPU，提供出色的可扩展性与性能。
  - icon: 🖥️
    title: 跨平台
    details: 支持 Windows、macOS 和 Linux，适用于桌面与嵌入式 UI 应用。
  - icon: 🚀
    title: 面向未来
    details: 以可扩展性与实验性为设计目标，Tessera 不只是另一个 UI 工具包 —— 它是面向下一代界面设计的试验场。
---
