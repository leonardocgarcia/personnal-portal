import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { isAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { READ } from "@/lib/layout";
import { TagBadge } from "@/components/tag-badge";

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const admin = await isAdmin();
  const post = await getPostBySlug(slug, admin);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    robots: post.visibility === "private" ? { index: false, follow: false } : undefined,
  };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const admin = await isAdmin();
  const post = await getPostBySlug(slug, admin);
  if (!post) notFound();

  return (
    <article className={READ}>
      <Link href="/" className="mb-8 inline-block text-sm text-muted hover:text-foreground">
        ← Voltar ao feed
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {post.visibility === "private" && (
          <span className="inline-flex items-center rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted ring-1 ring-inset ring-border">
            Privado
          </span>
        )}
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
      <p className="mt-2 text-xs text-muted">
        {formatDate(post.date)} · {post.readingTime}
      </p>

      <div className="prose mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
