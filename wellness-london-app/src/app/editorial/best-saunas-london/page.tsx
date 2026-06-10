import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
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
  title: "Best Saunas in London | Well+ Editorial",
  description:
    "A Well+ Editorial guide to the best sauna experiences in London, including infrared sauna, sauna and cold plunge, premium wellness clubs and beginner-friendly recovery spaces.",
  alternates: { canonical: "/editorial/best-saunas-london" },
  openGraph: {
    title: "Best Saunas in London | Well+ Editorial",
    description:
      "A curated editorial guide to London sauna spaces, from heat-and-cold recovery studios to premium wellness clubs.",
    url: absoluteUrl("/editorial/best-saunas-london"),
    type: "article",
  },
};

type EditorialPick = {
  label: string;
  title: string;
  description: string;
  match: CollectionMatch;
};

const editorialPicks: EditorialPick[] = [
  {
    label: "Best overall",
    title: "The most useful first shortlist",
    description:
      "A strong all-round sauna option should be clear, bookable and useful beyond simply having heat available.",
    match: { serviceKeys: ["sauna", "infrared-sauna"] },
  },
  {
    label: "Best for contrast",
    title: "When you want heat and cold together",
    description:
      "This is the better route if you want a fuller sauna-and-cold-plunge ritual rather than a single heat session.",
    match: { allServiceKeys: ["sauna", "cold-plunge"] },
  },
  {
    label: "Best premium setting",
    title: "When the room matters as much as the ritual",
    description:
      "Some sauna visits are about the wider environment: privacy, hospitality, finish and the feeling of the space around the session.",
    match: { serviceKeys: ["sauna", "infrared-sauna"], premiumLevelIncludes: ["premium", "luxury"] },
  },
  {
    label: "Best for first timers",
    title: "A softer way into sauna culture",
    description:
      "A better starting point if you are new to sauna, infrared heat or contrast therapy and want fewer unknowns before booking.",
    match: { serviceKeys: ["sauna", "infrared-sauna"], beginnerFriendly: true },
  },
];

function isSaunaVenue(facility: ServiceDirectoryFacility) {
  return facilityHasCollectionService(facility, "sauna") || facilityHasCollectionService(facility, "infrared-sauna");
}

function getLocationLine(facility: ServiceDirectoryFacility) {
  return [facility.neighbourhood || facility.location, facility.areaOfLondon || facility.areaGroup].filter(Boolean).join(" · ");
}

function getServiceLine(facility: ServiceDirectoryFacility) {
  return facility.services?.slice(0, 4).join(" · ") || "Sauna";
}

function getBestForLine(facility: ServiceDirectoryFacility) {
  return facility.bestFor?.slice(0, 3).join(" · ") || facility.venueType || "Sauna and recovery";
}

function getHeroImage(facility?: ServiceDirectoryFacility) {
  if (!facility) return undefined;
  const galleryImage = facility.galleryImages?.find((image) => image.url);
  return galleryImage?.url || facility.imageUrl;
}

function editorialNote(facility: ServiceDirectoryFacility) {
  const location = getLocationLine(facility) || "London";
  const services = getServiceLine(facility).toLowerCase();
  const bestFor = facility.bestFor?.slice(0, 2).join(" and ").toLowerCase();
  const venueType = facility.venueType?.toLowerCase();

  if (bestFor) {
    return `${facility.name} earns a place in this edit because it gives the sauna search a more specific use case: ${bestFor}. For readers comparing London sauna options, it is worth viewing through the lens of ${services} in ${location}, rather than treating every sauna listing as interchangeable.`;
  }

  if (venueType) {
    return `${facility.name} brings sauna into a ${venueType} setting in ${location}. That matters because the atmosphere around a heat session often changes the decision as much as the treatment menu itself.`;
  }

  return `${facility.name} is included because it carries clear sauna signals in the Well+ directory. The full profile is the place to compare services, setting, location and whether the visit fits your preferred style of recovery.`;
}

function getCuratedPicks(facilities: ServiceDirectoryFacility[]) {
  const used = new Set<string>();

  return editorialPicks
    .map((pick) => {
      const facility = facilities
        .filter((candidate) => !used.has(candidate.slug))
        .filter((candidate) => facilityMatchesFeaturedSection(candidate, pick.match))
        .sort((a, b) => directoryFacilityScore(b, pick.match) - directoryFacilityScore(a, pick.match))[0];

      if (facility) used.add(facility.slug);
      return { ...pick, facility };
    })
    .filter((pick) => pick.facility);
}

function articleJsonLd(facilities: ServiceDirectoryFacility[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Saunas in London",
    description:
      "A Well+ Editorial guide to London sauna venues, including sauna and cold plunge, infrared sauna and premium recovery spaces.",
    author: { "@type": "Organization", name: "Well+" },
    publisher: { "@type": "Organization", name: "Well+" },
    mainEntityOfPage: absoluteUrl("/editorial/best-saunas-london"),
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
      { "@type": "ListItem", position: 2, name: "Editorial", item: absoluteUrl("/editorial") },
      { "@type": "ListItem", position: 3, name: "Best Saunas in London", item: absoluteUrl("/editorial/best-saunas-london") },
    ],
  };
}

function EditorialVenueEntry({ facility, index }: { facility: ServiceDirectoryFacility; index: number }) {
  const imageUrl = getHeroImage(facility);
  const location = getLocationLine(facility) || "London";
  const services = getServiceLine(facility);

  return (
    <article className="group border-t border-[#29241d]/18 py-8 first:border-t-0 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[0.25fr_0.48fr_0.27fr] lg:items-start">
        <p className="font-serif text-5xl font-normal leading-none tracking-[-0.04em] text-[#29241d]/34 sm:text-6xl">
          {String(index + 1).padStart(2, "0")}
        </p>

        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">{location}</p>
          <h2 className="font-serif text-[2.45rem] font-normal leading-[0.98] tracking-[-0.025em] text-[#29241d] sm:text-5xl">
            {facility.name}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
            {editorialNote(facility)}
          </p>

          <dl className="mt-6 grid gap-3 border-y border-[#d8cebf]/80 py-4 text-sm leading-6 text-[#5f574c] sm:grid-cols-3">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Services</dt>
              <dd>{services}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Best for</dt>
              <dd>{getBestForLine(facility)}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Price signal</dt>
              <dd>{facility.priceRange || facility.priceFrom || "Check venue"}</dd>
            </div>
          </dl>

          <Link href={`/facility/${facility.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#29241d] underline underline-offset-4 transition group-hover:gap-3">
            Read the Well+ profile <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative min-h-56 overflow-hidden rounded-t-full rounded-b-[1.4rem] bg-[#d8cebf] lg:min-h-72">
          {imageUrl ? (
            <SafeImage
              src={imageUrl}
              alt={facility.imageAlt || facility.name}
              fill
              sizes="(min-width: 1024px) 28vw, 100vw"
              className="object-cover grayscale-[15%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_22%,rgba(251,248,241,0.74),transparent_30%),linear-gradient(145deg,rgba(244,239,230,0.95),rgba(194,177,153,0.58)_48%,rgba(41,36,29,0.18))]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#29241d]/28 via-transparent to-transparent" />
        </div>
      </div>
    </article>
  );
}

export default async function BestSaunasEditorialPage() {
  const facilities = await getFacilities();
  const saunaFacilities = dedupeFacilities(facilities.map(toDirectoryFacility))
    .filter(isSaunaVenue)
    .sort((a, b) => directoryFacilityScore(b) - directoryFacilityScore(a));
  const curatedPicks = getCuratedPicks(saunaFacilities);
  const visibleShortlist = saunaFacilities.slice(0, 8);
  const heroImage = getHeroImage(visibleShortlist[0]);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={[articleJsonLd(visibleShortlist), breadcrumbJsonLd()]} />

      <article>
        <section className="relative isolate overflow-hidden bg-[#29241d] text-[#fbf8f1]">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#fbf8f1_1px,transparent_1px),linear-gradient(#fbf8f1_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto grid max-w-[1500px] lg:min-h-[760px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
              <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-[#fbf8f1]/62">
                <Link href="/" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Home</Link>
                <span>/</span>
                <Link href="/editorial" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Editorial</Link>
              </nav>

              <div className="mt-24 max-w-2xl lg:mt-0">
                <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#cbbda8]">Well+ Editorial · Heat Edit 001</p>
                <h1 className="font-serif text-[4.4rem] font-normal leading-[0.82] tracking-[-0.04em] sm:text-8xl lg:text-[8.5rem]">
                  Best saunas in London.
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-8 text-[#fbf8f1]/74 sm:text-xl sm:leading-9">
                  An editorial guide to London sauna spaces — written for people choosing a ritual, not just browsing a list.
                </p>
              </div>

              <div className="mt-14 grid gap-4 border-t border-[#fbf8f1]/16 pt-5 text-sm leading-6 text-[#fbf8f1]/68 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Focus</p>
                  <p>Sauna and infrared heat</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Format</p>
                  <p>Editorial shortlist</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Source</p>
                  <p>{saunaFacilities.length} live listings</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[420px] border-t border-[#fbf8f1]/16 lg:border-l lg:border-t-0">
              {heroImage ? (
                <SafeImage
                  src={heroImage}
                  alt="London sauna editorial feature"
                  fill
                  priority
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="object-cover grayscale-[22%]"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(251,248,241,0.16),transparent_28%),linear-gradient(145deg,rgba(111,96,72,0.62),rgba(41,36,29,0.96))]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#29241d]/78 via-[#29241d]/22 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
                <p className="max-w-md font-serif text-3xl font-normal leading-[1.05] tracking-[-0.02em] text-[#fbf8f1] sm:text-4xl">
                  Heat, cold, atmosphere, access — the details that change the booking decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.32fr_0.68fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 border-l border-[#29241d]/18 pl-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Editorial note</p>
                <p className="mt-5 max-w-xs font-serif text-2xl font-normal leading-[1.08] tracking-[-0.02em] text-[#29241d]">
                  This is not the directory. It is the editorial layer that helps interpret it.
                </p>
              </div>
            </aside>

            <div className="max-w-3xl">
              <p className="font-serif text-3xl font-normal leading-[1.16] tracking-[-0.02em] text-[#29241d] sm:text-4xl">
                The best sauna in London depends less on heat alone, and more on what kind of recovery experience you are trying to build around it.
              </p>
              <div className="mt-8 space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
                <p>
                  A post-gym recovery session, a quiet infrared reset, and a social sauna-and-cold-plunge ritual are different decisions. This edit makes those differences visible before you click into the directory.
                </p>
                <p>
                  The venues below are pulled from live Well+ listings, but they are presented as editorial entries: numbered, contextual and written around use case rather than arranged as a standard results grid.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-6xl border-y border-[#29241d]/18 py-8">
            <div className="mb-8 grid gap-5 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Quick editorial picks</p>
              <h2 className="font-serif text-[3rem] font-normal leading-[0.92] tracking-[-0.03em] sm:text-6xl">
                Four ways to choose.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[1.4rem] border border-[#d8cebf]/80 bg-[#d8cebf]/80 md:grid-cols-2">
              {curatedPicks.map((pick, index) => (
                pick.facility ? (
                  <Link key={pick.label} href={`/facility/${pick.facility.slug}`} className="group bg-[#fbf8f1] p-5 transition hover:bg-[#29241d] hover:text-[#fbf8f1] sm:p-6">
                    <div className="mb-10 flex items-start justify-between gap-6">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67] transition group-hover:text-[#cbbda8]">{pick.label}</p>
                      <p className="font-serif text-4xl leading-none tracking-[-0.04em] text-[#29241d]/28 transition group-hover:text-[#fbf8f1]/28">0{index + 1}</p>
                    </div>
                    <h3 className="font-serif text-3xl font-normal leading-[1] tracking-[-0.02em]">{pick.facility.name}</h3>
                    <p className="mt-4 text-sm leading-6 text-[#5f574c] transition group-hover:text-[#fbf8f1]/72">{pick.description}</p>
                    <p className="mt-6 text-sm underline underline-offset-4">Read profile →</p>
                  </Link>
                ) : null
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 grid gap-5 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">The edit</p>
              <h2 className="font-serif text-[3rem] font-normal leading-[0.92] tracking-[-0.03em] sm:text-6xl">
                Sauna spaces worth comparing.
              </h2>
            </div>
            <p className="ml-auto max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
              These entries are intentionally slower than directory cards. Each one gives the venue a reason to be considered, then points you into the full Well+ profile for practical details.
            </p>

            <div className="mt-10">
              {visibleShortlist.map((facility, index) => (
                <EditorialVenueEntry key={facility.slug} facility={facility} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 pt-6 sm:px-6 sm:pb-24">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#29241d] p-6 text-[#fbf8f1] sm:p-8 lg:grid-cols-[0.32fr_0.68fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#fbf8f1]/58">Before booking</p>
            </div>
            <div>
              <h2 className="font-serif text-4xl font-normal leading-[1] tracking-[-0.02em] sm:text-5xl">
                Choose by ritual, not just by treatment.
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <div>
                  <h3 className="font-serif text-2xl font-normal">Heat type</h3>
                  <p className="mt-3 text-sm leading-6 text-[#fbf8f1]/72">Infrared and traditional sauna can feel different in intensity, setting and session style.</p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal">Cold access</h3>
                  <p className="mt-3 text-sm leading-6 text-[#fbf8f1]/72">If contrast matters, check whether cold plunge is part of the same visit rather than nearby.</p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal">Setting</h3>
                  <p className="mt-3 text-sm leading-6 text-[#fbf8f1]/72">A spa, gym, bathhouse and recovery studio can all offer sauna, but the experience is not the same.</p>
                </div>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/sauna-london" className="rounded-full border border-[#fbf8f1]/22 px-4 py-2 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">Explore sauna directory</Link>
                <Link href="/editorial" className="rounded-full border border-[#fbf8f1]/22 px-4 py-2 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">Back to Editorial</Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
