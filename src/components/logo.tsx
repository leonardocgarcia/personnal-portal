function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

/**
 * Placeholder logomark — a monogram in a bordered box. Swap for a real
 * logo/signature image later: drop the file in `public/` and replace
 * this component's contents with an `<Image>` pointing at it.
 */
export function Logo({ name }: { name: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-foreground/20 text-xs font-bold tracking-tight text-foreground"
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
