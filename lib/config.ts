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
  avatar: "/img/profile.png",
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
    "외주비 1,850만원 절감",
    "SEO 노출 15.2배↑",
    "리포트 생성 99.6%↓",
  ] as string[],
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
