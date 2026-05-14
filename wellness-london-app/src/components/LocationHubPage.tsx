import Link from "next/link";
import FacilityCard from "@/components/FacilityCard";
import type { ServiceDirectoryFacility } from "@/components/ServiceDirectory";

export type LocationHubConfig = {
  area: string;
  title: string;
  intro: string;
  canonical: string;
};

type LocationHubPageProps = {
  config: LocationHubConfig;
  facilities: ServiceDirectoryFacility[];
};

const serviceLinks = [
  { href: "/sauna-london", label: "Saunas in London" },
  { href: "/cold-plunge-london", label: "Cold plunge in London" },
  { href: "/cryotherapy-london", label: "Cryotherapy in London" },
];

export default function LocationHubPage({ config, facilities }: LocationHubPageProps) {
  const matchingFacilities = facilities.filter((facility) => {
    const area = facility.areaGroup || facility.location || "";
    return area === config.area || facility.location === config.area;
  });

  return (
    <main className="min-h-screen bg-[#f4efe6] text-[#29241d]">
      <section className="px-5 py-16 sm:px-6 sm:py-20 md:py-28">
        <div className="mx-auto max-w-6xl border-t border-[#d8cebf]/70 pt-10 sm:pt-12">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[#6f6048]">Explore by area</p>
          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-tight sm:text-6xl md:text-7xl">
            {config.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f574c]">
            {config.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {serviceLinks.map((link) => (
              <Link key={link.href} href={link.href} className="border border-[#d8cebf] px-4 py-3 text-sm text-[#29241d] transition hover:bg-[#fbf8f1]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 border-b border-[#d8cebf]/70 pb-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-[#6f6048]">The edit</p>
            <h2 className="text-2xl font-medium tracking-normal sm:text-3xl">
              {matchingFacilities.length > 0 ? `Wellness spaces in ${config.area}` : `No ${config.area} spaces listed yet`}
            </h2>
          </div>

          {matchingFacilities.length > 0 ? (
            <div className="grid gap-y-12 sm:gap-y-16 md:grid-cols-3 md:gap-x-8">
              {matchingFacilities.map((facility) => (
                <FacilityCard key={facility.slug} facility={facility} source={config.area} />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl bg-[#fbf8f1] p-6 sm:p-8">
              <p className="text-sm leading-7 text-[#5f574c]">
                We are still curating this area. For now, explore the wider London sauna, cold plunge and cryotherapy guides.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
