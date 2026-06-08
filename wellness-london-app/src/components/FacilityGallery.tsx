import Link from "next/link";
import SafeImage from "@/components/SafeImage";

type FacilityGalleryImage = {
  url: string;
  filename?: string;
};

type FacilityGalleryProps = {
  images: FacilityGalleryImage[];
  venueName: string;
  facilitySlug?: string;
};

export default function FacilityGallery({ images, venueName, facilitySlug }: FacilityGalleryProps) {
  const galleryImages = images.filter((image) => Boolean(image.url)).slice(0, 5);

  if (galleryImages.length === 0) return null;

  const primaryImage = galleryImages[0];
  const secondaryImages = galleryImages.slice(1, 5);
  const galleryHref = facilitySlug ? `/facility/${facilitySlug}#photos` : undefined;

  return (
    <div className="relative overflow-hidden rounded-[1.15rem] border border-[#d8cebf]/75 bg-[#fbf8f1]/72 p-2 shadow-[0_16px_40px_rgba(41,36,29,0.04)] sm:rounded-[1.35rem] sm:p-3">
      <div className="grid gap-2 md:grid-cols-[1.35fr_0.65fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[0.95rem] bg-[#d8cebf] md:aspect-[5/4]">
          <SafeImage
            src={primaryImage.url}
            alt={primaryImage.filename || `${venueName} main image`}
            fill
            priority
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="object-cover transition duration-300 hover:scale-[1.02]"
          />
        </div>

        {secondaryImages.length > 0 ? (
          <div className="hidden gap-2 md:grid">
            {secondaryImages.slice(0, 2).map((image, index) => (
              <div key={`${image.url}-${index}`} className="relative overflow-hidden rounded-[0.95rem] bg-[#d8cebf]">
                <SafeImage
                  src={image.url}
                  alt={image.filename || `${venueName} image ${index + 2}`}
                  fill
                  sizes="14rem"
                  className="object-cover transition duration-300 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {secondaryImages.length > 0 ? (
        <div className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 md:hidden">
          {secondaryImages.map((image, index) => (
            <div key={`${image.url}-${index}`} className="relative aspect-[4/3] min-w-[42%] snap-start overflow-hidden rounded-[0.8rem] bg-[#d8cebf]">
              <SafeImage
                src={image.url}
                alt={image.filename || `${venueName} image ${index + 2}`}
                fill
                sizes="42vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      {galleryImages.length > 1 ? (
        galleryHref ? (
          <Link
            href={galleryHref}
            className="absolute bottom-4 right-4 rounded-full bg-[#fbf8f1]/95 px-4 py-2 text-xs font-medium text-[#29241d] shadow-[0_8px_22px_rgba(41,36,29,0.14)] transition hover:bg-white"
          >
            View photos
          </Link>
        ) : (
          <span className="absolute bottom-4 right-4 rounded-full bg-[#fbf8f1]/95 px-4 py-2 text-xs font-medium text-[#29241d] shadow-[0_8px_22px_rgba(41,36,29,0.14)]">
            {galleryImages.length} photos
          </span>
        )
      ) : null}
    </div>
  );
}
