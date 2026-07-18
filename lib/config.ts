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
  avatar: "/img/profile.png",
  // 공유(OG/트위터) 미리보기 이미지 — 얼굴 대신 하늘 사진
  ogImage: "/img/sky-bg.jpg",
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
      value: 1850,
      decimals: 0,
      suffix: "만원",
      label: "외주비 절감",
      labelEn: "saved in outsourcing",
      hint: "미오클리닉 홈페이지·프로토타입 직접 구현",
      hintEn: "Built the Mio Clinic site & prototypes end-to-end",
    },
    {
      value: 15.2,
      decimals: 1,
      suffix: "×",
      label: "SEO 노출 상승",
      labelEn: "SEO impressions",
      hint: "Flutter-web → Next.js 마이그레이션",
      hintEn: "Flutter-web → Next.js migration",
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

export function writingHref(lang: Lang, slug?: string): string {
  const base = lang === "en" ? "/en/writing" : "/writing";
  return slug ? `${base}/${slug}` : base;
}
