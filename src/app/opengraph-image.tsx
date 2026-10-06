import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: 80,
          color: "#1b1325",
          background: "#f5f2f9",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 700 }}>
          <div style={{ fontSize: 44, display: "flex" }}>
            {site.shortName}
            <span style={{ color: "#6d28d9" }}>.</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 78, lineHeight: 1.02 }}>Software that helps Indian businesses print, serve and grow</div>
            <div style={{ fontSize: 28, color: "#675d75" }}>{site.tagline}</div>
          </div>
        </div>
        <div style={{ width: 300, height: 470, borderTopLeftRadius: 300, borderTopRightRadius: 300, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, background: "#6d28d9", alignSelf: "flex-end" }} />
      </div>
    ),
    size,
  );
}
