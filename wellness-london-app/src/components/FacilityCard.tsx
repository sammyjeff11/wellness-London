import Link from "next/link";

export type FacilityCardFacility = {
  slug: string;
  name: string;
  description: string;
  website?: string;
};

type FacilityCardProps = {
  facility: FacilityCardFacility;
};

export default function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <article className="border rounded-2xl p-5 hover:shadow-xl transition duration-300 bg-white">
      <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{facility.description}</p>
      <Link
        href={`/facility/${facility.slug}`}
        className="text-sm font-medium underline"
      >
        View Details
      </Link>
    </article>
  );
}
