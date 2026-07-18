import { getAllPosts } from "@/lib/posts";
import { PostsBrowser } from "@/components/posts-browser";
import type { Lang } from "@/lib/config";

const t = {
  ko: { title: "글", desc: "회고 · 기술 · 영어 학습을 기록합니다." },
  en: { title: "Writing", desc: "Notes, engineering, and English learning." },
} as const;

export function WritingIndex({ lang = "ko" }: { lang?: Lang }) {
  const posts = getAllPosts(lang);
  const tx = t[lang];
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{tx.title}</h1>
      <p className="mt-2 text-muted">{tx.desc}</p>
      <div className="mt-8">
        <PostsBrowser posts={posts} lang={lang} />
      </div>
    </div>
  );
}
