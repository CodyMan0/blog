import type { Metadata } from "next";
import { TechIndex } from "@/components/tech-index";

export const metadata: Metadata = {
  title: "기술",
  description:
    "실무에서 부딪힌 문제 하나를 붙들고 원리까지 내려간 기록. 실무자가 기본기를 쌓아가는 방법에 대한 실험입니다.",
  alternates: { canonical: "/tech", languages: { ko: "/tech", en: "/en/tech" } },
};

export default function Page() {
  return <TechIndex lang="ko" />;
}
