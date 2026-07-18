"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig, homeHref, writingHref, type Lang } from "@/lib/config";

export function Header() {
  const pathname = usePathname() || "/";
  const lang: Lang =
    pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ko";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // 현재 경로의 반대 언어 버전 URL
  const toggleHref =
    lang === "en"
      ? pathname.replace(/^\/en/, "") || "/"
      : pathname === "/"
        ? "/en"
        : `/en${pathname}`;

  const name = lang === "en" ? siteConfig.nameEn : siteConfig.name;
  const writingLabel = lang === "en" ? "Writing" : "회고";
  const mapLabel = lang === "en" ? "Work" : "기여 지도";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5">
        <Link
          href={homeHref(lang)}
          className="font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {name}
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href={writingHref(lang)}
            className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            {writingLabel}
          </Link>
          <a
            href={siteConfig.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            {mapLabel}
          </a>
          <Link
            href={toggleHref}
            aria-label={lang === "en" ? "한국어로 보기" : "View in English"}
            className="rounded-md px-2.5 py-1.5 font-medium text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            {lang === "en" ? "한국어" : "EN"}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
