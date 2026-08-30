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
