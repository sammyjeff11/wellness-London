import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { getPublishedMultiLocationBrands } from "@/lib/brand-pages";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wellness Brands With Multiple London Locations | Well+",
  description:
    "Compare multi-location wellness, recovery, fitness and diagnostic operators across London, then choose the branch that best fits your area and needs.",
  alternates: { canonical: "/brands" },
};

export default async function BrandsPage() {
  const brands = getPublishedMultiLocationBrands(await getFacilities());
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Wellness brands with multiple London locations",
    url: absoluteUrl("/brands"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: brands.length,
      itemListElement: brands.map(({ brand }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: brand.name,
        url: absoluteUrl(`/brand/${brand.slug}`),
      })),
    },
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={schema} />
      <section className="px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-[#6f6048]">
            <Link href="/" className="underline-offset-4 hover:underline">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/explore" className="underline-offset-4 hover:underline">Explore</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#29241d]">Brands</span>
          </nav>
          <p className="editorial-eyebrow mb-4">Compare by operator</p>
          <h1 className="max-w-4xl font-serif text-[3.4rem] font-normal leading-[0.92] tracking-[-0.05em] sm:text-7xl md:text-8xl">
            One brand. Different London locations.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">
            Start with the operator, then compare its published locations by neighbourhood, services and access. Each branch keeps its own venue page because facilities and booking details can differ.
          </p>
        </div>
      </section>

      <section className="surface-band-stone px-5 py-12 sm:px-6 sm:py-16" aria-labelledby="brands-heading">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#b9ab97]/70 pb-6">
            <div>
              <p className="editorial-eyebrow mb-3">Published coverage</p>
              <h2 id="brands-heading" className="font-serif text-4xl font-normal leading-none tracking-[-0.04em] sm:text-5xl">Multi-location brands.</h2>
            </div>
            <p className="text-sm text-[#5f574c]">{brands.length} operators with more than one listed location</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {brands.map(({ brand, facilities }) => {
              const areas = Array.from(new Set(facilities.map((facility) => facility.neighbourhood || facility.areaOfLondon).filter(Boolean))).slice(0, 4);
              const services = Array.from(new Set(facilities.flatMap((facility) => facility.servicesOffered))).slice(0, 4);

              return (
                <Link key={brand.slug} href={`/brand/${brand.slug}`} className="surface-paper group flex min-h-72 flex-col justify-between rounded-[1.2rem] p-6 transition hover:-translate-y-0.5 hover:border-[#6f6048] hover:bg-[#fffaf0] sm:p-7">
                  <span>
                    <span className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">
                      <span>{brand.eyebrow}</span>
                      <span>{facilities.length} locations</span>
                    </span>
                    <span className="mt-6 block font-serif text-4xl leading-none tracking-[-0.045em] sm:text-5xl">{brand.name}</span>
                    <span className="mt-4 block max-w-xl text-sm leading-7 text-[#5f574c]">{brand.intro}</span>
                  </span>
                  <span className="mt-7">
                    {services.length > 0 ? <span className="block text-sm text-[#6f6048]">{services.join(" · ")}</span> : null}
                    {areas.length > 0 ? <span className="mt-2 block text-xs leading-5 text-[#8d7d67]">{areas.join(" · ")}</span> : null}
                    <span className="mt-5 inline-block text-sm font-medium underline underline-offset-4">Compare locations →</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
