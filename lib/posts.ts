import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Lang } from "./config";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PostMeta = {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  date: string; // 원본 문자열 (표시용)
  dateValue: number; // 정렬용 타임스탬프
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function contentDir(lang: Lang) {
  return path.join(CONTENT_DIR, lang);
}

function toMeta(lang: Lang, slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const date = String(data.date ?? "");
  const parsed = new Date(date).getTime();
  return {
    slug,
    lang,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date,
    dateValue: Number.isNaN(parsed) ? 0 : parsed,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
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

/** 발행된 글 목록 (초안 제외), 최신순 */
export function getAllPosts(lang: Lang): PostMeta[] {
  const dir = contentDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => readPostFile(lang, f.replace(/\.mdx$/, "")))
    .filter((p): p is Post => p !== null && !p.draft)
    .sort((a, b) => b.dateValue - a.dateValue)
    .map(({ content: _content, ...meta }) => meta);
}

/** 단일 글. 해당 언어에 없으면 기본(ko)로 폴백 */
export function getPost(lang: Lang, slug: string): Post | null {
  return readPostFile(lang, slug) ?? readPostFile("ko", slug);
}

/** 정적 경로 생성용 슬러그 (발행분만) */
export function getPostSlugs(lang: Lang): string[] {
  return getAllPosts(lang).map((p) => p.slug);
}
