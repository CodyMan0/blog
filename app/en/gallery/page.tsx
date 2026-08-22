import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { getGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos by Ju young Lee.",
  alternates: { canonical: "/en/gallery", languages: { ko: "/gallery", en: "/en/gallery" } },
};

export default function Page() {
  return <Gallery groups={getGallery()} lang="en" />;
}
