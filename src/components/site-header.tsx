import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-6 sm:px-0">
        <Link href="/" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          Portal Pessoal
        </Link>
        <nav className="text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            Feed
          </Link>
        </nav>
      </div>
    </header>
  );
}
