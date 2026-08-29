import Link from "next/link";
import { SITE } from "@/lib/site";
import { SHELL } from "@/lib/layout";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className={`${SHELL} flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between`}>
        <span className="text-xs text-muted">
          © {year} · {SITE.name}
        </span>
        <nav className="flex items-center gap-4 text-xs text-muted sm:hidden">
          <Link href="/" className="hover:text-foreground">
            Feed
          </Link>
          <Link href="/archive" className="hover:text-foreground">
            Arquivo
          </Link>
          <Link href="/sobre" className="hover:text-foreground">
            Sobre
          </Link>
        </nav>
        <SocialLinks />
      </div>
    </footer>
  );
}
