"use client";

import { useMemo, useState } from "react";
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

function optionLabel(value: string) {
  return value || "Any";
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
      <div className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-6">
        <h3 className="mb-2 text-lg font-semibold">{emptyTitle}</h3>
        <p className="text-sm text-stone-600">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">Compare options</p>
            <h3 className="text-2xl font-semibold tracking-tight">Find the right fit faster</h3>
          </div>
          <p className="text-sm text-stone-500">{filteredFacilities.length} of {facilities.length} listings shown</p>
        </div>

        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Area
            <select value={filters.area} onChange={(event) => updateFilter("area", event.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm normal-case tracking-normal text-[#211d18]">
              <option value="">Any area</option>
              {areaOptions.map((option) => <option key={option} value={option}>{optionLabel(option)}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Premium
            <select value={filters.premiumLevel} onChange={(event) => updateFilter("premiumLevel", event.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm normal-case tracking-normal text-[#211d18]">
              <option value="">Any level</option>
              {premiumOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Experience
            <select value={filters.experienceType} onChange={(event) => updateFilter("experienceType", event.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm normal-case tracking-normal text-[#211d18]">
              <option value="">Any type</option>
              {experienceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Access
            <select value={filters.privateOrShared} onChange={(event) => updateFilter("privateOrShared", event.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm normal-case tracking-normal text-[#211d18]">
              <option value="">Any access</option>
              {privateOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Beginner
            <select value={filters.beginnerFriendly} onChange={(event) => updateFilter("beginnerFriendly", event.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm normal-case tracking-normal text-[#211d18]">
              <option value="">Any</option>
              {beginnerOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm normal-case tracking-normal text-[#211d18]">
              <option value="recommended">Recommended</option>
              <option value="price-low">Price low to high</option>
              <option value="premium">Premium/luxury</option>
              <option value="recently-checked">Recently checked</option>
            </select>
          </label>
        </div>

        {activeFilters.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeFilters.map(([key, value]) => (
              <button key={key} type="button" onClick={() => updateFilter(key as keyof FilterState, "")} className="rounded-full bg-[#211d18] px-3 py-1 text-xs font-medium text-white">
                {value} x
              </button>
            ))}
            <button type="button" onClick={clearFilters} className="text-sm font-medium underline underline-offset-4">
              Clear all
            </button>
          </div>
        ) : null}
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">Comparison table</p>
            <h3 className="text-2xl font-semibold tracking-tight">Compare before you click</h3>
          </div>
          <p className="text-sm text-stone-500">Designed for quick scanning on desktop and mobile.</p>
        </div>
        <div className="overflow-x-auto rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] shadow-sm">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead className="bg-[#eee7dc] text-xs uppercase tracking-[0.14em] text-stone-500">
              <tr>
                <th className="px-4 py-4">Facility</th>
                <th className="px-4 py-4">Area</th>
                <th className="px-4 py-4">Best for</th>
                <th className="px-4 py-4">Price from</th>
                <th className="px-4 py-4">Experience</th>
                <th className="px-4 py-4">Private/shared</th>
                <th className="px-4 py-4">CTA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredFacilities.map((facility) => (
                <tr key={facility.slug}>
                  <td className="px-4 py-4 font-semibold">{facility.name}</td>
                  <td className="px-4 py-4 text-stone-600">{facility.location || "London"}</td>
                  <td className="px-4 py-4 text-stone-600">{primaryBestFor(facility)}</td>
                  <td className="px-4 py-4 text-stone-600">{facility.priceFrom || facility.priceRange || "Price not listed"}</td>
                  <td className="px-4 py-4 text-stone-600">{facility.experienceType?.slice(0, 2).join(", ") || facility.premiumLevel || "Details not yet confirmed"}</td>
                  <td className="px-4 py-4 text-stone-600">{facility.privateOrShared || "Not confirmed"}</td>
                  <td className="px-4 py-4">
                    <Link
                      href={`/facility/${facility.slug}`}
                      onClick={() => trackEvent("comparison_table_click", {
                        facility_name: facility.name,
                        facility_slug: facility.slug,
                        service_type: serviceType,
                        area: facility.location,
                        page_path: window.location.pathname,
                      })}
                      className="font-semibold underline underline-offset-4"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {filteredFacilities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {filteredFacilities.map((facility) => (
            <FacilityCard key={facility.slug} facility={facility} source={serviceType} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-6">
          <h3 className="mb-2 text-lg font-semibold">No listings match those filters</h3>
          <p className="text-sm text-stone-600">Try clearing one or two filters to compare more options.</p>
        </div>
      )}
    </div>
  );
}
