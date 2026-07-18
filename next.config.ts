import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 기존 Docusaurus URL(/blog/*) → 새 URL(/writing/*) 영구 리다이렉트 (SEO·북마크 보존)
  async redirects() {
    return [
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/:slug", destination: "/writing/:slug", permanent: true },
      { source: "/en/blog", destination: "/en/writing", permanent: true },
      { source: "/en/blog/:slug", destination: "/en/writing/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
