import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: "회고",
  description: "매달의 경험과 성장을 남긴 회고 모음입니다.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const posts = getAllPosts("ko");

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">회고</h1>
      <p className="mt-2 text-muted">매달의 경험과 성장을 남깁니다.</p>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
