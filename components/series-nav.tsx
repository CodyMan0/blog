import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import type { Series } from "@/lib/series";
import { SERIES_META } from "@/lib/series";
import { writingHref, type Lang } from "@/lib/config";

const t = {
  // count는 목차 머리(총 편수), order는 각 글의 순번 — 둘이 같은 모양이면 헷갈려서 접두어로 구분
  ko: { count: (n: number) => `총 ${n}편`, order: (n: number) => `${n}편` },
  en: { count: (n: number) => `${n} parts`, order: (n: number) => `Part ${n}` },
} as const;

/** 글 하단 시리즈 목차 — 같은 시리즈의 글을 순서대로 보여주고 현재 글을 표시 */
export function SeriesNav({
  series,
  posts,
  currentSlug,
  lang,
}: {
  series: Series;
  posts: PostMeta[];
  currentSlug: string;
  lang: Lang;
}) {
  if (posts.length === 0) return null;
  const meta = SERIES_META[series];
  const tx = t[lang];

  return (
    <nav
      aria-label={meta.label[lang]}
      className="mt-14 rounded-lg border border-border p-5"
    >
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-semibold text-accent">{meta.label[lang]}</span>
        <span className="text-xs text-muted">{tx.count(posts.length)}</span>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{meta.tagline[lang]}</p>

      <ol className="mt-4 flex flex-col gap-1">
        {posts.map((post, i) => {
          const current = post.slug === currentSlug;
          return (
            <li key={post.slug} className="flex items-baseline gap-3 text-sm">
              <span className="w-10 shrink-0 font-mono text-xs tabular-nums text-muted">
                {tx.order(post.seriesOrder || i + 1)}
              </span>
              {current ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {post.title}
                </span>
              ) : (
                <Link
                  href={writingHref(lang, post.slug)}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {post.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** 목록·글 머리에 붙는 작은 시리즈 배지 */
export function SeriesBadge({
  series,
  order,
  lang,
}: {
  series: Series;
  order?: number;
  lang: Lang;
}) {
  const label = SERIES_META[series].label[lang];
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-2 py-0.5 text-xs font-medium text-accent">
      {label}
      {order ? <span className="text-accent/70">{t[lang].order(order)}</span> : null}
    </span>
  );
}
