import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-4xl px-5 py-6">
        <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {siteConfig.name}</p>
          <div className="flex gap-4">
            <a href={siteConfig.social.github} className="transition-colors hover:text-foreground" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={siteConfig.social.linkedin} className="transition-colors hover:text-foreground" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.social.email}`} className="transition-colors hover:text-foreground">
              Email
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs italic text-muted/70">
          “And we know that in all things God works for the good of those who love
          him.” — Romans 8:28
        </p>
      </div>
    </footer>
  );
}
