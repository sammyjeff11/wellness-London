import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import type { LocationGuide } from "@/content/location-guides";

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

export default function LocationGuidePage({ guide }: LocationGuidePageProps) {
  const areaName = areaNameFromTitle(guide.title);
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
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14">
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

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              {areaName} recovery culture
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Why {areaName} works for wellness and recovery.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {guide.highlights.map((highlight) => (
              <article key={highlight.title} className="bg-[#f4efe6] p-6 sm:p-7">
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

      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10">
          <div className="grid gap-6 md:grid-cols-3">
            {relatedGuides.map((relatedGuide) => (
              <Link key={relatedGuide.href} href={relatedGuide.href} className="group block bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da] sm:p-7">
                <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Related guide</p>
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                  {relatedGuide.title}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">
                  {relatedGuide.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:text-3xl md:text-4xl">
            {areaName} Wellness FAQs
          </h2>

          <div className="space-y-7 sm:space-y-8">
            {guide.faqs.map((faq) => (
              <article key={faq.question} className="border-t border-[#d8cebf]/70 pt-6">
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
