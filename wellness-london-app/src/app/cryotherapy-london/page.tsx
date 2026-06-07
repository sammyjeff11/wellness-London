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
import { cryotherapyContent } from "@/content/service-page-content";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { buildServiceLocationLinks } from "@/lib/internal-linking";

export const metadata: Metadata = {
  title: "Best Cryotherapy in London | Whole Body & Recovery Studios | Well+",
  description:
    "Discover curated cryotherapy studios in London with Well+, including whole-body cryotherapy, recovery clubs and premium wellness spaces.",
  alternates: { canonical: "/cryotherapy-london" },
};

export default async function CryotherapyLondonPage() {
  const facilities = await getFacilities();
  const cryotherapyFacilities = facilities.filter((facility) => facility.serviceKeys.includes("cryotherapy"));
  const heroImage = cryotherapyFacilities.find((facility) => facility.images.length > 0)?.images[0];
  const relatedLinks = [...cryotherapyContent.internalLinks, ...buildServiceLocationLinks(cryotherapyFacilities, "Cryotherapy")];

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
    mainEntity: cryotherapyContent.faqs.map((faq) => ({
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

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] items-end overflow-hidden bg-[#c9c8c2] px-5 py-10 sm:min-h-[68vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
          {heroImage ? <Image src={heroImage.url} alt={heroImage.filename || "Premium cryotherapy studio in London"} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/75 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well+ / London cryotherapy guide</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">Best Cryotherapy in London</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#fbf8f1]/86 sm:mt-8 sm:leading-8 md:text-lg">Whole-body cryotherapy and cold-therapy recovery spaces.</p>
          </div>
        </div>
      </section>

      <ServiceIntroSection eyebrow="The cryotherapy edit" title="Cryotherapy studios with substance." paragraphs={cryotherapyContent.editorialIntro} />
      <ServiceDirectorySection facilities={cryotherapyFacilities.map(toDirectoryFacility)} serviceType="cryotherapy" emptyTitle="No cryotherapy listings yet" emptyText="We are still curating cryotherapy studios for this guide." />
      <ServiceGuidanceSection title="How to choose cryotherapy in London" points={cryotherapyContent.guidancePoints} />
      <ServiceInsightSection panels={cryotherapyContent.insightPanels} />
      <ServiceRelatedSection links={relatedLinks} />
      <ServiceFaqSection title="Cryotherapy London FAQs" faqs={cryotherapyContent.faqs} />
    </main>
  );
}
