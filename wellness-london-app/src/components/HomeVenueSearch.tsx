"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import { trackEvent } from "@/lib/analytics";
import { matchesVenueSearch } from "@/lib/search";

type HomeVenueSearchProps = {
  facilities: ServiceDirectoryFacility[];
};

const quickLinks = [
  { href: "/sauna-london", label: "Sauna" },
  { href: "/cold-plunge-london", label: "Cold plunge" },
  { href: "/cryotherapy-london", label: "Cryotherapy" },
  { href: "/central-london-wellness", label: "Central London" },
  { href: "/neighbourhoods/shoreditch", label: "Shoreditch" },
  { href: "/neighbourhoods/marylebone", label: "Marylebone" },
  { href: "/quiet-wellness-spaces-london", label: "Quiet recovery" },
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
    return facilities.filter((facility) => matchesVenueSearch(facility, trimmedQuery)).slice(0, 4);
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
    <section className="px-5 py-4 sm:px-6 sm:py-8">
      <div className="editorial-shell border-b border-[#d8cebf]/70 pb-6 sm:pb-8">
        <div className="grid gap-4 md:grid-cols-[0.72fr_1.28fr] md:items-end md:gap-8">
          <div>
            <p className="editorial-eyebrow mb-2">Well+ directory</p>
            <h2 className="font-serif text-[1.75rem] font-normal leading-[1.02] tracking-[-0.045em] sm:text-[2.5rem] md:text-[3rem]">
              Find your next London wellness space.
            </h2>
          </div>

          <div>
            <label className="block">
              <span className="sr-only">Search London wellness venues</span>
              <input
                type="search"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search sauna, Shoreditch or a venue"
                className="w-full rounded-full border border-[#cfc1ad] bg-[#fbf8f1] px-4 py-3 text-[15px] leading-6 text-[#29241d] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-[#8d7d67] focus:border-[#6f6048] focus:ring-2 focus:ring-[#d8cebf] sm:px-5"
              />
            </label>

            {trimmedQuery ? (
              <div className="mt-3 rounded-[1rem] border border-[#d8cebf]/80 bg-[#fbf8f1]/82 p-2">
                {results.length > 0 ? (
                  <div className="divide-y divide-[#d8cebf]/70">
                    {results.map((facility) => (
                      <Link
                        key={facility.slug}
                        href={`/facility/${facility.slug}`}
                        className="block rounded-[0.85rem] px-3 py-3 transition hover:bg-[#efe6d8]"
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
                  <div className="px-3 py-4">
                    <p className="text-base font-medium text-[#29241d]">No exact match yet.</p>
                    <p className="mt-1 text-sm leading-6 text-[#5f574c]">
                      Try a broader service or neighbourhood, or use the quick links below.
                    </p>
                  </div>
                )}
              </div>
            ) : null}

            <div className="-mx-5 mt-3 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {quickLinks.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className="min-w-max snap-start rounded-full border border-[#d8cebf] bg-[#fbf8f1]/70 px-4 py-2 text-xs leading-5 text-[#29241d] transition hover:bg-[#eee7da] sm:text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
