import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { brandPages, getBrandPageBySlug, getFacilitiesForBrand, facilityIsComingSoon } from "@/lib/brand-pages";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";

type BrandPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brandPages.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandPageBySlug(slug);
  if (!brand) return { title: "Brand not found | Well+ London" };

  return {
    title: brand.seoTitle,
    description: brand.seoDescription,
    alternates: { canonical: `/brand/${brand.slug}` },
    openGraph: {
      title: brand.seoTitle,
      description: brand.seoDescription,
      url: `/brand/${brand.slug}`,
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandPageBySlug(slug);
  if (!brand) notFound();

  const facilities = await getFacilities();
  const brandFacilities = getFacilitiesForBrand(facilities, brand);
  const uniqueBrandFacilities = dedupeFacilities(brandFacilities);
  const directoryFacilities = uniqueBrandFacilities.map(toDirectoryFacility);
  const liveFacilities = uniqueBrandFacilities.filter((facility) => !facilityIsComingSoon(facility));
  const comingSoonFacilities = uniqueBrandFacilities.filter(facilityIsComingSoon);
  const serviceSet = new Set<string>();
  uniqueBrandFacilities.forEach((facility) => facility.servicesOffered.forEach((service) => serviceSet.add(service)));
  const services = Array.from(serviceSet).slice(0, 8);
  const pageUrl = absoluteUrl(`/brand/${brand.slug}`);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: brand.seoTitle,
    description: brand.seoDescription,
    url: pageUrl,
    mainEntity: uniqueBrandFacilities.map((facility) => ({
      "@type": "HealthAndBeautyBusiness",
      name: facility.name,
      url: absoluteUrl(`/facility/${facility.slug}`),
      address: facility.address,
    })),
  };

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={collectionSchema} />

      <section className="px-4 pt-4 sm:px-5 md:px-8 md:pt-8">
        <div className="mx-auto max-w-[1400px] rounded-[1.35rem] bg-[#29241d] px-5 py-8 text-[#fbf8f1] sm:px-8 sm:py-12 md:rounded-[2rem] md:px-14 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#d8cebf]">
            <Link href="/" className="underline underline-offset-4 hover:text-white">Well+</Link>
            <span>/</span>
            <span>{brand.name}</span>
          </nav>
          <p className="mb-4 text-[10px] uppercase leading-5 tracking-[0.24em] text-[#d8cebf] sm:text-[11px] sm:tracking-[0.28em]">
            {brand.eyebrow}
          </p>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h1 className="font-serif text-5xl font-normal leading-[0.94] tracking-[-0.045em] sm:text-7xl md:text-8xl">
                {brand.name} locations in London.
              </h1>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-[#fbf8f1]/82 sm:text-xl sm:leading-9">{brand.intro}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {services.map((service) => (
                  <span key={service} className="rounded-full border border-[#fbf8f1]/22 px-3 py-1.5 text-xs text-[#fbf8f1]/82">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-4 border-b border-[#d8cebf]/70 pb-7 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div>
              <p className="editorial-eyebrow mb-3">Operator overview</p>
              <h2 className="font-serif text-4xl font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl">Where to book {brand.name}</h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">{brand.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.1rem] border border-[#d8cebf]/70 bg-[#fbf8f1] p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">London locations</p>
              <p className="mt-3 text-4xl font-medium tracking-[-0.04em]">{uniqueBrandFacilities.length}</p>
            </div>
            <div className="rounded-[1.1rem] border border-[#d8cebf]/70 bg-[#fbf8f1] p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Live now</p>
              <p className="mt-3 text-4xl font-medium tracking-[-0.04em]">{liveFacilities.length}</p>
            </div>
            <div className="rounded-[1.1rem] border border-[#d8cebf]/70 bg-[#fbf8f1] p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8d7d67]">Coming soon</p>
              <p className="mt-3 text-4xl font-medium tracking-[-0.04em]">{comingSoonFacilities.length}</p>
            </div>
          </div>
        </div>
      </section>

      {directoryFacilities.length > 0 ? (
        <section className="px-5 pb-14 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-5 sm:gap-8 md:grid-cols-3">
              {directoryFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source="brand_page" />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="px-5 pb-14 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-6xl rounded-[1.2rem] border border-[#d8cebf]/70 bg-[#fbf8f1] p-6">
            <p className="text-sm leading-7 text-[#5f574c]">We are still validating this operator&apos;s London locations.</p>
          </div>
        </section>
      )}
    </main>
  );
}
