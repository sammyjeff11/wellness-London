import Image from "next/image";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

const categoryLinks = [
  {
    href: "/sauna-london",
    label: "Saunas",
    description: "Heat-led recovery spaces across the city.",
    bestFor: "Best for quiet reset.",
  },
  {
    href: "/cold-plunge-london",
    label: "Cold Plunge",
    description: "Ice baths and contrast therapy studios.",
    bestFor: "Best for focused recovery.",
  },
  {
    href: "/cryotherapy-london",
    label: "Cryotherapy",
    description: "Cold therapy for recovery and performance.",
    bestFor: "Best for performance-led routines.",
  },
];

const selectionCriteria = [
  {
    title: "Clear reason to visit",
    text: "Each space needs a distinct use case, not just a polished interior.",
  },
  {
    title: "Decision-ready detail",
    text: "Price, setting and practical facilities should be easy to understand.",
  },
  {
    title: "Atmosphere with substance",
    text: "The experience has to feel considered, useful and worth returning to.",
  },
];

function selectionScore(facility: ReturnType<typeof toDirectoryFacility>) {
  return Number(facility.isFeatured) * 100 + (facility.profileCompletenessScore || 0);
}

export default async function Home() {
  const facilities = await getFacilities();
  const directoryFacilities = facilities.map(toDirectoryFacility);
  const selectedFacilities = [...directoryFacilities]
    .sort((a, b) => selectionScore(b) - selectionScore(a))
    .slice(0, Math.min(3, directoryFacilities.length));
  const selectedSlugs = new Set(selectedFacilities.map((facility) => facility.slug));
  const remainingFacilities = directoryFacilities.filter((facility) => !selectedSlugs.has(facility.slug));
  const heroImage = facilities.find((facility) => facility.images.length > 0)?.images[0];

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto min-h-[66vh] max-w-[1400px] overflow-hidden bg-[#d8cebf] sm:min-h-[78vh]">
          {heroImage ? (
            <Image
              src={heroImage.url}
              alt={heroImage.filename}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative flex min-h-[66vh] items-end px-5 py-10 sm:min-h-[78vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
            <div className="max-w-4xl text-[#fbf8f1]">
              <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">
                Well Edit / London recovery spaces
              </p>
              <h1 className="max-w-5xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7.6rem]">
                A quieter way to find wellness in London.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">
                An edited guide to London recovery spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048] sm:mb-5">
                The Well Edit selection
              </p>
              <h2 className="max-w-3xl font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-7xl">
                The first places we would shortlist.
              </h2>
            </div>

            <aside className="max-w-xl lg:justify-self-end">
              <p className="mb-6 text-lg leading-8 text-[#29241d] sm:text-xl sm:leading-9">
                A tighter edit for people who want to choose quickly, not compare endlessly.
              </p>
              <div className="space-y-5 border-t border-[#d8cebf]/70 pt-6">
                {selectionCriteria.map((item) => (
                  <div key={item.title} className="grid gap-2 sm:grid-cols-[0.42fr_0.58fr] sm:gap-6">
                    <h3 className="text-[11px] uppercase tracking-[0.18em] text-[#6f6048]">{item.title}</h3>
                    <p className="text-sm leading-7 text-[#5f574c]">{item.text}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {directoryFacilities.length > 0 ? (
            <div className="space-y-16 md:space-y-20">
              <div>
                <div className="mb-6 border-b border-[#d8cebf]/70 pb-5 sm:mb-8">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Editor&apos;s picks</p>
                  <h3 className="text-xl font-medium tracking-normal sm:text-2xl">Three strong starting points</h3>
                </div>
                <div className="grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-8">
                  {selectedFacilities.map((facility) => (
                    <FacilityCard
                      key={facility.slug}
                      facility={facility}
                      source="homepage"
                    />
                  ))}
                </div>
              </div>

              {remainingFacilities.length > 0 ? (
                <div>
                  <div className="mb-6 border-b border-[#d8cebf]/70 pb-5 sm:mb-8">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">All spaces</p>
                    <h3 className="text-xl font-medium tracking-normal sm:text-2xl">More places to consider</h3>
                  </div>
                  <div className="grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-8">
                    {remainingFacilities.map((facility) => (
                      <FacilityCard
                        key={facility.slug}
                        facility={facility}
                        source="homepage"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="max-w-2xl bg-[#fbf8f1] p-6 sm:p-8">
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                Directory coming soon
              </p>
              <h3 className="mb-4 text-2xl font-medium tracking-normal sm:text-3xl">
                We are refreshing the live listings
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Explore the sauna, cold plunge and cryotherapy guides while the directory is being updated.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-6 md:mb-12 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Explore by treatment</p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-7xl">Choose a route in.</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Browse first, then narrow by the kind of recovery you want.
            </p>
          </div>

          <div className="grid gap-6 border-y border-[#d8cebf]/70 py-6 sm:gap-8 sm:py-8 md:grid-cols-3">
            {categoryLinks.map((category, index) => (
              <Link
                key={category.href}
                href={category.href}
                className="group block py-4 transition sm:py-5 md:pr-8"
              >
                <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-[#6f6048] sm:mb-8">
                  {String(index + 1).padStart(2, "0")} / Guide
                </p>
                <h3 className="mb-3 text-2xl font-medium tracking-normal text-[#29241d] sm:mb-4 sm:text-3xl">
                  {category.label}
                </h3>
                <p className="mb-3 max-w-sm text-sm leading-7 text-[#5f574c]">
                  {category.description}
                </p>
                <p className="text-sm text-[#29241d]">{category.bestFor}</p>
                <span className="mt-5 inline-block text-sm text-[#29241d] underline underline-offset-4 transition group-hover:translate-x-1 sm:mt-7">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[#d8cebf]/70 pt-8 text-sm leading-7 text-[#5f574c] md:flex-row md:items-start md:justify-between">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">How we choose</p>
          <p className="max-w-2xl">
            We prioritise calm, practical spaces with clear details, useful facilities and enough context to help you decide quickly.
          </p>
        </div>
      </section>
    </main>
  );
}
