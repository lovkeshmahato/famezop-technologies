import { ImageResponse } from "next/og";
import { getAllBlogPosts, fetchBlogPostBySlug } from "@/lib/content/blog";

export const runtime = "edge";
export const alt = "Famezop Technologies blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPostBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0B",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#0052FF" }}>
          Famezop <span style={{ color: "#FFFFFF", marginLeft: 8 }}>Technologies</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 22, color: "#0052FF", fontWeight: 600 }}>
            {post?.category || "Engineering"}
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, maxWidth: 980 }}>
            {post?.title || "Famezop Technologies Blog"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
