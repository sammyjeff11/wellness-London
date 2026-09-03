"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import FacilityCard, { type FacilityCardFacility } from "@/components/FacilityCard";
import { trackEvent } from "@/lib/analytics";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { matchesVenueSearch, rankVenueSearch } from "@/lib/search";
import { isUsefulValue } from "@/lib/useful-values";
import { toDirectoryServiceLabel } from "@/lib/discovery-labels";
import { distanceInKm } from "@/lib/geo";
import { getSavedVenueSnapshot, parseSavedVenueSlugs, subscribeToSavedVenues } from "@/lib/saved-venues";

const VenueMap = dynamic(() => import("@/components/VenueMap"), {
  ssr: false,
  loading: () => <div className="min-h-[32rem] animate-pulse rounded-[1.35rem] border border-[#b9ab97] bg-[#ded4c5] lg:min-h-[42rem]" aria-label="Loading venue map" />,
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

function getPriceBand(value?: string) {
  if (!value) return "";
  const amount = value.replace(/,/g, "").match(/£\s*(\d+(?:\.\d+)?)/)?.[1];
  if (amount) {
    const number = Number(amount);
    if (number <= 25) return "£";
    if (number <= 50) return "££";
    if (number <= 100) return "£££";
    return "££££";
  }
  return value.match(/£{1,4}/)?.[0] || "";
}

function uniqueValues(values: (string | undefined)[]) {
  return Array.from(new Set(values.filter((value): value is string => isUsefulValue(value)))).sort();
}

function parsePrice(value?: string) {
  const number = value?.replace(/,/g, "").match(/\d+/)?.[0];
  if (number) return Number(number);
  const band = value?.match(/£{1,4}/)?.[0];
  return band ? band.length * 25 : Number.POSITIVE_INFINITY;
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

function FilterSelect({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-[#5f574c]">
      {label}
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 rounded-none border-0 border-b border-[#bfb3a3] bg-transparent px-0 py-3 text-base normal-case tracking-normal text-[#29241d] outline-none transition focus:border-[#29241d] sm:text-sm"
      >
        {children}
      </select>
    </label>
  );
}

function MobileFilterPill({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <label className="relative shrink-0">
      <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm font-medium text-[#29241d]">
        {value || label}
      </span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 max-w-[11rem] appearance-none rounded-full border border-[#d8cebf] bg-[#fbf8f1] pl-4 pr-9 text-sm text-transparent outline-none"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#70695d]">⌄</span>
    </label>
  );
}

export default function ServiceDirectory({ facilities, serviceType, emptyTitle, emptyText, prioritisedService, directoryMode = false }: ServiceDirectoryProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedMapSlug, setSelectedMapSlug] = useState<string>();
  const [mapAreaSlugs, setMapAreaSlugs] = useState<string[]>();
  const [postcode, setPostcode] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>();
  const savedSnapshot = useSyncExternalStore(subscribeToSavedVenues, getSavedVenueSnapshot, () => "[]");
  const savedSlugs = useMemo(() => parseSavedVenueSlugs(savedSnapshot), [savedSnapshot]);
  const uniqueFacilities = useMemo(() => dedupeFacilities(facilities), [facilities]);

  const areaOptions = uniqueValues(uniqueFacilities.map((facility) => facility.areaGroup || facility.location));
  const serviceOptions = uniqueValues(uniqueFacilities.flatMap((facility) => (facility.services || []).map(normaliseDirectoryService)));
  const venueTypeOptions = uniqueValues(uniqueFacilities.map((facility) => facility.venueType));
  const accessTypeOptions = uniqueValues(uniqueFacilities.map((facility) => facility.accessType));
  const priceBandOptions = uniqueValues(uniqueFacilities.map((facility) => getPriceBand(facility.priceFrom || facility.priceRange)));
  const premiumOptions = uniqueValues(uniqueFacilities.map((facility) => facility.premiumLevel));
  const experienceOptions = uniqueValues(uniqueFacilities.flatMap((facility) => facility.experienceType || []));
  const privateOptions = uniqueValues(uniqueFacilities.map((facility) => facility.privateOrShared));
  const searchValue = searchQuery.trim();
  const distanceBySlug = useMemo(() => {
    if (!userLocation) return {};
    return Object.fromEntries(
      uniqueFacilities
        .filter((facility) => facility.latitude !== undefined && facility.longitude !== undefined)
        .map((facility) => [facility.slug, distanceInKm(userLocation, { latitude: facility.latitude as number, longitude: facility.longitude as number })]),
    );
  }, [uniqueFacilities, userLocation]);

  const filteredFacilities = useMemo(() => {
    const result = uniqueFacilities.filter((facility) => {
      const area = facility.areaGroup || facility.location || "";
      const experiences = facility.experienceType || [];
      const priceBand = getPriceBand(facility.priceFrom || facility.priceRange);
      const facilityServices = (facility.services || []).map(normaliseDirectoryService);

      return (
        matchesVenueSearch(facility, searchValue) &&
        (!mapAreaSlugs || mapAreaSlugs.includes(facility.slug)) &&
        (!filters.area || area === filters.area) &&
        (!filters.service || facilityServices.includes(filters.service)) &&
        (!filters.venueType || facility.venueType === filters.venueType) &&
        (!filters.accessType || facility.accessType === filters.accessType) &&
        (!filters.priceBand || priceBand === filters.priceBand) &&
        (!filters.premiumLevel || facility.premiumLevel === filters.premiumLevel) &&
        (!filters.experienceType || experiences.includes(filters.experienceType)) &&
        (!filters.privateOrShared || facility.privateOrShared === filters.privateOrShared)
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "nearest" && userLocation) return (distanceBySlug[a.slug] ?? Number.POSITIVE_INFINITY) - (distanceBySlug[b.slug] ?? Number.POSITIVE_INFINITY);
      if (searchValue && sort === "recommended") {
        return rankVenueSearch(b, searchValue) - rankVenueSearch(a, searchValue) || (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0);
      }
      if (sort === "price-low") return parsePrice(a.priceFrom || a.priceRange) - parsePrice(b.priceFrom || b.priceRange);
      if (sort === "premium") return premiumRank(b.premiumLevel || b.priceRange) - premiumRank(a.premiumLevel || a.priceRange);
      if (sort === "recently-checked") return checkedTime(b.lastCheckedDate) - checkedTime(a.lastCheckedDate);
      return (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0);
    });
  }, [uniqueFacilities, filters, sort, searchValue, mapAreaSlugs, userLocation, distanceBySlug]);

  function updateFilter(key: keyof FilterState, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setMapAreaSlugs(undefined);
    trackEvent(value ? "filter_applied" : "filter_cleared", {
      filter_name: key,
      filter_value: value || "cleared",
      service_type: serviceType,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  function clearFilters() {
    setFilters(initialFilters);
    setSearchQuery("");
    setMapAreaSlugs(undefined);
    trackEvent("filter_cleared", {
      filter_name: "all",
      service_type: serviceType,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  function updateSearch(value: string) {
    setSearchQuery(value);
    setMapAreaSlugs(undefined);
    if (value.length === 1 || value.length % 4 === 0) {
      trackEvent("venue_search_used", {
        search_length: value.length,
        service_type: serviceType,
        page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
    }
  }

  function setNearbyLocation(location: { latitude: number; longitude: number }, label: string) {
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
      const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(query)}`);
      const data = await response.json();
      if (!response.ok || !data.result) throw new Error("Postcode not found");
      setNearbyLocation({ latitude: data.result.latitude, longitude: data.result.longitude }, data.result.postcode);
    } catch {
      setLocationStatus("We could not find that postcode. Check it and try again.");
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
      (position) => setNearbyLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }, "Current location"),
      () => {
        setLocationStatus("Location permission was not granted. You can use a postcode instead.");
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

  const activeFilters = Object.entries(filters).filter(([, value]) => value);
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
      <FilterSelect label="Area" value={filters.area} onChange={(value) => updateFilter("area", value)}>
        <option value="">Any area</option>
        {areaOptions.map((option) => <option key={option} value={option}>{option}</option>)}
      </FilterSelect>
      {directoryMode ? (
        <>
          <FilterSelect label="Service" value={filters.service} onChange={(value) => updateFilter("service", value)}>
            <option value="">Any service</option>
            {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
          <FilterSelect label="Venue type" value={filters.venueType} onChange={(value) => updateFilter("venueType", value)}>
            <option value="">Any type</option>
            {venueTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
          <FilterSelect label="Access" value={filters.accessType} onChange={(value) => updateFilter("accessType", value)}>
            <option value="">Any access</option>
            {accessTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
          <FilterSelect label="Price" value={filters.priceBand} onChange={(value) => updateFilter("priceBand", value)}>
            <option value="">Any price</option>
            {priceBandOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
        </>
      ) : null}
      {!directoryMode ? (
        <>
          <FilterSelect label="Premium" value={filters.premiumLevel} onChange={(value) => updateFilter("premiumLevel", value)}>
            <option value="">Any level</option>
            {premiumOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
          <FilterSelect label="Experience" value={filters.experienceType} onChange={(value) => updateFilter("experienceType", value)}>
            <option value="">Any type</option>
            {experienceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
          <FilterSelect label="Access" value={filters.privateOrShared} onChange={(value) => updateFilter("privateOrShared", value)}>
            <option value="">Any access</option>
            {privateOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
        </>
      ) : null}
      <FilterSelect label="Sort" value={sort} onChange={updateSort}>
        <option value="recommended">Recommended</option>
        {userLocation ? <option value="nearest">Nearest first</option> : null}
        <option value="price-low">Price low to high</option>
        <option value="premium">Premium/luxury</option>
        <option value="recently-checked">Recently checked</option>
      </FilterSelect>
    </>
  );

  return (
    <div className="space-y-8 pb-20 md:space-y-12 md:pb-0">
      <section id={`directory-filters-${serviceType}`} className="scroll-mt-24 rounded-[1.35rem] border border-[#b9ab97]/80 bg-[#ded4c5] p-4 shadow-[0_18px_46px_rgba(41,36,29,0.07)] sm:p-6 md:sticky md:top-[5.75rem] md:z-30 md:p-8">
        <div className="surface-paper-strong rounded-[1.2rem] px-4 py-3 sm:px-5">
          <label htmlFor={`venue-search-${serviceType}`} className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-[#6f6048]">
            Search venues
          </label>
          <div className="flex items-center gap-3">
            <input
              id={`venue-search-${serviceType}`}
              type="search"
              value={searchQuery}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Try a venue, area or service"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-1 text-base text-[#29241d] outline-none placeholder:text-[#8d7d67]"
            />
            {hasActiveSearch ? (
              <button type="button" onClick={() => updateSearch("")} className="relative z-30 text-sm text-[#29241d] underline underline-offset-4">
                Clear
              </button>
            ) : null}
          </div>
          <p className="mt-2 text-xs leading-5 text-[#70695d]">{filteredFacilities.length} of {uniqueFacilities.length} spaces shown</p>
        </div>

        <div className="mt-4 md:hidden">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm text-[#5f574c]">{filteredFacilities.length} spaces found</p>
            {activeFilters.length > 0 || hasActiveSearch ? (
              <button type="button" onClick={clearFilters} className="relative z-30 text-sm text-[#29241d] underline underline-offset-4">
                Clear all
              </button>
            ) : null}
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            <MobileFilterPill label="Area" value={filters.area} onChange={(value) => updateFilter("area", value)}>
              <option value="">Area</option>
              {areaOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </MobileFilterPill>
            {directoryMode ? (
              <>
                <MobileFilterPill label="Service" value={filters.service} onChange={(value) => updateFilter("service", value)}>
                  <option value="">Service</option>
                  {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </MobileFilterPill>
                <MobileFilterPill label="Venue type" value={filters.venueType} onChange={(value) => updateFilter("venueType", value)}>
                  <option value="">Venue type</option>
                  {venueTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </MobileFilterPill>
                <MobileFilterPill label="Access" value={filters.accessType} onChange={(value) => updateFilter("accessType", value)}>
                  <option value="">Access</option>
                  {accessTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </MobileFilterPill>
                <MobileFilterPill label="Price" value={filters.priceBand} onChange={(value) => updateFilter("priceBand", value)}>
                  <option value="">Price</option>
                  {priceBandOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </MobileFilterPill>
              </>
            ) : (
              <>
                <MobileFilterPill label="Type" value={filters.experienceType} onChange={(value) => updateFilter("experienceType", value)}>
                  <option value="">Type</option>
                  {experienceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </MobileFilterPill>
                <MobileFilterPill label="Access" value={filters.privateOrShared} onChange={(value) => updateFilter("privateOrShared", value)}>
                  <option value="">Access</option>
                  {privateOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </MobileFilterPill>
              </>
            )}
            <MobileFilterPill label="Sort" value={sort === "recommended" ? "" : sort.replace("price-low", "Price").replace("premium", "Premium").replace("recently-checked", "Recent")} onChange={updateSort}>
              <option value="recommended">Sort</option>
              <option value="price-low">Price</option>
              <option value="premium">Premium</option>
              <option value="recently-checked">Recent</option>
            </MobileFilterPill>
          </div>
        </div>

        {directoryMode ? (
          <div className="mt-4 rounded-[1rem] border border-[#c8baa6] bg-[#eee7dc] p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-medium text-[#29241d]">Find what is close to you</p>
                <p className="mt-1 text-xs leading-5 text-[#70695d]">Your location is only used on this device.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <form onSubmit={findPostcode} className="flex min-w-0 rounded-full border border-[#b9ab97] bg-[#fbf8f1] p-1">
                  <label htmlFor={`postcode-${serviceType}`} className="sr-only">UK postcode</label>
                  <input id={`postcode-${serviceType}`} value={postcode} onChange={(event) => setPostcode(event.target.value)} placeholder="UK postcode" autoComplete="postal-code" className="min-w-0 flex-1 bg-transparent px-3 text-sm uppercase text-[#29241d] outline-none placeholder:normal-case placeholder:text-[#8d7d67] sm:w-36" />
                  <button type="submit" className="min-h-10 rounded-full bg-[#29241d] px-4 text-sm font-medium text-[#fbf8f1]">Find</button>
                </form>
                <button type="button" onClick={useCurrentLocation} className="min-h-11 rounded-full border border-[#b9ab97] bg-[#fbf8f1] px-4 text-sm font-medium text-[#29241d] transition hover:bg-white">Use my location</button>
                {userLocation ? <button type="button" onClick={clearNearbyLocation} className="min-h-11 px-2 text-sm underline underline-offset-4">Reset</button> : null}
              </div>
            </div>
            {locationStatus ? <p className="mt-2 text-xs font-medium text-[#5f574c]" role="status">{locationStatus}{userLocation ? " · sorted nearest first" : ""}</p> : null}
          </div>
        ) : null}

        <div className={`mt-6 hidden grid-cols-2 gap-5 md:grid ${directoryMode ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
          {filterControls}
        </div>
      </section>

      {filteredFacilities.length > 0 ? (
        <section>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-eyebrow mb-2">Directory</p>
              <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-4xl">
                Compare venues.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {activeFilters.length > 0 || hasActiveSearch ? <button type="button" onClick={clearFilters} className="hidden min-h-11 px-2 text-sm text-[#29241d] underline underline-offset-4 md:inline-flex md:items-center">Clear filters</button> : null}
              {directoryMode ? (
                <>
                  <div className="inline-flex rounded-full border border-[#b9ab97] bg-[#fbf8f1] p-1" aria-label="Directory view">
                    <button type="button" onClick={() => updateViewMode("list")} aria-pressed={viewMode === "list"} className={`min-h-10 rounded-full px-4 text-sm font-medium transition ${viewMode === "list" ? "bg-[#29241d] text-[#fbf8f1]" : "text-[#5f574c]"}`}>List</button>
                    <button type="button" onClick={() => updateViewMode("map")} aria-pressed={viewMode === "map"} className={`min-h-10 rounded-full px-4 text-sm font-medium transition ${viewMode === "map" ? "bg-[#29241d] text-[#fbf8f1]" : "text-[#5f574c]"}`}>Map</button>
                  </div>
                  <Link onClick={trackComparisonCta} href={savedSlugs.length >= 2 ? `/compare?venues=${savedSlugs.slice(0, 4).join(",")}` : "/shortlist"} className="inline-flex min-h-12 items-center rounded-full border border-[#b9ab97] bg-[#fbf8f1] px-5 text-sm font-medium text-[#29241d] transition hover:bg-white">
                    {savedSlugs.length >= 2 ? `Compare ${Math.min(savedSlugs.length, 4)}` : `Saved${savedSlugs.length ? ` · ${savedSlugs.length}` : ""}`}
                  </Link>
                </>
              ) : null}
            </div>
          </div>
          {directoryMode && viewMode === "map" ? (
            <VenueMap facilities={filteredFacilities} selectedSlug={selectedMapSlug} userLocation={userLocation} distanceBySlug={distanceBySlug} mapAreaActive={Boolean(mapAreaSlugs)} onSelect={selectMapVenue} onSearchArea={searchMapArea} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source={serviceType} prioritisedService={prioritisedService} showSaveButton={directoryMode} distanceKm={distanceBySlug[facility.slug]} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
          <h3 className="mb-3 text-2xl font-medium tracking-[-0.03em]">No matching spaces found.</h3>
          <p className="max-w-2xl text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
            Try clearing one filter, searching a nearby neighbourhood, or browsing all venues.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={clearFilters} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
              Clear filters
            </button>
            <Link href="/explore" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
              Explore all venues
            </Link>
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d8cebf] bg-[#fbf8f1]/95 px-4 py-3 shadow-[0_-16px_38px_rgba(41,36,29,0.12)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <a href={`#directory-filters-${serviceType}`} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#29241d] px-4 text-sm font-medium text-[#fbf8f1]">
            Filters · {filteredFacilities.length} {filteredFacilities.length === 1 ? "venue" : "venues"}
          </a>
          {directoryMode ? <button type="button" onClick={() => updateViewMode(viewMode === "list" ? "map" : "list")} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b9ab97] px-4 text-sm font-medium text-[#29241d]">{viewMode === "list" ? "Map" : "List"}</button> : null}
          {directoryMode && savedSlugs.length > 0 ? <Link onClick={trackComparisonCta} href={savedSlugs.length >= 2 ? `/compare?venues=${savedSlugs.slice(0, 4).join(",")}` : "/shortlist"} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b9ab97] px-4 text-sm font-medium text-[#29241d]">{savedSlugs.length >= 2 ? "Compare" : "Saved"} · {Math.min(savedSlugs.length, 4)}</Link> : null}
        </div>
      </div>
    </div>
  );
}
