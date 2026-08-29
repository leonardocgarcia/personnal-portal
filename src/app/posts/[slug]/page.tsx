import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagBadge } from "@/components/tag-badge";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/posts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps<"/posts/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← Voltar ao feed
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{post.title}</h1>
      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
        {formatDate(post.date)} · {post.readingTime}
      </p>

      <div
        className="prose prose-zinc mt-8 max-w-none dark:prose-invert prose-a:text-zinc-900 dark:prose-a:text-zinc-50"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
