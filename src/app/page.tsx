import { getPostsForViewer } from "@/lib/posts";
import { isAdmin } from "@/lib/auth";
import { isTag } from "@/lib/tags";
import { SITE } from "@/lib/site";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const tagParam = typeof params.tag === "string" ? params.tag : undefined;
  const activeTag = tagParam && isTag(tagParam) ? tagParam : undefined;

  const admin = await isAdmin();
  const allPosts = await getPostsForViewer(admin);
  const posts = activeTag ? allPosts.filter((post) => post.tags.includes(activeTag)) : allPosts;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-balance text-foreground">{SITE.tagline}</h1>
      </div>

      <div className="mb-8">
        <TagFilter active={activeTag} />
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-muted">Nenhum post com essa tag ainda.</p>
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
