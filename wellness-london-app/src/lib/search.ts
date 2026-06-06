const searchAliases: Record<string, string[]> = {
  lowlu: ["low loo", "lowlou", "low lu", "lulu"],
  "rooftop saunas": ["roof top sauna", "roof top saunas", "rooftop sauna"],
  "sauna and plunge": ["sauna plunge", "sauna & plunge"],
  "cold plunge": ["ice bath", "ice baths", "cold tub", "cold dip"],
  cryotherapy: ["cryo", "cryotherpay"],
  "red light": ["redlight", "red light therapy"],
  shoreditch: ["shore ditch"],
  "canary wharf": ["canary warf", "canarywarf"],
  "kentish town": ["kentish"],
  wandsworth: ["wands worth"],
  brixton: ["brixston"],
};

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

function expandQuery(query: string) {
  let expanded = ` ${query} `;
  Object.entries(searchAliases).forEach(([canonical, aliases]) => {
    const normalisedCanonical = normaliseSearch(canonical);
    const normalisedAliases = aliases.map(normaliseSearch);
    if (normalisedAliases.some((alias) => expanded.includes(` ${alias} `))) expanded += ` ${normalisedCanonical} `;
    if (expanded.includes(` ${normalisedCanonical} `)) expanded += ` ${normalisedAliases.join(" ")} `;
  });
  return normaliseSearch(expanded);
}

function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
}

export type VenueSearchFacility = {
  name: string;
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

function facilitySearchText(facility: VenueSearchFacility) {
  return normaliseSearch(
    [
      facility.name,
      facility.description,
      facility.location,
      facility.neighbourhood,
      facility.areaOfLondon,
      facility.areaGroup,
      facility.priceRange,
      facility.priceFrom,
      facility.premiumLevel,
      facility.privateOrShared,
      facility.accessType,
      facility.venueType,
      facility.nearestStation,
      ...(facility.services || []),
      ...(facility.serviceKeys || []),
      ...(facility.bestFor || []),
      ...(facility.experienceType || []),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

export function matchesVenueSearch(facility: VenueSearchFacility, query: string) {
  const normalisedQuery = normaliseSearch(query);
  if (!normalisedQuery) return true;

  const expandedQuery = expandQuery(normalisedQuery);
  const searchable = facilitySearchText(facility);
  if (searchable.includes(expandedQuery)) return true;

  const queryTokens = expandedQuery.split(" ").filter((token) => token.length > 1);
  if (queryTokens.every((token) => searchable.includes(token))) return true;

  const searchableTokens = searchable.split(" ").filter((token) => token.length > 2);
  return queryTokens.some((queryToken) =>
    searchableTokens.some(
      (token) =>
        token.includes(queryToken) ||
        queryToken.includes(token) ||
        (queryToken.length >= 4 && levenshtein(queryToken, token) <= 1) ||
        (queryToken.length >= 7 && levenshtein(queryToken, token) <= 2),
    ),
  );
}
