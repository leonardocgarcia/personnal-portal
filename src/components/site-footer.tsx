import { SITE } from "@/lib/site";
import { BAR } from "@/lib/layout";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className={`${BAR} flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between`}>
        <span className="text-xs text-muted">
          © {year} · {SITE.name}
        </span>
        <div className="flex items-center gap-4">
          <a href="/feed.xml" className="text-xs text-muted hover:text-foreground">
            RSS
          </a>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
