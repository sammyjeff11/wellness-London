import type { Metadata } from "next";
import Link from "next/link";
import VenueComparison from "@/components/VenueComparison";
import { getFacilities } from "@/lib/airtable";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";

export const metadata: Metadata = {
  title: "Compare London Wellness Venues | Well+",
  description: "Compare selected London wellness venues by price, access, services, facilities and booking details.",
  robots: { index: false, follow: true },
};

type ComparePageProps = {
  searchParams: Promise<{ venues?: string | string[] }>;
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { venues } = await searchParams;
  const initialSlugs = (Array.isArray(venues) ? venues[0] : venues || "")
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean)
    .slice(0, 4);
  const facilities = dedupeFacilities((await getFacilities()).map(toDirectoryFacility));

  return (
    <main className="min-h-screen bg-[#f4efe6] px-5 py-10 text-[#29241d] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-[1400px]">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-[#6f6048]">
          <Link href="/explore" className="underline-offset-4 hover:underline">Venues</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shortlist" className="underline-offset-4 hover:underline">Saved</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#29241d]">Compare</span>
        </nav>
        <div className="mb-8 max-w-4xl sm:mb-10">
          <p className="editorial-eyebrow">Side-by-side decisions</p>
          <h1 className="mt-4 font-serif text-5xl font-normal leading-[0.94] tracking-[-0.05em] sm:text-7xl">Compare venues.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#5f574c] sm:text-lg">See the practical differences together, then open the full profile before booking.</p>
        </div>
        <VenueComparison facilities={facilities} initialSlugs={initialSlugs} />
      </div>
    </main>
  );
}
