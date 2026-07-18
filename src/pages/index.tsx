import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useThemeConfig } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
      <line x1="2" y1="20" x2="8" y2="13" opacity="0.4" />
      <line x1="22" y1="20" x2="16" y2="13" opacity="0.4" />
    </svg>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const themeConfig = useThemeConfig();
  const avatarUrl = useBaseUrl(themeConfig.image);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="일하고 성장하는 개발자 이주영입니다. 매달의 일과 성장을 회고로 남깁니다."
    >
      <main className="sky-bg flex items-center justify-center min-h-[calc(100vh-var(--ifm-navbar-height))] px-4 overflow-hidden relative">
        <div className="flex flex-col items-center text-center max-w-md">
          <Avatar className="w-24 h-24 lg:w-28 lg:h-28 mb-5">
            <AvatarImage src={avatarUrl} alt="Ju young Lee" />
            <AvatarFallback>
              <Skeleton className="w-full h-full" />
            </AvatarFallback>
          </Avatar>
          <h1
            className="text-3xl lg:text-4xl font-bold tracking-tight mb-2 leading-tight"
            style={{ color: "var(--ifm-heading-color)" }}
          >
            주도적으로 성장하는 엔지니어
          </h1>
          <p
            className="text-lg lg:text-xl font-semibold mb-1"
            style={{ color: "var(--ifm-heading-color)" }}
          >
            이주영
          </p>
          <p
            className="text-sm lg:text-base"
            style={{
              color:
                "var(--ifm-color-content-secondary, var(--ifm-font-color-secondary))",
            }}
          >
            매달의 경험과 성장을 회고로 남깁니다.
          </p>
          <div className="flex gap-3 mt-5">
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
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold no-underline transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--ifm-color-primary)",
              color: "var(--ifm-button-color, #fff)",
            }}
          >
            회고 보기
          </Link>
        </div>
      </main>
    </Layout>
  );
}
