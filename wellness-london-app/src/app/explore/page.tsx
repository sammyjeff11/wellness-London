import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { pillarPages } from "@/lib/pillar-pages";
import { absoluteUrl } from "@/lib/site";

const pageDescription =
  "Search and compare published London wellness venues by service, location, venue type, access and price, including saunas, recovery studios, spas and longevity clinics.";

export const metadata: Metadata = {
  title: "London Wellness Venues | Search & Compare | Well+",
  description: pageDescription,
  alternates: { canonical: "/explore" },
};

export default async function ExplorePage() {
  const facilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "London wellness venues",
        url: absoluteUrl("/explore"),
        description: pageDescription,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: facilities.length,
          itemListElement: facilities.map((facility, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: facility.name,
            url: absoluteUrl(`/facility/${facility.slug}`),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Venues", item: absoluteUrl("/explore") },
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
            <span aria-current="page" className="text-[#29241d]">Venues</span>
          </nav>
          <p className="editorial-eyebrow mb-4">The London directory</p>
          <h1 className="max-w-4xl font-serif text-[3.4rem] font-normal leading-[0.92] tracking-[-0.05em] sm:text-7xl md:text-8xl">
            London wellness venues.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">
            Compare published saunas, cold plunges, recovery studios, spas and longevity clinics. Search by venue, service or neighbourhood, then narrow the directory using the details that matter before you book.
          </p>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-12 sm:px-6 sm:py-16 md:py-20" aria-labelledby="directory-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="editorial-eyebrow mb-3">Search and compare</p>
            <h2 id="directory-heading" className="font-serif text-4xl font-normal leading-[0.98] tracking-[-0.04em] sm:text-5xl">
              Find a venue that fits the visit.
            </h2>
          </div>
          <ServiceDirectory
            facilities={facilities}
            serviceType="all_venues"
            emptyTitle="No published venues are available right now"
            emptyText="The directory is being refreshed. Browse Services, Areas or Guides while listings are restored."
            directoryMode
          />
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="goals-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="editorial-eyebrow mb-3">Not sure which service?</p>
              <h2 id="goals-heading" className="font-serif text-4xl font-normal leading-[0.98] tracking-[-0.04em] sm:text-5xl">Explore by goal.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:justify-self-end sm:text-base">
              These routes help when you know the outcome you want but not the service or venue that best fits it.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {pillarPages.map((pillar) => (
              <Link key={pillar.slug} href={pillar.href} className="surface-paper group flex min-h-56 flex-col justify-between rounded-[1rem] p-5 transition hover:-translate-y-0.5 hover:bg-[#f5f0e7]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">{pillar.eyebrow}</p>
                  <h3 className="mt-4 font-serif text-3xl font-normal leading-none tracking-[-0.035em]">{pillar.label}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#5f574c]">{pillar.descriptor}</p>
                </div>
                <span className="mt-5 text-sm underline underline-offset-4">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
