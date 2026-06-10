import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SafeImage from "@/components/SafeImage";
import { getFacilities } from "@/lib/airtable";
import { facilityHasCollectionService } from "@/lib/collections";
import { dedupeFacilities } from "@/lib/dedupe-facilities";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";

export const metadata: Metadata = {
  title: "Infrared Sauna vs Traditional Sauna in London | Well+ Editorial",
  description:
    "A practical Well+ Editorial guide to choosing between infrared sauna and traditional sauna in London, with links to relevant sauna venues and directory pages.",
  alternates: { canonical: "/editorial/infrared-sauna-vs-traditional-sauna" },
  openGraph: {
    title: "Infrared Sauna vs Traditional Sauna in London | Well+ Editorial",
    description:
      "Understand the difference between infrared and traditional sauna, then choose the right London sauna experience for your recovery ritual.",
    url: absoluteUrl("/editorial/infrared-sauna-vs-traditional-sauna"),
    type: "article",
  },
};

function getHeroImage(facilities: ServiceDirectoryFacility[]) {
  const withImage = facilities.find((facility) => facility.galleryImages?.some((image) => image.url) || facility.imageUrl);
  return withImage?.galleryImages?.find((image) => image.url)?.url || withImage?.imageUrl;
}

function getLocationLine(facility: ServiceDirectoryFacility) {
  return [facility.neighbourhood || facility.location, facility.areaOfLondon || facility.areaGroup].filter(Boolean).join(" · ");
}

function articleJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Infrared Sauna vs Traditional Sauna in London",
    description:
      "A Well+ Editorial guide to choosing between infrared sauna and traditional sauna in London.",
    author: { "@type": "Organization", name: "Well+" },
    publisher: { "@type": "Organization", name: "Well+" },
    mainEntityOfPage: absoluteUrl("/editorial/infrared-sauna-vs-traditional-sauna"),
    about: ["Infrared sauna", "Traditional sauna", "Sauna", "London wellness", "Recovery"],
  };
}

function breadcrumbJsonLd() {
  return {
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
}

function VenueStrip({ title, facilities }: { title: string; facilities: ServiceDirectoryFacility[] }) {
  if (!facilities.length) return null;

  return (
    <div className="mt-8 border-t border-[#29241d]/18 pt-5">
      <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">{title}</p>
      <div className="grid gap-px overflow-hidden rounded-[1.2rem] border border-[#d8cebf]/80 bg-[#d8cebf]/80 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.slice(0, 3).map((facility) => (
          <Link key={facility.slug} href={`/facility/${facility.slug}`} className="group bg-[#fbf8f1] p-5 transition hover:bg-[#29241d] hover:text-[#fbf8f1]">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8d7d67] transition group-hover:text-[#cbbda8]">
              {getLocationLine(facility) || "London"}
            </p>
            <h3 className="mt-4 font-serif text-3xl font-normal leading-[1] tracking-[-0.02em]">{facility.name}</h3>
            <p className="mt-4 text-sm leading-6 text-[#5f574c] transition group-hover:text-[#fbf8f1]/72">
              {facility.services?.slice(0, 3).join(" · ") || "Sauna"}
            </p>
            <p className="mt-6 text-sm underline underline-offset-4">Read profile →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function InfraredVsTraditionalSaunaPage() {
  const facilities = await getFacilities();
  const directoryFacilities = dedupeFacilities(facilities.map(toDirectoryFacility));
  const infraredFacilities = directoryFacilities.filter((facility) => facilityHasCollectionService(facility, "infrared-sauna"));
  const traditionalFacilities = directoryFacilities.filter(
    (facility) => facilityHasCollectionService(facility, "sauna") && !facilityHasCollectionService(facility, "infrared-sauna"),
  );
  const allSaunaFacilities = [...infraredFacilities, ...traditionalFacilities];
  const heroImage = getHeroImage(allSaunaFacilities);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <JsonLd data={[articleJsonLd(), breadcrumbJsonLd()]} />

      <article>
        <section className="relative isolate overflow-hidden bg-[#29241d] text-[#fbf8f1]">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#fbf8f1_1px,transparent_1px),linear-gradient(#fbf8f1_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="relative mx-auto grid max-w-[1500px] lg:min-h-[690px] lg:grid-cols-[0.98fr_1.02fr]">
            <div className="flex flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
              <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-[#fbf8f1]/62">
                <Link href="/" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Home</Link>
                <span>/</span>
                <Link href="/editorial" className="underline-offset-4 hover:text-[#fbf8f1] hover:underline">Editorial</Link>
              </nav>

              <div className="mt-20 max-w-3xl lg:mt-0">
                <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-[#cbbda8]">Well+ Editorial · Sauna Guide 001</p>
                <h1 className="font-serif text-[3.75rem] font-normal leading-[0.86] tracking-[-0.04em] sm:text-7xl lg:text-[7.6rem]">
                  Infrared sauna vs traditional sauna.
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-8 text-[#fbf8f1]/74 sm:text-xl sm:leading-9">
                  A practical guide to choosing the right London sauna experience — based on session style, intensity, setting and what you want the visit to do.
                </p>
              </div>

              <div className="mt-14 grid gap-4 border-t border-[#fbf8f1]/16 pt-5 text-sm leading-6 text-[#fbf8f1]/68 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Use case</p>
                  <p>Choosing a sauna type</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Best for</p>
                  <p>First timers and comparison</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/42">Directory links</p>
                  <p>Sauna and infrared sauna</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[390px] border-t border-[#fbf8f1]/16 lg:border-l lg:border-t-0">
              {heroImage ? (
                <SafeImage
                  src={heroImage}
                  alt="Sauna experience in London"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover grayscale-[18%]"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(251,248,241,0.16),transparent_28%),linear-gradient(145deg,rgba(111,96,72,0.62),rgba(41,36,29,0.96))]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#29241d]/78 via-[#29241d]/22 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
                <p className="max-w-md font-serif text-3xl font-normal leading-[1.05] tracking-[-0.02em] text-[#fbf8f1] sm:text-4xl">
                  The best choice is less about which is “better” and more about which ritual you will actually repeat.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.32fr_0.68fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 border-l border-[#29241d]/18 pl-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Editorial note</p>
                <p className="mt-5 max-w-xs font-serif text-2xl font-normal leading-[1.08] tracking-[-0.02em] text-[#29241d]">
                  This is a decision guide, not a medical recommendation or a ranking of heat types.
                </p>
              </div>
            </aside>

            <div className="max-w-3xl">
              <p className="font-serif text-3xl font-normal leading-[1.16] tracking-[-0.02em] text-[#29241d] sm:text-4xl">
                Infrared and traditional sauna can both sit inside a good recovery routine, but they usually suit different kinds of visit.
              </p>
              <div className="mt-8 space-y-6 text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">
                <p>
                  A traditional sauna is often what people picture first: a hotter shared or private heat room, usually tied to a spa, gym, bathhouse or contrast therapy setting. Infrared sauna is typically positioned as a quieter, more controlled session, often in a private cabin or treatment-style room.
                </p>
                <p>
                  For London users, the real decision is rarely technical. It is practical: do you want a social heat room, a post-training ritual, a private reset, or an easier first sauna experience?
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-8 sm:px-6 sm:pb-14">
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
                  Infrared is often the easier choice for a private, appointment-style session. It can suit users who care more about calm, consistency and comfort than the atmosphere of a larger heat room.
                </p>
              </div>

              <div className="bg-[#fbf8f1] p-6 sm:p-7">
                <p className="mb-8 text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Choose traditional sauna if</p>
                <h3 className="font-serif text-4xl font-normal leading-[1] tracking-[-0.02em]">You want a fuller heat-room ritual.</h3>
                <p className="mt-5 text-base leading-8 text-[#5f574c]">
                  Traditional sauna is usually the stronger fit if you want the classic heat-room experience, a social or spa setting, or a sauna session paired with cold plunge and wider recovery facilities.
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
              {[
                ["Intensity", "Traditional sauna is often perceived as the more intense heat-room experience. Infrared is often framed as more controlled and private."],
                ["Setting", "Traditional sauna is commonly part of a spa, gym, bathhouse or contrast therapy space. Infrared is often offered as a private cabin or treatment-led session."],
                ["Best use", "Traditional sauna suits a fuller ritual, especially with cold plunge. Infrared suits a quieter reset where privacy and consistency matter."],
                ["First visit", "Infrared may feel less intimidating for some first timers. Traditional sauna may feel more familiar if you already know spa or gym heat rooms."],
              ].map(([label, text]) => (
                <div key={label} className="grid gap-4 py-6 sm:grid-cols-[0.26fr_0.74fr] sm:py-7">
                  <h3 className="font-serif text-3xl font-normal leading-[1] tracking-[-0.02em]">{label}</h3>
                  <p className="max-w-3xl text-base leading-8 text-[#5f574c] sm:text-lg sm:leading-9">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#8d7d67]">Where to start</p>
              </div>
              <div>
                <h2 className="font-serif text-[3rem] font-normal leading-[0.92] tracking-[-0.03em] sm:text-6xl">
                  Start with the experience you want.
                </h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-3">
                  <div className="border-t border-[#29241d]/18 pt-5">
                    <h3 className="font-serif text-2xl font-normal">Private reset</h3>
                    <p className="mt-3 text-sm leading-6 text-[#5f574c]">Look first at infrared sauna or smaller appointment-led sauna spaces.</p>
                  </div>
                  <div className="border-t border-[#29241d]/18 pt-5">
                    <h3 className="font-serif text-2xl font-normal">Contrast ritual</h3>
                    <p className="mt-3 text-sm leading-6 text-[#5f574c]">Prioritise venues that combine sauna and cold plunge in the same visit.</p>
                  </div>
                  <div className="border-t border-[#29241d]/18 pt-5">
                    <h3 className="font-serif text-2xl font-normal">Premium setting</h3>
                    <p className="mt-3 text-sm leading-6 text-[#5f574c]">Choose by the wider room, facilities and atmosphere, not the heat type alone.</p>
                  </div>
                </div>

                <VenueStrip title="Infrared sauna options from the directory" facilities={infraredFacilities} />
                <VenueStrip title="Traditional sauna options from the directory" facilities={traditionalFacilities} />
              </div>
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
