import { ImageResponse } from "next/og";
import { getAllCaseStudies, fetchCaseStudyBySlug } from "@/lib/content/case-studies";

export const runtime = "edge";
export const alt = "Famezop Technologies case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const caseStudy = await fetchCaseStudyBySlug(params.slug);

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
            Case Study · {caseStudy?.industry || "Enterprise"}
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15, maxWidth: 980 }}>
            {caseStudy?.title || "Famezop Technologies Case Study"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
