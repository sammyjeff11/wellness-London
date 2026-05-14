import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { locationHubLinks } from "@/lib/location-hubs";

export const metadata: Metadata = {
  title: "The Well Edit | London's Curated Wellness Directory",
  description:
    "Discover London's best wellness spaces, including saunas, cold plunges, bathhouses, recovery clubs, cryotherapy and longevity experiences.",
  alternates: { canonical: "/" },
};

const categoryLinks = [
  {
    href: "/recovery-london",
    label: "Recovery Clubs",
    kicker: "Outcome-led wellness",
    description: "A broader guide to London spaces built around recovery, reset and performance routines.",
    cta: "Explore recovery",
  },
  {
    href: "/sauna-london",
    label: "Saunas",
    kicker: "Heat therapy",
    description: "Infrared, traditional and private sauna spaces for calmer weekly rituals.",
    cta: "Explore saunas",
  },
  {
    href: "/cold-plunge-london",
    label: "Cold Plunge",
    kicker: "Cold exposure",
    description: "Cold plunge, ice bath and contrast therapy studios with practical guidance for first-timers.",
    cta: "Explore cold plunge",
  },
  {
    href: "/cryotherapy-london",
    label: "Cryotherapy",
    kicker: "Focused recovery",
    description: "Whole-body and localised cryotherapy spaces for short, structured recovery sessions.",
    cta: "Explore cryotherapy",
  },
];

const collectionLinks = [
  {
    href: "/recovery-london",
    title: "For recovery after training",
    text: "Start with recovery clubs, cryotherapy and cold-exposure spaces designed around performance routines.",
  },
  {
    href: "/cold-plunge-london",
    title: "For sauna and cold plunge",
    text: "Compare contrast therapy spaces where heat and cold are part of the same visit.",
  },
  {
    href: "/sauna-london",
    title: "For calm, premium reset",
    text: "Explore quieter sauna-led spaces, private rooms and design-led wellness studios.",
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
  const heroImage = facilities.find((facility) => facility.images.length > 0)?.images[0];
  const featuredAreaLinks = locationHubLinks.slice(0, 5);

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
          <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/38 to-black/8" />
          <div className="relative flex min-h-[66vh] items-end px-5 py-10 sm:min-h-[78vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
            <div className="max-w-5xl text-[#fbf8f1]">
              <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">
                The Well Edit / London wellness directory
              </p>
              <h1 className="max-w-5xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7.4rem]">
                Discover London&apos;s best wellness spaces.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">
                Curated saunas, cold plunges, bathhouses, recovery clubs and longevity experiences — edited to help you choose where to go next.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                <Link href="/sauna-london" className="bg-[#fbf8f1] px-5 py-3 text-sm text-[#29241d] transition hover:bg-[#eee7da]">
                  Explore saunas
                </Link>
                <Link href="/recovery-london" className="border border-[#fbf8f1]/70 px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">
                  Browse recovery spaces
                </Link>
                <Link href="/cold-plunge-london" className="border border-[#fbf8f1]/70 px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">
                  Find cold plunge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-10 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-8">
          <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Start with what you need
              </p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Browse London wellness by category.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:justify-self-end md:text-base">
              Use these hubs to compare the services, settings and venues that best match your recovery, reset or longevity routine.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryLinks.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group flex min-h-[240px] flex-col justify-between bg-[#f4efe6] p-6 transition hover:bg-[#eee7da]"
              >
                <div>
                  <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">{category.kicker}</p>
                  <h3 className="mb-4 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                    {category.label}
                  </h3>
                  <p className="text-sm leading-7 text-[#5f574c]">{category.description}</p>
                </div>
                <span className="mt-6 text-sm font-medium text-[#29241d] underline underline-offset-4">{category.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {selectedFacilities.length > 0 ? (
        <section className="px-5 py-12 sm:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Editor&apos;s selection</p>
                <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                  Featured London wellness venues.
                </h2>
              </div>
              <Link href="/recovery-london" className="text-sm font-medium underline underline-offset-4">
                View more curated spaces
              </Link>
            </div>
            <div className="grid gap-9 md:grid-cols-3">
              {selectedFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source="homepage_featured" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#29241d] px-5 py-12 text-[#fbf8f1] sm:px-6 md:py-18">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">Curated collections</p>
            <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
              Choose by intent, not just treatment.
            </h2>
          </div>
          <div className="grid gap-4">
            {collectionLinks.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group border border-[#fbf8f1]/18 p-6 transition hover:border-[#fbf8f1]/45 hover:bg-[#fbf8f1]/5"
              >
                <h3 className="mb-2 text-2xl font-medium group-hover:underline group-hover:underline-offset-4">{collection.title}</h3>
                <p className="text-sm leading-7 text-[#fbf8f1]/72">{collection.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredAreaLinks.length > 0 ? (
        <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 md:py-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8">
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Browse by area</p>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-3xl font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Find wellness spaces by London location.
              </h2>
              <div className="flex flex-wrap gap-3 md:justify-end">
                {featuredAreaLinks.map((area) => (
                  <Link
                    key={area.href}
                    href={area.href}
                    className="border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]"
                  >
                    {area.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
