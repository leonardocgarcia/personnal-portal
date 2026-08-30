import "server-only";
import { and, desc, eq, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { posts, type PostRow } from "@/db/schema";
import { Tag, normalizeTag } from "@/lib/tags";

export type Visibility = "public" | "private";

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date, derived from createdAt
  tags: Tag[];
  visibility: Visibility;
  readingTime: string;
};

export type Post = PostMeta & {
  html: string;
};

function estimateReadingTime(html: string): string {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function toMeta(row: PostRow): PostMeta {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.createdAt.toISOString().slice(0, 10),
    tags: row.tags.map(normalizeTag).filter((tag): tag is Tag => tag !== undefined),
    visibility: row.visibility,
    readingTime: estimateReadingTime(row.contentHtml),
  };
}

/** Posts visible to a public reader — never includes private posts. */
export async function getAllPosts(): Promise<PostMeta[]> {
  const db = getDb();
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.visibility, "public"))
    .orderBy(desc(posts.createdAt));
  return rows.map(toMeta);
}

/** Posts visible to the current viewer — admins also see private posts. */
export async function getPostsForViewer(isAdminViewer: boolean): Promise<PostMeta[]> {
  const db = getDb();
  const rows = isAdminViewer
    ? await db.select().from(posts).orderBy(desc(posts.createdAt))
    : await db
        .select()
        .from(posts)
        .where(eq(posts.visibility, "public"))
        .orderBy(desc(posts.createdAt));
  return rows.map(toMeta);
}

export async function getPostsByTag(tag: Tag, isAdminViewer = false): Promise<PostMeta[]> {
  const all = await getPostsForViewer(isAdminViewer);
  return all.filter((post) => post.tags.includes(tag));
}

/** A single post for a reader — returns null if private and viewer isn't admin. */
export async function getPostBySlug(
  slug: string,
  isAdminViewer: boolean
): Promise<Post | null> {
  const db = getDb();
  const [row] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  if (!row) return null;
  if (row.visibility === "private" && !isAdminViewer) return null;
  return { ...toMeta(row), html: row.contentHtml };
}

// --- Admin-only access below ---

export async function getPostByIdForAdmin(id: string): Promise<PostRow | null> {
  const db = getDb();
  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return row ?? null;
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const db = getDb();
  const rows = await db
    .select({ id: posts.id })
    .from(posts)
    .where(excludeId ? and(eq(posts.slug, slug), ne(posts.id, excludeId)) : eq(posts.slug, slug))
    .limit(1);
  return rows.length > 0;
}

export type PostInput = {
  slug: string;
  title: string;
  description: string;
  contentHtml: string;
  tags: Tag[];
  visibility: Visibility;
};

export async function createPost(input: PostInput): Promise<PostRow> {
  const db = getDb();
  const [row] = await db.insert(posts).values(input).returning();
  return row;
}

export async function updatePost(id: string, input: PostInput): Promise<PostRow | null> {
  const db = getDb();
  const [row] = await db
    .update(posts)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return row ?? null;
}

export async function deletePost(id: string): Promise<void> {
  const db = getDb();
  await db.delete(posts).where(eq(posts.id, id));
}
