export const SITE = {
  name: "Leonardo Garcia",
  url: "https://leocgarcia.me",
  tagline: "Pensamentos, estudos e recomendações — anotado em público.",
  bio: "Aqui eu registro o que estou pensando, estudando e recomendando. Ainda estou definindo exatamente sobre o que vou escrever — por enquanto, pense nisso como um caderno de anotações público, sem compromisso com tema fixo ou frequência.",
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "x" | "linkedin" | "github";
};

// Placeholders — troque as URLs pelos seus perfis reais.
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X (Twitter)", href: "https://x.com/seu-usuario", icon: "x" },
  { label: "LinkedIn", href: "https://linkedin.com/in/seu-usuario", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/seu-usuario", icon: "github" },
];
