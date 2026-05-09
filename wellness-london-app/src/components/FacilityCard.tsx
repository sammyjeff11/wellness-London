import Image from "next/image";
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
  accessType?: string;
};

type FacilityCardProps = {
  facility: FacilityCardFacility;
};

export default function FacilityCard({ facility }: FacilityCardProps) {
  const services = facility.services?.slice(0, 3) || [];
  const detailItems = [
    facility.location ? { label: "Area", value: facility.location } : null,
    facility.accessType ? { label: "Access", value: facility.accessType } : null,
    facility.priceRange ? { label: "Price", value: facility.priceRange } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-[#fffdf8] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-300/40">
      <Link href={`/facility/${facility.slug}`} className="block">
        <div className="relative h-60 overflow-hidden bg-stone-200">
          {facility.imageUrl ? (
            <Image
              src={facility.imageUrl}
              alt={facility.imageAlt || facility.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-end bg-[#ded6c8] p-5">
              <span className="text-sm font-medium text-stone-600">
                Wellness London
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
              Curated
            </span>
            {facility.rating ? (
              <span className="rounded-full bg-[#f8f5ef] px-3 py-1 text-xs font-semibold text-[#211d18]">
                {facility.rating}
              </span>
            ) : null}
          </div>
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

          {detailItems.length > 0 ? (
            <dl className="mb-5 grid gap-3 border-y border-stone-200 py-4 text-xs text-stone-600">
              {detailItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4">
                  <dt className="uppercase tracking-[0.16em] text-stone-400">{item.label}</dt>
                  <dd className="max-w-[65%] truncate text-right font-medium text-[#211d18]">{item.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[#211d18]">View profile</span>
            <span aria-hidden="true" className="text-stone-500 transition group-hover:translate-x-1">
              -&gt;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
