import { createContentLoader } from "vitepress";

interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
  };
  excerpt: string | undefined;
  author: string | undefined;
  wordCount: number;
  readingTime: number;
}

declare const data: Post[];
export { data };

export default createContentLoader("en/blog/*.md", {
  excerpt: true,
  includeSrc: true,
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => url !== "/en/blog/")
      .map(({ url, frontmatter, excerpt, src }) => {
        const content = src || "";
        const cn = (content.match(/[一-龥]/g) || []).length;
        const en = (
          content
            .replace(/[一-龥]/g, " ")
            .match(
              /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff\u3105-\u312d\u31a0-\u31b7\uff00-\uffef]/g,
            ) || []
        ).length;
        const words = cn + en;
        const readingTime = Math.ceil(cn / 400 + en / 200);

        return {
          title: frontmatter.title,
          url: url.slice('/en'.length), // remove /en for correct url.
          excerpt,
          date: formatDate(frontmatter.date),
          author: frontmatter.author,
          wordCount: words,
          readingTime: readingTime,
        };
      })
      .sort((a, b) => b.date.time - a.date.time);
  },
});

function formatDate(raw: string): Post["date"] {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    string: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
