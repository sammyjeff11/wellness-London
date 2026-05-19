import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Infrared Sauna London | Private Heat & Recovery Studios | Well+",
  description: "Discover infrared sauna in London with Well+, including private sauna cabins, recovery studios and premium wellness spaces.",
  alternates: { canonical: "/infrared-sauna-london" },
};

const editorialIntro = [
  "Infrared sauna has become a distinct part of London’s heat-therapy scene. It is often quieter, more private and more studio-led than traditional sauna, with many venues offering bookable cabins, calm interiors and repeat-use packages.",
  "The best choice depends on the experience you want: a private solo reset, a couple’s session, a recovery add-on after training, or a heat-led ritual alongside red light, compression or cold exposure.",
  "Use this guide to compare London infrared sauna spaces by privacy, atmosphere, location, pricing, session format and whether the venue offers a wider recovery or wellness routine."
];

const guidancePoints = [
  { title: "Infrared setup", text: "Check whether the sauna is a private cabin, shared room or part of a broader studio experience." },
  { title: "Privacy", text: "Infrared is often chosen for quieter sessions, so confirm whether the room is solo, couple-friendly or shared." },
  { title: "Facilities", text: "Showers, towels, changing space and a calm cool-down area can make the session feel much more premium." },
  { title: "Routine fit", text: "If you plan to go regularly, location, booking ease, packs and opening hours matter as much as the room itself." }
];

const insightPanels = [
  { title: "Infrared versus traditional sauna", text: "Infrared studios usually feel lower-intensity and more private, while traditional sauna often feels hotter, more social and more ritual-led." },
  { title: "Best for first-timers", text: "Choose a venue with clear guidance, flexible session lengths, easy cooling options and a calm room that does not feel intimidating." },
  { title: "Typical London pricing", text: "Pricing varies between private cabins, wellness studios, luxury clubs and membership-led spaces. Compare what is included before booking." }
];

const internalLinks = [
  { href: "/sauna-london", label: "Saunas", text: "Explore the broader London sauna guide, including traditional, infrared and contrast therapy spaces." },
  { href: "/red-light-therapy-london", label: "Red light therapy", text: "Compare infrared sauna with other light and heat-led treatments across London." }
];

const faqs = [
  { question: "Where can I find infrared sauna in London?", answer: "Infrared sauna is available in selected London wellness studios, recovery spaces, gyms and private sauna cabins." },
  { question: "How is infrared sauna different from traditional sauna?", answer: "Infrared sauna is usually positioned as a more private, studio-led and lower-intensity heat experience, while traditional sauna often feels hotter and more communal." },
  { question: "What should I check before booking infrared sauna?", answer: "Check whether the sauna is private or shared, session length, towel and shower provision, cooling space, pricing and whether booking is required." },
  { question: "Is infrared sauna good for beginners?", answer: "Many infrared studios are beginner-friendly because the format is often calmer and more private. Start with a sensible session length and follow the venue’s own guidance." },
  { question: "Can infrared sauna be combined with other treatments?", answer: "Yes. Some London venues combine infrared sauna with red light, compression, cold plunge, massage or broader recovery services." }
];

export default async function InfraredSaunaLondonPage() {
  const facilities = await getFacilities();
  const infraredFacilities = facilities.filter((facility) =>
    facility.servicesOffered.some((service) => service.toLowerCase().includes("infrared")),
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Infrared Sauna London",
    itemListElement: infraredFacilities.map((facility, index) => ({
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
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "infrared-sauna", page_path: "/infrared-sauna-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Well+ / London infrared sauna guide</p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">Infrared sauna in London.</h1>
            </div>
            <div className="space-y-6 text-base leading-8 text-[#5f574c]">
              {editorialIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <ServiceDirectory facilities={infraredFacilities.map(toDirectoryFacility)} serviceType="infrared-sauna" emptyTitle="No infrared sauna listings yet" emptyText="We are still curating infrared sauna spaces for this guide." />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-2xl font-medium tracking-normal sm:mb-12 sm:text-3xl md:text-4xl">How to choose infrared sauna in London</h2>
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
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">Infrared Sauna London FAQs</h2>
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
