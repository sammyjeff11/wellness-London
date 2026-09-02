"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import FacilityCard, { type FacilityCardFacility } from "@/components/FacilityCard";
import { trackEvent } from "@/lib/analytics";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { matchesVenueSearch, rankVenueSearch } from "@/lib/search";
import { isUsefulValue } from "@/lib/useful-values";
import { toDirectoryServiceLabel } from "@/lib/discovery-labels";

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

  const filteredFacilities = useMemo(() => {
    const result = uniqueFacilities.filter((facility) => {
      const area = facility.areaGroup || facility.location || "";
      const experiences = facility.experienceType || [];
      const priceBand = getPriceBand(facility.priceFrom || facility.priceRange);
      const facilityServices = (facility.services || []).map(normaliseDirectoryService);

      return (
        matchesVenueSearch(facility, searchValue) &&
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
      if (searchValue && sort === "recommended") {
        return rankVenueSearch(b, searchValue) - rankVenueSearch(a, searchValue) || (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0);
      }
      if (sort === "price-low") return parsePrice(a.priceFrom || a.priceRange) - parsePrice(b.priceFrom || b.priceRange);
      if (sort === "premium") return premiumRank(b.premiumLevel || b.priceRange) - premiumRank(a.premiumLevel || a.priceRange);
      if (sort === "recently-checked") return checkedTime(b.lastCheckedDate) - checkedTime(a.lastCheckedDate);
      return (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0);
    });
  }, [uniqueFacilities, filters, sort, searchValue]);

  function updateFilter(key: keyof FilterState, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
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
    trackEvent("filter_cleared", {
      filter_name: "all",
      service_type: serviceType,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  function updateSearch(value: string) {
    setSearchQuery(value);
    if (value.length === 1 || value.length % 4 === 0) {
      trackEvent("venue_search_used", {
        search_length: value.length,
        service_type: serviceType,
        page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
    }
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
      <FilterSelect label="Sort" value={sort} onChange={setSort}>
        <option value="recommended">Recommended</option>
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
            <MobileFilterPill label="Sort" value={sort === "recommended" ? "" : sort.replace("price-low", "Price").replace("premium", "Premium").replace("recently-checked", "Recent")} onChange={setSort}>
              <option value="recommended">Sort</option>
              <option value="price-low">Price</option>
              <option value="premium">Premium</option>
              <option value="recently-checked">Recent</option>
            </MobileFilterPill>
          </div>
        </div>

        <div className={`mt-6 hidden grid-cols-2 gap-5 md:grid ${directoryMode ? "lg:grid-cols-6" : "lg:grid-cols-5"}`}>
          {filterControls}
        </div>
      </section>

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
              <FacilityCard key={facility.slug} facility={facility} source={serviceType} prioritisedService={prioritisedService} showSaveButton={directoryMode} />
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

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d8cebf] bg-[#fbf8f1]/95 px-4 py-3 shadow-[0_-16px_38px_rgba(41,36,29,0.12)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <a href={`#directory-filters-${serviceType}`} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#29241d] px-5 text-sm font-medium text-[#fbf8f1]">
            Filters · {filteredFacilities.length} {filteredFacilities.length === 1 ? "venue" : "venues"}
          </a>
          {activeFilters.length > 0 || hasActiveSearch ? (
            <button type="button" onClick={clearFilters} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8cebf] px-4 text-sm text-[#29241d]">
              Clear
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
