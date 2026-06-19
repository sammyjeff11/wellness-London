import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { directoryFacilityScore, facilityHasCollectionService } from "@/lib/collections";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";

export const metadata: Metadata = {
  title: "Best Cryotherapy in London (2026) | Well+",
  description:
    "Discover the best cryotherapy venues in London. Compare recovery studios, understand how cryotherapy works, and explore what the latest research says about its benefits, limitations and best use cases.",
  alternates: { canonical: "/editorial/best-cryotherapy-london" },
  openGraph: {
    title: "Best Cryotherapy in London (2026) | Well+",
    description:
      "Compare London cryotherapy venues and understand the evidence, limitations and best use cases for cold-air recovery.",
    url: absoluteUrl("/editorial/best-cryotherapy-london"),
    type: "article",
  },
};

const comparisonRows = [
  { label: "Medium", cryotherapy: "Dry cold air in a chamber, cabin or localised device.", coldPlunge: "Cold-water immersion in a plunge pool, tub or ice bath." },
  { label: "Session length", cryotherapy: "Usually short: often around two to four minutes for whole-body sessions.", coldPlunge: "Often longer and more variable, depending on water temperature, tolerance and protocol." },
  { label: "Experience", cryotherapy: "Intense but dry, with less water pressure and no immersion skill required.", coldPlunge: "More visceral: breath, buoyancy and water contact become part of the ritual." },
  { label: "Typical use cases", cryotherapy: "Time-efficient recovery, soreness management and a structured cold exposure appointment.", coldPlunge: "Contrast therapy, resilience practice, post-sauna cooling and broader recovery rituals." },
];

const researchCards = [
  {
    label: "Evidence Supported",
    title: "Recovery may feel easier.",
    points: ["Reduced perceived soreness", "Improved subjective recovery", "Help managing discomfort after intense exercise"],
  },
  {
    label: "Mixed Evidence",
    title: "Bigger claims need caution.",
    points: ["Performance enhancement", "Metabolism", "Fat loss", "Longevity", "Immune function"],
  },
  {
    label: "Emerging Research",
    title: "The category is still developing.",
    points: ["Protocols vary", "Individual response differs", "Use case matters more than blanket promises"],
  },
];

const helpfulUseCases = [
  {
    title: "Competition Recovery",
    text: "Cryotherapy may be useful between events or high-output sessions when the goal is to feel ready again quickly rather than to maximise a single adaptation signal.",
  },
  {
    title: "High Training Volume",
    text: "For athletes or committed exercisers stacking frequent sessions, the value may be practical: maintaining training consistency when soreness and fatigue would otherwise interrupt the week.",
  },
  {
    title: "Soreness Management",
    text: "When delayed-onset soreness is the limiting factor, a short cold-air session can be considered as one recovery tool alongside sleep, nutrition, load management and mobility.",
  },
];

const selectiveUseCases = [
  {
    title: "Immediately After Strength Training",
    text: "Inflammation is part of the adaptation process. Adaptation and recovery are not the same thing, and frequent cold exposure immediately after lifting may blunt some hypertrophy-related signals.",
  },
  {
    title: "If Muscle Growth Is Your Goal",
    text: "Some evidence suggests routine post-lifting cold exposure may reduce muscle growth adaptation. Strategic use away from key strength sessions may be preferable to automatic use after every lift.",
  },
  {
    title: "Recovery vs Adaptation",
    text: "The balanced view: cryotherapy can help you feel recovered, but feeling recovered is not always identical to giving the body the strongest possible signal to adapt.",
  },
];

const faqs = [
  { question: "What does cryotherapy do?", answer: "Cryotherapy exposes the body, or a targeted area, to very cold air for a short period. People commonly use it for soreness management, subjective recovery and a quick cold-exposure reset." },
  { question: "Is cryotherapy better than a cold plunge?", answer: "Not universally. Cryotherapy uses dry cold air and is usually shorter; cold plunge uses water immersion and often forms part of sauna or contrast therapy. The better option depends on the experience and outcome you want." },
  { question: "How long should a cryotherapy session last?", answer: "Whole-body cryotherapy sessions are typically brief, often around two to four minutes, and should follow the venue's protocol and screening process." },
  { question: "Can cryotherapy help recovery?", answer: "It may help some people reduce perceived soreness and improve subjective recovery after intense exercise, though the strength of evidence depends on the outcome being measured." },
  { question: "Should I use cryotherapy after weight training?", answer: "If muscle growth is the main goal, be selective. Routine cold exposure immediately after lifting may interfere with some adaptation signals, so consider timing it away from key hypertrophy sessions." },
  { question: "How much does cryotherapy cost in London?", answer: "A single London cryotherapy session commonly costs around £30–£70, with memberships and bundles often reducing the per-session price." },
];

function isCryotherapyVenue(facility: ServiceDirectoryFacility) {
  return facilityHasCollectionService(facility, "cryotherapy");
}

function getLocationLine(facility: ServiceDirectoryFacility) {
  return [facility.neighbourhood || facility.location, facility.areaOfLondon || facility.areaGroup].filter(Boolean).join(" · ");
}

function getHeroImage(facility?: ServiceDirectoryFacility) {
  const galleryImage = facility?.galleryImages?.find((image) => image.url);
  return galleryImage?.url || facility?.imageUrl;
}

function articleJsonLd(facilities: ServiceDirectoryFacility[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Cryotherapy in London",
    description: metadata.description,
    author: { "@type": "Organization", name: "Well+" },
    publisher: { "@type": "Organization", name: "Well+" },
    mainEntityOfPage: absoluteUrl("/editorial/best-cryotherapy-london"),
    about: ["Cryotherapy", "Cold therapy", "Recovery", "London wellness"],
    mentions: facilities.slice(0, 8).map((facility) => ({
      "@type": "LocalBusiness",
      name: facility.name,
      url: absoluteUrl(`/facility/${facility.slug}`),
    })),
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Editorial", item: absoluteUrl("/editorial") },
    { "@type": "ListItem", position: 3, name: "Best Cryotherapy in London", item: absoluteUrl("/editorial/best-cryotherapy-london") },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

function CryotherapyVenueCard({ facility, index }: { facility: ServiceDirectoryFacility; index: number }) {
  const imageUrl = getHeroImage(facility);
  const services = facility.services?.slice(0, 4).join(" · ") || "Cryotherapy";

  return (
    <article className="group grid gap-5 border-t border-[#29241d]/18 py-7 md:grid-cols-[0.18fr_0.28fr_0.54fr] md:items-start">
      <p className="font-serif text-5xl leading-none tracking-[-0.04em] text-[#29241d]/28">{String(index + 1).padStart(2, "0")}</p>
      <div className="relative min-h-52 overflow-hidden rounded-t-full rounded-b-[1.2rem] bg-[#d8cebf]">
        {imageUrl ? <SafeImage src={imageUrl} alt={facility.imageAlt || facility.name} fill sizes="(min-width: 768px) 28vw, 100vw" className="object-cover grayscale-[18%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0" /> : null}
      </div>
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">{getLocationLine(facility) || "London"}</p>
        <h3 className="font-serif text-4xl font-normal leading-[0.98] tracking-[-0.025em] sm:text-5xl">{facility.name}</h3>
        <dl className="mt-5 grid gap-3 border-y border-[#d8cebf]/80 py-4 text-sm leading-6 text-[#5f574c] sm:grid-cols-2">
          <div><dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Services</dt><dd>{services}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Location</dt><dd>{getLocationLine(facility) || "London"}</dd></div>
        </dl>
        <Link href={`/facility/${facility.slug}`} className="mt-5 inline-flex text-sm font-medium underline underline-offset-4 transition group-hover:translate-x-1">Read the Well+ profile →</Link>
      </div>
    </article>
  );
}

export default async function BestCryotherapyLondonPage() {
  const facilities = await getFacilities();
  const cryotherapyFacilities = dedupeFacilities(facilities.map(toDirectoryFacility))
    .filter(isCryotherapyVenue)
    .sort((a, b) => directoryFacilityScore(b) - directoryFacilityScore(a));
  const visibleVenues = cryotherapyFacilities.slice(0, 8);
  const heroImage = getHeroImage(visibleVenues[0]);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={[articleJsonLd(visibleVenues), breadcrumbJsonLd, faqJsonLd]} />
      <article>
        <section className="relative isolate overflow-hidden bg-[#29241d] text-[#fbf8f1]">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#fbf8f1_1px,transparent_1px),linear-gradient(#fbf8f1_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto grid max-w-[1500px] lg:min-h-[720px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
              <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-[#fbf8f1]/62"><Link href="/" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Home</Link><span>/</span><Link href="/editorial" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Editorial</Link></nav>
              <div className="mt-24 max-w-2xl lg:mt-0">
                <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#cbbda8]">Cryotherapy Guide</p>
                <h1 className="font-serif text-[4.2rem] font-normal leading-[0.84] tracking-[-0.04em] sm:text-8xl lg:text-[8rem]">Best Cryotherapy in London</h1>
                <p className="mt-8 max-w-xl text-lg leading-8 text-[#fbf8f1]/74 sm:text-xl sm:leading-9">Whole-body cryotherapy has become one of London’s most popular recovery treatments. This guide explores London’s leading cryotherapy venues, explains how cryotherapy works, and examines what current research says about its benefits, limitations and best use cases.</p>
              </div>
              <div className="mt-14 grid gap-4 border-t border-[#fbf8f1]/16 pt-5 text-sm leading-6 text-[#fbf8f1]/68 sm:grid-cols-3"><div><p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Focus</p><p>Cold-air recovery</p></div><div><p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Format</p><p>Evidence-led guide</p></div><div><p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Source</p><p>{cryotherapyFacilities.length} live listings</p></div></div>
            </div>
            <div className="relative min-h-[420px] border-t border-[#fbf8f1]/16 lg:border-l lg:border-t-0">{heroImage ? <SafeImage src={heroImage} alt="London cryotherapy editorial feature" fill priority sizes="(min-width: 1024px) 54vw, 100vw" className="object-cover grayscale-[25%]" /> : <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(251,248,241,0.16),transparent_28%),linear-gradient(145deg,rgba(111,96,72,0.62),rgba(41,36,29,0.96))]" />}<div className="absolute inset-0 bg-gradient-to-t from-[#29241d]/78 via-[#29241d]/22 to-transparent" /></div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6 sm:py-20"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.32fr_0.68fr]"><aside><p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">What is cryotherapy?</p></aside><div className="max-w-3xl space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9"><p className="font-serif text-3xl leading-[1.16] tracking-[-0.02em] text-[#29241d] sm:text-4xl">Cryotherapy is a short, supervised cold-air exposure used by many people as a recovery tool.</p><p>Whole-body cryotherapy usually means standing in a specialist chamber or cabin cooled far below normal environmental temperatures, commonly for only a few minutes. Unlike a cold plunge, the stressor is dry cold air rather than water immersion, so the session can feel cleaner, shorter and more controlled.</p><p>People commonly use cryotherapy for perceived soreness, post-training recovery, competition blocks, fatigue management and as a structured cold-exposure appointment.</p></div></div></section>

        <section className="px-5 py-10 sm:px-6 sm:py-16"><div className="mx-auto max-w-6xl"><div className="mb-6 grid gap-5 lg:grid-cols-[0.32fr_0.68fr]"><p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Featured venues</p><h2 className="font-serif text-[3rem] leading-[0.92] tracking-[-0.03em] sm:text-6xl">Cryotherapy venues worth comparing.</h2></div>{visibleVenues.map((facility, index) => <CryotherapyVenueCard key={facility.slug} facility={facility} index={index} />)}</div></section>

        <section className="px-5 py-10 sm:px-6 sm:py-16"><div className="mx-auto max-w-6xl"><div className="mb-8 grid gap-5 lg:grid-cols-[0.32fr_0.68fr] lg:items-end"><p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Cryotherapy vs cold plunge</p><h2 className="font-serif text-[3rem] leading-[0.92] tracking-[-0.03em] sm:text-6xl">Two forms of cold, different rituals.</h2></div><div className="overflow-hidden rounded-[1.4rem] border border-[#d8cebf]"><div className="grid grid-cols-3 bg-[#29241d] p-4 text-sm uppercase tracking-[0.18em] text-[#fbf8f1]"><span></span><span>Cryotherapy</span><span>Cold Plunge</span></div>{comparisonRows.map((row) => <div key={row.label} className="grid grid-cols-3 gap-4 border-t border-[#d8cebf] bg-[#fbf8f1] p-4 text-sm leading-6 text-[#5f574c]"><strong className="font-serif text-xl font-normal text-[#29241d]">{row.label}</strong><span>{row.cryotherapy}</span><span>{row.coldPlunge}</span></div>)}</div></div></section>

        <section className="px-5 py-10 sm:px-6 sm:py-16"><div className="mx-auto max-w-6xl rounded-[2rem] bg-[#29241d] p-6 text-[#fbf8f1] sm:p-8"><p className="text-[11px] uppercase tracking-[0.24em] text-[#cbbda8]">What the research says</p><h2 className="mt-4 max-w-3xl font-serif text-[3rem] leading-[0.92] tracking-[-0.03em] sm:text-6xl">Useful signals, not miracle claims.</h2><div className="mt-10 grid gap-px overflow-hidden rounded-[1.2rem] bg-[#fbf8f1]/14 lg:grid-cols-3">{researchCards.map((card) => <div key={card.label} className="bg-[#342f27] p-6"><p className="text-[10px] uppercase tracking-[0.22em] text-[#cbbda8]">{card.label}</p><h3 className="mt-8 font-serif text-3xl font-normal leading-[1]">{card.title}</h3><ul className="mt-5 space-y-3 text-sm leading-6 text-[#fbf8f1]/72">{card.points.map((point) => <li key={point}>— {point}</li>)}</ul></div>)}</div></div></section>

        <EditorialSplitSection eyebrow="When cryotherapy may be helpful" title="Use it when recovery speed matters." items={helpfulUseCases} />
        <EditorialSplitSection eyebrow="When to be more selective" title="The important nuance: recovery is not always adaptation." items={selectiveUseCases} dark />

        <section className="px-5 py-10 sm:px-6 sm:py-16"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3"><InfoBlock title="Is cryotherapy safe?" text="Cryotherapy is generally considered safe when administered correctly by trained staff with appropriate screening. It is not suitable for everyone, including some people with cardiovascular, circulatory, neurological or cold-sensitivity conditions. This guide is informational and not medical advice; speak to a qualified clinician if you are unsure." /><InfoBlock title="What does it cost in London?" text="Single cryotherapy sessions in London commonly sit around £30–£70. Memberships, packs and recovery-club bundles can reduce the effective session price or combine cryotherapy with other services." /><InfoBlock title="Where to go next" text="Compare the live cryotherapy directory, contrast therapy, broader recovery spaces, sauna and cold plunge guides, and the Well+ sauna editorial before building your routine." /></div></section>

        <section className="px-5 pb-10 sm:px-6 sm:pb-16"><div className="mx-auto max-w-6xl"><p className="mb-6 text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">FAQ</p><div className="divide-y divide-[#29241d]/18 border-y border-[#29241d]/18">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none justify-between gap-6 font-serif text-2xl leading-[1.1]"><span>{faq.question}</span><span className="transition group-open:rotate-45">+</span></summary><p className="mt-4 max-w-3xl text-base leading-8 text-[#5f574c]">{faq.answer}</p></details>)}</div></div></section>

        <section className="px-5 pb-16 pt-6 sm:px-6 sm:pb-24"><div className="mx-auto rounded-[2rem] bg-[#29241d] p-6 text-[#fbf8f1] sm:p-8"><p className="text-[11px] uppercase tracking-[0.24em] text-[#fbf8f1]/58">Continue exploring</p><div className="mt-6 flex flex-wrap gap-3"><LinkPill href="/cryotherapy-london">Cryotherapy service page</LinkPill><LinkPill href="/contrast-therapy-london">Contrast therapy</LinkPill><LinkPill href="/recovery-london">Recovery</LinkPill><LinkPill href="/best-sauna-cold-plunge-london">Best sauna + cold plunge</LinkPill><LinkPill href="/editorial/best-saunas-london">Best saunas in London</LinkPill></div></div></section>
      </article>
    </main>
  );
}

function EditorialSplitSection({ eyebrow, title, items, dark = false }: { eyebrow: string; title: string; items: { title: string; text: string }[]; dark?: boolean }) {
  return <section className="px-5 py-10 sm:px-6 sm:py-16"><div className={`mx-auto max-w-6xl ${dark ? "bg-[#fbf8f1]" : ""}`}><div className="mb-8 grid gap-5 border-t border-[#29241d]/18 pt-8 lg:grid-cols-[0.32fr_0.68fr]"><p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">{eyebrow}</p><h2 className="font-serif text-[3rem] leading-[0.92] tracking-[-0.03em] sm:text-6xl">{title}</h2></div><div className="grid gap-px overflow-hidden bg-[#29241d]/16 md:grid-cols-3">{items.map((item) => <div key={item.title} className="bg-[#f4efe6] p-6"><h3 className="font-serif text-3xl font-normal leading-[1] tracking-[-0.02em]">{item.title}</h3><p className="mt-5 text-sm leading-7 text-[#5f574c]">{item.text}</p></div>)}</div></div></section>;
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return <div className="border-t border-[#29241d]/18 pt-6"><h2 className="font-serif text-4xl font-normal leading-[1] tracking-[-0.02em]">{title}</h2><p className="mt-5 text-base leading-8 text-[#5f574c]">{text}</p></div>;
}

function LinkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="rounded-full border border-[#fbf8f1]/22 px-4 py-2 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">{children}</Link>;
}
