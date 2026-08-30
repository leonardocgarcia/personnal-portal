"use client";

import { useState, useTransition } from "react";
import { deletePostAction } from "@/app/admin/(protected)/posts/actions";

export function DeletePostButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-xs text-muted hover:text-foreground"
      >
        Delete
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-xs">
      <span className="text-foreground">Confirm?</span>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => deletePostAction(id))}
        className="font-medium text-red-700 hover:underline disabled:opacity-60 dark:text-red-400"
      >
        {pending ? "Deleting…" : "Yes, delete"}
      </button>
      <button type="button" onClick={() => setConfirming(false)} className="text-muted hover:text-foreground">
        Cancel
      </button>
    </span>
  );
}
