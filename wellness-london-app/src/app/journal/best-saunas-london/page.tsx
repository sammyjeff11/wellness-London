import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import {
  directoryFacilityScore,
  facilityHasCollectionService,
  facilityMatchesFeaturedSection,
  type CollectionMatch,
} from "@/lib/collections";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";

export const metadata: Metadata = {
  title: "Best Saunas in London | The Well+ Journal",
  description:
    "A Well+ Journal guide to the best sauna experiences in London, including infrared sauna, sauna and cold plunge, premium wellness clubs and beginner-friendly recovery spaces.",
  alternates: { canonical: "/journal/best-saunas-london" },
  openGraph: {
    title: "Best Saunas in London | The Well+ Journal",
    description:
      "A curated editorial guide to London sauna spaces, from heat-and-cold recovery studios to premium wellness clubs.",
    url: absoluteUrl("/journal/best-saunas-london"),
    type: "article",
  },
};

type JournalPick = {
  label: string;
  title: string;
  description: string;
  match: CollectionMatch;
};

const journalPicks: JournalPick[] = [
  {
    label: "Best overall",
    title: "A strong first place to start",
    description:
      "For most people, the best sauna choice is not just the hottest room. It is the venue that combines clear access, good supporting facilities and enough detail to understand the experience before booking.",
    match: { serviceKeys: ["sauna", "infrared-sauna"] },
  },
  {
    label: "Best sauna + cold plunge",
    title: "For a fuller contrast ritual",
    description:
      "Choose this route if you want heat and cold in the same visit. These spaces are better suited to people looking for a repeatable recovery routine rather than a single passive treatment.",
    match: { allServiceKeys: ["sauna", "cold-plunge"] },
  },
  {
    label: "Best premium setting",
    title: "For a more elevated experience",
    description:
      "Some sauna visits are about convenience; others are about the room, service and atmosphere. This pick gives more weight to premium positioning and a considered wellness setting.",
    match: { serviceKeys: ["sauna", "infrared-sauna"], premiumLevelIncludes: ["premium", "luxury"] },
  },
  {
    label: "Best for first timers",
    title: "For fewer unknowns before booking",
    description:
      "A better starting point if you are new to sauna, infrared heat or contrast therapy and want a venue that feels easier to approach without needing to know the rituals already.",
    match: { serviceKeys: ["sauna", "infrared-sauna"], beginnerFriendly: true },
  },
];

function isSaunaVenue(facility: ServiceDirectoryFacility) {
  return facilityHasCollectionService(facility, "sauna") || facilityHasCollectionService(facility, "infrared-sauna");
}

function getLocationLine(facility: ServiceDirectoryFacility) {
  return [facility.neighbourhood || facility.location, facility.areaOfLondon || facility.areaGroup]
    .filter(Boolean)
    .join(" · ");
}

function getServiceLine(facility: ServiceDirectoryFacility) {
  return facility.services?.slice(0, 4).join(" · ") || "Sauna";
}

function editorialNote(facility: ServiceDirectoryFacility) {
  const location = getLocationLine(facility) || "London";
  const services = getServiceLine(facility).toLowerCase();
  const bestFor = facility.bestFor?.slice(0, 2).join(" and ").toLowerCase();
  const venueType = facility.venueType?.toLowerCase();

  if (bestFor) {
    return `${facility.name} is a useful sauna option in ${location}, particularly if you are looking for ${bestFor}. The listing signals ${services}, so it works best as part of a practical recovery shortlist rather than a generic spa search.`;
  }

  if (venueType) {
    return `${facility.name} brings sauna into a ${venueType} setting in ${location}. It is worth comparing if you care about the wider experience around the heat session, not just whether a sauna is available.`;
  }

  return `${facility.name} is included because it carries clear sauna signals in the Well+ directory. Use the full profile to compare services, setting, location and whether the experience fits the kind of recovery session you want.`;
}

function getCuratedPicks(facilities: ServiceDirectoryFacility[]) {
  const used = new Set<string>();

  return journalPicks.map((pick) => {
    const facility = facilities
      .filter((candidate) => !used.has(candidate.slug))
      .filter((candidate) => facilityMatchesFeaturedSection(candidate, pick.match))
      .sort((a, b) => directoryFacilityScore(b, pick.match) - directoryFacilityScore(a, pick.match))[0];

    if (facility) used.add(facility.slug);
    return { ...pick, facility };
  });
}

function articleJsonLd(facilities: ServiceDirectoryFacility[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Saunas in London",
    description:
      "A Well+ Journal guide to London sauna venues, including sauna and cold plunge, infrared sauna and premium recovery spaces.",
    author: {
      "@type": "Organization",
      name: "Well+",
    },
    publisher: {
      "@type": "Organization",
      name: "Well+",
    },
    mainEntityOfPage: absoluteUrl("/journal/best-saunas-london"),
    about: ["Sauna", "Infrared sauna", "Cold plunge", "Recovery", "London wellness"],
    mentions: facilities.slice(0, 8).map((facility) => ({
      "@type": "LocalBusiness",
      name: facility.name,
      url: absoluteUrl(`/facility/${facility.slug}`),
    })),
  };
}

function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Journal", item: absoluteUrl("/journal") },
      { "@type": "ListItem", position: 3, name: "Best Saunas in London", item: absoluteUrl("/journal/best-saunas-london") },
    ],
  };
}

export default async function BestSaunasJournalPage() {
  const facilities = await getFacilities();
  const saunaFacilities = dedupeFacilities(facilities.map(toDirectoryFacility))
    .filter(isSaunaVenue)
    .sort((a, b) => directoryFacilityScore(b) - directoryFacilityScore(a));
  const curatedPicks = getCuratedPicks(saunaFacilities);
  const visibleShortlist = saunaFacilities.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={[articleJsonLd(visibleShortlist), breadcrumbJsonLd()]} />

      <article>
        <section className="border-b border-[#d8cebf]/70 px-5 py-10 sm:px-6 sm:py-14 md:py-18">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-[#70695d]">
              <Link href="/" className="underline-offset-4 hover:text-[#29241d] hover:underline">Home</Link>
              <span>/</span>
              <Link href="/journal" className="underline-offset-4 hover:text-[#29241d] hover:underline">Journal</Link>
            </nav>

            <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <aside className="rounded-[1.2rem] border border-[#29241d]/14 bg-[#29241d] p-5 text-[#fbf8f1] shadow-[0_22px_65px_rgba(41,36,29,0.12)] sm:p-6">
                <p className="text-[11px] uppercase tracking-[0.26em] text-[#fbf8f1]/58">Journal Artifact</p>
                <div className="mt-12 border-t border-[#fbf8f1]/18 pt-5">
                  <p className="font-serif text-3xl leading-none tracking-[-0.03em]">Heat Edit 001</p>
                  <dl className="mt-6 space-y-4 text-sm leading-6 text-[#fbf8f1]/74">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/46">Focus</dt>
                      <dd>Sauna, infrared heat and sauna-paired recovery spaces</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/46">Area</dt>
                      <dd>London</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/46">Built from</dt>
                      <dd>{saunaFacilities.length} live Well+ sauna listings</dd>
                    </div>
                  </dl>
                </div>
              </aside>

              <div>
                <p className="editorial-eyebrow mb-5">The Well+ Journal</p>
                <h1 className="max-w-4xl font-serif text-[3.7rem] font-normal leading-[0.9] tracking-[-0.025em] sm:text-7xl md:text-8xl">
                  Best saunas in London.
                </h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f574c] sm:text-xl sm:leading-9">
                  A practical editorial shortlist for finding sauna in London — from infrared rooms and recovery studios to fuller heat-and-cold rituals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="editorial-eyebrow sticky top-28">Editor&apos;s note</p>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
              <p>
                The best sauna in London depends on what you want the visit to do. A post-gym recovery session, a quiet infrared reset and a social sauna-and-cold-plunge ritual are not the same booking decision.
              </p>
              <p>
                This Journal guide is deliberately more editorial than the directory. The cards below still link back into live Well+ venue profiles, but each pick is framed by use case: where to start, when to choose contrast, and when the setting matters as much as the treatment.
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-4 border-y border-[#d8cebf]/70 py-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-eyebrow mb-3">Quick picks</p>
                <h2 className="font-serif text-[2.5rem] font-normal leading-[1] tracking-[-0.02em] sm:text-5xl">Start here.</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
                Four editorial angles, selected from live venue data so the guide remains connected to the directory rather than becoming a static blog post.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {curatedPicks.map((pick) => (
                <section key={pick.label} className="rounded-[1.45rem] border border-[#d8cebf]/80 bg-[#fbf8f1] p-5 shadow-[0_18px_55px_rgba(41,36,29,0.045)] sm:p-6">
                  <div className="mb-5 border-b border-[#d8cebf]/70 pb-5">
                    <p className="editorial-eyebrow mb-3">{pick.label}</p>
                    <h3 className="font-serif text-3xl font-normal leading-[1.05] tracking-[-0.02em]">{pick.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">{pick.description}</p>
                  </div>
                  {pick.facility ? (
                    <div className="space-y-5">
                      <FacilityCard facility={pick.facility} source="journal_best_saunas" compact />
                      <div className="rounded-[1rem] bg-[#f4efe6] p-4 text-sm leading-6 text-[#5f574c]">
                        <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Why it fits</p>
                        <p>{editorialNote(pick.facility)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[1rem] border border-dashed border-[#d8cebf] bg-[#f4efe6] p-5 text-sm leading-6 text-[#5f574c]">
                      No live venue currently has enough matching signals for this editorial angle.
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:items-end">
              <div>
                <p className="editorial-eyebrow mb-3">The shortlist</p>
                <h2 className="font-serif text-[2.5rem] font-normal leading-[1] tracking-[-0.02em] sm:text-5xl">More sauna spaces to compare.</h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
                These are not ranked reviews. They are live sauna-relevant venues from Well+ arranged as an editorial shortlist, with profile links for deeper comparison.
              </p>
            </div>

            <div className="space-y-5">
              {visibleShortlist.map((facility, index) => (
                <section key={facility.slug} className="grid gap-5 rounded-[1.45rem] border border-[#d8cebf]/80 bg-[#fbf8f1] p-5 sm:p-6 lg:grid-cols-[0.55fr_0.45fr] lg:items-start">
                  <div>
                    <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#8d7d67]">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="h-px flex-1 bg-[#d8cebf]" />
                      <span>{getLocationLine(facility) || "London"}</span>
                    </div>
                    <FacilityCard facility={facility} source="journal_best_saunas_shortlist" compact />
                  </div>
                  <div className="rounded-[1.1rem] bg-[#f4efe6] p-5 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
                    <p className="editorial-eyebrow mb-3">Journal note</p>
                    <p>{editorialNote(facility)}</p>
                    <Link href={`/facility/${facility.slug}`} className="mt-5 inline-block text-sm font-medium text-[#29241d] underline underline-offset-4">
                      Read the Well+ profile
                    </Link>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[1.45rem] bg-[#29241d] p-6 text-[#fbf8f1] sm:p-8 md:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#fbf8f1]/58">How to choose</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="font-serif text-2xl font-normal">Choose the format.</h3>
                <p className="mt-3 text-sm leading-6 text-[#fbf8f1]/72">Infrared sauna, traditional heat and sauna-paired cold plunge all suit different kinds of visit.</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-normal">Check the setting.</h3>
                <p className="mt-3 text-sm leading-6 text-[#fbf8f1]/72">A recovery studio, spa, bathhouse and gym-based sauna will feel very different in practice.</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-normal">Match the ritual.</h3>
                <p className="mt-3 text-sm leading-6 text-[#fbf8f1]/72">For a deeper recovery session, look for cold plunge, showers, guidance and enough time between rounds.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-14 pt-4 sm:px-6 sm:pb-20">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[#d8cebf]/70 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="editorial-eyebrow mb-2">Continue exploring</p>
              <p className="text-sm leading-6 text-[#5f574c]">Move from the Journal into live directory pages for more filtering and comparison.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/sauna-london" className="rounded-full border border-[#29241d]/18 px-4 py-2 text-sm text-[#29241d] transition hover:bg-[#29241d] hover:text-[#fbf8f1]">Saunas in London</Link>
              <Link href="/cold-plunge-london" className="rounded-full border border-[#29241d]/18 px-4 py-2 text-sm text-[#29241d] transition hover:bg-[#29241d] hover:text-[#fbf8f1]">Cold plunge</Link>
              <Link href="/collections/best-sauna-london" className="rounded-full border border-[#29241d]/18 px-4 py-2 text-sm text-[#29241d] transition hover:bg-[#29241d] hover:text-[#fbf8f1]">Directory collection</Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
