import Link from "next/link";
import { getServiceHubHref } from "@/lib/service-hubs";

type FacilityEditorialSectionsProps = {
  summary: string;
  atmosphere: string;
  editorialReasons: string[];
  bestFor: string[];
  experienceHighlights: string[];
  servicesOffered: string[];
  priceFrom?: string;
  premiumLevel?: string;
  priceNotes?: string;
  privateOrShared?: string;
  bookingRequired?: string;
  beginnerFriendly?: string;
  towelsIncluded?: string;
  showersAvailable?: string;
  changingRooms?: string;
  openingHours?: string;
  saunaDetails?: string[];
  coldPlungeDetails?: string[];
  cryotherapyDetails?: string[];
  lastChecked: string;
};

function displayValue(value?: string | string[]) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value || "Details not yet confirmed";
}

function DetailRow({ label, value }: { label: string; value?: string | string[] }) {
  return (
    <div className="grid gap-2 border-t border-[#d8cebf]/70 py-4 md:grid-cols-[0.38fr_0.62fr]">
      <dt className="text-[11px] uppercase tracking-[0.18em] text-[#6f6048]">{label}</dt>
      <dd className="break-words text-sm leading-6 text-[#29241d]">{displayValue(value)}</dd>
    </div>
  );
}

export default function FacilityEditorialSections({
  summary,
  atmosphere,
  editorialReasons,
  bestFor,
  experienceHighlights,
  servicesOffered,
  priceFrom,
  premiumLevel,
  priceNotes,
  privateOrShared,
  bookingRequired,
  beginnerFriendly,
  towelsIncluded,
  showersAvailable,
  changingRooms,
  openingHours,
  saunaDetails,
  coldPlungeDetails,
  cryotherapyDetails,
  lastChecked,
}: FacilityEditorialSectionsProps) {
  const visibleBestFor = bestFor.length ? bestFor.slice(0, 5) : experienceHighlights.slice(0, 5);
  const visibleHighlights = Array.from(new Set([...experienceHighlights, ...servicesOffered])).filter(Boolean).slice(0, 10);

  return (
    <>
      <section className="px-5 py-12 sm:px-6 sm:py-18 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048] sm:mb-5">The Well+ perspective</p>
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl md:text-7xl">Understand the feel, not just the facilities.</h2>
          </div>
          <div className="space-y-7">
            <div className="space-y-5 text-lg leading-8 text-[#70695d] sm:text-xl sm:leading-10">
              <p>{summary}</p>
              <p className="text-base leading-8 sm:text-lg sm:leading-9">Atmosphere: {atmosphere}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {editorialReasons.map((reason) => (
                <p key={reason} className="border-t border-[#d8cebf]/70 pt-4 text-sm leading-7 text-[#5f574c]">
                  {reason}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8cebf]/70 px-5 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048] sm:mb-5">Best for</p>
            <h2 className="mb-5 font-serif text-3xl font-normal leading-tight tracking-[-0.035em] sm:text-5xl">Who this may work for</h2>
            {visibleBestFor.length ? (
              <ul className="space-y-3 text-base leading-7 text-[#70695d]">
                {visibleBestFor.map((item) => <li key={item}>— {item}</li>)}
              </ul>
            ) : (
              <p className="text-base leading-8 text-[#70695d]">Best-fit notes are still being refined for this profile.</p>
            )}
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048] sm:mb-5">Experience signals</p>
            <div className="flex flex-wrap gap-2">
              {visibleHighlights.map((item) => {
                const serviceHref = getServiceHubHref(item);
                return serviceHref ? (
                  <Link key={item} href={serviceHref} className="bg-[#eee8dd] px-3 py-1.5 text-[11px] font-medium leading-none text-[#4e463c] transition hover:bg-[#e3dbcf]">
                    {item}
                  </Link>
                ) : (
                  <span key={item} className="bg-[#eee8dd] px-3 py-1.5 text-[11px] font-medium leading-none text-[#4e463c]">{item}</span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-16 text-[#fbf8f1] sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">Planning your visit</p>
          <h2 className="mb-10 max-w-3xl font-serif text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl md:text-6xl">The practical details, condensed.</h2>
          <div className="grid gap-10 lg:grid-cols-2">
            <article>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#d8cebf]">At a glance</p>
              <dl className="[&_dd]:text-[#fbf8f1] [&_dt]:text-[#d8cebf]">
                <DetailRow label="Services" value={servicesOffered} />
                <DetailRow label="Price from" value={priceFrom} />
                <DetailRow label="Price level" value={premiumLevel} />
                <DetailRow label="Pricing note" value={priceNotes} />
                <DetailRow label="Private/shared" value={privateOrShared} />
                <DetailRow label="Booking" value={bookingRequired} />
                <DetailRow label="Beginner-friendly" value={beginnerFriendly} />
                <DetailRow label="Last checked" value={lastChecked} />
              </dl>
            </article>
            <article>
              <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#d8cebf]">Facilities</p>
              <dl className="[&_dd]:text-[#fbf8f1] [&_dt]:text-[#d8cebf]">
                <DetailRow label="Towels" value={towelsIncluded} />
                <DetailRow label="Showers" value={showersAvailable} />
                <DetailRow label="Changing rooms" value={changingRooms} />
                <DetailRow label="Opening hours" value={openingHours} />
                <DetailRow label="Sauna" value={saunaDetails} />
                <DetailRow label="Cold plunge" value={coldPlungeDetails} />
                <DetailRow label="Cryotherapy" value={cryotherapyDetails} />
              </dl>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
