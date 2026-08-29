import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";
import { Avatar } from "@/components/avatar";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Sobre ${SITE.name}.`,
};

export default function SobrePage() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Avatar name={SITE.name} size="lg" />
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{SITE.name}</h1>
          <SocialLinks className="mt-2" />
        </div>
      </div>

      <p className="mt-8 text-base leading-7 text-zinc-700 dark:text-zinc-300">{SITE.bio}</p>

      <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
        Este texto é um placeholder — edite{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800">
          src/lib/site.ts
        </code>{" "}
        para colocar sua bio de verdade.
      </p>
    </div>
  );
}
