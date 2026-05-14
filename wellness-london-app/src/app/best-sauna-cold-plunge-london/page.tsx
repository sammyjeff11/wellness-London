import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Sauna and Cold Plunge Spaces in London | Well Edit",
  description:
    "A curated guide to London's best sauna and cold plunge spaces, from contrast therapy studios to premium recovery clubs and bathhouse experiences.",
  alternates: {
    canonical: "/best-sauna-cold-plunge-london",
  },
};

function scoreFacility(facility: ReturnType<typeof toDirectoryFacility>) {
  const services = facility.services?.join(" ").toLowerCase() || "";

  let score = 0;

  if (services.includes("sauna")) score += 2;
  if (services.includes("cold")) score += 2;
  if (services.includes("contrast")) score += 1;
  if (facility.isFeatured) score += 3;

  return score + (facility.profileCompletenessScore || 0);
}

export default async function BestSaunaColdPlungePage() {
  const facilities = await getFacilities();

  const selectedFacilities = facilities
    .map(toDirectoryFacility)
    .filter((facility) => {
      const services = facility.services?.join(" ").toLowerCase() || "";

      return (
        services.includes("sauna") ||
        services.includes("cold") ||
        services.includes("contrast")
      );
    })
    .sort((a, b) => scoreFacility(b) - scoreFacility(a))
    .slice(0, 9);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">
            Curated collections / Recovery
          </p>

          <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            The best sauna and cold plunge spaces in London.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
            A curated edit of London wellness spaces combining heat, cold exposure and contrast therapy experiences — from premium recovery clubs and bathhouses to performance-focused studios.
          </p>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-5 border-y border-[#d8cebf]/70 py-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">
              Best for
            </p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Recovery after training, nervous system reset, contrast therapy rituals and structured recovery routines.
            </p>
          </div>

          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">
              Typical experience
            </p>
            <p className="text-sm leading-7 text-[#5f574c]">
              Traditional sauna, infrared sauna, ice bath, cold plunge pools, guided contrast therapy and recovery lounges.
            </p>
          </div>

          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">
              Explore further
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/recover" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">
                Recover
              </Link>
              <Link href="/sauna-london" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">
                Saunas
              </Link>
              <Link href="/cold-plunge-london" className="border border-[#d8cebf] px-3 py-2 text-sm hover:bg-[#f4efe6]">
                Cold plunge
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Curated venues
              </p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                London recovery spaces worth knowing.
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:text-base">
              These spaces have been selected based on treatment mix, experience quality, wellness positioning and overall editorial fit.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {selectedFacilities.map((facility) => (
              <FacilityCard
                key={facility.slug}
                facility={facility}
                source="collection_sauna_cold_plunge"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-12 text-[#fbf8f1] sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">
              Editorial perspective
            </p>

            <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
              Why contrast therapy continues to grow.
            </h2>
          </div>

          <div className="space-y-5 text-sm leading-8 text-[#fbf8f1]/78 md:text-base">
            <p>
              Sauna and cold plunge experiences are increasingly becoming part of broader recovery and longevity routines rather than isolated treatments.
            </p>

            <p>
              Many of London's strongest wellness venues now combine heat exposure, cold immersion, social recovery and calmer hospitality-led environments into a single experience.
            </p>

            <p>
              The Well Edit focuses on spaces that feel intentional, well-designed and genuinely restorative — not simply functional treatment rooms.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
