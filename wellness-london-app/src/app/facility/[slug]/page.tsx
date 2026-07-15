import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnalyticsPageView from "@/components/AnalyticsPageView";
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
import { absoluteUrl, truncateMetaText } from "@/lib/site";
import { canonicaliseServiceList, canonicalServiceHref, groupFacilityServices } from "@/lib/taxonomy";
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
    cleanValue(facility.editorialSummary),
    cleanValue(facility.description),
  ].filter(Boolean) as string[];
}

function getMetaDescription(facility: AirtableFacility) {
  const description = getEditorialCandidates(facility)[0] || `View services, access and booking details for ${facility.name} in London.`;
  return truncateMetaText(description);
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug);

  if (!facility) return { title: "Venue not found | Well+" };

  const description = getMetaDescription(facility);
  const image = facility.images.find((item) => cleanUrl(item.url));

  const title = truncateMetaText(`${facility.name} | Well+`, 60);

  return {
    title,
    description,
    alternates: { canonical: `/facility/${facility.slug}` },
    openGraph: {
      title: `${facility.name} | Well+`,
      description,
      url: absoluteUrl(`/facility/${facility.slug}`),
      type: "website",
      images: image ? [{ url: image.url, alt: facility.name }] : undefined,
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
          addressRegion: cleanValue(facility.borough) || (cleanValue(facility.areaOfLondon)?.includes("London") ? "London" : undefined),
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
  const heroSummary = editorialCandidates[0] || "View the available services, access rules and practical booking details.";
  const whyCopy = editorialCandidates.find((candidate) => candidate !== heroSummary);
  const services = canonicaliseServiceList(cleanList(facility.servicesOffered));
  const serviceGroups = groupFacilityServices(services);
  const relatedGuides = getRelatedGuides(services);
  const similarVenues = getSimilarVenues(facility, facilities, servicePillarMappings);
  const website = cleanUrl(facility.website);
  const bookingLink = cleanUrl(facility.bookingLink);
  const instagramLink = cleanUrl(facility.instagramLink);
  const primaryCtaHref = bookingLink || website;
  const primaryCtaLabel = bookingLink ? "Book this venue" : "Visit website";
  const price = cleanValue(facility.priceFrom) || cleanValue(facility.overallPriceRange);
  const access = cleanValue(facility.accessType);
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
  ].filter((item) => isUsefulValue(item.value)).slice(0, 6);
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
  const visitItems = [...experienceItems, ...practicalItems]
    .filter((item, index, items) => items.findIndex((candidate) => candidate.label === item.label) === index);

  return (
    <main className={`min-h-screen bg-[#f4efe6] text-[#29241d] ${primaryCtaHref ? "pb-20 md:pb-0" : ""}`}>
      <AnalyticsPageView
        eventName="facility_page_view"
        properties={{
          facility_name: facility.name,
          facility_slug: facility.slug,
          access_type: access,
          location,
          primary_service: services[0],
          page_path: `/facility/${facility.slug}`,
        }}
      />
      <JsonLd data={venueJsonLd(facility)} />

      <section className="px-5 py-6 sm:px-6 sm:py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-[#70695d] sm:mb-8">
            <Link href="/" className="underline-offset-4 hover:text-[#29241d] hover:underline">Home</Link>
            <span>/</span>
            <Link href="/explore" className="underline-offset-4 hover:text-[#29241d] hover:underline">Explore</Link>
          </nav>

          <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
            <div className="order-2 max-w-2xl lg:order-1 lg:max-w-none">
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
                    properties={{
                      facility_name: facility.name,
                      facility_slug: facility.slug,
                      source: "facility_detail",
                      cta_type: bookingLink ? "booking" : "website",
                      access_type: access,
                      primary_service: services[0],
                    }}
                    className="rounded-full bg-[#29241d] px-5 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#3d352b]"
                  >
                    {primaryCtaLabel}
                  </TrackedExternalLink>
                ) : null}
                {instagramLink ? (
                  <TrackedExternalLink
                    href={instagramLink}
                    eventName="listing_cta_click"
                    properties={{
                      facility_name: facility.name,
                      facility_slug: facility.slug,
                      source: "facility_detail",
                      cta_type: "instagram",
                      access_type: access,
                      primary_service: services[0],
                    }}
                    className="rounded-full border border-[#d8cebf] px-5 py-3 text-sm transition hover:bg-[#fbf8f1]"
                  >
                    View on Instagram
                  </TrackedExternalLink>
                ) : null}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <FacilityGallery images={facility.images} venueName={facility.name} />
            </div>
          </div>
        </div>
      </section>

      {quickFacts.length > 0 ? (
        <section className="px-5 pb-10 sm:px-6 sm:pb-14">
          <div className="mx-auto max-w-6xl rounded-[1.1rem] border border-[#d8cebf]/75 bg-[#fbf8f1]/70 p-5 shadow-[0_18px_48px_rgba(41,36,29,0.04)] sm:p-6">
            <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {visitItems.length > 0 ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading eyebrow="What to expect" title="The experience and practical details" copy="Session format, facilities and the details worth checking before you book." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visitItems.map((item) => <DetailCard key={item.label} {...item} />)}
            </div>
          </div>
        </section>
      ) : null}

      {serviceGroups.length > 0 ? (
        <section className="px-5 pb-12 sm:px-6 md:pb-16">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8 sm:pt-10">
            <SectionHeading eyebrow="Services" title={`Services at ${facility.name}`} copy="Browse the testing, treatments and recovery services listed for this venue." />
            <div className="mt-7 grid gap-7 lg:grid-cols-2 lg:gap-10">
              {serviceGroups.map((group) => (
                <div key={group.key}>
                  <h3 className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#6f6048]">{group.label}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {group.services.map((service) => {
                      const href = canonicalServiceHref(service);
                      const className = `flex min-h-12 items-center justify-between gap-3 rounded-[0.85rem] border border-[#d8cebf] bg-[#fbf8f1] px-4 py-3 text-sm leading-5 text-[#29241d] transition hover:border-[#6f6048] hover:bg-[#eee7da] ${service.length > 22 ? "col-span-2" : ""}`;
                      return href ? (
                        <Link key={service} href={href} className={className}>
                          <span>{service}</span><span aria-hidden="true">→</span>
                        </Link>
                      ) : (
                        <span key={service} className={className}>{service}</span>
                      );
                    })}
                  </div>
                </div>
              ))}
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
            <SectionHeading eyebrow="Related guides" title="Compare related services" copy="See similar services across London and the practical differences to check before booking." />
            <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {relatedGuides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="group flex min-h-48 min-w-[82%] snap-start flex-col justify-between rounded-[1rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-5 transition hover:border-[#6f6048] hover:bg-[#fffaf0] sm:min-w-0">
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
            <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
              {similarVenues.map((venue) => <div key={venue.slug} className="min-w-[82%] snap-start sm:min-w-0"><SimilarVenueCard facility={venue} /></div>)}
            </div>
          </div>
        </section>
      ) : null}

      {primaryCtaHref ? (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d8cebf] bg-[#fbf8f1]/96 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(41,36,29,0.12)] backdrop-blur md:hidden">
          <TrackedExternalLink
            href={primaryCtaHref}
            eventName="listing_cta_click"
            properties={{ facility_name: facility.name, facility_slug: facility.slug, source: "facility_sticky_mobile", cta_type: bookingLink ? "booking" : "website", access_type: access, primary_service: services[0] }}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#29241d] px-5 text-sm font-medium text-[#fbf8f1]"
          >
            {primaryCtaLabel}
          </TrackedExternalLink>
        </div>
      ) : null}
    </main>
  );
}
