<template>
  <div v-if="showMetadata" class="article-metadata">
    <div class="meta-item" v-if="author">
      <template v-if="githubName">
        <a
          :href="`https://github.com/${githubName}`"
          target="_blank"
          rel="noopener noreferrer"
          class="author-link"
        >
          <img
            :src="`https://github.com/${githubName}.png`"
            class="avatar"
            alt="author avatar"
          />
          <span class="label">{{ author }}</span>
        </a>
      </template>
      <template v-else>
        <User :size="16" class="icon" />
        <span class="label">{{ author }}</span>
      </template>
    </div>
    <div class="meta-item" v-if="wordCount">
      <FileText :size="16" class="icon" />
      <span class="label">{{ wordCount }}</span>
    </div>
    <div class="meta-item" v-if="readingTime">
      <Clock :size="16" class="icon" />
      <span class="label">{{ readingTime }} {{ labelMin }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useData } from "vitepress";
import { User, FileText, Clock } from "lucide-vue-next";

const { frontmatter, page, lang } = useData();

// console.log('Frontmatter:', frontmatter.value)

const showMetadata = computed(() => {
  return (
    frontmatter.value.layout !== "home" &&
    (frontmatter.value.author ||
      (page.value.filePath.includes("/blog/") &&
        !page.value.filePath.endsWith("index.md")))
  );
});

const author = computed(() => frontmatter.value.author);
const githubName = computed(() => frontmatter.value.githubName);
const wordCount = computed(() => frontmatter.value.wordCount);
const readingTime = computed(() => frontmatter.value.readingTime);

const isZh = computed(
  () => lang.value === "zhHans" || lang.value.startsWith("zh"),
);

const labelMin = computed(() => (isZh.value ? "分钟" : "min"));
</script>

<style scoped>
.article-metadata {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
  padding: 1.25rem 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 0 4px 4px 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  align-items: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;
}

.author-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s;
}

.author-link:hover {
  opacity: 0.8;
  color: var(--vp-c-brand-1);
}

.icon {
  opacity: 0.8;
  color: var(--vp-c-brand-1);
}

.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
