import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";
import { Tag, isTag } from "./tags";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO date string, e.g. 2026-08-20
  tags: Tag[];
  description: string;
  readingTime: string;
};

export type Post = PostMeta & {
  html: string;
};

function readPostFile(fileName: string): { slug: string; raw: string } {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  return { slug, raw };
}

function toMeta(slug: string, raw: string): { meta: PostMeta; content: string } {
  const { data, content } = matter(raw);

  const tags: Tag[] = Array.isArray(data.tags)
    ? data.tags.filter((t: unknown): t is Tag => typeof t === "string" && isTag(t))
    : [];

  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "1970-01-01",
    tags,
    description: data.description ?? "",
    readingTime: readingTime(content).text,
  };

  return { meta, content };
}

function listPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllPosts(): PostMeta[] {
  const files = listPostFiles();
  const posts = files.map((file) => {
    const { slug, raw } = readPostFile(file);
    return toMeta(slug, raw).meta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByTag(tag: Tag): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllSlugs(): string[] {
  return listPostFiles().map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, content } = toMeta(slug, raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return { ...meta, html: processed.toString() };
}
