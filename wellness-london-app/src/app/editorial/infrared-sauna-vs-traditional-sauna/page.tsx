import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Infrared Sauna vs Traditional Sauna in London | Well+ Editorial",
  description:
    "A practical Well+ Editorial guide to choosing between infrared sauna and traditional sauna in London.",
  alternates: { canonical: "/editorial/infrared-sauna-vs-traditional-sauna" },
  openGraph: {
    title: "Infrared Sauna vs Traditional Sauna in London | Well+ Editorial",
    description:
      "Understand the difference between infrared and traditional sauna, then choose the right London sauna experience for your recovery ritual.",
    url: absoluteUrl("/editorial/infrared-sauna-vs-traditional-sauna"),
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Infrared Sauna vs Traditional Sauna in London",
  description: "A Well+ Editorial guide to choosing between infrared sauna and traditional sauna in London.",
  author: { "@type": "Organization", name: "Well+" },
  publisher: { "@type": "Organization", name: "Well+" },
  mainEntityOfPage: absoluteUrl("/editorial/infrared-sauna-vs-traditional-sauna"),
  about: ["Infrared sauna", "Traditional sauna", "Sauna", "London wellness", "Recovery"],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Editorial", item: absoluteUrl("/editorial") },
    {
      "@type": "ListItem",
      position: 3,
      name: "Infrared Sauna vs Traditional Sauna",
      item: absoluteUrl("/editorial/infrared-sauna-vs-traditional-sauna"),
    },
  ],
};

const comparisonRows = [
  {
    label: "Intensity",
    text: "Traditional sauna usually feels like the fuller heat-room experience. Infrared is often positioned as a quieter, more controlled session.",
  },
  {
    label: "Setting",
    text: "Traditional sauna is often part of a gym, spa, bathhouse or contrast space. Infrared is commonly offered as a private cabin or appointment-led treatment.",
  },
  {
    label: "Best use",
    text: "Traditional sauna suits a fuller ritual, especially with cold plunge. Infrared suits a calmer reset where privacy and consistency matter.",
  },
  {
    label: "First visit",
    text: "Infrared may feel less intimidating for some first timers. Traditional sauna may feel more familiar if you already know spa or gym heat rooms.",
  },
];

export default function InfraredVsTraditionalSaunaPage() {
  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />

      <article>
        <section className="relative isolate overflow-hidden bg-[#29241d] text-[#fbf8f1]">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#fbf8f1_1px,transparent_1px),linear-gradient(#fbf8f1_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-24 lg:py-28">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-[#fbf8f1]/62">
              <Link href="/" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Home</Link>
              <span>/</span>
              <Link href="/editorial" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Editorial</Link>
            </nav>

            <div className="mt-16 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div>
                <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-[#cbbda8]">Well+ Editorial · Sauna Guide 001</p>
                <h1 className="font-serif text-[4rem] font-normal leading-[0.86] tracking-[-0.035em] sm:text-8xl lg:text-[7.2rem]">
                  Infrared sauna vs traditional sauna.
                </h1>
              </div>
              <div className="border-t border-[#fbf8f1]/16 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="max-w-md text-lg leading-8 text-[#fbf8f1]/74 sm:text-xl sm:leading-9">
                  A practical guide to choosing the right London sauna experience — based on session style, intensity, privacy and the kind of ritual you want to repeat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.32fr_0.68fr]">
            <aside>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Editorial note</p>
            </aside>
            <div className="max-w-3xl">
              <p className="font-serif text-3xl font-normal leading-[1.16] tracking-[-0.02em] text-[#29241d] sm:text-4xl">
                Both infrared and traditional sauna can belong in a good recovery routine. The better choice depends less on which is “best” and more on the experience you are actually looking for.
              </p>
              <div className="mt-8 space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
                <p>
                  Traditional sauna is usually the classic heat-room ritual: hotter, more atmospheric, and often part of a spa, gym, bathhouse or contrast therapy space. Infrared sauna is typically quieter and more controlled, often booked as a private cabin or treatment-style session.
                </p>
                <p>
                  For London users, the practical question is simple: do you want a fuller heat-room experience, a heat-and-cold ritual, or a calmer private reset?
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-6xl border-y border-[#29241d]/18 py-8">
            <div className="mb-8 grid gap-5 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">The quick answer</p>
              <h2 className="font-serif text-[3rem] font-normal leading-[0.92] tracking-[-0.03em] sm:text-6xl">
                Choose by session style.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[1.4rem] border border-[#d8cebf]/80 bg-[#d8cebf]/80 md:grid-cols-2">
              <div className="bg-[#fbf8f1] p-6 sm:p-7">
                <p className="mb-8 text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Choose infrared sauna if</p>
                <h3 className="font-serif text-4xl font-normal leading-[1] tracking-[-0.02em]">You want a quieter, more controlled reset.</h3>
                <p className="mt-5 text-base leading-8 text-[#5f574c]">
                  Infrared is often the easier choice for a private, appointment-style session where calm, consistency and comfort matter more than a larger heat-room atmosphere.
                </p>
              </div>

              <div className="bg-[#fbf8f1] p-6 sm:p-7">
                <p className="mb-8 text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Choose traditional sauna if</p>
                <h3 className="font-serif text-4xl font-normal leading-[1] tracking-[-0.02em]">You want a fuller heat-room ritual.</h3>
                <p className="mt-5 text-base leading-8 text-[#5f574c]">
                  Traditional sauna is usually the stronger fit if you want the classic heat-room experience, a social or spa setting, or sauna paired with cold plunge.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 grid gap-5 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Comparison</p>
              <h2 className="font-serif text-[3rem] font-normal leading-[0.92] tracking-[-0.03em] sm:text-6xl">
                How they feel different in practice.
              </h2>
            </div>

            <div className="divide-y divide-[#29241d]/18 border-y border-[#29241d]/18">
              {comparisonRows.map((row) => (
                <div key={row.label} className="grid gap-4 py-6 sm:grid-cols-[0.26fr_0.74fr] sm:py-7">
                  <h3 className="font-serif text-3xl font-normal leading-[1] tracking-[-0.02em]">{row.label}</h3>
                  <p className="max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">{row.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 pt-6 sm:px-6 sm:pb-24">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-[#29241d] p-6 text-[#fbf8f1] sm:p-8 lg:grid-cols-[0.32fr_0.68fr]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#fbf8f1]/58">Continue exploring</p>
            </div>
            <div>
              <h2 className="font-serif text-4xl font-normal leading-[1] tracking-[-0.02em] sm:text-5xl">
                Compare the guide against live London listings.
              </h2>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/infrared-sauna-london" className="rounded-full border border-[#fbf8f1]/22 px-4 py-2 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">Explore infrared sauna</Link>
                <Link href="/sauna-london" className="rounded-full border border-[#fbf8f1]/22 px-4 py-2 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">Explore sauna directory</Link>
                <Link href="/editorial/best-saunas-london" className="rounded-full border border-[#fbf8f1]/22 px-4 py-2 text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d]">Read best saunas</Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
