import type { Metadata } from "next";
import { Gallery } from "@/components/gallery";
import { getGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "갤러리",
  description: "이주영의 사진 기록.",
  alternates: { canonical: "/gallery", languages: { ko: "/gallery", en: "/en/gallery" } },
};

export default function Page() {
  return <Gallery groups={getGallery()} lang="ko" />;
}
