export const SITE = {
  name: "Leonardo Garcia",
  url: "https://leocgarcia.me",
  tagline: "Thoughts, studies, and recommendations — noted in public.",
  bio: "This is where I write down what I'm thinking about, studying, and recommending. I'm still figuring out exactly what I'll write about — for now, think of it as a public notebook, with no fixed topic or schedule.",
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "x" | "linkedin" | "github";
};

// Placeholders — swap these URLs for your real profiles.
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "X (Twitter)", href: "https://x.com/your-handle", icon: "x" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/your-handle", icon: "github" },
];
