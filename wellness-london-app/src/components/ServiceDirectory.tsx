"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import FacilityCard, { type FacilityCardFacility } from "@/components/FacilityCard";
import { trackEvent } from "@/lib/analytics";

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
  premiumLevel: string;
  experienceType: string;
  privateOrShared: string;
  beginnerFriendly: string;
};

type ServiceDirectoryProps = {
  facilities: ServiceDirectoryFacility[];
  serviceType: string;
  emptyTitle: string;
  emptyText: string;
};

const initialFilters: FilterState = {
  area: "",
  premiumLevel: "",
  experienceType: "",
  privateOrShared: "",
  beginnerFriendly: "",
};

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

function primaryBestFor(facility: ServiceDirectoryFacility) {
  return facility.bestFor?.[0] || facility.experienceType?.[0] || "Best fit not yet confirmed";
}

function FilterSelect({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-[11px] uppercase tracking-[0.18em] text-[#70695d]">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 rounded-none border-0 border-b border-[#cfc5b6] bg-transparent px-0 py-3 text-sm normal-case tracking-normal text-[#29241d] outline-none transition focus:border-[#6f6048]">
        {children}
      </select>
    </label>
  );
}

export default function ServiceDirectory({ facilities, serviceType, emptyTitle, emptyText }: ServiceDirectoryProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState("recommended");

  const areaOptions = uniqueValues(facilities.map((facility) => facility.areaGroup || facility.location));
  const premiumOptions = uniqueValues(facilities.map((facility) => facility.premiumLevel));
  const experienceOptions = uniqueValues(facilities.flatMap((facility) => facility.experienceType || []));
  const privateOptions = uniqueValues(facilities.map((facility) => facility.privateOrShared));
  const beginnerOptions = uniqueValues(facilities.map((facility) => facility.beginnerFriendly));

  const filteredFacilities = useMemo(() => {
    const result = facilities.filter((facility) => {
      const area = facility.areaGroup || facility.location || "";
      const experiences = facility.experienceType || [];

      return (
        (!filters.area || area === filters.area) &&
        (!filters.premiumLevel || facility.premiumLevel === filters.premiumLevel) &&
        (!filters.experienceType || experiences.includes(filters.experienceType)) &&
        (!filters.privateOrShared || facility.privateOrShared === filters.privateOrShared) &&
        (!filters.beginnerFriendly || facility.beginnerFriendly === filters.beginnerFriendly)
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "price-low") return parsePrice(a.priceFrom || a.priceRange) - parsePrice(b.priceFrom || b.priceRange);
      if (sort === "premium") return premiumRank(b.premiumLevel || b.priceRange) - premiumRank(a.premiumLevel || a.priceRange);
      if (sort === "recently-checked") return checkedTime(b.lastCheckedDate) - checkedTime(a.lastCheckedDate);
      return Number(b.isFeatured) - Number(a.isFeatured) || (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0);
    });
  }, [facilities, filters, sort]);

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
    trackEvent("filter_cleared", {
      filter_name: "all",
      service_type: serviceType,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }

  const activeFilters = Object.entries(filters).filter(([, value]) => value);

  if (facilities.length === 0) {
    return (
      <div className="bg-[#fbf8f1] p-8">
        <h3 className="mb-2 font-serif text-2xl font-normal">{emptyTitle}</h3>
        <p className="text-sm leading-6 text-[#70695d]">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      <section className="border-y border-[#d8cebf]/70 py-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Refine the edit</p>
            <h3 className="font-serif text-4xl font-normal tracking-normal">Find the right fit faster</h3>
          </div>
          <p className="text-sm text-[#70695d]">{filteredFacilities.length} of {facilities.length} listings shown</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
          <FilterSelect label="Area" value={filters.area} onChange={(value) => updateFilter("area", value)}>
            <option value="">Any area</option>
            {areaOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
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
          <FilterSelect label="Beginner" value={filters.beginnerFriendly} onChange={(value) => updateFilter("beginnerFriendly", value)}>
            <option value="">Any</option>
            {beginnerOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </FilterSelect>
          <FilterSelect label="Sort" value={sort} onChange={setSort}>
            <option value="recommended">Recommended</option>
            <option value="price-low">Price low to high</option>
            <option value="premium">Premium/luxury</option>
            <option value="recently-checked">Recently checked</option>
          </FilterSelect>
        </div>

        {activeFilters.length > 0 ? (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {activeFilters.map(([key, value]) => (
              <button key={key} type="button" onClick={() => updateFilter(key as keyof FilterState, "")} className="rounded-full bg-[#29241d] px-4 py-2 text-xs text-[#fbf8f1]">
                {value} x
              </button>
            ))}
            <button type="button" onClick={clearFilters} className="text-sm text-[#29241d] underline underline-offset-4">
              Clear all
            </button>
          </div>
        ) : null}
      </section>

      {filteredFacilities.length > 0 ? (
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">
          {filteredFacilities.map((facility) => (
            <FacilityCard key={facility.slug} facility={facility} source={serviceType} />
          ))}
        </div>
      ) : (
        <div className="bg-[#fbf8f1] p-8">
          <h3 className="mb-2 font-serif text-2xl font-normal">No listings match those filters</h3>
          <p className="text-sm leading-6 text-[#70695d]">Try clearing one or two filters to compare more options.</p>
        </div>
      )}

      <details className="group border-y border-[#d8cebf]/70 py-7">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[#29241d] marker:hidden">
          <span>
            <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Compare details</span>
            <span className="font-serif text-4xl font-normal tracking-normal">Open the comparison table</span>
          </span>
          <span className="text-sm text-[#70695d] transition group-open:rotate-45">+</span>
        </summary>

        <div className="mt-8 overflow-x-auto border-t border-[#d8cebf]/70 pt-2">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead className="text-[11px] uppercase tracking-[0.16em] text-[#70695d]">
              <tr>
                <th className="py-5 pr-6">Facility</th>
                <th className="py-5 pr-6">Area</th>
                <th className="py-5 pr-6">Best for</th>
                <th className="py-5 pr-6">Price from</th>
                <th className="py-5 pr-6">Experience</th>
                <th className="py-5 pr-6">Private/shared</th>
                <th className="py-5">CTA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8cebf]/70">
              {filteredFacilities.map((facility) => (
                <tr key={facility.slug}>
                  <td className="py-5 pr-6 font-serif text-xl text-[#29241d]">{facility.name}</td>
                  <td className="py-5 pr-6 text-[#70695d]">{facility.location || "London"}</td>
                  <td className="py-5 pr-6 text-[#70695d]">{primaryBestFor(facility)}</td>
                  <td className="py-5 pr-6 text-[#70695d]">{facility.priceFrom || facility.priceRange || "Price not listed"}</td>
                  <td className="py-5 pr-6 text-[#70695d]">{facility.experienceType?.slice(0, 2).join(", ") || facility.premiumLevel || "Details pending"}</td>
                  <td className="py-5 pr-6 text-[#70695d]">{facility.privateOrShared || "Not confirmed"}</td>
                  <td className="py-5">
                    <Link
                      href={`/facility/${facility.slug}`}
                      onClick={() => trackEvent("comparison_table_click", {
                        facility_name: facility.name,
                        facility_slug: facility.slug,
                        service_type: serviceType,
                        area: facility.location,
                        page_path: window.location.pathname,
                      })}
                      className="text-[#29241d] underline underline-offset-4"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
