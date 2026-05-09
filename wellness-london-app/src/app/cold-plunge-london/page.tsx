import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "Best Cold Plunge in London | Wellness London",
  description:
    "Discover the best cold plunge and ice bath experiences in London, from luxury wellness clubs to performance recovery spaces.",
  alternates: {
    canonical: "/cold-plunge-london",
  },
};

const guidancePoints = [
  {
    title: "Session format",
    text: "Check whether the studio offers guided contrast therapy or self-led access, especially if cold immersion is new to you.",
  },
  {
    title: "Facilities",
    text: "Look for clean changing rooms, showers, towels and a quiet recovery area where you can settle after the plunge.",
  },
  {
    title: "Location",
    text: "Choose a studio that fits your weekly training or recovery routine, so the habit feels realistic rather than occasional.",
  },
  {
    title: "Pricing",
    text: "Compare single sessions, class packs and memberships before booking, particularly if you want cold plunge regularly.",
  },
];

const faqs = [
  {
    question: "Where can I do cold plunge in London?",
    answer:
      "London has a growing mix of recovery studios, wellness clubs and contrast therapy spaces offering cold plunge or ice bath sessions.",
  },
  {
    question: "Is cold plunge good after training?",
    answer:
      "Many people use cold plunge as part of a recovery routine after training, especially when paired with rest, hydration and sensible session lengths.",
  },
  {
    question: "Can cold plunge be combined with sauna?",
    answer:
      "Yes. Many studios offer contrast therapy, alternating sauna heat with cold immersion in a structured recovery session.",
  },
  {
    question: "How should I choose a cold plunge studio?",
    answer:
      "Prioritise cleanliness, staff guidance, session format, water temperature, location and whether the space feels calm enough for regular use.",
  },
];

export default async function ColdPlungeLondonPage() {
  const facilities = await getFacilities();
  const coldPlungeFacilities = facilities.filter((facility) =>
    facility.serviceKeys.includes("cold-plunge"),
  );
  const heroImage = coldPlungeFacilities.find((facility) => facility.images.length > 0)?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Cold Plunge in London",
    itemListElement: coldPlungeFacilities.map((facility, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://wellnessldn.com/facility/${facility.slug}`,
      name: facility.name,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-6 py-10">
        <div className="relative mx-auto flex min-h-[460px] max-w-6xl items-end overflow-hidden rounded-[2rem] border border-stone-200 bg-[#b9c4c0] p-8 md:p-12">
          {heroImage ? (
            <Image
              src={heroImage.url}
              alt={heroImage.filename || "Premium cold plunge space in London"}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
          <div className="relative max-w-3xl text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-white/75">
              London cold plunge guide
            </p>
            <h1 className="mb-5 text-5xl font-semibold tracking-tight md:text-6xl">
              Best Cold Plunge in London
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/85">
              Explore London&apos;s best cold plunge experiences, including luxury wellness clubs, contrast therapy studios and premium recovery facilities.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Curated listings</p>
              <h2 className="text-4xl font-semibold tracking-tight">Cold plunge spaces</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link href="/" className="underline underline-offset-4">
                Back to directory
              </Link>
              <Link href="/sauna-london" className="underline underline-offset-4">
                Explore saunas
              </Link>
              <Link href="/cryotherapy-london" className="underline underline-offset-4">
                Explore cryotherapy
              </Link>
            </div>
          </div>

          {coldPlungeFacilities.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {coldPlungeFacilities.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={{
                    slug: facility.slug,
                    name: facility.name,
                    description: facility.editorialSummary || facility.description,
                    website: facility.website,
                    imageUrl: facility.images[0]?.url,
                    imageAlt: facility.images[0]?.filename || facility.name,
                    location: facility.neighbourhood || facility.areaOfLondon,
                    services: facility.servicesOffered,
                    priceRange: facility.overallPriceRange,
                    rating: facility.googleRating,
                    accessType: facility.accessType,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-6">
              <h3 className="mb-2 text-lg font-semibold">No cold plunge listings yet</h3>
              <p className="text-sm text-stone-600">We are still curating cold plunge spaces for this guide. Check back soon for carefully selected London recovery studios.</p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-5 text-stone-600 leading-8">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-[#211d18]">
            Why cold plunge has become a London recovery ritual
          </h2>
          <p>Cold plunge has become part of the city&apos;s recovery language: short, focused and deliberately uncomfortable in a way that feels clarifying. The best spaces make the experience feel controlled rather than chaotic.</p>
          <p>Many London studios now frame cold immersion as part of contrast therapy, pairing plunge pools with sauna, breathwork and quiet rest. That broader setting can make the practice easier to approach and more useful as a repeat ritual.</p>
          <p>For regular users, the appeal is often routine. A well-run cold plunge space can become a reset point between training, work and the pace of the city.</p>
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-4xl font-semibold tracking-tight">How to choose a cold plunge in London</h2>
          <div className="grid gap-5 md:grid-cols-4">
            {guidancePoints.map((point) => (
              <article key={point.title} className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-5">
                <h3 className="mb-2 font-semibold">{point.title}</h3>
                <p className="text-sm leading-6 text-stone-600">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-4xl font-semibold tracking-tight">Cold Plunge London FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-5">
                <h3 className="mb-2 font-semibold">{faq.question}</h3>
                <p className="text-sm leading-6 text-stone-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
