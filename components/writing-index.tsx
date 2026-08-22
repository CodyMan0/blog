import { getAllPosts } from "@/lib/posts";
import { PostsBrowser } from "@/components/posts-browser";
import type { Lang } from "@/lib/config";

const t = {
  ko: { title: "회고", desc: "매달의 경험과 성장을 남깁니다." },
  en: { title: "Writing", desc: "Monthly retrospectives on how I work and grow." },
} as const;

export function WritingIndex({ lang = "ko" }: { lang?: Lang }) {
  // 기술은 /tech 로 분리. 영어는 블로그로 다루지 않아 목록에 올리지 않는다
  const posts = getAllPosts(lang).filter((p) => p.category === "회고");
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
