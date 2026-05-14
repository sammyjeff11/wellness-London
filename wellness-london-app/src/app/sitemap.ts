import type { MetadataRoute } from "next";
import { getFacilities } from "@/lib/airtable";
import { absoluteUrl } from "@/lib/site";

const defaultLastModified = new Date("2026-05-09T00:00:00.000Z");

const staticRoutes = [
  { path: "", priority: 1 },
  { path: "/sauna-london", priority: 0.8 },
  { path: "/cryotherapy-london", priority: 0.8 },
  { path: "/cold-plunge-london", priority: 0.8 },
  { path: "/contrast-therapy-london", priority: 0.8 },
  { path: "/central-london-wellness", priority: 0.7 },
  { path: "/east-london-wellness", priority: 0.7 },
  { path: "/west-london-wellness", priority: 0.7 },
  { path: "/north-london-wellness", priority: 0.7 },
  { path: "/south-london-wellness", priority: 0.7 },
  { path: "/journal", priority: 0.5 },
  { path: "/site-map", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const facilities = await getFacilities();

  const routeEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: defaultLastModified,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  const facilityEntries = facilities
    .filter((facility) => facility.slug && (facility.editorialSummary || facility.description))
    .map((facility) => ({
      url: absoluteUrl(`/facility/${facility.slug}`),
      lastModified: defaultLastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...routeEntries, ...facilityEntries];
}
