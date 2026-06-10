import type { AirtableFacility, ServiceKey } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { getLocationHubHref } from "@/lib/location-hubs";

export type InternalLink = {
  href: string;
  label: string;
  text: string;
};

const SERVICE_KEY_LABELS: Record<ServiceKey, string> = {
  sauna: "Sauna",
  "cold-plunge": "Cold Plunge",
  cryotherapy: "Cryotherapy",
  recovery: "Recovery",
  breathwork: "Breathwork",
  yoga: "Yoga",
  meditation: "Meditation",
  "red-light": "Red Light Therapy",
  hbot: "Hyperbaric Oxygen Therapy",
};

function uniqueByHref<T extends { href: string }>(links: T[]) {
  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function getServiceKeyLabel(key: ServiceKey) {
  return SERVICE_KEY_LABELS[key];
}

export function buildFacilityLocationLinks(facility: AirtableFacility) {
  const candidates = [facility.neighbourhood, facility.areaOfLondon, facility.areaGroup, facility.borough]
    .filter(Boolean)
    .map((label) => {
      const href = getLocationHubHref(label);
      return href ? { href, label } : null;
    })
    .filter((link): link is { href: string; label: string } => Boolean(link));

  return uniqueByHref(candidates);
}

export function buildServiceLocationLinks(facilities: AirtableFacility[], serviceLabel: string, limit = 4): InternalLink[] {
  const counts = new Map<string, { href: string; label: string; count: number }>();

  dedupeFacilities(facilities).forEach((facility) => {
    buildFacilityLocationLinks(facility).forEach((location) => {
      const current = counts.get(location.href);
      counts.set(location.href, {
        href: location.href,
        label: location.label,
        count: (current?.count ?? 0) + 1,
      });
    });
  });

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit)
    .map((location) => ({
      href: location.href,
      label: `${serviceLabel} in ${location.label}`,
      text: `Explore ${location.label} venues connected to ${serviceLabel.toLowerCase()} and related wellness routines.`,
    }));
}
