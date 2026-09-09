"use client";

import {
  useMemo,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { guidanceOptions } from "@/lib/venue-facts";
import { useDirectoryUrl } from "@/lib/use-directory-url";
import { normaliseSessionFormat } from "@/lib/comparison-values";
import { venuePrice, sessionPriceBand } from "@/lib/venue-pricing";
import OverlayDialog from "@/components/OverlayDialog";
import Link from "next/link";
import dynamic from "next/dynamic";
import FacilityCard, {
  type FacilityCardFacility,
} from "@/components/FacilityCard";
import { trackEvent } from "@/lib/analytics";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { matchesVenueSearch, rankVenueSearch } from "@/lib/search";
import { isUsefulValue } from "@/lib/useful-values";
import { toDirectoryServiceLabel } from "@/lib/discovery-labels";
import { distanceInKm } from "@/lib/geo";
import {
  getSavedVenueSnapshot,
  parseSavedVenueSlugs,
  subscribeToSavedVenues,
} from "@/lib/saved-venues";

const VenueMap = dynamic(() => import("@/components/VenueMap"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[32rem] animate-pulse rounded-[1.35rem] border border-[#b9ab97] bg-[#ded4c5] lg:min-h-[42rem]"
      aria-label="Loading venue map"
    />
  ),
});

export type ServiceDirectoryFacility = FacilityCardFacility & {
  serviceKeys: string[];
  areaGroup?: string;
  premiumLevel?: string;
  beginnerFriendly?: string;
  privateOrShared?: string;
  lastCheckedDate?: string;
  isFeatured?: boolean;
  profileCompletenessScore?: number;
};

type FilterState = {
  area: string;
  service: string;
  venueType: string;
  accessType: string;
  priceBand: string;
  premiumLevel: string;
  experienceType: string;
  privateOrShared: string;
};

type ServiceDirectoryProps = {
  facilities: ServiceDirectoryFacility[];
  serviceType: string;
  emptyTitle: string;
  emptyText: string;
  prioritisedService?: string;
  directoryMode?: boolean;
};

const initialFilters: FilterState = {
  area: "",
  service: "",
  venueType: "",
  accessType: "",
  priceBand: "",
  premiumLevel: "",
  experienceType: "",
  privateOrShared: "",
};

function normaliseDirectoryService(value: string) {
  return toDirectoryServiceLabel(value);
}

function uniqueValues(values: (string | undefined)[]) {
  return Array.from(
    new Set(values.filter((value): value is string => isUsefulValue(value))),
  ).sort();
}

function premiumRank(value?: string) {
  const text = value?.toLowerCase() || "";
  if (text.includes("luxury")) return 4;
  if (text.includes("premium")) return 3;
  if (text.includes("mid")) return 2;
  if (text.includes("budget")) return 1;
  return 0;
}

function checkedTime(value?: string) {
  if (!value || value === "Details not yet confirmed") return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#5f574c]">
      {label}
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 rounded-none border-0 border-b border-[#bfb3a3] bg-transparent px-0 py-3 text-base normal-case tracking-normal text-[#29241d] outline-none focus:ring-2 focus:ring-[#6f6048] transition focus:border-[#29241d] sm:text-sm"
      >
        {children}
      </select>
    </label>
  );
}

export default function ServiceDirectory({
  facilities,
  serviceType,
  emptyTitle,
  emptyText,
  prioritisedService,
  directoryMode = false,
}: ServiceDirectoryProps) {
  const [urlState, updateUrl] = useDirectoryUrl();
  const filters: FilterState = urlState;
  const sort = urlState.sort || "recommended";
  const searchQuery = urlState.q;
  const viewMode = urlState.view === "map" ? "map" : "list";
  const setSort = (value: string) => updateUrl({ sort: value });
  const setSearchQuery = (value: string) => updateUrl({ q: value }, true);
  const setViewMode = (value: "list" | "map") => updateUrl({ view: value });
  const [selectedMapSlug, setSelectedMapSlug] = useState<string>();
  const [mapAreaSlugs, setMapAreaSlugs] = useState<string[]>();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const savedSnapshot = useSyncExternalStore(
    subscribeToSavedVenues,
    getSavedVenueSnapshot,
    () => "[]",
  );
  const savedSlugs = useMemo(
    () => parseSavedVenueSlugs(savedSnapshot),
    [savedSnapshot],
  );
  const uniqueFacilities = useMemo(
    () => dedupeFacilities(facilities),
    [facilities],
  );

  const areaOptions = uniqueValues(
    uniqueFacilities.map((facility) => facility.areaGroup || facility.location),
  );
  const serviceOptions = uniqueValues(
    uniqueFacilities.flatMap((facility) =>
      (facility.services || []).map(normaliseDirectoryService),
    ),
  );
  const venueTypeOptions = uniqueValues(
    uniqueFacilities.map((facility) => facility.venueType),
  );
  const accessTypeOptions = uniqueValues(
    uniqueFacilities.map((facility) => facility.accessType),
  );
  const priceBandOptions = uniqueValues(
    uniqueFacilities.map((facility) => sessionPriceBand(facility)),
  );
  const privateOptions = uniqueValues(
    uniqueFacilities.map((facility) =>
      normaliseSessionFormat(facility.privateOrShared),
    ),
  );
  const experienceOptions = uniqueValues(
    uniqueFacilities.flatMap(guidanceOptions),
  );
  const searchValue = searchQuery.trim();
  const distanceBySlug = useMemo(() => {
    if (!userLocation) return {};
    return Object.fromEntries(
      uniqueFacilities
        .filter(
          (facility) =>
            facility.latitude !== undefined && facility.longitude !== undefined,
        )
        .map((facility) => [
          facility.slug,
          distanceInKm(userLocation, {
            latitude: facility.latitude as number,
            longitude: facility.longitude as number,
          }),
        ]),
    );
  }, [uniqueFacilities, userLocation]);

  const filteredFacilities = useMemo(() => {
    const result = uniqueFacilities.filter((facility) => {
      const area = facility.areaGroup || facility.location || "";
      const experiences = guidanceOptions(facility);
      const priceBand = sessionPriceBand(facility);
      const facilityServices = (facility.services || []).map(
        normaliseDirectoryService,
      );

      return (
        matchesVenueSearch(facility, searchValue) &&
        (!mapAreaSlugs || mapAreaSlugs.includes(facility.slug)) &&
        (!filters.area || area === filters.area) &&
        (!filters.service ||
          facilityServices.includes(filters.service) ||
          (filters.service === "Sauna" &&
            facilityServices.includes("Infrared Sauna"))) &&
        (!filters.venueType || facility.venueType === filters.venueType) &&
        (!filters.accessType || facility.accessType === filters.accessType) &&
        (!filters.priceBand || priceBand === filters.priceBand) &&
        (!filters.premiumLevel ||
          facility.premiumLevel === filters.premiumLevel) &&
        (!filters.experienceType ||
          experiences.includes(filters.experienceType)) &&
        (!filters.privateOrShared ||
          normaliseSessionFormat(facility.privateOrShared) ===
            normaliseSessionFormat(filters.privateOrShared))
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "nearest" && userLocation)
        return (
          (distanceBySlug[a.slug] ?? Number.POSITIVE_INFINITY) -
          (distanceBySlug[b.slug] ?? Number.POSITIVE_INFINITY)
        );
      if (searchValue && sort === "recommended") {
        return (
          rankVenueSearch(b, searchValue) - rankVenueSearch(a, searchValue) ||
          (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0)
        );
      }
      if (sort === "price-low")
        return venuePrice(a).comparable - venuePrice(b).comparable;
      if (sort === "premium")
        return (
          premiumRank(b.premiumLevel || b.priceRange) -
          premiumRank(a.premiumLevel || a.priceRange)
        );
      if (sort === "recently-checked")
        return checkedTime(b.lastCheckedDate) - checkedTime(a.lastCheckedDate);
      return (
        (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0)
      );
    });
  }, [
    uniqueFacilities,
    filters,
    sort,
    searchValue,
    mapAreaSlugs,
    userLocation,
    distanceBySlug,
  ]);

  function updateFilter(key: keyof FilterState, value: string) {
    updateUrl({ [key]: value });
    setMapAreaSlugs(undefined);
    trackEvent(value ? "filter_applied" : "filter_cleared", {
      filter_name: key,
      filter_value: value || "cleared",
      service_type: serviceType,
      page_path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  function clearFilters() {
    updateUrl({ ...initialFilters, q: "", sort: "", view: "" });
    setMapAreaSlugs(undefined);
    trackEvent("filter_cleared", {
      filter_name: "all",
      service_type: serviceType,
      page_path:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  function updateSearch(value: string) {
    setSearchQuery(value);
    setMapAreaSlugs(undefined);
    if (value.length === 1 || value.length % 4 === 0) {
      trackEvent("venue_search_used", {
        search_length: value.length,
        service_type: serviceType,
        page_path:
          typeof window !== "undefined" ? window.location.pathname : undefined,
      });
    }
  }

  function setNearbyLocation(
    location: { latitude: number; longitude: number },
    label: string,
  ) {
    setUserLocation(location);
    setSort("nearest");
    setViewMode("map");
    setMapAreaSlugs(undefined);
    setLocationStatus(label);
    trackEvent("location_search_used", {
      location_type: label === "Current location" ? "device" : "postcode",
      service_type: serviceType,
      page_path: window.location.pathname,
    });
  }

  async function findPostcode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = postcode.trim();
    if (!query) {
      setLocationStatus("Enter a UK postcode first.");
      return;
    }

    setLocationStatus("Finding nearby venues…");
    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      if (!response.ok || !data.result) throw new Error("Postcode not found");
      setNearbyLocation(
        { latitude: data.result.latitude, longitude: data.result.longitude },
        data.result.postcode,
      );
    } catch {
      setLocationStatus(
        "We could not find that postcode. Check it and try again.",
      );
      trackEvent("location_search_failed", {
        location_type: "postcode",
        service_type: serviceType,
        page_path: window.location.pathname,
      });
    }
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not available in this browser.");
      return;
    }
    setLocationStatus("Requesting your location…");
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setNearbyLocation(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          "Current location",
        ),
      () => {
        setLocationStatus(
          "Location permission was not granted. You can use a postcode instead.",
        );
        trackEvent("location_search_failed", {
          location_type: "device",
          service_type: serviceType,
          page_path: window.location.pathname,
        });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }

  function clearNearbyLocation() {
    setUserLocation(undefined);
    setLocationStatus("");
    setPostcode("");
    if (sort === "nearest") setSort("recommended");
  }

  function updateSort(value: string) {
    setSort(value);
    trackEvent("directory_sort_changed", {
      sort_order: value,
      result_count: filteredFacilities.length,
      service_type: serviceType,
      page_path: window.location.pathname,
    });
  }

  function updateViewMode(value: "list" | "map") {
    setViewMode(value);
    trackEvent("directory_view_changed", {
      view_mode: value,
      result_count: filteredFacilities.length,
      service_type: serviceType,
      page_path: window.location.pathname,
    });
  }

  function selectMapVenue(slug: string) {
    setSelectedMapSlug(slug);
    trackEvent("map_venue_selected", {
      facility_slug: slug,
      result_count: filteredFacilities.length,
      service_type: serviceType,
      page_path: window.location.pathname,
    });
  }

  function searchMapArea(slugs?: string[]) {
    setMapAreaSlugs(slugs);
    trackEvent("map_area_changed", {
      action: slugs ? "search" : "clear",
      result_count: slugs?.length ?? uniqueFacilities.length,
      service_type: serviceType,
      page_path: window.location.pathname,
    });
  }

  function trackComparisonCta() {
    trackEvent("comparison_cta_click", {
      saved_count: savedSlugs.length,
      comparison_size: Math.min(savedSlugs.length, 4),
      source: "directory",
      page_path: window.location.pathname,
    });
  }

  const activeFilters = Object.keys(initialFilters).filter(
    (key) => filters[key as keyof FilterState],
  );
  const hasActiveSearch = searchQuery.trim().length > 0;

  if (uniqueFacilities.length === 0) {
    return (
      <div className="bg-[#fbf8f1] p-6 sm:p-8">
        <h3 className="mb-2 text-xl font-medium sm:text-2xl">{emptyTitle}</h3>
        <p className="text-sm leading-6 text-[#5f574c]">{emptyText}</p>
      </div>
    );
  }

  const filterControls = (
    <>
      <FilterSelect
        label="Area"
        value={filters.area}
        onChange={(value) => updateFilter("area", value)}
      >
        <option value="">Any area</option>
        {areaOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </FilterSelect>
      {directoryMode ? (
        <>
          <FilterSelect
            label="Service"
            value={filters.service}
            onChange={(value) => updateFilter("service", value)}
          >
            <option value="">Any service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            label="Venue type"
            value={filters.venueType}
            onChange={(value) => updateFilter("venueType", value)}
          >
            <option value="">Any type</option>
            {venueTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            label="Access"
            value={filters.accessType}
            onChange={(value) => updateFilter("accessType", value)}
          >
            <option value="">Any access</option>
            {accessTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            label="Session price"
            value={filters.priceBand}
            onChange={(value) => updateFilter("priceBand", value)}
          >
            <option value="">Any session price</option>
            {priceBandOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
        </>
      ) : null}
      <FilterSelect
        label="Session format"
        value={filters.privateOrShared}
        onChange={(value) => updateFilter("privateOrShared", value)}
      >
        <option value="">Any format</option>
        {privateOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </FilterSelect>
      {!directoryMode ? (
        <>
          <FilterSelect
            label="Guidance"
            value={filters.experienceType}
            onChange={(value) => updateFilter("experienceType", value)}
          >
            <option value="">Any experience</option>
            {experienceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            label="Access"
            value={filters.accessType}
            onChange={(value) => updateFilter("accessType", value)}
          >
            <option value="">Any access</option>
            {accessTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </FilterSelect>
        </>
      ) : null}
    </>
  );

  return (
    <div className="space-y-5 pb-20 md:pb-0">
      <section
        id={`directory-filters-${serviceType}`}
        aria-label="Find venues"
        className="scroll-mt-24 border-y border-[#d8cebf] py-5"
      >
        <div
          className={`grid items-end gap-4 ${directoryMode ? "sm:grid-cols-[2fr_1fr_1fr_auto]" : "sm:grid-cols-[2fr_1fr_auto]"}`}
        >
          <label className="grid gap-2 text-sm font-medium">
            Search venues
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Venue, neighbourhood or service"
              autoComplete="off"
              className="min-h-12 min-w-0 rounded-lg border border-[#b9ab97] bg-[#fbf8f1] px-4 text-base font-normal"
            />
          </label>
          <FilterSelect
            label="Area"
            value={filters.area}
            onChange={(value) => updateFilter("area", value)}
          >
            <option value="">Any area</option>
            {areaOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </FilterSelect>
          {directoryMode ? (
            <FilterSelect
              label="Service"
              value={filters.service}
              onChange={(value) => updateFilter("service", value)}
            >
              <option value="">Any service</option>
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </FilterSelect>
          ) : null}
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="min-h-12 rounded-lg border border-[#b9ab97] px-4 text-sm font-medium"
          >
            More filters
            {activeFilters.length ? ` (${activeFilters.length})` : ""}
          </button>
        </div>
        {directoryMode ? (
          <details className="mt-3">
            <summary className="w-fit cursor-pointer py-2 text-sm underline underline-offset-4">
              Find nearby · postcode or current location
            </summary>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <form onSubmit={findPostcode} className="flex min-w-0 gap-2">
                <label className="sr-only" htmlFor={`postcode-${serviceType}`}>
                  UK postcode
                </label>
                <input
                  id={`postcode-${serviceType}`}
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                  placeholder="UK postcode"
                  autoComplete="postal-code"
                  className="min-h-11 w-36 min-w-0 rounded-lg border border-[#b9ab97] bg-[#fbf8f1] px-3 text-base"
                />
                <button
                  type="submit"
                  className="min-h-11 rounded-lg bg-[#29241d] px-4 text-sm text-[#fbf8f1]"
                >
                  Find
                </button>
              </form>
              <button
                type="button"
                onClick={useCurrentLocation}
                className="min-h-11 px-2 text-sm underline"
              >
                Use my location
              </button>
              {userLocation ? (
                <button
                  type="button"
                  onClick={clearNearbyLocation}
                  className="min-h-11 text-sm underline"
                >
                  Reset location
                </button>
              ) : null}
            </div>
            <p className="mt-2 text-xs leading-5 text-[#5f574c]">
              Device coordinates stay in your browser. Postcodes are sent to
              postcodes.io.
            </p>
          </details>
        ) : null}
        {locationStatus ? (
          <p role="status" className="mt-2 text-sm">
            {locationStatus}
          </p>
        ) : null}
        {activeFilters.length || hasActiveSearch || mapAreaSlugs ? (
          <div
            className="mt-3 flex flex-wrap gap-2"
            aria-label="Selected filters"
          >
            {hasActiveSearch ? (
              <button
                type="button"
                onClick={() => updateSearch("")}
                className="min-h-11 rounded-full border border-[#b9ab97] px-3 text-sm"
                aria-label={`Remove search ${searchQuery}`}
              >
                Search: {searchQuery} ×
              </button>
            ) : null}
            {activeFilters.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => updateFilter(key as keyof FilterState, "")}
                className="min-h-11 rounded-full border border-[#b9ab97] px-3 text-sm"
                aria-label={`Remove ${key} filter: ${filters[key as keyof FilterState]}`}
              >
                {filters[key as keyof FilterState]} ×
              </button>
            ))}
            {mapAreaSlugs ? (
              <button
                type="button"
                onClick={() => searchMapArea(undefined)}
                className="min-h-11 rounded-full border border-[#b9ab97] px-3 text-sm"
              >
                Map area ×
              </button>
            ) : null}
            <button
              type="button"
              onClick={clearFilters}
              className="min-h-11 px-3 text-sm underline"
            >
              Clear all
            </button>
          </div>
        ) : null}
      </section>
      <OverlayDialog
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter venues"
      >
        <div className="grid gap-5 sm:grid-cols-2">{filterControls}</div>
        <div className="sticky bottom-0 mt-6 flex gap-3 bg-[#fbf8f1] py-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="min-h-12 flex-1 rounded-full bg-[#29241d] px-5 text-sm font-medium text-[#fbf8f1]"
          >
            Show {filteredFacilities.length} venues
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-12 px-4 text-sm underline"
          >
            Reset
          </button>
        </div>
      </OverlayDialog>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-sm font-medium">
          {filteredFacilities.length}{" "}
          {filteredFacilities.length === 1 ? "venue" : "venues"}
        </p>
        <label className="flex items-center gap-2 text-sm">
          Sort
          <select
            value={sort}
            onChange={(event) => updateSort(event.target.value)}
            className="min-h-11 max-w-52 rounded-lg border border-[#b9ab97] bg-[#fbf8f1] px-2"
          >
            <option value="recommended">Recommended</option>
            {userLocation ? (
              <option value="nearest">Nearest first</option>
            ) : null}
            <option value="price-low">Confirmed session price</option>
            <option value="premium">Premium/luxury</option>
            <option value="recently-checked">Recently checked</option>
          </select>
        </label>
      </div>

      {filteredFacilities.length > 0 ? (
        <section>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="sr-only">Find your next venue.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.length > 0 || hasActiveSearch ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="hidden min-h-11 px-2 text-sm text-[#29241d] underline underline-offset-4 md:inline-flex md:items-center"
                >
                  Clear filters
                </button>
              ) : null}
              {directoryMode ? (
                <>
                  <div
                    className="inline-flex rounded-full border border-[#b9ab97] bg-[#fbf8f1] p-1"
                    aria-label="Directory view"
                  >
                    <button
                      type="button"
                      onClick={() => updateViewMode("list")}
                      aria-pressed={viewMode === "list"}
                      className={`min-h-10 rounded-full px-4 text-sm font-medium transition ${viewMode === "list" ? "bg-[#29241d] text-[#fbf8f1]" : "text-[#5f574c]"}`}
                    >
                      List
                    </button>
                    <button
                      type="button"
                      onClick={() => updateViewMode("map")}
                      aria-pressed={viewMode === "map"}
                      className={`min-h-10 rounded-full px-4 text-sm font-medium transition ${viewMode === "map" ? "bg-[#29241d] text-[#fbf8f1]" : "text-[#5f574c]"}`}
                    >
                      Map
                    </button>
                  </div>
                  <Link
                    onClick={trackComparisonCta}
                    href={
                      savedSlugs.length >= 2
                        ? `/compare?venues=${savedSlugs.slice(0, 4).join(",")}`
                        : "/shortlist"
                    }
                    className="inline-flex min-h-12 items-center rounded-full border border-[#b9ab97] bg-[#fbf8f1] px-5 text-sm font-medium text-[#29241d] transition hover:bg-white"
                  >
                    {savedSlugs.length >= 2
                      ? `Compare ${Math.min(savedSlugs.length, 4)}`
                      : `Saved${savedSlugs.length ? ` · ${savedSlugs.length}` : ""}`}
                  </Link>
                </>
              ) : null}
            </div>
          </div>
          {directoryMode && viewMode === "map" ? (
            <VenueMap
              facilities={filteredFacilities}
              selectedSlug={selectedMapSlug}
              userLocation={userLocation}
              distanceBySlug={distanceBySlug}
              mapAreaActive={Boolean(mapAreaSlugs)}
              onSelect={selectMapVenue}
              onSearchArea={searchMapArea}
            />
          ) : (
            <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFacilities.map((facility) => (
                <FacilityCard
                  key={facility.slug}
                  facility={facility}
                  source={serviceType}
                  prioritisedService={prioritisedService}
                  showSaveButton
                  distanceKm={distanceBySlug[facility.slug]}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
          <h3 className="mb-3 text-2xl font-medium tracking-[-0.03em]">
            No matching spaces found.
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
            Try clearing one filter, searching a nearby neighbourhood, or
            browsing all venues.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]"
            >
              Clear filters
            </button>
            <Link
              href="/explore"
              className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]"
            >
              Explore all venues
            </Link>
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d8cebf] bg-[#fbf8f1]/95 px-4 py-3 shadow-[0_-16px_38px_rgba(41,36,29,0.12)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#29241d] px-4 text-sm font-medium text-[#fbf8f1]"
          >
            Filters · {filteredFacilities.length}{" "}
            {filteredFacilities.length === 1 ? "venue" : "venues"}
          </button>
          {directoryMode ? (
            <button
              type="button"
              onClick={() =>
                updateViewMode(viewMode === "list" ? "map" : "list")
              }
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b9ab97] px-4 text-sm font-medium text-[#29241d]"
            >
              {viewMode === "list" ? "Map" : "List"}
            </button>
          ) : null}
          {savedSlugs.length > 0 ? (
            <Link
              onClick={trackComparisonCta}
              href={
                savedSlugs.length >= 2
                  ? `/compare?venues=${savedSlugs.slice(0, 4).join(",")}`
                  : "/shortlist"
              }
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b9ab97] px-4 text-sm font-medium text-[#29241d]"
            >
              {savedSlugs.length >= 2 ? "Compare" : "Saved"} ·{" "}
              {Math.min(savedSlugs.length, 4)}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
