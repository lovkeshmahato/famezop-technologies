import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            Custom Software, AI &amp; Enterprise Solutions
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#9CA3AF" }}>
            famezoptechnologies.com · Nepal · India · UAE
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
