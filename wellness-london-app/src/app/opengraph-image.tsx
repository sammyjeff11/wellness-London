import { ImageResponse } from "next/og";

export const alt = "Well Edit";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#f4efe6",
          color: "#29241d",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            maxWidth: "920px",
          }}
        >
          <p style={{ fontSize: 24, letterSpacing: 7, margin: 0, textTransform: "uppercase" }}>
            London Wellness Guide
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 108, fontWeight: 400, lineHeight: 0.95, margin: 0 }}>
            Well Edit
          </h1>
          <p style={{ color: "#70695d", fontSize: 34, lineHeight: 1.35, margin: 0 }}>
            Saunas, cold plunges, cryotherapy and recovery studios selected with calm editorial care.
          </p>
        </div>
      </div>
    ),
    size,
  );
}
