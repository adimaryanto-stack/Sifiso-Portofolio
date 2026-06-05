import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Dynamic params
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "Sifiso Portfolio";
    const subtitle = searchParams.get("subtitle") || "Digital Experiences Crafted with Precision";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#0A0A0A", // Background almost black
            backgroundImage: "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: "80px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Subtle Glow */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-20%",
              width: "1000px",
              height: "1000px",
              background: "radial-gradient(circle, rgba(234,88,12,0.15) 0%, rgba(0,0,0,0) 70%)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <div style={{ color: "#FFFFFF", fontSize: "40px", fontWeight: 900, display: "flex", alignItems: "center" }}>
              <span style={{ fontStyle: "italic", paddingRight: "8px" }}>Sifiso</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "80%",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.1,
                margin: 0,
                letterSpacing: "-0.05em",
                textTransform: "uppercase",
              }}
            >
              {title}
            </h1>
            
            <p
              style={{
                fontSize: "32px",
                color: "#888888",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              bottom: "80px",
              left: "80px",
            }}
          >
            <div
              style={{
                color: "#EA580C",
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              sifiso.dev
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
