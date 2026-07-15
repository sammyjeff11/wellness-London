"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import FacilityCard, { type FacilityCardFacility } from "@/components/FacilityCard";
import { trackEvent } from "@/lib/analytics";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import {
  buildDirectorySearchParams,
  directoryFilterKeys,
  initialDirectoryFilters,
  matchesDirectoryFilters,
  parseDirectoryUrlState,
  type DirectoryFilterKey,
  type DirectoryFilterOptions,
  type DirectorySort,
  type DirectoryUrlState,
} from "@/lib/directory-filter-state";
import { matchesVenueSearch, rankVenueSearch } from "@/lib/search";

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

type ServiceDirectoryProps = {
  facilities: ServiceDirectoryFacility[];
  serviceType: string;
  emptyTitle: string;
  emptyText: string;
  prioritisedService?: string;
};

const directoryUrlEvent = "wellness-directory-url-change";

const filterLabels: Record<DirectoryFilterKey, string> = {
  area: "Area",
  premiumLevel: "Price level",
  experienceType: "Experience",
  accessType: "Access",
  privateOrShared: "Session setting",
  beginnerFriendly: "Beginner friendly",
};

function subscribeToDirectoryUrl(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(directoryUrlEvent, onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(directoryUrlEvent, onStoreChange);
  };
}

function getDirectoryUrlSnapshot() {
  return window.location.search;
}

function getServerDirectoryUrlSnapshot() {
  return "";
}

function uniqueValues(values: (string | undefined)[]) {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort();
}

function parsePrice(value?: string) {
  const number = value?.replace(/,/g, "").match(/\d+/)?.[0];
  return number ? Number(number) : Number.POSITIVE_INFINITY;
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 rounded-none border-0 border-b border-[#bfb3a3] bg-transparent px-0 py-3 text-base normal-case tracking-normal text-[#29241d] outline-none transition focus:border-[#29241d] sm:text-sm"
      >
        {children}
      </select>
    </label>
  );
}

export default function ServiceDirectory({ facilities, serviceType, emptyTitle, emptyText, prioritisedService }: ServiceDirectoryProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const uniqueFacilities = useMemo(() => dedupeFacilities(facilities), [facilities]);
  const urlSearch = useSyncExternalStore(subscribeToDirectoryUrl, getDirectoryUrlSnapshot, getServerDirectoryUrlSnapshot);
  const filterOptions = useMemo<DirectoryFilterOptions>(() => ({
    area: uniqueValues(uniqueFacilities.map((facility) => facility.areaGroup || facility.location)),
    premiumLevel: uniqueValues(uniqueFacilities.map((facility) => facility.premiumLevel)),
    experienceType: uniqueValues(uniqueFacilities.flatMap((facility) => facility.experienceType || [])),
    accessType: uniqueValues(uniqueFacilities.map((facility) => facility.accessType)),
    privateOrShared: uniqueValues(uniqueFacilities.map((facility) => facility.privateOrShared)),
    beginnerFriendly: uniqueValues(uniqueFacilities.map((facility) => facility.beginnerFriendly)),
  }), [uniqueFacilities]);
  const { filters, sort, searchQuery } = useMemo(
    () => parseDirectoryUrlState(urlSearch, filterOptions),
    [filterOptions, urlSearch],
  );
  const lastTrackedSearch = useRef("");
  const lastZeroResultState = useRef("");
  const searchValue = searchQuery.trim();

  const filteredFacilities = useMemo(() => {
    const result = uniqueFacilities.filter((facility) => {
      return matchesVenueSearch(facility, searchValue) && matchesDirectoryFilters(facility, filters);
    });

    return [...result].sort((a, b) => {
      if (searchValue && sort === "recommended") {
        return rankVenueSearch(b, searchValue) - rankVenueSearch(a, searchValue) || (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0);
      }
      if (sort === "price-low") return parsePrice(a.priceFrom || a.priceRange) - parsePrice(b.priceFrom || b.priceRange);
      if (sort === "premium") return premiumRank(b.premiumLevel || b.priceRange) - premiumRank(a.premiumLevel || a.priceRange);
      if (sort === "recently-checked") return checkedTime(b.lastCheckedDate) - checkedTime(a.lastCheckedDate);
      return (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0);
    });
  }, [uniqueFacilities, filters, sort, searchValue]);

  function updateUrlState(nextState: DirectoryUrlState, mode: "push" | "replace" = "push") {
    const params = buildDirectorySearchParams(window.location.search, nextState);
    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
    window.history[mode === "push" ? "pushState" : "replaceState"](null, "", nextUrl);
    window.dispatchEvent(new Event(directoryUrlEvent));
  }

  function countResults(nextFilters: typeof filters, nextSearchQuery = searchQuery) {
    const nextSearchValue = nextSearchQuery.trim();
    return uniqueFacilities.filter((facility) => matchesVenueSearch(facility, nextSearchValue) && matchesDirectoryFilters(facility, nextFilters)).length;
  }

  function updateFilter(key: DirectoryFilterKey, value: string) {
    const nextFilters = { ...filters, [key]: value };
    updateUrlState({ filters: nextFilters, searchQuery, sort });
    trackEvent(value ? "filter_applied" : "filter_cleared", {
      filter_name: key,
      filter_value: value || "cleared",
      service_type: serviceType,
      result_count: countResults(nextFilters),
      page_path: window.location.pathname,
    });
  }

  function clearFilters() {
    updateUrlState({ filters: initialDirectoryFilters, searchQuery: "", sort: "recommended" });
    trackEvent("filter_cleared", {
      filter_name: "all",
      service_type: serviceType,
      result_count: uniqueFacilities.length,
      page_path: window.location.pathname,
    });
  }

  function updateSearch(value: string) {
    updateUrlState({ filters, searchQuery: value.slice(0, 120), sort }, "replace");
  }

  function updateSort(value: DirectorySort) {
    updateUrlState({ filters, searchQuery, sort: value });
    trackEvent("directory_sort_changed", {
      sort_type: value,
      service_type: serviceType,
      result_count: filteredFacilities.length,
      page_path: window.location.pathname,
    });
  }

  const activeFilters = directoryFilterKeys
    .filter((key) => filters[key])
    .map((key) => ({ key, label: filterLabels[key], value: filters[key] }));
  const activeFilterState = activeFilters.map((filter) => `${filter.key}:${filter.value}`).join("|");
  const hasActiveSearch = searchQuery.trim().length > 0;

  useEffect(() => {
    if (!isFilterOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsFilterOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isFilterOpen]);

  useEffect(() => {
    if (searchValue.length < 2) {
      lastTrackedSearch.current = "";
      return;
    }

    const trackingKey = `${searchValue.toLowerCase()}|${filteredFacilities.length}`;
    if (lastTrackedSearch.current === trackingKey) return;

    const timeout = window.setTimeout(() => {
      trackEvent("venue_search_used", {
        search_length: searchValue.length,
        result_count: filteredFacilities.length,
        service_type: serviceType,
        page_path: window.location.pathname,
      });
      lastTrackedSearch.current = trackingKey;
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [filteredFacilities.length, searchValue, serviceType]);

  useEffect(() => {
    const activeState = `${searchValue}|${activeFilterState}`;
    if (filteredFacilities.length === 0 && (hasActiveSearch || activeFilters.length > 0)) {
      if (lastZeroResultState.current === activeState) return;
      trackEvent("directory_zero_results", {
        active_filter_count: activeFilters.length,
        has_search: hasActiveSearch,
        service_type: serviceType,
        page_path: window.location.pathname,
      });
      lastZeroResultState.current = activeState;
      return;
    }
    lastZeroResultState.current = "";
  }, [activeFilterState, activeFilters.length, filteredFacilities.length, hasActiveSearch, searchValue, serviceType]);

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
        {filterOptions.area.map((option) => <option key={option} value={option}>{option}</option>)}
      </FilterSelect>
      <FilterSelect label="Price level" value={filters.premiumLevel} onChange={(value) => updateFilter("premiumLevel", value)}>
        <option value="">Any level</option>
        {filterOptions.premiumLevel.map((option) => <option key={option} value={option}>{option}</option>)}
      </FilterSelect>
      <FilterSelect label="Experience" value={filters.experienceType} onChange={(value) => updateFilter("experienceType", value)}>
        <option value="">Any type</option>
        {filterOptions.experienceType.map((option) => <option key={option} value={option}>{option}</option>)}
      </FilterSelect>
      <FilterSelect label="Access" value={filters.accessType} onChange={(value) => updateFilter("accessType", value)}>
        <option value="">Any access</option>
        {filterOptions.accessType.map((option) => <option key={option} value={option}>{option}</option>)}
      </FilterSelect>
      <FilterSelect label="Session setting" value={filters.privateOrShared} onChange={(value) => updateFilter("privateOrShared", value)}>
        <option value="">Any setting</option>
        {filterOptions.privateOrShared.map((option) => <option key={option} value={option}>{option}</option>)}
      </FilterSelect>
      <FilterSelect label="Beginner friendly" value={filters.beginnerFriendly} onChange={(value) => updateFilter("beginnerFriendly", value)}>
        <option value="">Any</option>
        {filterOptions.beginnerFriendly.map((option) => <option key={option} value={option}>{option}</option>)}
      </FilterSelect>
      <FilterSelect label="Sort" value={sort} onChange={(value) => updateSort(value as DirectorySort)}>
        <option value="recommended">Recommended</option>
        <option value="price-low">Price low to high</option>
        <option value="premium">Premium/luxury</option>
        <option value="recently-checked">Recently checked</option>
      </FilterSelect>
    </>
  );

  return (
    <div className="space-y-8 md:space-y-12">
      <section className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#eee7da] p-4 sm:p-6 md:p-8">
        <label htmlFor={`venue-search-${serviceType}`} className="mb-2 block text-[11px] font-medium text-[#5f574c]">
          Search venues
        </label>
        <div className="flex min-h-14 items-center gap-3 rounded-full border border-[#bcae99] bg-[#fbf8f1] px-5 shadow-[0_8px_24px_rgba(41,36,29,0.05)] focus-within:border-[#6f6048] focus-within:ring-2 focus-within:ring-[#d8cebf]">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-none stroke-[#6f6048] stroke-[1.8]">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <input
              id={`venue-search-${serviceType}`}
              type="search"
              value={searchQuery}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Try a venue, area or treatment"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-3 text-base text-[#29241d] outline-none placeholder:text-[#8d7d67]"
            />
            {hasActiveSearch ? (
              <button type="button" onClick={() => updateSearch("")} className="relative z-30 text-sm text-[#29241d] underline underline-offset-4">
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 md:hidden">
          <button type="button" onClick={() => setIsFilterOpen(true)} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#bcae99] bg-[#fbf8f1] px-4 text-sm font-medium">
            Filters {activeFilters.length > 0 ? <span className="rounded-full bg-[#29241d] px-2 py-0.5 text-xs text-[#fbf8f1]">{activeFilters.length}</span> : null}
          </button>
          <label className="relative inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-[#bcae99] bg-[#fbf8f1] px-4 text-sm font-medium">
            <span>{sort === "recommended" ? "Recommended" : sort === "price-low" ? "Lowest price" : sort === "premium" ? "Premium" : "Recently checked"}</span>
            <select aria-label="Sort venues" value={sort} onChange={(event) => updateSort(event.target.value as DirectorySort)} className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0">
              <option value="recommended">Recommended</option>
              <option value="price-low">Lowest price</option>
              <option value="premium">Premium</option>
              <option value="recently-checked">Recently checked</option>
            </select>
          </label>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 md:hidden">
          <p className="text-sm text-[#5f574c]">{filteredFacilities.length} of {uniqueFacilities.length} venues</p>
          {activeFilters.length > 0 || hasActiveSearch ? <button type="button" onClick={clearFilters} className="text-sm underline underline-offset-4">Clear all</button> : null}
        </div>

        <div className="mt-6 hidden grid-cols-2 gap-5 md:grid lg:grid-cols-4 xl:grid-cols-7">
          {filterControls}
        </div>

        {activeFilters.length > 0 ? (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#d8cebf]/70 pt-4">
            <span className="mr-1 text-[10px] uppercase tracking-[0.2em] text-[#6f6048]">Active filters</span>
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => updateFilter(filter.key, "")}
                className="inline-flex items-center gap-2 rounded-full border border-[#c8baa7] bg-[#fbf8f1] px-3 py-2 text-xs text-[#29241d] transition hover:border-[#6f6048]"
                aria-label={`Remove ${filter.label} filter: ${filter.value}`}
              >
                <span>{filter.label}: {filter.value}</span>
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        ) : null}
      </section>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 flex items-end bg-[#15120e]/55 p-0 md:hidden" role="dialog" aria-modal="true" aria-label="Filter venues">
          <div className="max-h-[88vh] w-full overflow-y-auto rounded-t-[1.5rem] bg-[#fbf8f1] px-5 pb-8 pt-5 shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
            <div className="mb-6 flex items-center justify-between border-b border-[#d8cebf] pb-4">
              <div>
                <p className="text-lg font-medium">Filter venues</p>
                <p className="mt-1 text-sm text-[#6f6048]">{filteredFacilities.length} matches</p>
              </div>
              <button autoFocus type="button" onClick={() => setIsFilterOpen(false)} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm">Done</button>
            </div>
            <div className="grid gap-5">{filterControls}</div>
            {activeFilters.length > 0 ? <button type="button" onClick={clearFilters} className="mt-6 text-sm underline underline-offset-4">Clear all filters</button> : null}
          </div>
        </div>
      ) : null}

      {filteredFacilities.length > 0 ? (
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="editorial-eyebrow mb-2">Directory</p>
              <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-4xl">
                Compare venues.
              </h2>
            </div>
            {activeFilters.length > 0 || hasActiveSearch ? (
              <button type="button" onClick={clearFilters} className="hidden text-sm text-[#29241d] underline underline-offset-4 md:inline-flex">
                Clear filters
              </button>
            ) : null}
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFacilities.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} source={serviceType} prioritisedService={prioritisedService} />
            ))}
          </div>
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
    </div>
  );
}
