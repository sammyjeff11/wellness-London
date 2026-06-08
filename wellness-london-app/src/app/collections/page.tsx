import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { collections } from "@/lib/collections";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Collections | Well+ London",
  description: "Curated best-of wellness collections for London saunas, cold plunges and recovery clubs.",
  alternates: { canonical: "/collections" },
};

const collectionItemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Well+ Collections",
  url: absoluteUrl("/collections"),
  itemListElement: collections.map((collection, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(collection.href),
    name: collection.title,
  })),
};

const collectionsBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Collections",
      item: absoluteUrl("/collections"),
    },
  ],
};

export default function CollectionsIndexPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={[collectionItemListJsonLd, collectionsBreadcrumbJsonLd]} />
      <section className="px-5 py-10 sm:px-6 sm:py-14 md:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="editorial-eyebrow mb-4">Curated collections</p>
            <h1 className="font-serif text-[3.1rem] font-normal leading-[0.96] tracking-[-0.055em] sm:text-6xl md:text-7xl">
              Start with the best options.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5f574c] sm:text-lg sm:leading-8">
              Editorial best-of pages for high-intent London wellness searches — built from the Well+ directory and kept separate from journal guides.
            </p>
          </div>

          <div className="mt-9 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={collection.href}
                className="group flex min-h-[18rem] min-w-[82%] snap-start flex-col justify-between rounded-[1.35rem] border border-[#d8cebf]/80 bg-[#fbf8f1] p-6 shadow-[0_18px_45px_rgba(41,36,29,0.04)] transition hover:-translate-y-[2px] hover:bg-[#eee7da] sm:min-w-0"
              >
                <div>
                  <p className="editorial-eyebrow mb-4">{collection.eyebrow}</p>
                  <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.045em] group-hover:underline group-hover:underline-offset-4 sm:text-4xl">
                    {collection.title}
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-[#5f574c] sm:text-base sm:leading-7">
                    {collection.heroText}
                  </p>
                </div>
                <span className="mt-8 inline-flex w-fit rounded-full border border-[#d8cebf] px-4 py-2 text-sm text-[#29241d] transition group-hover:border-[#29241d]">
                  View collection
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
