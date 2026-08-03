import type { Metadata } from "next";
import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "The Well+ Edit | London Wellness Updates",
  description:
    "Join The Well+ Edit for occasional updates on new London wellness venues, practical treatment guides and useful shortlists.",
  alternates: { canonical: "/the-edit" },
};

const coverage = [
  {
    title: "New and changing venues",
    text: "Openings, new locations and meaningful service changes across London recovery, spa and longevity venues.",
  },
  {
    title: "Practical comparisons",
    text: "Clear guidance on what changes the experience: access, privacy, equipment, facilities, price and booking format.",
  },
  {
    title: "Worthwhile shortlists",
    text: "Focused selections designed to help you decide where to go, rather than long lists built only for search traffic.",
  },
];

export default function TheEditPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="editorial-eyebrow mb-4">The Well+ Edit</p>
            <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.94] tracking-[-0.055em] sm:text-7xl md:text-8xl">
              London wellness, edited for usefulness.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
              Occasional emails covering new venues, useful treatment guides and the details that make one booking better suited than another.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/explore" className="rounded-full bg-[#29241d] px-6 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#463c31]">
                Explore venues
              </Link>
              <Link href="/editorial" className="rounded-full border border-[#cfc3b2] px-6 py-3 text-sm transition hover:border-[#29241d] hover:bg-[#fbf8f1]">
                Read editorial
              </Link>
            </div>
          </div>

          <NewsletterSignup source="the_edit_page" title="Join The Well+ Edit" copy="Get the strongest new London wellness finds and practical guides without a crowded weekly newsletter." />
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-4">What to expect</p>
          <h2 className="max-w-3xl font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
            Fewer emails. Better reasons to open them.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {coverage.map((item) => (
              <article key={item.title} className="rounded-[1rem] border border-[#d8cebf]/75 bg-[#f4efe6] p-6">
                <h3 className="font-serif text-2xl font-normal leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5f574c]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
