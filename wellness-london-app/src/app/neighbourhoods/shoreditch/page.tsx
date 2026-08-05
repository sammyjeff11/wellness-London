import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { getFacilitiesForNeighbourhood } from "@/lib/location-directory";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shoreditch Sauna, Cold Plunge & Wellness Venues | Well+",
  description:
    "Compare Shoreditch sauna, cold plunge and contrast therapy venues by format, access, price and atmosphere, including guided and self-led sessions.",
  alternates: { canonical: "/neighbourhoods/shoreditch" },
  openGraph: {
    title: "Shoreditch Sauna, Cold Plunge & Wellness Venues | Well+",
    description:
      "Compare Shoreditch sauna, cold plunge and contrast therapy venues by format, access, price and atmosphere.",
    url: "/neighbourhoods/shoreditch",
    type: "website",
  },
};

type DirectoryFacility = ReturnType<typeof toDirectoryFacility>;

const venueGuidance: Record<
  string,
  {
    label: string;
    summary: string;
    note: string;
  }
> = {
  "sauna-and-plunge-shoreditch": {
    label: "Best for self-led contrast",
    summary: "Finnish and infrared sauna with cold plunges, plus a separate studio programme.",
    note: "A stronger fit when you want to control your own heat-and-cold rhythm rather than follow a fully guided ritual.",
  },
  "and-soul-shoreditch": {
    label: "Best for guided and social recovery",
    summary: "Sauna and cold plunge alongside Reformer Pilates, hot yoga, strength and a café.",
    note: "A broader social-wellness option where recovery, movement and time in the venue are part of the same visit.",
  },
  "soho-house-shoreditch-house": {
    label: "Best for a private club setting",
    summary: "Gym, spa treatments, classes and rooftop swimming inside a members' club.",
    note: "Useful for members seeking a wider health-club experience, but not a dedicated public contrast-therapy venue.",
  },
};

const faqs = [
  {
    question: "Where can I find sauna and cold plunge in Shoreditch?",
    answer:
      "The published Well+ directory currently includes Sauna & Plunge and The Sanctuary as Shoreditch venues where sauna and cold-water recovery are central to the offer. Compare the session format and access rules before booking.",
  },
  {
    question: "Are there guided contrast therapy classes in Shoreditch?",
    answer:
      "Yes. Shoreditch has both guided heat-and-cold sessions and more self-led access. Check the live timetable because guided classes, open sessions and movement classes can have different booking rules.",
  },
  {
    question: "Is a cold plunge the same as an ice bath?",
    answer:
      "The terms are often used interchangeably for cold-water immersion. In practice, the temperature, tub design, session length and level of guidance vary by venue.",
  },
  {
    question: "Do I need a membership for Shoreditch wellness venues?",
    answer:
      "Not always. Some Shoreditch venues offer public bookings, class packs or introductory sessions, while Shoreditch House is a private members' club. Check the current access model before travelling.",
  },
];

function formatPrice(facility: DirectoryFacility) {
  if (facility.priceFrom) return facility.priceFrom;
  return facility.priceRange || "Check current price";
}

function formatAccess(facility: DirectoryFacility) {
  const values = [facility.privateOrShared, facility.accessType].filter(
    (value, index, array): value is string => Boolean(value) && array.indexOf(value) === index,
  );
  return values.join(" · ") || "Check venue access";
}

function formatServices(facility: DirectoryFacility) {
  return facility.services?.slice(0, 4).join(", ") || "See venue profile";
}

function buildSchema(facilities: DirectoryFacility[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl("/neighbourhoods/shoreditch"),
        url: absoluteUrl("/neighbourhoods/shoreditch"),
        name: "Shoreditch sauna, cold plunge and wellness venues",
        description:
          "A comparison-led guide to Shoreditch sauna, cold plunge, contrast therapy and wider wellness venues.",
        isPartOf: { "@type": "WebSite", name: "Well+", url: absoluteUrl() },
        about: ["Shoreditch", "sauna", "cold plunge", "contrast therapy", "wellness"],
        mainEntity: {
          "@type": "ItemList",
          itemListElement: facilities.map((facility, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: facility.name,
            url: absoluteUrl(`/facility/${facility.slug}`),
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Areas", item: absoluteUrl("/neighbourhoods") },
          { "@type": "ListItem", position: 3, name: "East London", item: absoluteUrl("/east-london-wellness") },
          { "@type": "ListItem", position: 4, name: "Shoreditch", item: absoluteUrl("/neighbourhoods/shoreditch") },
        ],
      },
    ],
  };
}

export default async function ShoreditchNeighbourhoodPage() {
  const allFacilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));
  const facilities = getFacilitiesForNeighbourhood(allFacilities, "Shoreditch")
    .sort((a, b) => (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0))
    .slice(0, 6);

  if (facilities.length === 0) notFound();

  const guidedFacilities = facilities.filter((facility) => venueGuidance[facility.slug]);
  const schema = buildSchema(facilities);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <Script
        id="shoreditch-neighbourhood-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="px-5 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#6f6048]">
            <Link href="/neighbourhoods" className="underline-offset-4 hover:underline">Areas</Link>
            <span aria-hidden="true">/</span>
            <Link href="/east-london-wellness" className="underline-offset-4 hover:underline">East London</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#29241d]">Shoreditch</span>
          </nav>

          <p className="editorial-eyebrow mb-4">East London heat and cold</p>
          <h1 className="max-w-5xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-7xl md:text-8xl">
            Sauna, cold plunge and wellness in Shoreditch.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">
            Shoreditch is one of London's clearest clusters for modern contrast therapy: shared saunas, cold-water immersion, guided heat-and-cold sessions and movement studios built around regular use rather than an occasional spa day.
          </p>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="surface-paper rounded-[1.25rem] p-6 sm:p-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">What the area does well</p>
              <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
                Heat and cold are the local strength. The best-known venues combine sauna and plunge in one visit, with options ranging from independent self-led rounds to instructor-led classes and broader social-wellness clubs.
              </p>
            </article>
            <article className="surface-paper rounded-[1.25rem] p-6 sm:p-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Atmosphere</p>
              <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
                Urban, social and design-conscious rather than hushed or hotel-like. These spaces tend to sit alongside cafés, movement studios and community events, making them easier to build into a working week.
              </p>
            </article>
            <article className="surface-paper rounded-[1.25rem] p-6 sm:p-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Choose carefully</p>
              <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
                Check whether the session is guided or self-led, whether swimwear and advance booking are required, what towels and changing facilities are included, and whether access is public or membership-based.
              </p>
            </article>
          </div>
        </div>
      </section>

      {guidedFacilities.length > 0 ? (
        <section className="px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="shoreditch-format-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 grid gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-end">
              <div>
                <p className="editorial-eyebrow mb-3">Choose by experience</p>
                <h2 id="shoreditch-format-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">
                  Similar services, different ways to use them.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:justify-self-end sm:text-base">
                A long facilities list does not tell you whether a venue will feel right. Start with the format you want, then compare price, access and location.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {guidedFacilities.map((facility) => {
                const guidance = venueGuidance[facility.slug];
                return (
                  <article key={facility.slug} className="surface-paper flex h-full flex-col rounded-[1.25rem] p-6 sm:p-7">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">{guidance.label}</p>
                    <h3 className="mt-4 font-serif text-3xl font-normal leading-none tracking-[-0.035em]">{facility.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5f574c]">{guidance.summary}</p>
                    <p className="mt-4 border-t border-[#d8cebf]/75 pt-4 text-sm leading-7 text-[#5f574c]">{guidance.note}</p>
                    <Link href={`/facility/${facility.slug}`} className="mt-6 text-sm font-medium underline underline-offset-4">
                      View venue profile →
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="shoreditch-comparison-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="editorial-eyebrow mb-3">At a glance</p>
            <h2 id="shoreditch-comparison-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">
              Compare Shoreditch wellness venues.
            </h2>
          </div>

          <div className="overflow-x-auto rounded-[1.25rem] border border-[#d8cebf]/80 bg-[#f4efe6]">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#d8cebf]/80 text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">
                  <th className="px-5 py-4 font-medium">Venue</th>
                  <th className="px-5 py-4 font-medium">Core services</th>
                  <th className="px-5 py-4 font-medium">Format and access</th>
                  <th className="px-5 py-4 font-medium">Price signal</th>
                  <th className="px-5 py-4 font-medium">Location</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map((facility) => (
                  <tr key={facility.slug} className="border-b border-[#d8cebf]/65 last:border-b-0">
                    <td className="px-5 py-5 align-top">
                      <Link href={`/facility/${facility.slug}`} className="font-medium underline-offset-4 hover:underline">
                        {facility.name}
                      </Link>
                    </td>
                    <td className="px-5 py-5 align-top text-sm leading-6 text-[#5f574c]">{formatServices(facility)}</td>
                    <td className="px-5 py-5 align-top text-sm leading-6 text-[#5f574c]">{formatAccess(facility)}</td>
                    <td className="px-5 py-5 align-top text-sm leading-6 text-[#5f574c]">{formatPrice(facility)}</td>
                    <td className="px-5 py-5 align-top text-sm leading-6 text-[#5f574c]">{facility.nearestStation || facility.address || "Shoreditch"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-6 text-[#6f6048]">
            Prices, timetables and access rules can change. Use the venue profile as a starting point and confirm the live booking details before travelling.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Published listings</p>
              <h2 className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Wellness spaces in Shoreditch.</h2>
            </div>
            <Link href="/explore" className="w-fit text-sm font-medium underline underline-offset-4">View all London venues</Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} source="neighbourhood_shoreditch_deep_guide" />
            ))}
          </div>
        </div>
      </section>

      <section className="surface-band-sage px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <article className="surface-paper rounded-[1.25rem] p-6 sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Cold plunge or ice bath?</p>
            <h2 className="font-serif text-3xl font-normal leading-none tracking-[-0.035em]">Start with the cold-water format.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5f574c] sm:text-base">
              Cold plunge, ice bath and cold-water immersion often describe the same broad practice. What matters when choosing a venue is the actual temperature, the number and size of tubs, whether guidance is available and whether cold access is sold alone or alongside sauna.
            </p>
            <Link href="/cold-plunge-london" className="mt-6 inline-block text-sm font-medium underline underline-offset-4">Compare cold plunge venues in London →</Link>
          </article>

          <article className="surface-paper rounded-[1.25rem] p-6 sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Contrast therapy</p>
            <h2 className="font-serif text-3xl font-normal leading-none tracking-[-0.035em]">Decide how much structure you want.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5f574c] sm:text-base">
              Self-led sessions give you more control over timing and intensity. Guided classes add breathwork, pacing and group facilitation. Neither is automatically better; the right choice depends on your experience and what you want from the visit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contrast-therapy-london" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">Contrast therapy in London</Link>
              <Link href="/collections/best-contrast-therapy-london" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">Best contrast therapy venues</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="shoreditch-faq-heading">
        <div className="surface-paper mx-auto max-w-4xl rounded-[1.25rem] p-6 sm:p-9">
          <p className="editorial-eyebrow mb-3">Practical questions</p>
          <h2 id="shoreditch-faq-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Shoreditch wellness FAQs.</h2>
          <div className="mt-8 divide-y divide-[#d8cebf]/75">
            {faqs.map((item) => (
              <article key={item.question} className="py-6 first:pt-0 last:pb-0">
                <h3 className="text-lg font-medium">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-6 sm:pb-18">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3 border-t border-[#d8cebf]/80 pt-8">
          <Link href="/sauna-london" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#fbf8f1]">Saunas in London</Link>
          <Link href="/cold-plunge-london" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#fbf8f1]">Cold plunge in London</Link>
          <Link href="/contrast-therapy-london" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#fbf8f1]">Contrast therapy in London</Link>
          <Link href="/east-london-wellness" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#fbf8f1]">East London wellness</Link>
        </div>
      </section>
    </main>
  );
}
