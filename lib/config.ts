export const siteConfig = {
  // 배포 도메인 (SEO 절대 URL·OG·sitemap 기준). 배포 시 이 값만 바꾸면 됩니다.
  url: "https://lee2022.com",
  name: "이주영",
  nameEn: "Ju young Lee",
  // 랜딩 태그라인
  tagline: "기여하는 엔지니어",
  taglineEn: "An engineer who contributes",
  role: "프론트엔드 개발자",
  roleEn: "Frontend Engineer",
  description:
    "일하고 성장하는 개발자 이주영입니다. 매달의 경험과 성장을 회고로 남깁니다.",
  descriptionEn:
    "I'm Ju young Lee, a frontend engineer. I write monthly retrospectives on how I work and grow.",
  // SEO 타겟 키워드 (회고·프론트엔드 개발자 성장)
  keywords: {
    ko: [
      "이주영",
      "프론트엔드 개발자",
      "개발자 회고",
      "프론트엔드 회고",
      "개발자 성장",
      "월간 회고",
      "React",
      "Next.js",
      "TypeScript",
      "프론트엔드 마이그레이션",
      "SEO 최적화",
      "웹 성능 개선",
      "트러블슈팅",
      "개발자 블로그",
    ],
    en: [
      "Ju young Lee",
      "frontend engineer",
      "frontend developer",
      "developer retrospective",
      "engineer growth",
      "monthly retrospective",
      "React",
      "Next.js",
      "TypeScript",
      "frontend migration",
      "web performance",
      "SEO",
      "developer blog",
    ],
  },
  // 해외 독자를 위해 지금 어디 사는지
  location: { ko: "대한민국 서울 거주 중", en: "Based in Seoul, South Korea" },
  avatar: "/img/profile.png",
  // 공유(OG/트위터) 미리보기 이미지 — 하늘 배경 위 얼굴 (1200×630)
  ogImage: "/img/og-profile.jpg",
  social: {
    github: "https://github.com/CodyMan0",
    linkedin: "https://www.linkedin.com/in/brian0",
    email: "hys83751952@gmail.com",
  },
  // 커피챗 CTA (TODO: 실제 링크로 교체)
  coffeeChatUrl: "#",
  // 기여 지도 대시보드
  dashboardUrl: "https://me.lee2022.com",
  // 히어로 기여 티저 (실제 성과 — private/경험-마스터.md 기준)
  contributions: [
    {
      value: 15.2,
      decimals: 1,
      suffix: "×",
      label: "SEO 노출 상승",
      labelEn: "SEO impressions",
      hint: "Flutter-web → Next.js 점진 마이그레이션 (노출 9.7천→14.8만)",
      hintEn: "Flutter-web → Next.js gradual migration (9.7K→148K)",
    },
    {
      value: 90,
      decimals: 0,
      suffix: "개",
      label: "디자인 시스템 컴포넌트 단독",
      labelEn: "design-system components, solo",
      hint: "디자이너 협업·토큰 시스템·Figma 동기화까지 8개월 단독 구축",
      hintEn: "Built solo over 8 months — tokens, Figma sync, designer collab",
    },
    {
      value: 21,
      decimals: 0,
      suffix: "건",
      label: "의료기기 데모 신청 유입",
      labelEn: "device demo requests",
      hint: "다나와 공개페이지+운영 솔루션 단독 → 상세조회 3,459·신청 21 (Amplitude)",
      hintEn: "Built the medical-device 'Danawa' page + admin solo (Amplitude funnel)",
    },
    {
      value: 3000,
      decimals: 0,
      suffix: "만원",
      label: "외주비 절감",
      labelEn: "saved in outsourcing",
      hint: "미오클리닉 홈페이지·어드민·다국어 6개어 직접 구현",
      hintEn: "Built the Mio Clinic site, admin & 6-language i18n end-to-end",
    },
    {
      value: 99.6,
      decimals: 1,
      suffix: "%↓",
      label: "리포트 생성 시간",
      labelEn: "report generation time",
      hint: "480분 → 2분 자동화",
      hintEn: "480 min → 2 min, automated",
    },
  ],
  // giscus 댓글 (댓글 슬라이스에서 실제 값으로 교체)
  giscus: {
    repo: "CodyMan0/lee-2022",
    repoId: "",
    category: "General",
    categoryId: "",
  },
} as const;

export type Lang = "ko" | "en";

export const locales: Lang[] = ["ko", "en"];
export const defaultLocale: Lang = "ko";

// en은 /en prefix, ko는 루트
export function localePath(lang: Lang, path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const base = lang === "en" ? "/en" : "";
  const joined = `${base}${clean}`;
  return joined.replace(/\/$/, "") || "/";
}

export function homeHref(lang: Lang): string {
  return lang === "en" ? "/en" : "/";
}

// 기술 섹션 — 목록(/tech)과 층 설계도(/tech/[slug]). 글 상세는 writingHref 유지
export function techHref(lang: Lang, slug?: string): string {
  const base = lang === "en" ? "/en/tech" : "/tech";
  return slug ? `${base}/${slug}` : base;
}

export function galleryHref(lang: Lang): string {
  return lang === "en" ? "/en/gallery" : "/gallery";
}

export function writingHref(lang: Lang, slug?: string): string {
  const base = lang === "en" ? "/en/writing" : "/writing";
  return slug ? `${base}/${slug}` : base;
}
