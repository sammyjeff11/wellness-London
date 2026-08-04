"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import { trackEvent } from "@/lib/analytics";
import { matchesVenueSearch, rankVenueSearch } from "@/lib/search";

type HomeVenueSearchProps = {
  facilities: ServiceDirectoryFacility[];
};

const popularLinks = [
  { href: "/sauna-london", label: "Sauna" },
  { href: "/cold-plunge-london", label: "Cold plunge" },
  { href: "/neighbourhoods/shoreditch", label: "Shoreditch" },
  { href: "/longevity", label: "Longevity clinics" },
];

function getResultLocation(facility: ServiceDirectoryFacility) {
  return [facility.neighbourhood || facility.location, facility.areaOfLondon || facility.areaGroup]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(" · ");
}

export default function HomeVenueSearch({ facilities }: HomeVenueSearchProps) {
  const [query, setQuery] = useState("");
  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    if (!trimmedQuery) return [];
    return facilities
      .filter((facility) => matchesVenueSearch(facility, trimmedQuery))
      .sort((a, b) => rankVenueSearch(b, trimmedQuery) - rankVenueSearch(a, trimmedQuery))
      .slice(0, 5);
  }, [facilities, trimmedQuery]);

  function updateQuery(value: string) {
    setQuery(value);
    if (value.length === 1 || value.length % 4 === 0) {
      trackEvent("homepage_venue_search_used", {
        search_length: value.length,
        page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
    }
  }

  return (
    <div className="relative mt-6 max-w-2xl sm:mt-8">
      <label htmlFor="homepage-venue-search" className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/62">
        Search the directory
      </label>
      <div className="relative">
        <input
          id="homepage-venue-search"
          type="search"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder="Try Shoreditch, sauna or a venue name"
          autoComplete="off"
          className="block w-full rounded-full border border-[#fbf8f1]/40 bg-[#fbf8f1] px-5 py-3.5 pr-12 text-[16px] leading-6 text-[#29241d] shadow-[0_12px_32px_rgba(0,0,0,0.16)] outline-none transition placeholder:text-[#8d7d67] focus:border-white focus:ring-2 focus:ring-[#fbf8f1]/38 sm:py-4"
        />
        <span aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-lg text-[#6f6048]">⌕</span>
      </div>

      {trimmedQuery ? (
        <div id="homepage-search-results" className="mt-2 overflow-hidden rounded-[1rem] border border-[#d8cebf] bg-[#fbf8f1] p-2 text-[#29241d] shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
          {results.length > 0 ? (
            <div className="divide-y divide-[#d8cebf]/70">
              {results.map((facility) => (
                <Link
                  key={facility.slug}
                  href={`/facility/${facility.slug}`}
                  className="block rounded-[0.8rem] px-3 py-2.5 transition hover:bg-[#efe6d8] focus:bg-[#efe6d8] focus:outline-none"
                  onClick={() =>
                    trackEvent("homepage_search_result_click", {
                      facility_name: facility.name,
                      facility_slug: facility.slug,
                      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
                    })
                  }
                >
                  <span className="block text-sm font-medium leading-6">{facility.name}</span>
                  <span className="block text-xs leading-5 text-[#6f6048]">
                    {[getResultLocation(facility), facility.services?.slice(0, 2).join(" · ")].filter(Boolean).join(" / ")}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-3 py-3">
              <p className="text-sm font-medium">No close match yet.</p>
              <p className="mt-1 text-xs leading-5 text-[#5f574c]">Try a venue, treatment or London neighbourhood.</p>
            </div>
          )}
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] uppercase tracking-[0.18em] text-[#fbf8f1]/52">Popular</span>
        {popularLinks.map((link) => (
          <Link key={link.href} href={link.href} className="rounded-full border border-[#fbf8f1]/24 bg-black/10 px-3 py-1.5 text-xs text-[#fbf8f1]/88 transition hover:border-[#fbf8f1]/60 hover:bg-[#fbf8f1] hover:text-[#29241d]">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
