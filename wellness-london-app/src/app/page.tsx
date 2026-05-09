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

export default async function Home() {
  const facilities = await getFacilities();
  const heroImage = facilities.find((facility) => facility.images.length > 0)?.images[0];

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#211d18]">
      <section className="px-6 py-10 md:py-14">
        <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-end overflow-hidden rounded-[2rem] border border-stone-200 bg-[#d8d0c2] p-8 md:p-12">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
          <div className="relative max-w-3xl text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-white/75">
              Curated London Wellness Directory
            </p>
            <h1 className="mb-6 text-5xl font-semibold tracking-tight md:text-7xl">
              Discover the best wellness spaces in London
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/85">
              A calm, editorial guide to saunas, cold plunges, cryotherapy and
              recovery studios chosen for quality, atmosphere and thoughtful care.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {categoryLinks.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
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

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Directory
              </p>
              <h2 className="text-4xl font-semibold tracking-tight">
                Curated spaces
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-stone-600">
              Each listing is selected to help you find recovery spaces that feel
              calm, considered and worth returning to.
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
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-stone-200 bg-[#fffdf8] p-8 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
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
