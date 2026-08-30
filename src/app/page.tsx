import { getPostsForViewer } from "@/lib/posts";
import { isAdmin } from "@/lib/auth";
import { isTag } from "@/lib/tags";
import { SITE } from "@/lib/site";
import { SHELL, READ } from "@/lib/layout";
import { PostCard } from "@/components/post-card";
import { TagFilter } from "@/components/tag-filter";
import { SubscribeForm } from "@/components/subscribe-form";

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const tagParam = typeof params.tag === "string" ? params.tag : undefined;
  const activeTag = tagParam && isTag(tagParam) ? tagParam : undefined;

  const admin = await isAdmin();
  const allPosts = await getPostsForViewer(admin);
  const posts = activeTag ? allPosts.filter((post) => post.tags.includes(activeTag)) : allPosts;

  return (
    <div>
      <div className={`${SHELL} border-b border-border pb-12`}>
        <h1 className="max-w-2xl text-3xl font-bold text-balance text-foreground sm:text-4xl">
          {SITE.tagline}
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted">{SITE.bio}</p>

        <div id="subscribe" className="mt-8 max-w-md scroll-mt-24">
          <p className="mb-2 text-sm font-medium text-foreground">
            Get notified about every new post
          </p>
          <SubscribeForm />
        </div>
      </div>

      <div className={`${READ} py-10`}>
        <div className="mb-8">
          <TagFilter active={activeTag} />
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-muted">No posts with this tag yet.</p>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
