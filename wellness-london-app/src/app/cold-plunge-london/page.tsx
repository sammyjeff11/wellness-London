import type { Metadata } from "next";
import Image from "next/image";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Cold Plunge in London | Well Edit",
  description:
    "Discover the best cold plunge and ice bath experiences in London, from luxury wellness clubs to performance recovery spaces.",
  alternates: { canonical: "/cold-plunge-london" },
};

const guidancePoints = [
  { title: "Session format", text: "Choose guided contrast therapy or self-led access." },
  { title: "Facilities", text: "Look for showers, towels and space to recover after." },
  { title: "Location", text: "Pick somewhere realistic for your weekly routine." },
  { title: "Pricing", text: "Compare single sessions, packs and memberships." },
];

const faqs = [
  { question: "Where can I do cold plunge in London?", answer: "London has recovery studios, wellness clubs and contrast therapy spaces offering cold plunge or ice bath sessions." },
  { question: "Is cold plunge good after training?", answer: "Many people use cold plunge as part of a recovery routine after training, alongside rest and sensible session lengths." },
  { question: "Can cold plunge be combined with sauna?", answer: "Yes. Many studios offer contrast therapy, alternating sauna heat with cold immersion." },
  { question: "How should I choose a cold plunge studio?", answer: "Prioritise cleanliness, guidance, session format, location and whether the space feels calm enough to revisit." },
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

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] items-end overflow-hidden bg-[#b9c4c0] px-5 py-10 sm:min-h-[68vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
          {heroImage ? <Image src={heroImage.url} alt={heroImage.filename || "Premium cold plunge space in London"} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/75 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well Edit / London cold plunge guide</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">Best Cold Plunge in London</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#fbf8f1]/86 sm:mt-8 sm:leading-8 md:text-lg">Cold exposure and contrast therapy spaces.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 border-y border-[#d8cebf]/70 py-8 sm:py-10 md:mb-12">
            <div className="max-w-4xl">
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">The cold plunge edit</p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-7xl">Cold exposure, chosen with care.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f574c]">Ice bath and contrast spaces selected for clean facilities, clear guidance and room to recover after.</p>
            </div>
          </div>

          <ServiceDirectory facilities={coldPlungeFacilities.map(toDirectoryFacility)} serviceType="cold-plunge" emptyTitle="No cold plunge listings yet" emptyText="We are still curating cold plunge spaces for this guide." />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-2xl font-medium tracking-normal sm:mb-12 sm:text-3xl md:text-4xl">How to choose a cold plunge in London</h2>
          <div className="grid gap-8 sm:gap-10 md:grid-cols-4">
            {guidancePoints.map((point) => (
              <article key={point.title}>
                <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">{point.title}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">Cold Plunge London FAQs</h2>
          <div className="space-y-7 sm:space-y-8">
            {faqs.map((faq) => (
              <article key={faq.question} className="border-t border-[#d8cebf]/70 pt-6">
                <h3 className="mb-3 text-lg text-[#29241d]">{faq.question}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
