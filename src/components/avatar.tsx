function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function Avatar({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "lg";
}) {
  const dims = size === "lg" ? "h-20 w-20 text-2xl" : "h-8 w-8 text-xs";

  return (
    <div
      className={`flex ${dims} shrink-0 items-center justify-center rounded-full bg-foreground font-semibold text-background`}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}
