import { getAllPosts } from "@/lib/posts";
import { siteConfig, writingHref } from "@/lib/config";

// 콘텐츠는 파일시스템 기반이라 빌드 시 정적 생성 (새 글은 배포 때 갱신)
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = siteConfig.url;
  const posts = getAllPosts("ko");
  const feedUrl = `${base}/rss.xml`;
  const lastBuild =
    posts.length > 0 ? new Date(posts[0].dateValue).toUTCString() : new Date(0).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${base}${writingHref("ko", post.slug)}`;
      const pubDate = new Date(post.dateValue).toUTCString();
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${esc(post.description)}</description>
      ${post.tags.map((tag) => `<category>${esc(tag)}</category>`).join("")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)} — ${esc(siteConfig.tagline)}</title>
    <link>${base}</link>
    <description>${esc(siteConfig.description)}</description>
    <language>ko</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
