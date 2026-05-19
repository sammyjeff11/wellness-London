import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNeighbourhoodPage, neighbourhoodPages } from "@/lib/neighbourhood-pages";

export async function generateStaticParams() {
  return neighbourhoodPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getNeighbourhoodPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.href },
  };
}

export default async function NeighbourhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getNeighbourhoodPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-5xl">
          <p className="editorial-eyebrow mb-4">{page.eyebrow}</p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.05em] sm:text-7xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5f574c]">
            {page.intro}
          </p>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.3rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Best for</p>
            <div className="flex flex-wrap gap-2">
              {page.bestFor.map((tag) => (
                <span key={tag} className="rounded-full border border-[#d8cebf] px-3 py-1 text-xs text-[#5f574c]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.3rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Neighbourhood character</p>
            <p className="text-base leading-8 text-[#5f574c]">{page.character}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 md:py-10">
        <div className="mx-auto max-w-6xl rounded-[1.35rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Overview</p>
          <p className="max-w-4xl text-lg leading-8 text-[#5f574c]">{page.summary}</p>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 md:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-[1.35rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Things to know</p>
            <div className="space-y-4">
              {page.visitNotes.map((note) => (
                <p key={note} className="text-sm leading-7 text-[#5f574c]">
                  {note}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-[#d8cebf]/75 bg-[#fbf8f1] p-6 sm:p-8">
            <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Explore related guides</p>
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

            <div className="mt-8">
              <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">Nearby areas</p>
              <div className="flex flex-wrap gap-2">
                {page.relatedAreas.map((area) => (
                  <span key={area} className="rounded-full bg-[#f4efe6] px-3 py-1 text-xs text-[#5f574c]">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
