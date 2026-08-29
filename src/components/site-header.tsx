import Link from "next/link";
import { SITE } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-6 sm:px-0">
        <Link href="/" className="text-base font-semibold text-foreground">
          {SITE.name}
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 text-sm text-muted">
            <Link href="/" className="hover:text-foreground">
              Feed
            </Link>
            <Link href="/sobre" className="hover:text-foreground">
              Sobre
            </Link>
          </nav>
          <SocialLinks className="hidden sm:flex" />
        </div>
      </div>
    </header>
  );
}
