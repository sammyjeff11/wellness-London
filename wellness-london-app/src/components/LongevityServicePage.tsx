import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import LongevityJourney from "@/components/LongevityJourney";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  ServiceDirectorySection,
  ServiceEvidenceSection,
  ServiceFaqSection,
  ServiceGuidanceSection,
  ServiceInsightSection,
  ServiceIntroSection,
  ServiceRelatedSection,
} from "@/components/ServicePageSections";
import { getLongevityFacilities } from "@/lib/longevity-facilities";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import {
  getFacilitiesForLongevityService,
  longevityServicePages,
  type LongevityServicePageConfig,
} from "@/lib/longevity-service-pages";

type Panel = {
  title: string;
  text: string;
};

function DiagnosticInfoSection({
  eyebrow,
  title,
  panels,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  panels: Panel[];
  dark?: boolean;
}) {
  return (
    <section className={`px-5 py-12 sm:px-6 sm:py-16 md:py-20 ${dark ? "bg-[#29241d] text-[#fbf8f1]" : "bg-[#fbf8f1] text-[#29241d]"}`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <p className={`mb-3 text-[10px] uppercase tracking-[0.22em] sm:text-[11px] ${dark ? "text-[#d8cebf]" : "text-[#6f6048]"}`}>{eyebrow}</p>
          <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">{title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {panels.map((panel) => (
            <article key={panel.title} className={`border p-6 ${dark ? "border-[#fbf8f1]/16" : "border-[#d8cebf] bg-[#f4efe6]"}`}>
              <h3 className="font-serif text-2xl font-normal leading-tight">{panel.title}</h3>
              <p className={`mt-3 text-sm leading-7 ${dark ? "text-[#fbf8f1]/72" : "text-[#5f574c]"}`}>{panel.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function LongevityServicePage({ page }: { page: LongevityServicePageConfig }) {
  const facilities = await getLongevityFacilities();
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://welledit.co.uk" },
      { "@type": "ListItem", position: 2, name: "Longevity Clinics", item: "https://welledit.co.uk/longevity" },
      { "@type": "ListItem", position: 3, name: page.label, item: `https://welledit.co.uk${page.href}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: page.slug.replace(/-london$/, ""), page_path: page.href }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] items-end overflow-hidden bg-[#8f806b] px-5 py-10 sm:min-h-[68vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
          {heroImage ? <SafeImage src={heroImage.url} alt={`${page.label} provider in London`} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/34 to-black/10" />
          <div className="relative max-w-5xl text-[#fbf8f1]">
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well+ / {page.eyebrow}</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">{page.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">{page.heroText}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8cebf] px-5 py-5 sm:px-6 md:px-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#6f6048]">Explore longevity services</p>
          <nav aria-label="Longevity service pages" className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1">
            <Link href="/longevity" className="shrink-0 rounded-full border border-[#cfc3b2] bg-[#fbf8f1] px-4 py-2 text-xs text-[#5f574c]">All clinics</Link>
            {longevityServicePages.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                aria-current={service.href === page.href ? "page" : undefined}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs ${
                  service.href === page.href
                    ? "border-[#29241d] bg-[#29241d] text-[#fbf8f1]"
                    : "border-[#cfc3b2] bg-[#fbf8f1] text-[#5f574c]"
                }`}
              >
                {service.shortLabel}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <ServiceIntroSection
        eyebrow={`${page.label} guide`}
        title={page.question}
        paragraphs={[page.description, "The most useful comparison is not only where the test is available, but what is measured, who interprets it, what you receive and whether future results can be compared meaningfully."]}
      />

      <LongevityJourney compact eyebrow="From test to useful action" title="Measurement is only the first step." />
      <ServiceInsightSection eyebrow="Best for" panels={page.bestFor} />
      <DiagnosticInfoSection eyebrow="What is measured" title={`Understand what ${page.label.toLowerCase()} actually covers.`} panels={page.measurementAreas} />
      <DiagnosticInfoSection eyebrow="Results and interpretation" title="Know what you should receive after the assessment." panels={page.resultOutputs} dark />

      <ServiceDirectorySection
        facilities={directoryFacilities}
        serviceType={page.slug.replace(/-london$/, "")}
        prioritisedService={page.label}
        emptyTitle={`No confirmed ${page.label.toLowerCase()} listings yet`}
        emptyText="We are still checking London providers for this guide. A venue will only appear when the matching diagnostic or assessment is explicitly stated or recorded as confirmed."
      />

      <DiagnosticInfoSection eyebrow="Tracking over time" title="Repeat the useful measurement, not the whole package." panels={page.trackingNotes} />
      <ServiceEvidenceSection notes={page.evidenceNotes} />
      <ServiceGuidanceSection title={`What to expect from ${page.label.toLowerCase()} in London`} points={page.whatToExpect} />
      <ServiceGuidanceSection title={`How to choose ${page.label.toLowerCase()} in London`} points={page.guidance} />
      <ServiceRelatedSection links={page.related} />
      <ServiceFaqSection title={`${page.label} London FAQs`} faqs={page.faqs} />

      <section className="border-t border-[#d8cebf] bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <NewsletterSignup
            source={`longevity_${page.slug}`}
            title="Follow the diagnostic edit"
            copy="New London providers, clearer testing guides and useful ways to understand what to measure next."
          />
        </div>
      </section>
    </main>
  );
}
