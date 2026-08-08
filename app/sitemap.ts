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

  const staticRoutes: MetadataRoute.Sitemap = [
    { ...withAlternates("/", "/en"), changeFrequency: "weekly", priority: 1 },
    {
      ...withAlternates("/writing", "/en/writing"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    ...withAlternates(`/writing/${post.slug}`, `/en/writing/${post.slug}`),
    lastModified: post.dateValue ? new Date(post.dateValue) : undefined,
    changeFrequency: "monthly",
    // 개별 글은 홈(1.0)·목록(0.8)보다 낮게 — 검색 사이트링크가 글로 파편화되지 않도록
    priority: 0.4,
  }));

  return [...staticRoutes, ...postRoutes];
}
