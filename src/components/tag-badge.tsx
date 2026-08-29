import Link from "next/link";
import { Tag, TAG_LABELS } from "@/lib/tags";

// Tons dentro da mesma família verde/terrosa, variando matiz para diferenciar as tags
// sem recorrer a azul/roxo/vermelho.
const TAG_STYLES: Record<Tag, string> = {
  pensamento:
    "bg-[#edf1e6] text-[#47603f] ring-[#47603f]/25 dark:bg-[#3a4a34]/40 dark:text-[#b7d0a9] dark:ring-[#b7d0a9]/25",
  estudo:
    "bg-[#e3eae1] text-[#1f3d2b] ring-[#1f3d2b]/25 dark:bg-[#22392c]/50 dark:text-[#8fc49b] dark:ring-[#8fc49b]/25",
  recomendacao:
    "bg-[#f1ecdd] text-[#6b5a34] ring-[#6b5a34]/25 dark:bg-[#463a24]/40 dark:text-[#d4b98a] dark:ring-[#d4b98a]/25",
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
    active ? "" : interactive ? "opacity-80 hover:opacity-100" : ""
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
