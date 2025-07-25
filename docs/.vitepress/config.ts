import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/tessera-official-website/',
  title: "Tessera",
  description: "A declarative, immediate-mode UI framework for Rust",
  
  locales: {
    root: {
      label: 'English',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/quick-start/what-is-tessera' },
    ],

    sidebar: [
      {
        text: 'Quick Start',
        items: [
          { text: 'What is Tessera?', link: '/quick-start/what-is-tessera' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tessera-ui/tessera' }
    ],

    i18nRouting: true
  },
})
