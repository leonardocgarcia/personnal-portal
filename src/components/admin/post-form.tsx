"use client";

import { useActionState, useState } from "react";
import { PostEditor } from "@/components/admin/post-editor";
import { TAGS, TAG_LABELS, Tag } from "@/lib/tags";
import type { PostFormState } from "@/app/admin/(protected)/posts/actions";
import type { Visibility } from "@/lib/posts";

type Action = (prevState: PostFormState, formData: FormData) => Promise<PostFormState>;

export function PostForm({
  action,
  submitLabel,
  initial,
}: {
  action: Action;
  submitLabel: string;
  initial?: {
    title: string;
    description: string;
    tags: Tag[];
    visibility: Visibility;
    contentHtml: string;
  };
}) {
  const [state, formAction, pending] = useActionState(action, {} as PostFormState);
  const [contentHtml, setContentHtml] = useState(initial?.contentHtml ?? "");

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-foreground">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initial?.title}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground">
          Descrição curta{" "}
          <span className="font-normal text-muted">(aparece no feed e no SEO)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={initial?.description}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
      </div>

      <fieldset>
        <legend className="mb-1.5 block text-sm font-medium text-foreground">Tags</legend>
        <div className="flex flex-wrap gap-3">
          {TAGS.map((tag) => (
            <label key={tag} className="flex items-center gap-1.5 text-sm text-foreground">
              <input
                type="checkbox"
                name="tags"
                value={tag}
                defaultChecked={initial?.tags.includes(tag)}
                className="accent-[color:var(--accent)]"
              />
              {TAG_LABELS[tag]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1.5 block text-sm font-medium text-foreground">Visibilidade</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-1.5 text-sm text-foreground">
            <input
              type="radio"
              name="visibility"
              value="public"
              defaultChecked={(initial?.visibility ?? "public") === "public"}
              className="accent-[color:var(--accent)]"
            />
            Público — qualquer visitante vê
          </label>
          <label className="flex items-center gap-1.5 text-sm text-foreground">
            <input
              type="radio"
              name="visibility"
              value="private"
              defaultChecked={initial?.visibility === "private"}
              className="accent-[color:var(--accent)]"
            />
            Privado — só o admin vê
          </label>
        </div>
      </fieldset>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-foreground">Conteúdo</span>
        <PostEditor initialContent={initial?.contentHtml ?? ""} onChange={setContentHtml} />
        <input type="hidden" name="contentHtml" value={contentHtml} readOnly />
      </div>

      {state.error && <p className="text-sm text-red-700 dark:text-red-400">{state.error}</p>}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
