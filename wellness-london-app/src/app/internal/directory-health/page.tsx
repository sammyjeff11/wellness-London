import type { Metadata } from "next";
import Link from "next/link";
import health from "@/data/generated/directory-health.json";

export const metadata: Metadata = {
  title: "Directory health | Well+ internal",
  robots: { index: false, follow: false, nocache: true },
};

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-[1.1rem] border border-[#b9ab97] bg-[#fbf8f1] p-5">
      <p className="font-serif text-4xl tracking-[-0.05em] text-[#29241d]">{value}</p>
      <p className="mt-2 text-sm text-[#70695d]">{label}</p>
    </div>
  );
}

export default function DirectoryHealthPage() {
  const generated = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(health.generatedAt));

  return (
    <main className="min-h-screen bg-[#f4efe6] px-5 py-10 text-[#29241d] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 border-b border-[#b9ab97] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-eyebrow">Internal directory intelligence</p>
            <h1 className="mt-4 font-serif text-5xl font-normal tracking-[-0.055em] sm:text-7xl">Directory health.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f574c]">A current view of data coverage, freshness and the profiles that deserve research time first.</p>
          </div>
          <div className="text-sm leading-6 text-[#70695d]">
            <p>Snapshot: {generated}</p>
            <Link href="/explore" className="underline underline-offset-4">Open the directory</Link>
          </div>
        </div>

        <section className="grid gap-3 py-8 sm:grid-cols-2 lg:grid-cols-5" aria-label="Directory summary">
          <Metric value={health.summary.publishedVenues} label="Published venues" />
          <Metric value={health.summary.neighbourhoods} label="Neighbourhoods" />
          <Metric value={health.summary.services} label="Service labels" />
          <Metric value={`${health.summary.averageCompleteness}%`} label="Average completeness" />
          <Metric value={health.summary.staleVenues} label="Stale profiles" />
        </section>

        <section className="grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="editorial-eyebrow">Coverage</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.045em]">What is reliably known.</h2>
            <div className="mt-6 space-y-4">
              {health.fields.map((field) => (
                <div key={field.key}>
                  <div className="mb-1.5 flex justify-between gap-4 text-sm">
                    <span>{field.label}</span>
                    <span className="text-[#70695d]">{field.percentage}% · {field.missing} missing</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#ded4c5]" role="progressbar" aria-label={`${field.label} completeness`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={field.percentage}>
                    <div className="h-full rounded-full bg-[#29241d]" style={{ width: `${field.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] bg-[#29241d] p-6 text-[#fbf8f1] sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#c8baa6]">Research queue</p>
            <h2 className="mt-3 font-serif text-4xl tracking-[-0.045em]">Fix the weakest profiles first.</h2>
            <div className="mt-6 divide-y divide-[#62584c]">
              {health.lowestCompleteness.slice(0, 8).map((venue) => (
                <div key={venue.slug} className="flex items-start justify-between gap-5 py-3">
                  <div>
                    <Link href={`/facility/${venue.slug}`} className="text-sm font-medium underline-offset-4 hover:underline">{venue.name}</Link>
                    <p className="mt-1 text-xs leading-5 text-[#c8baa6]">{venue.missing.length ? `Missing: ${venue.missing.join(", ")}` : "Complete across tracked fields"}</p>
                  </div>
                  <span className="shrink-0 text-sm">{venue.completeness}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#b9ab97] py-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-eyebrow">Coverage shape</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.045em]">Where the directory is strongest.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#70695d]">Public statistics should only use groups with at least {health.thresholds.publishableSampleSize} venues and fields with at least {health.thresholds.publishableFieldCompleteness}% completeness.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[1.1rem] border border-[#d8cebf] bg-[#fbf8f1] p-5">
              <h3 className="text-lg font-medium">Areas</h3>
              <div className="mt-4 divide-y divide-[#e3d9cb]">
                {health.coverage.areas.map((area) => <div key={area.name} className="flex justify-between py-2.5 text-sm"><span>{area.name}</span><span className="text-[#70695d]">{area.count}</span></div>)}
              </div>
            </div>
            <div className="rounded-[1.1rem] border border-[#d8cebf] bg-[#fbf8f1] p-5">
              <h3 className="text-lg font-medium">Most represented services</h3>
              <div className="mt-4 divide-y divide-[#e3d9cb]">
                {health.coverage.services.slice(0, 10).map((service) => <div key={service.name} className="flex justify-between py-2.5 text-sm"><span>{service.name}</span><span className="text-[#70695d]">{service.count}</span></div>)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
