import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial | Well+ London",
  description:
    "The editorial layer of Well+: best-of guides, practical explainers and curation notes that help you interpret the London wellness directory rather than simply browse it.",
  alternates: { canonical: "/editorial" },
  openGraph: {
    title: "Editorial | Well+ London",
    description:
      "Best-of guides, practical explainers and curation standards from Well+ — the editorial layer of the London wellness directory.",
    url: absoluteUrl("/editorial"),
    type: "website",
  },
};

type EditorialIndexEntry = {
  number: string;
  href: string;
  tag: string;
  title: string;
  standfirst: string;
  meta: string;
};

const indexEntries: EditorialIndexEntry[] = [
  {
    number: "01",
    href: "/editorial/best-saunas-london",
    tag: "Heat Edit 001",
    title: "Best saunas in London",
    standfirst:
      "An editorial shortlist for finding sauna in London — from infrared rooms and recovery studios to fuller heat-and-cold rituals.",
    meta: "Sauna · Infrared · Cold plunge",
  },
  {
    number: "02",
    href: "/best-sauna-cold-plunge-london",
    tag: "Best Of",
    title: "Best sauna + cold plunge",
    standfirst:
      "A directory-backed guide for comparing London spaces where heat and cold can be booked as part of the same recovery ritual.",
    meta: "Contrast · Recovery",
  },
  {
    number: "03",
    href: "/beginner-friendly-wellness-london",
    tag: "Guide",
    title: "Beginner-friendly wellness",
    standfirst:
      "A softer entry point for people who want clear, approachable places to try London wellness and recovery services.",
    meta: "First visits · Low intensity",
  },
];

const standardsEntries = [
  {
    href: "/how-we-curate",
    title: "How we curate",
    description: "What gets a venue into the directory, how listings are weighted and what the editorial picks are based on.",
  },
  {
    href: "/editorial-standards",
    title: "Editorial standards",
    description: "How Well+ writes about venues: sourcing, independence and the line between editorial and listing data.",
  },
];

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Well+ Editorial",
  description:
    "Best-of guides, practical explainers and curation standards from Well+, the curated London wellness directory.",
  url: absoluteUrl("/editorial"),
  isPartOf: { "@type": "WebSite", name: "Well+", url: absoluteUrl("/") },
  hasPart: indexEntries.map((entry) => ({
    "@type": "Article",
    headline: entry.title,
    url: absoluteUrl(entry.href),
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Editorial", item: absoluteUrl("/editorial") },
  ],
};

export default function EditorialHubPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={[collectionPageJsonLd, breadcrumbJsonLd]} />

      <section className="relative isolate overflow-hidden bg-[#29241d] text-[#fbf8f1]">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(90deg,#fbf8f1_1px,transparent_1px),linear-gradient(#fbf8f1_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24 md:py-28">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-[#fbf8f1]/62">
            <Link href="/" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Home</Link>
            <span>/</span>
            <span className="text-[#fbf8f1]/86">Editorial</span>
          </nav>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-[#cbbda8]">Well+ Editorial</p>
              <h1 className="font-serif text-[4.2rem] font-normal leading-[0.86] tracking-[-0.03em] sm:text-8xl lg:text-[7.5rem]">
                Guides, edits and standards.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[#fbf8f1]/74 sm:text-xl sm:leading-9">
                The editorial layer of Well+: best-of guides, practical explainers and curation notes that help you interpret the directory rather than simply browse it.
              </p>
            </div>

            <div className="border-t border-[#fbf8f1]/16 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">In this section</p>
              <p className="mt-4 max-w-xs font-serif text-2xl font-normal leading-[1.12] tracking-[-0.02em] text-[#fbf8f1]/92">
                The directory answers what is available. Editorial answers what is worth considering, and why.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="editorial-contents">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#29241d]/22 pb-5">
            <h2 id="editorial-contents" className="text-[11px] uppercase tracking-[0.26em] text-[#8d7d67]">
              Contents
            </h2>
            <p className="text-sm text-[#5f574c]">Issue order · newest first as the section grows</p>
          </div>

          <ol className="list-none">
            {indexEntries.map((entry) => (
              <li key={entry.href} className="border-b border-[#29241d]/16">
                <Link
                  href={entry.href}
                  className="group grid gap-5 py-9 transition-colors duration-300 hover:bg-[#29241d] hover:text-[#fbf8f1] sm:py-11 lg:grid-cols-[0.16fr_0.2fr_0.64fr] lg:items-start lg:gap-8 lg:px-5 lg:-mx-5"
                >
                  <p className="font-serif text-6xl font-normal leading-none tracking-[-0.04em] text-[#29241d]/22 transition-colors group-hover:text-[#fbf8f1]/24 sm:text-7xl">
                    {entry.number}
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#8d7d67] transition-colors group-hover:text-[#cbbda8] lg:pt-3">
                    {entry.tag}
                  </p>

                  <div className="lg:pt-1">
                    <h3 className="max-w-2xl font-serif text-[2.6rem] font-normal leading-[0.96] tracking-[-0.025em] sm:text-5xl">
                      {entry.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f574c] transition-colors group-hover:text-[#fbf8f1]/72 sm:text-lg sm:leading-8">
                      {entry.standfirst}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#8d7d67] transition-colors group-hover:text-[#cbbda8]">
                      <span>{entry.meta}</span>
                      <span className="underline underline-offset-4 transition-transform group-hover:translate-x-1">Read the edit →</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-6 sm:pb-16" aria-labelledby="editorial-standards-heading">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 border-t border-[#29241d]/22 pt-9 lg:grid-cols-[0.36fr_0.64fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#8d7d67]">Standards</p>
              <h2 id="editorial-standards-heading" className="mt-4 max-w-xs font-serif text-4xl font-normal leading-[1] tracking-[-0.02em]">
                How this section is made.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden bg-[#29241d]/16 sm:grid-cols-2">
              {standardsEntries.map((entry) => (
                <Link key={entry.href} href={entry.href} className="group bg-[#f4efe6] py-6 pr-6 transition hover:bg-[#fbf8f1] sm:px-6">
                  <h3 className="font-serif text-2xl font-normal leading-[1.05] tracking-[-0.02em]">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5f574c]">{entry.description}</p>
                  <p className="mt-5 text-sm text-[#8d7d67] underline underline-offset-4 transition group-hover:translate-x-1 group-hover:text-[#29241d]">
                    Read →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-7 bg-[#29241d] p-6 text-[#fbf8f1] sm:p-9 lg:grid-cols-[0.62fr_0.38fr] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#fbf8f1]/52">From editorial to the directory</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-normal leading-[1] tracking-[-0.02em] sm:text-5xl">
              Every edit points back to live venue profiles.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/explore" className="rounded-full border border-[#fbf8f1]/24 px-5 py-2.5 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">
              Explore the directory
            </Link>
            <Link href="/sauna-london" className="rounded-full border border-[#fbf8f1]/24 px-5 py-2.5 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">
              Sauna in London
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
