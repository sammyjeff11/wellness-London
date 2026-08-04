import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ServiceDirectory from "@/components/ServiceDirectory";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Assisted Stretching London | Mobility Studios & Sessions | Well+",
  description:
    "Compare assisted stretching and mobility sessions in London, understand the format, and check guidance, access and practical venue details before booking.",
  alternates: { canonical: "/assisted-stretching-london" },
};

const matchingTerms = ["assisted stretch", "stretching", "stretch therapy", "mobility", "flexibility", "physiotherapy", "movement screening"];

export default async function AssistedStretchingPage() {
  const allFacilities = await getFacilities();
  const facilities = dedupeFacilities(
    allFacilities
      .filter((facility) => {
        const text = [
          facility.primaryService,
          ...facility.secondaryServices,
          ...facility.servicesOffered,
          ...facility.activityDisplayLabels,
          ...facility.activityTagsStandardized,
          facility.description,
          facility.editorialSummary,
        ].join(" ").toLowerCase();
        return matchingTerms.some((term) => text.includes(term));
      })
      .map(toDirectoryFacility),
  );

  const faq = [
    { question: "What is assisted stretching?", answer: "Assisted stretching is a guided session in which a practitioner helps move you through stretches or mobility positions. The exact method and practitioner background vary by provider." },
    { question: "Is assisted stretching the same as physiotherapy?", answer: "No. Assisted stretching may focus on flexibility and movement, while physiotherapy is a regulated healthcare profession used to assess and manage injury, pain and physical function." },
    { question: "What should I check before booking?", answer: "Check the practitioner’s qualifications, whether the session includes an assessment, how hands-on the format is, and whether the provider is appropriate for any pain, injury or medical condition." },
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Assisted stretching in London",
      itemListElement: facilities.map((facility, index) => ({ "@type": "ListItem", position: index + 1, name: facility.name, url: absoluteUrl(`/facility/${facility.slug}`) })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={schema} />
      <section className="px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-[#6f6048]">
            <Link href="/" className="underline-offset-4 hover:underline">Home</Link><span>/</span>
            <Link href="/services" className="underline-offset-4 hover:underline">Services</Link><span>/</span>
            <span aria-current="page" className="text-[#29241d]">Assisted stretching</span>
          </nav>
          <p className="editorial-eyebrow mb-4">Mobility and movement</p>
          <h1 className="max-w-4xl font-serif text-[3.4rem] font-normal leading-[0.92] tracking-[-0.05em] sm:text-7xl md:text-8xl">Assisted stretching in London.</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">Guided flexibility and mobility sessions vary from practitioner-led stretch studios to physiotherapy and movement services. Compare the format and professional oversight, not just the promise of feeling looser.</p>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <ServiceDirectory facilities={facilities} serviceType="assisted_stretching" emptyTitle="No verified assisted-stretching venues yet" emptyText="We are keeping this directory conservative until suitable London providers are verified. Use the wider Performance & Mobility guide in the meantime." prioritisedService="Assisted Stretching" />
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <div><p className="editorial-eyebrow mb-3">Before you book</p><h2 className="font-serif text-4xl font-normal leading-none tracking-[-0.04em]">Choose the right kind of support.</h2></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["For general mobility", "Ask how the session is personalised and whether you will receive movements to use between visits."],
              ["For pain or injury", "Use an appropriately qualified healthcare professional rather than assuming a general stretch session is suitable."],
              ["For sport", "Look for someone who understands your training load, movement demands and whether flexibility is actually the limiting factor."],
              ["For a first visit", "Confirm clothing, session length, hands-on contact, contraindications and what the initial assessment includes."],
            ].map(([title, copy]) => <article key={title} className="surface-paper rounded-[1rem] p-5"><h3 className="text-lg font-medium">{title}</h3><p className="mt-3 text-sm leading-7 text-[#5f574c]">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="surface-band-sage px-5 py-12 sm:px-6 sm:py-16">
        <div className="surface-paper mx-auto max-w-3xl rounded-[1rem] p-6 sm:p-8">
          <h2 className="font-serif text-4xl font-normal leading-none tracking-[-0.04em]">Assisted stretching FAQs.</h2>
          <div className="mt-8 space-y-7">{faq.map((item) => <article key={item.question}><h3 className="text-lg font-medium">{item.question}</h3><p className="mt-2 text-sm leading-7 text-[#5f574c]">{item.answer}</p></article>)}</div>
        </div>
      </section>
    </main>
  );
}
