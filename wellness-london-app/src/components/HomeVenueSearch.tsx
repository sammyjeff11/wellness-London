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
  { href: "/longevity", label: "Longevity" },
  { href: "/explore", label: "By area" },
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
      .slice(0, 6);
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
    <section aria-label="Search London wellness venues" className="px-5 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl border-b border-[#d8cebf]/80 pb-7 sm:pb-9">
        <div className="grid min-w-0 gap-5 md:grid-cols-[0.42fr_1fr] md:items-center md:gap-10">
          <div className="hidden md:block">
            <p className="editorial-eyebrow mb-2">Find a venue</p>
            <h2 className="max-w-sm font-serif text-[2.35rem] font-normal leading-[1.02] tracking-[-0.045em]">
              Search London wellness.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#5f574c]">
              Search by venue, service or neighbourhood, or use a popular starting point.
            </p>
          </div>

          <div className="min-w-0">
            <h2 className="mb-3 font-serif text-[1.65rem] font-normal leading-tight tracking-[-0.035em] md:hidden">
              What are you looking for?
            </h2>
            <label className="block min-w-0">
              <span className="sr-only">Search London wellness venues</span>
              <span className="flex min-h-14 items-center gap-3 rounded-full border border-[#bcae99] bg-[#fbf8f1] px-5 shadow-[0_8px_24px_rgba(41,36,29,0.05)] transition focus-within:border-[#6f6048] focus-within:ring-2 focus-within:ring-[#d8cebf]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-none stroke-[#6f6048] stroke-[1.8]">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4 4" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                  placeholder="Venue, service or area"
                  autoComplete="off"
                  className="block min-w-0 flex-1 bg-transparent py-3 text-[16px] leading-6 text-[#29241d] outline-none placeholder:text-[#8d7d67]"
                />
              </span>
            </label>

            {trimmedQuery ? (
              <div className="mt-3 rounded-[1rem] border border-[#d8cebf]/80 bg-[#fbf8f1]/95 p-2 shadow-[0_18px_45px_rgba(41,36,29,0.06)]">
                {results.length > 0 ? (
                  <div className="divide-y divide-[#d8cebf]/70">
                    {results.map((facility) => (
                      <Link
                        key={facility.slug}
                        href={`/facility/${facility.slug}`}
                        className="block rounded-[0.9rem] px-3 py-3 transition hover:bg-[#efe6d8] focus:bg-[#efe6d8] focus:outline-none"
                        onClick={() =>
                          trackEvent("homepage_search_result_click", {
                            facility_name: facility.name,
                            facility_slug: facility.slug,
                            page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
                          })
                        }
                      >
                        <span className="block text-[15px] font-medium leading-6 text-[#29241d]">{facility.name}</span>
                        <span className="mt-1 block text-xs leading-5 text-[#6f6048]">
                          {[getResultLocation(facility), facility.services?.slice(0, 2).join(" · ")].filter(Boolean).join(" / ")}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-3">
                    <p className="text-sm font-medium text-[#29241d]">No close match yet.</p>
                    <p className="mt-1 text-xs leading-5 text-[#5f574c]">
                      Try a shorter venue name, a nearby neighbourhood, or browse below.
                    </p>
                  </div>
                )}
              </div>
            ) : null}

            <div className="mt-3 min-w-0">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {popularLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className="rounded-full border border-[#d8cebf] px-3.5 py-2 text-center text-sm leading-5 text-[#29241d] transition hover:bg-[#eee7da] sm:px-4"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link href="/explore" className="mt-4 inline-flex text-sm font-medium underline underline-offset-4">
                Browse all venues
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
