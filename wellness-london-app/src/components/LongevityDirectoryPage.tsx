import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import type { AirtableFacility } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";

const needs = [
  {
    title: "A comprehensive health assessment",
    text: "A broad medical baseline combining consultation, biomarkers and selected screening.",
    includes: "Medical review · Blood testing · Cardiovascular checks",
  },
  {
    title: "Advanced screening and imaging",
    text: "Deeper investigation through scans or specialist diagnostics where clinically appropriate.",
    includes: "MRI or CT · Cardiac imaging · Organ health assessment",
  },
  {
    title: "Fitness and metabolic testing",
    text: "Objective measures of cardiovascular fitness, metabolism and body composition.",
    includes: "VO₂ max · DEXA · Resting metabolic rate",
  },
  {
    title: "A specific health test",
    text: "A focused route when you already know which area you want to investigate.",
    includes: "Hormones · Genetics · Biological age · CGM",
  },
  {
    title: "Ongoing longevity support",
    text: "Repeat measurement and clinician-led planning rather than a single assessment.",
    includes: "Follow-up testing · Health planning · Progress monitoring",
  },
];

const clinicTypes = [
  {
    title: "Comprehensive longevity clinic",
    description: "Medical review, multiple diagnostics and a personalised health plan.",
    bestFor: "Building an overall health baseline",
  },
  {
    title: "Preventative health screening",
    description: "Medical tests designed to identify potential risk factors or early signs of disease.",
    bestFor: "Structured health screening",
  },
  {
    title: "Imaging and diagnostics provider",
    description: "MRI, CT, ultrasound or other specialist investigations, sometimes within a wider assessment.",
    bestFor: "Advanced structural investigation",
  },
  {
    title: "Performance diagnostics clinic",
    description: "VO₂ max, DEXA, metabolic and exercise testing interpreted around fitness goals.",
    bestFor: "Fitness, body composition and performance",
  },
];

const bookingChecks = [
  "Is the service doctor-led, clinician-led or testing-only?",
  "Which tests are included in the advertised price?",
  "Who reviews and explains the results?",
  "Will you receive clear recommendations and follow-up?",
  "Does the provider explain limitations, suitability and referral pathways?",
];

const faqs = [
  {
    question: "What is a longevity clinic?",
    answer: "A longevity clinic uses medical assessment, diagnostics and preventative health planning to understand current health, identify risk and support healthier ageing. Services and levels of clinical oversight vary significantly.",
  },
  {
    question: "How is this different from a private health screening?",
    answer: "A health screening is usually a defined set of checks completed at one point in time. A longevity assessment may combine broader diagnostics with interpretation, lifestyle planning, repeat testing and ongoing clinical support.",
  },
  {
    question: "Do I need a GP referral?",
    answer: "Many private clinics accept direct bookings, although certain scans or investigations may require clinical review or referral. Check the provider's process before booking.",
  },
  {
    question: "Does Well+ recommend specific medical tests?",
    answer: "No. Well+ helps users compare providers and understand service categories. The appropriate assessment depends on personal history, symptoms, risk and clinical advice.",
  },
];

export default function LongevityDirectoryPage({ facilities }: { facilities: AirtableFacility[] }) {
  const directoryFacilities = dedupeFacilities(facilities.map(toDirectoryFacility));

  return (
    <main className="bg-[#fbf8f1] text-[#29241d]">
      <section className="px-5 pb-10 pt-8 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#6f6048] sm:text-[11px]">Preventative health and diagnostics</p>
          <h1 className="max-w-5xl font-serif text-[2.7rem] font-normal leading-[0.92] tracking-[-0.05em] sm:text-6xl md:text-8xl">
            Longevity clinics in London.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">
            Compare London clinics offering medical assessments, advanced diagnostics, preventative health screening and personalised longevity programmes.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#clinics" className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1]">Explore clinics</a>
            <a href="#find-your-route" className="rounded-full border border-[#b8aa96] px-5 py-3 text-sm">Understand the options</a>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8cebf] bg-[#f4efe6] px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">What belongs here</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Measure first. Then decide what to improve.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[#5f574c]">
            <p>
              Longevity clinics use medical expertise and objective testing to build a clearer picture of current health. The focus is on establishing a baseline, identifying potential risk and interpreting results before recommending a plan.
            </p>
            <p>
              This directory is limited to providers with a meaningful diagnostics, screening or clinician-led assessment offer. A venue is not included solely because it offers sauna, cold therapy, red light, IV drips or other general wellness treatments.
            </p>
          </div>
        </div>
      </section>

      <section id="find-your-route" className="scroll-mt-24 px-5 py-12 sm:px-6 sm:py-18 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Find the right starting point</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">What are you looking for?</h2>
            <p className="mt-4 text-sm leading-7 text-[#5f574c] sm:text-base">You do not need to understand every test before comparing providers. Start with the outcome you want, then check exactly what each clinic includes.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {needs.map((item) => (
              <article key={item.title} className="border border-[#d8cebf] bg-[#f4efe6] p-6">
                <h3 className="text-xl font-medium leading-7">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f574c]">{item.text}</p>
                <p className="mt-6 border-t border-[#d8cebf] pt-4 text-xs leading-6 text-[#6f6048]">{item.includes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="clinics" className="scroll-mt-24 bg-[#f4efe6] px-5 py-12 sm:px-6 sm:py-18 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">London directory</p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Compare longevity clinics.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c]">Only published providers with confirmed clinical diagnostics, medical screening or clinician-led longevity assessment services appear here.</p>
          </div>

          {directoryFacilities.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {directoryFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source="longevity_directory" />
              ))}
            </div>
          ) : (
            <div className="border border-[#d8cebf] bg-[#fbf8f1] p-8 text-sm leading-7 text-[#5f574c]">
              We are currently verifying London providers against the clinical longevity criteria for this directory.
            </div>
          )}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-18 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Understand the category</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Not every provider offers the same thing.</h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#d8cebf] bg-[#d8cebf] md:grid-cols-2">
            {clinicTypes.map((type) => (
              <article key={type.title} className="bg-[#fbf8f1] p-6 sm:p-7">
                <h3 className="text-xl font-medium">{type.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f574c]">{type.description}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[#6f6048]">Best for</p>
                <p className="mt-2 text-sm">{type.bestFor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-14 text-[#fbf8f1] sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#d8cebf]">Before booking</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Five questions worth asking.</h2>
          </div>
          <ol className="space-y-3">
            {bookingChecks.map((check, index) => (
              <li key={check} className="flex gap-4 border border-[#fbf8f1]/14 p-5 text-sm leading-7 text-[#fbf8f1]/78">
                <span className="font-serif text-2xl text-[#d8cebf]">{String(index + 1).padStart(2, "0")}</span>
                <span>{check}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 border-b border-[#d8cebf] pb-12 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">Go deeper</p>
            <h2 className="font-serif text-4xl font-normal leading-tight">Learn before you test.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/editorial" className="border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da]">
              <h3 className="text-xl font-medium">Explore Well+ editorial</h3>
              <p className="mt-3 text-sm leading-7 text-[#5f574c]">Practical guides that explain treatments, evidence and important limitations.</p>
            </Link>
            <Link href="/editorial-standards" className="border border-[#d8cebf] bg-[#f4efe6] p-6 transition hover:bg-[#eee7da]">
              <h3 className="text-xl font-medium">How we handle health claims</h3>
              <p className="mt-3 text-sm leading-7 text-[#5f574c]">Read how Well+ approaches evidence, uncertainty and medical-adjacent services.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">FAQs</p>
          <h2 className="font-serif text-4xl font-normal leading-tight">Common questions.</h2>
          <div className="mt-7 divide-y divide-[#d8cebf] border-y border-[#d8cebf]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-5 text-lg">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5f574c]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
