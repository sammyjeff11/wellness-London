import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities, normaliseFacilityValue } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { neighbourhoodPages } from "@/lib/neighbourhood-pages";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "London Wellness Areas & Neighbourhoods | Well+",
  description:
    "Browse London wellness venues by region and neighbourhood, including Central, East, West, North and South London, Shoreditch, Canary Wharf, Kensington and more.",
  alternates: { canonical: "/neighbourhoods" },
};

const regions = [
  { name: "Central London", href: "/central-london-wellness", copy: "City-centre recovery, premium clubs, spas and clinic-led wellness." },
  { name: "East London", href: "/east-london-wellness", copy: "Community sauna, contrast therapy and design-led recovery spaces." },
  { name: "West London", href: "/west-london-wellness", copy: "Premium studios, private wellness and longevity-led services." },
  { name: "North London", href: "/north-london-wellness", copy: "Restorative spaces, neighbourhood studios and slower wellness routines." },
  { name: "South London", href: "/south-london-wellness", copy: "Community sauna, recovery studios and accessible local rituals." },
];

function countForLocation(facilities: ReturnType<typeof toDirectoryFacility>[], location: string) {
  const term = normaliseFacilityValue(location);
  return dedupeFacilities(facilities.filter((facility) => {
    const text = normaliseFacilityValue([
      facility.neighbourhood,
      facility.location,
      facility.areaOfLondon,
      facility.areaGroup,
      facility.nearestStation,
      facility.address,
    ].filter(Boolean).join(" "));
    return text.includes(term);
  })).length;
}

export default async function NeighbourhoodsPage() {
  const facilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "London wellness areas and neighbourhoods",
        url: absoluteUrl("/neighbourhoods"),
        hasPart: [...regions, ...neighbourhoodPages].map((area) => ({
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
          <p className="editorial-eyebrow mb-3">Start broad</p>
          <h2 id="regions-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">London regions.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {regions.map((region) => {
              const count = countForLocation(facilities, region.name);
              return (
                <Link key={region.href} href={region.href} className="surface-paper group flex min-h-60 flex-col justify-between rounded-[1rem] p-5 transition hover:-translate-y-0.5 hover:bg-[#f5f0e7]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">{count > 0 ? `${count} ${count === 1 ? "venue" : "venues"}` : "Area guide"}</p>
                    <h3 className="mt-5 font-serif text-3xl font-normal leading-none tracking-[-0.035em]">{region.name}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#5f574c]">{region.copy}</p>
                  </div>
                  <span className="mt-5 text-sm underline underline-offset-4">Explore area →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="neighbourhoods-heading">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-3">Go local</p>
          <h2 id="neighbourhoods-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Neighbourhood guides.</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {neighbourhoodPages.map((area) => {
              const count = countForLocation(facilities, area.shortTitle);
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
