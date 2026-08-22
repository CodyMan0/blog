import Link from "next/link";
import type { LayerNeighbors, PostMeta } from "@/lib/posts";
import { writingHref, type Lang } from "@/lib/config";

const t = {
  ko: {
    label: "이 글의 자리",
    up: "앞선 글",
    here: "지금",
    down: "다음 질문",
    root: "여기서 시작한다 — 실무에서 만난 문제",
    planned: "예정",
    none: "아직 이어진 질문이 없다",
  },
  en: {
    label: "Where this sits",
    up: "Comes from",
    here: "Here",
    down: "Leads to",
    root: "Starts here — a problem from real work",
    planned: "planned",
    none: "No follow-up question yet",
  },
} as const;

/** 글 머리의 층 위치 — 최상위부터 바로 위층까지 */
export function LayerTrail({
  ancestors,
  lang,
}: {
  ancestors: PostMeta[];
  lang: Lang;
}) {
  if (ancestors.length === 0) return null;
  return (
    <nav aria-label={t[lang].up} className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
      {ancestors.map((post) => (
        <span key={post.slug} className="flex items-center gap-1.5">
          <Link
            href={writingHref(lang, post.slug)}
            className="transition-colors hover:text-accent"
          >
            {post.title}
          </Link>
          <span aria-hidden>›</span>
        </span>
      ))}
    </nav>
  );
}

/**
 * 글 하단의 층 지도 — 위층·현재·아래층.
 * 아직 안 쓴 아래층도 "예정"으로 함께 보여준다. 멈춘 자리가 곧 다음 글의 자리다.
 */
export function LayerNav({
  neighbors,
  currentTitle,
  lang,
}: {
  neighbors: LayerNeighbors;
  currentTitle: string;
  lang: Lang;
}) {
  const { parents, children, open } = neighbors;
  const tx = t[lang];
  if (parents.length === 0 && children.length === 0 && open.length === 0) return null;

  return (
    <nav aria-label={tx.label} className="mt-14 rounded-lg border border-border p-5">
      <p className="text-sm font-semibold text-accent">{tx.label}</p>

      <div className="mt-4 flex flex-col gap-4 text-sm">
        <Row title={tx.up}>
          {parents.length > 0 ? (
            parents.map((post) => (
              <Link
                key={post.slug}
                href={writingHref(lang, post.slug)}
                className="block text-muted transition-colors hover:text-accent"
              >
                ↑ {post.title}
              </Link>
            ))
          ) : (
            <span className="text-muted">{tx.root}</span>
          )}
        </Row>

        <Row title={tx.here}>
          <span className="font-medium text-foreground">● {currentTitle}</span>
        </Row>

        <Row title={tx.down}>
          {children.length === 0 && open.length === 0 && (
            <span className="text-muted">{tx.none}</span>
          )}
          {children.map((post) => (
            <Link
              key={post.slug}
              href={writingHref(lang, post.slug)}
              className="block text-muted transition-colors hover:text-accent"
            >
              ↓ {post.title}
            </Link>
          ))}
          {open.map((layer) => (
            <span key={layer.slug} className="block text-muted/70">
              ↓ {layer.title}{" "}
              <span className="rounded border border-border px-1 py-0.5 text-[11px]">
                {tx.planned}
              </span>
            </span>
          ))}
        </Row>
      </div>
    </nav>
  );
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-12 shrink-0 pt-px text-xs text-muted">{title}</span>
      <div className="flex flex-1 flex-col gap-1">{children}</div>
    </div>
  );
}
