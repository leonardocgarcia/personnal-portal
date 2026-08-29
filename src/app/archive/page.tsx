import type { Metadata } from "next";
import Link from "next/link";
import { getPostsForViewer, type PostMeta } from "@/lib/posts";
import { isAdmin } from "@/lib/auth";
import { READ } from "@/lib/layout";
import { TagBadge } from "@/components/tag-badge";

export const metadata: Metadata = {
  title: "Arquivo",
  description: "Todos os posts, em ordem cronológica.",
};

function groupByYear(posts: PostMeta[]): [string, PostMeta[]][] {
  const groups = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  return [...groups.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1));
}

function shortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(date);
}

export default async function ArchivePage() {
  const admin = await isAdmin();
  const posts = await getPostsForViewer(admin);
  const groups = groupByYear(posts);

  return (
    <div className={READ}>
      <h1 className="mb-2 text-2xl font-bold text-foreground">Arquivo</h1>
      <p className="mb-10 text-sm text-muted">
        Todos os posts, do mais recente ao mais antigo — {posts.length}{" "}
        {posts.length === 1 ? "post" : "posts"}.
      </p>

      {groups.length === 0 ? (
        <p className="text-sm text-muted">Nenhum post ainda.</p>
      ) : (
        <div className="flex flex-col gap-10">
          {groups.map(([year, yearPosts]) => (
            <section key={year}>
              <h2 className="mb-4 text-sm font-semibold text-muted">{year}</h2>
              <div className="flex flex-col divide-y divide-border border-t border-border">
                {yearPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group flex items-baseline gap-4 py-3"
                  >
                    <span className="w-14 shrink-0 text-xs text-muted">
                      {shortDate(post.date)}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium text-foreground group-hover:underline">
                      {post.title}
                    </span>
                    <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
                      {post.visibility === "private" && (
                        <span className="inline-flex items-center rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-inset ring-border">
                          Privado
                        </span>
                      )}
                      {post.tags.map((tag) => (
                        <TagBadge key={tag} tag={tag} interactive={false} />
                      ))}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
