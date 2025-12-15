import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import ArticleMetadata from "./ArticleMetadata.vue";
import "./style.css";
import type { Theme } from "vitepress";

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-before": () => h(ArticleMetadata),
    });
  },
} satisfies Theme;
