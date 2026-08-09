"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/config";

// 세션당 글 하나에 +1 한 번만 — 새로고침 반복은 조회로 치지 않는다
export function ViewCounter({ slug, lang }: { slug: string; lang: Lang }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const key = `viewed:${slug}`;
    let seen = false;
    try {
      seen = sessionStorage.getItem(key) !== null;
    } catch {
      seen = true; // 스토리지 접근 불가 시 조회만
    }

    fetch(`/api/views/${slug}`, { method: seen ? "GET" : "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number | null } | null) => {
        if (typeof data?.count !== "number") return;
        setCount(data.count);
        if (!seen) {
          try {
            sessionStorage.setItem(key, "1");
          } catch {
            // 무시 — 다음 로드에서 한 번 더 세질 뿐
          }
        }
      })
      .catch(() => {});
  }, [slug]);

  if (count === null) return null;
  const label =
    lang === "en" ? `${count.toLocaleString()} views` : `조회 ${count.toLocaleString()}`;
  return (
    <>
      <span>·</span>
      <span>{label}</span>
    </>
  );
}
