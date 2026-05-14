import type { Metadata } from "next";
import TopicalPathways from "@/components/TopicalPathways";

export const metadata: Metadata = {
  title: "Stress Regulation in London | Calm Wellness, Sauna, Breathwork & Recovery | Well Edit",
  description:
    "Explore stress regulation and calm wellness in London, including sauna, breathwork, cold exposure, sleep-supportive routines and recovery spaces.",
  alternates: {
    canonical: "/stress-regulation-london",
  },
};

const regulationThemes = [
  {
    title: "Calm recovery spaces",
    text: "Some wellness spaces are valuable because they feel calm, private and easy to return to. For stress regulation, atmosphere, pacing and guidance can matter as much as the treatment itself.",
  },
  {
    title: "Heat and stillness",
    text: "Sauna can act as a deliberate pause: warmth, quiet, breath and time away from stimulation. The strongest experiences are often those that feel sustainable rather than intense.",
  },
  {
    title: "Guided cold exposure",
    text: "Cold plunge can be used as part of a breath-led resilience ritual, especially when the environment is well supported and not framed as a toughness test.",
  },
  {
    title: "Sleep-supportive routines",
    text: "Evening recovery rituals, calmer spaces and nervous-system downregulation can all support the wider conditions that make better sleep more likely.",
  },
];

export default function StressRegulationLondonPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 sm:py-20 md:py-28">
        <div className="mx-auto max-w-5xl border-t border-[#d8cebf]/70 pt-10 sm:pt-14">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            Well Edit / Stress regulation in London
          </p>

          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-6xl md:text-8xl">
            Stress Regulation in London.
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#6f6048]">
                Calm wellness spaces, recovery rituals and nervous-system-led routines.
              </p>
            </div>

            <div className="space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg">
              <p>
                Stress regulation is one of the most practical ways to understand modern wellness. For many people, the goal is not intensity, optimisation or novelty, but a calmer place to reset and return to themselves.
              </p>

              <p>
                Across London, sauna studios, recovery spaces, breath-led cold exposure and quieter wellness environments can all support this intention when they are designed with pacing, comfort and guidance in mind.
              </p>

              <p>
                This guide connects the calmer side of London wellness: spaces and routines that support rest, downregulation, sleep and a more sustainable relationship with recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TopicalPathways
        eyebrow="Stress regulation pathways"
        title="Explore calmer routes into recovery."
        introduction="Stress regulation overlaps with recovery, sleep, breath, heat therapy and low-pressure wellness experiences."
        parentTopic={{
          href: "/recovery-london",
          label: "Recovery in London",
          description:
            "The parent recovery guide connecting sauna, cold plunge, cryotherapy and calmer wellness routines.",
        }}
        relatedModalities={[
          {
            href: "/guides/sauna-london-guide",
            label: "Sauna in London",
            description:
              "Heat-led recovery, private rooms and calmer weekly reset rituals.",
          },
          {
            href: "/cold-plunge-london",
            label: "Cold Plunge in London",
            description:
              "Cold exposure spaces where guidance, breath and environment shape the experience.",
          },
          {
            href: "/contrast-therapy-london",
            label: "Contrast Therapy in London",
            description:
              "Heat and cold rituals that can support a structured recovery routine.",
          },
        ]}
        relatedOutcomes={[
          {
            href: "/recovery-london",
            label: "Recovery",
            description:
              "Calmer reset, post-training recovery and repeatable wellness routines.",
          },
          {
            href: "/longevity-london",
            label: "Longevity",
            description:
              "Sustainable wellness behaviours that support long-term health routines.",
          },
          {
            href: "/journal",
            label: "Performance",
            description:
              "Readiness and recovery routines that support training consistency and energy.",
          },
        ]}
        relatedLocations={[
          {
            href: "/central-london-wellness",
            label: "Central London Wellness",
            description:
              "Explore calm recovery and wellness spaces across central London.",
          },
          {
            href: "/west-london-wellness",
            label: "West London Wellness",
            description:
              "Browse premium wellness and recovery spaces across west London.",
          },
        ]}
      />

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Regulation themes
              </p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-6xl">
                What calm wellness can look like in practice.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Stress regulation is not one treatment. It is a pattern of spaces, rituals and routines that help the body move away from constant stimulation.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {regulationThemes.map((theme) => (
              <article
                key={theme.title}
                className="border border-[#d8cebf]/70 bg-[#f4efe6] p-6 sm:p-8"
              >
                <h3 className="mb-4 text-2xl font-medium tracking-normal">
                  {theme.title}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">
                  {theme.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
