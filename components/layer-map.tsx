import Link from "next/link";
import type { LayerGraph, LayerNode } from "@/lib/posts";
import type { Lang } from "@/lib/config";

// 가로는 % 로, 세로는 px 로 잡는다. 폭이 줄어도 가로 스크롤 없이 함께 좁아진다.
const NODE_H = 88;
const GAP_X = 18;
const GAP_Y = 62;
const RELATION_DIP = 40;

const t = {
  ko: {
    planned: "예정",
    read: "분",
    also: "다른 위층",
    legendLayer: "여기서 다음 질문으로",
    legendRelation: "서로 맞물림",
    legendPlanned: "아직 안 씀",
  },
  en: {
    planned: "planned",
    read: "min",
    also: "also under",
    legendLayer: "leads to",
    legendRelation: "relates to",
    legendPlanned: "not written",
  },
} as const;

type Placed = LayerNode & {
  depth: number;
  cx: number;
  y: number;
  cells: number;
};

/**
 * 개념 그래프 — 최상위 글 → 그 글에서 내려간 층들 → 아직 안 판 아래층.
 * 넓은 화면은 그래프, 좁은 화면은 같은 정보를 세로 목록으로 (가로 스크롤 없음).
 */
export function LayerMap({ graph, lang }: { graph: LayerGraph; lang: Lang }) {
  const cols = Math.max(...graph.levels.map((l) => l.length), 1);
  const cellPct = 100 / cols;

  const placed: Placed[] = [];
  graph.levels.forEach((level, depth) => {
    // 한 칸짜리 층은 두 칸 폭으로 — 긴 사슬이 실처럼 가늘어지지 않게
    const cells = level.length === 1 && cols >= 2 ? Math.min(2, cols) : 1;
    const span = level.length * cells;
    const offset = (cols - span) / 2;
    level.forEach((node, i) => {
      placed.push({
        ...node,
        depth,
        cells,
        cx: (offset + i * cells + cells / 2) * cellPct,
        y: depth * (NODE_H + GAP_Y),
      });
    });
  });

  const byId = new Map(placed.map((n) => [n.id, n]));
  const hasSameRow = graph.edges.some(
    (e) => e.kind === "relation" && byId.get(e.from)?.y === byId.get(e.to)?.y,
  );
  const height =
    graph.levels.length * NODE_H +
    Math.max(0, graph.levels.length - 1) * GAP_Y +
    (hasSameRow ? RELATION_DIP + 18 : 0);

  return (
    <figure className="m-0">
      <GraphView
        graph={graph}
        placed={placed}
        byId={byId}
        height={height}
        cellPct={cellPct}
        lang={lang}
      />
      <StackView graph={graph} lang={lang} />
      <Legend lang={lang} />
    </figure>
  );
}

/* ── 넓은 화면: 그래프 ─────────────────────────────── */

function GraphView({
  graph,
  placed,
  byId,
  height,
  cellPct,
  lang,
}: {
  graph: LayerGraph;
  placed: Placed[];
  byId: Map<string, Placed>;
  height: number;
  cellPct: number;
  lang: Lang;
}) {
  return (
    <div className="hidden rounded-lg border border-border p-5 pl-20 sm:block">
      <div className="relative" style={{ height }}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {graph.edges.map((edge) => {
            const a = byId.get(edge.from);
            const b = byId.get(edge.to);
            if (!a || !b) return null;
            const key = `${edge.kind}-${edge.from}-${edge.to}`;

            if (edge.kind === "layer") {
              const y1 = a.y + NODE_H;
              const y2 = b.y;
              return (
                <path
                  key={key}
                  d={`M${a.cx},${y1} C${a.cx},${y1 + GAP_Y / 2} ${b.cx},${y2 - GAP_Y / 2} ${b.cx},${y2}`}
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              );
            }

            const sameRow = a.y === b.y;
            const [l, r] = a.cx <= b.cx ? [a, b] : [b, a];
            const y1 = sameRow ? l.y + NODE_H : l.y + NODE_H / 2;
            const y2 = sameRow ? r.y + NODE_H : r.y + NODE_H / 2;
            const cy = sameRow ? y1 + RELATION_DIP : (y1 + y2) / 2;
            return (
              <path
                key={key}
                d={`M${l.cx},${y1} Q${(l.cx + r.cx) / 2},${cy} ${r.cx},${y2}`}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.75"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* 화살촉·라벨은 HTML — 좌표계가 가로로 늘어나도 안 찌그러진다 */}
        {graph.edges
          .filter((e) => e.kind === "layer")
          .map((edge) => {
            const b = byId.get(edge.to);
            if (!b) return null;
            return (
              <span
                key={`arrow-${edge.from}-${edge.to}`}
                aria-hidden
                className="absolute -translate-x-1/2 -translate-y-full text-[10px] leading-none text-border"
                style={{ left: `${b.cx}%`, top: b.y }}
              >
                ▼
              </span>
            );
          })}

        {/* 화살표 위 접속사 — 논리의 성격은 노드가 아니라 연결에 있다 */}
        {graph.edges
          .filter((e) => e.kind === "layer" && e.label !== "")
          .map((edge) => {
            const a = byId.get(edge.from);
            const b = byId.get(edge.to);
            if (!a || !b) return null;
            return (
              <span
                key={`conn-${edge.from}-${edge.to}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-background px-1.5 text-[11px] text-muted"
                style={{ left: `${(a.cx + b.cx) / 2}%`, top: a.y + NODE_H + GAP_Y / 2 }}
              >
                {edge.label}
              </span>
            );
          })}

        {graph.edges
          .filter((e) => e.kind === "relation" && e.label !== "")
          .map((edge) => {
            const a = byId.get(edge.from);
            const b = byId.get(edge.to);
            if (!a || !b) return null;
            const sameRow = a.y === b.y;
            const top = sameRow
              ? a.y + NODE_H + RELATION_DIP / 2 + 4
              : (a.y + b.y) / 2 + NODE_H / 2;
            return (
              <span
                key={`label-${edge.from}-${edge.to}`}
                className="absolute -translate-x-1/2 whitespace-nowrap bg-background px-1 text-[11px] text-accent"
                style={{ left: `${(a.cx + b.cx) / 2}%`, top }}
              >
                {edge.label}
              </span>
            );
          })}

        {graph.levels.map((level, depth) => (
          <span
            key={depth}
            className="absolute -left-14 w-12 font-mono text-xs tabular-nums text-muted"
            style={{ top: depth * (NODE_H + GAP_Y) + 6 }}
          >
            {level[0]?.label}
          </span>
        ))}

        {placed.map((node) => (
          <NodeCard key={node.id} node={node} cellPct={cellPct} lang={lang} />
        ))}
      </div>
    </div>
  );
}

function NodeCard({ node, cellPct, lang }: { node: Placed; cellPct: number; lang: Lang }) {
  const tx = t[lang];
  const style = {
    left: `${node.cx}%`,
    top: node.y,
    width: `calc(${cellPct * node.cells}% - ${GAP_X}px)`,
    height: NODE_H,
    transform: "translateX(-50%)",
  } as const;

  const body = (
    <>
      {node.question !== "" && (
        <span className="line-clamp-1 text-[11px] leading-tight text-muted">{node.question}</span>
      )}
      <span className="line-clamp-2 text-sm font-medium leading-snug">{node.title}</span>
      <span className="mt-auto block text-xs text-muted">
        {node.kind === "planned" && (
          <span className="rounded border border-border px-1.5 py-0.5">{tx.planned}</span>
        )}
        {node.readingMinutes > 0 && `${node.readingMinutes}${tx.read}`}
        {node.otherParents.length > 0 && (
          <span className="ml-1.5">
            ↗ {tx.also}: {node.otherParents.join(" · ")}
          </span>
        )}
      </span>
    </>
  );

  const base = "absolute flex flex-col gap-1 rounded-md bg-background p-3 transition-colors";

  if (node.kind === "planned") {
    return (
      <div className={`${base} border border-dashed border-border text-muted`} style={style}>
        {body}
      </div>
    );
  }
  return (
    <Link
      href={node.href}
      className={`${base} border border-border hover:border-accent hover:text-accent`}
      style={style}
    >
      {body}
    </Link>
  );
}

/* ── 좁은 화면: 세로 목록 ──────────────────────────── */

/** 다음 층으로 들어가는 접속사 (좁은 화면에서 화살표 대신 보여준다) */
function connectorInto(graph: LayerGraph, depth: number): string {
  const ids = new Set((graph.levels[depth] ?? []).map((n) => n.id));
  const edge = graph.edges.find((e) => e.kind === "layer" && ids.has(e.to) && e.label !== "");
  return edge?.label ?? "";
}

function StackView({ graph, lang }: { graph: LayerGraph; lang: Lang }) {
  const tx = t[lang];
  const titleOf = (id: string) => graph.levels.flat().find((n) => n.id === id)?.title;

  return (
    <div className="flex flex-col gap-2 sm:hidden">
      {graph.levels.map((level, depth) => (
        <section key={depth} className="rounded-lg border border-border p-4">
          {level[0]?.label !== "" && (
            <p className="font-mono text-xs tabular-nums text-muted">{level[0]?.label}</p>
          )}
          <ul className="mt-2 flex flex-col gap-2">
            {level.map((node) => {
              const rels = graph.edges
                .filter((e) => e.kind === "relation" && (e.from === node.id || e.to === node.id))
                .map((e) => ({
                  label: e.label,
                  title: titleOf(e.from === node.id ? e.to : e.from),
                }))
                .filter((r) => r.title !== undefined);

              const inner = (
                <>
                  {node.question !== "" && (
                    <span className="block text-[11px] leading-tight text-muted">
                      {node.question}
                    </span>
                  )}
                  <span className="mt-0.5 block text-sm font-medium leading-snug">
                    {node.title}
                  </span>
                  {(node.kind === "planned" || node.readingMinutes > 0) && (
                    <span className="mt-1 block text-xs text-muted">
                      {node.kind === "planned" ? (
                        <span className="rounded border border-border px-1.5 py-0.5">
                          {tx.planned}
                        </span>
                      ) : (
                        `${node.readingMinutes}${tx.read}`
                      )}
                    </span>
                  )}
                  {rels.map((r) => (
                    <span key={r.title} className="mt-1 block text-[11px] text-accent">
                      ↔ {r.label === "" ? "" : `${r.label} · `}
                      {r.title}
                    </span>
                  ))}
                </>
              );

              return (
                <li key={node.id}>
                  {node.kind === "planned" ? (
                    <div className="rounded-md border border-dashed border-border p-3 text-muted">
                      {inner}
                    </div>
                  ) : (
                    <Link
                      href={node.href}
                      className="block rounded-md border border-border p-3 transition-colors hover:border-accent"
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          {depth < graph.levels.length - 1 && (
            <p className="mt-2 text-center text-xs text-muted">
              {connectorInto(graph, depth + 1) || "▼"}
            </p>
          )}
        </section>
      ))}
    </div>
  );
}

function Legend({ lang }: { lang: Lang }) {
  const tx = t[lang];
  return (
    <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
      <span className="flex items-center gap-1.5">
        <svg width="26" height="8" aria-hidden>
          <line x1="0" y1="4" x2="26" y2="4" stroke="var(--color-border)" strokeWidth="1.5" />
        </svg>
        {tx.legendLayer}
      </span>
      <span className="flex items-center gap-1.5">
        <svg width="26" height="8" aria-hidden>
          <line
            x1="0"
            y1="4"
            x2="26"
            y2="4"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
        {tx.legendRelation}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block h-3 w-5 rounded-sm border border-dashed border-border" />
        {tx.legendPlanned}
      </span>
    </figcaption>
  );
}
