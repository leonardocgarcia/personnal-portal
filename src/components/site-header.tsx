import Link from "next/link";
import { SITE } from "@/lib/site";
import { BAR } from "@/lib/layout";
import { SocialLinks } from "@/components/social-links";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className={`${BAR} flex items-center justify-between gap-6 py-6`}>
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo name={SITE.name} />
          <span className="text-base font-semibold text-foreground">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
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

        <div className="flex shrink-0 items-center gap-5">
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
