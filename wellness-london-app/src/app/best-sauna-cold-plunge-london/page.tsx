import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Sauna and Cold Plunge Spaces in London | Well+",
  description:
    "A Well+ edit of London sauna and cold plunge spaces, including contrast therapy venues, recovery studios and heat-and-cold experiences.",
  alternates: { canonical: "/best-sauna-cold-plunge-london" },
};

function hasSaunaAndCold(facility: ReturnType<typeof toDirectoryFacility>) {
  const searchable = [
    ...(facility.services || []),
    ...(facility.bestFor || []),
    ...(facility.experienceType || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const hasSauna = searchable.includes("sauna") || searchable.includes("heat");
  const hasCold = searchable.includes("cold") || searchable.includes("plunge") || searchable.includes("ice");
  const hasContrast = searchable.includes("contrast");

  return hasContrast || (hasSauna && hasCold);
}

function scoreFacility(facility: ReturnType<typeof toDirectoryFacility>) {
  const searchable = [
    ...(facility.services || []),
    ...(facility.bestFor || []),
    ...(facility.experienceType || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let score = 0;
  if (searchable.includes("contrast")) score += 8;
  if (searchable.includes("sauna")) score += 4;
  if (searchable.includes("cold")) score += 4;
  if (searchable.includes("plunge")) score += 4;
  if (searchable.includes("recovery")) score += 3;
  if (searchable.includes("private")) score += 2;
  if (facility.isFeatured) score += 3;
  score += facility.profileCompletenessScore || 0;
  return score;
}

export default async function BestSaunaColdPlungeLondonPage() {
  const facilities = await getFacilities();
  const directoryFacilities = facilities.map(toDirectoryFacility);
  const collectionFacilities = directoryFacilities
    .filter(hasSaunaAndCold)
    .sort((a, b) => scoreFacility(b) - scoreFacility(a))
    .slice(0, 12);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Sauna and Cold Plunge Spaces in London",
    itemListElement: collectionFacilities.map((facility, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://welledit.co.uk/facility/${facility.slug}`,
      name: facility.name,
    })),
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={itemListSchema} />

      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.88fr_1.12fr] md:items-end">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">Well+ collection</p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">
                Best sauna and cold plunge spaces in London.
              </h1>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#5f574c] md:text-lg md:leading-9">
              <p>
                Sauna and cold plunge spaces sit at the centre of London&apos;s modern recovery scene: part ritual, part training support, part reset from the pace of the city.
              </p>
              <p>
                This Well+ edit brings together venues where heat and cold can be experienced in the same recovery journey, from contrast therapy studios to wellness spaces with a broader recovery setup.
              </p>
              <p className="text-sm leading-7 text-[#8a7f70]">
                Use this as a starting point for discovery. Always check current facilities, booking requirements and health suitability directly with the venue before visiting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">The contrast edit</p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Heat and cold, chosen with care.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:justify-self-end md:text-base">
              We prioritise spaces that combine sauna, cold plunge, ice bath or contrast therapy with clear facilities, useful recovery context and enough practical detail to help users decide where to book.
            </p>
          </div>

          {collectionFacilities.length > 0 ? (
            <div className="grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-8">
              {collectionFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source="sauna_cold_plunge_collection" />
              ))}
            </div>
          ) : (
            <div className="border border-[#d8cebf] bg-[#f4efe6] p-8 text-sm leading-7 text-[#5f574c]">
              Sauna and cold plunge collection results will appear here once more venue profiles are enriched.
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">How to choose</p>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="bg-[#fbf8f1] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Look at the sequence</h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                The best contrast experiences make it easy to move between heat, cold, showering, rest and recovery without feeling rushed or improvised.
              </p>
            </article>
            <article className="bg-[#fbf8f1] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Check the setting</h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Some spaces are social and energetic; others are quieter and more restorative. Choose based on the experience you actually want.
              </p>
            </article>
            <article className="bg-[#fbf8f1] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Confirm the practicals</h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Check whether towels, showers, changing rooms, guided sessions and booking windows are included before you arrive.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-8 sm:py-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Continue exploring</p>
          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/sauna-london" className="group bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da]">
              <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">Saunas in London</h3>
              <p className="text-sm leading-7 text-[#5f574c]">Explore heat-led recovery spaces, from infrared rooms to traditional sauna experiences.</p>
            </Link>
            <Link href="/cold-plunge-london" className="group bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da]">
              <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">Cold plunge in London</h3>
              <p className="text-sm leading-7 text-[#5f574c]">Find cold exposure, ice bath and contrast therapy spaces across the city.</p>
            </Link>
            <Link href="/contrast-therapy-london" className="group bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da]">
              <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">Contrast therapy</h3>
              <p className="text-sm leading-7 text-[#5f574c]">Understand heat-and-cold recovery routines and related London venues.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
