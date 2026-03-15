import React from "react";
import Link from "@docusaurus/Link";

type TimelineItem = {
  period: string;
  company: string;
  href: string;
  role: string;
  highlight: string;
  current?: boolean;
};

const items: TimelineItem[] = [
  {
    period: "2025.07 ~ 현재",
    company: "오픈닥터",
    href: "/career/opendoctor/overview",
    role: "프론트엔드 개발자 · 제품팀",
    highlight: "Flutter→Next.js 마이그레이션, SEO 클릭 7.5배↑",
    current: true,
  },
  {
    period: "2024.06 ~ 2025.07",
    company: "퓨쳐리즘랩스",
    href: "/career/futurism-labs/overview",
    role: "프론트엔드 개발자 (1인)",
    highlight: "사내 솔루션 구축, 리포트 자동화 99.6%↓",
  },
];

export default function Timeline() {
  return (
    <div className="timeline">
      {items.map((item, i) => (
        <div key={i} className="timeline-item">
          <div className="timeline-marker-col">
            <div
              className={`timeline-dot${item.current ? " timeline-dot--current" : ""}`}
            />
            {i < items.length - 1 && <div className="timeline-line" />}
          </div>
          <Link to={item.href} className="timeline-card">
            <span className="timeline-period">{item.period}</span>
            <h3 className="timeline-company">{item.company}</h3>
            <p className="timeline-role">{item.role}</p>
            <p className="timeline-highlight">{item.highlight}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
