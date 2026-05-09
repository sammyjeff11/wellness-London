import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AnalyticsPageView from "@/components/AnalyticsPageView";
import JsonLd from "@/components/JsonLd";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { getFacilities, type AirtableFacility } from "@/lib/airtable";

type FacilityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function InfoPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-stone-200 bg-[#fffdf8]/80 px-3 py-1 text-sm text-stone-700">
      {label}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | string[] }) {
  const displayValue = Array.isArray(value) ? value.filter(Boolean).join(", ") : value;
  if (!displayValue) return null;

  return (
    <div className="flex items-start justify-between gap-6 border-b border-stone-200 py-3 last:border-b-0">
      <dt className="text-sm text-stone-500">{label}</dt>
      <dd className="max-w-[58%] text-right text-sm font-medium text-[#211d18]">{displayValue}</dd>
    </div>
  );
}

function getInstagramHref(value: string) {
  if (!value) return "";
  return value.startsWith("http") ? value : `https://instagram.com/${value.replace("@", "")}`;
}

function formatDate(value: string) {
  if (!value || value === "Details not yet confirmed") return "Details not yet confirmed";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function serviceLabel(key: string) {
  const labels: Record<string, string> = {
    sauna: "Sauna",
    "cold-plunge": "Cold plunge",
    cryotherapy: "Cryotherapy",
    recovery: "Recovery",
    breathwork: "Breathwork",
    yoga: "Yoga",
    meditation: "Meditation",
    "red-light": "Red light therapy",
    hbot: "HBOT",
  };

  return labels[key] || key;
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

async function getFacilityBySlug(slug: string) {
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug || item.id === slug);
  return { facility, facilities };
}

export async function generateMetadata({
  params,
}: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { facility } = await getFacilityBySlug(slug);

  if (!facility) {
    return {
      title: "Facility not found | Wellness London",
    };
  }

  const title = `${facility.name} | Wellness London`;
  const description = facility.editorialVerdict || facility.editorialSummary || facility.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/facility/${facility.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/facility/${facility.slug}`,
      images: facility.images[0]
        ? [
            {
              url: facility.images[0].url,
              alt: facility.images[0].filename || facility.name,
            },
          ]
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

  if (!facility) {
    notFound();
  }

  const pageUrl = `https://wellnessldn.com/facility/${facility.slug}`;
  const websiteHref = facility.website && facility.website !== "#" ? facility.website : "";
  const bookingHref = facility.bookingLink || websiteHref;
  const instagramHref = getInstagramHref(facility.instagramLink);
  const directionsHref = getDirectionsHref(facility);
  const similarFacilities = getSimilarFacilities(facility, facilities);
  const primaryBestFor = facility.bestFor[0] || facility.experienceType[0] || "Best fit not yet confirmed";
  const verdict = facility.editorialVerdict || facility.editorialSummary || facility.description;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${pageUrl}#business`,
    name: facility.name,
    description: verdict,
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://wellnessldn.com" },
      { "@type": "ListItem", position: 2, name: facility.name, item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${facility.name} suitable for beginners?`,
        acceptedAnswer: { "@type": "Answer", text: facility.beginnerFriendly || "Beginner suitability has not yet been confirmed." },
      },
      {
        "@type": "Question",
        name: `Do I need to book ${facility.name} in advance?`,
        acceptedAnswer: { "@type": "Answer", text: facility.bookingRequired || "Booking details are not yet confirmed." },
      },
      {
        "@type": "Question",
        name: `Is ${facility.name} private or shared?`,
        acceptedAnswer: { "@type": "Answer", text: facility.privateOrShared || "Private/shared access is not yet confirmed." },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <AnalyticsPageView eventName="facility_page_view" properties={{ facility_name: facility.name, facility_slug: facility.slug, area: facility.neighbourhood || facility.areaOfLondon, page_path: `/facility/${facility.slug}` }} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <Link href="/" className="text-sm font-medium underline text-stone-700">
          Back to directory
        </Link>

        <section className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            {facility.images.length > 0 ? (
              <div className="relative h-[520px] w-full overflow-hidden rounded-3xl border border-stone-200 shadow-2xl shadow-stone-300/40">
                <Image
                  src={facility.images[0].url}
                  alt={facility.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {facility.verificationStatus}
                </span>
              </div>
            ) : (
              <div className="flex h-[520px] w-full items-end rounded-3xl border border-stone-200 bg-[#ded6c8] p-8 text-stone-600">
                Wellness London
              </div>
            )}

            {facility.images.length > 1 ? (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {facility.images.slice(1, 5).map((image) => (
                  <div key={image.id} className="relative h-24 overflow-hidden rounded-2xl border border-stone-200">
                    <Image
                      src={image.url}
                      alt={image.filename || facility.name}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:pt-6">
            <div className="mb-5 flex flex-wrap gap-2">
              {facility.servicesOffered.map((service) => (
                <InfoPill key={service} label={service} />
              ))}
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#7a643f]">
              {facility.neighbourhood || facility.areaOfLondon || "London"}
            </p>

            <h1 className="mb-5 text-5xl font-semibold tracking-tight md:text-6xl">
              {facility.name}
            </h1>

            <p className="mb-5 text-lg font-medium leading-8 text-[#211d18]">
              Best for: {primaryBestFor}
            </p>
            <p className="mb-8 text-lg leading-8 text-stone-600">
              {verdict}
            </p>

            <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4">
                <p className="mb-1 text-stone-500">Price from</p>
                <p className="font-medium">{facility.priceFrom || "Price not listed"}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4">
                <p className="mb-1 text-stone-500">Access</p>
                <p className="font-medium">{facility.privateOrShared}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4">
                <p className="mb-1 text-stone-500">Experience</p>
                <p className="font-medium">{facility.experienceType.slice(0, 2).join(", ") || facility.premiumLevel}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-4">
                <p className="mb-1 text-stone-500">Checked</p>
                <p className="font-medium">{formatDate(facility.lastCheckedDate)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {bookingHref ? (
                <TrackedExternalLink href={bookingHref} eventName="listing_cta_click" properties={{ facility_name: facility.name, facility_slug: facility.slug, cta_type: facility.bookingLink ? "book" : "visit_website", area: facility.neighbourhood || facility.areaOfLondon }} className="inline-flex rounded-full bg-[#211d18] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3128]">
                  {facility.bookingLink ? "Book" : "Visit website"}
                </TrackedExternalLink>
              ) : null}
              {directionsHref ? (
                <TrackedExternalLink href={directionsHref} eventName="map_click" properties={{ facility_name: facility.name, facility_slug: facility.slug, area: facility.neighbourhood || facility.areaOfLondon, cta_type: "directions" }} className="inline-flex rounded-full border border-stone-300 bg-[#fffdf8] px-6 py-3 text-sm font-semibold transition hover:shadow-lg">
                  Get directions
                </TrackedExternalLink>
              ) : null}
              {instagramHref ? (
                <TrackedExternalLink href={instagramHref} eventName="listing_cta_click" properties={{ facility_name: facility.name, facility_slug: facility.slug, cta_type: "instagram" }} className="inline-flex rounded-full border border-stone-300 bg-[#fffdf8] px-6 py-3 text-sm font-semibold transition hover:shadow-lg">
                  Instagram
                </TrackedExternalLink>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">Quick verdict</p>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight">Who this is best suited to</h2>
            <p className="leading-8 text-stone-600">{verdict}</p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">At a glance</p>
            <dl>
              <DetailRow label="Best for" value={facility.bestFor.length ? facility.bestFor : primaryBestFor} />
              <DetailRow label="Services" value={facility.servicesOffered} />
              <DetailRow label="Experience" value={facility.experienceType.length ? facility.experienceType : facility.premiumLevel} />
              <DetailRow label="Price from" value={facility.priceFrom} />
              <DetailRow label="Private/shared" value={facility.privateOrShared} />
              <DetailRow label="Booking" value={facility.bookingRequired} />
              <DetailRow label="Towels" value={facility.towelsIncluded} />
              <DetailRow label="Showers" value={facility.showersAvailable} />
              <DetailRow label="Beginner-friendly" value={facility.beginnerFriendly} />
              <DetailRow label="Last checked" value={formatDate(facility.lastCheckedDate)} />
            </dl>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            `Good option if you want ${facility.servicesOffered.slice(0, 2).join(" and ") || "a recovery session"} in one visit.`,
            facility.privateOrShared !== "Private/shared not confirmed" ? `${facility.privateOrShared} access helps set expectations before booking.` : "Access details are still being checked, so confirm before booking.",
            facility.beginnerFriendly === "Yes" ? "Suitable for beginners based on current listing details." : "Beginner suitability should be checked with the venue before booking.",
          ].map((item) => (
            <article key={item} className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-5 shadow-sm">
              <h3 className="mb-2 font-semibold">Why visit</h3>
              <p className="text-sm leading-6 text-stone-600">{item}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">Before you go</p>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight">Things to know</h2>
          <p className="leading-8 text-stone-600">
            {facility.bookingRequired}. Towels: {facility.towelsIncluded.toLowerCase()}. Showers: {facility.showersAvailable.toLowerCase()}. Changing rooms: {facility.changingRooms.toLowerCase()}. {facility.priceNotes}
          </p>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">Facilities breakdown</p>
            <h2 className="mb-6 text-3xl font-semibold tracking-tight">What is available</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {facility.serviceKeys.includes("sauna") ? (
                <article className="rounded-2xl border border-stone-200 p-5">
                  <h3 className="mb-3 font-semibold">Sauna</h3>
                  <ul className="space-y-2 text-sm leading-6 text-stone-600">
                    <li>Type: {facility.saunaType.join(", ") || "Unknown"}</li>
                    <li>Access: {facility.privateOrShared}</li>
                    <li>Paired with cold plunge: {facility.contrastTherapyAvailable}</li>
                  </ul>
                </article>
              ) : null}
              {facility.serviceKeys.includes("cold-plunge") ? (
                <article className="rounded-2xl border border-stone-200 p-5">
                  <h3 className="mb-3 font-semibold">Cold plunge</h3>
                  <ul className="space-y-2 text-sm leading-6 text-stone-600">
                    <li>Type: {facility.coldPlungeType}</li>
                    <li>Guided: {facility.guidedSessionsAvailable}</li>
                    <li>Beginner-friendly: {facility.beginnerFriendly}</li>
                  </ul>
                </article>
              ) : null}
              {facility.serviceKeys.includes("cryotherapy") ? (
                <article className="rounded-2xl border border-stone-200 p-5">
                  <h3 className="mb-3 font-semibold">Cryotherapy</h3>
                  <ul className="space-y-2 text-sm leading-6 text-stone-600">
                    <li>Type: {facility.cryoType}</li>
                    <li>Guided: {facility.guidedSessionsAvailable}</li>
                    <li>Booking: {facility.bookingRequired}</li>
                  </ul>
                </article>
              ) : null}
              <article className="rounded-2xl border border-stone-200 p-5">
                <h3 className="mb-3 font-semibold">Other services</h3>
                <p className="text-sm leading-6 text-stone-600">
                  {facility.serviceKeys.map(serviceLabel).join(", ") || "Details not yet confirmed"}
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">Pricing</p>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight">Price guide</h2>
            <dl>
              <DetailRow label="Price from" value={facility.priceFrom} />
              <DetailRow label="Price level" value={facility.premiumLevel} />
              <DetailRow label="Notes" value={facility.priceNotes} />
            </dl>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">Location</p>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight">Getting there</h2>
            <dl>
              <DetailRow label="Address" value={facility.address} />
              <DetailRow label="Area" value={facility.neighbourhood || facility.areaOfLondon} />
              <DetailRow label="Nearest station" value={facility.nearestStation || "Details not yet confirmed"} />
              <DetailRow label="Borough" value={facility.borough} />
            </dl>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">Similar places</p>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight">Nearby or similar options</h2>
            {similarFacilities.length > 0 ? (
              <div className="grid gap-3">
                {similarFacilities.map((item) => (
                  <Link key={item.slug} href={`/facility/${item.slug}`} className="rounded-2xl border border-stone-200 p-4 transition hover:bg-[#f8f5ef]">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-stone-600">{item.neighbourhood || item.areaOfLondon || "London"} / {item.priceFrom || item.overallPriceRange || "Price not listed"}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-6 text-stone-600">Similar places will appear here as more profiles are enriched.</p>
            )}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">FAQs</p>
          <h2 className="mb-6 text-3xl font-semibold tracking-tight">Common questions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article>
              <h3 className="mb-2 font-semibold">Is this suitable for beginners?</h3>
              <p className="text-sm leading-6 text-stone-600">{facility.beginnerFriendly}</p>
            </article>
            <article>
              <h3 className="mb-2 font-semibold">Do I need to book?</h3>
              <p className="text-sm leading-6 text-stone-600">{facility.bookingRequired}</p>
            </article>
            <article>
              <h3 className="mb-2 font-semibold">Are towels and showers available?</h3>
              <p className="text-sm leading-6 text-stone-600">Towels: {facility.towelsIncluded}. Showers: {facility.showersAvailable}.</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
