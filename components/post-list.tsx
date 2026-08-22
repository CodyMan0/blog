import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import type { PostStats } from "@/lib/stats";
import { writingHref, type Lang } from "@/lib/config";
import { SERIES_META } from "@/lib/series";
import { formatShort } from "@/lib/format";

const iconClass = "h-3.5 w-3.5 shrink-0";
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: iconClass,
  "aria-hidden": true,
};

function EyeIcon() {
  return (
    <svg {...svgProps}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg {...svgProps}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-.9-1a5.5 5.5 0 1 0-7.8 7.8l.9 1L12 21l7.8-7.6.9-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}
function CommentIcon() {
  return (
    <svg {...svgProps}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}

function Stat({ icon, value }: { icon: React.ReactNode; value: number }) {
  return (
    <span className="inline-flex items-center gap-1 tabular-nums">
      {icon}
      {value.toLocaleString()}
    </span>
  );
}

export function PostList({
  posts,
  lang = "ko",
  href = writingHref,
  stats,
}: {
  posts: PostMeta[];
  lang?: Lang;
  /** 기술 목록은 글 대신 질문 흐름(지도)으로 보낸다 */
  href?: (lang: Lang, slug?: string) => string;
  stats?: Record<string, PostStats>;
}) {
  return (
    <ul className="flex flex-col">
      {posts.map((post) => {
        const s = stats?.[post.slug];
        return (
          <li key={post.slug}>
            <Link
              href={href(lang, post.slug)}
              className="group block border-b border-border py-2.5 transition-colors hover:border-accent"
            >
              <div className="flex items-baseline gap-4">
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
              </div>
              {s && (
                <div className="mt-1.5 flex items-center gap-3 pl-20 text-xs text-muted">
                  <Stat icon={<EyeIcon />} value={s.views} />
                  <Stat icon={<HeartIcon />} value={s.likes} />
                  <Stat icon={<CommentIcon />} value={s.comments} />
                </div>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
