import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import LocationPageEnhancements from "@/components/LocationPageEnhancements";
import type { LocationGuide } from "@/content/location-guides";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { getFacilitiesForLocation } from "@/lib/location-page-facilities";

type LocationGuidePageProps = {
  guide: LocationGuide;
};

const relatedGuides = [
  {
    href: "/sauna-london",
    title: "Saunas in London",
    text: "Compare infrared, traditional and contrast therapy spaces across the city.",
  },
  {
    href: "/cold-plunge-london",
    title: "Cold Plunge in London",
    text: "Explore cold plunge, ice bath and contrast therapy studios.",
  },
  {
    href: "/cryotherapy-london",
    title: "Cryotherapy in London",
    text: "Whole-body and performance-led cryotherapy recovery spaces.",
  },
];

function areaNameFromTitle(title: string) {
  return title.replace("Best Wellness & Recovery Spaces in ", "");
}

function getRelatedAreaLinks(slug: string) {
  const linksBySlug: Record<string, { href: string; label: string }[]> = {
    "central-london-wellness": [
      { href: "/east-london-wellness", label: "East London wellness spaces" },
      { href: "/west-london-wellness", label: "West London wellness spaces" },
      { href: "/neighbourhoods/soho", label: "Soho wellness spaces" },
      { href: "/neighbourhoods/marylebone", label: "Marylebone wellness spaces" },
    ],
    "east-london-wellness": [
      { href: "/neighbourhoods/shoreditch", label: "Shoreditch wellness spaces" },
      { href: "/neighbourhoods/canary-wharf", label: "Canary Wharf wellness spaces" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    "west-london-wellness": [
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
      { href: "/neighbourhoods/notting-hill", label: "Notting Hill wellness spaces" },
    ],
    "north-london-wellness": [
      { href: "/neighbourhoods/hampstead", label: "Hampstead wellness spaces" },
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
    "south-london-wellness": [
      { href: "/central-london-wellness", label: "Central London wellness spaces" },
    ],
  };

  return linksBySlug[slug] || [];
}

export default async function LocationGuidePage({ guide }: LocationGuidePageProps) {
  const areaName = areaNameFromTitle(guide.title);
  const facilities = (await getFacilities()).map(toDirectoryFacility);
  const locationFacilities = getFacilitiesForLocation(facilities, [areaName, ...guide.areas]);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="location_page_view" properties={{ location: guide.slug, page_path: `/${guide.slug}` }} />
      <JsonLd data={faqSchema} />

      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#cbbda9] py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                London location guide
              </p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">
                {guide.title}
              </h1>
            </div>

            <div className="space-y-6 text-base leading-8 text-[#5f574c]">
              {guide.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#cbbda9] bg-[#eee7da] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              {areaName} recovery culture
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Why {areaName} works for wellness and recovery.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {guide.highlights.map((highlight) => (
              <article key={highlight.title} className="border border-[#d8cebf] bg-[#fbf8f1] p-6 shadow-[0_20px_50px_rgba(41,36,29,0.045)] sm:p-7">
                <h3 className="mb-4 text-xl font-medium tracking-normal">
                  {highlight.title}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">
                  {highlight.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LocationPageEnhancements
        areaName={areaName}
        facilities={locationFacilities}
        intro={`Explore recovery venues in ${areaName} offering sauna, cold plunge, contrast therapy and other wellness services. Compare facilities by service type, setting and location before choosing where to book.`}
        relatedAreaLinks={getRelatedAreaLinks(guide.slug)}
      />

      <section className="bg-[#fbf8f1] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#d8cebf] pb-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Continue exploring</p>
            <h2 className="text-2xl font-medium tracking-normal sm:text-3xl">Related London guides</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedGuides.map((relatedGuide) => (
              <Link key={relatedGuide.href} href={relatedGuide.href} className="group block border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da] sm:p-7">
                <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Related guide</p>
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                  {relatedGuide.title}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">
                  {relatedGuide.text}
                </p>
                <p className="mt-6 text-sm text-[#29241d]">Explore guide →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#cbbda9] bg-[#eee7da] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl bg-[#fbf8f1] p-6 shadow-[0_20px_60px_rgba(41,36,29,0.05)] sm:p-8 md:p-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Questions</p>
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:text-3xl md:text-4xl">
            {areaName} Wellness FAQs
          </h2>

          <div className="space-y-7 sm:space-y-8">
            {guide.faqs.map((faq) => (
              <article key={faq.question} className="border-t border-[#d8cebf] pt-6">
                <h3 className="mb-3 text-lg text-[#29241d]">
                  {faq.question}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
