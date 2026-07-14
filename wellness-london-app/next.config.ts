import type { NextConfig } from "next";
import { permanentRouteRedirects } from "./src/lib/route-consolidation";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return permanentRouteRedirects;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "v6.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "dl.airtable.com",
        pathname: "/.attachments/**",
      },
    ],
  },
};

export default nextConfig;
