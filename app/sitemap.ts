import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const posts = getAllPosts("ko");

  // 각 페이지를 ko 정규 URL + en 대체(hreflang)로 등록
  const withAlternates = (
    koPath: string,
    enPath: string,
  ): { url: string; alternates: { languages: Record<string, string> } } => ({
    url: `${base}${koPath}`,
    alternates: { languages: { ko: `${base}${koPath}`, en: `${base}${enPath}` } },
  });

  // 색인 대상 = 홈 · 회고 목록 · 기술 목록 (세 핵심 페이지)
  const staticRoutes: MetadataRoute.Sitemap = [
    { ...withAlternates("/", "/en"), changeFrequency: "weekly", priority: 1 },
    {
      ...withAlternates("/writing", "/en/writing"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      ...withAlternates("/tech", "/en/tech"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 개별 글 중 sitemap에 넣는 건 검색 색인 대상인 기술 글뿐.
  // (회고·영어 글은 noindex라 sitemap에서도 제외 — 색인 정책과 일치)
  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.category === "기술")
    .map((post) => ({
      ...withAlternates(`/writing/${post.slug}`, `/en/writing/${post.slug}`),
      lastModified: post.dateValue ? new Date(post.dateValue) : undefined,
      changeFrequency: "monthly",
      // 개별 글은 홈(1.0)·목록(0.8)보다 낮게 — 검색 사이트링크가 글로 파편화되지 않도록
      priority: 0.4,
    }));

  return [...staticRoutes, ...postRoutes];
}
