// 글 하나당 개념 태그는 하나만. 여러 축으로 늘어나면 목록이 금세 읽기 어려워진다.
export function toTopic(value: unknown, fallback: unknown): string | null {
  const first = typeof value === "string" ? value : Array.isArray(fallback) ? fallback[0] : null;
  const topic = first === null || first === undefined ? "" : String(first).trim();
  return topic === "" ? null : topic;
}

/** 태그별 글 수 — 많이 쓴 순, 같으면 이름순(코드 유닛 비교로 서버·클라 결과 고정) */
export function countTopics(topics: (string | null)[]): { topic: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const t of topics) {
    if (t === null) continue;
    counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || (a.topic < b.topic ? -1 : a.topic > b.topic ? 1 : 0));
}
