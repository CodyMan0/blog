import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-2xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {siteConfig.name}</p>
        <div className="flex gap-4">
          <a href={siteConfig.social.github} className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={siteConfig.social.linkedin} className="hover:text-foreground" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.social.email}`} className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
