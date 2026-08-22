import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getTechRoots } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { siteConfig, techHref, writingHref, type Lang } from "@/lib/config";

const t = {
  ko: {
    lead: [
      "AI로 작업 방식은 크게 바뀌었지만, 바뀌지 않는 것을 익히려 합니다.",
      "매달 회고하고, 문제를 구조적으로 분해해 지식으로 남깁니다.",
    ],
    recent: "회고",
    recentDesc: "매달의 경험과 성장",
    tech: "기술",
    techDesc: "협업에서 만난 문제를 파보며",
    viewAll: "전체 보기",
    empty: "곧 채웁니다.",
  },
  en: {
    lead: [
      "AI changed how I work, but I keep after the parts that did not change.",
      "Every month I look back, then break each problem down into knowledge.",
    ],
    recent: "Writing",
    recentDesc: "Monthly experience and growth",
    tech: "Engineering",
    techDesc: "Digging into problems from real teamwork",
    viewAll: "View all",
    empty: "Coming soon.",
  },
} as const;

export function Home({ lang = "ko" }: { lang?: Lang }) {
  // 회고와 기술은 성격이 달라 섞지 않는다
  const memoirs = getAllPosts(lang)
    .filter((p) => p.category === "회고")
    .slice(0, 5);
  const tech = getTechRoots(lang).slice(0, 5);
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

      {/* 회고 · 기술 반반. 좁은 화면에서는 위아래로 쌓인다 */}
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
            <p className="py-6 text-sm text-muted">{tx.empty}</p>
          )}
        </section>

        <section>
          <div className="mb-1 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">{tx.tech}</h2>
            <Link
              href={techHref(lang)}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {tx.viewAll}
            </Link>
          </div>
          <p className="mb-4 text-sm text-muted">{tx.techDesc}</p>
          {tech.length > 0 ? (
            <PostList posts={tech} lang={lang} href={techHref} />
          ) : (
            <p className="py-6 text-sm text-muted">{tx.empty}</p>
          )}
        </section>
      </div>
    </div>
  );
}
