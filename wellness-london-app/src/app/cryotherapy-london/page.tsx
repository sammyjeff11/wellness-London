import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Cryotherapy in London | Well Edit",
  description:
    "Discover the best cryotherapy studios in London, including luxury recovery clubs, wellness spaces, and premium performance facilities.",
  alternates: {
    canonical: "/cryotherapy-london",
  },
};

const guidancePoints = [
  { title: "Treatment type", text: "Check whether the studio offers whole-body cryotherapy, localised treatments or both before choosing a session." },
  { title: "Staff guidance", text: "Look for clear onboarding and calm staff support, especially if it is your first cryotherapy experience." },
  { title: "Wider recovery setup", text: "Consider whether you want cryotherapy alone or a fuller recovery studio with sauna, compression or cold plunge nearby." },
  { title: "Price and routine", text: "Compare introductory offers, packages and memberships if you expect cryotherapy to become a regular habit." },
];

const faqs = [
  { question: "Are there cryotherapy studios in London?", answer: "Yes. London has specialist cryotherapy studios as well as wider wellness and recovery clubs offering cryotherapy treatments." },
  { question: "What is cryotherapy used for?", answer: "People often use cryotherapy as part of a recovery, performance or general wellness routine, usually alongside sensible rest and training habits." },
  { question: "How do I choose a cryotherapy studio?", answer: "Look for experienced staff, clear safety guidance, clean facilities, transparent pricing and a location you can visit consistently." },
  { question: "Can cryotherapy be part of a wider recovery routine?", answer: "Yes. Many London wellness spaces combine cryotherapy with compression therapy, sauna, cold plunge or other recovery services." },
];

export default async function CryotherapyLondonPage() {
  const facilities = await getFacilities();
  const cryotherapyFacilities = facilities.filter((facility) => facility.serviceKeys.includes("cryotherapy"));
  const heroImage = cryotherapyFacilities.find((facility) => facility.images.length > 0)?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Cryotherapy in London",
    itemListElement: cryotherapyFacilities.map((facility, index) => ({
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
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "cryotherapy", page_path: "/cryotherapy-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-5 pt-6 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[68vh] max-w-[1400px] items-end overflow-hidden bg-[#c9c8c2] px-6 py-12 md:px-14 md:py-16">
          {heroImage ? (
            <Image src={heroImage.url} alt={heroImage.filename || "Premium cryotherapy studio in London"} fill priority sizes="100vw" className="object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/75">Well Edit / London cryotherapy guide</p>
            <h1 className="font-serif text-[4rem] font-normal leading-[0.92] tracking-normal md:text-[7rem]">Best Cryotherapy in London</h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#fbf8f1]/82 md:text-lg">
              Discover London&apos;s leading cryotherapy studios, wellness clubs and recovery spaces offering performance-focused wellness experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Curated listings</p>
              <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">The cryotherapy edit</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[#70695d] md:justify-end">
              <Link href="/" className="underline underline-offset-4">Back to directory</Link>
              <Link href="/sauna-london" className="underline underline-offset-4">Saunas</Link>
              <Link href="/cold-plunge-london" className="underline underline-offset-4">Cold plunge</Link>
            </div>
          </div>

          <ServiceDirectory
            facilities={cryotherapyFacilities.map(toDirectoryFacility)}
            serviceType="cryotherapy"
            emptyTitle="No cryotherapy listings yet"
            emptyText="We are still curating cryotherapy studios for this guide. Check back soon for carefully selected London recovery facilities."
          />
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">Why cryotherapy is growing in London wellness spaces</h2>
          <div className="space-y-6 text-lg leading-9 text-[#70695d]">
            <p>Cryotherapy has moved from niche sports recovery into a wider wellness audience across London. The best studios combine clinical professionalism with a calm, premium environment that feels approachable rather than intimidating.</p>
            <p>Many recovery clubs now include cryotherapy alongside sauna, compression therapy and cold plunge, creating a broader recovery ecosystem rather than a single treatment room.</p>
            <p>For regular users, consistency matters most. Studios that feel easy to return to, well-managed and thoughtfully designed tend to become part of long-term recovery habits.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 font-serif text-5xl font-normal tracking-normal">How to choose cryotherapy in London</h2>
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
          <h2 className="mb-10 font-serif text-5xl font-normal tracking-normal">Cryotherapy London FAQs</h2>
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
