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
import { getFacilitiesForActivity, type ActivityPageConfig } from "@/lib/activity-pages";
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
  const heroImage = activityFacilities.find((facility) => facility.images.length > 0)?.images[0];
  const relatedLinks = [...activity.related, ...buildServiceLocationLinks(activityFacilities, activity.label)];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: activity.title,
    itemListElement: activityFacilities.map((facility, index) => ({
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
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: serviceTypeForAnalytics(activity), page_path: activity.href }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] items-end overflow-hidden bg-[#8f806b] px-5 py-10 sm:min-h-[68vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
          {heroImage ? <SafeImage src={heroImage.url} alt={heroImage.filename || `${activity.label} venue in London`} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well+ / {activity.eyebrow}</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">{activity.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">{activity.heroText}</p>
          </div>
        </div>
      </section>

      <ServiceIntroSection eyebrow={`${activity.label} guide`} title="Understand the experience before you book." paragraphs={[activity.description, activity.heroText]} />
      <ServiceInsightSection eyebrow="Best for" panels={activity.bestFor} />
      <ServiceEvidenceSection notes={activity.evidenceNotes} />
      <ServiceGuidanceSection title={`What to expect from ${activity.label.toLowerCase()} in London`} points={activity.whatToExpect} />
      <ServiceDirectorySection facilities={activityFacilities.map(toDirectoryFacility)} serviceType={serviceTypeForAnalytics(activity)} emptyTitle={`No ${activity.label.toLowerCase()} listings yet`} emptyText={`We are still curating ${activity.label.toLowerCase()} venues for this guide.`} />
      <ServiceGuidanceSection title={`How to choose ${activity.label.toLowerCase()} in London`} points={activity.guidance} />
      <ServiceRelatedSection links={relatedLinks} />
      <ServiceFaqSection title={`${activity.label} London FAQs`} faqs={activity.faqs} />
    </main>
  );
}
