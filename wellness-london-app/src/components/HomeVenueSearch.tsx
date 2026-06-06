"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import { trackEvent } from "@/lib/analytics";
import { matchesVenueSearch } from "@/lib/search";

type HomeVenueSearchProps = {
  facilities: ServiceDirectoryFacility[];
};

const quickServiceLinks = [
  { href: "/sauna-london", label: "Sauna" },
  { href: "/cold-plunge-london", label: "Cold plunge" },
  { href: "/cryotherapy-london", label: "Cryotherapy" },
  { href: "/red-light-therapy-london", label: "Red light" },
];

const quickLocationLinks = [
  { href: "/central-london-wellness", label: "Central London" },
  { href: "/east-london-wellness", label: "East London" },
  { href: "/neighbourhoods/shoreditch", label: "Shoreditch" },
  { href: "/neighbourhoods/marylebone", label: "Marylebone" },
];

const quickUseCaseLinks = [
  { href: "/recover", label: "Post-gym recovery" },
  { href: "/quiet-wellness-spaces-london", label: "Quiet recovery" },
  { href: "/luxury-wellness-spaces-london", label: "Luxury reset" },
  { href: "/beginner-friendly-wellness-london", label: "Beginner friendly" },
];

function getResultLocation(facility: ServiceDirectoryFacility) {
  return [facility.neighbourhood || facility.location, facility.areaOfLondon || facility.areaGroup]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(" · ");
}

function QuickLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={`${title}-${link.href}-${link.label}`}
            href={link.href}
            className="rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-3 py-2 text-xs text-[#29241d] transition hover:bg-[#eee7da] sm:text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
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
    <section className="px-5 py-6 sm:px-6 sm:py-10">
      <div className="editorial-shell grid gap-5 rounded-[1.35rem] border border-[#d8cebf]/70 bg-[#fbf8f1] p-5 shadow-[0_18px_50px_rgba(41,36,29,0.05)] sm:p-7 md:grid-cols-[0.82fr_1.18fr] md:gap-8 md:p-9">
        <div>
          <p className="editorial-eyebrow mb-3">Find a venue</p>
          <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
            Search by name, area or service.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#5f574c] sm:mt-5 sm:text-base sm:leading-7">
            Try “sauna”, “Shoreditch”, “cold plunge” or a venue name to get straight to relevant London wellness spaces.
          </p>
        </div>

        <div className="space-y-5">
          <label className="block">
            <span className="sr-only">Search London wellness venues</span>
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search venues, areas or services"
              className="w-full rounded-full border border-[#d8cebf] bg-[#f4efe6] px-5 py-3 text-base text-[#29241d] outline-none transition placeholder:text-[#8d7d67] focus:border-[#8d7d67] focus:bg-[#fbf8f1] sm:py-4"
            />
          </label>

          {trimmedQuery ? (
            <div className="rounded-[1rem] border border-[#d8cebf]/70 bg-[#f4efe6] p-3">
              {results.length > 0 ? (
                <div className="divide-y divide-[#d8cebf]/70">
                  {results.map((facility) => (
                    <Link
                      key={facility.slug}
                      href={`/facility/${facility.slug}`}
                      className="block rounded-[0.85rem] px-3 py-3 transition hover:bg-[#fbf8f1]"
                      onClick={() =>
                        trackEvent("homepage_search_result_click", {
                          facility_name: facility.name,
                          facility_slug: facility.slug,
                          page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
                        })
                      }
                    >
                      <span className="block text-base font-medium text-[#29241d]">{facility.name}</span>
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
                    Try a broader service or neighbourhood, or use the service and location links below.
                  </p>
                </div>
              )}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-3">
            <QuickLinks title="Services" links={quickServiceLinks} />
            <QuickLinks title="Locations" links={quickLocationLinks} />
            <QuickLinks title="Use cases" links={quickUseCaseLinks} />
          </div>
        </div>
      </div>
    </section>
  );
}
