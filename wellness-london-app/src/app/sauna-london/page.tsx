import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Saunas in London | Wellness London",
  description:
    "Discover curated sauna and recovery spaces across London, including premium wellness studios, contrast therapy spaces and recovery facilities.",
  alternates: {
    canonical: "/sauna-london",
  },
};

const guidancePoints = [
  {
    title: "Location",
    text: "Choose somewhere that fits naturally into your week, whether that means close to home, near work, or easy to reach after training.",
  },
  {
    title: "Private vs social experience",
    text: "Private saunas suit quiet recovery, while social studios can feel more energising and ritual-led.",
  },
  {
    title: "Heat type / facilities",
    text: "Look at the full setup, including traditional sauna, infrared heat, cold plunge, showers and relaxation space.",
  },
  {
    title: "Price and membership options",
    text: "Compare single sessions, bundles and memberships so the experience matches how often you plan to visit.",
  },
];

const faqs = [
  {
    question: "Are there good saunas in London?",
    answer:
      "Yes. London now has a growing mix of premium sauna studios, recovery spaces and wellness clubs offering high-quality heat therapy.",
  },
  {
    question: "How much does a sauna session cost in London?",
    answer:
      "Prices vary by location and format, but many premium studios offer single sessions, bundles and memberships at different price points.",
  },
  {
    question: "Should I choose a private sauna or wellness studio?",
    answer:
      "A private sauna is best for quiet, focused recovery. A wellness studio is better if you want a broader experience with guided sessions, contrast therapy or a social atmosphere.",
  },
  {
    question: "Can sauna be combined with cold plunge?",
    answer:
      "Yes. Many London recovery studios combine sauna with cold plunge as contrast therapy, alternating heat and cold in a structured session.",
  },
];

export default async function SaunaLondonPage() {
  const facilities = await getFacilities();

  const saunaFacilities = facilities.filter((facility) =>
    facility.serviceKeys.includes("sauna"),
  );

  const heroImage = saunaFacilities.find((facility) => facility.images.length > 0)
    ?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Saunas in London",
    itemListElement: saunaFacilities.map((facility, index) => ({
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
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "sauna", page_path: "/sauna-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-6 py-10">
        <div className="relative mx-auto flex min-h-[460px] max-w-6xl items-end overflow-hidden rounded-[2rem] border border-stone-200 bg-[#b49b7e] p-8 md:p-12">
          {heroImage ? (
            <Image
              src={heroImage.url}
              alt={heroImage.filename || "Premium sauna space in London"}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
          <div className="relative max-w-3xl text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-white/75">
              London sauna guide
            </p>
            <h1 className="mb-5 text-5xl font-semibold tracking-tight md:text-6xl">
              Best Saunas in London
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/85">
              A curated guide to quality sauna and recovery spaces across London,
              from premium wellness studios to calm contrast therapy destinations.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Curated listings
              </p>
              <h2 className="text-4xl font-semibold tracking-tight">Compare sauna spaces</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <Link href="/" className="underline underline-offset-4">
                Back to directory
              </Link>
              <Link href="/cold-plunge-london" className="underline underline-offset-4">
                Explore cold plunge
              </Link>
              <Link href="/cryotherapy-london" className="underline underline-offset-4">
                Explore cryotherapy
              </Link>
            </div>
          </div>

          <ServiceDirectory
            facilities={saunaFacilities.map(toDirectoryFacility)}
            serviceType="sauna"
            emptyTitle="No sauna listings yet"
            emptyText="We are still curating sauna spaces for this guide. Check back soon for carefully selected London recovery studios."
          />
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight">
            Why sauna is becoming part of London&apos;s recovery culture
          </h2>
          <div className="space-y-5 text-stone-600 leading-8">
            <p>
              Sauna has moved beyond the spa day and into the weekly rhythm of Londoners who train, work hard and want a more deliberate way to recover. The best spaces make heat feel calm and considered, with clean facilities, thoughtful pacing and room to decompress.
            </p>
            <p>
              Across the city, recovery studios are pairing sauna with cold plunge, breathwork and quiet lounge areas. This makes the experience feel less like a quick treatment and more like a complete reset for body and mind.
            </p>
            <p>
              For many people, the appeal is consistency. A well-located sauna can become part of a training plan, a Sunday ritual or a calm pause between busy days in the city.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-4xl font-semibold tracking-tight">
            How to choose the right sauna in London
          </h2>
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
          <h2 className="mb-8 text-4xl font-semibold tracking-tight">Sauna London FAQs</h2>
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
