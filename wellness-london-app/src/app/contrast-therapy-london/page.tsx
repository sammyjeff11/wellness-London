import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Contrast Therapy London | Sauna & Cold Plunge Spaces | Well Edit",
  description:
    "Discover contrast therapy in London, including sauna and cold plunge spaces, ice bath studios and recovery-focused wellness venues.",
  alternates: {
    canonical: "/contrast-therapy-london",
  },
};

function isContrastFacility(facility: ReturnType<typeof toDirectoryFacility>) {
  const services = facility.services?.join(" ").toLowerCase() || "";

  return (
    services.includes("cold") ||
    services.includes("ice") ||
    services.includes("contrast") ||
    services.includes("sauna")
  );
}

export default async function ContrastTherapyLondonPage() {
  const facilities = await getFacilities();
  const directoryFacilities = facilities.map(toDirectoryFacility);

  const contrastFacilities = directoryFacilities
    .filter(isContrastFacility)
    .slice(0, 9);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Recovery guide
              </p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">
                Contrast therapy in London.
              </h1>
            </div>

            <div className="space-y-6 text-base leading-8 text-[#5f574c]">
              <p>
                Contrast therapy combines heat and cold exposure through sauna, cold plunge, ice bath and recovery-focused wellness routines.
              </p>
              <p>
                This guide surfaces London spaces that combine sauna and cold therapy experiences, alongside recovery studios and wellness venues built around contrast exposure.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/sauna-london" className="border border-[#d8cebf] px-4 py-3 text-sm text-[#29241d] transition hover:bg-[#fbf8f1]">
                  Explore saunas
                </Link>
                <Link href="/cold-plunge-london" className="border border-[#d8cebf] px-4 py-3 text-sm text-[#29241d] transition hover:bg-[#fbf8f1]">
                  Explore cold plunge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              Why people use contrast therapy
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Heat, cold and recovery routines.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="bg-[#f4efe6] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">
                Sauna + cold plunge
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Many London recovery spaces now combine heat exposure with ice baths or cold plunge circuits.
              </p>
            </article>

            <article className="bg-[#f4efe6] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">
                Post-training recovery
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Contrast therapy is commonly used after training, endurance sessions and physically demanding routines.
              </p>
            </article>

            <article className="bg-[#f4efe6] p-6 sm:p-7">
              <h3 className="mb-4 text-xl font-medium tracking-normal">
                Calm and reset
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Some spaces focus less on performance and more on slower rituals, relaxation and nervous-system recovery.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#d8cebf]/70 pb-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
              Contrast therapy spaces
            </p>
            <h2 className="text-2xl font-medium tracking-normal sm:text-3xl">
              Places to explore
            </h2>
          </div>

          <div className="grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-8">
            {contrastFacilities.map((facility) => (
              <FacilityCard
                key={facility.slug}
                facility={facility}
                source="contrast-therapy"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
