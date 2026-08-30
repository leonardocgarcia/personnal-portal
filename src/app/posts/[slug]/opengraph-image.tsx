import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { SITE } from "@/lib/site";
import { TAG_LABELS } from "@/lib/tags";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Always resolve as a public viewer: this image is served to link-preview
  // bots with no session, and must never render a private post's title.
  const post = await getPostBySlug(slug, false);
  const title = post?.title ?? SITE.name;
  const tag = post?.tags[0] ? TAG_LABELS[post.tags[0]] : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "90px",
          background: "#faf7f1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              borderRadius: 9,
              border: "2px solid #1d3327",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "#1d3327",
            }}
          >
            LG
          </div>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#3b6142" }}>{SITE.name}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.18,
            color: "#1d3327",
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        {tag && (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 22,
              fontWeight: 500,
              color: "#3b6142",
              border: "2px solid #3b6142",
              borderRadius: 999,
              padding: "8px 22px",
            }}
          >
            {tag}
          </div>
        )}
      </div>
    ),
    size
  );
}
