"use client";

import { useEffect, useState } from "react";

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

  if (items.length < 2) return null;

  return (
    <details
      open
      className="group mb-10 rounded-xl border border-border bg-card/40 px-4 py-3"
    >
      <summary className="cursor-pointer select-none text-sm font-semibold text-foreground">
        {label}
      </summary>
      <nav className="mt-2">
        <ul className="flex flex-col gap-1 text-sm">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${item.id}`}
                className={`block py-0.5 transition-colors ${
                  activeId === item.id
                    ? "font-medium text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
