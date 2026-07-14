import SafeImage from "@/components/SafeImage";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import {
  ServiceDirectorySection,
  ServiceEvidenceSection,
  ServiceFaqSection,
  ServiceGuidanceSection,
  ServiceInsightSection,
  ServiceIntroSection,
  ServiceRelatedSection,
} from "@/components/ServicePageSections";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import {
  getFacilitiesForLongevityService,
  type LongevityServicePageConfig,
} from "@/lib/longevity-service-pages";

export default async function LongevityServicePage({ page }: { page: LongevityServicePageConfig }) {
  const facilities = await getFacilities();
  const matchingFacilities = getFacilitiesForLongevityService(facilities, page);
  const directoryFacilities = dedupeFacilities(matchingFacilities.map(toDirectoryFacility));
  const heroImage = matchingFacilities.find((facility) => facility.images.length > 0)?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    itemListElement: directoryFacilities.map((facility, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://welledit.co.uk/facility/${facility.slug}`,
      name: facility.name,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: page.slug.replace(/-london$/, ""), page_path: page.href }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] items-end overflow-hidden bg-[#8f806b] px-5 py-10 sm:min-h-[68vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
          {heroImage ? <SafeImage src={heroImage.url} alt={`${page.label} provider in London`} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well+ / {page.eyebrow}</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">{page.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">{page.heroText}</p>
          </div>
        </div>
      </section>

      <ServiceIntroSection eyebrow={`${page.label} guide`} title="Understand the assessment before you book." paragraphs={[page.description, page.heroText]} />
      <ServiceInsightSection eyebrow="Best for" panels={page.bestFor} />
      <ServiceEvidenceSection notes={page.evidenceNotes} />
      <ServiceGuidanceSection title={`What to expect from ${page.label.toLowerCase()} in London`} points={page.whatToExpect} />
      <ServiceDirectorySection facilities={directoryFacilities} serviceType={page.slug.replace(/-london$/, "")} prioritisedService={page.label} emptyTitle={`No confirmed ${page.label.toLowerCase()} listings yet`} emptyText={`We are still verifying London providers for this guide. Only venues with a confirmed matching diagnostic or assessment service will appear.`} />
      <ServiceGuidanceSection title={`How to choose ${page.label.toLowerCase()} in London`} points={page.guidance} />
      <ServiceRelatedSection links={page.related} />
      <ServiceFaqSection title={`${page.label} London FAQs`} faqs={page.faqs} />
    </main>
  );
}
