import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import type { Lang } from "@/lib/config";

const t = {
  ko: { title: "회고", desc: "매달의 경험과 성장을 남깁니다." },
  en: { title: "Writing", desc: "Monthly notes on how I work and grow." },
} as const;

export function WritingIndex({ lang = "ko" }: { lang?: Lang }) {
  const posts = getAllPosts(lang);
  const tx = t[lang];
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{tx.title}</h1>
      <p className="mt-2 text-muted">{tx.desc}</p>
      <div className="mt-8">
        <PostList posts={posts} lang={lang} />
      </div>
    </div>
  );
}
