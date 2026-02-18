import React, { useState, useRef, useCallback } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useThemeConfig } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import IconLink from "../components/ui/iconLink";
import { Skeleton } from "../components/ui/skeleton";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PlaneIllustration() {
  const planeUrl = useBaseUrl("/img/plane.svg");
  return <img src={planeUrl} alt="plane" style={{ width: 64, height: 64 }} />;
}

type SubItem = { label: string; href: string };
type Category = {
  label: string;
  href: string;
  children: SubItem[];
};

const categories: Category[] = [
  {
    label: "AI",
    href: "/docs/category/ai",
    children: [{ label: "AI 시대의 흐름", href: "/docs/ai/ai-wave" }],
  },
  {
    label: "금융",
    href: "/docs/category/금융",
    children: [{ label: "금융 공부 시작", href: "/docs/finance/intro" }],
  },
  {
    label: "트러블슈팅",
    href: "/docs/category/트러블슈팅",
    children: [
      { label: "LCP 개선", href: "/docs/troubleshooting/lcp" },
      { label: "패키지 연관성", href: "/docs/troubleshooting/package-association" },
    ],
  },
  {
    label: "기본기",
    href: "/docs/category/기본기",
    children: [
      { label: "HTTP 기초", href: "/docs/study/network/http-1" },
      { label: "Next.js", href: "/docs/study/framework/next/nextjs" },
      { label: "렌더링 경로", href: "/docs/study/web-browser/critical-rendering-path" },
    ],
  },
  {
    label: "회고",
    href: "/blog",
    children: [
      { label: "2월 회고", href: "/blog/26y-m2-memoir" },
      { label: "1월 회고", href: "/blog/26y-m1-memoir" },
      { label: "1분기 회고", href: "/blog/25y-q1-memoir" },
    ],
  },
];

const positions = [
  { top: "4%", left: "4%" },
  { top: "2%", right: "4%" },
  { bottom: "16%", left: "2%" },
  { bottom: "14%", right: "2%" },
  { bottom: "0%", left: "50%", ml: "-80px" },
];

function CloudNode({
  cat,
  posStyle,
  delay,
  onNavigate,
}: {
  cat: Category;
  posStyle: React.CSSProperties;
  delay: string;
  onNavigate: (href: string, el: HTMLDivElement) => void;
}) {
  const cloudRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (cloudRef.current) {
      onNavigate(cat.href, cloudRef.current);
    }
  }, [cat.href, onNavigate]);

  return (
    <div
      ref={cloudRef}
      className="absolute cloud-bob"
      style={{
        ...posStyle,
        zIndex: 10,
        cursor: "pointer",
        animationDelay: delay,
      }}
      onClick={handleClick}
    >
      <div className="cloud-shape">
        <div className="cloud-content">
          <span className="cloud-label">{cat.label}</span>
          <div className="cloud-links">
            {cat.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="cloud-link no-underline"
                onClick={(e) => e.stopPropagation()}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const themeConfig = useThemeConfig();
  const avatarUrl = useBaseUrl(themeConfig.image);
  const history = useHistory();
  const [transition, setTransition] = useState<{
    active: boolean;
    x: number;
    y: number;
    href: string;
  } | null>(null);

  const handleNavigate = useCallback(
    (href: string, el: HTMLDivElement) => {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setTransition({ active: true, x, y, href });

      setTimeout(() => {
        history.push(href);
      }, 1500);
    },
    [history]
  );

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="기여에 집중하는 프론트엔드 개발자입니다."
    >
      <main className="sky-bg flex items-center justify-center min-h-[calc(100vh-var(--ifm-navbar-height))] px-4 overflow-hidden relative">
        {/* Cloud transition overlay */}
        {transition?.active && (
          <>
            <div
              className="cloud-transition-overlay"
              style={{
                "--cloud-x": `${transition.x}px`,
                "--cloud-y": `${transition.y}px`,
              } as React.CSSProperties}
            />
            <div className="cloud-transition-loading">
              <div className="plane-icon">
                <PlaneIllustration />
              </div>
              <div className="loading-bar-track">
                <div className="loading-bar-fill" />
              </div>
            </div>
          </>
        )}

        {/* Desktop */}
        <div
          className="hidden md:block relative w-full max-w-3xl select-none"
          style={{ height: "580px" }}
        >
          {/* Center profile */}
          <div
            className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center"
            style={{ zIndex: 20 }}
          >
            <Avatar className="w-24 h-24 lg:w-28 lg:h-28 mb-3">
              <AvatarImage src={avatarUrl} alt="Ju young Lee" />
              <AvatarFallback>
                <Skeleton className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
            <h1
              className="text-2xl lg:text-3xl font-bold tracking-tight mb-1"
              style={{ color: "var(--ifm-heading-color)" }}
            >
              이주영
            </h1>
            <p
              className="text-sm lg:text-base"
              style={{
                color: "var(--ifm-color-content-secondary, var(--ifm-font-color-secondary))",
              }}
            >
              기여에 집중하는 프론트엔드 개발자
            </p>
            <div className="flex gap-3 mt-3">
              <IconLink
                icon={<GitHubLogoIcon className="w-5 h-5" />}
                href="https://github.com/CodyMan0"
                label="GitHub"
              />
              <IconLink
                icon={<LinkedInLogoIcon className="w-5 h-5" />}
                href="https://www.linkedin.com/in/brian0"
                label="LinkedIn"
              />
              <IconLink
                icon={<MailIcon className="w-5 h-5" />}
                href="mailto:hys83751952@gmail.com"
                label="Email"
              />
            </div>
          </div>

          {/* Cloud nodes */}
          {categories.map((cat, i) => (
            <CloudNode
              key={cat.label}
              cat={cat}
              posStyle={{
                top: positions[i].top,
                bottom: positions[i].bottom,
                left: positions[i].left,
                right: positions[i].right,
                marginLeft: positions[i].ml,
              }}
              delay={`${i * 0.5}s`}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col items-center gap-5 py-8 w-full max-w-sm">
          <div className="flex flex-col items-center text-center mb-2">
            <Avatar className="w-20 h-20 mb-3">
              <AvatarImage src={avatarUrl} alt="Ju young Lee" />
              <AvatarFallback>
                <Skeleton className="w-full h-full" />
              </AvatarFallback>
            </Avatar>
            <h1
              className="text-xl font-bold tracking-tight mb-1"
              style={{ color: "var(--ifm-heading-color)" }}
            >
              이주영
            </h1>
            <p
              className="text-sm"
              style={{
                color: "var(--ifm-color-content-secondary, var(--ifm-font-color-secondary))",
              }}
            >
              기여에 집중하는 프론트엔드 개발자
            </p>
            <div className="flex gap-3 mt-2">
              <IconLink
                icon={<GitHubLogoIcon className="w-4 h-4" />}
                href="https://github.com/CodyMan0"
                label="GitHub"
              />
              <IconLink
                icon={<LinkedInLogoIcon className="w-4 h-4" />}
                href="https://www.linkedin.com/in/brian0"
                label="LinkedIn"
              />
              <IconLink
                icon={<MailIcon className="w-4 h-4" />}
                href="mailto:hys83751952@gmail.com"
                label="Email"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="cloud-shape cloud-shape-sm cursor-pointer"
                onClick={() => history.push(cat.href)}
              >
                <div className="cloud-content">
                  <span className="cloud-label">{cat.label}</span>
                  <div className="cloud-links">
                    {cat.children.slice(0, 2).map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="cloud-link no-underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
