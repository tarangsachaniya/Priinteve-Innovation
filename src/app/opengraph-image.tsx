import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = `data:image/png;base64,${(await readFile(path.join(process.cwd(), "public", "logo-mark.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: 80,
          color: "#f4f1ea",
          background: "linear-gradient(135deg, #0e3c32 0%, #0a2b24 55%, #07201b 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: 700 }}>
          <div style={{ fontSize: 44, display: "flex", alignItems: "center", gap: 18, fontWeight: 600 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={66} height={45} alt="" />
            <div style={{ display: "flex" }}>
              {site.shortName}
              <span style={{ color: "#19c74e" }}>.</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05 }}>Software that helps Indian businesses print, serve and grow</div>
            <div style={{ fontSize: 28, color: "#a9b0a4" }}>{site.tagline}</div>
          </div>
        </div>
        <div style={{ width: 300, height: 300, borderRadius: 56, background: "#0e3c32", border: "2px solid rgba(25,199,78,0.35)", alignSelf: "flex-end", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={220} height={150} alt="" />
        </div>
      </div>
    ),
    size,
  );
}
