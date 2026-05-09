import type { Metadata } from "next";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "Best Cryotherapy in London | Wellness London",
  description:
    "Discover the best cryotherapy studios in London, including luxury recovery clubs, wellness spaces, and premium performance facilities.",
};

const guidancePoints = [
  "Check whether the studio offers whole-body cryotherapy, localised treatments or both.",
  "Look for clear staff guidance, especially if it is your first session.",
  "Consider whether you want cryotherapy alone or a wider recovery studio setup.",
  "Compare introductory offers, packages and memberships for regular use.",
];

const faqs = [
  {
    question: "Are there cryotherapy studios in London?",
    answer:
      "Yes. London has specialist cryotherapy studios as well as wider wellness and recovery clubs offering cryotherapy treatments.",
  },
  {
    question: "What is cryotherapy used for?",
    answer:
      "People often use cryotherapy as part of a recovery, performance or general wellness routine, usually alongside sensible rest and training habits.",
  },
  {
    question: "How do I choose a cryotherapy studio?",
    answer:
      "Look for experienced staff, clear safety guidance, clean facilities, transparent pricing and a location you can visit consistently.",
  },
  {
    question: "Can cryotherapy be part of a wider recovery routine?",
    answer:
      "Yes. Many London wellness spaces combine cryotherapy with compression therapy, sauna, cold plunge or other recovery services.",
  },
];

export default async function CryotherapyLondonPage() {
  const facilities = await getFacilities();
  const cryotherapyFacilities = facilities.filter((facility) =>
    facility.servicesOffered.some((service) =>
      service.toLowerCase().includes("cryo"),
    ),
  );
  const heroImage = cryotherapyFacilities.find((facility) => facility.images.length > 0)?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Cryotherapy in London",
    itemListElement: cryotherapyFacilities.map((facility, index) => ({
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
        <div className="relative mx-auto flex min-h-[460px] max-w-6xl items-end overflow-hidden rounded-[2rem] border border-stone-200 bg-[#c9c8c2] p-8 md:p-12">
          {heroImage ? (
            <img src={heroImage.url} alt={heroImage.filename} className="absolute inset-0 h-full w-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
          <div className="relative max-w-3xl text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-white/75">
              London cryotherapy guide
            </p>
            <h1 className="mb-5 text-5xl font-semibold tracking-tight md:text-6xl">
              Best Cryotherapy in London
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/85">
              Discover London’s leading cryotherapy studios, wellness clubs and recovery spaces offering performance-focused wellness experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Curated listings</p>
              <h2 className="text-4xl font-semibold tracking-tight">Cryotherapy spaces</h2>
            </div>
            <Link href="/cold-plunge-london" className="text-sm font-medium underline">Explore cold plunge</Link>
          </div>

          {cryotherapyFacilities.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {cryotherapyFacilities.map((facility) => (
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
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-6">
              <h3 className="mb-2 text-lg font-semibold">No cryotherapy listings yet</h3>
              <p className="text-sm text-stone-600">We are still curating cryotherapy studios for this guide. Check back soon for carefully selected London recovery facilities.</p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-5 text-stone-600 leading-8">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-[#211d18]">
            Why cryotherapy is growing in London wellness spaces
          </h2>
          <p>Cryotherapy has moved from niche sports recovery into a wider wellness audience across London. The best studios combine clinical professionalism with a calm, premium environment that feels approachable rather than intimidating.</p>
          <p>Many recovery clubs now include cryotherapy alongside sauna, compression therapy and cold plunge, creating a broader recovery ecosystem rather than a single treatment room.</p>
          <p>For regular users, consistency matters most. Studios that feel easy to return to, well-managed and thoughtfully designed tend to become part of long-term recovery habits.</p>
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-4xl font-semibold tracking-tight">How to choose cryotherapy in London</h2>
          <div className="grid gap-5 md:grid-cols-4">
            {guidancePoints.map((point) => (
              <article key={point} className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-5">
                <p className="text-sm leading-6 text-stone-600">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-4xl font-semibold tracking-tight">Cryotherapy London FAQs</h2>
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
