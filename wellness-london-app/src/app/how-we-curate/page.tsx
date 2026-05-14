import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Curate | Well+ London",
  description:
    "How Well+ selects, reviews and organises London wellness spaces, including saunas, cold plunges, recovery studios and cryotherapy venues.",
  alternates: { canonical: "/how-we-curate" },
};

const criteria = [
  {
    title: "Relevant wellness services",
    text: "We prioritise venues that clearly offer recovery, reset or longevity-led services such as sauna, cold plunge, contrast therapy, cryotherapy, breathwork, recovery technology or restorative treatments.",
  },
  {
    title: "User decision value",
    text: "Each listing should help someone decide whether a space fits their needs. We look for practical details such as facilities, location, booking model, atmosphere, price indicators and who the venue is best suited to.",
  },
  {
    title: "Experience and setting",
    text: "Well+ favours spaces with a clear experience proposition: calm design, thoughtful facilities, strong hospitality, a distinctive recovery concept or a genuinely useful wellness routine.",
  },
  {
    title: "London relevance",
    text: "Our focus is London. Area, neighbourhood, transport context and nearby wellness intent matter because users often choose venues by convenience as much as by treatment type.",
  },
];

export default function HowWeCuratePage() {
  return (
    <main className="bg-[#fbf8f1] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">Our methodology</p>
          <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            How we curate London wellness spaces.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">
            Well+ is built to make wellness discovery calmer, clearer and more useful. We organise London venues by the details people actually use when deciding where to book: treatment type, setting, facilities, atmosphere, location and suitability.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {criteria.map((item) => (
            <article key={item.title} className="border border-[#d8cebf] bg-[#f4efe6] p-7 sm:p-8">
              <h2 className="mb-4 text-2xl font-medium">{item.title}</h2>
              <p className="text-sm leading-7 text-[#5f574c]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-14 text-[#fbf8f1] sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">What this is not</p>
            <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">Not a medical review. Not a paid ranking.</h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-[#fbf8f1]/76">
            <p>
              Well+ does not provide medical advice, clinical recommendations or treatment claims. Wellness services can feel different from person to person, and users should make choices based on their own health, comfort and professional advice where needed.
            </p>
            <p>
              Venue inclusion is editorial and utility-led. If commercial partnerships are introduced, sponsored or featured placements should be clearly labelled so users can separate editorial curation from paid promotion.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl border-t border-[#d8cebf] pt-8">
          <h2 className="mb-4 text-2xl font-medium">Useful next steps</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/editorial-standards" className="border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
              Read editorial standards
            </Link>
            <Link href="/sauna-london" className="border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
              Explore saunas
            </Link>
            <Link href="/recovery-london" className="border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
              Explore recovery spaces
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
