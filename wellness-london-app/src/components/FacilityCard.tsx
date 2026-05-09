import Link from "next/link";

export type FacilityCardFacility = {
  slug: string;
  name: string;
  description: string;
  website?: string;
  imageUrl?: string;
  imageAlt?: string;
  location?: string;
  services?: string[];
  priceRange?: string;
  rating?: string;
};

type FacilityCardProps = {
  facility: FacilityCardFacility;
};

export default function FacilityCard({ facility }: FacilityCardProps) {
  const services = facility.services?.slice(0, 3) || [];

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-[#fffdf8] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-300/40">
      <Link href={`/facility/${facility.slug}`} className="block">
        <div className="relative h-56 overflow-hidden bg-stone-200">
          {facility.imageUrl ? (
            <img
              src={facility.imageUrl}
              alt={facility.imageAlt || facility.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[#ded6c8] p-5">
              <span className="text-sm font-medium text-stone-600">
                Wellness London
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
          {facility.location ? (
            <p className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.18em] text-white/90">
              {facility.location}
            </p>
          ) : null}
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600"
              >
                {service}
              </span>
            ))}
          </div>

          <h3 className="mb-2 text-xl font-semibold tracking-tight text-[#211d18]">
            {facility.name}
          </h3>
          <p className="mb-5 line-clamp-3 text-sm leading-6 text-stone-600">
            {facility.description}
          </p>

          <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-sm">
            <span className="font-medium text-[#211d18]">View profile</span>
            <span className="text-stone-500">
              {facility.rating || facility.priceRange || "Curated"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
