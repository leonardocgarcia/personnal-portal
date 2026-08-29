import Link from "next/link";
import { TAGS, TAG_LABELS, Tag } from "@/lib/tags";

export function TagFilter({ active }: { active?: Tag }) {
  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="Filtrar por tag">
      <Link
        href="/"
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          !active
            ? "bg-foreground text-background"
            : "bg-surface text-muted hover:bg-surface-hover"
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
              ? "bg-foreground text-background"
              : "bg-surface text-muted hover:bg-surface-hover"
          }`}
        >
          {TAG_LABELS[tag]}
        </Link>
      ))}
    </nav>
  );
}
