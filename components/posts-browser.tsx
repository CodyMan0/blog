"use client";

import { useState } from "react";
import { PostList } from "./post-list";
import type { PostMeta } from "@/lib/posts";
import type { PostStats } from "@/lib/stats";
import { CATEGORIES, CATEGORY_LABEL as LABEL, type Category } from "@/lib/categories";
import type { Lang } from "@/lib/config";

const EMPTY = { ko: "아직 글이 없어요.", en: "No posts yet." };

export function PostsBrowser({
  posts,
  lang,
  stats,
}: {
  posts: PostMeta[];
  lang: Lang;
  stats?: Record<string, PostStats>;
}) {
  // 발행된 글이 있는 카테고리만 탭으로 노출
  const available = CATEGORIES.filter((c) => posts.some((p) => p.category === c));
  const [selected, setSelected] = useState<Category>(available[0] ?? "회고");
  const filtered = posts.filter((p) => p.category === selected);

  return (
    <div>
      {available.length > 1 && (
        <div role="tablist" className="mb-6 flex gap-1 border-b border-border">
          {available.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={selected === c}
              onClick={() => setSelected(c)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                selected === c
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {LABEL[c][lang]}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <PostList posts={filtered} lang={lang} stats={stats} />
      ) : (
        <p className="py-8 text-sm text-muted">{EMPTY[lang]}</p>
      )}
    </div>
  );
}
