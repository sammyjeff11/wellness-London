import type { Metadata } from "next";
import TopicalPathways from "@/components/TopicalPathways";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Choose a Sauna in London | Well+",
  description:
    "Understand traditional versus infrared sauna, shared versus private access, session pricing and what to check before choosing a London venue.",
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
            Well+ / Sauna guide
          </p>

          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-6xl md:text-8xl">
            Well+ Guide to Sauna in London.
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
                Start with the booking format. A sauna might be included in a gym membership, offered as a shared timed session, or reserved privately. Confirm which option is available to you before comparing prices.
              </p>

              <p>
                Before choosing, check the heat type, session length, whether towels and showers are included, and if cold-water facilities come with the same ticket. A venue-wide starting price may not apply to the sauna session you want.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 pb-10 sm:px-6 sm:pb-14">
        <div className="mx-auto max-w-5xl rounded-[1.2rem] border border-[#d8cebf] p-5 sm:p-7">
          <h2 className="font-serif text-3xl sm:text-4xl">Ready to choose a venue?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f574c]">
            This guide explains the options. The directory lets you filter venues by area,
            access, price basis and session format, then compare practical details.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/sauna-london#venues" className="inline-flex min-h-11 items-center rounded-full bg-[#29241d] px-5 text-sm font-medium text-[#fbf8f1]">
              Find and compare sauna venues
            </Link>
            <Link href="/editorial/best-saunas-london" className="inline-flex min-h-11 items-center rounded-full border border-[#b9ab97] px-5 text-sm font-medium">
              Read the researched shortlist
            </Link>
          </div>
        </div>
      </section>

      <TopicalPathways
        eyebrow="Recovery pathways"
        title="Sauna sits inside the wider recovery ecosystem."
        introduction="Sauna is one route into recovery. It connects naturally to cold plunge, cryotherapy, stress regulation and longer-term wellness routines."
        parentTopic={{
          href: "/recovery-london",
          label: "Recovery in London",
          description:
            "The parent guide to London recovery spaces, including sauna, cold plunge, cryotherapy and contrast therapy.",
        }}
        relatedModalities={[
          {
            href: "/sauna-london",
            label: "Find sauna venues in London",
            description:
              "Compare London sauna venues, including infrared, Finnish and contrast therapy studios.",
          },
          {
            href: "/cold-plunge-london",
            label: "Cold Plunge in London",
            description:
              "Explore ice baths, guided cold exposure and recovery-focused plunge studios across the city.",
          },
          {
            href: "/cryotherapy-london",
            label: "Cryotherapy in London",
            description:
              "Compare cryotherapy studios, recovery clubs and structured cold-therapy experiences.",
          },
          {
            href: "/contrast-therapy-london",
            label: "Contrast Therapy in London",
            description:
              "Explore spaces designed around alternating heat and cold recovery rituals.",
          },
        ]}
        relatedOutcomes={[
          {
            href: "/recovery-london",
            label: "Recovery",
            description:
              "Heat-led recovery, post-training reset and calmer weekly wellness routines.",
          },
          {
            href: "/longevity",
            label: "Longevity",
            description:
              "Longer-term wellness behaviours involving heat exposure, sleep and sustainable recovery habits.",
          },
          {
            href: "/stress-regulation-london",
            label: "Stress Regulation",
            description:
              "Calmer rituals focused on nervous-system recovery, rest and downregulation.",
          },
        ]}
      />

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
              The same venue may offer several services, but not necessarily within the same booking. Check what the ticket includes.
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
    </main>
  );
}
