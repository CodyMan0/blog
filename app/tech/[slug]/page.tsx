import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getTechRoots } from "@/lib/posts";
import { NOINDEX } from "@/lib/post-seo";
import { TechMapPage } from "@/components/tech-map-page";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getTechRoots("ko").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("ko", slug);
  if (!post) return {};
  return {
    title: `${post.title} — 어디까지 팠나`,
    description: post.description,
    robots: NOINDEX,
    alternates: { canonical: `/tech/${slug}` },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost("ko", slug);
  if (!post) notFound();
  return <TechMapPage root={post} lang="ko" />;
}
