import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Well Edit Guide to Sauna in London | Heat Therapy, Recovery & Contrast Therapy",
  description:
    "An editorial guide to sauna culture in London, including infrared sauna, traditional heat therapy, contrast therapy, recovery rituals and how to choose the right sauna experience.",
  alternates: {
    canonical: "/guides/sauna-london-guide",
  },
};

const sections = [
  {
    title: "Infrared sauna",
    text: "Infrared sauna spaces are often quieter, more private and gentler than traditional heat rooms. Across London, they commonly appear within boutique wellness studios, longevity clubs and recovery-focused spaces.",
  },
  {
    title: "Traditional sauna",
    text: "Traditional and Finnish-style saunas usually deliver a hotter and more ritual-led experience, often paired with communal seating, steam, cold exposure and slower recovery pacing.",
  },
  {
    title: "Contrast therapy",
    text: "Many London recovery spaces now combine sauna with cold plunge or ice bath exposure, creating a broader contrast therapy experience rather than heat alone.",
  },
  {
    title: "Recovery-led wellness",
    text: "Sauna is increasingly positioned within wider recovery routines involving breathwork, compression therapy, red light therapy, sleep optimisation and nervous-system regulation.",
  },
];

const relatedGuides = [
  {
    href: "/sauna-london",
    label: "Best Saunas in London",
    text: "Compare curated sauna spaces across London, including infrared, Finnish and contrast therapy studios.",
  },
  {
    href: "/cold-plunge-london",
    label: "Cold Plunge in London",
    text: "Explore ice baths, cold exposure and recovery-focused plunge studios across the city.",
  },
  {
    href: "/cryotherapy-london",
    label: "Cryotherapy in London",
    text: "Compare cryotherapy studios, recovery clubs and cold-therapy experiences.",
  },
  {
    href: "/contrast-therapy-london",
    label: "Contrast Therapy in London",
    text: "Explore spaces designed around heat-to-cold recovery rituals and guided contrast therapy.",
  },
];

export default function SaunaLondonGuidePage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 sm:py-20 md:py-28">
        <div className="mx-auto max-w-5xl border-t border-[#d8cebf]/70 pt-10 sm:pt-14">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            Well Edit / Evergreen sauna guide
          </p>

          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-6xl md:text-8xl">
            The Well Edit Guide to Sauna in London.
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#6f6048]">
                Sauna culture, recovery rituals and heat therapy in London.
              </p>
            </div>

            <div className="space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg">
              <p>
                London’s sauna scene has evolved beyond traditional spas and hotel wellness areas. You can now find infrared sauna studios, communal Finnish-style heat rooms, contrast therapy clubs and recovery-led wellness spaces spread across the city.
              </p>

              <p>
                The best sauna experience depends less on the word sauna itself and more on the ritual you are looking for. Some spaces are built around calm nervous-system recovery and slower pacing, while others are designed for post-training recovery, social sessions or premium wellness routines.
              </p>

              <p>
                This guide exists to help Google — and users — understand how the wider sauna ecosystem connects together across recovery, cold therapy, longevity, wellness culture and modern London wellness spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Core sauna topics
              </p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-6xl">
                Understanding the sauna landscape.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Sauna increasingly overlaps with recovery science, contrast therapy, nervous-system regulation and modern longevity culture.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.title}
                className="border border-[#d8cebf]/70 bg-[#f4efe6] p-6 sm:p-8"
              >
                <h3 className="mb-4 text-2xl font-medium tracking-normal">
                  {section.title}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">
                  {section.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10">
          <div className="mb-8 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Connected recovery guides
              </p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
                Explore the wider recovery ecosystem.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              These guides intentionally connect sauna with cold therapy, recovery spaces and broader wellness behaviours.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block bg-[#fbf8f1] p-6 transition hover:bg-[#eee7da] sm:p-8"
              >
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                  {guide.label}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">
                  {guide.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eee7da] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            Why this matters for SEO
          </p>

          <h2 className="mb-8 font-serif text-4xl font-normal leading-tight sm:text-5xl">
            Building topical authority around sauna.
          </h2>

          <div className="space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg">
            <p>
              This guide acts as an evergreen topical hub designed to strengthen semantic relationships between sauna, contrast therapy, cold exposure, recovery studios and London wellness experiences.
            </p>

            <p>
              Rather than treating sauna as a single keyword, Well Edit is building a broader recovery and wellness ecosystem that connects commercial venue discovery with informational editorial content.
            </p>

            <p>
              Over time, additional supporting pages will deepen this cluster with guides on infrared sauna, sauna etiquette, heat therapy, sleep recovery, athletic recovery and neighbourhood-specific wellness experiences.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
