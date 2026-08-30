"use client";

import { useState } from "react";

export function CopyEmailsButton({ emails }: { emails: string[] }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      disabled={emails.length === 0}
      onClick={async () => {
        await navigator.clipboard.writeText(emails.join(", "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-surface disabled:opacity-50"
    >
      {copied ? "Copied!" : "Copy emails"}
    </button>
  );
}
