import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatShort } from "@/lib/format";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="flex flex-col">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/writing/${post.slug}`}
            className="group flex items-baseline gap-4 border-b border-border py-3.5 transition-colors hover:border-accent"
          >
            <span className="w-16 shrink-0 font-mono text-sm tabular-nums text-muted">
              {formatShort(post.date)}
            </span>
            <span className="flex-1 font-medium transition-colors group-hover:text-accent">
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
