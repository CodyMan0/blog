import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-5">
        <Link
          href="/"
          className="font-semibold tracking-tight hover:text-accent"
        >
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/writing"
            className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-card hover:text-foreground"
          >
            회고
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
