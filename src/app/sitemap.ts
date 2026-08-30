import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // getAllPosts() only returns public posts, so private posts never
  // leak into the sitemap.
  const posts = await getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/posts/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    { url: SITE.url, changeFrequency: "weekly" },
    { url: `${SITE.url}/archive`, changeFrequency: "weekly" },
    { url: `${SITE.url}/about`, changeFrequency: "monthly" },
    ...postEntries,
  ];
}
