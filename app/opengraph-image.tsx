import { ImageResponse } from "next/og";

export const alt = "Naren Roy | Full Stack & Creative Frontend Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141311",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(245, 190, 11, 0.18) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(180, 83, 9, 0.15) 0%, transparent 45%)",
          padding: "60px 80px",
          color: "#E6E2D7",
          fontFamily: "system-ui, -apple-system, sans-serif",
          border: "12px solid #1c1b18",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#f5be0b",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                letterSpacing: "0.28em",
                fontWeight: 700,
                color: "#f5be0b",
                textTransform: "uppercase",
              }}
            >
              PORTFOLIO // SILIGURI, INDIA
            </span>
          </div>

          <span
            style={{
              fontSize: "18px",
              fontFamily: "monospace",
              color: "#a8a29e",
              letterSpacing: "0.15em",
            }}
          >
            www.narenroy.in
          </span>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "76px",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            NAREN ROY
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#f5be0b",
              letterSpacing: "0.02em",
            }}
          >
            Full Stack & Creative Frontend Developer
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#d6d3d1",
              maxWidth: "920px",
              lineHeight: 1.4,
              marginTop: "4px",
            }}
          >
            Engineering 60fps kinetic motion, bespoke WebGL shaders, and high-performance React & Next.js architectures.
          </div>
        </div>

        {/* Bottom Tags / Highlights */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(230, 226, 215, 0.15)",
            paddingTop: "28px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
            }}
          >
            {["React", "Next.js", "WebGL", "GSAP Motion", "TypeScript", "Node.js"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(245, 190, 11, 0.1)",
                    border: "1px solid rgba(245, 190, 11, 0.3)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#f5be0b",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#78716c",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Open for Opportunities
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
