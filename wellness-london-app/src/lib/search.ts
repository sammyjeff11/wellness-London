const searchAliases: Record<string, string[]> = {
  lowlu: ["low loo", "lowlou", "low lu", "lulu"],
  "rooftop saunas": ["roof top sauna", "roof top saunas", "rooftop sauna"],
  "sauna and plunge": ["sauna plunge", "sauna & plunge", "sauna cold plunge"],
  "cold plunge": ["ice bath", "ice baths", "cold tub", "cold dip", "cold therapy"],
  cryotherapy: ["cryo", "cryotherpay", "cryotheraphy"],
  "red light": ["redlight", "red light therapy", "led therapy"],
  shoreditch: ["shore ditch"],
  "canary wharf": ["canary warf", "canarywarf"],
  "kentish town": ["kentish"],
  wandsworth: ["wands worth"],
  brixton: ["brixston"],
  marylebone: ["marleybone", "mary le bone", "marylebourn"],
  othership: ["other ship", "othrship", "othership london"],
  rebase: ["reebase", "rebace"],
};

const fuzzyThresholds = [
  { minLength: 8, distance: 2 },
  { minLength: 4, distance: 1 },
];

export function normaliseSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniq(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function queryVariants(query: string) {
  const normalisedQuery = normaliseSearch(query);
  if (!normalisedQuery) return [];

  const variants = [normalisedQuery];
  Object.entries(searchAliases).forEach(([canonical, aliases]) => {
    const normalisedCanonical = normaliseSearch(canonical);
    const normalisedAliases = aliases.map(normaliseSearch);
    const allTerms = [normalisedCanonical, ...normalisedAliases];

    if (allTerms.some((term) => term === normalisedQuery || (normalisedQuery.length >= 3 && term.includes(normalisedQuery)) || normalisedQuery.includes(term))) {
      variants.push(...allTerms);
    }
  });

  return uniq(variants).sort((a, b) => b.length - a.length);
}

function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  const current = Array.from({ length: b.length + 1 }, () => 0);

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }

  return previous[b.length];
}

function allowedFuzzyDistance(token: string) {
  return fuzzyThresholds.find((threshold) => token.length >= threshold.minLength)?.distance || 0;
}

export type VenueSearchFacility = {
  name: string;
  slug?: string;
  description?: string;
  location?: string;
  neighbourhood?: string;
  areaOfLondon?: string;
  areaGroup?: string;
  priceRange?: string;
  priceFrom?: string;
  premiumLevel?: string;
  privateOrShared?: string;
  accessType?: string;
  venueType?: string;
  services?: string[];
  serviceKeys?: string[];
  bestFor?: string[];
  experienceType?: string[];
  nearestStation?: string;
};

type SearchField = {
  value?: string;
  weight: number;
};

function facilitySearchFields(facility: VenueSearchFacility): SearchField[] {
  return [
    { value: facility.name, weight: 120 },
    { value: facility.slug, weight: 95 },
    { value: facility.neighbourhood, weight: 90 },
    { value: facility.location, weight: 86 },
    { value: facility.areaOfLondon, weight: 78 },
    { value: facility.areaGroup, weight: 76 },
    { value: facility.nearestStation, weight: 72 },
    { value: facility.venueType, weight: 66 },
    ...(facility.services || []).map((value) => ({ value, weight: 82 })),
    ...(facility.serviceKeys || []).map((value) => ({ value, weight: 76 })),
    ...(facility.bestFor || []).map((value) => ({ value, weight: 64 })),
    ...(facility.experienceType || []).map((value) => ({ value, weight: 60 })),
    { value: facility.description, weight: 46 },
    { value: facility.premiumLevel, weight: 34 },
    { value: facility.privateOrShared, weight: 34 },
    { value: facility.accessType, weight: 34 },
    { value: facility.priceRange, weight: 24 },
    { value: facility.priceFrom, weight: 20 },
  ];
}

function scoreTokenAgainstField(queryToken: string, fieldTokens: string[]): number {
  if (fieldTokens.some((token) => token === queryToken)) return 1;
  if (queryToken.length >= 2 && fieldTokens.some((token) => token.startsWith(queryToken))) return 0.9;
  if (queryToken.length >= 3 && fieldTokens.some((token) => token.includes(queryToken) || queryToken.includes(token))) return 0.74;

  const allowedDistance = allowedFuzzyDistance(queryToken);
  if (!allowedDistance) return 0;

  const fuzzyToken = fieldTokens.find((token) => Math.abs(token.length - queryToken.length) <= allowedDistance && levenshtein(queryToken, token) <= allowedDistance);
  return fuzzyToken ? 0.68 : 0;
}

function scoreField(field: SearchField, query: string) {
  const normalisedField = normaliseSearch(field.value || "");
  if (!normalisedField) return 0;
  if (normalisedField === query) return field.weight;
  if (normalisedField.startsWith(query)) return field.weight * 0.94;
  if (query.length >= 2 && normalisedField.includes(query)) return field.weight * 0.84;

  const queryTokens = query.split(" ").filter((token) => token.length > 1);
  if (!queryTokens.length) return 0;

  const fieldTokens = normalisedField.split(" ").filter(Boolean);
  const tokenScores = queryTokens.map((token) => scoreTokenAgainstField(token, fieldTokens));
  const matchedScores = tokenScores.filter((score) => score > 0);
  if (!matchedScores.length) return 0;

  const allTokensMatched = matchedScores.length === queryTokens.length;
  if (allTokensMatched) {
    const average = matchedScores.reduce((total, score) => total + score, 0) / queryTokens.length;
    return field.weight * 0.72 * average;
  }

  return field.weight * 0.34 * Math.max(...matchedScores);
}

export function rankVenueSearch(facility: VenueSearchFacility, query: string) {
  const variants = queryVariants(query);
  if (!variants.length) return 0;

  const fields = facilitySearchFields(facility);
  return Math.max(...variants.map((variant) => Math.max(...fields.map((field) => scoreField(field, variant)))));
}

export function matchesVenueSearch(facility: VenueSearchFacility, query: string) {
  if (!normaliseSearch(query)) return true;
  return rankVenueSearch(facility, query) > 0;
}
