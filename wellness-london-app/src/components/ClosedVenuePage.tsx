import Link from "next/link";
import type { ClosedVenue } from "@/lib/closed-venues";

export default function ClosedVenuePage({ venue }: { venue: ClosedVenue }) {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-10 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-[#70695d]">
            <Link href="/" className="underline-offset-4 hover:text-[#29241d] hover:underline">Home</Link>
            <span>/</span>
            <Link href="/explore" className="underline-offset-4 hover:text-[#29241d] hover:underline">Venues</Link>
            <span>/</span>
            <span aria-current="page" className="text-[#29241d]">{venue.name}</span>
          </nav>

          <div className="max-w-3xl">
            <p className="editorial-eyebrow mb-4">Closed venue · {venue.location}</p>
            <h1 className="font-serif text-[3.2rem] font-normal leading-[0.94] tracking-[-0.06em] sm:text-6xl md:text-7xl">
              {venue.name} has closed.
            </h1>
            <p className="mt-7 text-lg leading-8 text-[#5f574c] sm:text-xl sm:leading-9">
              {venue.closureCopy}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8cebf] bg-[#fbf8f1] px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="editorial-eyebrow mb-3">What to do instead</p>
              <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
                Find a current London alternative.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#5f574c] sm:text-base">
                Closed venues are removed from the active Well+ directory. Use these live guides to compare services and places that are currently listed.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {venue.serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="surface-paper group flex min-h-40 flex-col justify-between rounded-[1rem] p-5 transition hover:-translate-y-0.5 hover:border-[#6f6048] hover:bg-[#fffaf0]"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">Current guide</span>
                  <span className="mt-5 block font-serif text-2xl leading-tight tracking-[-0.035em]">{link.label}</span>
                  <span className="mt-5 text-sm underline underline-offset-4">Explore live options →</span>
                </Link>
              ))}
              <Link
                href="/explore"
                className="surface-paper group flex min-h-40 flex-col justify-between rounded-[1rem] p-5 transition hover:-translate-y-0.5 hover:border-[#6f6048] hover:bg-[#fffaf0]"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a7f70]">All venues</span>
                <span className="mt-5 block font-serif text-2xl leading-tight tracking-[-0.035em]">Browse the current directory</span>
                <span className="mt-5 text-sm underline underline-offset-4">Explore venues →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
