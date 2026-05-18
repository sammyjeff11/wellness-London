import Image from "next/image";

type FacilityGalleryImage = {
  url: string;
  filename?: string;
};

type FacilityGalleryProps = {
  images: FacilityGalleryImage[];
  venueName: string;
};

export default function FacilityGallery({ images, venueName }: FacilityGalleryProps) {
  const galleryImages = images.filter((image) => Boolean(image.url)).slice(0, 8);

  if (galleryImages.length <= 1) return null;

  const [heroImage, ...supportingImages] = galleryImages;

  return (
    <section className="px-4 py-8 sm:px-5 sm:py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1400px] border-y border-[#d8cebf]/70 py-8 sm:py-10 md:py-12">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-eyebrow mb-3">Visual edit</p>
            <h2 className="max-w-3xl font-serif text-4xl font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl">
              A closer look at the space.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#70695d]">
            Swipe through the venue images to understand the atmosphere, setting and overall feel before you book.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.35fr_0.65fr] lg:gap-4">
          <div className="editorial-image relative aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-[#d8cebf] sm:aspect-[16/10] lg:aspect-[16/11]">
            <Image
              src={heroImage.url}
              alt={heroImage.filename || `${venueName} venue image`}
              fill
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="z-0 object-cover"
            />
            <div className="editorial-image-overlay" />
            <div className="editorial-image-grain" />
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4 text-[#fbf8f1] sm:bottom-6 sm:left-6 sm:right-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/76">{venueName}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#fbf8f1]/70">1 / {galleryImages.length}</p>
            </div>
          </div>

          <div className="hidden gap-4 lg:grid">
            {supportingImages.slice(0, 2).map((image, index) => (
              <div key={image.url} className="editorial-image relative min-h-[220px] overflow-hidden rounded-[1.15rem] bg-[#d8cebf]">
                <Image
                  src={image.url}
                  alt={image.filename || `${venueName} supporting image ${index + 2}`}
                  fill
                  sizes="30vw"
                  className="z-0 object-cover"
                />
                <div className="editorial-image-overlay" />
                <div className="editorial-image-grain" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {galleryImages.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              className="editorial-image relative aspect-[4/5] min-w-[72%] snap-start overflow-hidden rounded-[1rem] bg-[#d8cebf] sm:min-w-[38%] md:min-w-[28%] lg:min-w-[22%]"
            >
              <Image
                src={image.url}
                alt={image.filename || `${venueName} gallery image ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 72vw"
                className="z-0 object-cover"
              />
              <div className="editorial-image-overlay" />
              <div className="editorial-image-grain" />
              <p className="absolute bottom-4 left-4 z-10 text-[10px] uppercase tracking-[0.18em] text-[#fbf8f1]/76">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
