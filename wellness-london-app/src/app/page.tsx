import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { locationHubLinks } from "@/lib/location-hubs";

export const metadata: Metadata = {
  title: "Well Edit | Curated Sauna, Cold Plunge & Recovery Spaces in London",
  description:
    "Discover curated London wellness and recovery spaces, including saunas, cold plunge, ice baths, cryotherapy and contrast therapy studios.",
  alternates: { canonical: "/" },
};

const categoryLinks = [
  {
    href: "/sauna-london",
    label: "Saunas in London",
    kicker: "Heat therapy",
    description: "Infrared, traditional and private sauna spaces for recovery, reset and calmer weekly rituals.",
    bestFor: "Best for quiet reset, heat exposure and slower recovery routines.",
    cta: "Explore saunas",
  },
  {
    href: "/cold-plunge-london",
    label: "Cold Plunge in London",
    kicker: "Ice baths + contrast",
    description: "Cold plunge, ice bath and contrast therapy studios with practical guidance for first-timers.",
    bestFor: "Best for cold exposure, sauna pairing and focused recovery.",
    cta: "Explore cold plunge",
  },
  {
    href: "/cryotherapy-london",
    label: "Cryotherapy in London",
    kicker: "Cold therapy",
    description: "Whole-body and localised cryotherapy spaces for performance-led recovery and wellness routines.",
    bestFor: "Best for short, structured cold-therapy sessions.",
    cta: "Explore cryotherapy",
  },
];

const intentLinks = [
  {
    title: "I want sauna + cold plunge",
    text: "Start with contrast therapy spaces where heat and cold are designed to work together.",
    href: "/cold-plunge-london",
  },
  {
    title: "I want somewhere calm and premium",
    text: "Compare design-led recovery spaces, private rooms and quieter wellness studios.",
    href: "/sauna-london",
  },
  {
    title: "I want quick recovery after training",
    text: "Look at cryotherapy and cold-exposure venues built around performance routines.",
    href: "/cryotherapy-london",
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
              alt={heroImage.filename || "Curated London wellness and recovery space"}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/76 via-black/28 to-transparent" />
          <div className="relative flex min-h-[66vh] items-end px-5 py-10 sm:min-h-[78vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
            <div className="max-w-4xl text-[#fbf8f1]">
              <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">
                Well Edit / London recovery spaces
              </p>
              <h1 className="max-w-5xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7.6rem]">
                Curated sauna, cold plunge and recovery spaces in London.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">
                An edited guide to London wellness spaces, from infrared saunas and ice baths to cryotherapy and contrast therapy studios.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                <Link href="/sauna-london" className="bg-[#fbf8f1] px-5 py-3 text-sm text-[#29241d] transition hover:bg-[#eee7da]">
                  Explore saunas
                </Link>
                <Link href="/cold-plunge-london" className="border border-[#fbf8f1]/70 px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">
                  Explore cold plunge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-10 sm:pt-12 md:pt-14">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            The Well Edit selection
          </p>
          <h2 className="max-w-3xl font-serif text-4xl font-normal leading-tight tracking-normal sm:text-5xl md:text-6xl">
            Start with these spaces.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5f574c]">
            A small selection of London recovery spaces surfaced from the directory, chosen to help you compare the kind of venue, atmosphere and treatment mix available.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {directoryFacilities.length > 0 ? (
            <div className="space-y-16 md:space-y-20">
              <div className="grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-8">
                {selectedFacilities.map((facility) => (
                  <FacilityCard
                    key={facility.slug}
                    facility={facility}
                    source="homepage"
                  />
                ))}
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

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-4 md:mb-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Browse by service</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">Recovery guides.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Browse by treatment after you have explored the venue directory, with internal links preserved for deeper service research.
            </p>
          </div>

          <div className="grid gap-4 border-y border-[#d8cebf]/70 py-5 sm:gap-5 sm:py-6 md:grid-cols-3">
            {categoryLinks.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group block border border-[#d8cebf]/70 bg-[#f4efe6] p-5 transition hover:bg-[#eee7da] sm:p-6"
              >
                <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                  {category.kicker}
                </p>
                <h3 className="mb-3 text-xl font-medium tracking-normal text-[#29241d] sm:text-2xl">
                  {category.label}
                </h3>
                <p className="mb-4 max-w-sm text-sm leading-7 text-[#5f574c]">
                  {category.description}
                </p>
                <p className="mb-5 text-sm leading-6 text-[#29241d]">{category.bestFor}</p>
                <span className="inline-block text-sm text-[#29241d] underline underline-offset-4 transition group-hover:translate-x-1">
                  {category.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
          <div className="mb-5 grid gap-3 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Find by intent</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl">Need help choosing?</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Quick routes for visitors who want a specific kind of recovery experience after browsing the directory.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {intentLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block border border-[#d8cebf]/70 bg-[#fbf8f1] p-5 transition hover:bg-[#eee7da]"
              >
                <h3 className="mb-2 text-lg font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#5f574c]">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 border-y border-[#d8cebf]/70 py-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">How we choose</p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Curated for usefulness, not volume.</h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-[#5f574c]">
              <p>
                We prioritise calm, practical spaces with clear details, useful facilities and enough context to help you decide quickly.
              </p>
              <p>
                The directory is designed around real decision points: treatment type, location, pricing, beginner support, private or shared access, and whether the venue feels right for the recovery routine you want.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-10">
          <div className="mb-8 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Explore by area</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">London recovery, by neighbourhood feel.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Compare the wider wellness scene across Central, East, West, North and South London before choosing a specific space.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {locationHubLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group block border border-[#d8cebf]/70 bg-[#fbf8f1] p-5 text-sm transition hover:bg-[#eee7da]">
                <span className="font-medium text-[#29241d] underline-offset-4 group-hover:underline">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
