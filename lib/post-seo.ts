import type { Metadata } from "next";
import { getPost } from "./posts";
import { siteConfig, writingHref, type Lang } from "./config";

// 색인 정책: 홈·목록·기술 글만 검색에 노출. 나머지는 크롤은 허용하되(follow) 색인 제외.
export const NOINDEX: Metadata["robots"] = { index: false, follow: true };

export function buildPostMetadata(lang: Lang, slug: string): Metadata {
  const post = getPost(lang, slug);
  if (!post) return {};
  const path = writingHref(lang, slug);
  // 기술 글만 검색 색인(인바운드용). 회고·영어 글은 색인에서 제외.
  const robots = post.category === "기술" ? undefined : NOINDEX;
  return {
    title: post.title,
    description: post.description,
    keywords: [...siteConfig.keywords[lang], ...post.tags],
    ...(robots ? { robots } : {}),
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
