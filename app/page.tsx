import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { CoffeeChat } from "@/components/coffee-chat";
import { siteConfig } from "@/lib/config";

export default function Home() {
  const posts = getAllPosts("ko");
  const recent = posts.slice(0, 6);

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      {/* Hero */}
      <section className="flex flex-col items-start">
        <Image
          src={siteConfig.avatar}
          alt={siteConfig.name}
          width={72}
          height={72}
          className="mb-5 rounded-full border border-border"
          priority
        />
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-2 text-muted">{siteConfig.name}</p>
        <p className="mt-4 leading-relaxed text-muted">
          매달의 경험과 성장을 회고로 남깁니다. 문제를 정의하고, 부딪히고,
          배운 것을 기록합니다.
        </p>
        <div className="mt-5 flex gap-4 text-sm">
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
            GitHub
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.social.email}`} className="text-muted hover:text-accent">
            Email
          </a>
        </div>

        <CoffeeChat />
      </section>

      {/* Recent writing */}
      <section className="mt-14">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">회고</h2>
          <Link href="/writing" className="text-sm text-muted hover:text-accent">
            전체 보기 →
          </Link>
        </div>
        <PostList posts={recent} />
      </section>
    </div>
  );
}
