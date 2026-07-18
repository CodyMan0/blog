import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/lib/posts";
import { Mdx } from "@/components/mdx";
import { JsonLd } from "@/components/json-ld";
import { formatDate } from "@/lib/format";
import { siteConfig } from "@/lib/config";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs("ko").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("ko", slug);
  if (!post) return {};

  const url = `/writing/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: { ko: url, en: `/en${url}` },
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [siteConfig.nameEn],
      tags: post.tags,
      images: [{ url: siteConfig.avatar }],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost("ko", slug);
  if (!post) notFound();

  const canonical = `${siteConfig.url}/writing/${slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "ko",
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: siteConfig.nameEn,
      url: siteConfig.url,
    },
    image: `${siteConfig.url}${siteConfig.avatar}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "회고", item: `${siteConfig.url}/writing` },
      { "@type": "ListItem", position: 2, name: post.title, item: canonical },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />

      <Link href="/writing" className="text-sm text-muted hover:text-accent">
        ← 회고
      </Link>

      <header className="mb-10 mt-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date, "ko")}</time>
          <span>·</span>
          <span>{post.readingMinutes} min read</span>
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
