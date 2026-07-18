import type { Metadata } from "next";
import { getPost } from "./posts";
import { siteConfig, writingHref, type Lang } from "./config";

export function buildPostMetadata(lang: Lang, slug: string): Metadata {
  const post = getPost(lang, slug);
  if (!post) return {};
  const path = writingHref(lang, slug);
  return {
    title: post.title,
    description: post.description,
    keywords: [...siteConfig.keywords[lang], ...post.tags],
    alternates: {
      canonical: path,
      languages: {
        ko: writingHref("ko", slug),
        en: writingHref("en", slug),
      },
    },
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.description,
      locale: lang === "en" ? "en_US" : "ko_KR",
      publishedTime: post.date,
      authors: [siteConfig.nameEn],
      tags: post.tags,
      images: [{ url: siteConfig.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}
