import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
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
import { getFacilities } from "@/lib/airtable";
import { getFacilitiesForActivity, type ActivityPageConfig } from "@/lib/activity-pages";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { buildServiceLocationLinks } from "@/lib/internal-linking";

type ActivityServicePageProps = {
  activity: ActivityPageConfig;
};

function serviceTypeForAnalytics(activity: ActivityPageConfig) {
  return activity.serviceKeys[0] || activity.slug.replace(/-london$/, "");
}

export default async function ActivityServicePage({ activity }: ActivityServicePageProps) {
  const facilities = await getFacilities();
  const activityFacilities = getFacilitiesForActivity(facilities, activity);
  const directoryFacilities = dedupeFacilities(activityFacilities.map(toDirectoryFacility));
  const heroImage = activityFacilities.find((facility) => facility.images.length > 0)?.images[0];
  const relatedLinks = [...activity.related, ...buildServiceLocationLinks(activityFacilities, activity.label)];
  const serviceType = serviceTypeForAnalytics(activity);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: activity.title,
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
    mainEntity: activity.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: serviceType, page_path: activity.href }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] items-end overflow-hidden bg-[#8f806b] px-5 py-10 sm:min-h-[68vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
          {heroImage ? <SafeImage src={heroImage.url} alt={`${activity.label} venue in London`} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#fbf8f1]/72">
              <Link href="/" className="underline-offset-4 hover:text-white hover:underline">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/services" className="underline-offset-4 hover:text-white hover:underline">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-[#fbf8f1]">{activity.label}</span>
            </nav>
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well+ / {activity.eyebrow}</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">{activity.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">{activity.heroText}</p>
          </div>
        </div>
      </section>

      <ServiceIntroSection eyebrow={`${activity.label} guide`} title="Understand the experience before you book." paragraphs={[activity.description, activity.heroText]} />
      <ServiceDirectorySection facilities={directoryFacilities} serviceType={serviceType} prioritisedService={activity.label} emptyTitle={`No ${activity.label.toLowerCase()} listings yet`} emptyText={`We are still curating ${activity.label.toLowerCase()} venues for this guide.`} />
      <ServiceInsightSection eyebrow="Best for" panels={activity.bestFor} />
      <ServiceEvidenceSection notes={activity.evidenceNotes} />
      <ServiceGuidanceSection title={`What to expect from ${activity.label.toLowerCase()} in London`} points={activity.whatToExpect} />
      <ServiceGuidanceSection title={`How to choose ${activity.label.toLowerCase()} in London`} points={activity.guidance} />

      <section className="px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <NewsletterSignup
            source={`service_${serviceType}`}
            title={`Keep up with ${activity.label.toLowerCase()} in London`}
            copy={`Join The Well+ Edit for new ${activity.label.toLowerCase()} venues, practical comparisons and worthwhile London wellness updates.`}
          />
        </div>
      </section>

      <ServiceRelatedSection links={relatedLinks} />
      <ServiceFaqSection title={`${activity.label} London FAQs`} faqs={activity.faqs} />
    </main>
  );
}
