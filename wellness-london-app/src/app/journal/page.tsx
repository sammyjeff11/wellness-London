import type { Metadata } from "next";
import Link from "next/link";

const featuredArticles = [
  {
    href: "/journal/best-saunas-london",
    kicker: "Heat Edit 001",
    title: "Best saunas in London",
    description:
      "A practical editorial shortlist for finding sauna in London — from infrared rooms and recovery studios to fuller heat-and-cold rituals.",
    meta: "Sauna · Infrared · Cold plunge",
  },
];

export const metadata: Metadata = {
  title: "Journal | Well+ London",
  description:
    "The Well+ Journal: practical guides, curated roundups and editorial notes on London sauna, recovery and wellness spaces.",
  alternates: {
    canonical: "/journal",
  },
};

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-14 sm:px-6 sm:py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <aside className="rounded-[1.2rem] border border-[#29241d]/14 bg-[#29241d] p-5 text-[#fbf8f1] sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#fbf8f1]/58">Journal</p>
              <p className="mt-16 max-w-xs font-serif text-3xl font-normal leading-[1.05] tracking-[-0.025em]">
                Editorial guidance for choosing better London wellness spaces.
              </p>
            </aside>

            <div>
              <p className="editorial-eyebrow mb-5">The Well+ Journal</p>
              <h1 className="max-w-4xl font-serif text-[3.7rem] font-normal leading-[0.9] tracking-[-0.025em] sm:text-7xl md:text-8xl">
                Guides to recovery, ritual and city wellness.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5f574c] sm:text-xl sm:leading-9">
                Practical guides, curated roundups and considered notes to help you choose where to go — not a generic wellness blog.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Featured</p>
              <h2 className="font-serif text-[2.45rem] font-normal leading-[1] tracking-[-0.02em] sm:text-5xl">
                Start with the first edit.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
              Journal pages are designed to feel more editorial than the directory, while still linking back into live Well+ venue profiles.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group rounded-[1.45rem] border border-[#d8cebf]/80 bg-[#fbf8f1] p-6 shadow-[0_18px_55px_rgba(41,36,29,0.045)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(41,36,29,0.08)]"
              >
                <p className="editorial-eyebrow mb-8">{article.kicker}</p>
                <h3 className="font-serif text-4xl font-normal leading-[1] tracking-[-0.02em] text-[#29241d]">
                  {article.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#5f574c]">{article.description}</p>
                <div className="mt-8 flex items-center justify-between border-t border-[#d8cebf]/70 pt-4 text-sm text-[#6f6048]">
                  <span>{article.meta}</span>
                  <span className="transition group-hover:translate-x-1">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
