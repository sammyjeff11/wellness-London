import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

const siteUrl = new URL("https://welledit.co.uk");
const siteDescription =
  "Discover curated wellness spaces in London, including saunas, cold plunges, cryotherapy and recovery studios.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Well Edit | Curated London Wellness Directory",
    template: "%s",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Well Edit | Curated London Wellness Directory",
    description: siteDescription,
    url: "/",
    siteName: "Well Edit",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Well Edit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Well Edit | Curated London Wellness Directory",
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
