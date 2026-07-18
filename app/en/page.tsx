import type { Metadata } from "next";
import { Home } from "@/components/home";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `${siteConfig.nameEn} — ${siteConfig.taglineEn}`,
  description: siteConfig.descriptionEn,
  keywords: [...siteConfig.keywords.en],
  alternates: { canonical: "/en", languages: { ko: "/", en: "/en" } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/en`,
    siteName: siteConfig.name,
    title: `${siteConfig.nameEn} — ${siteConfig.taglineEn}`,
    description: siteConfig.descriptionEn,
    images: [{ url: siteConfig.ogImage, width: 1920, height: 1282, alt: siteConfig.nameEn }],
  },
};

export default function Page() {
  return <Home lang="en" />;
}
