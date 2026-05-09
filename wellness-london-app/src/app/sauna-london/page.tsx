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
  alternates: {
    canonical: "/sauna-london",
  },
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

      <section className="px-5 pt-6 md:px-8 md:pt-8">
        <div className="relative mx-auto flex min-h-[68vh] max-w-[1400px] items-end overflow-hidden bg-[#b49b7e] px-6 py-12 md:px-14 md:py-16">
          {heroImage ? (
            <Image src={heroImage.url} alt={heroImage.filename || "Premium sauna space in London"} fill priority sizes="100vw" className="object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/24 to-transparent" />
          <div className="relative max-w-4xl text-[#fbf8f1]">
            <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/75">Well Edit / London sauna guide</p>
            <h1 className="font-serif text-[4rem] font-normal leading-[0.92] tracking-normal md:text-[7rem]">Best Saunas in London</h1>
            <p className="mt-8 max-w-lg text-base leading-8 text-[#fbf8f1]/86 md:text-lg">Heat-led recovery spaces across the city.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.18fr_0.72fr_1.1fr]">
          <p className="text-6xl font-light leading-none text-[#c7bba9] md:text-8xl">01</p>
          <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">Why sauna now</h2>
          <div className="space-y-6 text-lg leading-9 text-[#5f574c]">
            <p>Sauna has moved beyond the spa day and into weekly recovery routines.</p>
            <p>The best London spaces make heat feel calm, clean and easy to return to.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.18fr_0.72fr_1.1fr] md:items-end">
            <p className="text-6xl font-light leading-none text-[#c7bba9] md:text-8xl">02</p>
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Curated listings</p>
              <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">The sauna edit</h2>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[#5f574c] md:justify-end">
              <Link href="/" className="underline underline-offset-4">Back to directory</Link>
              <Link href="/cold-plunge-london" className="underline underline-offset-4">Cold plunge</Link>
              <Link href="/cryotherapy-london" className="underline underline-offset-4">Cryotherapy</Link>
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

      <section className="border-y border-[#d8cebf]/70 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end gap-8">
            <p className="text-6xl font-light leading-none text-[#c7bba9] md:text-8xl">03</p>
            <h2 className="text-3xl font-medium tracking-normal md:text-4xl">How to choose</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-4">
            {guidancePoints.map((point, index) => (
              <article key={point.title}>
                <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#6f6048]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">{point.title}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-6xl font-light leading-none text-[#c7bba9] md:text-8xl">04</p>
          <h2 className="mb-10 text-3xl font-medium tracking-normal md:text-4xl">Sauna London FAQs</h2>
          <div className="space-y-8">
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
