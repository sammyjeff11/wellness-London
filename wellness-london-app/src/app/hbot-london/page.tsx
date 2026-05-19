import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "HBOT London | Hyperbaric Oxygen Providers & Booking Guide | Well+",
  description: "Compare HBOT providers in London with Well+, including practical details on setting, booking, session format and provider information.",
  alternates: { canonical: "/hbot-london" },
};

const editorialIntro = [
  "HBOT is a more specialist service than many wellness treatments, so the provider setting and practical details matter. This guide is designed to help compare London providers by location, appointment format, booking clarity and how clearly the experience is explained.",
  "Some providers operate in a more clinical setting, while others sit within wider wellness or optimisation spaces. Before booking, check the provider’s own information, suitability process and appointment requirements.",
  "Well+ is an editorial directory, not a medical advice service. Use this page as a practical starting point for finding and comparing providers in London."
];

const guidancePoints = [
  { title: "Provider setting", text: "Check whether the appointment takes place in a clinic, wellness space or broader optimisation venue." },
  { title: "Booking clarity", text: "Look for clear information on appointment length, first-visit process, packages and what is required before attending." },
  { title: "Suitability checks", text: "A provider should clearly explain who the service may not be suitable for and what information is needed before booking." },
  { title: "Practical fit", text: "Location, opening hours, access, pricing and repeat-visit options can make a big difference if you are comparing providers." }
];

const insightPanels = [
  { title: "What to check first", text: "Review the provider’s booking process, setting, appointment format, suitability information and cancellation terms before committing." },
  { title: "Compare the experience", text: "The right provider is not only about the service name. Compare supervision, clarity, comfort, location and how professionally the appointment is explained." },
  { title: "Pricing and packages", text: "Pricing can vary by provider and appointment structure. Check whether pricing is for a single appointment, introductory session or package." }
];

const internalLinks = [
  { href: "/longevity-london", label: "Longevity", text: "Explore London spaces focused on optimisation, advanced wellness and longer-term routines." },
  { href: "/red-light-therapy-london", label: "Red light therapy", text: "Compare other specialist wellness services across London." },
  { href: "/cryotherapy-london", label: "Cryotherapy", text: "Explore short-format recovery and cold-therapy studios." },
  { href: "/infrared-sauna-london", label: "Infrared sauna", text: "Explore private heat-led wellness studios and recovery spaces." }
];

const faqs = [
  { question: "Where can I find HBOT in London?", answer: "HBOT is available through selected providers in London. This guide surfaces relevant providers where the service is listed in our directory data." },
  { question: "What should I check before booking?", answer: "Check the provider setting, appointment format, suitability information, booking requirements, pricing and cancellation terms." },
  { question: "Is this page medical advice?", answer: "No. Well+ is an editorial directory. Always rely on the provider’s own guidance and seek appropriate professional advice for personal medical questions." },
  { question: "How should I compare providers?", answer: "Compare location, setting, clarity of information, staff support, appointment structure, pricing and whether the provider explains suitability clearly." },
  { question: "Is HBOT the same as sauna or cryotherapy?", answer: "No. HBOT is a different type of service and is usually more specialist in how it is delivered and explained." }
];

export default async function HbotLondonPage() {
  const facilities = await getFacilities();
  const hbotFacilities = facilities.filter((facility) => facility.serviceKeys.includes("hbot"));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HBOT London",
    itemListElement: hbotFacilities.map((facility, index) => ({
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
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "hbot", page_path: "/hbot-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Well+ / London HBOT guide</p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">HBOT in London.</h1>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#5f574c]">
              {editorialIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ServiceDirectory facilities={hbotFacilities.map(toDirectoryFacility)} serviceType="hbot" emptyTitle="No HBOT listings yet" emptyText="We are still curating HBOT providers for this guide." />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-2xl font-medium tracking-normal sm:mb-12 sm:text-3xl md:text-4xl">How to compare HBOT providers in London</h2>
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
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Related guides</p>
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
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">HBOT London FAQs</h2>
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
