import type { Metadata } from "next";
import { listSubscribers } from "@/lib/subscribers";
import { formatDate } from "@/lib/format";
import { CopyEmailsButton } from "@/components/admin/copy-emails-button";

export const metadata: Metadata = {
  title: "Subscribers",
  robots: { index: false, follow: false },
};

export default async function SubscribersPage() {
  const subscribers = await listSubscribers();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">
          Subscribers <span className="font-normal text-muted">({subscribers.length})</span>
        </h1>
        <div className="flex items-center gap-3">
          <CopyEmailsButton emails={subscribers.map((s) => s.email)} />
          <a
            href="/admin/subscribers/export"
            className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:opacity-90"
          >
            Download CSV
          </a>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted">
        Automatic email sending isn&rsquo;t set up yet — use this list to notify people some
        other way (e.g. paste it into your email provider).
      </p>

      {subscribers.length === 0 ? (
        <p className="text-sm text-muted">No one has subscribed yet.</p>
      ) : (
        <div className="divide-y divide-border border-t border-border">
          {subscribers.map((s) => (
            <div key={s.id} className="flex items-center justify-between py-3 text-sm">
              <span className="text-foreground">{s.email}</span>
              <span className="text-xs text-muted">{formatDate(s.createdAt.toISOString().slice(0, 10))}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
