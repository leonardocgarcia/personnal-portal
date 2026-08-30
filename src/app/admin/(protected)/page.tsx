import type { Metadata } from "next";
import Link from "next/link";
import { getPostsForViewer } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagBadge } from "@/components/tag-badge";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  const posts = await getPostsForViewer(true);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Your posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:opacity-90"
        >
          + New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-muted">No posts yet. Create the first one.</p>
      ) : (
        <div className="divide-y divide-border border-t border-border">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between gap-4 py-4">
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  {post.visibility === "private" && (
                    <span className="inline-flex items-center rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted ring-1 ring-inset ring-border">
                      Private
                    </span>
                  )}
                  {post.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} interactive={false} />
                  ))}
                </div>
                <p className="truncate font-medium text-foreground">{post.title}</p>
                <p className="text-xs text-muted">
                  {formatDate(post.date)} · {post.readingTime}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-xs text-muted hover:text-foreground"
                >
                  Edit
                </Link>
                <DeletePostButton id={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
