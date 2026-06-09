import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";

export function normaliseLocationText(value?: string | null) {
  return (value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getLocationText(facility: ServiceDirectoryFacility) {
  return [
    facility.neighbourhood,
    facility.location,
    facility.areaOfLondon,
    facility.areaGroup,
    facility.nearestStation,
  ]
    .filter(Boolean)
    .join(" ");
}

export function getFacilitiesForLocation(facilities: ServiceDirectoryFacility[], terms: string[], limit = 9) {
  const normalisedTerms = terms.map(normaliseLocationText).filter(Boolean);

  return facilities
    .filter((facility) => {
      const locationText = normaliseLocationText(getLocationText(facility));
      return normalisedTerms.some((term) => locationText.includes(term));
    })
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0))
    .slice(0, limit);
}
