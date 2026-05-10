import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Best Saunas in London | Well Edit",
  description:
    "Discover curated sauna and recovery spaces across London, including premium wellness studios, contrast therapy spaces and recovery facilities.",
  alternates: { canonical: "/sauna-london" },
};

const guidancePoints = [
  { title: "Location", text: "Choose somewhere that fits naturally into your week." },
  { title: "Private or social", text: "Private suits quiet recovery; social studios feel more energising." },
  { title: "Heat and facilities", text: "Check sauna type, showers, plunge access and relaxation space." },
  { title: "Price", text: "Compare single sessions, bundles and memberships." },
];

const faqs = [
  { question: "Are there good saunas in London?", answer: "Yes. London has a growing mix of premium sauna studios, recovery spaces and wellness clubs offering high-quality heat therapy." },
  { question: "How much does a sauna session cost in London?", answer: "Prices vary by location and format, with many studios offering single sessions, bundles and memberships." },
  { question: "Should I choose a private sauna or wellness studio?", answer: "A private sauna is best for quiet recovery. A wellness studio is better for guided sessions, contrast therapy or a social atmosphere." },
  { question: "Can sauna be combined with cold plunge?", answer: "Yes. Many London recovery studios combine sauna and cold plunge as contrast therapy." },
];

export default async function SaunaLondonPage() {
  const facilities = await getFacilities();
  const saunaFacilities = facilities.filter((facility) => facility.serviceKeys.includes("sauna"));
  const heroImage = saunaFacilities.find((facility) => facility.images.length > 0)?.images[0];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Saunas in London",
    itemListElement: saunaFacilities.map((facility, index) => ({
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
      <AnalyticsPageView eventName="service_page_view" properties={{ service_type: "sauna", page_path: "/sauna-london" }} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[58vh] max-w-[1400px] items-end overflow-hidden bg-[#b49b7e] px-5 py-10 sm:min-h-[68vh] sm:px-6 sm:py-12 md:px-14 md:py-16">
          {heroImage ? <Image src={heroImage.url} alt={heroImage.filename || "Premium sauna space in London"} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-6 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/78 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">Well Edit / London sauna guide</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-[4rem] sm:leading-[0.92] md:text-[7rem]">Best Saunas in London</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#fbf8f1]/88 sm:mt-8 sm:leading-8 md:text-lg">Heat-led recovery spaces across the city.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 border-y border-[#d8cebf]/70 py-8 sm:py-10 md:mb-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">The sauna edit</p>
                <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-7xl">Heat rooms worth seeking out.</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f574c]">Sauna spaces selected for atmosphere, access and the quality of the recovery ritual.</p>
              </div>

              <nav aria-label="Related guides" className="flex flex-col gap-3 lg:items-end">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6f6048]">Related guides</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/" className="rounded-full border border-[#cfc5b6] px-4 py-2 text-sm text-[#29241d] transition hover:border-[#29241d] hover:bg-[#f4efe6]">Directory</Link>
                  <Link href="/cold-plunge-london" className="rounded-full border border-[#cfc5b6] px-4 py-2 text-sm text-[#29241d] transition hover:border-[#29241d] hover:bg-[#f4efe6]">Cold plunge</Link>
                  <Link href="/cryotherapy-london" className="rounded-full border border-[#cfc5b6] px-4 py-2 text-sm text-[#29241d] transition hover:border-[#29241d] hover:bg-[#f4efe6]">Cryotherapy</Link>
                </div>
              </nav>
            </div>
          </div>

          <ServiceDirectory
            facilities={saunaFacilities.map(toDirectoryFacility)}
            serviceType="sauna"
            emptyTitle="No sauna listings yet"
            emptyText="We are still curating sauna spaces for this guide."
          />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-2xl font-medium tracking-normal sm:mb-12 sm:text-3xl md:text-4xl">How to choose a sauna in London</h2>
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

      <section className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">Sauna London FAQs</h2>
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
