import type { Metadata } from "next";
import { TechIndex } from "@/components/tech-index";

export const metadata: Metadata = {
  title: "Engineering",
  description: "One real problem, followed down to the principles. An experiment in how a working engineer builds fundamentals.",
  alternates: { canonical: "/en/tech", languages: { ko: "/tech", en: "/en/tech" } },
};

export default function Page() {
  return <TechIndex lang="en" />;
}
