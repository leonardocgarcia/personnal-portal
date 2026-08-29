import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { READ } from "@/lib/layout";
import { SocialLinks } from "@/components/social-links";
import { Avatar } from "@/components/avatar";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Sobre ${SITE.name}.`,
};

export default function SobrePage() {
  return (
    <div className={READ}>
      <div className="flex items-center gap-4">
        <Avatar name={SITE.name} size="lg" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">{SITE.name}</h1>
          <SocialLinks className="mt-2" />
        </div>
      </div>

      <p className="mt-8 text-base leading-7 text-foreground/90">{SITE.bio}</p>

      <p className="mt-8 text-sm text-muted">
        Este texto é um placeholder — edite{" "}
        <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em]">
          src/lib/site.ts
        </code>{" "}
        para colocar sua bio de verdade.
      </p>
    </div>
  );
}
