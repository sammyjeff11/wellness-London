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
    facility.address,
  ]
    .filter(Boolean)
    .join(" ");
}

function isBroadLocationLabel(value?: string) {
  const text = normaliseLocationText(value);
  return text === "london" || text === "london wide" || text === "multiple london locations";
}

function uniqueValues(values: (string | undefined)[] = []) {
  return Array.from(new Set(values.filter(Boolean) as string[]));
}

function getOperatorKey(facility: ServiceDirectoryFacility) {
  const text = normaliseLocationText([facility.brandOperator, facility.businessName, facility.name].filter(Boolean).join(" "));

  if (text.includes("arc")) return "arc";
  if (text.includes("third space")) return "third space";
  if (text.includes("aire ancient baths")) return "aire ancient baths";
  if (text.includes("community sauna") || text.includes("hackney wick sauna baths")) return "community sauna baths";
  if (text.includes("lanserhof")) return "lanserhof";
  if (text.includes("cloud twelve")) return "cloud twelve";
  if (text.includes("lowlu")) return "lowlu";
  if (text.includes("rooftop saunas")) return "rooftop saunas";
  if (text.includes("londoncryo") || text.includes("london cryo")) return "london cryo";
  if (text.includes("sauna and plunge")) return "sauna and plunge";

  return normaliseLocationText(facility.brandOperator || facility.businessName || facility.name);
}

function isParentBrandRecord(facility: ServiceDirectoryFacility) {
  const locationText = normaliseLocationText(getLocationText(facility));
  const areaText = normaliseLocationText([facility.neighbourhood, facility.location, facility.areaOfLondon, facility.areaGroup].filter(Boolean).join(" "));
  const addressText = normaliseLocationText(facility.address);

  return (
    areaText.includes("london wide") ||
    areaText.includes("multiple london locations") ||
    addressText.includes("multiple london locations") ||
    addressText.includes("create individual location records") ||
    addressText.includes("validate current venue address") ||
    addressText.includes("validate current clinic address") ||
    (isBroadLocationLabel(facility.neighbourhood || facility.location) && locationText.includes("multiple"))
  );
}

export function isVisitablePhysicalVenue(facility: ServiceDirectoryFacility) {
  if (isParentBrandRecord(facility)) return false;

  const location = facility.neighbourhood || facility.location || facility.nearestStation;
  return Boolean(location && !isBroadLocationLabel(location));
}

function getCanonicalVenueKey(facility: ServiceDirectoryFacility) {
  const operator = getOperatorKey(facility);
  const location = normaliseLocationText(facility.neighbourhood || facility.location || facility.nearestStation);
  const address = normaliseLocationText(facility.address);
  const name = normaliseLocationText(facility.name);

  if (operator && location && !isBroadLocationLabel(location)) return `${operator}:${location}`;
  if (address && !address.includes("validate")) return `address:${address}`;
  return `${name}:${location}`;
}

function scoreFacilityCompleteness(facility: ServiceDirectoryFacility) {
  const address = normaliseLocationText(facility.address);
  const hasSpecificAddress = address && !address.includes("validate") && !isBroadLocationLabel(address);

  return (
    Number(facility.isFeatured) * 1000 +
    (facility.profileCompletenessScore || 0) +
    Number(hasSpecificAddress) * 100 +
    (facility.services?.length || 0) * 8 +
    (facility.serviceKeys?.length || 0) * 6 +
    (facility.bestFor?.length || 0) * 3 +
    (facility.description ? Math.min(facility.description.length, 180) / 20 : 0)
  );
}

function mergeFacilityData(primary: ServiceDirectoryFacility, duplicate: ServiceDirectoryFacility): ServiceDirectoryFacility {
  return {
    ...primary,
    services: uniqueValues([...(primary.services || []), ...(duplicate.services || [])]),
    serviceKeys: uniqueValues([...(primary.serviceKeys || []), ...(duplicate.serviceKeys || [])]),
    bestFor: uniqueValues([...(primary.bestFor || []), ...(duplicate.bestFor || [])]),
    experienceType: uniqueValues([...(primary.experienceType || []), ...(duplicate.experienceType || [])]),
    address: primary.address || duplicate.address,
    brandOperator: primary.brandOperator || duplicate.brandOperator,
    businessName: primary.businessName || duplicate.businessName,
  };
}

export function getUniquePhysicalVenues(facilities: ServiceDirectoryFacility[]) {
  const byVenue = new Map<string, ServiceDirectoryFacility>();

  facilities.filter(isVisitablePhysicalVenue).forEach((facility) => {
    const key = getCanonicalVenueKey(facility);
    const current = byVenue.get(key);

    if (!current) {
      byVenue.set(key, facility);
      return;
    }

    const primary = scoreFacilityCompleteness(facility) > scoreFacilityCompleteness(current) ? facility : current;
    const duplicate = primary === facility ? current : facility;
    byVenue.set(key, mergeFacilityData(primary, duplicate));
  });

  return Array.from(byVenue.values());
}

export function getFacilitiesForLocation(facilities: ServiceDirectoryFacility[], terms: string[], limit = 9) {
  const normalisedTerms = terms.map(normaliseLocationText).filter(Boolean);

  const matches = facilities
    .filter((facility) => {
      const locationText = normaliseLocationText(getLocationText(facility));
      return normalisedTerms.some((term) => locationText.includes(term));
    })
    .sort((a, b) => scoreFacilityCompleteness(b) - scoreFacilityCompleteness(a));

  return getUniquePhysicalVenues(matches)
    .slice(0, limit);
}
