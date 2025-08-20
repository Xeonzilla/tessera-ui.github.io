import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/tessera-official-website/",
  title: "Tessera",
  description: "A declarative, immediate-mode UI framework for Rust",
  head: [
    [
      "script",
      {},
      `
      (function() {
        const { pathname, search, hash } = window.location;
        const base = '/tessera-official-website/';
        if (pathname === base || pathname === (base + 'index.html')) {
          const userLang = navigator.language;
          if (userLang.toLowerCase().startsWith('zh')) {
            window.location.replace(base + 'zh/' + search + hash);
          }
        }
      })();
      `,
    ],
  ],

  locales: {
    root: {
      label: "English",
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/getting-started" },
      { text: "About", link: "/about/about" },
    ],

    sidebar: [
      {
        text: "Docs",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "What is Tessera?", link: "/guide/what-is-tessera" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tessera-ui/tessera" },
    ],

    i18nRouting: true,
  },
});
