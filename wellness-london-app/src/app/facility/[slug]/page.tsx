import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FacilityGallery from "@/components/FacilityGallery";
import JsonLd from "@/components/JsonLd";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import VenueLocationSection from "@/components/VenueLocationSection";
import { activityPages } from "@/lib/activity-pages";
import { getFacilities, type AirtableFacility } from "@/lib/airtable";
import {
  getServicePillarMappings,
  getVenuePillarsFromServices,
  type ServicePillarMapping,
} from "@/lib/service-pillar-mapping";
import { absoluteUrl } from "@/lib/site";
import { canonicaliseServiceList, canonicalServiceHref } from "@/lib/taxonomy";
import { cleanList, cleanValue, isUsefulValue } from "@/lib/useful-values";

export const dynamicParams = true;
export const revalidate = 21600;

type FacilityPageProps = {
  params: Promise<{ slug: string }>;
};

type DetailItem = {
  label: string;
  value?: string;
};

export async function generateStaticParams() {
  const facilities = await getFacilities();
  return facilities.filter((facility) => isUsefulValue(facility.slug)).map((facility) => ({ slug: facility.slug }));
}

function cleanUrl(value?: string) {
  const cleaned = cleanValue(value);
  if (!cleaned || cleaned === "#") return undefined;
  return cleaned;
}

function getCleanLocation(facility: AirtableFacility) {
  return cleanValue(facility.neighbourhood) || cleanValue(facility.areaOfLondon) || cleanValue(facility.areaGroup) || "London";
}

function getEditorialCandidates(facility: AirtableFacility) {
  return [
    cleanValue(facility.editorialVerdict),
    cleanValue(facility.editorialSummary),
    cleanValue(facility.description),
  ].filter(Boolean) as string[];
}

function getMetaDescription(facility: AirtableFacility) {
  return getEditorialCandidates(facility)[0] || `Explore ${facility.name}, a curated London wellness venue listed on Well+.`;
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug);

  if (!facility) return { title: "Venue not found | Well+" };

  const description = getMetaDescription(facility);
  const image = facility.images.find((item) => cleanUrl(item.url));

  return {
    title: `${facility.name} | Well+ London`,
    description,
    alternates: { canonical: `/facility/${facility.slug}` },
    openGraph: {
      title: `${facility.name} | Well+ London`,
      description,
      url: absoluteUrl(`/facility/${facility.slug}`),
      type: "website",
      images: image ? [{ url: image.url, alt: image.filename || facility.name }] : undefined,
    },
  };
}

function venueJsonLd(facility: AirtableFacility) {
  const addressParts = [cleanValue(facility.address), cleanValue(facility.postcode)].filter(Boolean);
  const sameAs = [cleanUrl(facility.website), cleanUrl(facility.instagramLink)].filter(Boolean);
  const images = facility.images.map((image) => cleanUrl(image.url)).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: facility.name,
    url: absoluteUrl(`/facility/${facility.slug}`),
    image: images.length > 0 ? images : undefined,
    address: addressParts.length > 0
      ? {
          "@type": "PostalAddress",
          streetAddress: cleanValue(facility.address),
          postalCode: cleanValue(facility.postcode),
          addressLocality: cleanValue(facility.neighbourhood) || "London",
          addressRegion: cleanValue(facility.borough),
          addressCountry: "GB",
        }
      : undefined,
    areaServed: getCleanLocation(facility),
    description: getMetaDescription(facility),
    telephone: cleanValue(facility.phone),
    email: cleanValue(facility.email),
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="editorial-eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-3 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">{copy}</p> : null}
    </div>
  );
}

function QuickFact({ label, value }: DetailItem) {
  if (!isUsefulValue(value)) return null;

  return (
    <div className="border-t border-[#d8cebf]/75 py-4 sm:border-l sm:border-t-0 sm:px-5 sm:py-0">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">{label}</p>
      <p className="mt-2 text-sm leading-6 text-[#29241d]">{value}</p>
    </div>
  );
}

function DetailCard({ label, value }: DetailItem) {
  if (!isUsefulValue(value)) return null;

  return (
    <div className="rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">{label}</p>
      <p className="mt-3 text-base leading-7 text-[#29241d]">{value}</p>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-4 py-2 text-sm leading-none text-[#5f574c] sm:px-5 sm:py-3">
      {children}
    </span>
  );
}

const activityGuideByHref = new Map(activityPages.map((page) => [page.canonicalHref, page]));

function getRelatedGuides(services: string[]) {
  return services
    .flatMap((service) => {
      const href = canonicalServiceHref(service);
      const guide = href ? activityGuideByHref.get(href) : undefined;

      if (!href || !guide) return [];

      return [{
        href,
        service: guide.label,
        copy: guide.description,
      }];
    })
    .slice(0, 4);
}

function getSimilarVenues(
  current: AirtableFacility,
  facilities: AirtableFacility[],
  servicePillarMappings: ServicePillarMapping[],
) {
  const currentServices = new Set(canonicaliseServiceList(current.servicesOffered).map((service) => service.toLowerCase()));
  const currentServiceKeys = new Set(current.serviceKeys);
  const currentPillars = new Set(getVenuePillarsFromServices(current, servicePillarMappings));
  const currentArea = cleanValue(current.neighbourhood) || cleanValue(current.areaOfLondon) || cleanValue(current.areaGroup);
  const currentVenueType = cleanValue(current.venueTypeStandardized);

  return facilities
    .filter((candidate) => candidate.slug !== current.slug && isUsefulValue(candidate.slug))
    .map((candidate) => {
      const services = canonicaliseServiceList(candidate.servicesOffered);
      const serviceScore = services.filter((service) => currentServices.has(service.toLowerCase())).length * 10;
      const serviceKeyScore = candidate.serviceKeys.filter((key) => currentServiceKeys.has(key)).length * 8;
      const pillarScore = getVenuePillarsFromServices(candidate, servicePillarMappings)
        .filter((pillar) => currentPillars.has(pillar)).length * 9;
      const candidateAreas = [candidate.neighbourhood, candidate.areaOfLondon, candidate.areaGroup].map(cleanValue).filter(Boolean);
      const areaScore = currentArea && candidateAreas.includes(currentArea) ? 6 : 0;
      const venueTypeScore = currentVenueType && cleanValue(candidate.venueTypeStandardized) === currentVenueType ? 4 : 0;
      const completenessScore = Math.min(candidate.profileCompletenessScore || 0, 100) / 25;

      return {
        facility: candidate,
        score: serviceScore + serviceKeyScore + pillarScore + areaScore + venueTypeScore + completenessScore,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.facility);
}

function SimilarVenueCard({ facility }: { facility: AirtableFacility }) {
  const location = getCleanLocation(facility);
  const services = canonicaliseServiceList(facility.servicesOffered).slice(0, 2);
  const summary = getEditorialCandidates(facility)[0];

  return (
    <Link href={`/facility/${facility.slug}`} className="group flex min-h-52 flex-col justify-between rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-5 transition hover:border-[#6f6048] hover:bg-[#fffaf0]">
      <span>
        <span className="block text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">{location}</span>
        <span className="mt-3 block text-xl font-medium leading-7 text-[#29241d]">{facility.name}</span>
        {summary ? <span className="mt-3 line-clamp-3 block text-sm leading-6 text-[#5f574c]">{summary}</span> : null}
      </span>
      {services.length > 0 ? <span className="mt-6 block text-sm text-[#6f6048]">{services.join(" / ")}</span> : null}
    </Link>
  );
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { slug } = await params;
  const [facilities, servicePillarMappings] = await Promise.all([
    getFacilities(),
    getServicePillarMappings(),
  ]);
  const facility = facilities.find((item) => item.slug === slug);

  if (!facility) notFound();

  const location = getCleanLocation(facility);
  const editorialCandidates = getEditorialCandidates(facility);
  const heroSummary = editorialCandidates[0] || `A curated London wellness venue listed on Well+.`;
  const whyCopy = editorialCandidates.find((candidate) => candidate !== heroSummary);
  const services = canonicaliseServiceList(cleanList(facility.servicesOffered));
  const relatedGuides = getRelatedGuides(services);
  const similarVenues = getSimilarVenues(facility, facilities, servicePillarMappings);
  const website = cleanUrl(facility.website);
  const bookingLink = cleanUrl(facility.bookingLink);
  const instagramLink = cleanUrl(facility.instagramLink);
  const primaryCtaHref = bookingLink || website;
  const primaryCtaLabel = bookingLink ? "Book this venue" : "Visit website";
  const price = cleanValue(facility.priceFrom) || cleanValue(facility.overallPriceRange);
  const access = cleanValue(facility.accessType) || cleanValue(facility.privateOrShared);
  const address = cleanValue(facility.address);
  const postcode = cleanValue(facility.postcode);
  const bestFor = cleanList(facility.bestForStandardized.length > 0 ? facility.bestForStandardized : facility.bestFor).slice(0, 8);
  const quickFacts: DetailItem[] = [
    { label: "Google rating", value: cleanValue(facility.googleRating) },
    { label: "Price", value: price },
    { label: "Access", value: access },
    { label: "Beginner friendly", value: cleanValue(facility.beginnerFriendly) },
    { label: "Nearest station", value: cleanValue(facility.nearestStation) },
    { label: "Booking", value: cleanValue(facility.bookingRequired) },
    { label: "Opening hours", value: cleanValue(facility.openingHours) },
  ].filter((item) => isUsefulValue(item.value));
  const experienceItems: DetailItem[] = [
    { label: "Experience style", value: cleanList(facility.experienceType).join(", ") },
    { label: "Atmosphere", value: cleanValue(facility.ambience) },
    { label: "Setting", value: cleanValue(facility.privateOrShared) },
    { label: "Guided sessions", value: cleanValue(facility.guidedSessionsAvailable) },
    { label: "Contrast therapy", value: cleanValue(facility.contrastTherapyAvailable) },
  ].filter((item) => isUsefulValue(item.value));
  const practicalItems: DetailItem[] = [
    { label: "Towels", value: cleanValue(facility.towelsIncluded) },
    { label: "Showers", value: cleanValue(facility.showersAvailable) },
    { label: "Changing rooms", value: cleanValue(facility.changingRooms) },
    { label: "Relaxation area", value: cleanValue(facility.relaxationArea) },
    { label: "Opening hours", value: cleanValue(facility.openingHours) },
    { label: "Booking", value: cleanValue(facility.bookingRequired) },
    { label: "Price notes", value: cleanValue(facility.priceNotes) },
  ].filter((item) => isUsefulValue(item.value));

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={venueJsonLd(facility)} />

      <section className="px-5 py-6 sm:px-6 sm:py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-[#70695d] sm:mb-8">
            <Link href="/" className="underline-offset-4 hover:text-[#29241d] hover:underline">Home</Link>
            <span>/</span>
            <Link href="/explore" className="underline-offset-4 hover:text-[#29241d] hover:underline">Explore</Link>
          </nav>

          <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
            <div className="max-w-2xl lg:max-w-none">
              <p className="editorial-eyebrow mb-4">{cleanValue(facility.venueTypeStandardized) || "London wellness venue"}</p>
              <h1 className="font-serif text-[3.1rem] font-normal leading-[0.94] tracking-[-0.06em] sm:text-6xl md:text-7xl">
                {facility.name}
              </h1>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#6f6048]">{location}</p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">{heroSummary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {cleanValue(facility.googleRating) ? <Pill>{facility.googleRating}</Pill> : null}
                {price ? <Pill>{price}</Pill> : null}
                {access ? <Pill>{access}</Pill> : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {primaryCtaHref ? (
                  <TrackedExternalLink
                    href={primaryCtaHref}
                    eventName="listing_cta_click"
                    properties={{ facility_name: facility.name, facility_slug: facility.slug, source: "facility_detail", cta_type: bookingLink ? "booking" : "website" }}
                    className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#3d352b]"
                  >
                    {primaryCtaLabel}
                  </TrackedExternalLink>
                ) : null}
                {instagramLink ? (
                  <TrackedExternalLink
                    href={instagramLink}
                    eventName="listing_cta_click"
                    properties={{ facility_name: facility.name, facility_slug: facility.slug, source: "facility_detail", cta_type: "instagram" }}
                    className="rounded-full border border-[#d8cebf] px-5 py-3 text-sm transition hover:bg-[#fbf8f1]"
                  >
                    View on Instagram
                  </TrackedExternalLink>
                ) : null}
              </div>
            </div>

            <FacilityGallery images={facility.images} venueName={facility.name} />
          </div>
        </div>
      </section>

      {quickFacts.length > 0 ? (
        <section className="px-5 pb-10 sm:px-6 sm:pb-14">
          <div className="mx-auto max-w-6xl rounded-[1.1rem] border border-[#d8cebf]/75 bg-[#fbf8f1]/70 p-5 shadow-[0_18px_48px_rgba(41,36,29,0.04)] sm:p-6">
            <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
              {quickFacts.map((item) => <QuickFact key={item.label} {...item} />)}
            </div>
          </div>
        </section>
      ) : null}

      {whyCopy ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto grid max-w-6xl gap-8 border-t border-[#d8cebf]/70 pt-8 sm:pt-10 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionHeading eyebrow="Why visit" title={`Why visit ${facility.name}?`} />
            <p className="max-w-3xl text-xl leading-9 text-[#4f473d] sm:text-2xl sm:leading-10">{whyCopy}</p>
          </div>
        </section>
      ) : null}

      {bestFor.length > 0 ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading eyebrow="Best for" title="Best for" />
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {bestFor.map((item) => <Pill key={item}>{item}</Pill>)}
            </div>
          </div>
        </section>
      ) : null}

      {experienceItems.length > 0 ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading eyebrow="What to expect" title="The experience" copy="A concise read on the visit style, atmosphere and session format." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experienceItems.map((item) => <DetailCard key={item.label} {...item} />)}
            </div>
          </div>
        </section>
      ) : null}

      {practicalItems.length > 0 ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading eyebrow="Practical details" title="Before you go" copy="The details that matter when deciding whether the venue fits your visit." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {practicalItems.map((item) => <DetailCard key={item.label} {...item} />)}
            </div>
          </div>
        </section>
      ) : null}

      {services.length > 0 ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading eyebrow="Services" title={`Services listed for ${facility.name}`} copy="Treatments and recovery options available here." />
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {services.slice(0, 8).map((service) => {
                const href = canonicalServiceHref(service);
                return href ? (
                  <Link key={service} href={href} className="inline-flex items-center rounded-full border border-[#d8cebf] bg-[#fbf8f1] px-4 py-2 text-sm leading-none text-[#5f574c] transition hover:border-[#6f6048] hover:text-[#29241d] sm:px-5 sm:py-3">
                    {service}
                  </Link>
                ) : (
                  <Pill key={service}>{service}</Pill>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <VenueLocationSection
        name={facility.name}
        slug={facility.slug}
        address={address}
        postcode={postcode}
        neighbourhood={cleanValue(facility.neighbourhood)}
        borough={cleanValue(facility.borough)}
        areaOfLondon={cleanValue(facility.areaOfLondon)}
        nearestStation={cleanValue(facility.nearestStation)}
        directionsHref={address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${facility.name} ${address}`)}` : undefined}
      />

      {relatedGuides.length > 0 ? (
        <section className="px-5 py-12 sm:px-6 md:py-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading eyebrow="Related guides" title="Keep exploring" copy="Use these guides to compare similar services across London and understand what to look for before booking." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="group flex min-h-48 flex-col justify-between rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-5 transition hover:border-[#6f6048] hover:bg-[#fffaf0]">
                  <span>
                    <span className="block text-lg font-medium leading-6 text-[#29241d]">{guide.service} in London</span>
                    <span className="mt-3 block text-sm leading-6 text-[#5f574c]">{guide.copy}</span>
                  </span>
                  <span className="mt-6 text-sm font-medium text-[#29241d] underline-offset-4 group-hover:underline">Read guide</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {similarVenues.length > 0 ? (
        <section className="px-5 pb-14 sm:px-6 md:pb-20">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading eyebrow="Similar venues" title="Explore similar venues" copy="More Well+ profiles with related services, areas or venue styles." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similarVenues.map((venue) => <SimilarVenueCard key={venue.slug} facility={venue} />)}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
