import { readFileSync } from "fs";
import { join } from "path";
import { CalendarMCPLogo } from "@/app/CalendarMCPLogo";
import { ImageResponse } from "next/og";

export async function GET() {
  const fontPath = join(process.cwd(), "public/fonts/IBMPlexSans-Regular.ttf");
  const fontData = readFileSync(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 56,
          fontFamily: "IBM Plex Sans",
          fontWeight: 400,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CalendarMCPLogo
          style={{
            width: 192,
            height: 192,
            marginRight: 32,
            padding: 32,
            background: "#fafafa",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Calendar MCP</span>
          <span style={{ fontSize: 32, color: "#9f9fa9" }}>by LEGIT</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "IBM Plex Sans",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
