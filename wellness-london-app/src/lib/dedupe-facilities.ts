export type DedupeFacility = {
  slug?: string;
  name?: string;
  address?: string;
  neighbourhood?: string;
  location?: string;
  areaOfLondon?: string;
  areaGroup?: string;
  nearestStation?: string;
  brandName?: string;
  operatorName?: string;
  brandOperator?: string;
  businessName?: string;
  services?: string[];
  serviceKeys?: string[];
  images?: unknown[];
  galleryImages?: unknown[];
  imageUrl?: string;
  website?: string;
  phone?: string;
  email?: string;
  bookingLink?: string;
  isFeatured?: boolean;
  profileCompletenessScore?: number;
  bestFor?: string[];
  experienceType?: string[];
  description?: string;
};

const broadLocationLabels = new Set([
  "london",
  "london wide",
  "londonwide",
  "all london",
  "across london",
  "multiple london locations",
  "multiple locations",
  "various london locations",
  "central",
  "north",
  "south",
  "east",
  "west",
  "central london",
  "north london",
  "north east london",
  "south london",
  "east london",
  "west london",
]);

const broadLocationTerms = [
  "north east london",
  "central london",
  "north london",
  "south london",
  "east london",
  "west london",
  "greater london",
  "london",
];

const knownNeighbourhoodTerms = [
  "canary wharf",
  "shoreditch",
  "hackney wick",
  "hackney",
  "stratford",
  "walthamstow",
  "kensington",
  "marylebone",
  "notting hill",
];

const parentRecordSignals = [
  "multiple london locations",
  "multiple locations",
  "london wide",
  "londonwide",
  "brand only",
  "operator",
  "create individual location records",
  "validate current venue address",
  "validate current clinic address",
];

const legalSuffixes = ["ltd", "limited", "llp", "plc", "uk"];

export function normaliseFacilityValue(value?: string | null) {
  return (value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normaliseSlug(value?: string) {
  return normaliseFacilityValue(value).replace(/\s+/g, "-");
}

function isBroadLocation(value?: string | null) {
  const text = normaliseFacilityValue(value);
  return !text || broadLocationLabels.has(text);
}

function stripTerms(value: string, terms: string[]) {
  let text = normaliseFacilityValue(value);

  terms
    .map((term) => normaliseFacilityValue(term))
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      text = text.replace(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"), " ");
    });

  return text.replace(/\s+/g, " ").trim();
}

function canonicalLocationValue(value?: string | null) {
  const text = normaliseFacilityValue(value);
  if (!text) return "";

  const knownNeighbourhood = knownNeighbourhoodTerms.find((term) => text.includes(term));
  if (knownNeighbourhood) return knownNeighbourhood;

  const stripped = stripTerms(text, broadLocationTerms);
  return isBroadLocation(stripped) ? "" : stripped;
}

function hasSpecificAddress(facility: DedupeFacility) {
  const address = normaliseFacilityValue(facility.address);
  return Boolean(address && !isBroadLocation(address) && !parentRecordSignals.some((signal) => address.includes(signal)));
}

function specificLocationValue(facility: DedupeFacility) {
  return [facility.neighbourhood, facility.location, facility.nearestStation, facility.areaOfLondon, facility.areaGroup]
    .map((value) => canonicalLocationValue(value))
    .find((value) => value && !broadLocationLabels.has(value));
}

function removeLocationTerms(value: string, facility: DedupeFacility) {
  const locationTerms = [
    facility.neighbourhood,
    facility.location,
    facility.nearestStation,
    facility.areaOfLondon,
    facility.areaGroup,
    ...knownNeighbourhoodTerms,
    ...broadLocationTerms,
  ]
    .map((location) => normaliseFacilityValue(location))
    .filter(Boolean);

  return stripTerms(stripTerms(value, locationTerms), legalSuffixes);
}

function getNameWithoutLocation(facility: DedupeFacility) {
  return removeLocationTerms(facility.name || "", facility);
}

function getCanonicalOperatorCandidate(value: string | undefined, facility: DedupeFacility) {
  const stripped = removeLocationTerms(value || "", facility);
  const normalised = normaliseFacilityValue(value);

  return stripped || normalised;
}

function getOperatorKey(facility: DedupeFacility) {
  const candidates = [
    facility.brandName,
    facility.operatorName,
    facility.brandOperator,
    facility.businessName,
    facility.name,
  ]
    .map((value) => getCanonicalOperatorCandidate(value, facility))
    .filter(Boolean);

  const shortestMeaningfulCandidate = candidates
    .filter((candidate) => candidate.length >= 2)
    .sort((a, b) => a.length - b.length)[0];

  return shortestMeaningfulCandidate || getNameWithoutLocation(facility) || normaliseFacilityValue(facility.name);
}

function isClearlyPhysicalSlug(facility: DedupeFacility) {
  const slug = normaliseSlug(facility.slug);
  if (!slug) return false;
  if (parentRecordSignals.some((signal) => slug.includes(signal.replace(/\s+/g, "-")))) return false;

  const location = specificLocationValue(facility);
  return Boolean(location && slug.includes(location.replace(/\s+/g, "-")));
}

function isParentBrandRecord(facility: DedupeFacility) {
  const locationText = normaliseFacilityValue(
    [facility.neighbourhood, facility.location, facility.areaOfLondon, facility.areaGroup, facility.address].filter(Boolean).join(" ")
  );
  const name = normaliseFacilityValue(facility.name);
  const operator = getOperatorKey(facility);
  const hasLocation = Boolean(specificLocationValue(facility));

  return (
    parentRecordSignals.some((signal) => locationText.includes(signal) || name.includes(signal)) ||
    (!hasSpecificAddress(facility) && !hasLocation && Boolean(operator) && name === operator)
  );
}

export function isPhysicalVenueRecord(facility: DedupeFacility) {
  if (isParentBrandRecord(facility)) return false;
  return hasSpecificAddress(facility) || Boolean(specificLocationValue(facility)) || isClearlyPhysicalSlug(facility);
}

export function getPhysicalVenueKey(facility: DedupeFacility) {
  const operator = getOperatorKey(facility);
  const address = normaliseFacilityValue(facility.address);
  const location = specificLocationValue(facility);
  const slug = normaliseSlug(facility.slug);
  const name = normaliseFacilityValue(facility.name);

  // Prefer operator + canonical neighbourhood over address because Airtable rows for
  // the same physical venue can have slightly different address text.
  if (operator && location) return `venue:${operator}:${location}`;
  if (hasSpecificAddress(facility)) return operator ? `address:${operator}:${address}` : `address:${address}`;
  if (isClearlyPhysicalSlug(facility)) return `slug:${slug}`;
  return `name:${name || slug}`;
}

function hasImages(facility: DedupeFacility) {
  return Boolean(facility.imageUrl || facility.images?.length || facility.galleryImages?.length);
}

function hasLocationInName(facility: DedupeFacility) {
  const name = normaliseFacilityValue(facility.name);
  const location = specificLocationValue(facility);
  return Boolean(location && name.includes(location));
}

function scoreFacility(facility: DedupeFacility) {
  return (
    Number(hasSpecificAddress(facility)) * 120 +
    Number(Boolean(specificLocationValue(facility))) * 90 +
    Number(hasLocationInName(facility)) * 45 +
    Number(hasImages(facility)) * 55 +
    (facility.images?.length || 0) * 6 +
    (facility.galleryImages?.length || 0) * 6 +
    (facility.services?.length || 0) * 10 +
    (facility.serviceKeys?.length || 0) * 8 +
    (facility.bestFor?.length || 0) * 4 +
    (facility.experienceType?.length || 0) * 4 +
    Number(Boolean(facility.website && facility.website !== "#")) * 18 +
    Number(Boolean(facility.phone || facility.email || facility.bookingLink)) * 14 +
    Number(Boolean(facility.isFeatured)) * 12 +
    (facility.profileCompletenessScore || 0) +
    Math.min(facility.description?.length || 0, 240) / 30
  );
}

function uniqueStrings(values: (string | undefined)[]) {
  return Array.from(new Set(values.filter(Boolean) as string[]));
}

function mergeKnownFields<T extends DedupeFacility>(primary: T, duplicate: T): T {
  return {
    ...duplicate,
    ...primary,
    services: uniqueStrings([...(primary.services || []), ...(duplicate.services || [])]),
    serviceKeys: uniqueStrings([...(primary.serviceKeys || []), ...(duplicate.serviceKeys || [])]),
    bestFor: uniqueStrings([...(primary.bestFor || []), ...(duplicate.bestFor || [])]),
    experienceType: uniqueStrings([...(primary.experienceType || []), ...(duplicate.experienceType || [])]),
    images: primary.images?.length ? primary.images : duplicate.images,
    galleryImages: primary.galleryImages?.length ? primary.galleryImages : duplicate.galleryImages,
    imageUrl: primary.imageUrl || duplicate.imageUrl,
    address: primary.address || duplicate.address,
    neighbourhood: primary.neighbourhood || duplicate.neighbourhood,
    location: primary.location || duplicate.location,
    areaOfLondon: primary.areaOfLondon || duplicate.areaOfLondon,
    areaGroup: primary.areaGroup || duplicate.areaGroup,
    nearestStation: primary.nearestStation || duplicate.nearestStation,
    website: primary.website || duplicate.website,
    brandName: primary.brandName || duplicate.brandName,
    operatorName: primary.operatorName || duplicate.operatorName,
    brandOperator: primary.brandOperator || duplicate.brandOperator,
    businessName: primary.businessName || duplicate.businessName,
  } as T;
}

export function dedupeFacilities<T extends DedupeFacility>(facilities: T[]): T[] {
  const byVenue = new Map<string, { facility: T; index: number }>();

  facilities.forEach((facility, index) => {
    if (!isPhysicalVenueRecord(facility)) return;

    const key = getPhysicalVenueKey(facility);
    const current = byVenue.get(key);

    if (!current) {
      byVenue.set(key, { facility, index });
      return;
    }

    const primary = scoreFacility(facility) > scoreFacility(current.facility) ? facility : current.facility;
    const duplicate = primary === facility ? current.facility : facility;
    byVenue.set(key, {
      facility: mergeKnownFields(primary, duplicate),
      index: current.index,
    });
  });

  return Array.from(byVenue.values())
    .sort((a, b) => a.index - b.index)
    .map(({ facility }) => facility);
}
