import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import type { AirtableFacility } from "@/lib/airtable";
import type { PillarPageConfig } from "@/lib/pillar-pages";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export default function PillarPage({
  pillar,
  facilities,
}: {
  pillar: PillarPageConfig;
  facilities: AirtableFacility[];
}) {
  const featuredFacilities = facilities.slice(0, 9).map(toDirectoryFacility);

  return (
    <main className="bg-[#fbf8f1] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.26em] text-[#6f6048]">{pillar.eyebrow}</p>
          <h1 className="font-serif text-5xl font-normal leading-[0.98] sm:text-6xl md:text-7xl">
            {pillar.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f574c]">{pillar.intro}</p>
        </div>
      </section>

      <section className="bg-[#f4efe6] px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Popular routes</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Start with a treatment or format.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:text-base">
              Some users know exactly what they want. These shortcuts provide faster routes into the most relevant service-led pages.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pillar.popularLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[220px] flex-col justify-between border border-[#d8cebf] bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da]"
              >
                <div>
                  <h3 className="mb-4 text-2xl font-medium">{link.label}</h3>
                  <p className="text-sm leading-7 text-[#5f574c]">{link.description}</p>
                </div>
                <span className="mt-6 text-sm underline underline-offset-4">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Curated venues</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
                Recommended London wellness spaces.
              </h2>
            </div>
            <Link href="/how-we-curate" className="text-sm underline underline-offset-4">
              How we curate
            </Link>
          </div>

          {featuredFacilities.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {featuredFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source={`${pillar.slug}_pillar`} />
              ))}
            </div>
          ) : (
            <div className="border border-[#d8cebf] bg-[#f4efe6] p-8 text-sm leading-7 text-[#5f574c]">
              Venue collections are still being expanded for this pillar.
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-14 text-[#fbf8f1] sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">How to choose</p>
            <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl md:text-5xl">
              Choosing the right space matters.
            </h2>
          </div>

          <div className="space-y-6">
            {pillar.guidance.map((item) => (
              <article key={item.title} className="border border-[#fbf8f1]/14 p-6">
                <h3 className="mb-3 text-2xl font-medium">{item.title}</h3>
                <p className="text-sm leading-7 text-[#fbf8f1]/74">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl border-t border-[#d8cebf] pt-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">FAQs</p>
              <h2 className="font-serif text-3xl font-normal leading-tight sm:text-4xl">
                Questions people often ask.
              </h2>
            </div>
            <Link href="/editorial-standards" className="text-sm underline underline-offset-4">
              Editorial standards
            </Link>
          </div>

          <div className="space-y-6">
            {pillar.faqs.map((faq) => (
              <article key={faq.question} className="border-t border-[#d8cebf]/70 pt-6">
                <h3 className="mb-3 text-lg text-[#29241d]">{faq.question}</h3>
                <p className="text-sm leading-7 text-[#70695d]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
