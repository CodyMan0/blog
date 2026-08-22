/** 개념 태그 칩 — 글당 하나. 기본은 조용한 회색, 선택된 것만 강조 */
export function TopicChip({
  topic,
  active = false,
  onSelect,
}: {
  topic: string | null;
  active?: boolean;
  onSelect?: (topic: string) => void;
}) {
  if (topic === null) return null;
  const tone = active
    ? "border-accent bg-accent/10 text-accent"
    : "border-border text-muted";
  const shape = "rounded-full border px-2.5 py-0.5 text-xs";

  if (!onSelect) return <span className={`${shape} ${tone}`}>{topic}</span>;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(topic)}
      className={`${shape} ${tone} transition-colors hover:border-accent hover:text-accent`}
    >
      {topic}
    </button>
  );
}
