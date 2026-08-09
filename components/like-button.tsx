"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/config";

// 좋아요 토글 — 브라우저(localStorage) 기준으로 눌렀는지 기억
export function LikeButton({ slug, lang }: { slug: string; lang: Lang }) {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  const storageKey = `liked:${slug}`;

  useEffect(() => {
    try {
      setLiked(localStorage.getItem(storageKey) !== null);
    } catch {}
    fetch(`/api/likes/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number | null } | null) => {
        if (typeof data?.count === "number") setCount(data.count);
      })
      .catch(() => {});
  }, [slug, storageKey]);

  const toggle = async () => {
    if (busy || count === null) return;
    setBusy(true);
    const delta = liked ? -1 : 1;
    // 낙관적 반영 — 실패 시 되돌림
    setLiked(!liked);
    setCount(Math.max(count + delta, 0));
    try {
      const res = await fetch(`/api/likes/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
      });
      const data: { count: number | null } | null = res.ok ? await res.json() : null;
      if (typeof data?.count !== "number") throw new Error("like failed");
      setCount(data.count);
      try {
        if (delta === 1) localStorage.setItem(storageKey, "1");
        else localStorage.removeItem(storageKey);
      } catch {}
    } catch {
      setLiked(liked);
      setCount(count);
    } finally {
      setBusy(false);
    }
  };

  if (count === null) return null;
  const label = lang === "en" ? "Like this post" : "이 글이 도움이 됐다면";
  return (
    <div className="mt-14 flex flex-col items-center gap-2">
      <span className="text-sm text-muted">{label}</span>
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        aria-pressed={liked}
        aria-label={lang === "en" ? "Like" : "좋아요"}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
          liked
            ? "border-accent text-accent"
            : "border-border text-muted hover:border-accent hover:text-accent"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {count.toLocaleString()}
      </button>
    </div>
  );
}
