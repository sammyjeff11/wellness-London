import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recovery in London | Saunas, Cold Plunge, Cryotherapy & Contrast Therapy | Well Edit",
  description:
    "A curated guide to recovery in London, including sauna, cold plunge, cryotherapy, contrast therapy and recovery studios for training, stress regulation and modern wellness routines.",
  alternates: {
    canonical: "/recovery-london",
  },
};

const recoveryModalities = [
  {
    href: "/sauna-london",
    label: "Sauna and heat therapy",
    eyebrow: "Heat-led recovery",
    text: "Infrared, traditional and private sauna spaces for slower recovery, relaxation and contrast therapy pairing.",
  },
  {
    href: "/cold-plunge-london",
    label: "Cold plunge and ice baths",
    eyebrow: "Cold exposure",
    text: "Cold plunge, ice bath and guided cold-exposure spaces for recovery routines and post-training reset.",
  },
  {
    href: "/cryotherapy-london",
    label: "Cryotherapy",
    eyebrow: "Short cold therapy",
    text: "Whole-body and localised cryotherapy studios for structured, time-efficient recovery sessions.",
  },
  {
    href: "/contrast-therapy-london",
    label: "Contrast therapy",
    eyebrow: "Heat and cold",
    text: "Studios that pair sauna and cold plunge into a fuller recovery ritual built around alternating heat and cold.",
  },
];

const decisionPoints = [
  {
    title: "Choose by outcome",
    text: "For post-training recovery, look at cold plunge, cryotherapy and contrast therapy. For calm reset, private sauna and slower heat-led spaces may suit better.",
  },
  {
    title: "Check the setting",
    text: "The best recovery space is not always the most technical. Atmosphere, staff guidance, changing facilities, showers and somewhere to regulate afterwards all matter.",
  },
  {
    title: "Think repeatability",
    text: "Recovery works best when it can become a rhythm. Location, price, opening hours and whether the experience feels welcoming will shape whether you return.",
  },
];

const relatedGuides = [
  {
    href: "/guides/sauna-london-guide",
    label: "The Well Edit Guide to Sauna in London",
    text: "Understand how sauna sits within recovery, longevity, stress regulation and London wellness culture.",
  },
  {
    href: "/central-london-wellness",
    label: "Central London Wellness",
    text: "Explore recovery and wellness spaces across central London neighbourhoods.",
  },
  {
    href: "/east-london-wellness",
    label: "East London Wellness",
    text: "Find design-led and independent recovery spaces across east London.",
  },
  {
    href: "/west-london-wellness",
    label: "West London Wellness",
    text: "Browse premium wellness and recovery spaces across west London.",
  },
];

const faqs = [
  {
    question: "What are the main types of recovery spaces in London?",
    answer:
      "London recovery spaces commonly include sauna studios, cold plunge and ice bath venues, cryotherapy studios, contrast therapy spaces, recovery clubs and broader wellness studios offering treatments such as compression, red light or breathwork.",
  },
  {
    question: "Is sauna or cold plunge better for recovery?",
    answer:
      "Neither is universally better. Sauna may suit relaxation, heat-led recovery and calmer routines, while cold plunge is often used for cold exposure, post-training reset and contrast therapy. The better choice depends on the outcome you want and how well the venue supports beginners.",
  },
  {
    question: "What should beginners look for in a recovery studio?",
    answer:
      "Beginners should prioritise clear guidance, sensible session lengths, clean facilities, showers, towel provision, staff support and an environment that does not feel intimidating or overly performance-led.",
  },
  {
    question: "Can recovery spaces support stress regulation as well as training recovery?",
    answer:
      "Yes. Many people use sauna, breathwork, gentle cold exposure and calm recovery spaces for nervous-system regulation, sleep support and stress reduction, not only athletic recovery.",
  },
];

export default function RecoveryLondonPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 sm:py-20 md:py-28">
        <div className="mx-auto max-w-5xl border-t border-[#d8cebf]/70 pt-10 sm:pt-14">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            Well Edit / Recovery in London
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-6xl md:text-8xl">
            Recovery in London.
          </h1>
          <div className="mt-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <p className="text-sm uppercase tracking-[0.18em] text-[#6f6048]">
              Sauna, cold plunge, cryotherapy and contrast therapy for modern recovery routines.
            </p>
            <div className="space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg">
              <p>
                Recovery has become one of the clearest ways to understand London’s modern wellness scene. The city now has sauna studios, cold plunge spaces, cryotherapy rooms, contrast therapy clubs and premium recovery studios built around different versions of reset.
              </p>
              <p>
                Some people are looking for post-training recovery. Others want better sleep, calmer evenings, nervous-system regulation or a more intentional weekly ritual. The right space depends on the outcome, not just the treatment name.
              </p>
              <p>
                Use this guide as the parent route into the Well Edit recovery ecosystem, then move into the specific modality or location that fits the kind of recovery you want.
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
                Recovery modalities
              </p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl md:text-6xl">
                Choose the route that matches the reset you need.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              These are the main recovery routes currently covered by Well Edit, each linked to a more specific London guide.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {recoveryModalities.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block border border-[#d8cebf]/70 bg-[#f4efe6] p-6 transition hover:bg-[#eee7da] sm:p-8"
              >
                <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                  {item.eyebrow}
                </p>
                <h3 className="mb-3 text-2xl font-medium tracking-normal group-hover:underline group-hover:underline-offset-4">
                  {item.label}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl border-y border-[#d8cebf]/70 py-10">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              How to choose
            </p>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
              Recovery is personal. Start with the outcome.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {decisionPoints.map((point) => (
              <article key={point.title}>
                <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">
                  {point.title}
                </h3>
                <p className="text-sm leading-7 text-[#5f574c]">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eee7da] px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
            Recovery, performance and stress regulation
          </p>
          <h2 className="mb-8 font-serif text-4xl font-normal leading-tight sm:text-5xl">
            Where recovery fits within the wider wellness ecosystem.
          </h2>
          <div className="space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg">
            <p>
              Recovery sits between several related intentions. For performance, it supports consistency, training readiness and post-workout reset. For longevity, it connects to sustainable routines such as heat exposure, sleep support and regular movement. For stress regulation, it can become a calmer ritual around rest, breath and downregulation.
            </p>
            <p>
              That is why Well Edit treats sauna, cold plunge and cryotherapy as modalities within a broader recovery landscape, rather than isolated treatments. The value comes from choosing the right experience for the outcome you want.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Related pathways
              </p>
              <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
                Continue exploring recovery in London.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] md:justify-self-end">
              Move from the parent recovery guide into sauna education, neighbourhood guides and more specific treatment routes.
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
                <p className="text-sm leading-7 text-[#5f574c]">{guide.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-medium tracking-normal sm:mb-10 sm:text-3xl md:text-4xl">
            Recovery in London FAQs
          </h2>
          <div className="space-y-7 sm:space-y-8">
            {faqs.map((faq) => (
              <article key={faq.question} className="border-t border-[#d8cebf]/70 pt-6">
                <h3 className="mb-3 text-lg text-[#29241d]">{faq.question}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
