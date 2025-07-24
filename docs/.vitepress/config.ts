import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tessera",
  description: "A declarative, immediate-mode UI framework for Rust",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/quick-start/what-is-tessera' },
      {
        text: "English",
        items: [
          { text: "English", link: "/" },
          { text: "简体中文", link: "/zh/" },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Quick Start',
        items: [
          { text: 'What is Tessera?', link: '/quick-start/what-is-tessera' },
        ]
      }
    ],

    locales: {
      root: {
        label: 'English',
      },
      zh: {
        label: '简体中文',
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
