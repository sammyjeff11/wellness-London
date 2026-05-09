import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Cold Plunge in London | Well Edit",
  description:
    "Discover the best cold plunge and ice bath experiences in London, from luxury wellness clubs to performance recovery spaces.",
  alternates: {
    canonical: "/cold-plunge-london",
  },
};

const guidancePoints = [
  { title: "Session format", text: "Check whether the studio offers guided contrast therapy or self-led access, especially if cold immersion is new to you." },
  { title: "Facilities", text: "Look for clean changing rooms, showers, towels and a quiet recovery area where you can settle after the plunge." },
  { title: "Location", text: "Choose a studio that fits your weekly training or recovery routine, so the habit feels realistic rather than occasional." },
  { title: "Pricing", text: "Compare single sessions, class packs and memberships before booking, particularly if you want cold plunge regularly." },
];

const faqs = [
  { question: "Where can I do cold plunge in London?", answer: "London has a growing mix of recovery studios, wellness clubs and contrast therapy spaces offering cold plunge or ice bath sessions." },
  { question: "Is cold plunge good after training?", answer: "Many people use cold plunge as part of a recovery routine after training, especially when paired with rest, hydration and sensible session lengths." },
  { question: "Can cold plunge be combined with sauna?", answer: "Yes. Many studios offer contrast therapy, alternating sauna heat with cold immersion in a structured recovery session." },
  { question: "How should I choose a cold plunge studio?", answer: "Prioritise cleanliness, staff guidance, session format, water temperature, location and whether the space feels calm enough for regular use." },
];

export default async function ColdPlungeLondonPage() {
  const facilities = await getFacilities();
  const coldPlungeFacilities = facilities.filter((facility) => facility.serviceKeys.includes("cold-plunge"));
  const heroImage = coldPlungeFacilities.find((facility) => facility.images.length > 0)?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Cold Plunge in London",
    itemListElement: coldPlungeFacilities.map((facility, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://welledit.co.uk/facility/${facility.slug}`,
      name: facility.name,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "cold-plunge", page_path: "/cold-plunge-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-5 pt-6 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[68vh] max-w-[1400px] items-end overflow-hidden bg-[#b9c4c0] px-6 py-12 md:px-14 md:py-16">
          {heroImage ? (
            <Image src={heroImage.url} alt={heroImage.filename || "Premium cold plunge space in London"} fill priority sizes="100vw" className="object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/75">Well Edit / London cold plunge guide</p>
            <h1 className="font-serif text-[4rem] font-normal leading-[0.92] tracking-normal md:text-[7rem]">Best Cold Plunge in London</h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#fbf8f1]/82 md:text-lg">
              Explore London&apos;s best cold plunge experiences, including luxury wellness clubs, contrast therapy studios and premium recovery facilities.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Curated listings</p>
              <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">The cold plunge edit</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[#70695d] md:justify-end">
              <Link href="/" className="underline underline-offset-4">Back to directory</Link>
              <Link href="/sauna-london" className="underline underline-offset-4">Saunas</Link>
              <Link href="/cryotherapy-london" className="underline underline-offset-4">Cryotherapy</Link>
            </div>
          </div>

          <ServiceDirectory
            facilities={coldPlungeFacilities.map(toDirectoryFacility)}
            serviceType="cold-plunge"
            emptyTitle="No cold plunge listings yet"
            emptyText="We are still curating cold plunge spaces for this guide. Check back soon for carefully selected London recovery studios."
          />
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">Why cold plunge has become a London recovery ritual</h2>
          <div className="space-y-6 text-lg leading-9 text-[#70695d]">
            <p>Cold plunge has become part of the city&apos;s recovery language: short, focused and deliberately uncomfortable in a way that feels clarifying. The best spaces make the experience feel controlled rather than chaotic.</p>
            <p>Many London studios now frame cold immersion as part of contrast therapy, pairing plunge pools with sauna, breathwork and quiet rest. That broader setting can make the practice easier to approach and more useful as a repeat ritual.</p>
            <p>For regular users, the appeal is often routine. A well-run cold plunge space can become a reset point between training, work and the pace of the city.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 font-serif text-5xl font-normal tracking-normal">How to choose a cold plunge in London</h2>
          <div className="grid gap-10 md:grid-cols-4">
            {guidancePoints.map((point) => (
              <article key={point.title}>
                <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">{point.title}</h3>
                <p className="text-sm leading-7 text-[#70695d]">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 font-serif text-5xl font-normal tracking-normal">Cold Plunge London FAQs</h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <article key={faq.question} className="border-t border-[#d8cebf]/70 pt-6">
                <h3 className="mb-3 text-lg text-[#29241d]">{faq.question}</h3>
                <p className="text-sm leading-7 text-[#70695d]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
