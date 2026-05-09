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

      <section className="px-5 pt-6 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[68vh] max-w-[1400px] items-end overflow-hidden bg-[#b9c4c0] px-6 py-12 md:px-14 md:py-16">
          {heroImage ? <Image src={heroImage.url} alt={heroImage.filename || "Premium cold plunge space in London"} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/75">Well Edit / London cold plunge guide</p>
            <h1 className="font-serif text-[4rem] font-normal leading-[0.92] tracking-normal md:text-[7rem]">Best Cold Plunge in London</h1>
            <p className="mt-8 max-w-lg text-base leading-8 text-[#fbf8f1]/86 md:text-lg">Cold exposure and contrast therapy spaces.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.18fr_0.72fr_1.1fr]">
          <p className="text-6xl font-light leading-none text-[#c7bba9] md:text-8xl">01</p>
          <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">Why cold plunge now</h2>
          <div className="space-y-6 text-lg leading-9 text-[#5f574c]">
            <p>Cold plunge has become a short, focused ritual for reset and recovery.</p>
            <p>The best studios make the experience controlled, clean and approachable.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.18fr_0.72fr_1.1fr] md:items-end">
            <p className="text-6xl font-light leading-none text-[#c7bba9] md:text-8xl">02</p>
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Curated listings</p>
              <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">The cold plunge edit</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[#5f574c] md:justify-end">
              <Link href="/" className="underline underline-offset-4">Back to directory</Link>
              <Link href="/sauna-london" className="underline underline-offset-4">Saunas</Link>
              <Link href="/cryotherapy-london" className="underline underline-offset-4">Cryotherapy</Link>
            </div>
          </div>

          <ServiceDirectory facilities={coldPlungeFacilities.map(toDirectoryFacility)} serviceType="cold-plunge" emptyTitle="No cold plunge listings yet" emptyText="We are still curating cold plunge spaces for this guide." />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end gap-8">
            <p className="text-6xl font-light leading-none text-[#c7bba9] md:text-8xl">03</p>
            <h2 className="text-3xl font-medium tracking-normal md:text-4xl">How to choose</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-4">
            {guidancePoints.map((point, index) => (
              <article key={point.title}>
                <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#6f6048]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">{point.title}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-6xl font-light leading-none text-[#c7bba9] md:text-8xl">04</p>
          <h2 className="mb-10 text-3xl font-medium tracking-normal md:text-4xl">Cold Plunge London FAQs</h2>
          <div className="space-y-8">
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
