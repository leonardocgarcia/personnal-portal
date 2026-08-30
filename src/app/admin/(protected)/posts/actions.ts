"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import sanitizeHtml from "sanitize-html";
import { isAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { isTag } from "@/lib/tags";
import {
  createPost,
  deletePost,
  slugExists,
  updatePost,
  type PostInput,
  type Visibility,
} from "@/lib/posts";

export type PostFormState = { error?: string };

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "s",
    "a",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "blockquote",
    "code",
    "pre",
    "img",
    "video",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt"],
    video: ["src", "controls", "style"],
  },
  allowedSchemes: ["https", "http"],
};

function readPostInput(formData: FormData): PostInput | { error: string } {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const contentHtmlRaw = String(formData.get("contentHtml") ?? "");
  const visibility = String(formData.get("visibility") ?? "public") as Visibility;
  const tags = formData.getAll("tags").map(String).filter(isTag);

  if (!title) return { error: "Title is required." };
  if (!contentHtmlRaw || contentHtmlRaw === "<p></p>") {
    return { error: "The post needs some content." };
  }
  if (visibility !== "public" && visibility !== "private") {
    return { error: "Invalid visibility." };
  }

  return {
    slug: slugify(title),
    title,
    description,
    contentHtml: sanitizeHtml(contentHtmlRaw, SANITIZE_OPTIONS),
    tags,
    visibility,
  };
}

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  if (!(await isAdmin())) return { error: "Not authorized." };

  const input = readPostInput(formData);
  if ("error" in input) return input;

  let slug = input.slug || "post";
  if (await slugExists(slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  await createPost({ ...input, slug });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePostAction(
  id: string,
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  if (!(await isAdmin())) return { error: "Not authorized." };

  const input = readPostInput(formData);
  if ("error" in input) return input;

  let slug = input.slug || "post";
  if (await slugExists(slug, id)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const updated = await updatePost(id, { ...input, slug });
  if (!updated) return { error: "Post not found." };

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/posts/${updated.slug}`);
  redirect("/admin");
}

export async function deletePostAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  await deletePost(id);
  revalidatePath("/");
  revalidatePath("/admin");
}
