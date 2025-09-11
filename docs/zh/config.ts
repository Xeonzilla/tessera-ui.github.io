import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tessera",
  description: "为 Rust 设计的声明式、立即模式的 UI 框架",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/zh/" },
      { text: "手册", link: "/zh/guide/getting-started" },
      { text: "关于", link: "/zh/about/about" },
    ],

    sidebar: [
      {
        text: "手册",
        items: [
          { text: "什么是 Tessera?", link: "/zh/guide/what-is-tessera" },
          { text: "快速开始", link: "/zh/guide/getting-started" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tessera-ui/tessera" },
    ],

    footer: {
      message: "可按 MIT 或 Apache-2.0 许可证选择许可。",
      copyright: "版权所有 © Tessera UI Framework Developers"
    },

    i18nRouting: true,
  },
});
