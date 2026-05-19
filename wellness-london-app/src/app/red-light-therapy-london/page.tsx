import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Red Light Therapy London | Wellness & Recovery Studios | Well+",
  description: "Discover red light therapy in London with Well+, including wellness studios, recovery spaces and clinics offering light-led treatments.",
  alternates: { canonical: "/red-light-therapy-london" },
};

const editorialIntro = [
  "Red light therapy has become one of London’s most visible wellness treatments, appearing in recovery studios, longevity clinics, beauty-led spaces and premium wellbeing venues.",
  "The experience can vary significantly. Some venues offer dedicated red light beds or panels, while others include light-led treatments as part of a broader menu alongside sauna, cryotherapy, compression or skin-focused services.",
  "Use this guide to compare London red light therapy spaces by atmosphere, treatment setup, location, pricing and whether the venue feels more recovery-led, beauty-led or longevity-led."
];

const guidancePoints = [
  { title: "Treatment setup", text: "Check whether the venue uses a bed, panel, targeted device or broader wellness room setup." },
  { title: "Setting", text: "Some spaces feel clinical, some beauty-led and some recovery-led. Choose the environment that matches why you are booking." },
  { title: "Routine fit", text: "Red light is often positioned as a repeat-use treatment, so location, booking ease and packages matter." },
  { title: "Clarity", text: "Look for clear session length, preparation guidance, pricing and whether staff explain the process before your first visit." }
];

const insightPanels = [
  { title: "Best for comparison", text: "Compare device type, session length, privacy, staff guidance and whether the space offers related recovery or wellness services." },
  { title: "Experience matters", text: "A calm room, clear instructions and easy changing facilities can make the treatment feel much more considered." },
  { title: "Pricing varies", text: "London pricing usually differs between targeted appointments, single sessions, memberships and treatment bundles." }
];

const internalLinks = [
  { href: "/longevity-london", label: "Longevity", text: "Explore London wellness spaces focused on long-term routines and optimisation." },
  { href: "/infrared-sauna-london", label: "Infrared sauna", text: "Compare red light with heat-led recovery and private infrared sauna spaces." }
];

const faqs = [
  { question: "Where can I find red light therapy in London?", answer: "Red light therapy is available in selected London recovery studios, wellness clinics, beauty-led spaces and longevity venues." },
  { question: "What should I check before booking red light therapy?", answer: "Check the treatment setup, session length, privacy, staff guidance, pricing and whether the venue clearly explains what to expect." },
  { question: "Is red light therapy more wellness or beauty focused?", answer: "It can be either. Some London venues position it around recovery and longevity, while others offer it as part of skin or beauty-focused treatment menus." },
  { question: "How much does red light therapy cost in London?", answer: "Pricing varies by venue, device type, session length and whether the treatment is sold individually, in packs or as part of a membership." },
  { question: "Can red light therapy be combined with other treatments?", answer: "Yes. Some venues combine red light with sauna, cryotherapy, compression, facials or wider recovery services." }
];

export default async function RedLightTherapyLondonPage() {
  const facilities = await getFacilities();
  const redLightFacilities = facilities.filter((facility) => facility.serviceKeys.includes("red-light"));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Red Light Therapy London",
    itemListElement: redLightFacilities.map((facility, index) => ({
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
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "red-light", page_path: "/red-light-therapy-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Well+ / London red light guide</p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">Red light therapy in London.</h1>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#5f574c]">
              {editorialIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ServiceDirectory facilities={redLightFacilities.map(toDirectoryFacility)} serviceType="red-light" emptyTitle="No red light therapy listings yet" emptyText="We are still curating red light therapy spaces for this guide." />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-2xl font-medium tracking-normal sm:mb-12 sm:text-3xl md:text-4xl">How to choose red light therapy in London</h2>
          <div className="grid gap-8 sm:gap-10 md:grid-cols-4">
            {guidancePoints.map((point) => (
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
            {insightPanels.map((panel) => (
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
            {internalLinks.map((link) => (
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
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">Red Light Therapy London FAQs</h2>
          <div className="space-y-7 sm:space-y-8">
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
