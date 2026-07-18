"use client";

import { useEffect, useState } from "react";
import { siteConfig, type Lang } from "@/lib/config";

// 커피챗 링크 확정 시 true 로 바꾸면 CTA 노출
const SHOW_CTA = false;

const t = {
  ko: {
    heading: "기여 수치화",
    coffee: "커피챗 요청하기",
    detail: "기여 자세히 보기",
  },
  en: {
    heading: "Impact in numbers",
    coffee: "Request a coffee chat",
    detail: "See my work in detail",
  },
} as const;

function useCountUp(target: number, decimals: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatCard({
  item,
  index,
  lang,
}: {
  item: (typeof siteConfig.contributions)[number];
  index: number;
  lang: Lang;
}) {
  const num = useCountUp(item.value, item.decimals);
  return (
    <div
      className="animate-fade-up rounded-xl border border-border bg-card p-4 opacity-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="text-3xl font-extrabold tabular-nums text-accent">
        {num}
        <span className="text-2xl opacity-70">{item.suffix}</span>
      </div>
      <div className="mt-1 text-sm font-semibold">
        {lang === "en" ? item.labelEn : item.label}
      </div>
      <div className="mt-0.5 text-xs text-muted">
        {lang === "en" ? item.hintEn : item.hint}
      </div>
    </div>
  );
}

export function Contributions({ lang = "ko" }: { lang?: Lang }) {
  const tx = t[lang];

  return (
    <section aria-label={tx.heading} className="flex h-full flex-col">
      <h2 className="mb-4 text-lg font-semibold">{tx.heading}</h2>
      <div className="grid grid-cols-1 gap-3">
        {siteConfig.contributions.map((item, i) => (
          <StatCard key={item.label} item={item} index={i} lang={lang} />
        ))}
      </div>

      {/* CTA(커피챗/기여 자세히 보기)는 커피챗 링크 확정 시 다시 노출 */}
      {SHOW_CTA && (
        <div className="mt-auto pt-6">
          <a
            href={siteConfig.coffeeChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <span aria-hidden>☕</span>
            {tx.coffee}
          </a>
          <a
            href={siteConfig.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 flex items-center justify-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            {tx.detail}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      )}
    </section>
  );
}
