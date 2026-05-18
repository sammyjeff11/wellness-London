import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import FacilityGallery from "@/components/FacilityGallery";
import JsonLd from "@/components/JsonLd";
import TopicalPathways from "@/components/TopicalPathways";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import VenueLocationSection from "@/components/VenueLocationSection";
import { getFacilities, type AirtableFacility } from "@/lib/airtable";
import { getFacilityTopicalContext } from "@/lib/facility-topical-mapping";
import { getLocationHubHref } from "@/lib/location-hubs";
import { getServiceHubHref } from "@/lib/service-hubs";

type FacilityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(value: string) {
  if (!value || value === "Details not yet confirmed") return "Details not yet confirmed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function displayValue(value?: string | string[]) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value || "Details not yet confirmed";
}

function DetailRow({ label, value }: { label: string; value?: string | string[] }) {
  return (
    <div className="grid gap-2 border-t border-[#d8cebf]/70 py-4 md:grid-cols-[0.42fr_0.58fr]">
      <dt className="text-[11px] uppercase tracking-[0.18em] text-[#6f6048]">{label}</dt>
      <dd className="break-words text-sm leading-6 text-[#29241d]">{displayValue(value)}</dd>
    </div>
  );
}

function getInstagramHref(value: string) {
  if (!value) return "";
  return value.startsWith("http") ? value : `https://instagram.com/${value.replace("@", "")}`;
}

function getDirectionsHref(facility: AirtableFacility) {
  const query = encodeURIComponent([facility.name, facility.address, facility.postcode, "London"].filter(Boolean).join(" "));
  return query ? `https://www.google.com/maps/search/?api=1&query=${query}` : "";
}

function getSimilarFacilities(facility: AirtableFacility, facilities: AirtableFacility[]) {
  return facilities
    .filter((item) => item.slug !== facility.slug)
    .map((item) => {
      const sharedServices = item.serviceKeys.filter((key) => facility.serviceKeys.includes(key)).length;
      const sharedArea = item.areaGroup && item.areaGroup === facility.areaGroup ? 1 : 0;
      const sharedPremium = item.premiumLevel && item.premiumLevel === facility.premiumLevel ? 1 : 0;
      return { item, score: sharedServices * 3 + sharedArea + sharedPremium };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);
}

function hasKnownValue(value?: string) {
  if (!value) return false;
  const lower = value.toLowerCase();
  return !lower.includes("unknown") && !lower.includes("unclear") && !lower.includes("not confirmed") && !lower.includes("details not yet confirmed");
}

function buildGoodToKnow(facility: AirtableFacility) {
  const items: string[] = [];

  if (hasKnownValue(facility.bookingRequired)) items.push(facility.bookingRequired);
  if (hasKnownValue(facility.privateOrShared)) items.push(`${facility.privateOrShared} access.`);
  if (hasKnownValue(facility.towelsIncluded)) items.push(`Towels: ${facility.towelsIncluded.toLowerCase()}.`);
  if (hasKnownValue(facility.showersAvailable)) items.push(`Showers: ${facility.showersAvailable.toLowerCase()}.`);
  if (hasKnownValue(facility.changingRooms)) items.push(`Changing rooms: ${facility.changingRooms.toLowerCase()}.`);

  if (items.length < 3) {
    items.push("Some practical details are still being checked, so confirm current inclusions with the venue before booking.");
  }

  return items.slice(0, 5);
}

function buildExperienceHighlights(facility: AirtableFacility) {
  const highlights = new Set<string>();

  facility.experienceType.forEach((item) => highlights.add(item));
  facility.servicesOffered.slice(0, 4).forEach((item) => highlights.add(item));
  if (hasKnownValue(facility.privateOrShared)) highlights.add(facility.privateOrShared);
  if (hasKnownValue(facility.beginnerFriendly)) highlights.add(`Beginner-friendly: ${facility.beginnerFriendly}`);
  if (hasKnownValue(facility.premiumLevel)) highlights.add(facility.premiumLevel);

  return Array.from(highlights).filter(Boolean).slice(0, 8);
}

function buildEditorialReasons(facility: AirtableFacility) {
  const reasons: string[] = [];
  const primaryService = facility.servicesOffered[0] || "wellness services";
  const primaryBestFor = facility.bestFor[0] || facility.experienceType[0];

  if (primaryBestFor) reasons.push(`A strong fit for ${primaryBestFor.toLowerCase()}.`);
  if (hasKnownValue(facility.ambience)) reasons.push(`The atmosphere is described as ${facility.ambience.toLowerCase()}.`);
  if (hasKnownValue(facility.privateOrShared)) reasons.push(`${facility.privateOrShared} access helps shape the experience.`);
  if (facility.servicesOffered.length > 1) reasons.push(`Useful service mix: ${facility.servicesOffered.slice(0, 3).join(", ")}.`);
  if (hasKnownValue(facility.priceFrom)) reasons.push(`Pricing starts from ${facility.priceFrom}.`);

  if (reasons.length < 3) {
    reasons.push(`Worth considering if you are looking for ${primaryService.toLowerCase()} in ${facility.neighbourhood || facility.areaOfLondon || "London"}.`);
  }

  return reasons.slice(0, 4);
}

function serviceLinksFromFacility(facility: AirtableFacility) {
  const uniqueLinks = new Map<string, string>();

  facility.servicesOffered.forEach((service) => {
    const href = getServiceHubHref(service);
    if (href) uniqueLinks.set(href, service);
  });

  return Array.from(uniqueLinks.entries()).map(([href, label]) => ({ href, label }));
}

async function getFacilityBySlug(slug: string) {
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug || item.id === slug);
  return { facility, facilities };
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { facility } = await getFacilityBySlug(slug);

  if (!facility) {
    return { title: "Facility not found | Well+" };
  }

  const title = `${facility.name} | Well+ London`;
  const description = facility.editorialSummary || facility.description;

  return {
    title,
    description,
    alternates: { canonical: `/facility/${facility.slug}` },
    openGraph: {
      title,
      description,
      url: `/facility/${facility.slug}`,
      images: facility.images[0]
        ? [{ url: facility.images[0].url, alt: facility.images[0].filename || facility.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: facility.images[0] ? [facility.images[0].url] : undefined,
    },
  };
}

export default async function FacilityPage({ params }: FacilityPageProps) {
  const { slug } = await params;
  const { facility, facilities } = await getFacilityBySlug(slug);

  if (!facility) notFound();

  const pageUrl = `https://welledit.co.uk/facility/${facility.slug}`;
  const websiteHref = facility.website && facility.website !== "#" ? facility.website : "";
  const bookingHref = facility.bookingLink || websiteHref;
  const instagramHref = getInstagramHref(facility.instagramLink);
  const directionsHref = getDirectionsHref(facility);
  const similarFacilities = getSimilarFacilities(facility, facilities);
  const primaryBestFor = facility.bestFor[0] || facility.experienceType[0] || "Best fit not yet confirmed";
  const summary = facility.editorialSummary || facility.description;
  const atmosphere = facility.ambience || "Atmosphere notes are being refined as this profile is updated.";
  const goodToKnow = buildGoodToKnow(facility);
  const experienceHighlights = buildExperienceHighlights(facility);
  const editorialReasons = buildEditorialReasons(facility);
  const locationLabel = facility.areaOfLondon || facility.areaGroup || facility.neighbourhood || "London";
  const locationHref = getLocationHubHref(locationLabel);
  const relevantServiceLinks = serviceLinksFromFacility(facility);
  const topicalContext = getFacilityTopicalContext([
    ...facility.serviceKeys,
    ...facility.servicesOffered,
    ...facility.experienceType,
    ...facility.bestFor,
  ]);
  const locationSection = (
    <VenueLocationSection
      name={facility.name}
      slug={facility.slug}
      address={facility.address}
      postcode={facility.postcode}
      neighbourhood={facility.neighbourhood}
      borough={facility.borough}
      areaOfLondon={facility.areaOfLondon}
      nearestStation={facility.nearestStation}
      directionsHref={directionsHref}
    />
  );

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${pageUrl}#business`,
    name: facility.name,
    description: summary,
    url: pageUrl,
    image: facility.images.map((image) => image.url),
    telephone: facility.phone || undefined,
    email: facility.email || undefined,
    priceRange: facility.priceFrom || facility.overallPriceRange || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: facility.address,
      postalCode: facility.postcode || undefined,
      addressLocality: "London",
      addressCountry: "GB",
    },
    areaServed: facility.areaGroup || "London",
    sameAs: [websiteHref, instagramHref].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://welledit.co.uk" },
      locationHref ? { "@type": "ListItem", position: 2, name: locationLabel, item: `https://welledit.co.uk${locationHref}` } : undefined,
      { "@type": "ListItem", position: locationHref ? 3 : 2, name: facility.name, item: pageUrl },
    ].filter(Boolean),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `Is ${facility.name} suitable for beginners?`, acceptedAnswer: { "@type": "Answer", text: facility.beginnerFriendly || "Beginner suitability has not yet been confirmed." } },
      { "@type": "Question", name: `Do I need to book ${facility.name} in advance?`, acceptedAnswer: { "@type": "Answer", text: facility.bookingRequired || "Booking details are not yet confirmed." } },
      { "@type": "Question", name: `Is ${facility.name} private or shared?`, acceptedAnswer: { "@type": "Answer", text: facility.privateOrShared || "Private/shared access is not yet confirmed." } },
      { "@type": "Question", name: "How are venues selected for Well+?", acceptedAnswer: { "@type": "Answer", text: "Venues are selected based on relevance to recovery and wellness, clarity of offering, user utility, atmosphere, facilities and overall fit within London’s wellness landscape." } },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="facility_page_view" properties={{ facility_name: facility.name, facility_slug: facility.slug, area: facility.neighbourhood || facility.areaOfLondon, page_path: `/facility/${facility.slug}` }} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#70695d] sm:mb-8">
            <Link href="/" className="underline underline-offset-4 hover:text-[#29241d]">The edit</Link>
            {locationHref ? (
              <>
                <span>/</span>
                <Link href={locationHref} className="underline underline-offset-4 hover:text-[#29241d]">{locationLabel}</Link>
              </>
            ) : null}
            <span>/</span>
            <span className="text-[#29241d]">{facility.name}</span>
          </nav>
          <div className="grid gap-9 sm:gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div className="relative min-h-[52vh] overflow-hidden bg-[#d8cebf] sm:min-h-[68vh]">
              {facility.images[0] ? <Image src={facility.images[0].url} alt={facility.name} fill priority sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" /> : <div className="flex h-full min-h-[52vh] items-end p-6 text-[#70695d] sm:min-h-[68vh] sm:p-8">Well+</div>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 text-[10px] uppercase leading-5 tracking-[0.18em] text-white/88 sm:bottom-6 sm:left-6 sm:right-6 sm:text-[11px] sm:tracking-[0.22em]">{facility.verificationStatus} / Checked {formatDate(facility.lastCheckedDate)}</p>
            </div>
            <div className="pb-2 sm:pb-4">
              <p className="mb-5 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#6f6048] sm:mb-6 sm:text-[11px] sm:tracking-[0.28em]">{facility.neighbourhood || facility.areaOfLondon || "London"}</p>
              <h1 className="font-serif text-5xl font-normal leading-[0.96] tracking-normal sm:text-6xl md:text-8xl">{facility.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#70695d] sm:mt-8 sm:text-xl sm:leading-9">Well suited for: {primaryBestFor}</p>
              <div className="mt-6 flex flex-wrap gap-2">{experienceHighlights.slice(0, 5).map((highlight) => {
                const serviceHref = getServiceHubHref(highlight);
                return serviceHref ? <Link key={highlight} href={serviceHref} className="bg-[#eee8dd] px-3 py-1.5 text-[11px] font-medium leading-none text-[#4e463c] transition hover:bg-[#e3dbcf]">{highlight}</Link> : <span key={highlight} className="bg-[#eee8dd] px-3 py-1.5 text-[11px] font-medium leading-none text-[#4e463c]">{highlight}</span>;
              })}</div>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
                {bookingHref ? <TrackedExternalLink href={bookingHref} eventName="listing_cta_click" properties={{ facility_name: facility.name, facility_slug: facility.slug, cta_type: facility.bookingLink ? "book" : "visit_website", area: facility.neighbourhood || facility.areaOfLondon }} className="inline-flex w-full justify-center rounded-full bg-[#29241d] px-6 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#463c31] sm:w-auto">{facility.bookingLink ? "Book" : "Visit website"}</TrackedExternalLink> : null}
                {directionsHref ? <TrackedExternalLink href={directionsHref} eventName="map_click" properties={{ facility_name: facility.name, facility_slug: facility.slug, area: facility.neighbourhood || facility.areaOfLondon, cta_type: "directions" }} className="inline-flex w-full justify-center rounded-full border border-[#cfc5b6] px-6 py-3 text-sm transition hover:border-[#29241d] sm:w-auto">Get directions</TrackedExternalLink> : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FacilityGallery images={facility.images} venueName={facility.name} />
    </main>
  );
}
