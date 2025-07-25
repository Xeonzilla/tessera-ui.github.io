---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tessera"
  text: "为 Rust 设计的<br><span class='rotating-words'><span>声明式</span><span>立即模式</span><span>并行化</span><span>跨平台</span><span>着色器优先</span></span><br>UI 框架"
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/quick-start/what-is-tessera

features:
  - title: 声明式组件模型
    details: 使用 &#35;[tessera] 宏，通过简单的函数来定义和组合组件，代码干净直观。
  - title: 强大而灵活的布局系统
    details: 基于约束（Fixed、Wrap、Fill）的布局引擎，结合 row、boxed 和 column 等组件，可以轻松实现从简单到复杂的响应式布局。
  - title: 着色器优先
    details: 在 Tessera 中，着色器是一等公民。你随时可以很自然的实现任何效果，甚至使用gpu进行通用计算。
  - title: 高度并行化
    details: 由于采用立即模式，Tessera 的渲染和布局方式允许充分利用现代 CPU 的多核优势，提供卓越的性能。
---
