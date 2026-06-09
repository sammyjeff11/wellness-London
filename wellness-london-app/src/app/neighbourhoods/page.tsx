import Link from "next/link";
import { neighbourhoodPages } from "@/lib/neighbourhood-pages";

export const metadata = {
  title: "London Wellness Neighbourhood Guides | Well+",
  description:
    "Explore concise Well+ guides to London wellness neighbourhoods including Shoreditch, Canary Wharf, Kensington, Marylebone, Notting Hill, Soho and Hampstead.",
  alternates: { canonical: "/neighbourhoods" },
};

export default function NeighbourhoodsPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <p className="editorial-eyebrow mb-4">London wellness neighbourhoods</p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            Explore wellness by London neighbourhood.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f574c] sm:text-lg">
            A concise edit of London areas with a distinct wellness rhythm — from central recovery rituals to calmer, slower spaces across the city.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 md:pb-20">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {neighbourhoodPages.map((area) => (
            <Link
              key={area.slug}
              href={area.href}
              className="group rounded-[1.35rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 transition hover:-translate-y-[1px] hover:bg-[#eee7da] sm:p-8"
            >
              <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-[#8d7d67]">{area.eyebrow}</p>
              <h2 className="mb-4 font-serif text-4xl font-normal tracking-[-0.04em] group-hover:underline group-hover:underline-offset-4">
                {area.shortTitle}
              </h2>
              <p className="text-sm leading-7 text-[#5f574c]">{area.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
