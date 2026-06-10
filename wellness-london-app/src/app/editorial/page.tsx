import type { Metadata } from "next";
import Link from "next/link";

const featuredArticles = [
  {
    href: "/editorial/best-saunas-london",
    kicker: "Heat Edit 001",
    title: "Best saunas in London",
    description:
      "An editorial shortlist for finding sauna in London — from infrared rooms and recovery studios to fuller heat-and-cold rituals.",
    meta: "Best of · Sauna · London",
  },
  {
    href: "/editorial/infrared-sauna-vs-traditional-sauna",
    kicker: "Sauna Guide 001",
    title: "Infrared sauna vs traditional sauna",
    description:
      "A practical guide to choosing the right London sauna experience based on session style, intensity, privacy and ritual.",
    meta: "Guide · Infrared · Sauna",
  },
  {
    href: "/best-sauna-cold-plunge-london",
    kicker: "Best of",
    title: "Best sauna + cold plunge",
    description:
      "A directory collection for comparing London spaces where heat and cold can be booked as part of the same recovery ritual.",
    meta: "Collection · Contrast",
  },
  {
    href: "/beginner-friendly-wellness-london",
    kicker: "Guide",
    title: "Beginner-friendly wellness",
    description:
      "A softer entry point for people who want clear, approachable places to try London wellness and recovery services.",
    meta: "Guide · First visits",
  },
];

const standardsLinks = [
  { href: "/how-we-curate", label: "How We Curate", text: "How venues are selected, grouped and presented across Well+." },
  { href: "/editorial-standards", label: "Editorial Standards", text: "The principles behind our editorial wording, structure and trust signals." },
];

export const metadata: Metadata = {
  title: "Editorial | Well+ London",
  description:
    "The Well+ Editorial section: curated best-of guides, practical explainers and standards for London sauna, recovery and wellness spaces.",
  alternates: {
    canonical: "/editorial",
  },
};

export default function EditorialPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="relative overflow-hidden bg-[#29241d] px-5 py-14 text-[#fbf8f1] sm:px-6 sm:py-20 md:py-28">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(90deg,#fbf8f1_1px,transparent_1px),linear-gradient(#fbf8f1_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <aside className="border-l border-[#fbf8f1]/18 pl-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#cbbda8]">Editorial</p>
            <p className="mt-16 max-w-xs font-serif text-3xl font-normal leading-[1.05] tracking-[-0.025em]">
              Curated guidance for choosing better London wellness spaces.
            </p>
          </aside>

          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#cbbda8]">The Well+ Editorial</p>
            <h1 className="max-w-4xl font-serif text-[4.1rem] font-normal leading-[0.86] tracking-[-0.04em] sm:text-8xl md:text-[8.5rem]">
              Guides, edits and standards.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#fbf8f1]/74 sm:text-xl sm:leading-9">
              The editorial layer of Well+: best-of guides, practical explainers and curation notes that help users interpret the directory rather than simply browse it.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-5 border-b border-[#29241d]/18 pb-7 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Featured editorial</p>
            <h2 className="font-serif text-[3rem] font-normal leading-[0.92] tracking-[-0.03em] sm:text-6xl">
              Start with the strongest guides.
            </h2>
          </div>

          <div className="divide-y divide-[#29241d]/18">
            {featuredArticles.map((article, index) => (
              <Link key={article.href} href={article.href} className="group grid gap-5 py-7 transition sm:py-9 lg:grid-cols-[0.18fr_0.62fr_0.2fr] lg:items-center">
                <p className="font-serif text-5xl leading-none tracking-[-0.04em] text-[#29241d]/30 sm:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">{article.kicker}</p>
                  <h3 className="font-serif text-[2.45rem] font-normal leading-[0.98] tracking-[-0.025em] text-[#29241d] sm:text-5xl">
                    {article.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f574c]">{article.description}</p>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-[#6f6048] lg:block lg:text-right">
                  <span>{article.meta}</span>
                  <span className="transition group-hover:translate-x-1 lg:mt-4 lg:block">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-[2rem] bg-[#fbf8f1] p-6 shadow-[0_18px_55px_rgba(41,36,29,0.045)] sm:p-8 lg:grid-cols-[0.32fr_0.68fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Standards</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {standardsLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group rounded-[1.2rem] border border-[#d8cebf]/80 p-5 transition hover:bg-[#29241d] hover:text-[#fbf8f1]">
                <h3 className="font-serif text-3xl font-normal leading-[1] tracking-[-0.02em]">{link.label}</h3>
                <p className="mt-4 text-sm leading-6 text-[#5f574c] transition group-hover:text-[#fbf8f1]/72">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
