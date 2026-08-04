import type { Metadata } from "next";
import Link from "next/link";
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

export default function ExplorePage() {
  return (
    <main className="bg-[#fbf8f1] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">Explore London wellness</p>
          <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            Browse by goal, service or setting.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
            Start with the outcome you want, then compare the service, access rules, location and practical details before you book.
          </p>
        </div>
      </section>

      <section className="bg-[#f4efe6] px-5 py-12 sm:px-6 md:py-16">
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

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {pillarPages.map((pillar) => (
              <Link
                key={pillar.slug}
                href={pillar.href}
                className="flex min-h-[240px] flex-col justify-between border border-[#d8cebf] bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da]"
              >
                <div>
                  <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">{pillar.eyebrow}</p>
                  <h3 className="mb-4 text-3xl font-medium">{pillar.label}</h3>
                  <p className="text-sm leading-7 text-[#5f574c]">{pillar.intro}</p>
                </div>
                <span className="mt-6 text-sm underline underline-offset-4">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="treatments" className="scroll-mt-28 px-5 py-14 sm:px-6 md:py-20">
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

          <div className="flex flex-wrap gap-3">
            {treatmentLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-[#d8cebf] px-4 py-3 text-sm transition hover:bg-[#f4efe6]"
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
