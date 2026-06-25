import Link from "next/link";
import { getFacilities } from "@/lib/airtable";
import { collections } from "@/lib/collections";
import { serviceTaxonomy } from "@/lib/taxonomy";
import { cleanValue, isUsefulValue } from "@/lib/useful-values";

const coreSections = [
  {
    title: "Explore by intention",
    links: [
      { href: "/explore", label: "Explore London Wellness" },
      { href: "/recover", label: "Recover" },
      { href: "/perform", label: "Perform" },
      { href: "/reset", label: "Reset" },
      { href: "/optimise", label: "Optimise" },
      { href: "/longevity", label: "Longevity" },
    ],
  },
  {
    title: "Neighbourhood guides",
    links: [
      { href: "/neighbourhoods", label: "London Wellness Neighbourhoods" },
      { href: "/neighbourhoods/shoreditch", label: "Wellness in Shoreditch" },
      { href: "/neighbourhoods/canary-wharf", label: "Wellness in Canary Wharf" },
      { href: "/neighbourhoods/kensington", label: "Wellness in Kensington" },
      { href: "/neighbourhoods/marylebone", label: "Wellness in Marylebone" },
      { href: "/neighbourhoods/notting-hill", label: "Wellness in Notting Hill" },
      { href: "/neighbourhoods/soho", label: "Wellness in Soho" },
      { href: "/neighbourhoods/hampstead", label: "Wellness in Hampstead" },
    ],
  },
  {
    title: "Treatments and services",
    links: serviceTaxonomy
      .filter((service) => service.href)
      .map((service) => ({ href: service.href, label: `${service.name} in London` })),
  },
  {
    title: "Collections and best-of pages",
    links: [
      { href: "/collections", label: "All Collections" },
      ...collections.map((collection) => ({ href: collection.href, label: collection.title })),
      { href: "/best-sauna-cold-plunge-london", label: "Best Sauna and Cold Plunge Spaces in London" },
      { href: "/beginner-friendly-wellness-london", label: "Beginner-Friendly Wellness Spaces in London" },
      { href: "/quiet-wellness-spaces-london", label: "Quiet Wellness Spaces in London" },
      { href: "/luxury-wellness-spaces-london", label: "Luxury Wellness Spaces in London" },
    ],
  },
  {
    title: "Browse by area",
    links: [
      { href: "/central-london-wellness", label: "Central London Wellness" },
      { href: "/east-london-wellness", label: "East London Wellness" },
      { href: "/west-london-wellness", label: "West London Wellness" },
      { href: "/north-london-wellness", label: "North London Wellness" },
      { href: "/south-london-wellness", label: "South London Wellness" },
    ],
  },
  {
    title: "Editorial and trust",
    links: [
      { href: "/editorial", label: "Editorial" },
      { href: "/editorial/best-saunas-london", label: "Best Saunas in London" },
      { href: "/editorial/best-cryotherapy-london", label: "Best Cryotherapy in London" },
      { href: "/editorial/infrared-sauna-vs-traditional-sauna", label: "Infrared vs Traditional Sauna" },
      { href: "/guides/sauna-london-guide", label: "The Well Edit Guide to Sauna in London" },
      { href: "/how-we-curate", label: "How We Curate" },
      { href: "/editorial-standards", label: "Editorial Standards" },
    ],
  },
];

function facilityScore(facility: Awaited<ReturnType<typeof getFacilities>>[number]) {
  return Number(facility.isFeatured) * 100 + (facility.profileCompletenessScore || 0);
}

function venueLabel(facility: Awaited<ReturnType<typeof getFacilities>>[number]) {
  const location = cleanValue(facility.neighbourhood) || cleanValue(facility.areaOfLondon) || cleanValue(facility.areaGroup);
  return location ? `${facility.name} — ${location}` : facility.name;
}

export default async function SiteMapPage() {
  const popularVenueLinks = (await getFacilities())
    .filter((facility) => isUsefulValue(facility.slug))
    .sort((a, b) => facilityScore(b) - facilityScore(a))
    .slice(0, 18)
    .map((facility) => ({ href: `/facility/${facility.slug}`, label: venueLabel(facility) }));
  const pages = popularVenueLinks.length > 0
    ? [...coreSections, { title: "Popular venue pages", links: popularVenueLinks }]
    : coreSections;

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-16">
        <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-stone-500">
          Well Edit
        </p>
        <h1 className="mb-5 font-serif text-5xl font-normal tracking-tight sm:mb-6 sm:text-6xl">
          Site Map
        </h1>

        <p className="mb-12 max-w-3xl text-base leading-8 text-stone-600 sm:text-lg">
          Browse the core sections of The Well Edit, including wellness pillars, treatment-led guides, neighbourhood guides, venue pages and editorial standards.
        </p>

        <div className="space-y-12">
          {pages.map((section) => (
            <section key={section.title}>
              <h2 className="mb-5 font-serif text-3xl font-normal sm:text-4xl">{section.title}</h2>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border border-stone-200 bg-[#fffdf8] px-5 py-5 text-sm transition hover:border-stone-300 hover:bg-[#f4efe6]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
