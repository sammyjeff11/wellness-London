import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
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
