import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FacilityCard from "@/components/FacilityCard";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { getNeighbourhoodPage, neighbourhoodPages } from "@/lib/neighbourhood-pages";

export async function generateStaticParams() {
  return neighbourhoodPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getNeighbourhoodPage(slug);

  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.href },
  };
}

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

export default async function NeighbourhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getNeighbourhoodPage(slug);

  if (!page) notFound();

  const facilities = await getFacilities();
  const searchTerms = [page.shortTitle].map(normalise);
  const relatedFacilities = facilities
    .map(toDirectoryFacility)
    .filter((facility) => {
      const locationText = normalise(
        [facility.neighbourhood, facility.location, facility.areaOfLondon, facility.areaGroup]
          .filter(Boolean)
          .join(" ")
      );

      return searchTerms.some((term) => locationText.includes(term));
    })
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || (b.profileCompletenessScore || 0) - (a.profileCompletenessScore || 0))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-5xl">
          <p className="editorial-eyebrow mb-4">{page.eyebrow}</p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg">
            {page.intro}
          </p>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Best for</p>
            <div className="flex flex-wrap gap-2">
              {page.bestFor.map((tag) => (
                <span key={tag} className="rounded-full border border-[#d8cebf] px-3 py-1 text-xs text-[#5f574c]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Wellness in the area</p>
            <p className="text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">{page.character}</p>
          </div>
        </div>
      </section>

      {relatedFacilities.length > 0 ? (
        <section className="px-5 py-8 sm:px-6 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-eyebrow mb-3">Places to explore</p>
                <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                  Wellness spaces around {page.shortTitle}.
                </h2>
              </div>
              <Link href="/explore" className="w-fit text-sm font-medium underline underline-offset-4">
                View all venues
              </Link>
            </div>
            <div className="grid gap-5 sm:gap-7 md:grid-cols-3">
              {relatedFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source={`neighbourhood_${page.slug}`} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-8 sm:px-6 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">What to expect</p>
            <p className="mb-5 text-sm leading-7 text-[#5f574c] sm:text-base sm:leading-8">{page.summary}</p>
            <div className="space-y-4">
              {page.visitNotes.map((note) => (
                <p key={note} className="text-sm leading-7 text-[#5f574c]">
                  {note}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Continue exploring</p>
            <div className="flex flex-wrap gap-3">
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
