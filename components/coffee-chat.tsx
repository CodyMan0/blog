"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

export function CoffeeChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:border-accent hover:-translate-y-0.5"
      >
        <span className="text-base transition-transform group-hover:rotate-12">☕</span>
        <span>어떤 기여를 해왔을까?</span>
        <span
          className={`text-muted transition-transform ${open ? "rotate-90" : ""}`}
        >
          →
        </span>
      </button>

      {/* 리빌 카드 */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-sm text-muted">이런 걸 만들어 왔어요</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {siteConfig.contributions.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.coffeeChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                ☕ 커피챗 하기 →
              </a>
              <a
                href={siteConfig.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted underline-offset-2 hover:text-accent hover:underline"
              >
                기여 지도 보기 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
