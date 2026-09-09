import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    const queryKeys = ["q", "area", "service", "venueType", "accessType", "priceBand", "premiumLevel", "experienceType", "privateOrShared", "sort", "view", "clinicalNeed", "diagnostic", "oversight", "assessmentPrice"];
    return [
      { source: "/:path*", headers: [{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" }] },
      ...queryKeys.map((key) => ({ source: "/:path*", has: [{ type: "query" as const, key }], headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] })),
    ];
  },
  async redirects() {
    return [
      {
        source: "/journal",
        destination: "/editorial",
        permanent: true,
      },
      {
        source: "/journal/:slug*",
        destination: "/editorial/:slug*",
        permanent: true,
      },
      {
        source: "/longevity-london",
        destination: "/longevity",
        permanent: true,
      },
      {
        source: "/collections/best-sauna-london",
        destination: "/editorial/best-saunas-london",
        permanent: true,
      },
      {
        source: "/beginner-friendly-wellness-london",
        destination: "/explore",
        permanent: true,
      },
      {
        source: "/facility/cryojuvenate-uk",
        destination: "/cryotherapy-london",
        permanent: true,
      },
      {
        source: "/facility/sauna-and-plunge-east-london",
        destination: "/facility/sauna-and-plunge-shoreditch",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
