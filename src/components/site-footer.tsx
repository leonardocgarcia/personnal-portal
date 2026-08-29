import { SITE } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-8 text-xs text-muted sm:px-0">
        <span>
          © {year} · {SITE.name}
        </span>
        <SocialLinks />
      </div>
    </footer>
  );
}
