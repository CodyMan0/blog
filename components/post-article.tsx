import Link from "next/link";
import type { Post } from "@/lib/posts";
import { Mdx } from "@/components/mdx";
import { JsonLd } from "@/components/json-ld";
import { ViewCounter } from "@/components/view-counter";
import { LikeButton } from "@/components/like-button";
import { Comments } from "@/components/comments";
import { formatDate } from "@/lib/format";
import { siteConfig, homeHref, writingHref, type Lang } from "@/lib/config";
import { CATEGORY_LABEL } from "@/lib/categories";

const t = {
  ko: { back: "← 회고", read: "분 읽기" },
  en: { back: "← Writing", read: "min read" },
} as const;

export function PostArticle({ post, lang }: { post: Post; lang: Lang }) {
  const tx = t[lang];
  const path = writingHref(lang, post.slug);
  const canonical = `${siteConfig.url}${path}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: lang,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: siteConfig.nameEn, url: siteConfig.url },
    image: `${siteConfig.url}${siteConfig.avatar}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    articleSection: CATEGORY_LABEL[post.category][lang],
  };
  // 홈 › 카테고리(회고/기술/영어) › 글 — 검색 결과에 계층이 드러나도록 3단
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "en" ? siteConfig.nameEn : siteConfig.name,
        item: `${siteConfig.url}${homeHref(lang)}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: CATEGORY_LABEL[post.category][lang],
        item: `${siteConfig.url}${writingHref(lang)}`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      <Link href={writingHref(lang)} className="text-sm text-muted hover:text-accent">
        {tx.back}
      </Link>

      <header className="mb-10 mt-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">{post.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          <span>·</span>
          <span>
            {post.readingMinutes} {tx.read}
          </span>
          <ViewCounter slug={post.slug} lang={lang} />
        </div>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose">
        <Mdx source={post.content} />
      </div>

      <LikeButton slug={post.slug} lang={lang} />
      <Comments slug={post.slug} lang={lang} />
    </article>
  );
}
