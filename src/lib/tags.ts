export const TAGS = ["pensamento", "estudo", "recomendacao"] as const;

export type Tag = (typeof TAGS)[number];

export const TAG_LABELS: Record<Tag, string> = {
  pensamento: "Pensamento",
  estudo: "Estudo",
  recomendacao: "Recomendação",
};

export function isTag(value: string): value is Tag {
  return (TAGS as readonly string[]).includes(value);
}
