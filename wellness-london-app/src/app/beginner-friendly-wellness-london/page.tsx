import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Beginner-Friendly Wellness Spaces in London | Well+",
  description:
    "A Well+ edit of beginner-friendly wellness spaces in London, including saunas, cold plunges, recovery studios and calm reset spaces.",
  alternates: { canonical: "/beginner-friendly-wellness-london" },
};

function isBeginnerFriendly(value?: string) {
  if (!value) return false;
  const lower = value.toLowerCase();
  return lower.includes("yes") || lower.includes("beginner") || lower.includes("suitable") || lower.includes("friendly");
}

function scoreFacility(facility: ReturnType<typeof toDirectoryFacility>) {
  const searchable = [
    ...(facility.bestFor || []),
    ...(facility.experienceType || []),
    ...(facility.services || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let score = 0;
  if (searchable.includes("beginner")) score += 5;
  if (searchable.includes("guided")) score += 3;
  if (searchable.includes("private")) score += 2;
  if (searchable.includes("calm")) score += 2;
  if (searchable.includes("reset")) score += 1;
  if (facility.isFeatured) score += 2;
  score += facility.profileCompletenessScore || 0;
  return score;
}

export default async function BeginnerFriendlyWellnessLondonPage() {
  const facilities = await getFacilities();
  const directoryFacilities = facilities.map(toDirectoryFacility);
  const beginnerFacilities = directoryFacilities
    .filter((facility) => isBeginnerFriendly(facility.beginnerFriendly) || scoreFacility(facility) >= 5)
    .sort((a, b) => scoreFacility(b) - scoreFacility(a))
    .slice(0, 12);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Beginner-Friendly Wellness Spaces in London",
    itemListElement: beginnerFacilities.map((facility, index) => ({
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
                Beginner-friendly wellness spaces in London.
              </h1>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#5f574c] md:text-lg md:leading-9">
              <p>
                Starting a new wellness routine can feel unclear: what to book, what to bring, how intense it will feel and whether the experience is designed for first-timers.
              </p>
              <p>
                This Well+ edit brings together London spaces that appear more approachable for newer users, based on practical details such as beginner suitability, guided formats, calm atmosphere, service mix and booking clarity.
              </p>
              <p className="text-sm leading-7 text-[#8a7f70]">
                This is an editorial discovery guide, not medical advice. Always check suitability with the venue and seek professional advice if you have a health condition, are pregnant, or are unsure about heat, cold or recovery treatments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">The beginner edit</p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Approachable places to start.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:justify-self-end md:text-base">
              We prioritise venues with clearer onboarding signals: beginner-friendly notes, calm or guided experiences, practical amenities and services that do not require deep prior knowledge.
            </p>
          </div>

          {beginnerFacilities.length > 0 ? (
            <div className="grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-8">
              {beginnerFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source="beginner_collection" />
              ))}
            </div>
          ) : (
            <div className="border border-[#d8cebf] bg-[#f4efe6] p-8 text-sm leading-7 text-[#5f574c]">
              Beginner-friendly collection results will appear here once more venue profiles are enriched.
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">How to choose</p>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="bg-[#fbf8f1] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Look for guidance</h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Guided sessions, clear booking flows and staff-led formats can make heat, cold or recovery treatments easier to approach for the first time.
              </p>
            </article>
            <article className="bg-[#fbf8f1] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Check the setting</h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                A calmer environment, private option or slower ritual can be better for users who want to build confidence before trying busier or more intense spaces.
              </p>
            </article>
            <article className="bg-[#fbf8f1] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Confirm the practicals</h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Before booking, check towels, showers, changing rooms, session length, contraindications and whether the venue recommends a specific first-time protocol.
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
            <Link href="/how-we-curate" className="group bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da]">
              <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">How Well+ curates</h3>
              <p className="text-sm leading-7 text-[#5f574c]">Read how venues are selected, reviewed and organised across the Well+ guide.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
