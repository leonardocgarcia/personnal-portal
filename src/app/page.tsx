import { getAllPosts, getPostsByTag } from "@/lib/posts";
import { isTag } from "@/lib/tags";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const tagParam = typeof params.tag === "string" ? params.tag : undefined;
  const activeTag = tagParam && isTag(tagParam) ? tagParam : undefined;

  const posts = activeTag ? getPostsByTag(activeTag) : getAllPosts();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Pensamentos, estudos e recomendações
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Um feed único, filtrável por tipo de conteúdo.
        </p>
      </div>

      <div className="mb-8">
        <TagFilter active={activeTag} />
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Nenhum post com essa tag ainda.
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
