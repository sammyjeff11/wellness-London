import type { MetadataRoute } from "next";
import { getFacilities } from "@/lib/airtable";

const baseUrl = "https://wellnessldn.com";
const defaultLastModified = new Date("2026-05-09T00:00:00.000Z");

const staticRoutes = [
  { path: "", priority: 1 },
  { path: "/sauna-london", priority: 0.8 },
  { path: "/cryotherapy-london", priority: 0.8 },
  { path: "/cold-plunge-london", priority: 0.8 },
  { path: "/site-map", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const facilities = await getFacilities();

  const routeEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: defaultLastModified,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  const facilityEntries = facilities.map((facility) => ({
    url: `${baseUrl}/facility/${facility.id}`,
    lastModified: defaultLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routeEntries, ...facilityEntries];
}
