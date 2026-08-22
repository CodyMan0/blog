import Link from "next/link";
import { getLayerGraph, type Post } from "@/lib/posts";
import { LayerMap } from "@/components/layer-map";
import { TopicChip } from "@/components/topic-chips";
import { techHref, writingHref, type Lang } from "@/lib/config";

const t = {
  ko: {
    back: "← 기술",
    lead: "이 문제가 어떤 질문으로 이어졌는지. 칸을 누르면 그 대목으로 갑니다.",
    read: "이 글부터 읽기 →",
  },
  en: {
    back: "← Engineering",
    lead: "The questions this problem led to. Click a box to jump there.",
    read: "Start with this post →",
  },
} as const;

/** 최상위 글의 층 설계도 페이지 — 큰 그림을 먼저 보고 원하는 층으로 들어간다 */
export function TechMapPage({ root, lang }: { root: Post; lang: Lang }) {
  const graph = getLayerGraph(lang, root);
  const tx = t[lang];

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <Link href={techHref(lang)} className="text-sm text-muted hover:text-accent">
        {tx.back}
      </Link>

      <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
        {root.title}
      </h1>
      {root.topic !== null && (
        <div className="mt-3">
          <TopicChip topic={root.topic} />
        </div>
      )}
      <p className="mt-3 leading-relaxed text-muted">{root.description}</p>
      <p className="mt-1 text-sm text-muted">{tx.lead}</p>

      <div className="mt-8">
        <LayerMap graph={graph} lang={lang} />
      </div>

      <Link
        href={writingHref(lang, root.slug)}
        className="mt-8 inline-block text-sm font-medium text-accent hover:underline"
      >
        {tx.read}
      </Link>
    </div>
  );
}
