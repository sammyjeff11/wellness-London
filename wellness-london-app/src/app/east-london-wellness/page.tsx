import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import { eastLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: eastLondonGuide.title,
  description: eastLondonGuide.description,
  alternates: {
    canonical: "/east-london-wellness",
  },
};

export default function EastLondonWellnessPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eastLondonGuide.faqs.map((faq) => ({
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
      <AnalyticsPageView eventName="location_page_view" properties={{ location: "east-london", page_path: "/east-london-wellness" }} />
      <JsonLd data={faqSchema} />

      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                London location guide
              </p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">
                Best Wellness & Recovery Spaces in East London
              </h1>
            </div>

            <div className="space-y-6 text-base leading-8 text-[#5f574c]">
              {eastLondonGuide.intro.map((paragraph) => (
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
              East London recovery culture
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Why East London has become a wellness hub.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {eastLondonGuide.highlights.map((highlight) => (
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
            <Link href="/sauna-london" className="group block bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da] sm:p-7">
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Related guide</p>
              <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                Saunas in London
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Compare infrared, traditional and contrast therapy spaces across the city.
              </p>
            </Link>

            <Link href="/cold-plunge-london" className="group block bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da] sm:p-7">
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Related guide</p>
              <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                Cold Plunge in London
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Explore cold plunge, ice bath and contrast therapy studios.
              </p>
            </Link>

            <Link href="/cryotherapy-london" className="group block bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da] sm:p-7">
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Related guide</p>
              <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                Cryotherapy in London
              </h3>
              <p className="text-sm leading-7 text-[#5f574c]">
                Whole-body and performance-led cryotherapy recovery spaces.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:text-3xl md:text-4xl">
            East London Wellness FAQs
          </h2>

          <div className="space-y-7 sm:space-y-8">
            {eastLondonGuide.faqs.map((faq) => (
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
