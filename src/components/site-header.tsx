import Link from "next/link";
import { SITE } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-6 sm:px-0">
        <Link href="/" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {SITE.name}
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-50">
              Feed
            </Link>
            <Link href="/sobre" className="hover:text-zinc-900 dark:hover:text-zinc-50">
              Sobre
            </Link>
          </nav>
          <SocialLinks className="hidden sm:flex" />
        </div>
      </div>
    </header>
  );
}
