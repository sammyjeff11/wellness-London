import Image from "next/image";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";

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
    text: "We look for spaces that feel calm, tactile and considered, not simply well-equipped.",
  },
  {
    title: "Ritual",
    text: "The strongest listings make recovery feel repeatable: easy to book, easy to understand, easy to return to.",
  },
  {
    title: "Trust",
    text: "Profiles separate confirmed details from public-source research, so the recommendation stays honest.",
  },
];

export default async function Home() {
  const facilities = await getFacilities();
  const heroImage = facilities.find((facility) => facility.images.length > 0)?.images[0];
  const serviceCount = new Set(facilities.flatMap((facility) => facility.serviceKeys)).size;

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 pt-6 md:px-8 md:pt-8">
        <div className="relative mx-auto min-h-[78vh] max-w-[1400px] overflow-hidden bg-[#d8cebf]">
          {heroImage ? (
            <Image
              src={heroImage.url}
              alt={heroImage.filename}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          <div className="relative flex min-h-[78vh] items-end px-6 py-12 md:px-14 md:py-16">
            <div className="max-w-4xl text-[#fbf8f1]">
              <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-[#fbf8f1]/75">
                Wellness London / Curated recovery spaces
              </p>
              <h1 className="max-w-5xl font-serif text-[4rem] font-normal leading-[0.92] tracking-normal md:text-[7.6rem]">
                A quieter way to find wellness in London.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-[#fbf8f1]/80 md:text-lg">
                An edited guide to saunas, cold plunges, cryotherapy and recovery studios, chosen for atmosphere, practical detail and the feeling of return.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              The edit
            </p>
            <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">
              Less noise. Better choices.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-9 text-[#70695d]">
            Wellness discovery is usually crowded with claims, prices and booking links. Wellness London slows that down, placing each venue in context so you can understand whether it suits your ritual, your budget and your mood.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-10 border-y border-[#d8cebf]/70 py-12 md:grid-cols-3">
          {categoryLinks.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group block"
            >
              <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                Guide
              </p>
              <h2 className="mb-4 font-serif text-4xl font-normal tracking-normal">
                {category.label}
              </h2>
              <p className="max-w-sm text-sm leading-7 text-[#70695d]">
                {category.description}
              </p>
              <span className="mt-6 inline-block text-sm text-[#29241d] underline underline-offset-4 transition group-hover:translate-x-1">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div className="relative min-h-[520px] overflow-hidden bg-[#d8cebf]">
            {heroImage ? (
              <Image
                src={heroImage.url}
                alt={heroImage.filename}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
              Curation standard
            </p>
            <blockquote className="font-serif text-4xl font-normal leading-tight md:text-6xl">
              “A useful wellness guide should feel as considered as the places it recommends.”
            </blockquote>
            <div className="mt-10 grid gap-8">
              {curationStandards.map((standard) => (
                <article key={standard.title}>
                  <h3 className="mb-2 text-sm uppercase tracking-[0.18em] text-[#29241d]">{standard.title}</h3>
                  <p className="max-w-xl text-sm leading-7 text-[#70695d]">{standard.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">
                Directory
              </p>
              <h2 className="font-serif text-5xl font-normal leading-tight md:text-7xl">
                Curated spaces
              </h2>
            </div>
            <div className="max-w-xl text-sm leading-7 text-[#70695d]">
              <p>
                {facilities.length || "Soon"} listings across {serviceCount || 3} recovery categories, with best-for notes, pricing cues and checked details where available.
              </p>
            </div>
          </div>

          {facilities.length > 0 ? (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">
              {facilities.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={toDirectoryFacility(facility)}
                  source="homepage"
                />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl bg-[#fbf8f1] p-8">
              <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">
                Directory coming soon
              </p>
              <h3 className="mb-4 font-serif text-4xl font-normal tracking-normal">
                We are refreshing the live listings
              </h3>
              <p className="text-sm leading-7 text-[#70695d]">
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
