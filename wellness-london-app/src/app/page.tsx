import Image from "next/image";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";

const categoryLinks = [
  {
    href: "/sauna-london",
    label: "Saunas",
    description: "Heat, breath and calm recovery spaces across the city.",
  },
  {
    href: "/cold-plunge-london",
    label: "Cold Plunge",
    description: "Contrast therapy and ice bath studios for focused reset.",
  },
  {
    href: "/cryotherapy-london",
    label: "Cryotherapy",
    description: "Performance recovery treatments in premium London spaces.",
  },
];

const curationStandards = [
  {
    title: "Atmosphere",
    text: "Spaces are considered for calm, privacy, design quality and the feeling of genuine reset.",
  },
  {
    title: "Facilities",
    text: "Listings prioritise thoughtful recovery setups, from showers and changing rooms to contrast therapy flow.",
  },
  {
    title: "Practicality",
    text: "Location, booking clarity, access model and price structure all matter for repeat use.",
  },
];

export default async function Home() {
  const facilities = await getFacilities();
  const heroImage = facilities.find((facility) => facility.images.length > 0)?.images[0];
  const serviceCount = new Set(facilities.flatMap((facility) => facility.serviceKeys)).size;

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <section className="px-6 py-10 md:py-14">
        <div className="relative mx-auto flex min-h-[640px] max-w-6xl items-end overflow-hidden rounded-3xl border border-stone-200 bg-[#d8d0c2] p-8 md:p-12">
          {heroImage ? (
            <Image
              src={heroImage.url}
              alt={heroImage.filename}
              fill
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
          <div className="relative grid w-full gap-10 text-white lg:grid-cols-[1fr_300px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-white/75">
                Curated London Wellness Directory
              </p>
              <h1 className="mb-6 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                London&apos;s curated guide to premium wellness spaces
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/85">
                Independently organised saunas, cold plunges, cryotherapy and recovery studios chosen for atmosphere, facilities and thoughtful care.
              </p>
            </div>

            <div className="grid gap-3 rounded-2xl border border-white/20 bg-white/10 p-5 text-sm backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-white/70">Live listings</span>
                <strong className="text-lg">{facilities.length || "Soon"}</strong>
              </div>
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-white/70">Recovery categories</span>
                <strong className="text-lg">{serviceCount || 3}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">City focus</span>
                <strong className="text-lg">London</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {categoryLinks.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a643f]">
                Guide
              </p>
              <h2 className="mb-2 text-2xl font-semibold tracking-tight">
                {category.label}
              </h2>
              <p className="text-sm leading-6 text-stone-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 border-y border-stone-200 py-14 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a643f]">
              How we curate
            </p>
            <h2 className="text-4xl font-semibold tracking-tight">
              A directory built around quality, not volume
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {curationStandards.map((standard) => (
              <article key={standard.title} className="rounded-2xl bg-[#fffdf8] p-5 shadow-sm ring-1 ring-stone-200">
                <h3 className="mb-2 font-semibold">{standard.title}</h3>
                <p className="text-sm leading-6 text-stone-600">{standard.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a643f]">
                Directory
              </p>
              <h2 className="text-4xl font-semibold tracking-tight">
                Curated spaces
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-600">
              Compare London wellness spaces by location, service mix, access type and the details that make a recovery ritual worth repeating.
            </p>
          </div>

          {facilities.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {facilities.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={{
                    slug: facility.slug,
                    name: facility.name,
                    description: facility.editorialSummary || facility.description,
                    website: facility.website,
                    imageUrl: facility.images[0]?.url,
                    imageAlt: facility.images[0]?.filename || facility.name,
                    location: facility.neighbourhood || facility.areaOfLondon,
                    services: facility.servicesOffered,
                    priceRange: facility.overallPriceRange,
                    rating: facility.googleRating,
                    accessType: facility.accessType,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-[#fffdf8] p-8 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a643f]">
                Directory coming soon
              </p>
              <h3 className="mb-3 text-2xl font-semibold tracking-tight">
                We are refreshing the live listings
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-stone-600">
                The directory is being curated from verified venue data. In the meantime,
                explore the sauna, cold plunge and cryotherapy guides to understand the
                kinds of premium recovery spaces Wellness London covers.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
