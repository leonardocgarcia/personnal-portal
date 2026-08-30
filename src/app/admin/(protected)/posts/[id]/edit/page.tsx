import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { updatePostAction } from "@/app/admin/(protected)/posts/actions";
import { getPostByIdForAdmin } from "@/lib/posts";
import { isTag } from "@/lib/tags";

export const metadata: Metadata = {
  title: "Edit post",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({ params }: PageProps<"/admin/posts/[id]/edit">) {
  const { id } = await params;
  const post = await getPostByIdForAdmin(id);
  if (!post) notFound();

  const action = updatePostAction.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-foreground">Edit post</h1>
      <PostForm
        action={action}
        submitLabel="Save changes"
        initial={{
          title: post.title,
          description: post.description,
          tags: post.tags.filter(isTag),
          visibility: post.visibility,
          contentHtml: post.contentHtml,
        }}
      />
    </div>
  );
}
