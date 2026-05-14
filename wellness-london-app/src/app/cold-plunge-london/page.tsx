import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { coldPlungeContent } from "@/content/service-page-content";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Cold Plunge & Ice Baths in London | Well+",
  description:
    "Discover curated cold plunge, ice bath and contrast therapy spaces in London with Well+, including guidance on pricing, facilities, beginner support and sauna pairings.",
  alternates: { canonical: "/cold-plunge-london" },
};

export default async function ColdPlungeLondonPage() {
  const facilities = await getFacilities();
  const coldPlungeFacilities = facilities.filter((facility) => facility.serviceKeys.includes("cold-plunge"));
  const heroImage = coldPlungeFacilities.find((facility) => facility.images.length > 0)?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Cold Plunge and Ice Baths in London",
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
    mainEntity: coldPlungeContent.faqs.map((faq) => ({
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
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/75 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well+ / London cold plunge guide</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">Best Cold Plunge in London</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#fbf8f1]/86 sm:mt-8 sm:leading-8 md:text-lg">Ice baths, cold exposure and contrast therapy spaces.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 border-y border-[#d8cebf]/70 py-8 sm:py-10 md:mb-12">
            <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-start">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">The cold plunge edit</p>
                <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-7xl">Cold exposure, chosen with care.</h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-[#5f574c]">
                {coldPlungeContent.editorialIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>

          <ServiceDirectory facilities={coldPlungeFacilities.map(toDirectoryFacility)} serviceType="cold-plunge" emptyTitle="No cold plunge listings yet" emptyText="We are still curating cold plunge spaces for this guide." />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-2xl font-medium tracking-normal sm:mb-12 sm:text-3xl md:text-4xl">How to choose a cold plunge in London</h2>
          <div className="grid gap-8 sm:gap-10 md:grid-cols-4">
            {coldPlungeContent.guidancePoints.map((point) => (
              <article key={point.title}>
                <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">{point.title}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eee7da] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Before you book</p>
          <div className="grid gap-6 md:grid-cols-3">
            {coldPlungeContent.insightPanels.map((panel) => (
              <article key={panel.title} className="bg-[#fbf8f1] p-6 sm:p-7">
                <h3 className="mb-4 text-xl font-medium tracking-normal">{panel.title}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{panel.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-8 sm:py-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Related recovery guides</p>
          <div className="grid gap-6 md:grid-cols-2">
            {coldPlungeContent.internalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group block bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da] sm:p-7">
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">{link.label}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">Cold Plunge London FAQs</h2>
          <div className="space-y-7 sm:space-y-8">
            {coldPlungeContent.faqs.map((faq) => (
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
