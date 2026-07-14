import type { Metadata } from "next";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import HomeVenueSearch from "@/components/HomeVenueSearch";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { neighbourhoodPages } from "@/lib/neighbourhood-pages";
import { collections } from "@/lib/collections";
import { serviceTaxonomy } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Well+ London | The London Wellness Edit",
  description:
    "Find London wellness venues by service, venue type, location or use case — from saunas and cold plunges to clinics, spas and recovery studios.",
  alternates: { canonical: "/" },
};

const homepageServiceNames = ["Sauna", "Cold Plunge", "Cryotherapy", "Red Light Therapy", "Hyperbaric Oxygen Therapy", "Longevity Testing"];
const serviceLinks = homepageServiceNames
  .map((name) => serviceTaxonomy.find((service) => service.name === name && service.href))
  .filter((service): service is NonNullable<typeof service> => Boolean(service))
  .map((service) => ({
    href: service.href,
    label: service.name,
    description: service.description,
  }));

const collectionLinks = collections.map((collection) => ({
  href: collection.href,
  title: collection.title,
  text: collection.heroText,
}));

const venueTypeLinks = [
  {
    href: "/collections/best-contrast-therapy-london",
    title: "Bathhouse",
    text: "Places built around a fuller bathing or thermal circuit rather than a single treatment room.",
  },
  {
    href: "/longevity",
    title: "Longevity Clinic",
    text: "Clinic-led settings for diagnostics, prevention, optimisation and healthspan-focused services.",
  },
  {
    href: "/luxury-wellness-spaces-london",
    title: "Spa",
    text: "Service-led settings where comfort, privacy and hospitality are part of the booking decision.",
  },
];

const locationLinks = [
  { href: "/central-london-wellness", label: "Central London" },
  { href: "/east-london-wellness", label: "East London" },
  { href: "/west-london-wellness", label: "West London" },
  { href: "/north-london-wellness", label: "North London" },
  { href: "/south-london-wellness", label: "South London" },
];

const useCaseLinks = [
  {
    href: "/quiet-wellness-spaces-london",
    title: "Quiet recovery",
    text: "Calm venues for switching off and rebuilding capacity.",
  },
  {
    href: "/recover",
    title: "Post-gym recovery",
    text: "Practical venues for heat, cold, compression and bodywork after training.",
  },
  {
    href: "/longevity",
    title: "Longevity clinics",
    text: "Clinic-led diagnostics, healthspan testing, IV/NAD+, HBOT and optimisation services.",
  },
  {
    href: "/beginner-friendly-wellness-london",
    title: "Beginner friendly",
    text: "Clear places to try a treatment without guesswork.",
  },
];

const sectionHeadingClass = "font-serif text-[2.15rem] font-normal leading-[1.02] tracking-[-0.045em] sm:text-4xl md:text-5xl";
const sectionLeadClass = "max-w-xl text-[15px] leading-7 text-[#5f574c] sm:text-base";
const editorialCardTitleClass = "mb-2 text-[1.35rem] font-medium leading-tight tracking-[-0.025em] sm:text-2xl";
const editorialCardTextClass = "text-[15px] leading-7 text-[#5f574c]";
const lightCardClass = "editorial-card group bg-[#f4efe6] p-5 transition hover:-translate-y-[1px] hover:bg-[#eee7da] sm:p-6";

function selectionScore(facility: ReturnType<typeof toDirectoryFacility>) {
  return Number(facility.isFeatured) * 100 + (facility.profileCompletenessScore || 0);
}

function hasFacilityPhoto(facility: ReturnType<typeof toDirectoryFacility>) {
  return Boolean(facility.imageUrl || facility.galleryImages?.some((image) => image.url));
}

export default async function Home() {
  const facilities = await getFacilities();
  const directoryFacilities = dedupeFacilities(facilities.map(toDirectoryFacility));
  const selectedFacilities = [...directoryFacilities]
    .filter(hasFacilityPhoto)
    .sort((a, b) => selectionScore(b) - selectionScore(a))
    .slice(0, Math.min(3, directoryFacilities.length));
  const heroFacility = facilities.find((facility) => facility.images.length > 0);
  const heroImage = heroFacility?.images[0];
  const featuredNeighbourhoods = neighbourhoodPages;

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 pt-4 sm:px-6 sm:pt-6 md:pt-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.35rem] bg-[#211d17] shadow-[0_18px_55px_rgba(41,36,29,0.1)] md:rounded-[1.75rem]">
          <div className="relative h-[24vh] min-h-[150px] overflow-hidden sm:absolute sm:inset-0 sm:h-auto">
            {heroImage ? (
              <SafeImage
                src={heroImage.url}
                alt={heroFacility ? `${heroFacility.name} wellness venue in ${heroFacility.neighbourhood || "London"}` : "London wellness and recovery venue"}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center sm:object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[#211d17] via-[#211d17]/26 to-transparent sm:bg-gradient-to-r sm:from-black/82 sm:via-black/42 sm:to-black/12" />
          </div>

          <div className="relative flex min-h-[22rem] flex-col justify-end px-5 pb-6 pt-4 text-[#fbf8f1] sm:min-h-[32rem] sm:px-8 sm:py-10 md:min-h-[34rem] md:px-12 md:py-12">
            <div className="max-w-4xl">
              <p className="mb-2 text-xs uppercase leading-5 tracking-[0.22em] text-[#fbf8f1]/72 sm:mb-6 sm:tracking-[0.28em]">
                Well+ / The London wellness edit
              </p>
              <h1 className="max-w-4xl font-serif text-[2.05rem] font-normal leading-[0.94] tracking-[-0.055em] sm:text-[4.45rem] sm:leading-[0.92] md:text-[6.15rem]">
                Find the right wellness venue in London.
              </h1>
              <p className="mt-3 max-w-[31rem] text-[15px] leading-6 text-[#fbf8f1]/84 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8">
                Search by service, venue type, location or use case — with practical details to help you choose where to book.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <Link href="/explore" className="col-span-2 rounded-full bg-[#fbf8f1] px-5 py-2.5 text-center text-sm text-[#29241d] transition hover:bg-[#eee7da] sm:col-span-1 sm:py-3">
                  Browse venues
                </Link>
                <Link href="/sauna-london" className="rounded-full border border-[#fbf8f1]/45 px-4 py-2.5 text-center text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d] sm:px-5 sm:py-3">
                  Sauna
                </Link>
                <Link href="#featured" className="rounded-full border border-[#fbf8f1]/22 px-4 py-2 text-center text-sm text-[#fbf8f1]/82 transition hover:border-[#fbf8f1]/70 sm:px-5 sm:py-3">
                  Featured
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeVenueSearch facilities={directoryFacilities} />

      {selectedFacilities.length > 0 ? (
        <section id="featured" className="px-5 py-6 sm:px-6 sm:py-10 md:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-3 sm:mb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-eyebrow mb-3">Editor&apos;s selection</p>
                <h2 className="max-w-3xl font-serif text-[2.2rem] font-normal leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-6xl">
                  Three places to start.
                </h2>
              </div>
              <Link href="/explore" className="w-fit text-sm font-medium underline underline-offset-4">
                Explore all venues
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              {selectedFacilities.map((facility) => (
                <div key={facility.slug}>
                  <FacilityCard facility={facility} source="homepage_featured" compact />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="editorial-section bg-[#f4efe6] px-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Services &amp; settings</p>
              <h2 className={sectionHeadingClass}>
                Start with what matters most.
              </h2>
            </div>
            <p className={sectionLeadClass}>
              Choose a treatment when you know what you want, or a venue format when the setting will shape the visit.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {serviceLinks.map((treatment) => (
              <Link
                key={treatment.href}
                href={treatment.href}
                className="editorial-card group bg-[#fbf8f1] p-4 transition hover:-translate-y-[1px] hover:bg-[#eee7da] sm:p-5"
              >
                <h3 className={`${editorialCardTitleClass} mb-3 group-hover:underline group-hover:underline-offset-4`}>{treatment.label}</h3>
                <p className="text-[15px] leading-7 text-[#5f574c]">{treatment.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {venueTypeLinks.map((item) => (
              <Link key={item.href} href={item.href} className={lightCardClass}>
                <h3 className={editorialCardTitleClass}>{item.title}</h3>
                <p className={editorialCardTextClass}>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section bg-[#fbf8f1] px-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Curated routes</p>
              <h2 className={sectionHeadingClass}>Compare with a clearer brief.</h2>
            </div>
            <p className={sectionLeadClass}>Use a focused shortlist for direct comparisons, or start with the outcome you want from the visit.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collectionLinks.map((collection) => (
              <Link key={collection.href} href={collection.href} className={lightCardClass}>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#6f6048]">Shortlist</p>
                <h3 className={editorialCardTitleClass}>{collection.title}</h3>
                <p className={editorialCardTextClass}>{collection.text}</p>
              </Link>
            ))}
            {useCaseLinks.map((item) => (
              <Link key={item.href} href={item.href} className={lightCardClass}>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#6f6048]">By need</p>
                <h3 className={editorialCardTitleClass}>{item.title}</h3>
                <p className={editorialCardTextClass}>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section px-5 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Location</p>
              <h2 className={sectionHeadingClass}>Find somewhere that fits your day.</h2>
            </div>
            <p className={sectionLeadClass}>Start with a wider part of London, then narrow the search when a neighbourhood is more useful.</p>
          </div>
          <div className="editorial-card bg-[#fbf8f1] p-5 sm:p-7">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#6f6048]">London areas</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {locationLinks.map((area) => (
                <Link key={area.href} href={area.href} className="rounded-full border border-[#d8cebf] bg-[#f4efe6] px-4 py-2.5 text-sm transition hover:bg-[#eee7da] sm:px-5">
                  {area.label}
                </Link>
              ))}
            </div>
            {featuredNeighbourhoods.length > 0 ? (
              <div className="mt-6 border-t border-[#d8cebf]/70 pt-6">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#6f6048]">Neighbourhood guides</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
              {featuredNeighbourhoods.map((area) => (
                    <Link key={area.href} href={area.href} className="rounded-full border border-[#d8cebf] px-4 py-2.5 text-sm transition hover:bg-[#eee7da] sm:px-5">
                  {area.shortTitle}
                </Link>
              ))}
                </div>
            </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
