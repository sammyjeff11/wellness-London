import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import JsonLd from "@/components/JsonLd";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { absoluteUrl } from "@/lib/site";

type Pick = { slug: string; reason: string; check: string };
export default async function ResearchedShortlist({ title, description, path, serviceHref, picks }: {
  title: string; description: string; path: string; serviceHref: string; picks: Pick[];
}) {
  const facilities = await getFacilities();
  const selected = picks.flatMap((pick) => {
    const facility = facilities.find((venue) => venue.slug === pick.slug);
    return facility ? [{ pick, facility }] : [];
  });
  return <main className="bg-[#f4efe6] px-5 py-8 text-[#29241d] sm:px-6 sm:py-12">
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="mb-6 flex gap-2 text-sm"><Link href="/editorial" className="underline">Editorial</Link><span aria-hidden="true">/</span><span>Researched shortlist</span></nav>
      <header className="max-w-3xl">
        <p className="editorial-eyebrow">Well+ researched shortlist</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-[#5f574c]">{description}</p>
        <p className="mt-4 text-sm leading-7">Published by Well+. These selections compare published formats and practical differences. They are not first-hand reviews or a ranking of treatment quality. Each listing shows its own information-check date.</p>
        <div className="mt-5 flex flex-wrap gap-3"><Link href={serviceHref} className="inline-flex min-h-12 items-center rounded-full bg-[#29241d] px-5 text-sm text-[#fbf8f1]">Compare the full directory →</Link><Link href="/shortlist" className="inline-flex min-h-12 items-center rounded-full border border-[#b9ab97] px-5 text-sm">Saved venues & comparison</Link></div>
      </header>
      <section aria-labelledby="selection-method" className="mt-8 rounded-xl border border-[#d8cebf] bg-[#fbf8f1] p-5">
        <h2 id="selection-method" className="text-xl font-medium">How this shortlist was chosen</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7">We selected named venues to illustrate different booking formats, access conditions and locations. Inclusion requires a published operator source and an explicit relevant service. More complete records do not make a venue a quality winner. Order is editorial, not a score; no paid position is sold in this shortlist.</p>
        <Link href="/editorial-standards" className="mt-3 inline-block text-sm underline underline-offset-4">Read our sourcing and commercial standards</Link>
      </section>
      <div className="mt-8 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {selected.map(({ pick, facility }) => <section key={facility.slug} className="min-w-0">
          <FacilityCard facility={toDirectoryFacility(facility)} source="editorial_shortlist" />
          <div className="px-2 pt-4 text-sm leading-7"><h2 className="font-medium">Why it is included</h2><p>{pick.reason}</p><p className="mt-2"><strong>Before booking:</strong> {pick.check}</p><a href={facility.website} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline underline-offset-4">Operator source ↗</a></div>
        </section>)}
      </div>
      <section className="mt-12 max-w-3xl border-t border-[#d8cebf] pt-6">
        <h2 className="font-serif text-3xl">Choose the visit, not just the headline price.</h2>
        <p className="mt-4 text-base leading-8">Check the exact service, appointment length, private or shared format, what the price includes, cancellation terms and any introductory or membership conditions. A venue-wide starting price may cover a different service. Unconfirmed details remain visible in the comparison so you know what to ask the operator.</p>
        <p className="mt-3 text-sm leading-7">This guide compares places and booking information. It does not establish medical benefit or personal suitability. Follow the provider’s screening and eligibility process.</p>
        <Link href={serviceHref} className="mt-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4">See all published providers →</Link>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: absoluteUrl(path), publisher: { "@type": "Organization", name: "Well+", url: absoluteUrl() }, mainEntity: { "@type": "ItemList", itemListElement: selected.map(({facility}, index) => ({ "@type": "ListItem", position: index + 1, name: facility.name, url: absoluteUrl(`/facility/${facility.slug}`) })) } }} />
    </div>
  </main>;
}
