import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { writingHref, type Lang } from "@/lib/config";
import { SERIES_META } from "@/lib/series";
import { formatShort } from "@/lib/format";

export function PostList({
  posts,
  lang = "ko",
  href = writingHref,
}: {
  posts: PostMeta[];
  lang?: Lang;
  /** 기술 목록은 글 대신 질문 흐름(지도)으로 보낸다 */
  href?: (lang: Lang, slug?: string) => string;
}) {
  return (
    <ul className="flex flex-col">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={href(lang, post.slug)}
            className="group flex items-baseline gap-4 border-b border-border py-2.5 transition-colors hover:border-accent"
          >
            <span className="w-16 shrink-0 font-mono text-sm tabular-nums text-muted">
              {formatShort(post.date)}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium transition-colors group-hover:text-accent">
              {post.series && (
                <span className="mr-2 align-middle text-xs font-medium text-accent">
                  {SERIES_META[post.series].label[lang]}
                </span>
              )}
              {post.title}
            </span>
            <span className="hidden shrink-0 text-sm text-muted sm:block">
              {post.readingMinutes} min
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
