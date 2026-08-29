import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { TagBadge } from "@/components/tag-badge";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-border py-6">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <h2 className="text-lg font-semibold text-foreground">
        <Link href={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="mt-1.5 text-sm leading-6 text-muted">{post.description}</p>
      )}
      <p className="mt-2 text-xs text-muted/80">
        {formatDate(post.date)} · {post.readingTime}
      </p>
    </article>
  );
}
