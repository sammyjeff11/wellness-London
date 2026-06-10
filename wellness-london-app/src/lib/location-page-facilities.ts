import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import { dedupeFacilities, isPhysicalVenueRecord, normaliseFacilityValue } from "@/lib/dedupe-facilities";

export const normaliseLocationText = normaliseFacilityValue;
export const isVisitablePhysicalVenue = isPhysicalVenueRecord;
export const getUniquePhysicalVenues = dedupeFacilities;

function getLocationText(facility: ServiceDirectoryFacility) {
  return [
    facility.neighbourhood,
    facility.location,
    facility.areaOfLondon,
    facility.areaGroup,
    facility.nearestStation,
    facility.address,
  ]
    .filter(Boolean)
    .join(" ");
}

function scoreFacilityCompleteness(facility: ServiceDirectoryFacility) {
  return (
    Number(facility.isFeatured) * 1000 +
    (facility.profileCompletenessScore || 0) +
    Number(Boolean(facility.address)) * 100 +
    (facility.services?.length || 0) * 8 +
    (facility.serviceKeys?.length || 0) * 6 +
    (facility.bestFor?.length || 0) * 3 +
    (facility.description ? Math.min(facility.description.length, 180) / 20 : 0)
  );
}

export function getFacilitiesForLocation(facilities: ServiceDirectoryFacility[], terms: string[], limit = 9) {
  const normalisedTerms = terms.map(normaliseLocationText).filter(Boolean);

  const matches = facilities
    .filter((facility) => {
      const locationText = normaliseLocationText(getLocationText(facility));
      return normalisedTerms.some((term) => locationText.includes(term));
    })
    .sort((a, b) => scoreFacilityCompleteness(b) - scoreFacilityCompleteness(a));

  return dedupeFacilities(matches).slice(0, limit);
}
