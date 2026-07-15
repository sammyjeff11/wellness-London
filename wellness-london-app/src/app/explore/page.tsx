import type { Metadata } from "next";
import Link from "next/link";
import HomeVenueSearch from "@/components/HomeVenueSearch";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { pillarPages } from "@/lib/pillar-pages";
import { serviceTaxonomy } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Explore London Wellness | Well+",
  description:
    "Browse London wellness venues by goal, service and setting, from post-training recovery to preventative health.",
  alternates: {
    canonical: "/explore",
  },
};

const treatmentLinks = serviceTaxonomy
  .filter((service) => service.href)
  .map((service) => ({ href: service.href, label: service.name, description: service.description }));

export default async function ExplorePage() {
  const facilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));

  return (
    <main className="bg-[#fbf8f1] text-[#29241d]">
      <section className="px-5 pb-8 pt-10 sm:px-6 sm:py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">Explore London wellness</p>
          <h1 className="font-serif text-[2.8rem] font-normal leading-[0.96] sm:text-6xl md:text-7xl">
            Browse by goal, service or setting.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#5f574c] sm:mt-8 sm:text-lg sm:leading-8">
            Start with the outcome you want, then compare the service, access rules, location and practical details before you book.
          </p>
        </div>
      </section>

      <HomeVenueSearch facilities={facilities} />

      <section className="bg-[#f4efe6] px-5 py-10 sm:px-6 sm:py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Explore by intention</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Start with your goal.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:text-base">
              Use these five routes when you know what you want to achieve but not which treatment or venue will suit you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-5">
            {pillarPages.map((pillar) => (
              <Link
                key={pillar.slug}
                href={pillar.href}
                className="flex min-h-[10.5rem] flex-col justify-between rounded-[1rem] border border-[#d8cebf] bg-[#fbf8f1] p-4 transition hover:bg-[#eee7da] sm:min-h-[240px] sm:p-6"
              >
                <div>
                  <p className="mb-4 hidden text-[10px] uppercase tracking-[0.22em] text-[#8d7d67] sm:block">{pillar.eyebrow}</p>
                  <h3 className="mb-2 text-[1.35rem] font-medium sm:mb-4 sm:text-3xl">{pillar.label}</h3>
                  <p className="line-clamp-3 text-[13px] leading-5 text-[#5f574c] sm:text-sm sm:leading-7">{pillar.intro}</p>
                </div>
                <span className="mt-4 text-sm underline underline-offset-4 sm:mt-6">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 sm:py-14 md:py-20">
        <div className="mx-auto max-w-6xl border-t border-[#d8cebf] pt-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Popular searches</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Browse specific services.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:text-base">
              If you already know the treatment, go straight to a service guide and compare matching venues.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {treatmentLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[0.8rem] border border-[#d8cebf] px-3 py-3 text-sm transition hover:bg-[#f4efe6] sm:rounded-none sm:px-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
