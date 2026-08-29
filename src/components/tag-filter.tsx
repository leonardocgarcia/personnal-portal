import Link from "next/link";
import { TAGS, TAG_LABELS, Tag } from "@/lib/tags";

export function TagFilter({ active }: { active?: Tag }) {
  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="Filtrar por tag">
      <Link
        href="/"
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          !active
            ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
        }`}
      >
        Tudo
      </Link>
      {TAGS.map((tag) => (
        <Link
          key={tag}
          href={`/?tag=${tag}`}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            active === tag
              ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          {TAG_LABELS[tag]}
        </Link>
      ))}
    </nav>
  );
}
