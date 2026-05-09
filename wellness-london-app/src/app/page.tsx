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

export default async function Home() {
  const facilities = await getFacilities();
  const heroImage = facilities.find((facility) => facility.images.length > 0)?.images[0];
  const serviceCount = new Set(facilities.flatMap((facility) => facility.serviceKeys)).size;

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 pt-6 md:px-8 md:pt-8">
        <div className="relative mx-auto min-h-[78vh] max-w-[1400px] overflow-hidden bg-[#d8cebf]">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          <div className="relative flex min-h-[78vh] items-end px-6 py-12 md:px-14 md:py-16">
            <div className="max-w-4xl text-[#fbf8f1]">
              <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/75">
                Well Edit / London recovery spaces
              </p>
              <h1 className="max-w-5xl font-serif text-[4rem] font-normal leading-[0.92] tracking-normal md:text-[7.6rem]">
                A quieter way to find wellness in London.
              </h1>
              <p className="mt-8 max-w-lg text-base leading-8 text-[#fbf8f1]/86 md:text-lg">
                An edited guide to London recovery spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              Featured spaces
            </p>
            <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">
              Start here.
            </h2>
          </div>
          <div className="max-w-xl text-sm leading-7 text-[#5f574c]">
            <p className="mb-3">Start with the spaces we would compare first.</p>
            <p>{facilities.length || "Soon"} listings across {serviceCount || 3} recovery categories.</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {facilities.length > 0 ? (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">
              {facilities.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={toDirectoryFacility(facility)}
                  source="homepage"
                />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl bg-[#fbf8f1] p-8">
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                Directory coming soon
              </p>
              <h3 className="mb-4 text-3xl font-medium tracking-normal">
                We are refreshing the live listings
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Explore the sauna, cold plunge and cryotherapy guides while the directory is being updated.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Explore by treatment</p>
              <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">Choose a route in.</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Browse first, then narrow by the kind of recovery you want.
            </p>
          </div>

          <div className="grid gap-8 border-y border-[#d8cebf]/70 py-8 md:grid-cols-3">
            {categoryLinks.map((category, index) => (
              <Link
                key={category.href}
                href={category.href}
                className="group block py-5 transition md:pr-8"
              >
                <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                  {String(index + 1).padStart(2, "0")} / Guide
                </p>
                <h3 className="mb-4 text-3xl font-medium tracking-normal text-[#29241d]">
                  {category.label}
                </h3>
                <p className="mb-3 max-w-sm text-sm leading-7 text-[#5f574c]">
                  {category.description}
                </p>
                <p className="text-sm text-[#29241d]">{category.bestFor}</p>
                <span className="mt-7 inline-block text-sm text-[#29241d] underline underline-offset-4 transition group-hover:translate-x-1">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[#d8cebf]/70 pt-8 text-sm leading-7 text-[#5f574c] md:flex-row md:items-start md:justify-between">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">How we edit</p>
          <p className="max-w-2xl">
            Well Edit favours calm, practical spaces with clear details, checked where possible and presented without unnecessary noise.
          </p>
        </div>
      </section>
    </main>
  );
}
