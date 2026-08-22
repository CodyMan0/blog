import { getLayerGraph, getTechRoots } from "@/lib/posts";
import { TechBrowser, type TechItem } from "@/components/tech-browser";
import type { Lang } from "@/lib/config";

const t = {
  ko: { title: "기술", desc: "매달 만난 문제를 통해 기술적으로 동작 원리를 파악합니다." },
  en: {
    title: "Engineering",
    desc: "Working out how things actually run, through the problems I hit each month.",
  },
} as const;

export function TechIndex({ lang = "ko" }: { lang?: Lang }) {
  const items: TechItem[] = getTechRoots(lang).map((root) => {
    const { levels } = getLayerGraph(lang, root);
    return {
      slug: root.slug,
      title: root.title,
      description: root.description,
      date: root.date,
      topic: root.topic,
      // 진행 막대는 '글' 단위로만 — 본문 안의 층(section)은 세지 않는다
      nodes: levels
        .flat()
        .filter((n) => n.kind !== "section")
        .map((n) => ({ id: n.id, written: n.kind === "post" })),
    };
  });

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t[lang].title}</h1>
      <p className="mt-2 text-muted">{t[lang].desc}</p>
      <div className="mt-8">
        <TechBrowser items={items} lang={lang} />
      </div>
    </div>
  );
}
