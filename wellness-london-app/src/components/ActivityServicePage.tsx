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

function canonicalRelatedHref(href: string) {
  if (href === "/collections/best-sauna-london") return "/editorial/best-saunas-london";
  return href;
}

function ColdContrastIntentGuide({ slug }: { slug: ActivityPageConfig["slug"] }) {
  if (slug !== "cold-plunge-london" && slug !== "contrast-therapy-london") return null;

  const isColdPlunge = slug === "cold-plunge-london";

  return (
    <section className="surface-band-stone px-5 py-10 sm:px-6 sm:py-14" aria-labelledby={`${slug}-intent-heading`}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="editorial-eyebrow mb-3">Choose the right search route</p>
            <h2 id={`${slug}-intent-heading`} className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">
              {isColdPlunge ? "Cold plunge is the cold-water route." : "Contrast therapy is the hot-and-cold route."}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className={`rounded-[1.2rem] border p-6 ${isColdPlunge ? "border-[#29241d] bg-[#fbf8f1]" : "border-[#d8cebf] bg-[#fbf8f1]/70"}`}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Cold plunge / ice bath</p>
              <h3 className="mt-4 font-serif text-3xl leading-none tracking-[-0.035em]">Cold-water immersion</h3>
              <p className="mt-4 text-sm leading-7 text-[#5f574c]">
                Use this route when the main thing you want is an ice bath, cold tub, plunge pool or other cold-water session — whether standalone or available alongside other facilities.
              </p>
              <Link href="/cold-plunge-london" className="mt-5 inline-block text-sm font-medium underline underline-offset-4">
                Compare cold plunge and ice bath venues →
              </Link>
            </article>

            <article className={`rounded-[1.2rem] border p-6 ${!isColdPlunge ? "border-[#29241d] bg-[#fbf8f1]" : "border-[#d8cebf] bg-[#fbf8f1]/70"}`}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Contrast therapy / sauna and plunge</p>
              <h3 className="mt-4 font-serif text-3xl leading-none tracking-[-0.035em]">Heat and cold together</h3>
              <p className="mt-4 text-sm leading-7 text-[#5f574c]">
                Use this route when the experience itself is the alternation between sauna or heat and cold-water immersion, including guided rounds and full thermal circuits.
              </p>
              <Link href="/contrast-therapy-london" className="mt-5 inline-block text-sm font-medium underline underline-offset-4">
                Compare sauna and cold-plunge venues →
              </Link>
            </article>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 border-t border-[#d8cebf]/80 pt-5 text-sm">
          <Link href="/collections/best-cold-plunge-london" className="rounded-full border border-[#d8cebf] px-4 py-2 transition hover:bg-[#fbf8f1]">
            Best cold plunges in London
          </Link>
          <Link href="/collections/best-contrast-therapy-london" className="rounded-full border border-[#d8cebf] px-4 py-2 transition hover:bg-[#fbf8f1]">
            Best contrast therapy in London
          </Link>
          <Link href="/sauna-london" className="rounded-full border border-[#d8cebf] px-4 py-2 transition hover:bg-[#fbf8f1]">
            Sauna in London
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function ActivityServicePage({ activity }: ActivityServicePageProps) {
  const facilities = await getFacilities();
  const activityFacilities = getFacilitiesForActivity(facilities, activity);
  const directoryFacilities = dedupeFacilities(activityFacilities.map(toDirectoryFacility));
  const heroImage = activityFacilities.find((facility) => facility.images.length > 0)?.images[0];
  const relatedLinks = [
    ...activity.related.map((link) => ({ ...link, href: canonicalRelatedHref(link.href) })),
    ...buildServiceLocationLinks(activityFacilities, activity.label),
  ];
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

      <ServiceIntroSection eyebrow={`${activity.label} guide`} title="Understand the experience before you book." paragraphs={[activity.description]} />
      <ColdContrastIntentGuide slug={activity.slug} />
      <ServiceInsightSection eyebrow="Who it tends to suit" panels={activity.bestFor} />
      <ServiceGuidanceSection eyebrow="Compare the formats" title={`What to check before booking ${activity.label.toLowerCase()}`} points={activity.guidance} />
      <ServiceDirectorySection facilities={directoryFacilities} serviceType={serviceType} prioritisedService={activity.label} emptyTitle={`No ${activity.label.toLowerCase()} listings yet`} emptyText={`No published ${activity.label.toLowerCase()} venues currently meet the directory criteria.`} />
      <ServiceGuidanceSection eyebrow="The session" title={`What to expect from ${activity.label.toLowerCase()} in London`} points={activity.whatToExpect} />
      <ServiceEvidenceSection notes={activity.evidenceNotes} />

      <section className="px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <NewsletterSignup
            source={`service_${serviceType}`}
            title={`Keep up with ${activity.label.toLowerCase()} in London`}
            copy={`Get new ${activity.label.toLowerCase()} openings, material venue changes and guides that clarify the booking decision.`}
          />
        </div>
      </section>

      <ServiceRelatedSection links={relatedLinks} />
      <ServiceFaqSection title={`${activity.label} London FAQs`} faqs={activity.faqs} />
    </main>
  );
}
