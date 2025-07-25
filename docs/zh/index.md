---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Tessera"
  text: "为 Rust 设计的声明式、立即模式的 UI 框架"
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/quick-start/what-is-tessera

features:
  - title: 声明式组件模型
    details: 使用 &#35;[tessera] 宏，通过简单的函数来定义和组合组件，代码干净直观。
  - title: 强大而灵活的布局系统
    details: 基于约束（Fixed、Wrap、Fill）的布局引擎，结合 row 和 column 等组件（灵感来自 Jetpack Compose），可以轻松实现从简单到复杂的响应式布局。
  - title: 着色器优先
    details: 在 Tessera 中，着色器是一等公民。Tessera 的核心没有内置“画刷”之类的绘图基元。相反，它提供了一个易于使用的 WGPU 渲染/计算管线插件系统，提供了更接近某些游戏引擎的体验。
---

