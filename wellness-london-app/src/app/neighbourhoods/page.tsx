import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { getAvailableNeighbourhoods, getFacilitiesForRegion } from "@/lib/location-directory";
import { londonRegions } from "@/lib/location-hubs";
import { neighbourhoodPages } from "@/lib/neighbourhood-pages";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "London Wellness Areas & Neighbourhoods | Well+",
  description:
    "Browse London wellness venues by region and neighbourhood, including Central, East, West, North and South London, Shoreditch, Canary Wharf, Kensington and more.",
  alternates: { canonical: "/neighbourhoods" },
};

export default async function NeighbourhoodsPage() {
  const facilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));
  const availableNeighbourhoods = getAvailableNeighbourhoods(facilities, neighbourhoodPages);
  const regionGroups = londonRegions
    .map((region) => ({
      region,
      facilities: getFacilitiesForRegion(facilities, region.name),
      neighbourhoods: availableNeighbourhoods.filter(({ page }) => page.region === region.name),
    }))
    .filter(({ facilities: regionFacilities }) => regionFacilities.length > 0);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "London wellness areas and neighbourhoods",
        url: absoluteUrl("/neighbourhoods"),
        hasPart: [
          ...regionGroups.map(({ region }) => region),
          ...availableNeighbourhoods.map(({ page }) => page),
        ].map((area) => ({
          "@type": "WebPage",
          name: "name" in area ? area.name : area.shortTitle,
          url: absoluteUrl(area.href),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Areas", item: absoluteUrl("/neighbourhoods") },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={schema} />
      <section className="px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-[#6f6048]">
            <Link href="/" className="underline-offset-4 hover:underline">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#29241d]">Areas</span>
          </nav>
          <p className="editorial-eyebrow mb-4">Explore by location</p>
          <h1 className="max-w-4xl font-serif text-[3.4rem] font-normal leading-[0.92] tracking-[-0.05em] sm:text-7xl md:text-8xl">Wellness across London.</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">
            Begin with a broad London region, then move into a neighbourhood when proximity and the character of the area matter more than one specific service.
          </p>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="regions-heading">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-3">Start with the city</p>
          <h2 id="regions-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Choose an area of London.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f574c] sm:text-base">
            Each area gives you the wider picture first. Where the directory has enough verified local coverage, continue into a neighbourhood guide.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {regionGroups.map(({ region, facilities: regionFacilities, neighbourhoods }) => (
              <article key={region.href} className="surface-paper rounded-[1rem] p-6 sm:p-7">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">
                  {regionFacilities.length} {regionFacilities.length === 1 ? "venue" : "venues"}
                </p>
                <h3 className="mt-4 font-serif text-4xl font-normal leading-none tracking-[-0.04em]">{region.name}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#5f574c]">{region.copy}</p>
                <Link href={region.href} className="mt-6 inline-block text-sm font-medium underline underline-offset-4">
                  Explore {region.name} →
                </Link>
                {neighbourhoods.length > 0 ? (
                  <div className="mt-7 border-t border-[#d8cebf] pt-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Neighbourhoods with listings</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {neighbourhoods.map(({ page, facilities: localFacilities }) => (
                        <Link key={page.slug} href={page.href} className="rounded-full border border-[#d8cebf] px-3 py-2 text-sm transition hover:bg-[#eee7da]">
                          {page.shortTitle} · {localFacilities.length}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="neighbourhoods-heading">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-3">Then go local</p>
          <h2 id="neighbourhoods-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Neighbourhoods with verified listings.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f574c] sm:text-base">
            These are the neighbourhoods where Well+ currently has at least one published venue. Empty or draft-only locations are not shown.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {availableNeighbourhoods.map(({ page: area, facilities: localFacilities }) => {
              const count = localFacilities.length;
              return (
                <Link key={area.slug} href={area.href} className="surface-paper group grid gap-5 rounded-[1rem] p-6 transition hover:-translate-y-0.5 hover:bg-[#f5f0e7] sm:grid-cols-[0.72fr_1.28fr] sm:p-7">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">{area.eyebrow}</p>
                    <h3 className="mt-4 font-serif text-4xl font-normal leading-none tracking-[-0.04em]">{area.shortTitle}</h3>
                    <p className="mt-4 text-sm underline underline-offset-4">{count > 0 ? `${count} matched ${count === 1 ? "venue" : "venues"}` : "Read area guide"} →</p>
                  </div>
                  <p className="text-sm leading-7 text-[#5f574c]">{area.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
