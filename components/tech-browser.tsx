"use client";

import { useState } from "react";
import Link from "next/link";
import { TopicChip } from "@/components/topic-chips";
import { techHref, type Lang } from "@/lib/config";
import { formatShort } from "@/lib/format";

export type TechItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  topic: string | null;
  /** 이 트리의 전체 노드 — written 이면 이미 쓴 글 */
  nodes: { id: string; written: boolean }[];
};

const t = {
  ko: {
    filtered: (topic: string, n: number) => `${topic} · ${n}편`,
    clear: "필터 해제",
    open: "어디까지 팠는지 보기 →",
    progress: (written: number, total: number) => `글 ${written} / ${total} 공개`,
    empty: "아직 글이 없어요.",
  },
  en: {
    filtered: (topic: string, n: number) => `${topic} · ${n}`,
    clear: "Clear filter",
    open: "See how deep it goes →",
    progress: (written: number, total: number) => `${written} / ${total} published`,
    empty: "No posts yet.",
  },
} as const;

export function TechBrowser({ items, lang }: { items: TechItem[]; lang: Lang }) {
  const [selected, setSelected] = useState<string | null>(null);
  const tx = t[lang];

  const shown = selected === null ? items : items.filter((i) => i.topic === selected);
  const toggle = (topic: string) => setSelected((cur) => (cur === topic ? null : topic));

  return (
    <div>
      {/* 필터는 태그를 누르기 전엔 없다. 걸렸을 때만 한 줄로 알린다 */}
      {selected !== null && (
        <div className="mb-6 flex items-center gap-3 text-sm">
          <span className="font-medium text-accent">{tx.filtered(selected, shown.length)}</span>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="text-xs text-muted underline underline-offset-2 hover:text-foreground"
          >
            {tx.clear}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {shown.length === 0 && <p className="py-8 text-sm text-muted">{tx.empty}</p>}
        {shown.map((item) => {
          const written = item.nodes.filter((n) => n.written).length;
          return (
            <article
              key={item.slug}
              className="group rounded-lg border border-border p-5 transition-colors hover:border-accent"
            >
              <Link href={techHref(lang, item.slug)} className="flex items-baseline gap-3">
                <span className="font-mono text-xs tabular-nums text-muted">
                  {formatShort(item.date)}
                </span>
                <span className="flex-1 font-medium transition-colors group-hover:text-accent">
                  {item.title}
                </span>
              </Link>

              <Link
                href={techHref(lang, item.slug)}
                className="mt-3 block line-clamp-2 text-sm leading-relaxed text-muted"
              >
                {item.description}
              </Link>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="flex gap-1" aria-hidden>
                  {item.nodes.map((n) => (
                    <span
                      key={n.id}
                      className={`h-1.5 w-6 rounded-full ${n.written ? "bg-accent" : "bg-border"}`}
                    />
                  ))}
                </span>
                <span className="text-xs text-muted">
                  {tx.progress(written, item.nodes.length)}
                </span>
                <Link
                  href={techHref(lang, item.slug)}
                  className="ml-auto text-xs text-accent hover:underline"
                >
                  {tx.open}
                </Link>
              </div>

              {item.topic !== null && (
                <div className="mt-4 border-t border-border pt-3">
                  <TopicChip topic={item.topic} active={selected === item.topic} onSelect={toggle} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
