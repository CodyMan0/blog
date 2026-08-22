import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { writingHref, type Lang } from "./config";
import { CATEGORIES, type Category } from "./categories";
import { isSeries, type Series } from "./series";
import { toTopic } from "./topics";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type { Category };

/**
 * 아직 안 쓴 아래층 — "2시간이 끝나서 멈춘 자리"를 링크로 남겨두는 자리표.
 * 나중에 같은 slug로 글이 올라오면 자동으로 실제 자식 노드가 되고 여기서는 사라진다.
 */
export type OpenLayer = { slug: string; title: string };

/**
 * 글 안에서 한 걸음 내려간 자리. 파고들기는 결국 질문 사슬이라 질문(question)과
 * 그 답(title)을 짝으로 갖는다. beside: true 면 바로 앞 질문과 같은 줄에 놓인다.
 */
export type ArticleLayer = {
  /** 앞 걸음과 이 걸음을 잇는 말 — 논리의 성격 (그런데 · 왜냐하면 · 그렇다면 …) */
  connector: string;
  question: string;
  title: string;
  anchor: string;
  beside: boolean;
};

/** 층 관계가 아닌 가로 연결 — 서로 보완하거나 맞물리는 개념 */
export type Relation = { from: string; to: string; label: string };

export type PostMeta = {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  date: string; // 원본 문자열 (표시용)
  dateValue: number; // 정렬용 타임스탬프
  tags: string[];
  category: Category;
  series: Series | null;
  seriesOrder: number; // 시리즈 내 순서 (없으면 0)
  /** 위층 글 slug. 여러 개 가능 — 아래층 개념 노드는 여러 사례 글에서 참조된다 */
  parents: string[];
  /** 아직 안 쓴 아래층 */
  openLayers: OpenLayer[];
  /** 이 글의 개념 태그 — 글당 하나 */
  topic: string | null;
  /** 이 글이 실제로 내려간 층 */
  layers: ArticleLayer[];
  /** 같은 지도 안 두 노드를 잇는 상관관계 (아직 안 쓴 자리끼리도 이을 수 있어 위층에 선언한다) */
  relations: Relation[];
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function contentDir(lang: Lang) {
  return path.join(CONTENT_DIR, lang);
}

function toOpenLayers(value: unknown): OpenLayer[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => {
      const item = v as { slug?: unknown; title?: unknown };
      return { slug: String(item?.slug ?? ""), title: String(item?.title ?? "") };
    })
    .filter((v) => v.slug !== "" && v.title !== "");
}

function toLayers(value: unknown): ArticleLayer[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => {
      const l = v as {
        connector?: unknown;
        question?: unknown;
        title?: unknown;
        anchor?: unknown;
        beside?: unknown;
      };
      return {
        connector: String(l?.connector ?? ""),
        question: String(l?.question ?? ""),
        title: String(l?.title ?? ""),
        anchor: String(l?.anchor ?? ""),
        beside: l?.beside === true,
      };
    })
    .filter((l) => l.question !== "" && l.title !== "" && l.anchor !== "");
}

function toRelations(self: string, relations: unknown, related: unknown): Relation[] {
  const out: Relation[] = [];
  if (Array.isArray(relations)) {
    for (const v of relations) {
      const r = v as { from?: unknown; to?: unknown; label?: unknown };
      const from = String(r?.from ?? self);
      const to = String(r?.to ?? "");
      if (to !== "" && from !== to) out.push({ from, to, label: String(r?.label ?? "") });
    }
  }
  // related: [slug] — 이 글과 맞물리는 개념을 짧게 쓰는 형태
  if (Array.isArray(related)) {
    for (const v of related) {
      const to = String(v);
      if (to !== "" && to !== self) out.push({ from: self, to, label: "" });
    }
  }
  return out;
}

function toMeta(lang: Lang, slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const date = String(data.date ?? "");
  const parsed = new Date(date).getTime();
  const category: Category = CATEGORIES.includes(data.category as Category)
    ? (data.category as Category)
    : "회고";
  return {
    slug,
    lang,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date,
    dateValue: Number.isNaN(parsed) ? 0 : parsed,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category,
    series: isSeries(data.series) ? data.series : null,
    seriesOrder: Number.isFinite(Number(data.seriesOrder)) ? Number(data.seriesOrder) : 0,
    parents: Array.isArray(data.parents) ? data.parents.map(String) : [],
    openLayers: toOpenLayers(data.openLayers),
    topic: toTopic(data.topic, data.topics),
    layers: toLayers(data.layers),
    relations: toRelations(slug, data.relations, data.related),
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

function readPostFile(lang: Lang, slug: string): Post | null {
  const file = path.join(contentDir(lang), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return toMeta(lang, slug, fs.readFileSync(file, "utf8"));
}

// 로컬에서는 초안도 보인다. 배포(production 빌드)에서는 그대로 숨겨진다.
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

/** 발행된 글 목록 (배포 시 초안 제외), 최신순 */
export function getAllPosts(lang: Lang): PostMeta[] {
  const dir = contentDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readPostFile(lang, f.replace(/\.mdx$/, "")))
    .filter((p): p is Post => p !== null && (SHOW_DRAFTS || !p.draft))
    .sort((a, b) => b.dateValue - a.dateValue)
    .map(({ content: _content, ...meta }) => meta);
}

/** 단일 글. 해당 언어에 없으면 기본(ko)로 폴백 */
export function getPost(lang: Lang, slug: string): Post | null {
  return readPostFile(lang, slug) ?? readPostFile("ko", slug);
}

/** 같은 시리즈의 글 (발행분만), 시리즈 순서 오름차순 */
export function getSeriesPosts(lang: Lang, series: Series): PostMeta[] {
  return getAllPosts(lang)
    .filter((p) => p.series === series)
    .sort((a, b) => a.seriesOrder - b.seriesOrder || a.dateValue - b.dateValue);
}

/**
 * 시리즈 목차에 쓸 목록. 초안이라 발행 목록에서 빠지는 글이라도
 * 자기 글의 목차에서는 자기 자리가 보이도록 합쳐준다.
 */
export function getSeriesPostsFor(lang: Lang, post: PostMeta): PostMeta[] {
  if (!post.series) return [];
  const list = getSeriesPosts(lang, post.series);
  if (list.some((p) => p.slug === post.slug)) return list;
  return [...list, post].sort((a, b) => a.seriesOrder - b.seriesOrder || a.dateValue - b.dateValue);
}

export type LayerNeighbors = {
  /** 위층 — 이 글이 파생된 사례·상위 개념 */
  parents: PostMeta[];
  /** 아래층 — 이 글을 부모로 선언한 글들 */
  children: PostMeta[];
  /** 아래층 중 아직 안 쓴 것 (이미 쓴 글과 겹치면 제외) */
  open: OpenLayer[];
};

/** 한 글의 위·아래층 이웃. 노드가 여러 부모를 가질 수 있는 DAG 구조 */
export function getLayerNeighbors(lang: Lang, post: PostMeta): LayerNeighbors {
  const all = getAllPosts(lang);
  const bySlug = new Map(all.map((p) => [p.slug, p]));

  const parents = post.parents
    .map((slug) => bySlug.get(slug))
    .filter((p): p is PostMeta => p !== undefined);

  const children = all
    .filter((p) => p.parents.includes(post.slug))
    .sort((a, b) => a.dateValue - b.dateValue);

  const written = new Set(children.map((p) => p.slug));
  const open = post.openLayers.filter((o) => !written.has(o.slug) && !bySlug.has(o.slug));

  return { parents, children, open };
}

/**
 * 최상위(실무 사례)까지 거슬러 올라가는 경로. 부모가 여럿이면 첫 번째만 따라간다.
 * 반환 순서는 최상위 → 바로 위층. 순환 참조는 방문 집합으로 끊는다.
 */
export function getAncestorPath(lang: Lang, post: PostMeta): PostMeta[] {
  const bySlug = new Map(getAllPosts(lang).map((p) => [p.slug, p]));
  const path: PostMeta[] = [];
  const seen = new Set<string>([post.slug]);

  let cursor: PostMeta | undefined = bySlug.get(post.parents[0] ?? "");
  while (cursor && !seen.has(cursor.slug)) {
    seen.add(cursor.slug);
    path.unshift(cursor);
    cursor = bySlug.get(cursor.parents[0] ?? "");
  }
  return path;
}

/** 층 지도의 노드 하나 */
export type LayerNode = {
  /** 그래프 안에서의 식별자 (글은 slug, 글 안의 층은 slug#anchor) */
  id: string;
  title: string;
  /** post = 쓴 글, section = 그 글 안에서 내려간 층, planned = 아직 안 쓴 자리 */
  kind: "post" | "section" | "planned";
  /** 왼쪽 순번 라벨 (출발 · 1 · 2 · 다음 …). 곁가지는 빈 문자열 */
  label: string;
  /** 이 걸음에서 던진 질문. 출발점과 파생 글은 없음 */
  question: string;
  /** 이동할 곳. planned 는 빈 문자열 */
  href: string;
  readingMinutes: number;
  /** 이 트리 밖의 다른 위층 — 같은 개념이 여러 사례에서 참조될 때 */
  otherParents: string[];
};

/** 기술 섹션의 최상위 노드 — 실무에서 출발한 글 (위층이 없는 기술 글) */
export function getTechRoots(lang: Lang): PostMeta[] {
  return getAllPosts(lang).filter((p) => p.category === "기술" && p.parents.length === 0);
}

export type LayerEdge = {
  from: string;
  to: string;
  /** layer = 위→아래 파생, relation = 서로 맞물리는 개념 */
  kind: "layer" | "relation";
  label: string;
};

export type LayerGraph = {
  /** 깊이별 노드 — levels[0]이 최상위 */
  levels: LayerNode[][];
  edges: LayerEdge[];
};

/**
 * 개념 그래프 — 세 종류의 노드가 한 줄기로 이어진다.
 *   0층      최상위 글(실무 문제)
 *   1..n층   그 글 안에서 실제로 내려간 층 (본문 소제목으로 이동)
 *   아래층   아직 안 썼거나 이미 쓴 파생 글
 */
export function getLayerGraph(lang: Lang, root: PostMeta): LayerGraph {
  const all = getAllPosts(lang);
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const href = (slug: string) => writingHref(lang, slug);

  const levels: LayerNode[][] = [
    [
      {
        id: root.slug,
        title: root.title,
        kind: "post",
        label: root.layers.length > 0 ? "start" : "",
        question: "",
        href: href(root.slug),
        readingMinutes: root.readingMinutes,
        otherParents: [],
      },
    ],
  ];
  const edges: LayerEdge[] = [];
  let prev = root.slug;

  // 질문 사슬 — beside 는 바로 앞 질문과 같은 줄에 (곁가지라 순번을 새로 받지 않는다)
  let step = 0;
  for (const layer of root.layers) {
    if (!layer.beside) step += 1;
    const node: LayerNode = {
      id: `${root.slug}#${layer.anchor}`,
      title: layer.title,
      kind: "section",
      label: layer.beside ? "" : `${step} why`,
      question: layer.question,
      href: `${href(root.slug)}#${layer.anchor}`,
      readingMinutes: 0,
      otherParents: [],
    };
    if (layer.beside && levels.length > 1) {
      levels[levels.length - 1].push(node);
      edges.push({ from: prev, to: node.id, kind: "layer", label: layer.connector });
      continue; // 곁가지는 다음 층의 부모가 되지 않는다
    }
    levels.push([node]);
    edges.push({ from: prev, to: node.id, kind: "layer", label: layer.connector });
    prev = node.id;
  }

  // 마지막 층 아래로 파생 글 — 이미 쓴 것과 아직 안 쓴 자리
  const inGraph = new Set<string>(levels.flat().map((n) => n.id));
  const below: LayerNode[] = [];
  const posts: PostMeta[] = [root];

  for (const child of all.filter((p) => p.parents.includes(root.slug))) {
    below.push({
      id: child.slug,
      title: child.title,
      kind: "post",
      label: "next",
      question: "",
      href: href(child.slug),
      readingMinutes: child.readingMinutes,
      otherParents: child.parents
        .filter((x) => x !== root.slug)
        .map((x) => bySlug.get(x)?.title)
        .filter((t): t is string => t !== undefined),
    });
    posts.push(child);
  }
  for (const open of root.openLayers) {
    if (bySlug.has(open.slug)) continue;
    below.push({
      id: open.slug,
      title: open.title,
      kind: "planned",
      label: "next",
      question: "",
      href: "",
      readingMinutes: 0,
      otherParents: [],
    });
  }

  if (below.length > 0) {
    for (const node of below) {
      edges.push({ from: prev, to: node.id, kind: "layer", label: "" });
      inGraph.add(node.id);
    }
    levels.push(below);
  }

  // 가로 관계선 — 지도 안 두 노드를 잇는 것만, 방향 무시하고 중복 제거
  const pairs = new Set<string>();
  for (const post of posts) {
    for (const rel of post.relations) {
      if (!inGraph.has(rel.from) || !inGraph.has(rel.to)) continue;
      const key = [rel.from, rel.to].sort().join("::");
      if (pairs.has(key)) continue;
      pairs.add(key);
      edges.push({ ...rel, kind: "relation" });
    }
  }

  return { levels, edges };
}

/** 정적 경로 생성용 슬러그 (발행분만) */
export function getPostSlugs(lang: Lang): string[] {
  return getAllPosts(lang).map((p) => p.slug);
}
