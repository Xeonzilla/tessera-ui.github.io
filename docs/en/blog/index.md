---
title: Blog
---

<script setup>
import { data as posts } from './posts.data.ts'
</script>

# Blog

Welcome to the Tessera Blog. Here we share the latest updates and stories.

<div v-for="post in posts" :key="post.url" class="post-item">
  <h2>
    <a :href="post.url">{{ post.title }}</a>
  </h2>
  <div class="post-date">{{ post.date.string }}</div>
  <div v-if="post.excerpt" v-html="post.excerpt"></div>
</div>

<style>
.post-item {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 1rem;
}
.post-date {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}
</style>
