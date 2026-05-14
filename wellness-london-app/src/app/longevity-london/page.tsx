import type { Metadata } from "next";
import TopicalPathways from "@/components/TopicalPathways";

export const metadata: Metadata = {
  title: "Longevity in London | Recovery, Sleep, Heat Exposure & Wellness Routines | Well Edit",
  description:
    "Explore longevity-focused wellness in London, including sauna, cold exposure, recovery routines, sleep optimisation and modern wellness spaces.",
  alternates: {
    canonical: "/longevity-london",
  },
};

const longevityThemes = [
  {
    title: "Heat exposure",
    text: "Sauna and heat-led recovery routines increasingly sit within modern longevity culture, particularly when combined with consistency, sleep and wider lifestyle habits.",
  },
  {
    title: "Cold exposure",
    text: "Cold plunge, ice baths and cryotherapy are often used as resilience and recovery tools within structured wellness routines.",
  },
  {
    title: "Sleep optimisation",
    text: "Many wellness spaces now incorporate calmer recovery rituals, evening sauna use, breathwork and nervous-system regulation to support better sleep quality.",
  },
  {
    title: "Sustainable routines",
    text: "The strongest longevity habits are usually repeatable. Convenience, atmosphere, accessibility and how a space makes you feel matter more than intensity alone.",
  },
];

export default function LongevityLondonPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 sm:py-20 md:py-28">
        <div className="mx-auto max-w-5xl border-t border-[#d8cebf]/70 pt-10 sm:pt-14">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            Well Edit / Longevity in London
          </p>

          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-6xl md:text-8xl">
            Longevity in London.
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#6f6048]">
                Wellness routines built around recovery, consistency and sustainable health behaviours.
              </p>
            </div>

            <div className="space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg">
              <p>
                Longevity has become one of the defining themes within modern wellness culture. Across London, sauna studios, cold plunge spaces, recovery clubs and quieter wellness environments are increasingly framed around sustainable wellbeing rather than isolated treatments.
              </p>

              <p>
                The strongest longevity routines are rarely extreme. They are built around repeatable behaviours such as movement, sleep, stress regulation, recovery and consistent rituals that support how people feel day to day.
              </p>

              <p>
                This guide connects the different wellness modalities currently shaping London’s longevity landscape, from heat exposure and contrast therapy to calmer recovery-led experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TopicalPathways
        eyebrow="Longevity pathways"
        title="Explore longevity-focused wellness routes."
        introduction="Longevity overlaps naturally with recovery, sleep, stress regulation and sustainable wellness habits."
        parentTopic={{
          href: "/recovery-london",
          label: "Recovery in London",
          description:
            "Explore the broader recovery ecosystem connecting sauna, cold plunge, cryotherapy and recovery-led wellness routines.",
        }}
        relatedModalities={[
          {
            href: "/guides/sauna-london-guide",
            label: "Sauna in London",
            description:
              "Heat-led wellness routines, contrast therapy and calmer recovery rituals.",
          },
          {
            href: "/cold-plunge-london",
            label: "Cold Plunge in London",
            description:
              "Cold exposure and recovery-focused plunge experiences across London.",
          },
          {
            href: "/cryotherapy-london",
            label: "Cryotherapy in London",
            description:
              "Structured cold-therapy experiences often associated with recovery and resilience.",
          },
        ]}
        relatedOutcomes={[
          {
            href: "/recovery-london",
            label: "Recovery",
            description:
              "Recovery-led routines involving sauna, contrast therapy and calmer reset experiences.",
          },
          {
            href: "/journal",
            label: "Stress Regulation",
            description:
              "Nervous-system recovery, sleep support and calmer wellness rituals.",
          },
          {
            href: "/journal",
            label: "Performance",
            description:
              "Recovery and readiness routines supporting training consistency and energy.",
          },
        ]}
        relatedLocations={[
          {
            href: "/central-london-wellness",
            label: "Central London Wellness",
            description:
              "Explore premium recovery and wellness spaces across central London.",
          },
          {
            href: "/west-london-wellness",
            label: "West London Wellness",
            description:
              "Design-led wellness and recovery studios across west London.",
          },
        ]}
      />

      <section className="bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Longevity themes
              </p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-6xl">
                What modern longevity culture actually looks like.
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Longevity is increasingly less about biohacking aesthetics and more about sustainable recovery, better sleep, calmer routines and long-term wellbeing.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {longevityThemes.map((theme) => (
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
