import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";
import { dedupeFacilities } from "@/lib/dedupe-facilities";

type RelatedLink = {
  href: string;
  label: string;
};

type LocationPageEnhancementsProps = {
  areaName: string;
  facilities: ServiceDirectoryFacility[];
  intro: string;
  relatedAreaLinks?: RelatedLink[];
};

type ServiceColumn = {
  key: string;
  label: string;
  href: string;
  terms: string[];
};

const serviceColumns: ServiceColumn[] = [
  { key: "sauna", label: "Sauna", href: "/sauna-london", terms: ["sauna", "infrared sauna", "traditional sauna"] },
  { key: "cold-plunge", label: "Cold plunge", href: "/cold-plunge-london", terms: ["cold plunge", "ice bath", "cold exposure"] },
  { key: "contrast-therapy", label: "Contrast therapy", href: "/contrast-therapy-london", terms: ["contrast therapy", "hot and cold", "sauna and cold plunge"] },
  { key: "cryotherapy", label: "Cryotherapy", href: "/cryotherapy-london", terms: ["cryotherapy", "cryo"] },
  { key: "red-light", label: "Red light therapy", href: "/red-light-therapy-london", terms: ["red light", "led therapy", "photobiomodulation"] },
  { key: "hbot", label: "HBOT", href: "/hbot-london", terms: ["hbot", "hyperbaric", "oxygen therapy"] },
];

function normalise(value?: string | null) {
  return (value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getFacilityText(facility: ServiceDirectoryFacility) {
  return [
    ...(facility.services || []),
    ...(facility.serviceKeys || []),
    ...(facility.bestFor || []),
    ...(facility.experienceType || []),
    facility.description,
  ]
    .filter(Boolean)
    .join(" ");
}

function hasService(facility: ServiceDirectoryFacility, service: ServiceColumn): boolean {
  const serviceKeys = facility.serviceKeys || [];
  const text = normalise(getFacilityText(facility));

  if (service.key === "cold-plunge") {
    return service.terms.some((term) => text.includes(normalise(term)));
  }

  if (service.key === "contrast-therapy") {
    return (
      service.terms.some((term) => text.includes(normalise(term))) ||
      (serviceKeys.includes("sauna") && serviceKeys.includes("cold-plunge")) ||
      (hasService(facility, serviceColumns[0]) && hasService(facility, serviceColumns[1]))
    );
  }

  if (serviceKeys.includes(service.key)) return true;
  return service.terms.some((term) => text.includes(normalise(term)));
}

function getAreaLabel(facility: ServiceDirectoryFacility) {
  const label = [facility.neighbourhood || facility.location, facility.areaOfLondon || facility.areaGroup]
    .filter(Boolean)
    .filter((value, index, list) => list.indexOf(value) === index)
    .join(", ");

  return label || "London";
}

function getServiceVenueNames(facilities: ServiceDirectoryFacility[], service: ServiceColumn) {
  return facilities.filter((facility) => hasService(facility, service)).map((facility) => facility.name);
}

function formatNames(names: string[], empty = "No listed venue") {
  if (names.length === 0) return empty;
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function getAvailableServices(facilities: ServiceDirectoryFacility[]) {
  return serviceColumns.filter((service) => facilities.some((facility) => hasService(facility, service)));
}

function getBestForItems(areaName: string, facilities: ServiceDirectoryFacility[]) {
  const used = new Set<string>();
  const items: { title: string; text: string; facility: ServiceDirectoryFacility }[] = [];

  function add(title: string, predicate: (facility: ServiceDirectoryFacility) => boolean, reason: string) {
    const facility = facilities.find((candidate) => !used.has(candidate.slug) && predicate(candidate));
    if (!facility) return;
    used.add(facility.slug);
    items.push({ title, facility, text: reason });
  }

  add(
    "Best for contrast therapy",
    (facility) => hasService(facility, serviceColumns[2]),
    `offers a heat-and-cold recovery setup matched to the ${areaName} listings.`
  );
  add(
    "Best for sauna and cold plunge",
    (facility) => hasService(facility, serviceColumns[0]) && hasService(facility, serviceColumns[1]),
    "is a useful starting point when you want both heat and cold in one venue."
  );
  add(
    "Best for post-work recovery",
    (facility) => normalise(getFacilityText(facility)).includes("recovery"),
    "has recovery-led services that suit a practical weekday reset."
  );
  add(
    "Best for premium wellness setting",
    (facility) => normalise(`${facility.premiumLevel || ""} ${facility.priceRange || ""}`).includes("premium") || normalise(`${facility.premiumLevel || ""} ${facility.priceRange || ""}`).includes("luxury"),
    "has a premium signal in the listing data."
  );
  add(
    "Best for first-time visitors",
    (facility) => normalise(facility.beginnerFriendly).includes("yes") || normalise(facility.bestFor?.join(" ")).includes("beginner"),
    "is marked with a beginner-friendly signal in the listing data."
  );

  return items.slice(0, 5);
}

function buildFaqs(areaName: string, facilities: ServiceDirectoryFacility[]) {
  const availableServices = getAvailableServices(facilities);
  const faqs: { question: string; answer: string }[] = [];
  const serviceNames = availableServices.map((service) => service.label.toLowerCase());

  if (availableServices.length > 0) {
    faqs.push({
      question: `What recovery services are available in ${areaName}?`,
      answer: `Listed ${areaName} venues currently show ${formatNames(serviceNames, "verified recovery services")} in the project data.`,
    });
  }

  availableServices.slice(0, 3).forEach((service) => {
    const names = getServiceVenueNames(facilities, service);
    faqs.push({
      question: `Where can I find ${service.label.toLowerCase()} in ${areaName}?`,
      answer: `${formatNames(names)} ${names.length === 1 ? "is" : "are"} listed with ${service.label.toLowerCase()} availability in ${areaName}.`,
    });
  });

  const saunaAndCold = facilities.filter((facility) => hasService(facility, serviceColumns[0]) && hasService(facility, serviceColumns[1]));
  if (saunaAndCold.length > 0) {
    faqs.push({
      question: `Which ${areaName} venues offer both sauna and cold plunge?`,
      answer: `${formatNames(saunaAndCold.map((facility) => facility.name))} ${saunaAndCold.length === 1 ? "is" : "are"} listed with both sauna and cold plunge signals.`,
    });
  }

  return faqs.slice(0, 5);
}

export default function LocationPageEnhancements({ areaName, facilities, intro, relatedAreaLinks = [] }: LocationPageEnhancementsProps) {
  const comparisonFacilities = dedupeFacilities(facilities);

  if (comparisonFacilities.length < 2) return null;

  const availableServices = getAvailableServices(comparisonFacilities);
  const bestForItems = comparisonFacilities.length >= 3 ? getBestForItems(areaName, comparisonFacilities) : [];
  const faqs = buildFaqs(areaName, comparisonFacilities);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {faqs.length > 0 ? <JsonLd data={faqSchema} /> : null}

      <section className="border-y border-[#d8cebf]/70 bg-[#fbf8f1] px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="editorial-eyebrow mb-3">Compare the local edit</p>
            <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
              Recovery venues in {areaName}.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">
              {intro}
            </p>
          </div>

          {availableServices.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {availableServices.map((service) => (
                <Link key={service.href} href={service.href} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
                  {service.label} in London
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {comparisonFacilities.length >= 2 ? (
        <section className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 border-b border-[#d8cebf]/70 pb-5">
              <p className="editorial-eyebrow mb-2">Venue comparison</p>
              <h2 className="text-2xl font-medium tracking-normal sm:text-3xl">Compare services before booking.</h2>
            </div>

            <div className="md:hidden">
              <div className="space-y-4">
                {comparisonFacilities.map((facility) => (
                  <article key={facility.slug} className="border border-[#d8cebf]/75 bg-[#fbf8f1] p-5">
                    <Link href={`/facility/${facility.slug}`} className="text-lg font-medium underline-offset-4 hover:underline">
                      {facility.name}
                    </Link>
                    <p className="mt-1 text-sm text-[#6f6048]">{getAreaLabel(facility)}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-3">
                      {serviceColumns.map((service) => (
                        <div key={`${facility.slug}-${service.key}`}>
                          <dt className="text-[10px] uppercase tracking-[0.18em] text-[#8d7d67]">{service.label}</dt>
                          <dd className="mt-1 text-sm text-[#29241d]">{hasService(facility, service) ? "Yes" : "No"}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ))}
              </div>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full border-collapse bg-[#fbf8f1] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#d8cebf] text-[10px] uppercase tracking-[0.18em] text-[#8d7d67]">
                    <th scope="col" className="px-4 py-4 font-medium">Venue</th>
                    <th scope="col" className="px-4 py-4 font-medium">Area / neighbourhood</th>
                    {serviceColumns.map((service) => (
                      <th key={service.key} scope="col" className="px-4 py-4 font-medium">{service.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFacilities.map((facility) => (
                    <tr key={facility.slug} className="border-b border-[#d8cebf]/70 last:border-b-0">
                      <th scope="row" className="px-4 py-4 font-medium text-[#29241d]">
                        <Link href={`/facility/${facility.slug}`} className="underline-offset-4 hover:underline">
                          {facility.name}
                        </Link>
                      </th>
                      <td className="px-4 py-4 text-[#5f574c]">{getAreaLabel(facility)}</td>
                      {serviceColumns.map((service) => (
                        <td key={`${facility.slug}-${service.key}`} className="px-4 py-4 text-[#29241d]">
                          {hasService(facility, service) ? "Yes" : "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {bestForItems.length > 0 ? (
        <section className="bg-[#eee7da] px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 max-w-3xl">
              <p className="editorial-eyebrow mb-2">Best for</p>
              <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                Useful starting points in {areaName}.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {bestForItems.map((item) => (
                <article key={item.title} className="border border-[#d8cebf] bg-[#fbf8f1] p-6 sm:p-7">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">{item.title}</p>
                  <h3 className="mb-3 text-xl font-medium tracking-normal">
                    <Link href={`/facility/${item.facility.slug}`} className="underline-offset-4 hover:underline">
                      {item.facility.name}
                    </Link>
                  </h3>
                  <p className="text-sm leading-7 text-[#5f574c]">{item.facility.name} {item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr]">
          {faqs.length > 0 ? (
            <div>
              <p className="editorial-eyebrow mb-3">Local questions</p>
              <h2 className="mb-7 text-2xl font-medium tracking-normal sm:text-3xl">{areaName} FAQs</h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <article key={faq.question} className="border-t border-[#d8cebf]/70 pt-5">
                    <h3 className="mb-2 text-lg text-[#29241d]">{faq.question}</h3>
                    <p className="text-sm leading-7 text-[#5f574c]">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          {relatedAreaLinks.length > 0 ? (
            <div className="border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Nearby and related areas</p>
              <div className="flex flex-wrap gap-3">
                {relatedAreaLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
