export const directoryFilterKeys = [
  "area",
  "premiumLevel",
  "experienceType",
  "accessType",
  "privateOrShared",
  "beginnerFriendly",
] as const;

export type DirectoryFilterKey = (typeof directoryFilterKeys)[number];

export type DirectoryFilterState = Record<DirectoryFilterKey, string>;

export type DirectoryUrlState = {
  filters: DirectoryFilterState;
  searchQuery: string;
  sort: DirectorySort;
};

export type DirectoryFilterOptions = Record<DirectoryFilterKey, readonly string[]>;

export type DirectoryFilterableFacility = {
  location?: string;
  areaGroup?: string;
  premiumLevel?: string;
  experienceType?: string[];
  accessType?: string;
  privateOrShared?: string;
  beginnerFriendly?: string;
};

export const directorySorts = ["recommended", "price-low", "premium", "recently-checked"] as const;

export type DirectorySort = (typeof directorySorts)[number];

export const initialDirectoryFilters: DirectoryFilterState = {
  area: "",
  premiumLevel: "",
  experienceType: "",
  accessType: "",
  privateOrShared: "",
  beginnerFriendly: "",
};

const paramByFilter: Record<DirectoryFilterKey, string> = {
  area: "area",
  premiumLevel: "level",
  experienceType: "experience",
  accessType: "access",
  privateOrShared: "setting",
  beginnerFriendly: "beginner",
};

export const directoryOwnedParams = ["q", ...Object.values(paramByFilter), "sort"] as const;

function toSearchParams(value: string | URLSearchParams) {
  return typeof value === "string" ? new URLSearchParams(value.startsWith("?") ? value.slice(1) : value) : new URLSearchParams(value);
}

function validOption(value: string | null, options: readonly string[]) {
  return value && options.includes(value) ? value : "";
}

export function parseDirectoryUrlState(value: string | URLSearchParams, options: DirectoryFilterOptions): DirectoryUrlState {
  const params = toSearchParams(value);
  const filters = { ...initialDirectoryFilters };

  for (const key of directoryFilterKeys) {
    filters[key] = validOption(params.get(paramByFilter[key]), options[key]);
  }

  const requestedSort = params.get("sort");
  const sort = directorySorts.includes(requestedSort as DirectorySort) ? requestedSort as DirectorySort : "recommended";

  return {
    filters,
    searchQuery: (params.get("q") || "").slice(0, 120),
    sort,
  };
}

export function buildDirectorySearchParams(currentValue: string | URLSearchParams, state: DirectoryUrlState) {
  const params = toSearchParams(currentValue);

  for (const param of directoryOwnedParams) params.delete(param);

  if (state.searchQuery.trim()) params.set("q", state.searchQuery);
  for (const key of directoryFilterKeys) {
    if (state.filters[key]) params.set(paramByFilter[key], state.filters[key]);
  }
  if (state.sort !== "recommended") params.set("sort", state.sort);

  return params;
}

export function matchesDirectoryFilters(facility: DirectoryFilterableFacility, filters: DirectoryFilterState) {
  const area = facility.areaGroup || facility.location || "";
  const experiences = facility.experienceType || [];

  return (
    (!filters.area || area === filters.area) &&
    (!filters.premiumLevel || facility.premiumLevel === filters.premiumLevel) &&
    (!filters.experienceType || experiences.includes(filters.experienceType)) &&
    (!filters.accessType || facility.accessType === filters.accessType) &&
    (!filters.privateOrShared || facility.privateOrShared === filters.privateOrShared) &&
    (!filters.beginnerFriendly || facility.beginnerFriendly === filters.beginnerFriendly)
  );
}
