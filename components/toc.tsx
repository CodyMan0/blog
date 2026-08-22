"use client";

import { useEffect, useState, type MouseEvent } from "react";

type Item = { id: string; text: string; level: 2 | 3 };

// 렌더된 글의 heading(id는 rehype-slug가 이미 부여)을 그대로 읽어 목차를 만든다.
// 슬러그를 따로 계산하지 않으므로 앵커가 항상 일치한다.
export function Toc({ label }: { label: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".prose h2, .prose h3"),
    ).filter((el) => el.id);

    setItems(
      nodes.map((el) => ({
        id: el.id,
        text: (el.textContent ?? "").trim(),
        level: el.tagName === "H3" ? 3 : 2,
      })),
    );

    if (nodes.length === 0) return;

    // 화면 상단에 가장 가까운, 보이는 heading을 현재 섹션으로 표시
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  // 기본 앵커 점프 대신 부드럽게 스크롤 + hash는 점프 없이 갱신
  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
    setActiveId(id);
  };

  if (items.length < 2) return null;

  return (
    <nav aria-label={label} className="mb-10">
      <p className="mb-3 text-xs font-medium text-muted">{label}</p>
      <ul className="flex flex-col border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => scrollTo(e, item.id)}
              className={`-ml-px block border-l-2 py-1 text-sm transition-colors ${
                item.level === 3 ? "pl-7" : "pl-4"
              } ${
                activeId === item.id
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-muted hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
