import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { EmptyState } from "@/components/empty-state";
import { siteConfig, writingHref, type Lang } from "@/lib/config";

const t = {
  ko: {
    lead: [
      "AI로 작업 방식은 크게 바뀌었지만, 바뀌지 않는 것에 더 관심을 두고 학습해나가려 합니다.",
      "매달 회고하고, 문제를 구조적으로 나누어 지식을 습득합니다.",
    ],
    recent: "회고",
    recentDesc: "매달의 경험과 성장",
    ai: "AI 사용 회고",
    aiDesc: "AI를 사용하며 만난 고민들을 기록",
    viewAll: "전체 보기",
    empty: "준비중",
  },
  en: {
    lead: [
      "AI has changed the way I work, but I want to keep learning with more attention on what hasn't changed.",
      "I look back every month and learn by breaking problems down into their structure.",
    ],
    recent: "Retrospectives",
    recentDesc: "Monthly experiences and growth",
    ai: "AI Retrospectives",
    aiDesc: "Notes on the questions I run into while using AI",
    viewAll: "View all",
    empty: "Coming soon",
  },
} as const;

export function Home({ lang = "ko" }: { lang?: Lang }) {
  // 회고와 AI 성장기는 성격이 달라 섞지 않는다
  const memoirs = getAllPosts(lang)
    .filter((p) => p.category === "회고" && p.series !== "AI와 함께")
    .slice(0, 5);
  const ai = getAllPosts(lang)
    .filter((p) => p.series === "AI와 함께")
    .slice(0, 5);
  const tx = t[lang];
  const tagline = lang === "en" ? siteConfig.taglineEn : siteConfig.tagline;
  const name = lang === "en" ? siteConfig.nameEn : siteConfig.name;
  const role = lang === "en" ? siteConfig.roleEn : siteConfig.role;

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      {/* Hero: 모바일=사진 위, 데스크톱=사진 우측 */}
      <section className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {tagline}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {name} · {role}
          </p>

          {/* 큰 문장 두 줄이 곧 이 블로그의 선언 */}
          <div className="mt-6 flex max-w-[44ch] flex-col gap-2 text-lg leading-relaxed sm:text-xl">
            {tx.lead.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <Image
          src={siteConfig.avatar}
          alt={name}
          width={112}
          height={112}
          priority
          className="h-20 w-20 shrink-0 self-start rounded-full border border-border object-cover sm:h-28 sm:w-28"
        />
      </section>

      {/* 회고 · AI와 함께 성장기 반반. 좁은 화면에서는 위아래로 쌓인다 */}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section>
          <div className="mb-1 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">{tx.recent}</h2>
            <Link
              href={writingHref(lang)}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {tx.viewAll}
            </Link>
          </div>
          <p className="mb-4 text-sm text-muted">{tx.recentDesc}</p>
          {memoirs.length > 0 ? (
            <PostList posts={memoirs} lang={lang} />
          ) : (
            <EmptyState label={tx.empty} />
          )}
        </section>

        <section>
          <div className="mb-1 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">{tx.ai}</h2>
            <Link
              href={writingHref(lang)}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {tx.viewAll}
            </Link>
          </div>
          <p className="mb-4 text-sm text-muted">{tx.aiDesc}</p>
          {ai.length > 0 ? (
            <PostList posts={ai} lang={lang} />
          ) : (
            <EmptyState label={tx.empty} />
          )}
        </section>
      </div>
    </div>
  );
}
