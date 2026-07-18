import Link from "next/link";
import type { Post } from "@/lib/posts";
import { Mdx } from "@/components/mdx";
import { JsonLd } from "@/components/json-ld";
import { formatDate } from "@/lib/format";
import { siteConfig, writingHref, type Lang } from "@/lib/config";

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
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "en" ? "Writing" : "회고",
        item: `${siteConfig.url}${writingHref(lang)}`,
      },
      { "@type": "ListItem", position: 2, name: post.title, item: canonical },
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
    </article>
  );
}
