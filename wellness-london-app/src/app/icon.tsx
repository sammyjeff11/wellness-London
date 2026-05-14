import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#29241d",
          color: "#fbf8f1",
          display: "flex",
          fontFamily: "Georgia, serif",
          fontSize: 30,
          fontWeight: 400,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.08em",
          width: "100%",
        }}
      >
        W+
      </div>
    ),
    size,
  );
}
