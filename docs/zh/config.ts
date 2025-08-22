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
          { text: "快速开始", link: "/zh/guide/getting-started" },
          { text: "何为 Tessera?", link: "/zh/guide/what-is-tessera" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tessera-ui/tessera" },
    ],

    i18nRouting: true,
  },
});
