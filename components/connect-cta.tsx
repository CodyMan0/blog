import Link from "next/link";
import { siteConfig, type Lang } from "@/lib/config";

const t = {
  ko: {
    prompt: "이 글이 궁금하거나, 커리어 이야기를 나누고 싶다면\n편하게 연락 주세요.",
    linkedin: "LinkedIn",
    email: "이메일",
    coffee: "커피챗",
    subject: "블로그 보고 연락드려요",
    coffeeSubject: "커피챗 요청드려요",
  },
  en: {
    prompt: "Curious about this, or up for a chat about work and careers?\nReach out anytime.",
    linkedin: "LinkedIn",
    email: "Email",
    coffee: "Coffee chat",
    subject: "Hello from lee2022.com",
    coffeeSubject: "Coffee chat request",
  },
} as const;

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.5h3.1V21H3.4V8.5Zm5.06 0h2.97v1.7h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-3.1V8.5Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function CoffeeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

const pill =
  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors";

export function ConnectCta({ lang }: { lang: Lang }) {
  const tx = t[lang];
  const { linkedin, email } = siteConfig.social;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(tx.subject)}`;

  // 실제 예약 링크가 지정되면 그리로, 아직 없으면 "커피챗 요청" 메일로 폴백.
  // 추후 lib/config.ts의 coffeeChatUrl에 Cal.com 등 링크만 넣으면 자동 전환된다.
  const coffeeSet =
    siteConfig.coffeeChatUrl && siteConfig.coffeeChatUrl !== "#";
  const coffeeHref = coffeeSet
    ? siteConfig.coffeeChatUrl
    : `mailto:${email}?subject=${encodeURIComponent(tx.coffeeSubject)}`;

  return (
    <section className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-border px-5 py-6 text-center">
      <p className="max-w-sm whitespace-pre-line text-sm text-muted">{tx.prompt}</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Link
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${pill} border-accent text-accent hover:bg-accent hover:text-background`}
        >
          <LinkedInIcon />
          {tx.linkedin}
        </Link>
        <Link
          href={mailto}
          className={`${pill} border-border text-muted hover:border-accent hover:text-accent`}
        >
          <MailIcon />
          {tx.email}
        </Link>
        <Link
          href={coffeeHref}
          {...(coffeeSet ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={`${pill} border-border text-muted hover:border-accent hover:text-accent`}
        >
          <CoffeeIcon />
          {tx.coffee}
        </Link>
      </div>
    </section>
  );
}
