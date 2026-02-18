import Link from "@docusaurus/Link";

const recentPosts = [
  {
    title: "26년 2월 회고",
    href: "/blog/26y-m2-memoir",
    date: "2026.02",
  },
  {
    title: "26년 1월 회고",
    href: "/blog/26y-m1-memoir",
    date: "2026.01",
  },
  {
    title: "25년 1분기 회고",
    href: "/blog/25y-q1-memoir",
    date: "2025.12",
  },
];

export default function RecentPosts() {
  return (
    <section className="w-full px-6 py-10 md:py-14 max-w-3xl mx-auto">
      <h2
        className="text-lg md:text-xl font-bold mb-6 tracking-tight"
        style={{ color: "var(--ifm-heading-color)" }}
      >
        최근 글
      </h2>

      <div className="flex flex-col gap-2">
        {recentPosts.map((post) => (
          <Link
            key={post.href}
            to={post.href}
            className="group flex items-center justify-between no-underline rounded-lg px-4 py-3 transition-colors duration-200"
            style={{
              color: "var(--ifm-color-content, var(--ifm-font-color-base))",
              textDecoration: "none",
            }}
          >
            <span className="text-sm md:text-base">{post.title}</span>
            <span
              className="text-xs font-mono shrink-0 ml-4"
              style={{ color: "var(--ifm-color-content-secondary, var(--ifm-font-color-secondary))" }}
            >
              {post.date}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/blog"
          className="text-sm no-underline"
          style={{ color: "var(--ifm-color-primary)" }}
        >
          모든 글 보기 →
        </Link>
      </div>
    </section>
  );
}
