import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import HomeVenueSearch from "@/components/HomeVenueSearch";
import { getFacilities } from "@/lib/airtable";
import { toDirectoryFacility } from "@/lib/facility-presenters";
import { locationHubLinks } from "@/lib/location-hubs";
import { neighbourhoodPages } from "@/lib/neighbourhood-pages";
import { pillarPages } from "@/lib/pillar-pages";

export const metadata: Metadata = {
  title: "Well+ London | The London Wellness Edit",
  description:
    "Discover London's best wellness spaces, including saunas, cold plunges, bathhouses, recovery clubs, cryotherapy and longevity experiences with Well+.",
  alternates: { canonical: "/" },
};

const serviceLinks = [
  {
    href: "/sauna-london",
    label: "Saunas",
    description: "Infrared, traditional and private sauna spaces for heat-led recovery and reset.",
  },
  {
    href: "/cold-plunge-london",
    label: "Cold plunge",
    description: "Cold plunge, ice bath and cold exposure venues across London.",
  },
  {
    href: "/cryotherapy-london",
    label: "Cryotherapy",
    description: "Whole-body and localised cryotherapy spaces for structured recovery sessions.",
  },
  {
    href: "/contrast-therapy-london",
    label: "Contrast therapy",
    description: "Spaces combining heat and cold in one structured recovery session.",
  },
  {
    href: "/recovery-london",
    label: "Recovery spaces",
    description: "A broader guide to recovery clubs, studios and treatment-led spaces.",
  },
];

const venueTypeLinks = [
  { href: "/explore", title: "Bathhouses", text: "Thermal circuits, pools and longer-format bathing spaces." },
  { href: "/recovery-london", title: "Recovery studios", text: "Focused spaces for cold, compression, massage and post-training routines." },
  { href: "/longevity-london", title: "Longevity clinics", text: "Clinics and technology-led spaces for preventative wellbeing and optimisation." },
  { href: "/luxury-wellness-spaces-london", title: "Spas and hotel spas", text: "Polished venues for slower treatments, privacy and a higher-touch setting." },
];

const useCaseLinks = [
  {
    href: "/quiet-wellness-spaces-london",
    title: "Quiet recovery",
    text: "Calm spaces for switching off and rebuilding capacity.",
  },
  {
    href: "/recover",
    title: "Post-gym recovery",
    text: "Practical venues for heat, cold, compression and bodywork after training.",
  },
  {
    href: "/luxury-wellness-spaces-london",
    title: "Luxury reset",
    text: "Elevated spaces where setting, privacy and service matter.",
  },
  {
    href: "/beginner-friendly-wellness-london",
    title: "Beginner friendly",
    text: "Clear, accessible places to try a treatment without guesswork.",
  },
];

function selectionScore(facility: ReturnType<typeof toDirectoryFacility>) {
  return Number(facility.isFeatured) * 100 + (facility.profileCompletenessScore || 0);
}

export default async function Home() {
  const facilities = await getFacilities();
  const directoryFacilities = facilities.map(toDirectoryFacility);
  const selectedFacilities = [...directoryFacilities]
    .sort((a, b) => selectionScore(b) - selectionScore(a))
    .slice(0, Math.min(3, directoryFacilities.length));
  const heroImage = facilities.find((facility) => facility.images.length > 0)?.images[0];
  const featuredAreaLinks = locationHubLinks.slice(0, 5);
  const featuredNeighbourhoods = neighbourhoodPages.slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 pt-3 sm:px-6 md:pt-7">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.35rem] bg-[#211d17] shadow-[0_22px_70px_rgba(41,36,29,0.12)] sm:min-h-[76vh] md:rounded-[2.2rem]">
          <div className="relative h-[24vh] min-h-[150px] overflow-hidden sm:absolute sm:inset-0 sm:h-auto">
            {heroImage ? (
              <Image
                src={heroImage.url}
                alt={heroImage.filename || "Curated London wellness and recovery space"}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center sm:object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[#211d17] via-[#211d17]/26 to-transparent sm:bg-gradient-to-r sm:from-black/82 sm:via-black/42 sm:to-black/12" />
          </div>

          <div className="relative flex flex-col justify-end px-5 pb-5 pt-4 text-[#fbf8f1] sm:min-h-[76vh] sm:px-8 sm:py-12 md:px-16 md:py-16">
            <div className="max-w-5xl">
              <p className="mb-2 text-[9px] uppercase leading-5 tracking-[0.24em] text-[#fbf8f1]/68 sm:mb-7 sm:text-[11px] sm:tracking-[0.28em]">
                Well+ / The London wellness edit
              </p>
              <h1 className="max-w-5xl font-serif text-[2.05rem] font-normal leading-[0.94] tracking-[-0.055em] sm:text-[4.9rem] sm:leading-[0.92] md:text-[7.6rem]">
                London&apos;s curated guide to modern wellness.
              </h1>
              <p className="mt-3 max-w-[31rem] text-[13px] leading-5 text-[#fbf8f1]/82 sm:mt-7 sm:max-w-2xl sm:text-lg sm:leading-8">
                Find London saunas, cold plunges, recovery studios, spas and clinics — with practical details to help you choose where to book.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-9 sm:flex sm:flex-wrap sm:gap-3">
                <Link href="/explore" className="col-span-2 rounded-full bg-[#fbf8f1] px-5 py-2.5 text-center text-sm text-[#29241d] transition hover:bg-[#eee7da] sm:col-span-1 sm:py-3">
                  Browse venues
                </Link>
                <Link href="/sauna-london" className="rounded-full border border-[#fbf8f1]/45 px-4 py-2.5 text-center text-sm text-[#fbf8f1] transition hover:bg-[#fbf8f1] hover:text-[#29241d] sm:px-5 sm:py-3">
                  Sauna
                </Link>
                <Link href="#featured" className="rounded-full border border-[#fbf8f1]/22 px-4 py-2.5 text-center text-sm text-[#fbf8f1]/82 transition hover:border-[#fbf8f1]/70 sm:px-5 sm:py-3">
                  Featured
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeVenueSearch facilities={directoryFacilities} />

      <section className="px-5 pb-5 pt-1 sm:px-6 sm:pb-10 sm:pt-2">
        <div className="editorial-shell grid gap-4 border-b border-[#d8cebf]/70 pb-7 md:grid-cols-[0.85fr_1.15fr] md:items-end md:pb-10">
          <p className="editorial-eyebrow">A considered London guide</p>
          <p className="max-w-3xl text-lg leading-7 text-[#4f473c] sm:text-2xl sm:leading-10">
            Well+ curates spaces by service, venue type, location and use case — so you can compare what is offered, where it is, and what it is genuinely best for.
          </p>
        </div>
      </section>

      {selectedFacilities.length > 0 ? (
        <section id="featured" className="px-5 py-5 sm:px-6 sm:py-12 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-7 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="editorial-eyebrow mb-3">Editor&apos;s selection</p>
                <h2 className="max-w-3xl font-serif text-4xl font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl">
                  Featured spaces worth starting with.
                </h2>
              </div>
              <Link href="/explore" className="w-fit text-sm font-medium underline underline-offset-4">
                Explore all venues
              </Link>
            </div>
            <div className="grid gap-5 sm:gap-8 md:grid-cols-3">
              {selectedFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source="homepage_featured" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#fbf8f1] px-5 py-9 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Wellness goals</p>
              <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                Start with a goal.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] sm:text-base">
              Use these broader guides for recovery, performance, reset, optimisation and longevity before comparing specific services or locations.
            </p>
          </div>

          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-5">
            {pillarPages.map((pillar) => (
              <Link
                key={pillar.slug}
                href={pillar.href}
                className="group min-w-[78%] rounded-[1.2rem] border border-[#d8cebf]/70 bg-[#f4efe6] p-5 transition hover:-translate-y-[1px] hover:bg-[#eee7da] sm:flex sm:min-h-[235px] sm:min-w-0 sm:flex-col sm:justify-between sm:p-6"
              >
                <div>
                  <p className="mb-4 text-[10px] uppercase tracking-[0.22em] text-[#8d7d67]">{pillar.eyebrow}</p>
                  <h3 className="mb-3 text-2xl font-medium tracking-[-0.03em] group-hover:underline group-hover:underline-offset-4 sm:text-3xl">
                    {pillar.label}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-5 text-[#5f574c] sm:line-clamp-none sm:text-sm sm:leading-7">{pillar.intro}</p>
                </div>
                <span className="mt-5 inline-block text-xs font-medium text-[#29241d] underline underline-offset-4 sm:text-sm">Explore {pillar.label.toLowerCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#29241d] px-5 py-11 text-[#fbf8f1] sm:px-6 md:py-18">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.86fr_1.14fr] md:items-start">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#d8cebf]">Venue types</p>
            <h2 className="font-serif text-4xl font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Browse by venue type.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {venueTypeLinks.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group rounded-[1.1rem] border border-[#fbf8f1]/16 p-5 transition hover:border-[#fbf8f1]/45 hover:bg-[#fbf8f1]/5 sm:p-6"
              >
                <h3 className="mb-2 text-2xl font-medium tracking-[-0.03em] group-hover:underline group-hover:underline-offset-4">{collection.title}</h3>
                <p className="text-sm leading-7 text-[#fbf8f1]/72">{collection.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-[#fbf8f1] px-5 py-9 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Use cases</p>
              <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                Choose by situation.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] sm:text-base">
              Need a quiet reset, a post-gym recovery stop, a higher-touch spa setting or a clear first visit? Start here.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {useCaseLinks.map((collection) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="group rounded-[1.1rem] border border-[#d8cebf]/70 bg-[#f4efe6] p-5 transition hover:-translate-y-[1px] hover:bg-[#eee7da] sm:p-6"
              >
                <h3 className="mb-2 text-2xl font-medium tracking-[-0.03em] group-hover:underline group-hover:underline-offset-4">{collection.title}</h3>
                <p className="text-sm leading-7 text-[#5f574c]">{collection.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4efe6] px-5 py-9 sm:px-6 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl border-b border-[#d8cebf]/70 pb-9 sm:pb-12">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Services</p>
              <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                Browse by service.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#5f574c] sm:text-base">
              Fast routes into service-led London guides for sauna, cold plunge, cryotherapy, contrast therapy and recovery treatments.
            </p>
          </div>

          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 xl:grid-cols-5">
            {serviceLinks.map((treatment) => (
              <Link
                key={treatment.href}
                href={treatment.href}
                className="group min-w-[78%] rounded-[1.1rem] border border-[#d8cebf]/80 bg-[#fbf8f1] p-5 transition hover:-translate-y-[1px] hover:bg-[#eee7da] sm:min-w-0"
              >
                <h3 className="mb-3 text-2xl font-medium tracking-[-0.03em] group-hover:underline group-hover:underline-offset-4">{treatment.label}</h3>
                <p className="line-clamp-2 text-xs leading-5 text-[#5f574c] sm:line-clamp-none sm:text-sm sm:leading-7">{treatment.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 py-10 sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[1.4rem] border border-[#d8cebf]/70 bg-[#f4efe6] p-6 sm:p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <p className="editorial-eyebrow mb-3">How we curate</p>
            <h2 className="font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
              More than a list of venues.
            </h2>
          </div>
          <div className="grid gap-5 text-sm leading-7 text-[#5f574c] sm:grid-cols-3">
            <p><span className="block text-[#29241d]">Atmosphere</span> The feel of the space, from design and lighting to pace and setting.</p>
            <p><span className="block text-[#29241d]">Usefulness</span> What the venue is genuinely best for: reset, recovery, contrast, performance or a slower spa visit.</p>
            <p><span className="block text-[#29241d]">Clarity</span> Practical details that help you choose with confidence before you book.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf8f1] px-5 pb-14 sm:px-6 md:pb-18">
        <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="editorial-eyebrow mb-3">Neighbourhood guides</p>
              <h2 className="max-w-3xl font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                Find recovery spaces by neighbourhood.
              </h2>
            </div>
            <Link href="/neighbourhoods" className="w-fit text-sm font-medium underline underline-offset-4">
              View all neighbourhoods
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {featuredNeighbourhoods.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]"
              >
                {area.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredAreaLinks.length > 0 ? (
        <section className="bg-[#fbf8f1] px-5 pb-14 sm:px-6 md:pb-18">
          <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-8">
            <p className="editorial-eyebrow mb-3">Browse by area</p>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-3xl font-serif text-3xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                Find venues by London area.
              </h2>
              <div className="flex flex-wrap gap-3 md:justify-end">
                {featuredAreaLinks.map((area) => (
                  <Link
                    key={area.href}
                    href={area.href}
                    className="rounded-full border border-[#d8cebf] px-4 py-2 text-sm transition hover:bg-[#f4efe6]"
                  >
                    {area.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
