import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "London Wellness Services | Compare Venues & Guides | Well+",
  description:
    "Browse London wellness services, experiences, tests and diagnostics, from sauna and cold plunge to recovery, health screening and longevity assessments.",
  alternates: { canonical: "/services" },
};

const groups = [
  {
    id: "recovery",
    title: "Recovery",
    services: [
      {
        href: "/sauna-london",
        name: "Sauna",
        description: "Compare traditional, shared and private heat sessions.",
      },
      {
        href: "/infrared-sauna-london",
        name: "Infrared sauna",
        description:
          "Infrared heat in private rooms and shared recovery spaces.",
      },
      {
        href: "/cold-plunge-london",
        name: "Cold plunge",
        description:
          "Ice baths and cold-water immersion, with guidance and session formats explained.",
      },
      {
        href: "/contrast-therapy-london",
        name: "Contrast therapy",
        description: "Sauna and cold plunge combined in one visit.",
      },
      {
        href: "/cryotherapy-london",
        name: "Cryotherapy",
        description: "Whole-body and localised cold-air treatments.",
      },
      {
        href: "/red-light-therapy-london",
        name: "Red light therapy",
        description:
          "Red and near-infrared light sessions in studio and clinic settings.",
      },
      {
        href: "/hbot-london",
        name: "Hyperbaric oxygen therapy",
        description:
          "Compare chamber types, supervision and published session details.",
      },
      {
        href: "/recovery-london",
        name: "Recovery studios",
        description:
          "Venues bringing several recovery services into one place.",
      },
    ],
  },
  {
    id: "testing",
    title: "Health testing & diagnostics",
    services: [
      {
        href: "/longevity",
        name: "Longevity clinics",
        description:
          "Compare clinics by assessment, clinical review and follow-up.",
      },
      {
        href: "/health-screening-london",
        name: "Health screening",
        description:
          "Health checks and assessments with interpretation of the results.",
      },
      {
        href: "/blood-testing-london",
        name: "Blood testing",
        description:
          "Compare what a panel measures and who explains the findings.",
      },
      {
        href: "/dexa-scan-london",
        name: "DEXA scans",
        description:
          "Body-composition and bone-density assessments; check the exact scan offered.",
      },
      {
        href: "/vo2-max-testing-london",
        name: "VO₂ max testing",
        description:
          "Measured cardiorespiratory fitness with protocols and results explained.",
      },
      {
        href: "/cardiovascular-screening-london",
        name: "Cardiovascular screening",
        description: "Heart-health assessments and selected investigations.",
      },
      {
        href: "/medical-imaging-london",
        name: "Medical imaging",
        description:
          "Private imaging with attention to clinical oversight and follow-up.",
      },
    ],
  },
  {
    id: "mobility",
    title: "Mobility & restorative sessions",
    services: [
      {
        href: "/assisted-stretching-london",
        name: "Assisted stretching",
        description:
          "One-to-one flexibility and mobility sessions led by a practitioner.",
      },
      {
        href: "/stress-regulation-london",
        name: "Breathwork & restorative sessions",
        description: "Explore slower sessions and spaces for decompression.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="editorial-shell py-8 sm:py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "London wellness services",
          url: absoluteUrl("/services"),
          hasPart: groups.flatMap((group) =>
            group.services.map((service) => ({
              "@type": "WebPage",
              name: service.name,
              url: absoluteUrl(service.href),
            })),
          ),
        }}
      />
      <p className="editorial-eyebrow">Find your next session</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">
        Explore London wellness services.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f574c]">
        Start with a service. Compare London venues, understand the different
        formats and check what is included before you book.
      </p>
      <nav aria-label="Service groups" className="my-6 flex flex-wrap gap-2">
        {groups.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            className="inline-flex min-h-11 items-center rounded-full border border-[#b9ab97] px-4 text-sm"
          >
            {group.title}
          </a>
        ))}
      </nav>
      {groups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="scroll-mt-28 border-t border-[#d8cebf] py-8 sm:py-10"
        >
          <h2 className="text-3xl sm:text-4xl">{group.title}</h2>
          <div className="mt-5 grid gap-x-10 sm:grid-cols-2">
            {group.services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group border-b border-[#d8cebf] py-5"
              >
                <h3 className="flex justify-between gap-4 font-sans text-lg font-semibold tracking-tight">
                  {service.name}
                  <span aria-hidden="true">↗</span>
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5f574c]">
                  {service.description}
                </p>
                <span className="mt-2 inline-block text-sm underline-offset-4 group-hover:underline">
                  Guide & venues
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
