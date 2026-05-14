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

const outcomeLinks = [
  {
    href: "/recovery-london",
    label: "Recovery in London",
    text: "The parent guide to London recovery spaces, including sauna, cold plunge, cryotherapy and contrast therapy.",
  },
  {
    href: "/sauna-london",
    label: "Best Saunas in London",
    text: "Compare curated sauna spaces across London, including infrared, Finnish and contrast therapy studios.",
  },
];

const relatedGuides = [
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

const outcomeRoles = [
  {
    title: "Recovery",
    text: "Within recovery, sauna acts as a heat-led modality. It can support slower post-training reset, help create a calmer routine and pair naturally with cold plunge or contrast therapy.",
  },
  {
    title: "Longevity",
    text: "Within longevity, sauna sits alongside wider lifestyle behaviours such as sleep, movement, consistency and stress management. The value is strongest when it becomes part of a sustainable routine rather than a one-off treatment.",
  },
  {
    title: "Stress regulation",
    text: "Within stress regulation, sauna can be used as a quieter ritual: warmth, stillness, breath and a deliberate pause from stimulation. For many people, the setting matters as much as the heat itself.",
  },
];

export default function SaunaLondonGuidePage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 sm:py-20 md:py-28">
        <div className="mx-auto max-w-5xl border-t border-[#d8cebf]/70 pt-10 sm:pt-14">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            Well Edit / Sauna guide
          </p>

          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-6xl md:text-8xl">
            The Well Edit Guide to Sauna in London.
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#6f6048]">
                Heat therapy as part of recovery, longevity and stress regulation.
              </p>
            </div>

            <div className="space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg">
              <p>
                London’s sauna scene has evolved beyond traditional spas and hotel wellness areas. You can now find infrared sauna studios, communal Finnish-style heat rooms, contrast therapy clubs and recovery-led wellness spaces spread across the city.
              </p>

              <p>
                The best sauna experience depends less on the word sauna itself and more on the outcome you are looking for. Some spaces are built around calm nervous-system recovery and slower pacing, while others are designed for post-training recovery, social sessions or premium wellness routines.
              </p>

              <p>
                This guide places sauna within the wider London recovery landscape, helping you understand when heat therapy makes sense, how it pairs with cold exposure and what to look for before choosing a space.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-8">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              Parent topic
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Sauna sits inside the wider recovery ecosystem.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {outcomeLinks.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block bg-[#f4efe6] p-6 transition hover:bg-[#eee7da] sm:p-8"
              >
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                  {guide.label}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">{guide.text}</p>
              </Link>
            ))}
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
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              Outcome pathways
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Where sauna fits within recovery, longevity and stress regulation.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {outcomeRoles.map((role) => (
              <article key={role.title}>
                <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">
                  {role.title}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">{role.text}</p>
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
                Related modalities
              </p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
                Explore the wider recovery ecosystem.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Sauna is one recovery route. Cold plunge, cryotherapy and contrast therapy may suit different goals, session styles and comfort levels.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
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
    </main>
  );
}
