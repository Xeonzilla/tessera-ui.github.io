import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tessera",
  description: "为 Rust 设计的声明式、立即模式的 UI 框架",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/zh/" },
      { text: "手册", link: "/zh/quick-start/what-is-tessera" },
      {
        text: "简体中文",
        items: [
          { text: "English", link: "/" },
          { text: "简体中文", link: "/zh/" },
        ],
      },
    ],

    sidebar: [
      {
        text: "快速开始",
        items: [
          { text: "何为 Tessera?", link: "/zh/quick-start/what-is-tessera" },
        ],
      },
    ],
  },
});
