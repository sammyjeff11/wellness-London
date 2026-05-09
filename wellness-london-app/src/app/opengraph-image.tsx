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
          background: "#f8f5ef",
          color: "#211d18",
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
          <p style={{ fontSize: 28, letterSpacing: 6, margin: 0, textTransform: "uppercase" }}>
            Curated London Wellness Directory
          </p>
          <h1 style={{ fontSize: 96, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
            Well Edit
          </h1>
          <p style={{ color: "#675f55", fontSize: 34, lineHeight: 1.35, margin: 0 }}>
            Saunas, cold plunges, cryotherapy and recovery studios selected with calm editorial care.
          </p>
        </div>
      </div>
    ),
    size,
  );
}
