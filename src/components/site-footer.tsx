import { SITE } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-8 text-xs text-zinc-400 dark:text-zinc-500 sm:px-0">
        <span>
          © {year} · {SITE.name}
        </span>
        <SocialLinks />
      </div>
    </footer>
  );
}
