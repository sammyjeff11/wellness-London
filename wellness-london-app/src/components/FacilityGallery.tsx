import SafeImage from "@/components/SafeImage";

type FacilityGalleryImage = {
  url: string;
  filename?: string;
};

type FacilityGalleryProps = {
  images: FacilityGalleryImage[];
  venueName: string;
};

export default function FacilityGallery({ images, venueName }: FacilityGalleryProps) {
  const galleryImages = images.filter((image) => Boolean(image.url)).slice(0, 6);

  if (galleryImages.length <= 1) return null;

  const leadImage = galleryImages[0];
  const supportingImages = galleryImages.slice(1, 5);

  return (
    <div className="rounded-[1.35rem] border border-[#d8cebf]/75 bg-[#fbf8f1]/70 p-3 shadow-[0_18px_45px_rgba(41,36,29,0.045)] sm:p-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-[#d8cebf]">
        <SafeImage
          src={leadImage.url}
          alt={leadImage.filename || `${venueName} main image`}
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-cover"
        />
      </div>

      {supportingImages.length > 0 ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {supportingImages.map((image, index) => (
            <div key={`${image.url}-${index}`} className="relative aspect-square overflow-hidden rounded-[0.75rem] bg-[#d8cebf]">
              <SafeImage
                src={image.url}
                alt={image.filename || `${venueName} image ${index + 2}`}
                fill
                sizes="8rem"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
