import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { locationHubLinks } from "@/lib/location-hubs";
import { pillarPages } from "@/lib/pillar-pages";

export const metadata: Metadata = {
  title: "Well+ London | The London Wellness Edit",
  description:
    "Discover London's best wellness spaces, including saunas, cold plunges, bathhouses, recovery clubs, cryotherapy and longevity experiences with Well+.",
  alternates: { canonical: "/" },
};

const treatmentLinks = [
  {
    href: "/sauna-london",
    label: "Saunas",
    description: "Infrared, traditional and private sauna spaces for heat-led recovery and reset.",
  },
  {
    href: "/cold-plunge-london",
    label: "Cold Plunge",
    description: "Cold plunge, ice bath and cold exposure venues across London.",
  },
  {
    href: "/cryotherapy-london",
    label: "Cryotherapy",
    description: "Whole-body and localised cryotherapy spaces for structured recovery sessions.",
  },
  {
    href: "/contrast-therapy-london",
    label: "Contrast Therapy",
    description: "Spaces combining heat and cold in one recovery ritual.",
  },
  {
    href: "/recovery-london",
    label: "Recovery Spaces",
    description: "A broader guide to recovery clubs, studios and treatment-led spaces.",
  },
];

const collectionLinks = [
  {
    href: "/best-sauna-cold-plunge-london",
    title: "Sauna + cold plunge",
    text: "A Well+ edit of London spaces where heat, cold and recovery rituals come together.",
  },
  {
    href: "/recover",
    title: "For physical recovery",
    text: "Start with sauna, cold plunge, cryotherapy and contrast therapy spaces designed around restoration.",
  },
  {
    href: "/perform",
    title: "For training and output",
    text: "Explore performance-led recovery, cold exposure and venues that support high-output routines.",
  },
  {
    href: "/reset",
    title: "For calm and reset",
    text: "Find quieter spaces, bathhouse rituals and restorative venues for switching off.",
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
        <div className="relative mx-auto min-h-[48vh] max-w-[1400px] overflow-hidden bg-[#d8cebf] sm:min-h-[78vh]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/38 to-black/12 sm:bg-gradient-to-r sm:from-black/78 sm:via-black/38 sm:to-black/8" />
          <div className="relative flex min-h-[48vh] items-end px-5 py-7 sm:min-h-[78vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
            <div className="max-w-5xl text-[#fbf8f1]">
              <p className="mb-4 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">
                Well+ / The London wellness edit
              </p>
              <h1 className="max-w-5xl font-serif text-[3.2rem] font-normal leading-[0.9] tracking-[-0.04em] sm:text-[4rem] sm:leading-[0.92] md:text-[7.4rem]">
                Discover London&apos;s best wellness spaces.
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#fbf8f1]/88 sm:mt-8 sm:max-w-2xl sm:text-base sm:leading-8 md:text-lg">
                Curated places to recover, reset and explore modern wellness across London.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
                <Link href="/explore" className="bg-[#fbf8f1] px-4 py-3 text-sm text-[#29241d] transition hover:bg-[#eee7da] sm:px-5">
                  Explore the edit
                </Link>
                <Link href="/sauna-london" className="border border-[#fbf8f1]/70 px-4 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d] sm:px-5">
                  Find saunas
                </Link>
                <Link href="/cold-plunge-london" className="border border-[#fbf8f1]/70 px-4 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d] sm:px-5">
                  Find cold plunge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedFacilities.length > 0 ? (
        <section className="px-5 py-8 sm:px-6 sm:py-14 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-3 sm:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#6f6048] sm:mb-3 sm:text-[11px] sm:tracking-[0.24em]">Editor&apos;s selection</p>
                <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                  Featured London wellness venues.
                </h2>
              </div>
              <Link href="/explore" className="text-sm font-medium underline underline-offset-4">
                Explore more curated spaces
              </Link>
            </div>
            <div className="grid gap-10 sm:gap-12 md:grid-cols-3 md:gap-9">
              {selectedFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source="homepage_featured" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#fbf8f1] px-5 py-8 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-6 sm:py-8">
          <div className="mb-5 flex flex-col gap-2 sm:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#6f6048] sm:mb-3 sm:text-[11px] sm:tracking-[0.24em]">
                Explore by intention
              </p>
              <h2 className="font-serif text-2xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Start with how you want to feel.
              </h2>
            </div>
            <p className="hidden max-w-2xl text-sm leading-7 text-[#5f574c] sm:block md:justify-self-end md:text-base">
              Well+ organises London wellness spaces by intention, helping you move from broad need to the right treatment, venue and experience.
            </p>
          </div>

          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
            {pillarPages.map((pillar) => (
              <Link
                key={pillar.slug}
                href={pillar.href}
                className="group min-w-[72%] bg-[#f4efe6] p-5 transition hover:bg-[#eee7da] sm:flex sm:min-h-[250px] sm:min-w-0 sm:flex-col sm:justify-between sm:p-6"
              >
                <div>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#8d7d67] sm:mb-4 sm:tracking-[0.22em]">{pillar.eyebrow}</p>
                  <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4 sm:mb-4 sm:text-3xl">
                    {pillar.label}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-5 text-[#5f574c] sm:line-clamp-none sm:text-sm sm:leading-7">{pillar.intro}</p>
                </div>
                <span className="mt-4 inline-block text-xs font-medium text-[#29241d] underline underline-offset-4 sm:mt-6 sm:text-sm">Explore {pillar.label.toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe6] px-5 py-8 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl border-b border-[#d8cebf]/70 pb-8 sm:pb-10">
          <div className="mb-5 flex flex-col gap-2 sm:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#6f6048] sm:mb-3 sm:text-[11px] sm:tracking-[0.24em]">Popular treatments</p>
              <h2 className="font-serif text-2xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Know what you&apos;re looking for?
              </h2>
            </div>
            <p className="hidden max-w-2xl text-sm leading-7 text-[#5f574c] sm:block md:text-base">
              Fast routes into treatment-led guides for users who already know they want sauna, cold exposure, cryotherapy or recovery spaces.
            </p>
          </div>

          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-5">
            {treatmentLinks.map((treatment) => (
              <Link
                key={treatment.href}
                href={treatment.href}
                className="group min-w-[72%] border border-[#d8cebf] bg-[#fbf8f1] p-5 transition hover:bg-[#eee7da] sm:min-w-0"
              >
                <h3 className="mb-2 text-xl font-medium group-hover:underline group-hover:underline-offset-4 sm:mb-3 sm:text-2xl">{treatment.label}</h3>
                <p className="line-clamp-2 text-xs leading-5 text-[#5f574c] sm:line-clamp-none sm:text-sm sm:leading-7">{treatment.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
