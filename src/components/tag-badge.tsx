import Link from "next/link";
import { Tag, TAG_LABELS } from "@/lib/tags";

const TAG_STYLES: Record<Tag, string> = {
  pensamento:
    "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
  estudo:
    "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
  recomendacao:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
};

export function TagBadge({
  tag,
  active = false,
  interactive = true,
}: {
  tag: Tag;
  active?: boolean;
  interactive?: boolean;
}) {
  const classes = `inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-opacity ${TAG_STYLES[tag]} ${
    active ? "" : interactive ? "opacity-70 hover:opacity-100" : ""
  }`;

  if (!interactive) {
    return <span className={classes}>{TAG_LABELS[tag]}</span>;
  }

  return (
    <Link href={`/?tag=${tag}`} className={classes}>
      {TAG_LABELS[tag]}
    </Link>
  );
}
