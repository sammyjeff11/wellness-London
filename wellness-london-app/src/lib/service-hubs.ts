import { canonicalServiceHref } from "@/lib/taxonomy";

const FALLBACK_SERVICE_HUBS: { keywords: string[]; href: string }[] = [
  {
    href: "/recovery-london",
    keywords: ["physiotherapy", "physio", "compression", "compression therapy", "recovery", "recovery studio", "recovery club", "sports recovery", "performance recovery", "lymphatic", "reset"],
  },
];

export function getServiceHubHref(service?: string | null) {
  if (!service) return null;

  const taxonomyHref = canonicalServiceHref(service);
  if (taxonomyHref) return taxonomyHref;

  const serviceText = service.toLowerCase();
  return FALLBACK_SERVICE_HUBS.find((hub) => hub.keywords.some((keyword) => serviceText.includes(keyword)))?.href ?? null;
}
