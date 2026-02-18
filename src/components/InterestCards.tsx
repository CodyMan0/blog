import Link from "@docusaurus/Link";

const cards = [
  {
    title: "AI",
    href: "/docs/category/ai",
  },
  {
    title: "금융",
    href: "/docs/category/금융",
  },
  {
    title: "트러블슈팅",
    href: "/docs/category/트러블슈팅",
  },
  {
    title: "기본기",
    href: "/docs/category/기본기",
  },
];

export default function InterestCards() {
  return (
    <section className="w-full px-6 py-10 md:py-14 max-w-3xl mx-auto">
      <h2
        className="text-lg md:text-xl font-bold mb-6 tracking-tight"
        style={{ color: "var(--ifm-heading-color)" }}
      >
        관심사
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.href}
            className="block no-underline rounded-lg px-4 py-3 border text-center transition-colors duration-200"
            style={{
              borderColor: "var(--ifm-color-emphasis-200)",
              color: "var(--ifm-color-content, var(--ifm-font-color-base))",
              textDecoration: "none",
            }}
          >
            <span className="text-sm md:text-base font-medium">
              {card.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
