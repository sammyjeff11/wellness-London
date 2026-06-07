import type { Metadata } from "next";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { buildServiceLocationLinks } from "@/lib/internal-linking";

export const metadata: Metadata = {
  title: "Contrast Therapy London | Sauna & Cold Plunge Spaces | Well+",
  description:
    "Discover contrast therapy in London with Well+, including sauna and cold plunge spaces, ice bath studios and recovery-focused wellness venues.",
  alternates: {
    canonical: "/contrast-therapy-london",
  },
};

const faqs = [
  { question: "Where can I find contrast therapy in London?", answer: "Contrast therapy is available in selected London recovery studios, wellness clubs, sauna spaces and cold plunge venues." },
  { question: "What is contrast therapy?", answer: "Contrast therapy usually involves alternating between heat and cold exposure, commonly sauna and cold plunge or ice bath sessions." },
  { question: "What should I check before booking contrast therapy?", answer: "Check the heat and cold setup, whether the session is guided, shower and towel provision, changing facilities, pricing and whether beginners are supported." },
  { question: "Is contrast therapy the same as cold plunge?", answer: "No. Cold plunge is one part of the experience. Contrast therapy normally combines cold exposure with heat exposure, usually sauna." },
];

const internalLinks = [
  { href: "/sauna-london", label: "Sauna in London", text: "Compare heat-led venues that often sit at the centre of a contrast therapy routine." },
  { href: "/cold-plunge-london", label: "Cold plunge in London", text: "Explore cold exposure venues that pair naturally with sauna and heat sessions." },
  { href: "/recovery-london", label: "Recovery spaces in London", text: "Browse broader recovery studios offering heat, cold, compression and performance-led support." },
];

function isContrastFacility(facility: ReturnType<typeof toDirectoryFacility>) {
  const services = facility.services?.join(" ").toLowerCase() || "";

  return (
    services.includes("cold") ||
    services.includes("ice") ||
    services.includes("contrast") ||
    services.includes("sauna")
  );
}

export default async function ContrastTherapyLondonPage() {
  const facilities = await getFacilities();
  const directoryFacilities = facilities.map(toDirectoryFacility);

  const contrastFacilities = directoryFacilities
    .filter(isContrastFacility)
    .slice(0, 9);
  const sourceFacilities = facilities.filter((facility) =>
    contrastFacilities.some((directoryFacility) => directoryFacility.slug === facility.slug),
  );
  const relatedLinks = [...internalLinks, ...buildServiceLocationLinks(sourceFacilities, "Contrast therapy")];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Contrast Therapy London",
    itemListElement: contrastFacilities.map((facility, index) => ({
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
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "contrast-therapy", page_path: "/contrast-therapy-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-5 py-16 sm:px-6 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl border-y border-[#cbbda9] py-10 sm:py-14">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Well+ / Recovery guide</p>
              <h1 className="font-serif text-5xl font-normal leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">Contrast therapy in London.</h1>
            </div>

            <div className="space-y-6 text-base leading-8 text-[#5f574c]">
              <p>
                Contrast therapy combines heat and cold exposure through sauna, cold plunge, ice bath and recovery-focused wellness routines.
              </p>
              <p>
                This Well+ guide surfaces London spaces that combine sauna and cold therapy experiences, alongside recovery studios and wellness venues built around contrast exposure.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/sauna-london" className="border border-[#d8cebf] bg-[#fbf8f1] px-4 py-3 text-sm text-[#29241d] transition hover:bg-[#eee7da]">Explore saunas</Link>
                <Link href="/cold-plunge-london" className="border border-[#d8cebf] bg-[#fbf8f1] px-4 py-3 text-sm text-[#29241d] transition hover:bg-[#eee7da]">Explore cold plunge</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#cbbda9] bg-[#29241d] px-5 py-16 text-[#fbf8f1] sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">Why people use it</p>
          <h2 className="mb-12 max-w-3xl font-serif text-4xl font-normal leading-tight sm:text-5xl">Heat, cold and recovery routines.</h2>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
            <article className="border-t border-[#fbf8f1]/22 pt-5">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Sauna + cold plunge</h3>
              <p className="text-sm leading-7 text-[#fbf8f1]/72">Many London recovery spaces now combine heat exposure with ice baths or cold plunge circuits.</p>
            </article>

            <article className="border-t border-[#fbf8f1]/22 pt-5">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Post-training recovery</h3>
              <p className="text-sm leading-7 text-[#fbf8f1]/72">Contrast therapy is commonly used after training, endurance sessions and physically demanding routines.</p>
            </article>

            <article className="border-t border-[#fbf8f1]/22 pt-5">
              <h3 className="mb-4 text-xl font-medium tracking-normal">Calm and reset</h3>
              <p className="text-sm leading-7 text-[#fbf8f1]/72">Some spaces focus less on performance and more on slower rituals, relaxation and nervous-system recovery.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe6] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#d8cebf] pb-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Contrast therapy spaces</p>
            <h2 className="text-2xl font-medium tracking-normal sm:text-3xl">Places to explore</h2>
          </div>

          <div className="grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-8">
            {contrastFacilities.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} source="contrast-therapy" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#d8cebf] pb-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Continue exploring</p>
            <h2 className="text-2xl font-medium tracking-normal sm:text-3xl">Related contrast therapy guides</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group block border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da] sm:p-7">
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">{link.label}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{link.text}</p>
                <p className="mt-6 text-sm text-[#29241d]">Explore guide →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#cbbda9] bg-[#eee7da] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl bg-[#fbf8f1] p-6 shadow-[0_20px_60px_rgba(41,36,29,0.05)] sm:p-8 md:p-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Questions</p>
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">Contrast Therapy London FAQs</h2>
          <div className="space-y-7 sm:space-y-8">
            {faqs.map((faq) => (
              <article key={faq.question} className="border-t border-[#d8cebf] pt-6">
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
