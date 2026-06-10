import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory, { type ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import {
  collections,
  directoryFacilityScore,
  facilityMatchesCollection,
  facilityMatchesFeaturedSection,
  getCollection,
  type CollectionFeaturedSection,
} from "@/lib/collections";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

type CuratedPick = {
  section: CollectionFeaturedSection;
  facility?: ServiceDirectoryFacility;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) {
    return { title: "Collection not found | Well+" };
  }

  return {
    title: collection.metaTitle,
    description: collection.metaDescription,
    alternates: { canonical: collection.href },
    openGraph: {
      title: collection.metaTitle,
      description: collection.metaDescription,
      url: absoluteUrl(collection.href),
      type: "website",
    },
  };
}

function getCuratedPicks(facilities: ServiceDirectoryFacility[], sections: readonly CollectionFeaturedSection[]) {
  const usedSlugs = new Set<string>();

  return sections.map<CuratedPick>((section) => {
    const facility = facilities
      .filter((candidate) => !usedSlugs.has(candidate.slug))
      .filter((candidate) => facilityMatchesFeaturedSection(candidate, section.match))
      .sort((a, b) => directoryFacilityScore(b, section.match) - directoryFacilityScore(a, section.match))[0];

    if (facility) usedSlugs.add(facility.slug);

    return { section, facility };
  });
}

function itemListJsonLd(collectionTitle: string, collectionHref: string, facilities: ServiceDirectoryFacility[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collectionTitle,
    url: absoluteUrl(collectionHref),
    itemListElement: facilities.map((facility, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/facility/${facility.slug}`),
      name: facility.name,
    })),
  };
}

function breadcrumbJsonLd(collectionTitle: string, collectionHref: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Collections",
        item: absoluteUrl("/collections"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: collectionTitle,
        item: absoluteUrl(collectionHref),
      },
    ],
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) notFound();

  const facilities = await getFacilities();
  const directoryFacilities = dedupeFacilities(facilities.map(toDirectoryFacility));
  const collectionFacilities = dedupeFacilities(
    directoryFacilities
      .filter((facility) => facilityMatchesCollection(facility, collection))
      .sort((a, b) => directoryFacilityScore(b) - directoryFacilityScore(a))
  );
  const curatedPicks = getCuratedPicks(collectionFacilities, collection.featuredSections);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={[itemListJsonLd(collection.title, collection.href, collectionFacilities), breadcrumbJsonLd(collection.title, collection.href)]} />

      <section className="px-5 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-sm text-[#70695d]">
            <Link href="/" className="underline-offset-4 hover:text-[#29241d] hover:underline">Home</Link>
            <span>/</span>
            <Link href="/collections" className="underline-offset-4 hover:text-[#29241d] hover:underline">Collections</Link>
          </nav>

          <div className="rounded-[1.6rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-5 shadow-[0_24px_70px_rgba(41,36,29,0.06)] sm:p-8 md:p-10">
            <p className="editorial-eyebrow mb-5">{collection.eyebrow}</p>
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <h1 className="font-serif text-[3.2rem] font-normal leading-[0.94] tracking-[-0.02em] sm:text-6xl md:text-7xl">
                  {collection.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">
                  {collection.heroText}
                </p>
              </div>
              <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#f4efe6] p-5 sm:p-6">
                <p className="text-sm leading-6 text-[#5f574c]">
                  Built from the live Well+ directory with no hardcoded venue shortlist. The full directory below updates as venue inventory changes.
                </p>
                <p className="mt-4 text-[2rem] font-serif leading-none tracking-[-0.045em]">
                  {collectionFacilities.length} London spaces
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-6 sm:pb-12">
        <div className="mx-auto grid max-w-6xl gap-5 border-b border-[#d8cebf]/70 pb-10 md:grid-cols-[0.7fr_1.3fr] md:gap-10">
          <p className="editorial-eyebrow">Editor&apos;s note</p>
          <div className="space-y-5 text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
            {collection.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Curated picks</p>
              <h2 className="font-serif text-[2.35rem] font-normal leading-[1.02] tracking-[-0.02em] sm:text-5xl">
                Where to start.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
              One best-matched venue per editorial angle, selected from matching facilities using service, venue type and listing quality signals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {curatedPicks.map(({ section, facility }) => (
              <article key={section.label} className="rounded-[1.35rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-5 sm:p-6">
                <p className="editorial-eyebrow mb-3">{section.label}</p>
                <p className="mb-5 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">{section.description}</p>
                {facility ? (
                  <FacilityCard facility={facility} source={`collection_${collection.slug}`} compact />
                ) : (
                  <div className="rounded-[1.1rem] border border-dashed border-[#d8cebf] bg-[#f4efe6] p-5 text-sm leading-6 text-[#5f574c]">
                    No live venue currently has enough matching signals for this pick. Browse the full directory below instead.
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7">
            <p className="editorial-eyebrow mb-3">Full directory</p>
            <h2 className="font-serif text-[2.35rem] font-normal leading-[1.02] tracking-[-0.02em] sm:text-5xl">
              Compare every matching venue.
            </h2>
          </div>
          <ServiceDirectory
            facilities={collectionFacilities}
            serviceType={`collection_${collection.slug}`}
            emptyTitle="No matching collection venues yet."
            emptyText="The Well+ directory does not currently include a live venue that matches this collection. Check back as the directory expands."
          />
        </div>
      </section>
    </main>
  );
}
