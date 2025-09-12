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

    search: {
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档"
          },
          modal: {
            displayDetails: "显示详细列表",
            resetButtonTitle: "清除查询条件",
            backButtonTitle: "关闭",
            noResultsText: "无法找到相关结果",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "回车键",
              navigateText: "切换",
              navigateUpKeyAriaLabel: "上方向键",
              navigateDownKeyAriaLabel: "下方向键",
              closeText: "关闭",
              closeKeyAriaLabel: "退出键"
            }
          }
        }
      }
    },

    footer: {
      message: "可按 MIT 或 Apache-2.0 许可证选择许可。",
      copyright: "版权所有 © Tessera UI Framework Developers"
    },

    i18nRouting: true,
  },
});
