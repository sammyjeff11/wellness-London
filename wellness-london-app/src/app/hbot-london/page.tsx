import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { directoryFacilityScore, facilityHasCollectionService } from "@/lib/collections";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hyperbaric Oxygen Therapy London: Compare HBOT Clinics | Well+",
  description:
    "Compare London HBOT providers by chamber format, session length, price, access, consultation and the safety details to ask before booking.",
  alternates: { canonical: "/hbot-london" },
  openGraph: {
    title: "Hyperbaric Oxygen Therapy London: Compare HBOT Clinics | Well+",
    description:
      "An evidence-aware guide to London HBOT providers, chamber formats, screening, pricing and booking questions.",
    url: "/hbot-london",
    type: "website",
  },
};

type DirectoryFacility = ReturnType<typeof toDirectoryFacility>;

type ProviderDetail = {
  format: string;
  session: string;
  price: string;
  publishedDetail: string;
};

const providerDetails: Record<string, ProviderDetail> = {
  hum2n: {
    format: "Four-person chamber",
    session: "30- and 60-minute formats appear across current provider pages",
    price: "From £180 for the listed 30-minute session",
    publishedDetail: "Clinic-led setting with discovery-call access. Confirm the exact pressure, oxygen-delivery method and booked duration.",
  },
  rebase: {
    format: "Recovery-studio hyperbaric session",
    session: "Up to 50 minutes",
    price: "From £65",
    publishedDetail: "Public recovery-studio access. Exact chamber pressure and oxygen-delivery method are not stated clearly on the current public page.",
  },
  "london-cryo-belgravia": {
    format: "Pressurised chamber",
    session: "30-minute taster plus standard sessions and packages",
    price: "£59 taster; £79 single session",
    publishedDetail: "Provider recommends starting with a consultation. Packages extend from five to forty sessions, so compare the full commitment before buying.",
  },
  "london-cryo": {
    format: "Pressurised chamber",
    session: "30-minute taster plus standard sessions and packages",
    price: "£59 taster; £79 single session",
    publishedDetail: "St John's Wood branch. Confirm local chamber availability, supervision and the exact appointment format when booking.",
  },
  "repose-space": {
    format: "Hyperbaric chamber",
    session: "60 or 90 minutes",
    price: "£195 for the listed 90-minute session",
    publishedDetail: "Public biohacking-studio booking. Pressure, chamber manufacturer and oxygen-delivery method are not clear on the public booking pages reviewed.",
  },
  "the-body-lab": {
    format: "Members-club hyperbaric chamber",
    session: "Provider publishes a session guide; confirm the current duration",
    price: "No clear public single-session price found",
    publishedDetail: "Members-only access in Kensington. Ask how HBOT is integrated into membership and who screens and supervises sessions.",
  },
};

const questions = [
  {
    title: "What pressure is used?",
    text: "Ask for the treatment pressure in ATA or another clear unit. 'Pressurised' alone does not tell you how the session compares with a hospital protocol or another private provider.",
  },
  {
    title: "How is oxygen delivered?",
    text: "Clarify whether the chamber itself contains oxygen, whether you breathe through a mask or hood, or whether the provider uses oxygen-enriched air. These are not interchangeable descriptions.",
  },
  {
    title: "What type of chamber is it?",
    text: "Ask whether the chamber is monoplace or multiplace, rigid or soft-sided, and whether other clients or staff are inside during treatment.",
  },
  {
    title: "Who screens and supervises?",
    text: "A credible provider should explain suitability checks, contraindications, staff training, communication during the session and what happens if you feel unwell.",
  },
  {
    title: "What is the actual protocol?",
    text: "Compare pressurisation time, time at treatment pressure, decompression, total appointment length and whether a single session or a course is being recommended.",
  },
  {
    title: "What claim is being made?",
    text: "Separate recognised medical indications from broader recovery, performance and longevity marketing. Ask what evidence supports the specific outcome being sold to you.",
  },
];

const faqs = [
  {
    question: "What is hyperbaric oxygen therapy?",
    answer:
      "HBOT involves breathing oxygen in a chamber pressurised above normal atmospheric pressure. The pressure, oxygen concentration, delivery method, session duration and clinical purpose all affect what is actually being provided.",
  },
  {
    question: "How much does HBOT cost in London?",
    answer:
      "Publicly listed London prices vary widely. Current examples range from approximately £59-£79 for introductory or single sessions at some recovery studios to £180 or more at clinic-led providers, with longer sessions and packages costing more.",
  },
  {
    question: "How long is an HBOT session?",
    answer:
      "London providers advertise formats from around 30 minutes to 90 minutes. Check whether that figure includes pressurisation and decompression or only time at treatment pressure.",
  },
  {
    question: "Is HBOT proven for recovery or longevity?",
    answer:
      "HBOT has established medical uses, but evidence and NHS commissioning are much narrower than many private recovery and longevity claims. Treat broad anti-ageing, performance or general-wellness promises cautiously.",
  },
  {
    question: "What are the main HBOT risks?",
    answer:
      "Pressure can affect the ears and sinuses, enclosed chambers can trigger anxiety, and oxygen-rich environments require strict fire-safety controls. Screening, staff training and continuous monitoring matter.",
  },
  {
    question: "Is a soft hyperbaric chamber the same as hospital HBOT?",
    answer:
      "Not necessarily. Chamber construction, pressure and oxygen delivery can differ substantially. Ask the provider for the exact equipment and protocol rather than relying on the HBOT label alone.",
  },
];

const editorialSources = [
  {
    label: "NHS England hyperbaric oxygen commissioning",
    href: "https://www.england.nhs.uk/commissioning/spec-services/npc-crg/group-d/hyperbaric-oxygen-therapy/",
  },
  {
    label: "NHS England service specification",
    href: "https://www.england.nhs.uk/publication/service-specification-hyperbaric-oxygen-therapy-all-ages/",
  },
  {
    label: "FDA safety guidance for HBOT devices",
    href: "https://www.fda.gov/medical-devices/letters-health-care-providers/follow-instructions-safe-use-hyperbaric-oxygen-therapy-devices-letter-health-care-providers",
  },
];

function getLocation(facility: DirectoryFacility) {
  return [facility.neighbourhood || facility.location, facility.areaOfLondon || facility.areaGroup].filter(Boolean).join(" · ") || "London";
}

function getProviderDetail(facility: DirectoryFacility): ProviderDetail {
  return (
    providerDetails[facility.slug] || {
      format: "Provider confirms HBOT availability",
      session: "Confirm the current appointment duration",
      price: facility.priceFrom || facility.priceRange || "Check current price",
      publishedDetail: "Ask for chamber type, pressure, oxygen-delivery method, screening and supervision before booking.",
    }
  );
}

function buildSchema(facilities: DirectoryFacility[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl("/hbot-london"),
        url: absoluteUrl("/hbot-london"),
        name: "Hyperbaric Oxygen Therapy London",
        description: metadata.description,
        isPartOf: { "@type": "WebSite", name: "Well+", url: absoluteUrl() },
        about: ["Hyperbaric oxygen therapy", "HBOT", "London wellness", "recovery"],
        mainEntity: {
          "@type": "ItemList",
          itemListElement: facilities.map((facility, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: facility.name,
            url: absoluteUrl(`/facility/${facility.slug}`),
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "HBOT", item: absoluteUrl("/hbot-london") },
        ],
      },
    ],
  };
}

export default async function HbotLondonPage() {
  const facilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility))
    .filter((facility) => facilityHasCollectionService(facility, "hyperbaric-oxygen-therapy"))
    .sort((a, b) => directoryFacilityScore(b) - directoryFacilityScore(a));
  const schema = buildSchema(facilities);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <Script id="hbot-london-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative overflow-hidden bg-[#29241d] px-5 py-16 text-[#fbf8f1] sm:px-6 sm:py-24">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#fbf8f1_1px,transparent_1px),linear-gradient(#fbf8f1_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-12 flex flex-wrap gap-2 text-sm text-[#fbf8f1]/62">
            <Link href="/services" className="underline-offset-4 hover:underline">Services</Link><span>/</span><span>HBOT</span>
          </nav>
          <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#cbbda8]">London hyperbaric oxygen guide</p>
          <h1 className="max-w-5xl font-serif text-6xl font-normal leading-[0.86] tracking-[-0.05em] sm:text-8xl lg:text-[8.5rem]">
            Hyperbaric oxygen therapy in London.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#fbf8f1]/74 sm:text-xl sm:leading-9">
            Compare HBOT providers by the details that actually change the treatment: chamber format, pressure, oxygen delivery, session length, screening, supervision and total package cost.
          </p>
          <div className="mt-12 grid gap-4 border-t border-[#fbf8f1]/16 pt-6 text-sm text-[#fbf8f1]/68 sm:grid-cols-3">
            <div><p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Published providers</p><p>{facilities.length} London listings</p></div>
            <div><p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Editorial position</p><p>Evidence-aware, not promotional</p></div>
            <div><p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Most important check</p><p>Exact pressure and oxygen method</p></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.32fr_0.68fr]">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Understand the label</p>
          <div className="max-w-3xl space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
            <p className="font-serif text-3xl leading-[1.12] tracking-[-0.03em] text-[#29241d] sm:text-5xl">
              HBOT is more than sitting in an oxygen-branded pod.
            </p>
            <p>
              Hyperbaric oxygen therapy combines increased atmospheric pressure with oxygen exposure. Pressure and oxygen delivery determine what the session actually is, yet many London booking pages publish only a treatment name, duration and package price.
            </p>
            <p>
              That makes direct comparison difficult. A useful provider should be able to explain the chamber, treatment pressure, oxygen concentration or delivery method, screening process, staff supervision and why the proposed protocol matches your goal.
            </p>
          </div>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-12 sm:px-6 sm:py-18" aria-labelledby="provider-comparison-heading">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-3">Provider comparison</p>
          <h2 id="provider-comparison-heading" className="max-w-4xl font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-6xl">
            What London providers publish — and what you still need to ask.
          </h2>

          <div className="mt-9 grid gap-4 md:hidden">
            {facilities.map((facility) => {
              const detail = getProviderDetail(facility);
              return (
                <article key={facility.slug} className="rounded-[1.25rem] border border-[#d8cebf] bg-[#fbf8f1] p-5">
                  <div className="border-b border-[#d8cebf]/75 pb-4">
                    <Link href={`/facility/${facility.slug}`} className="font-serif text-2xl leading-tight tracking-[-0.03em] underline decoration-[#8d7d67]/45 underline-offset-4">
                      {facility.name}
                    </Link>
                    <p className="mt-2 text-xs text-[#8d7d67]">{getLocation(facility)}</p>
                  </div>
                  <dl className="mt-4 space-y-4 text-sm">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Published format</dt>
                      <dd className="mt-1.5 leading-6 text-[#5f574c]">{detail.format}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Session</dt>
                      <dd className="mt-1.5 leading-6 text-[#5f574c]">{detail.session}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Price signal</dt>
                      <dd className="mt-1.5 leading-6 text-[#5f574c]">{detail.price}</dd>
                    </div>
                    <div className="rounded-xl bg-[#f4efe6] p-4">
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">What to verify</dt>
                      <dd className="mt-1.5 leading-6 text-[#5f574c]">{detail.publishedDetail}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>

          <div className="mt-9 hidden overflow-x-auto rounded-[1.25rem] border border-[#d8cebf] bg-[#fbf8f1] md:block">
            <table className="min-w-[980px] w-full border-collapse text-left text-sm">
              <thead className="border-b border-[#d8cebf] text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">
                <tr><th className="p-5">Provider</th><th className="p-5">Published format</th><th className="p-5">Session</th><th className="p-5">Price signal</th><th className="p-5">Editorial note</th></tr>
              </thead>
              <tbody className="divide-y divide-[#d8cebf]/75">
                {facilities.map((facility) => {
                  const detail = getProviderDetail(facility);
                  return (
                    <tr key={facility.slug} className="align-top">
                      <td className="p-5"><Link href={`/facility/${facility.slug}`} className="font-medium underline underline-offset-4">{facility.name}</Link><p className="mt-2 text-xs text-[#8d7d67]">{getLocation(facility)}</p></td>
                      <td className="p-5 text-[#5f574c]">{detail.format}</td>
                      <td className="p-5 text-[#5f574c]">{detail.session}</td>
                      <td className="p-5 text-[#5f574c]">{detail.price}</td>
                      <td className="max-w-sm p-5 leading-6 text-[#5f574c]">{detail.publishedDetail}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-[#6f6048]">
            Prices and formats are based on current public provider information and can change. Where pressure, oxygen delivery or supervision could not be verified publicly, the comparison says so rather than inferring it.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div><p className="editorial-eyebrow mb-3">London listings</p><h2 className="font-serif text-4xl font-normal tracking-[-0.04em] sm:text-6xl">Explore the providers.</h2></div>
            <Link href="/longevity" className="w-fit text-sm font-medium underline underline-offset-4">Explore longevity clinics</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => <FacilityCard key={facility.slug} facility={facility} source="hbot_london_authority" prioritisedService="Hyperbaric Oxygen Therapy" />)}
          </div>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-3">Before booking</p>
          <h2 className="max-w-4xl font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-6xl">Six questions that expose the difference between providers.</h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questions.map((item) => <article key={item.title} className="surface-paper rounded-[1.25rem] p-6 sm:p-8"><h3 className="font-serif text-2xl tracking-[-0.03em]">{item.title}</h3><p className="mt-4 text-sm leading-7 text-[#5f574c]">{item.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-[#d8cebf] bg-[#fbf8f1] p-6 sm:p-9">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Medical evidence and wellness marketing</p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em]">Do not treat every HBOT claim as equivalent.</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
              <p>NHS England commissions specialised HBOT for a narrow set of clinical circumstances, currently centred on decompression illness and gas embolism.</p>
              <p>Private London providers commonly market HBOT for recovery, fatigue, performance and longevity. Those outcomes do not automatically carry the same evidence or clinical status as commissioned medical treatment.</p>
              <p>This guide does not diagnose, recommend a protocol or replace medical advice. It helps you compare what a provider is actually offering.</p>
            </div>
          </article>
          <article className="rounded-[1.5rem] bg-[#29241d] p-6 text-[#fbf8f1] sm:p-9">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/54">Safety is part of the product</p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em]">Screening and monitoring should be visible.</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#fbf8f1]/72 sm:text-base sm:leading-8">
              <p>Pressure can cause ear or sinus discomfort and enclosed chambers can be difficult for people with claustrophobia. Providers should explain how pressure equalisation and communication work.</p>
              <p>The FDA's 2025 safety reminder emphasises trained staff, patient monitoring, maintenance and strict fire-prevention controls for HBOT devices.</p>
              <p>Be cautious when a provider sells a large package before clearly documenting suitability, protocol and expected outcome.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-6">Frequently asked questions</p>
          <div className="divide-y divide-[#29241d]/18 border-y border-[#29241d]/18">
            {faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none justify-between gap-6 font-serif text-2xl leading-[1.1]"><span>{faq.question}</span><span className="transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-base leading-8 text-[#5f574c]">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-6xl rounded-[1.5rem] border border-[#d8cebf] bg-[#fbf8f1] p-6 sm:p-9">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Editorial basis</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5f574c]">Our medical context and safety framing is grounded in current public guidance. Provider-specific formats and prices come from the providers' own current pages and should be reconfirmed before booking.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {editorialSources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">{source.label}</a>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-[#d8cebf]/75 pt-6">
            <Link href="/longevity" className="rounded-full bg-[#29241d] px-4 py-2 text-sm text-[#fbf8f1]">Explore longevity clinics</Link>
            <Link href="/red-light-therapy-london" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm">Red light therapy</Link>
            <Link href="/cryotherapy-london" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm">Cryotherapy</Link>
            <Link href="/collections/best-recovery-clubs-london" className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm">Recovery clubs</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
