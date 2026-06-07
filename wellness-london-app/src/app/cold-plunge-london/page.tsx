import type { Metadata } from "next";
import Image from "next/image";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import {
  ServiceDirectorySection,
  ServiceFaqSection,
  ServiceGuidanceSection,
  ServiceInsightSection,
  ServiceIntroSection,
  ServiceRelatedSection,
} from "@/components/ServicePageSections";
import { coldPlungeContent } from "@/content/service-page-content";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { buildServiceLocationLinks } from "@/lib/internal-linking";

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
  const relatedLinks = [...coldPlungeContent.internalLinks, ...buildServiceLocationLinks(coldPlungeFacilities, "Cold plunge")];

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

      <ServiceIntroSection eyebrow="The cold plunge edit" title="Cold exposure, chosen with care." paragraphs={coldPlungeContent.editorialIntro} />
      <ServiceDirectorySection facilities={coldPlungeFacilities.map(toDirectoryFacility)} serviceType="cold-plunge" emptyTitle="No cold plunge listings yet" emptyText="We are still curating cold plunge spaces for this guide." />
      <ServiceGuidanceSection title="How to choose a cold plunge in London" points={coldPlungeContent.guidancePoints} />
      <ServiceInsightSection panels={coldPlungeContent.insightPanels} />
      <ServiceRelatedSection links={relatedLinks} />
      <ServiceFaqSection title="Cold Plunge London FAQs" faqs={coldPlungeContent.faqs} />
    </main>
  );
}
