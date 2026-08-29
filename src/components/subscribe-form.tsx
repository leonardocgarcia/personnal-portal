"use client";

import { useActionState, useEffect, useRef } from "react";
import { subscribeAction, type SubscribeState } from "@/app/actions/subscribe";

const initialState: SubscribeState = {};

export function SubscribeForm({ className = "" }: { className?: string }) {
  const [state, formAction, pending] = useActionState(subscribeAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") formRef.current?.reset();
  }, [state]);

  return (
    <div className={className}>
      <form ref={formRef} action={formAction} className="flex flex-col gap-2 sm:flex-row">
        {/* Honeypot field, hidden from real visitors via CSS, not display:none
            (which some bots skip filling). */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 opacity-0"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="seu@email.com"
          className="w-full flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent sm:w-auto"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Enviando…" : "Assinar"}
        </button>
      </form>
      {state.message && (
        <p
          className={`mt-2 text-sm ${
            state.status === "error" ? "text-red-700 dark:text-red-400" : "text-muted"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
