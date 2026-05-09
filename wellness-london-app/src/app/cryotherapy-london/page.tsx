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
  alternates: { canonical: "/cryotherapy-london" },
};

const guidancePoints = [
  { title: "Treatment type", text: "Check whether whole-body, localised or both are available." },
  { title: "Staff guidance", text: "Look for calm onboarding and clear safety support." },
  { title: "Recovery setup", text: "Decide whether you want cryotherapy alone or a wider studio." },
  { title: "Price", text: "Compare intro offers, packages and memberships." },
];

const faqs = [
  { question: "Are there cryotherapy studios in London?", answer: "Yes. London has specialist cryotherapy studios and wider recovery clubs offering cryotherapy treatments." },
  { question: "What is cryotherapy used for?", answer: "People often use cryotherapy as part of recovery, performance or general wellness routines." },
  { question: "How do I choose a cryotherapy studio?", answer: "Look for experienced staff, clear safety guidance, clean facilities, transparent pricing and a practical location." },
  { question: "Can cryotherapy be part of a wider recovery routine?", answer: "Yes. Many London wellness spaces combine cryotherapy with compression, sauna, cold plunge or other recovery services." },
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
          {heroImage ? <Image src={heroImage.url} alt={heroImage.filename || "Premium cryotherapy studio in London"} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/75">Well Edit / London cryotherapy guide</p>
            <h1 className="font-serif text-[4rem] font-normal leading-[0.92] tracking-normal md:text-[7rem]">Best Cryotherapy in London</h1>
            <p className="mt-8 max-w-lg text-base leading-8 text-[#fbf8f1]/86 md:text-lg">Cold therapy for recovery and performance.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">The Well Edit cryotherapy selection</p>
              <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">Spaces worth comparing first.</h2>
            </div>
            <div className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              <p className="mb-5">Start with the listings, then use the filters to narrow by location, price, access and experience style.</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href="/" className="underline underline-offset-4">Back to directory</Link>
                <Link href="/sauna-london" className="underline underline-offset-4">Saunas</Link>
                <Link href="/cold-plunge-london" className="underline underline-offset-4">Cold plunge</Link>
              </div>
            </div>
          </div>

          <ServiceDirectory facilities={cryotherapyFacilities.map(toDirectoryFacility)} serviceType="cryotherapy" emptyTitle="No cryotherapy listings yet" emptyText="We are still curating cryotherapy studios for this guide." />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-3xl font-medium tracking-normal md:text-4xl">How to choose cryotherapy in London</h2>
          <div className="grid gap-10 md:grid-cols-4">
            {guidancePoints.map((point) => (
              <article key={point.title}>
                <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">{point.title}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-3xl font-medium tracking-normal md:text-4xl">Cryotherapy London FAQs</h2>
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
