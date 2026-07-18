import type { Lang } from "./config";

/** "2026-05-29" → ko: "2026년 5월 29일" / en: "May 29, 2026" (잘못된 날짜는 원본 반환) */
export function formatDate(date: string, lang: Lang): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(lang === "en" ? "en-US" : "ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** 목록용 짧은 표기 "2026.05" */
export function formatShort(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}.${m}`;
}
