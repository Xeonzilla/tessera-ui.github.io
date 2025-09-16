import { defineConfig, UserConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import { withI18n } from "vitepress-i18n";
import { VitePressI18nOptions } from "vitepress-i18n/types";

const vitePressConfig: UserConfig = {
  base: "/",
  title: "Tessera",
  description: "A declarative, immediate-mode UI framework for Rust",

  sitemap: {
    hostname: "https://tessera-ui.github.io/",
  },

  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    [
      "script",
      {},
      `
    (function() {
      const { pathname, search, hash } = window.location;
      const base = '/';

      const prefixes = ['/tessera-official-website', '/tessera-offcial-website'];
      for (const prefix of prefixes) {
        if (pathname.startsWith(prefix)) {
          const newPath = pathname.slice(prefix.length) || '/';
          window.location.replace(newPath + search + hash);
          return;
        }
      }

      if (pathname === base || pathname === (base + 'index.html')) {
        const userLang = navigator.language;
        if (userLang.toLowerCase().startsWith('zh')) {
          window.location.replace(base + 'zhHans/' + search + hash);
        }
      }

      if (pathname.startsWith(base + 'zh/')) {
        // redirect /zh/ to /zhHans/
        const newPath = pathname.replace(base + 'zh/', base + 'zhHans/');
        window.location.replace(newPath + search + hash);
        return;
      }
    })();
    `,
    ],
  ],

  rewrites: {
    "en/:rest*": ":rest*",
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/icon-text-only.svg",
    siteTitle: false,

    socialLinks: [
      { icon: "github", link: "https://github.com/tessera-ui/tessera" },
    ],

    search: {
      provider: "local",
    },

    footer: {
      message: "Licensed under the MIT or Apache-2.0 at your option.",
      copyright: "Copyright © Tessera UI Framework Developers",
    },

    i18nRouting: true,
  },
};

const supportedLocales = ["en", "zhHans"];
const rootLocale = "en";

const commonVitePressSidebarConfig = {
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  sortMenusByFrontmatterOrder: true,
  manualSortFileNameByPriority: ["about", "guide", "components"],
  excludeByGlobPattern: ["about/**"],
};

const vitePressSidebarConfigs = supportedLocales.map((lang) => ({
  ...commonVitePressSidebarConfig,
  ...(lang === rootLocale ? {} : { basePath: `/${lang}/` }),
  documentRootPath: `docs/${lang}`,
  resolvePath: lang === rootLocale ? "/" : `/${lang}/`,
  collapsed: true,
}));

const vitePressI18nConfig: VitePressI18nOptions = {
  // VitePress I18n config
  locales: ["en", "zhHans"],
  themeConfig: {
    zhHans: {
      nav: [
        { text: "主页", link: "/zhHans" },
        { text: "手册", link: "/zhHans/guide/getting-started" },
        { text: "关于", link: "/zhHans/about" },
      ],
    },
    en: {
      nav: [
        { text: "Home", link: "/" },
        { text: "Guide", link: "/guide/getting-started" },
        { text: "About", link: "/about" },
      ],
    },
  },
};

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withSidebar(
    withI18n(vitePressConfig, vitePressI18nConfig),
    vitePressSidebarConfigs
  )
);
