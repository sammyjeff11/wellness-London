import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import { westLondonGuide } from "@/content/location-guides";

export const metadata: Metadata = {
  title: westLondonGuide.title,
  description: westLondonGuide.description,
  alternates: {
    canonical: "/west-london-wellness",
  },
};

export default function WestLondonWellnessPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: westLondonGuide.faqs.map((faq) => ({
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
      <AnalyticsPageView eventName="location_page_view" properties={{ location: "west-london", page_path: "/west-london-wellness" }} />
      <JsonLd data={faqSchema} />

      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">London location guide</p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">{westLondonGuide.title}</h1>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#5f574c]">
              {westLondonGuide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Areas covered</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">West London wellness areas.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {westLondonGuide.areas.map((area) => <span key={area} className="bg-[#f4efe6] px-4 py-2 text-sm text-[#5f574c]">{area}</span>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:text-3xl md:text-4xl">West London Wellness FAQs</h2>
          <div className="space-y-7 sm:space-y-8">
            {westLondonGuide.faqs.map((faq) => (
              <article key={faq.question} className="border-t border-[#d8cebf]/70 pt-6">
                <h3 className="mb-3 text-lg text-[#29241d]">{faq.question}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{faq.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Link href="/sauna-london" className="bg-[#fbf8f1] p-5 text-sm hover:bg-[#eee7da]">Saunas in London</Link>
            <Link href="/cold-plunge-london" className="bg-[#fbf8f1] p-5 text-sm hover:bg-[#eee7da]">Cold Plunge in London</Link>
            <Link href="/cryotherapy-london" className="bg-[#fbf8f1] p-5 text-sm hover:bg-[#eee7da]">Cryotherapy in London</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
