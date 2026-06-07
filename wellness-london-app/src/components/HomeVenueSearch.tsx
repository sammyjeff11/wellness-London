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
  { href: "/cryotherapy-london", label: "Cryotherapy" },
  { href: "/neighbourhoods/shoreditch", label: "Shoreditch" },
  { href: "/neighbourhoods/marylebone", label: "Marylebone" },
  { href: "/beginner-friendly-wellness-london", label: "Beginner friendly" },
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
    <section className="overflow-hidden px-4 py-4 sm:px-6 sm:py-10">
      <div className="editorial-shell max-w-6xl overflow-hidden rounded-[1.1rem] border border-[#d8cebf]/75 bg-[#fbf8f1]/60 p-3 shadow-[0_14px_36px_rgba(41,36,29,0.04)] sm:rounded-[1.45rem] sm:p-6 md:p-8">
        <div className="grid min-w-0 gap-3 md:grid-cols-[0.74fr_1.26fr] md:items-start md:gap-10">
          <div className="hidden md:block">
            <p className="editorial-eyebrow mb-2">Well+ directory</p>
            <h2 className="max-w-md font-serif text-[2.5rem] font-normal leading-[1.02] tracking-[-0.045em] md:text-[3rem]">
              Find your next London wellness space.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-7 text-[#5f574c]">
              Search by venue, service or neighbourhood, then use the quick links to browse the most useful paths.
            </p>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[1rem] border border-[#d8cebf]/70 bg-[#f4efe6]/70 p-3 sm:rounded-[1.15rem] sm:p-4">
            <div className="mb-2 flex items-center justify-between gap-3 md:hidden">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Search the directory</p>
              <Link href="/explore" className="shrink-0 text-xs font-medium underline underline-offset-4">
                All venues
              </Link>
            </div>

            <label className="block min-w-0">
              <span className="sr-only">Search London wellness venues</span>
              <input
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Try Shoreditch or cold plunge"
                autoComplete="off"
                className="block w-full min-w-0 rounded-full border border-[#cfc1ad] bg-[#fbf8f1] px-4 py-2.5 text-[16px] leading-6 text-[#29241d] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-[#8d7d67] focus:border-[#6f6048] focus:ring-2 focus:ring-[#d8cebf] sm:px-5 sm:py-3.5 sm:text-[15px]"
              />
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

            <div className="mt-3 min-w-0 overflow-hidden border-t border-[#d8cebf]/70 pt-3">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8d7d67] md:hidden">Popular</p>
              <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
                {popularLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className="shrink-0 rounded-full border border-[#d8cebf] bg-[#fbf8f1]/78 px-3.5 py-2 text-xs leading-5 text-[#29241d] transition hover:bg-[#eee7da] sm:px-4 sm:text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
