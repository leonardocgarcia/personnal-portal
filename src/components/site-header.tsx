import Link from "next/link";
import { SITE } from "@/lib/site";
import { BAR } from "@/lib/layout";
import { SocialLinks } from "@/components/social-links";
import { Logo } from "@/components/logo";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className={`${BAR} flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6`}>
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo name={SITE.name} />
          <span className="text-base font-semibold text-foreground">{SITE.name}</span>
        </Link>

        <nav className="order-3 flex w-full items-center gap-5 text-sm text-muted sm:order-none sm:w-auto">
          <Link href="/" className="hover:text-foreground">
            Feed
          </Link>
          <Link href="/archive" className="hover:text-foreground">
            Archive
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          <SocialLinks className="hidden sm:flex" />
          <Link
            href="/#subscribe"
            className="rounded-full bg-foreground px-3.5 py-1.5 text-sm font-medium text-background hover:opacity-90"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
