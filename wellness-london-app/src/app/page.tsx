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
    href: "/recovery-london",
    label: "Recovery in London",
    kicker: "Outcome-led wellness",
    description: "Explore the broader recovery ecosystem connecting sauna, cold plunge, cryotherapy and contrast therapy.",
    bestFor: "Best for understanding modern recovery and choosing the right modality.",
    cta: "Explore recovery",
  },
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
                <Link href="/recovery-london" className="bg-[#fbf8f1] px-5 py-3 text-sm text-[#29241d] transition hover:bg-[#eee7da]">
                  Explore recovery
                </Link>
                <Link href="/sauna-london" className="border border-[#fbf8f1]/70 px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">
                  Explore saunas
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
                Topical wellness guides
              </p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Explore deeper wellness topics.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:justify-self-end">
              <Link
                href="/recovery-london"
                className="group block bg-[#f4efe6] p-6 transition hover:bg-[#eee7da] sm:p-7"
              >
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                  Recovery in London
                </h3>
                <p className="max-w-xl text-sm leading-7 text-[#5f574c]">
                  Explore the broader recovery ecosystem connecting sauna, cold plunge, cryotherapy and modern wellness routines.
                </p>
              </Link>

              <Link
                href="/guides/sauna-london-guide"
                className="group block bg-[#f4efe6] p-6 transition hover:bg-[#eee7da] sm:p-7"
              >
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                  The Well Edit Guide to Sauna in London
                </h3>
                <p className="max-w-xl text-sm leading-7 text-[#5f574c]">
                  An evergreen editorial guide connecting sauna culture, heat therapy, contrast therapy and recovery-led wellness in London.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
