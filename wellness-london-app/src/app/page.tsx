import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import FacilityCard from "@/components/FacilityCard";
import HomeVenueSearch from "@/components/HomeVenueSearch";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getFacilities } from "@/lib/airtable";
import { collections } from "@/lib/collections";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { getAvailableNeighbourhoods } from "@/lib/location-directory";
import { neighbourhoodPages } from "@/lib/neighbourhood-pages";
import { absoluteUrl } from "@/lib/site";
import { serviceTaxonomy } from "@/lib/taxonomy";
import { cleanValue } from "@/lib/useful-values";

export const metadata: Metadata = {
  title: "London Wellness Venues: Saunas, Cold Plunges & Clinics | Well+",
  description:
    "Find and compare London saunas, cold plunges, recovery studios, spas and longevity clinics by service, area, access and price.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "London Wellness Venues: Saunas, Cold Plunges & Clinics | Well+",
    description:
      "Compare London wellness venues by service, area, access and price, with independent guides to the choices that matter.",
    url: absoluteUrl("/"),
    type: "website",
  },
};

const homepageServiceNames = ["Sauna", "Cold Plunge", "Cryotherapy", "Red Light Therapy", "Hyperbaric Oxygen Therapy", "Longevity Testing"];
const serviceLinks = homepageServiceNames
  .map((name) => serviceTaxonomy.find((service) => service.name === name && service.href))
  .filter((service): service is NonNullable<typeof service> => Boolean(service))
  .map((service) => ({ href: service.href, label: service.name }));

const startRoutes = [
  {
    number: "01",
    href: "/services",
    title: "Browse by service",
    text: "Go straight to sauna, cold plunge, cryotherapy, red light, diagnostics and other guides.",
    action: "See services",
  },
  {
    number: "02",
    href: "/neighbourhoods",
    title: "Find somewhere nearby",
    text: "Use London area and neighbourhood guides when location is the deciding factor.",
    action: "Browse areas",
  },
  {
    number: "03",
    href: "/editorial",
    title: "Help me choose",
    text: "Compare formats, understand the trade-offs and find a shortlist for the kind of visit you want.",
    action: "Read the guides",
  },
];

const locationLinks = [
  { href: "/central-london-wellness", label: "Central London" },
  { href: "/east-london-wellness", label: "East London" },
  { href: "/west-london-wellness", label: "West London" },
  { href: "/north-london-wellness", label: "North London" },
  { href: "/south-london-wellness", label: "South London" },
];

const intentionLinks = [
  { href: "/recover", label: "Recover" },
  { href: "/perform", label: "Perform" },
  { href: "/reset", label: "Reset" },
  { href: "/optimise", label: "Optimise" },
  { href: "/longevity", label: "Longevity" },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: "Well+",
      url: absoluteUrl("/"),
      description: "An independent guide to London wellness venues, services and clinics.",
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: "Well+ London",
      url: absoluteUrl("/"),
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
      inLanguage: "en-GB",
    },
  ],
};

function selectionScore(facility: ReturnType<typeof toDirectoryFacility>) {
  return Number(facility.isFeatured) * 100 + (facility.profileCompletenessScore || 0);
}

function hasFacilityPhoto(facility: ReturnType<typeof toDirectoryFacility>) {
  return Boolean(facility.imageUrl || facility.galleryImages?.some((image) => image.url));
}

function checkedTime(value?: string) {
  const parsed = value ? new Date(value).getTime() : 0;
  return Number.isNaN(parsed) ? 0 : parsed;
}

function selectionReason(facility: ReturnType<typeof toDirectoryFacility>) {
  const setting = cleanValue(facility.venueType);
  const services = facility.services?.slice(0, 3);
  const location = cleanValue(facility.neighbourhood) || cleanValue(facility.location) || "London";
  const access = cleanValue(facility.accessType);
  const format = cleanValue(facility.privateOrShared);

  if (services?.length) {
    const serviceList = services.length === 1 ? services[0] : `${services.slice(0, -1).join(", ")} and ${services.at(-1)}`;
    const accessNote = [format, access].filter(Boolean).join(", ").toLowerCase();
    return `${serviceList} in ${location}${accessNote ? `, with ${accessNote} access` : ""}.`;
  }

  return `${setting || "Wellness venue"} in ${location}.`;
}

export default async function Home() {
  const facilities = await getFacilities();
  const directoryFacilities = dedupeFacilities(facilities.map(toDirectoryFacility));
  const availableNeighbourhoodPages = getAvailableNeighbourhoods(directoryFacilities, neighbourhoodPages)
    .map(({ page }) => page);
  const selectedFacilities = [...directoryFacilities]
    .filter(hasFacilityPhoto)
    .sort((a, b) => selectionScore(b) - selectionScore(a))
    .slice(0, Math.min(3, directoryFacilities.length));
  const selectedSlugs = new Set(selectedFacilities.map((facility) => facility.slug));
  const recentlyCheckedFacilities = [...directoryFacilities]
    .filter((facility) => hasFacilityPhoto(facility) && !selectedSlugs.has(facility.slug) && checkedTime(facility.lastCheckedDate) > 0)
    .sort((a, b) => checkedTime(b.lastCheckedDate) - checkedTime(a.lastCheckedDate) || selectionScore(b) - selectionScore(a))
    .slice(0, Math.min(3, Math.max(0, directoryFacilities.length - selectedFacilities.length)));
  const heroFacility = facilities.find((facility) => facility.images.length > 0);
  const heroImage = heroFacility?.images[0];

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={websiteJsonLd} />

      <section className="px-5 pt-4 sm:px-6 sm:pt-6 md:pt-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.35rem] bg-[#211d17] shadow-[0_18px_55px_rgba(41,36,29,0.1)] md:rounded-[1.75rem]">
          <div className="absolute inset-0">
            {heroImage ? (
              <SafeImage
                src={heroImage.url}
                alt={heroFacility ? `${heroFacility.name} wellness venue in ${heroFacility.neighbourhood || "London"}` : "London wellness and recovery venue"}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1200px) 100vw, 1152px"
                className="object-cover object-center"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/66 to-black/18" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
          </div>

          <div className="relative flex min-h-[42rem] items-end px-5 py-8 text-[#fbf8f1] sm:min-h-[39rem] sm:px-9 sm:py-10 md:px-12 md:py-12">
            <div className="max-w-4xl">
              <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#fbf8f1]/66 sm:text-[11px]">Well+ / The London wellness edit</p>
              <h1 className="max-w-4xl font-serif text-[3.15rem] font-normal leading-[0.9] tracking-[-0.055em] sm:text-[4.8rem] md:text-[6.25rem]">
                Find and compare London wellness venues.
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#fbf8f1]/82 sm:text-lg sm:leading-8">
                Saunas, cold plunges, recovery studios, spas and longevity clinics — compared by access, price, facilities and what the visit is actually like.
              </p>
              <HomeVenueSearch facilities={directoryFacilities} />
            </div>
          </div>
        </div>
      </section>

      <section className="surface-band-stone mt-10 px-5 py-10 sm:mt-14 sm:px-6 sm:py-14" aria-labelledby="start-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Start here</p>
              <h2 id="start-heading" className="font-serif text-[2.5rem] font-normal leading-none tracking-[-0.045em] sm:text-5xl">How would you like to search?</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] sm:text-base">Browse by service, look near you or use a guide to choose between different experiences.</p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {startRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="surface-paper-strong group flex min-h-[15rem] flex-col justify-between rounded-[1.2rem] p-6 transition hover:-translate-y-0.5 hover:bg-[#29241d] hover:text-[#fbf8f1] sm:p-7">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d67] transition group-hover:text-[#cbbda8]">{route.number}</p>
                  <h3 className="mt-5 text-[2rem] font-normal leading-[1] tracking-[-0.04em]">{route.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#5f574c] transition group-hover:text-[#fbf8f1]/72">{route.text}</p>
                </div>
                <span className="mt-6 text-sm underline underline-offset-4">{route.action} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {selectedFacilities.length > 0 ? (
        <section id="featured" className="bg-[#fbf8f1] px-5 py-10 sm:px-6 sm:py-16" aria-labelledby="featured-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-eyebrow mb-3">Editor&apos;s selection</p>
                <h2 id="featured-heading" className="max-w-3xl font-serif text-[2.6rem] font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl">Three venues worth knowing.</h2>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href="/how-we-curate" className="underline underline-offset-4">How we curate</Link>
                <Link href="/explore" className="font-medium underline underline-offset-4">All venues</Link>
              </div>
            </div>

            <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3">
              {selectedFacilities.map((facility) => (
                <div key={facility.slug}>
                  <div className="mb-3 min-h-[3.5rem] border-l border-[#8d7d67] pl-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Why we selected it</p>
                    <p className="mt-1 text-xs leading-5 text-[#5f574c]">{selectionReason(facility)}</p>
                  </div>
                  <FacilityCard facility={facility} source="homepage_featured" compact showSaveButton />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#29241d] px-5 py-10 text-[#fbf8f1] sm:px-6 sm:py-16" aria-labelledby="return-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#cbbda8]">Come back with purpose</p>
              <h2 id="return-heading" className="max-w-3xl font-serif text-[2.6rem] font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl">Save venues. Build a better shortlist.</h2>
            </div>
            <Link href="/shortlist" className="w-fit rounded-full border border-[#fbf8f1]/35 px-5 py-2.5 text-sm transition hover:bg-[#fbf8f1] hover:text-[#29241d]">View saved venues</Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <Link href="/editorial/best-saunas-london" className="group flex min-h-[23rem] flex-col justify-between overflow-hidden rounded-[1.25rem] border border-[#fbf8f1]/16 bg-[#fbf8f1]/[0.055] p-6 text-[#fbf8f1] transition hover:bg-[#fbf8f1]/[0.1] sm:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#cbbda8]">Latest Well+ guide</p>
                <h3 className="mt-5 max-w-xl font-serif text-5xl font-normal leading-[0.92] tracking-[-0.045em] sm:text-6xl">The best saunas in London.</h3>
                <p className="mt-5 max-w-lg text-sm leading-7 text-[#fbf8f1]/70 sm:text-base">A focused edit of traditional, infrared and recovery-led sauna experiences, with the differences that matter before booking.</p>
              </div>
              <span className="mt-7 text-sm underline underline-offset-4 transition group-hover:translate-x-1">Read the guide →</span>
            </Link>

            <NewsletterSignup
              source="homepage_return"
              title="Join The Well+ Edit"
              copy="New openings, venue updates and clear guides to choosing between London wellness experiences — sent occasionally."
              variant="dark"
            />
          </div>
        </div>
      </section>

      {recentlyCheckedFacilities.length > 0 ? (
        <section className="surface-band-sage px-5 py-10 sm:px-6 sm:py-16" aria-labelledby="recent-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-eyebrow mb-3">Recently checked</p>
                <h2 id="recent-heading" className="font-serif text-[2.5rem] font-normal leading-none tracking-[-0.045em] sm:text-5xl">Recently checked venues.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#5f574c]">Profiles we have recently reviewed or added. Confirm current prices, timetables and availability with the venue before travelling.</p>
            </div>
            <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3">
              {recentlyCheckedFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source="homepage_recent" compact showSaveButton />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-10 sm:px-6 sm:py-16" aria-labelledby="discover-heading">
        <div className="mx-auto max-w-6xl border-t border-[#d8cebf] pt-8 sm:pt-10">
          <div className="mb-8 max-w-3xl">
            <p className="editorial-eyebrow mb-3">Explore London wellness</p>
            <h2 id="discover-heading" className="font-serif text-[2.5rem] font-normal leading-none tracking-[-0.045em] sm:text-5xl">Browse by service, area or goal.</h2>
            <p className="mt-4 text-sm leading-7 text-[#5f574c] sm:text-base">Go directly to the kind of session you want, the part of London you are visiting or the outcome you are trying to support.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <nav aria-label="Popular services">
              <h3 className="border-b border-[#d8cebf] pb-3 text-[11px] font-sans uppercase tracking-[0.22em] text-[#8d7d67]">Services</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {serviceLinks.map((link) => <li key={link.href}><Link href={link.href} className="underline-offset-4 hover:underline">{link.label}</Link></li>)}
              </ul>
            </nav>

            <nav aria-label="London areas">
              <h3 className="border-b border-[#d8cebf] pb-3 text-[11px] font-sans uppercase tracking-[0.22em] text-[#8d7d67]">Areas</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
                {[...locationLinks, ...availableNeighbourhoodPages.map((page) => ({ href: page.href, label: page.shortTitle }))].map((link) => <li key={link.href}><Link href={link.href} className="underline-offset-4 hover:underline">{link.label}</Link></li>)}
              </ul>
            </nav>

            <nav aria-label="Wellness intentions and shortlists">
              <h3 className="border-b border-[#d8cebf] pb-3 text-[11px] font-sans uppercase tracking-[0.22em] text-[#8d7d67]">Intentions & shortlists</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {intentionLinks.map((link) => <li key={link.href}><Link href={link.href} className="underline-offset-4 hover:underline">{link.label}</Link></li>)}
                {collections.slice(0, 3).map((collection) => <li key={collection.href}><Link href={collection.href} className="underline-offset-4 hover:underline">{collection.title}</Link></li>)}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
