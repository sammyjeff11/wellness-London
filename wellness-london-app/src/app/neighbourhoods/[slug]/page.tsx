import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { getNeighbourhoodPage, neighbourhoodPages } from "@/lib/neighbourhood-pages";
import { absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return neighbourhoodPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getNeighbourhoodPage(slug);

  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.href },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: page.href,
      type: "website",
    },
  };
}

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

const serviceLinks = [
  { href: "/sauna-london", label: "Sauna", keys: ["sauna", "infrared sauna", "traditional sauna"] },
  { href: "/cold-plunge-london", label: "Cold Plunge", keys: ["cold plunge", "ice bath", "cold exposure"] },
  { href: "/cryotherapy-london", label: "Cryotherapy", keys: ["cryotherapy", "cryo"] },
  { href: "/contrast-therapy-london", label: "Contrast Therapy", keys: ["contrast therapy", "sauna", "cold plunge"] },
  { href: "/recovery-london", label: "Recovery", keys: ["recovery", "compression", "sports recovery", "massage"] },
  { href: "/longevity-london", label: "Longevity", keys: ["longevity", "red light", "hbot", "hyperbaric"] },
];

function getAvailableServices(facilities: ReturnType<typeof toDirectoryFacility>[]) {
  const serviceText = facilities
    .flatMap((facility) => [...(facility.services || []), ...(facility.serviceKeys || []), ...(facility.bestFor || [])])
    .join(" ")
    .toLowerCase();

  return serviceLinks.filter((service) => service.keys.some((key) => serviceText.includes(key)));
}

function getSupportedRelatedAreas(currentSlug: string, relatedAreas: string[]) {
  const relatedTerms = relatedAreas.map(normalise);
  return neighbourhoodPages.filter((candidate) => {
    if (candidate.slug === currentSlug) return false;
    return relatedTerms.includes(normalise(candidate.shortTitle)) || relatedTerms.includes(normalise(candidate.title.replace("Wellness in ", "")));
  });
}

function buildSchema(page: NonNullable<ReturnType<typeof getNeighbourhoodPage>>, facilities: ReturnType<typeof toDirectoryFacility>[]) {
  const itemList = facilities.slice(0, 6).map((facility, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/facility/${facility.slug}`),
    name: facility.name,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl(page.href),
        url: absoluteUrl(page.href),
        name: page.metaTitle,
        description: page.metaDescription,
        isPartOf: { "@type": "WebSite", name: "Well+", url: absoluteUrl() },
        about: ["wellness", "recovery", page.shortTitle, "London"],
        mainEntity: itemList.length
          ? {
              "@type": "ItemList",
              itemListElement: itemList,
            }
          : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Neighbourhoods", item: absoluteUrl("/neighbourhoods") },
          { "@type": "ListItem", position: 3, name: page.shortTitle, item: absoluteUrl(page.href) },
        ],
      },
    ],
  };
}

export default async function NeighbourhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getNeighbourhoodPage(slug);

  if (!page) notFound();

  const facilities = await getFacilities();
  const searchTerms = [page.shortTitle].map(normalise);
  const relatedFacilities = facilities
    .map(toDirectoryFacility)
    .filter((facility) => {
      const locationText = normalise(
        [facility.neighbourhood, facility.location, facility.areaOfLondon, facility.areaGroup]
          .filter(Boolean)
          .join(" ")
      );

      return searchTerms.some((term) => locationText.includes(term));
    })
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0))
    .slice(0, 6);

  const availableServices = getAvailableServices(relatedFacilities);
  const supportedRelatedAreas = getSupportedRelatedAreas(page.slug, page.relatedAreas);
  const fallbackNeighbourhoods = neighbourhoodPages.filter((candidate) => candidate.slug !== page.slug).slice(0, 4);
  const schema = buildSchema(page, relatedFacilities);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <Script id={`neighbourhood-schema-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="px-5 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-5xl">
          <Link href="/neighbourhoods" className="mb-6 inline-block text-sm text-[#5f574c] underline underline-offset-4">
            London neighbourhood guides
          </Link>
          <p className="editorial-eyebrow mb-4">{page.eyebrow}</p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">
            {page.intro}
          </p>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Best for</p>
            <div className="flex flex-wrap gap-2">
              {page.bestFor.map((tag) => (
                <span key={tag} className="rounded-full border border-[#d8cebf] px-3 py-1 text-xs text-[#5f574c]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Wellness in the area</p>
            <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">{page.character}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Places to explore</p>
              <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                Wellness spaces around {page.shortTitle}.
              </h2>
            </div>
            <Link href="/explore" className="w-fit text-sm font-medium underline underline-offset-4">
              View all venues
            </Link>
          </div>

          {relatedFacilities.length > 0 ? (
            <div className="grid gap-5 sm:gap-7 md:grid-cols-3">
              {relatedFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source={`neighbourhood_${page.slug}`} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
              <h3 className="mb-3 text-2xl font-medium tracking-[-0.03em]">We are still building this neighbourhood edit.</h3>
              <p className="max-w-2xl text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
                We only show venues when they can be matched to the area with enough confidence. For now, explore the wider London directory or nearby supported neighbourhood guides.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/explore" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
                  Explore all venues
                </Link>
                {fallbackNeighbourhoods.slice(0, 3).map((neighbourhood) => (
                  <Link key={neighbourhood.href} href={neighbourhood.href} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
                    {neighbourhood.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">What to expect</p>
            <p className="mb-5 text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">{page.summary}</p>
            <div className="space-y-4">
              {page.visitNotes.map((note) => (
                <p key={note} className="text-sm leading-7 text-[#5f574c]">
                  {note}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Services in {page.shortTitle}</p>
            {availableServices.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {availableServices.map((service) => (
                  <Link key={service.href} href={service.href} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
                    {service.label} in London
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-7 text-[#5f574c]">
                Service availability is being verified for this neighbourhood. Explore the wider London edit while we refine the local venue data.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Local questions</p>
            <div className="space-y-6">
              <div>
                <h2 className="mb-2 text-xl font-medium tracking-[-0.03em]">What kind of wellness is {page.shortTitle} best for?</h2>
                <p className="text-sm leading-7 text-[#5f574c]">{page.summary}</p>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-medium tracking-[-0.03em]">Are there curated venues in {page.shortTitle}?</h2>
                <p className="text-sm leading-7 text-[#5f574c]">
                  {relatedFacilities.length > 0
                    ? `Yes — this guide currently highlights ${relatedFacilities.length} venue${relatedFacilities.length === 1 ? "" : "s"} matched to ${page.shortTitle} based on the available location data.`
                    : "We are still verifying venues for this area, so the page avoids showing unrelated listings just to fill the space."}
                </p>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-medium tracking-[-0.03em]">How should I choose a venue in {page.shortTitle}?</h2>
                <p className="text-sm leading-7 text-[#5f574c]">
                  Start with the type of session you want — heat, cold, recovery treatment or a slower reset — then compare atmosphere, location, price and whether the experience is private, shared or guided.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Continue exploring</p>
            <div className="flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
                  {link.label}
                </Link>
              ))}
              {(supportedRelatedAreas.length > 0 ? supportedRelatedAreas : fallbackNeighbourhoods).slice(0, 4).map((neighbourhood) => (
                <Link key={neighbourhood.href} href={neighbourhood.href} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
                  {neighbourhood.shortTitle}
                </Link>
              ))}
            </div>
            {supportedRelatedAreas.length === 0 ? (
              <p className="mt-5 text-xs leading-6 text-[#8d7d67]">
                Related neighbourhood links are limited to supported Well+ area pages, so we avoid sending readers to unfinished local guides.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
