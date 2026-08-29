import Link from "next/link";
import { SITE } from "@/lib/site";
import { SHELL } from "@/lib/layout";
import { SocialLinks } from "@/components/social-links";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className={`${SHELL} flex items-center justify-between py-6`}>
        <Link href="/" className="flex items-center gap-2.5">
          <Logo name={SITE.name} />
          <span className="text-base font-semibold text-foreground">{SITE.name}</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-4 text-sm text-muted sm:flex">
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
          <SocialLinks className="hidden sm:flex" />
          <Link
            href="/#assinar"
            className="rounded-full bg-foreground px-3.5 py-1.5 text-sm font-medium text-background hover:opacity-90"
          >
            Assinar
          </Link>
        </div>
      </div>
    </header>
  );
}
