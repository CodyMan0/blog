import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { getGallery } from "@/lib/gallery";
import { NOINDEX } from "@/lib/post-seo";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos by Ju young Lee.",
  robots: NOINDEX,
  alternates: { canonical: "/en/gallery", languages: { ko: "/gallery", en: "/en/gallery" } },
};

export default function Page() {
  return <Gallery groups={getGallery()} lang="en" />;
}
