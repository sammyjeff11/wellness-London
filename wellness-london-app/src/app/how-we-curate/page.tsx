import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Well+ Curates London Wellness Venues | Well+",
  description: "Learn how Well+ curates London saunas, cold plunges, recovery studios, longevity spaces and wellness venues.",
  alternates: { canonical: "/how-we-curate" },
};

const editorialCards = [
  {
    title: "Relevant services first",
    text: "We start with whether a venue clearly offers the wellness or recovery services London users are searching for, from sauna and cold plunge to recovery studios, longevity spaces and modern treatment-led experiences.",
  },
  {
    title: "Useful details over broad claims",
    text: "A stronger listing helps people understand what the visit is actually like: the access model, setting, practical facilities, service format, price structure and booking experience.",
  },
  {
    title: "Editorial selection, not every option",
    text: "Well+ is a curated guide rather than an exhaustive directory. We prioritise venues that feel useful, distinctive or relevant for recovery, reset, performance and longevity intent.",
  },
  {
    title: "Clear boundaries around health claims",
    text: "We avoid treating wellness marketing as medical evidence. Where services are medical-adjacent, users should look carefully at the provider, the protocol and their own suitability before booking.",
  },
];

const curationSignals = [
  "Whether the venue clearly offers relevant wellness or recovery services",
  "How easy it is to understand the booking experience and access model",
  "Whether the setting fits recovery, reset, performance or longevity use cases",
  "The usefulness of location, neighbourhood and practical facilities for London users",
  "How clearly the venue communicates services, pricing structure and visitor experience",
];

export default function HowWeCuratePage() {
  return (
    <main className="bg-[#fbf8f1] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">Our approach</p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            How Well+ curates venues.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
            Well+ is a curated London guide to saunas, cold plunges, recovery studios, longevity spaces and modern wellness venues. Our aim is to make discovery feel calmer, more editorial and more practical, so users can compare spaces by what they offer, how they feel and how they fit real London routines.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {editorialCards.map((card) => (
            <article key={card.title} className="border border-[#d8cebf] bg-[#f4efe6] p-7 sm:p-8">
              <p className="mb-5 h-px w-12 bg-[#cbbda9]" />
              <h2 className="font-serif text-3xl font-normal leading-tight text-[#29241d]">{card.title}</h2>
              <p className="mt-5 text-sm leading-7 text-[#5f574c]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 border-y border-[#cbbda9] py-12 md:grid-cols-[0.85fr_1.15fr] md:py-16">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Selection signals</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">What we look for</h2>
          </div>
          <ul className="space-y-4">
            {curationSignals.map((signal) => (
              <li key={signal} className="flex gap-4 border-b border-[#d8cebf] pb-4 text-sm leading-7 text-[#5f574c] last:border-b-0 last:pb-0">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#29241d]" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-14 text-[#fbf8f1] sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">Important note</p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">Details can change before you book.</h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-[#fbf8f1]/78">
            <p>
              Venue details, services, prices, opening hours, availability and facilities can change. Well+ is designed as an editorial discovery guide, so users should check directly with the venue before booking or travelling.
            </p>
            <p>
              Well+ is not medical advice and does not verify medical claims. For medical-adjacent services, suitability questions or specific health concerns, users should speak with the venue and, where relevant, a qualified professional.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
