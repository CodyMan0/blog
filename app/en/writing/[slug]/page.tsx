import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/lib/posts";
import { buildPostMetadata } from "@/lib/post-seo";
import { PostArticle } from "@/components/post-article";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildPostMetadata("en", slug);
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost("en", slug);
  if (!post) notFound();
  return <PostArticle post={post} lang="en" />;
}
