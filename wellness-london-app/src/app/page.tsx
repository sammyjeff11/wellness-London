import type { Metadata } from "next";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import FacilityCard from "@/components/FacilityCard";
import HomeVenueSearch from "@/components/HomeVenueSearch";
import JsonLd from "@/components/JsonLd";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { getAvailableNeighbourhoods } from "@/lib/location-directory";
import { neighbourhoodPages } from "@/lib/neighbourhood-pages";
import { absoluteUrl } from "@/lib/site";

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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: "Well+",
      url: absoluteUrl("/"),
      description:
        "An independent guide to London wellness venues, services and clinics.",
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

const featuredPicks = [
  "arc-canary-wharf",
  "bxr-lab",
  "cloud-twelve",
] as const;

export default async function Home() {
  const facilities = await getFacilities();
  const directoryFacilities = dedupeFacilities(
    facilities.map(toDirectoryFacility),
  );
  const availableNeighbourhoodPages = getAvailableNeighbourhoods(
    directoryFacilities,
    neighbourhoodPages,
  ).map(({ page }) => page);
  const selectedFacilities = featuredPicks.flatMap((slug) => {
    const facility = directoryFacilities.find((venue) => venue.slug === slug);
    return facility ? [facility] : [];
  });
  const heroFacility = facilities.find(
    (facility) => facility.images.length > 0,
  );
  const heroImage = heroFacility?.images[0];

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={websiteJsonLd} />

      <section className="px-4 pt-3 sm:px-6 sm:pt-6 md:pt-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.2rem] bg-[#211d17] shadow-[0_18px_55px_rgba(41,36,29,0.1)] sm:rounded-[1.35rem] md:rounded-[1.75rem]">
          <div className="absolute inset-0">
            {heroImage ? (
              <SafeImage
                src={heroImage.url}
                alt={
                  heroFacility
                    ? `${heroFacility.name} wellness venue in ${heroFacility.neighbourhood || "London"}`
                    : "London wellness and recovery venue"
                }
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

          <div className="relative flex min-h-[28rem] items-end px-5 py-6 text-[#fbf8f1] sm:min-h-[34rem] sm:px-9 sm:py-10 md:px-12 md:py-12">
            <div className="max-w-4xl">
              <p className="mb-3 text-[11px] uppercase tracking-[0.23em] text-[#fbf8f1]/66 sm:mb-4 sm:text-xs sm:tracking-[0.25em]">
                Well+ / The London wellness edit
              </p>
              <h1 className="max-w-4xl font-serif text-[2.65rem] font-normal leading-[0.94] tracking-[-0.05em] sm:text-[4.8rem] sm:leading-[0.9] sm:tracking-[-0.055em] md:text-[5.25rem]">
                Find and compare London wellness venues.
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-6 text-[#fbf8f1]/82 sm:mt-5 sm:text-lg sm:leading-8">
                Compare saunas, cold plunges, recovery studios and health-testing
                clinics across London. Check services, access and pricing, then
                book direct with the venue.
              </p>
              <HomeVenueSearch facilities={directoryFacilities} />
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="Choose an experience"
        className="editorial-shell grid gap-0 divide-y divide-[#d8cebf] py-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {[
          {
            href: "/recovery-london",
            title: "Recovery",
            text: "Saunas, cold plunges & recovery studios",
          },
          {
            href: "/longevity",
            title: "Health testing",
            text: "Clinics, assessments & diagnostics",
          },
          {
            href: "/assisted-stretching-london",
            title: "Mobility",
            text: "Practitioner-led stretching & movement",
          },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group px-5 py-5">
            <span className="flex justify-between text-lg font-semibold">
              {item.title}
              <span aria-hidden="true">↗</span>
            </span>
            <span className="mt-2 block text-sm leading-6 text-[#5f574c]">
              {item.text}
            </span>
          </Link>
        ))}
      </nav>

      {selectedFacilities.length > 0 ? (
        <section
          id="featured"
          className="bg-[#fbf8f1] px-5 py-10 sm:px-6 sm:py-16"
          aria-labelledby="featured-heading"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-eyebrow mb-3">
                  Explore different formats
                </p>
                <h2
                  id="featured-heading"
                  className="max-w-3xl font-serif text-[2.6rem] font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl"
                >
                  Find your kind of wellness.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link
                  href="/how-we-curate"
                  className="underline underline-offset-4"
                >
                  How we curate
                </Link>
                <Link
                  href="/explore"
                  className="font-medium underline underline-offset-4"
                >
                  All venues
                </Link>
              </div>
            </div>

            <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3">
              {selectedFacilities.map((facility) => (
                <FacilityCard
                  key={facility.slug}
                  facility={facility}
                  source="homepage_featured"
                  variant="feature"
                  compact
                  showSaveButton
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#29241d] px-5 py-12 text-[#fbf8f1] sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#cbbda8]">
              Make an informed choice
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl">
              Infrared or traditional sauna?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#fbf8f1]/85">
              Different heat, different settings. Understand the session formats
              and what to check before you book.
            </p>
          </div>
          <Link
            href="/editorial/infrared-sauna-vs-traditional-sauna"
            className="inline-flex min-h-12 w-fit items-center rounded-full bg-[#fbf8f1] px-6 text-sm font-medium text-[#29241d] md:justify-self-end"
          >
            Read the comparison →
          </Link>
        </div>
      </section>
      <section className="editorial-shell grid gap-6 py-12 md:grid-cols-2 md:gap-16 sm:py-16">
        <h2 className="text-4xl sm:text-5xl">
          Useful detail.
          <br />A clearer choice.
        </h2>
        <div>
          <p className="text-base leading-8 text-[#5f574c]">
            Well+ brings London wellness venues into one place. We research
            published services, access and pricing so you can compare the
            details that matter. Unknowns stay visible; researched profiles are
            distinguished from first-hand visits.
          </p>
          <Link
            href="/how-we-curate"
            className="mt-4 inline-flex min-h-11 items-center text-sm font-medium underline"
          >
            How we curate
          </Link>
          <p className="mt-3 text-sm leading-6 text-[#5f574c]">
            Save a few favourites as you browse, then compare them side by side.
            No account needed.
          </p>
        </div>
      </section>
      <nav
        aria-label="Explore neighbourhoods"
        className="editorial-shell border-t border-[#d8cebf] py-8"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-sm font-semibold">Your part of London</span>
          {availableNeighbourhoodPages.slice(0, 6).map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline"
            >
              {page.shortTitle}
            </Link>
          ))}
          <Link
            href="/neighbourhoods"
            className="inline-flex min-h-11 items-center text-sm underline"
          >
            All neighbourhoods →
          </Link>
        </div>
      </nav>
      <div className="editorial-shell">
        <NewsletterSignup source="homepage_return" />
      </div>
    </main>
  );
}
