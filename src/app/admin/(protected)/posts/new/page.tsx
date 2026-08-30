import type { Metadata } from "next";
import { PostForm } from "@/components/admin/post-form";
import { createPostAction } from "@/app/admin/(protected)/posts/actions";

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-foreground">New post</h1>
      <PostForm action={createPostAction} submitLabel="Publish" />
    </div>
  );
}
