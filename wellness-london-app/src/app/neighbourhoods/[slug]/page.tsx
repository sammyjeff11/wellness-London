import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { getAvailableNeighbourhoods, getFacilitiesForNeighbourhood } from "@/lib/location-directory";
import { londonRegions } from "@/lib/location-hubs";
import { getNeighbourhoodPage, neighbourhoodPages } from "@/lib/neighbourhood-pages";
import { absoluteUrl } from "@/lib/site";
import { normaliseServiceInput, serviceTaxonomy } from "@/lib/taxonomy";

export async function generateStaticParams() {
  const facilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));
  return getAvailableNeighbourhoods(facilities, neighbourhoodPages)
    .filter(({ page }) => page.slug !== "shoreditch")
    .map(({ page }) => ({ slug: page.slug }));
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
  { href: "/contrast-therapy-london", label: "Contrast Therapy", keys: ["contrast therapy", "hot and cold", "sauna and cold plunge"] },
  { href: "/recovery-london", label: "Recovery", keys: ["recovery", "compression", "sports recovery", "massage"] },
  { href: "/longevity", label: "Longevity", keys: ["longevity", "red light", "hbot", "hyperbaric"] },
];

const bestForChipClass = "rounded-full border border-[#d8cebf] px-3 py-1 text-xs text-[#5f574c]";
const linkedBestForChipClass = `${bestForChipClass} transition hover:bg-[#f4efe6] hover:text-[#29241d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f6048]`;

function getBestForServiceHref(label: string) {
  const normalisedLabel = normaliseServiceInput(label);
  if (!normalisedLabel) return undefined;

  const serviceTerms = serviceTaxonomy.flatMap((service) =>
    [service.name, service.slug, ...(service.synonyms || [])].map((term) => ({
      href: service.href,
      term: normaliseServiceInput(term),
    }))
  );
  const exactMatch = serviceTerms.find(({ href, term }) => href && term === normalisedLabel);
  if (exactMatch) return exactMatch.href;

  return serviceTerms
    .filter(({ href, term }) => href && term && (normalisedLabel.includes(term) || term.includes(normalisedLabel)))
    .sort((a, b) => b.term.length - a.term.length)[0]?.href;
}

function getAvailableServices(facilities: ReturnType<typeof toDirectoryFacility>[]) {
  return serviceLinks.filter((service) => facilities.some((facility) => facilityHasServiceLink(facility, service)));
}

function getServiceText(facility: ReturnType<typeof toDirectoryFacility>, includeServiceKeys = true) {
  return [
    ...(facility.services || []),
    ...(includeServiceKeys ? facility.serviceKeys || [] : []),
    ...(facility.bestFor || []),
    facility.description,
  ]
    .join(" ")
    .toLowerCase();
}

function facilityHasServiceLink(facility: ReturnType<typeof toDirectoryFacility>, service: (typeof serviceLinks)[number]): boolean {
  const text = getServiceText(facility);
  const explicitText = getServiceText(facility, false);

  if (service.href === "/cold-plunge-london") {
    return service.keys.some((key) => explicitText.includes(key));
  }

  if (service.href === "/contrast-therapy-london") {
    return (
      service.keys.some((key) => explicitText.includes(key)) ||
      (facilityHasServiceLink(facility, serviceLinks[0]) && facilityHasServiceLink(facility, serviceLinks[1]))
    );
  }

  return service.keys.some((key) => text.includes(key));
}

function getSupportedRelatedAreas(currentSlug: string, relatedAreas: string[], candidates = neighbourhoodPages) {
  const relatedTerms = relatedAreas.map(normalise);
  return candidates.filter((candidate) => {
    if (candidate.slug === currentSlug) return false;
    return relatedTerms.includes(normalise(candidate.shortTitle)) || relatedTerms.includes(normalise(candidate.title.replace("Wellness in ", "")));
  });
}

function getServiceCounts(facilities: ReturnType<typeof toDirectoryFacility>[]) {
  return serviceLinks
    .map((service) => {
      const count = facilities.filter((facility) => facilityHasServiceLink(facility, service)).length;

      return { ...service, count };
    })
    .filter((service) => service.count > 0);
}

function getWhatYouWillFind(facilities: ReturnType<typeof toDirectoryFacility>[]) {
  return Array.from(new Set(facilities.flatMap((facility) => facility.services || []))).slice(0, 8);
}

function getEditorNote(page: NonNullable<ReturnType<typeof getNeighbourhoodPage>>, facilities: ReturnType<typeof toDirectoryFacility>[]) {
  if (facilities.length >= 2) {
    const [first, second] = facilities;
    const firstServices = first.services?.slice(0, 2).join(" and ").toLowerCase() || "its listed services";
    const secondServices = second.services?.slice(0, 2).join(" and ").toLowerCase() || "its listed services";
    return `${first.name} is the stronger option for ${firstServices}; ${second.name} is the alternative for ${secondServices}. Compare their access model, session format and price before choosing between them.`;
  }

  if (facilities.length === 1) {
    const services = facilities[0].services?.slice(0, 3).join(", ").toLowerCase();
    return `${facilities[0].name} is currently the only published ${page.shortTitle} venue in the directory${services ? `, offering ${services}` : ""}. Check the wider ${page.region} guide if you want more choice.`;
  }

  return `This guide is intentionally conservative. We only show venues when they can be matched to ${page.shortTitle} with confidence, rather than filling the page with weak or unrelated results.`;
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

  const allFacilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));
  const displayFacilities = getFacilitiesForNeighbourhood(allFacilities, page.shortTitle)
    .sort((a, b) => (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0))
    .slice(0, 6);

  if (displayFacilities.length === 0) notFound();

  const availableNeighbourhoods = getAvailableNeighbourhoods(allFacilities, neighbourhoodPages);
  const availableNeighbourhoodPages = availableNeighbourhoods.map(({ page: availablePage }) => availablePage);
  const region = londonRegions.find((candidate) => candidate.name === page.region);

  const availableServices = getAvailableServices(displayFacilities);
  const serviceCounts = getServiceCounts(displayFacilities);
  const whatYouWillFind = getWhatYouWillFind(displayFacilities);
  const supportedRelatedAreas = getSupportedRelatedAreas(page.slug, page.relatedAreas, availableNeighbourhoodPages);
  const fallbackNeighbourhoods = availableNeighbourhoodPages.filter((candidate) => candidate.slug !== page.slug).slice(0, 4);
  const schema = buildSchema(page, displayFacilities);
  const editorNote = getEditorNote(page, displayFacilities);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <Script id={`neighbourhood-schema-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="px-5 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#6f6048]">
            <Link href="/neighbourhoods" className="underline-offset-4 hover:underline">Areas</Link>
            {region ? (
              <>
                <span aria-hidden="true">/</span>
                <Link href={region.href} className="underline-offset-4 hover:underline">{region.name}</Link>
              </>
            ) : null}
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#29241d]">{page.shortTitle}</span>
          </nav>
          <p className="editorial-eyebrow mb-4">{page.eyebrow}</p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">
            {page.intro}
          </p>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 max-w-3xl">
            <p className="editorial-eyebrow mb-3">Know the neighbourhood</p>
            <h2 className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">What the area feels like — and what it does best.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="surface-paper rounded-[1.25rem] p-6 sm:p-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">What the area is about</p>
              <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">{page.summary}</p>
            </article>
            <article className="surface-paper rounded-[1.25rem] p-6 sm:p-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Atmosphere</p>
              <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">{page.character}</p>
              <div className="mt-6 flex flex-wrap gap-2">
              {page.bestFor.map((tag) => {
                const serviceHref = getBestForServiceHref(tag);

                return serviceHref ? (
                  <Link
                    key={tag}
                    href={serviceHref}
                    aria-label={`Explore ${tag} venues in London`}
                    className={linkedBestForChipClass}
                  >
                    {tag}
                  </Link>
                ) : (
                  <span key={tag} className={bestForChipClass}>
                    {tag}
                  </span>
                );
              })}
              </div>
            </article>
            <article className="surface-paper rounded-[1.25rem] p-6 sm:p-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Plan the visit</p>
              <ul className="space-y-3 text-sm leading-7 text-[#5f574c]">
                {page.visitNotes.map((note) => <li key={note}>— {note}</li>)}
              </ul>
              <p className="mt-6 border-t border-[#d8cebf] pt-5 text-sm text-[#29241d]">
                {displayFacilities.length} published {displayFacilities.length === 1 ? "venue" : "venues"} in this edit
              </p>
            </article>
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

          {displayFacilities.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayFacilities.map((facility) => (
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
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Services represented</p>
            {whatYouWillFind.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {whatYouWillFind.map((service) => (
                  <span key={service} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm text-[#5f574c]">
                    {service}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
                The published venues do not yet have enough confirmed service detail to summarise here.
              </p>
            )}

            {serviceCounts.length > 0 ? (
              <div className="mt-6 border-t border-[#d8cebf]/70 pt-5">
                <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Services available at listed venues</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {serviceCounts.map((service) => (
                    <Link key={service.href} href={service.href} className="rounded-[0.9rem] border border-[#d8cebf] px-4 py-3 text-sm transition hover:bg-[#f4efe6]">
                      {service.label} available at {service.count} listed venue{service.count === 1 ? "" : "s"}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">How the venues differ</p>
            <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">{editorNote}</p>
            <div className="mt-6 border-t border-[#d8cebf]/70 pt-5">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Services in {page.shortTitle}</p>
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
                  No additional service guides are linked until the venue information is confirmed.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 md:py-10">
        <div className="mx-auto max-w-6xl">
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
          </div>
        </div>
      </section>
    </main>
  );
}
