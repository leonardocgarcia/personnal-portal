export const TAGS = ["thought", "study", "recommendation"] as const;

export type Tag = (typeof TAGS)[number];

export const TAG_LABELS: Record<Tag, string> = {
  thought: "Thought",
  study: "Study",
  recommendation: "Recommendation",
};

export function isTag(value: string): value is Tag {
  return (TAGS as readonly string[]).includes(value);
}

// Pre-translation tag values. Some existing DB rows may still hold these
// (the values were migrated by hand, not by a repo-tracked migration) — map
// them forward so old posts don't silently lose their tags.
const LEGACY_TAG_ALIASES: Record<string, Tag> = {
  pensamento: "thought",
  estudo: "study",
  recomendacao: "recommendation",
};

/** Maps a raw tag string — including legacy pre-translation values — to a current Tag, or undefined if unrecognized. */
export function normalizeTag(value: string): Tag | undefined {
  if (isTag(value)) return value;
  return LEGACY_TAG_ALIASES[value];
}
