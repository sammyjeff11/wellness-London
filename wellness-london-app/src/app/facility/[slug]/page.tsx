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
      <dd className="text-sm leading-6 text-[#29241d]">{displayValue(value)}</dd>
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

async function getFacilityBySlug(slug: string) {
  const facilities = await getFacilities();
  const facility = facilities.find((item) => item.slug === slug || item.id === slug);
  return { facility, facilities };
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { facility } = await getFacilityBySlug(slug);

  if (!facility) {
    return { title: "Facility not found | Well Edit" };
  }

  const title = `${facility.name} | Well Edit`;
  const description = facility.editorialVerdict || facility.editorialSummary || facility.description;

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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://welledit.co.uk" },
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
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <AnalyticsPageView eventName="facility_page_view" properties={{ facility_name: facility.name, facility_slug: facility.slug, area: facility.neighbourhood || facility.areaOfLondon, page_path: `/facility/${facility.slug}` }} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <section className="px-5 pt-6 md:px-8 md:pt-8">
        <div className="mx-auto max-w-[1400px]">
          <Link href="/" className="mb-8 inline-block text-sm text-[#70695d] underline underline-offset-4">
            Back to the edit
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div className="relative min-h-[68vh] overflow-hidden bg-[#d8cebf]">
              {facility.images[0] ? (
                <Image
                  src={facility.images[0].url}
                  alt={facility.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[68vh] items-end p-8 text-[#70695d]">Well Edit</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-[11px] uppercase tracking-[0.22em] text-white/88">
                {facility.verificationStatus} / Checked {formatDate(facility.lastCheckedDate)}
              </p>
            </div>

            <div className="pb-4">
              <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#6f6048]">
                {facility.neighbourhood || facility.areaOfLondon || "London"}
              </p>
              <h1 className="font-serif text-6xl font-normal leading-[0.96] tracking-normal md:text-8xl">
                {facility.name}
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-9 text-[#70695d]">
                Best for: {primaryBestFor}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.18em] text-[#6f6048]">
                {facility.servicesOffered.slice(0, 5).map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                {bookingHref ? (
                  <TrackedExternalLink href={bookingHref} eventName="listing_cta_click" properties={{ facility_name: facility.name, facility_slug: facility.slug, cta_type: facility.bookingLink ? "book" : "visit_website", area: facility.neighbourhood || facility.areaOfLondon }} className="inline-flex rounded-full bg-[#29241d] px-6 py-3 text-sm text-[#fbf8f1] transition hover:bg-[#463c31]">
                    {facility.bookingLink ? "Book" : "Visit website"}
                  </TrackedExternalLink>
                ) : null}
                {directionsHref ? (
                  <TrackedExternalLink href={directionsHref} eventName="map_click" properties={{ facility_name: facility.name, facility_slug: facility.slug, area: facility.neighbourhood || facility.areaOfLondon, cta_type: "directions" }} className="inline-flex rounded-full border border-[#cfc5b6] px-6 py-3 text-sm transition hover:border-[#29241d]">
                    Get directions
                  </TrackedExternalLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Editorial note</p>
            <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">The Well Edit view</h2>
          </div>
          <p className="text-xl leading-10 text-[#70695d]">{verdict}</p>
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <article>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Quick verdict</p>
            <h2 className="mb-6 font-serif text-4xl font-normal tracking-normal">Who this is best suited to</h2>
            <p className="text-base leading-8 text-[#70695d]">{verdict}</p>
          </article>

          <article>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">At a glance</p>
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
          </article>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
          {[
            `Good option if you want ${facility.servicesOffered.slice(0, 2).join(" and ") || "a recovery session"} in one visit.`,
            facility.privateOrShared !== "Private/shared not confirmed" ? `${facility.privateOrShared} access helps set expectations before booking.` : "Access details are still being checked, so confirm before booking.",
            facility.beginnerFriendly === "Yes" ? "Suitable for beginners based on current listing details." : "Beginner suitability should be checked with the venue before booking.",
          ].map((item) => (
            <article key={item}>
              <h3 className="mb-3 text-sm uppercase tracking-[0.18em] text-[#29241d]">Why visit</h3>
              <p className="text-sm leading-7 text-[#70695d]">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Before you go</p>
            <h2 className="font-serif text-5xl font-normal tracking-normal">Things to know</h2>
          </div>
          <p className="text-base leading-8 text-[#70695d]">
            {facility.bookingRequired}. Towels: {facility.towelsIncluded.toLowerCase()}. Showers: {facility.showersAvailable.toLowerCase()}. Changing rooms: {facility.changingRooms.toLowerCase()}. {facility.priceNotes}
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <article>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Facilities breakdown</p>
            <h2 className="mb-10 font-serif text-5xl font-normal tracking-normal">What is available</h2>
            <dl>
              <DetailRow label="Sauna" value={facility.serviceKeys.includes("sauna") ? [facility.saunaType.join(", ") || "Type unknown", `Contrast therapy: ${facility.contrastTherapyAvailable}`] : undefined} />
              <DetailRow label="Cold plunge" value={facility.serviceKeys.includes("cold-plunge") ? [facility.coldPlungeType, `Guided: ${facility.guidedSessionsAvailable}`] : undefined} />
              <DetailRow label="Cryotherapy" value={facility.serviceKeys.includes("cryotherapy") ? [facility.cryoType, `Booking: ${facility.bookingRequired}`] : undefined} />
              <DetailRow label="Other services" value={facility.servicesOffered} />
            </dl>
          </article>

          <article>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Pricing and location</p>
            <h2 className="mb-10 font-serif text-5xl font-normal tracking-normal">Plan the visit</h2>
            <dl>
              <DetailRow label="Price from" value={facility.priceFrom} />
              <DetailRow label="Price level" value={facility.premiumLevel} />
              <DetailRow label="Pricing note" value={facility.priceNotes} />
              <DetailRow label="Address" value={facility.address} />
              <DetailRow label="Nearest station" value={facility.nearestStation} />
              <DetailRow label="Borough" value={facility.borough} />
            </dl>
          </article>
        </div>
      </section>

      <section className="border-t border-[#d8cebf]/70 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Similar places</p>
            <h2 className="font-serif text-5xl font-normal tracking-normal">Continue the edit</h2>
          </div>
          {similarFacilities.length > 0 ? (
            <div className="grid gap-5">
              {similarFacilities.map((item) => (
                <Link key={item.slug} href={`/facility/${item.slug}`} className="group border-t border-[#d8cebf]/70 py-5">
                  <p className="font-serif text-3xl font-normal text-[#29241d] transition group-hover:text-[#6f6048]">{item.name}</p>
                  <p className="mt-2 text-sm text-[#70695d]">{item.neighbourhood || item.areaOfLondon || "London"} / {item.priceFrom || item.overallPriceRange || "Price not listed"}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-[#70695d]">Similar places will appear here as more profiles are enriched.</p>
          )}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">FAQs</p>
          <h2 className="mb-10 font-serif text-5xl font-normal tracking-normal">Common questions</h2>
          <div className="space-y-8">
            <article className="border-t border-[#d8cebf]/70 pt-6">
              <h3 className="mb-3 text-lg text-[#29241d]">Is this suitable for beginners?</h3>
              <p className="text-sm leading-7 text-[#70695d]">{facility.beginnerFriendly}</p>
            </article>
            <article className="border-t border-[#d8cebf]/70 pt-6">
              <h3 className="mb-3 text-lg text-[#29241d]">Do I need to book?</h3>
              <p className="text-sm leading-7 text-[#70695d]">{facility.bookingRequired}</p>
            </article>
            <article className="border-t border-[#d8cebf]/70 pt-6">
              <h3 className="mb-3 text-lg text-[#29241d]">Are towels and showers available?</h3>
              <p className="text-sm leading-7 text-[#70695d]">Towels: {facility.towelsIncluded}. Showers: {facility.showersAvailable}.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
