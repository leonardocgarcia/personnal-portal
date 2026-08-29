import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagBadge } from "@/components/tag-badge";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-zinc-200 py-6 dark:border-zinc-800">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="mt-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
      )}
      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
        {formatDate(post.date)} · {post.readingTime}
      </p>
    </article>
  );
}
