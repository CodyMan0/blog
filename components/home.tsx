import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getPostStats } from "@/lib/stats";
import { PostList } from "@/components/post-list";
import { siteConfig, writingHref, type Lang } from "@/lib/config";

const t = {
  ko: {
    intro:
      "매달의 경험과 성장을 회고로 남깁니다. 문제를 정의하고, 부딪히고, 배운 것을 기록합니다.",
    recent: "회고",
    viewAll: "전체 보기",
  },
  en: {
    intro:
      "Monthly retrospectives on how I work and grow — defining problems, wrestling with them, and writing down what I learn.",
    recent: "Writing",
    viewAll: "View all",
  },
} as const;

export async function Home({ lang = "ko" }: { lang?: Lang }) {
  const recent = getAllPosts(lang).slice(0, 5);
  const stats = await getPostStats(recent.map((p) => p.slug));
  const tx = t[lang];
  const tagline = lang === "en" ? siteConfig.taglineEn : siteConfig.tagline;
  const name = lang === "en" ? siteConfig.nameEn : siteConfig.name;

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      {/* Hero: 모바일=사진 위, 데스크톱=사진 우측 */}
      <section className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {tagline}
          </h1>
          <p className="mt-2 text-muted">{name}</p>
          <p className="mt-4 leading-relaxed text-muted">{tx.intro}</p>
          <div className="mt-5 flex gap-4 text-sm">
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-accent">
              GitHub
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-accent">
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.social.email}`} className="text-muted transition-colors hover:text-accent">
              Email
            </a>
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

      <div className="mt-14">
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">{tx.recent}</h2>
            <Link
              href={writingHref(lang)}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {tx.viewAll}
            </Link>
          </div>
          <PostList posts={recent} lang={lang} stats={stats} />
        </section>
      </div>
    </div>
  );
}
