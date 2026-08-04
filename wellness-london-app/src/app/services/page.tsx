import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { absoluteUrl } from "@/lib/site";
import { canonicalServiceSlug, serviceTaxonomy, type ServiceCategory, type ServiceSlug } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "London Wellness Services | Compare Venues & Guides | Well+",
  description:
    "Browse London wellness services, experiences, tests and diagnostics, from sauna and cold plunge to recovery, health screening and longevity assessments.",
  alternates: { canonical: "/services" },
};

const groups: { title: string; description: string; categories: ServiceCategory[] }[] = [
  {
    title: "Heat and sauna",
    description: "Traditional, communal and private heat experiences, including infrared sauna.",
    categories: ["heat"],
  },
  {
    title: "Cold and contrast",
    description: "Cold-water immersion, cryotherapy and structured hot-and-cold experiences.",
    categories: ["cold"],
  },
  {
    title: "Recovery and performance",
    description: "Services used around physical recovery, training, movement and restoration.",
    categories: ["recovery", "oxygen"],
  },
  {
    title: "Mind and restorative",
    description: "Quieter practices and experiences centred on decompression and regulation.",
    categories: ["mind-body"],
  },
  {
    title: "Tests and diagnostics",
    description: "Clinic-led screening, measurement and health assessments within longevity and preventative health.",
    categories: ["longevity", "medical-wellness"],
  },
];

const additionalServices = [
  { href: "/assisted-stretching-london", label: "Assisted Stretching", kind: "Movement service", description: "Practitioner-guided flexibility and mobility sessions, with professional background and session format clearly distinguished." },
  { href: "/cardiovascular-screening-london", label: "Cardiovascular Screening", kind: "Test or clinical service", description: "Heart-health risk assessment and selected investigations, compared by clinical oversight and interpretation." },
  { href: "/dexa-scan-london", label: "DEXA Scans", kind: "Test or assessment", description: "Body composition and bone-density measurement for performance or preventative-health questions." },
  { href: "/vo2-max-testing-london", label: "VO₂ Max Testing", kind: "Performance test", description: "Cardiorespiratory fitness testing with protocols, interpretation and repeat measurement compared clearly." },
  { href: "/medical-imaging-london", label: "Medical Imaging", kind: "Clinical service", description: "Private imaging options within an appropriately supervised health-assessment pathway." },
];

function serviceKind(category?: ServiceCategory) {
  if (category === "longevity" || category === "medical-wellness") return "Test or clinical service";
  if (category === "mind-body") return "Experience or practice";
  return "Wellness service";
}

export default async function ServicesPage() {
  const facilities = await getFacilities();
  const countBySlug = new Map<string, number>();

  facilities.forEach((facility) => {
    const slugs = new Set(facility.servicesOffered.map(canonicalServiceSlug).filter((slug): slug is ServiceSlug => Boolean(slug)));
    slugs.forEach((slug) => countBySlug.set(slug, (countBySlug.get(slug) || 0) + 1));
  });

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "London wellness services",
        url: absoluteUrl("/services"),
        hasPart: serviceTaxonomy.map((service) => ({
          "@type": "WebPage",
          name: service.name,
          url: absoluteUrl(service.href),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={schema} />
      <section className="px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-[#6f6048]">
            <Link href="/" className="underline-offset-4 hover:underline">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#29241d]">Services</span>
          </nav>
          <p className="editorial-eyebrow mb-4">Browse what is available</p>
          <h1 className="max-w-4xl font-serif text-[3.4rem] font-normal leading-[0.92] tracking-[-0.05em] sm:text-7xl md:text-8xl">Wellness services in London.</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">
            “Services” is used here as the inclusive term for bookable wellness offerings. Where something is specifically a test, diagnostic assessment or wider experience, we label it clearly rather than calling everything a treatment.
          </p>
        </div>
      </section>

      <div className="pb-16 sm:pb-24">
        {groups.map((group, groupIndex) => {
          const services = serviceTaxonomy.filter((service) => service.parentCategory && group.categories.includes(service.parentCategory));
          return (
            <section key={group.title} className={`${groupIndex % 2 === 0 ? "surface-band-stone" : "bg-[#fbf8f1]"} px-5 py-12 sm:px-6 sm:py-16`}>
              <div className="mx-auto max-w-6xl">
                <div className="mb-8 grid gap-3 md:grid-cols-[0.7fr_1.3fr] md:items-end">
                  <h2 className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">{group.title}</h2>
                  <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:justify-self-end sm:text-base">{group.description}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => {
                    const count = countBySlug.get(service.slug) || 0;
                    return (
                      <Link key={service.slug} href={service.href} className="surface-paper group flex min-h-60 flex-col justify-between rounded-[1rem] p-6 transition hover:-translate-y-0.5 hover:bg-[#f5f0e7]">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-[#8d7d67]">
                            <span>{serviceKind(service.parentCategory)}</span>
                            <span>{count > 0 ? `${count} ${count === 1 ? "venue" : "venues"}` : "Guide"}</span>
                          </div>
                          <h3 className="mt-5 font-serif text-3xl font-normal leading-none tracking-[-0.035em]">{service.name}</h3>
                          <p className="mt-4 text-sm leading-7 text-[#5f574c]">{service.description}</p>
                        </div>
                        <span className="mt-6 text-sm underline underline-offset-4">View guide and venues →</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
        <section className="surface-band-sage px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="more-services-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 grid gap-3 md:grid-cols-[0.7fr_1.3fr] md:items-end">
              <h2 id="more-services-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Movement and measurement.</h2>
              <p className="max-w-2xl text-sm leading-7 text-[#5f574c] md:justify-self-end sm:text-base">Useful routes that cross Performance, Mobility and Longevity rather than fitting neatly inside one wellness category.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {additionalServices.map((service) => (
                <Link key={service.href} href={service.href} className="surface-paper group flex min-h-56 flex-col justify-between rounded-[1rem] p-6 transition hover:-translate-y-0.5 hover:bg-[#f5f0e7]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#8d7d67]">{service.kind}</p>
                    <h3 className="mt-5 font-serif text-3xl font-normal leading-none tracking-[-0.035em]">{service.label}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#5f574c]">{service.description}</p>
                  </div>
                  <span className="mt-6 text-sm underline underline-offset-4">View guide and venues →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
