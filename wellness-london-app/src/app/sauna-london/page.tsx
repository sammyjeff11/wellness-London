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
import { saunaContent } from "@/content/service-page-content";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Saunas in London | Infrared, Finnish & Contrast Therapy | Well+",
  description:
    "Discover curated saunas in London with Well+, including infrared sauna rooms, traditional heat experiences, private recovery spaces and contrast therapy studios.",
  alternates: { canonical: "/sauna-london" },
};

export default async function SaunaLondonPage() {
  const facilities = await getFacilities();
  const saunaFacilities = facilities.filter((facility) => facility.serviceKeys.includes("sauna"));
  const heroImage = saunaFacilities.find((facility) => facility.images.length > 0)?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Saunas in London",
    itemListElement: saunaFacilities.map((facility, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://welledit.co.uk/facility/${facility.slug}`,
      name: facility.name,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: saunaContent.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "sauna", page_path: "/sauna-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] items-end overflow-hidden bg-[#b49b7e] px-5 py-10 sm:min-h-[68vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
          {heroImage ? <Image src={heroImage.url} alt={heroImage.filename || "Premium sauna space in London"} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well+ / London sauna guide</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">Best Saunas in London</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">Infrared, traditional heat and contrast therapy spaces across the city.</p>
          </div>
        </div>
      </section>

      <ServiceIntroSection
        eyebrow="The sauna edit"
        title="Heat rooms worth seeking out."
        paragraphs={saunaContent.editorialIntro}
      />

      <ServiceDirectorySection
        facilities={saunaFacilities.map(toDirectoryFacility)}
        serviceType="sauna"
        emptyTitle="No sauna listings yet"
        emptyText="We are still curating sauna spaces for this guide."
      />

      <ServiceGuidanceSection
        title="How to choose a sauna in London"
        points={saunaContent.guidancePoints}
      />

      <ServiceInsightSection
        panels={saunaContent.insightPanels}
      />

      <ServiceRelatedSection
        links={saunaContent.internalLinks}
      />

      <ServiceFaqSection
        title="Sauna London FAQs"
        faqs={saunaContent.faqs}
      />
    </main>
  );
}
