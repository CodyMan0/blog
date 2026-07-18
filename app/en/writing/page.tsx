import type { Metadata } from "next";
import { WritingIndex } from "@/components/writing-index";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Writing",
  description: "Monthly retrospectives on how I work and grow.",
  keywords: [...siteConfig.keywords.en],
  alternates: {
    canonical: "/en/writing",
    languages: { ko: "/writing", en: "/en/writing" },
  },
};

export default function Page() {
  return <WritingIndex lang="en" />;
}
