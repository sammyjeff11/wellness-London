import type { Metadata } from "next";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import HomeVenueSearch from "@/components/HomeVenueSearch";
import { getFacilities } from "@/lib/airtable";
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

const serviceLinks = serviceTaxonomy
  .filter((service) => service.href)
  .slice(0, 6)
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
    href: "/best-sauna-cold-plunge-london",
    title: "Bathhouse",
    text: "Places built around a fuller bathing or thermal circuit rather than a single treatment room.",
  },
  {
    href: "/longevity-london",
    title: "Longevity Clinic",
    text: "Clinic-led settings for preventative, optimisation and healthspan-focused services.",
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
    href: "/luxury-wellness-spaces-london",
    title: "Luxury reset",
    text: "Elevated spaces where setting, privacy and service matter.",
  },
  {
    href: "/beginner-friendly-wellness-london",
    title: "Beginner friendly",
    text: "Clear places to try a treatment without guesswork.",
  },
];

const sectionHeadingClass = "font-serif text-[2.15rem] font-normal leading-[1.02] tracking-[-0.045em] sm:text-4xl md:text-5xl";
const sectionLeadClass = "max-w-xl text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7";
const editorialCardTitleClass = "mb-2 text-[1.35rem] font-medium leading-tight tracking-[-0.025em] sm:text-2xl";
const editorialCardTextClass = "text-sm leading-6 text-[#5f574c] sm:leading-7";
const mobileCarouselClass = "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0";
const lightCarouselCardClass = "group min-w-[74%] snap-start rounded-[1.1rem] border border-[#d8cebf]/70 bg-[#f4efe6] p-5 transition hover:-translate-y-[1px] hover:bg-[#eee7da] sm:min-w-0 sm:p-6";

function selectionScore(facility: ReturnType<typeof toDirectoryFacility>) {
  return Number(facility.isFeatured) * 100 + (facility.profileCompletenessScore || 0);
}

function hasFacilityPhoto(facility: ReturnType<typeof toDirectoryFacility>) {
  return Boolean(facility.imageUrl || facility.galleryImages?.some((image) => image.url));
}

export default async function Home() {
  const facilities = await getFacilities();
  const directoryFacilities = facilities.map(toDirectoryFacility);
  const selectedFacilities = [...directoryFacilities]
    .filter(hasFacilityPhoto)
    .sort((a, b) => selectionScore(b) - selectionScore(a))
    .slice(0, Math.min(3, directoryFacilities.length));
  const heroImage = facilities.find((facility) => facility.images.length > 0)?.images[0];
  const featuredNeighbourhoods = neighbourhoodPages;

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 pt-4 sm:px-6 sm:pt-6 md:pt-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.35rem] bg-[#211d17] shadow-[0_18px_55px_rgba(41,36,29,0.1)] md:rounded-[1.75rem]">
          <div className="relative h-[24vh] min-h-[150px] overflow-hidden sm:absolute sm:inset-0 sm:h-auto">
            {heroImage ? (
              <SafeImage
                src={heroImage.url}
                alt={heroImage.filename || "Curated London wellness and recovery space"}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center sm:object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[#211d17] via-[#211d17]/26 to-transparent sm:bg-gradient-to-r sm:from-black/82 sm:via-black/42 sm:to-black/12" />
          </div>

          <div className="relative flex min-h-[26rem] flex-col justify-end px-4 pb-5 pt-3 text-[#fbf8f1] sm:min-h-[34rem] sm:px-8 sm:py-10 md:min-h-[36rem] md:px-12 md:py-12">
            <div className="max-w-4xl">
              <p className="mb-1.5 text-[9px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/68 sm:mb-6 sm:text-[11px] sm:tracking-[0.28em]">
                Well+ / The London wellness edit
              </p>
              <h1 className="max-w-4xl font-serif text-[2.05rem] font-normal leading-[0.94] tracking-[-0.055em] sm:text-[4.45rem] sm:leading-[0.92] md:text-[6.15rem]">
                London&apos;s curated guide to modern wellness.
              </h1>
              <p className="mt-3 max-w-[31rem] text-[13px] leading-5 text-[#fbf8f1]/82 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8">
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
                  Featured spaces worth starting with.
                </h2>
              </div>
              <Link href="/explore" className="w-fit text-sm font-medium underline underline-offset-4">
                Explore all venues
              </Link>
            </div>
            <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 md:grid-cols-3">
              {selectedFacilities.map((facility) => (
                <div key={facility.slug} className="min-w-[88%] snap-start sm:min-w-0">
                  <FacilityCard facility={facility} source="homepage_featured" compact />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#f4efe6] px-5 py-8 sm:px-6 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl border-b border-[#d8cebf]/70 pb-8 sm:pb-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Services</p>
              <h2 className={sectionHeadingClass}>
                Browse by service.
              </h2>
            </div>
            <p className={sectionLeadClass}>
              Fast routes into service guides for heat, cold, contrast and technology-led treatments.
            </p>
          </div>

          <div className={`${mobileCarouselClass} sm:grid-cols-2 sm:gap-4 xl:grid-cols-6`}>
            {serviceLinks.map((treatment) => (
              <Link
                key={treatment.href}
                href={treatment.href}
                className="group min-w-[74%] snap-start rounded-[1.1rem] border border-[#d8cebf]/80 bg-[#fbf8f1] p-5 transition hover:-translate-y-[1px] hover:bg-[#eee7da] sm:min-w-0"
              >
                <h3 className={`${editorialCardTitleClass} mb-3 group-hover:underline group-hover:underline-offset-4`}>{treatment.label}</h3>
                <p className="line-clamp-2 text-sm leading-6 text-[#5f574c] sm:line-clamp-none">{treatment.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-8 sm:px-6 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl border-b border-[#d8cebf]/70 pb-8 sm:pb-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Curated collections</p>
              <h2 className={sectionHeadingClass}>
                Start with the best options.
              </h2>
            </div>
            <p className={sectionLeadClass}>
              Curated edits for high-intent searches like best saunas, cold plunges and recovery clubs in London.
            </p>
          </div>

          <div className={`${mobileCarouselClass} sm:grid-cols-2 sm:gap-4 lg:grid-cols-3`}>
            {collectionLinks.map((collection) => (
              <Link key={collection.href} href={collection.href} className={lightCarouselCardClass}>
                <h3 className={editorialCardTitleClass}>{collection.title}</h3>
                <p className={editorialCardTextClass}>{collection.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl border-b border-[#d8cebf]/70 pb-8 sm:pb-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Venue types</p>
              <h2 className={sectionHeadingClass}>Choose by setting.</h2>
            </div>
            <p className={sectionLeadClass}>Browse broader venue formats when the setting matters as much as the treatment.</p>
          </div>
          <div className={`${mobileCarouselClass} sm:grid-cols-3 sm:gap-4`}>
            {venueTypeLinks.map((item) => (
              <Link key={item.href} href={item.href} className={lightCarouselCardClass}>
                <h3 className={editorialCardTitleClass}>{item.title}</h3>
                <p className={editorialCardTextClass}>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-8 sm:px-6 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl border-b border-[#d8cebf]/70 pb-8 sm:pb-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">London areas</p>
              <h2 className={sectionHeadingClass}>Browse by part of London.</h2>
            </div>
            <p className={sectionLeadClass}>Start with the wider area when location is the deciding factor.</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {locationLinks.map((area) => (
              <Link key={area.href} href={area.href} className="rounded-full border border-[#d8cebf] bg-[#f4efe6] px-4 py-2 text-sm transition hover:bg-[#eee7da] sm:px-5 sm:py-3">
                {area.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredNeighbourhoods.length > 0 ? (
        <section className="px-5 py-8 sm:px-6 sm:py-12 md:py-14">
          <div className="mx-auto max-w-6xl border-b border-[#d8cebf]/70 pb-8 sm:pb-10">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-eyebrow mb-3">Neighbourhoods</p>
                <h2 className={sectionHeadingClass}>More precise local guides.</h2>
              </div>
              <p className={sectionLeadClass}>Use neighbourhood guides when you already know roughly where you want to book.</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {featuredNeighbourhoods.map((area) => (
                <Link key={area.href} href={area.href} className="rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-4 py-2 text-sm transition hover:bg-[#eee7da] sm:px-5 sm:py-3">
                  {area.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#fbf8f1] px-5 py-8 sm:px-6 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Use cases</p>
              <h2 className={sectionHeadingClass}>Choose by need.</h2>
            </div>
            <p className={sectionLeadClass}>A practical route into spaces for recovery, quiet resets, premium experiences and first-time bookings.</p>
          </div>
          <div className={`${mobileCarouselClass} sm:grid-cols-2 sm:gap-4 lg:grid-cols-4`}>
            {useCaseLinks.map((item) => (
              <Link key={item.href} href={item.href} className={lightCarouselCardClass}>
                <h3 className={editorialCardTitleClass}>{item.title}</h3>
                <p className={editorialCardTextClass}>{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
