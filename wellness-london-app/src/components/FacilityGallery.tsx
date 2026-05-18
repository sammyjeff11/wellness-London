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
  const galleryImages = images.filter((image) => Boolean(image.url)).slice(0, 10);

  if (galleryImages.length <= 1) return null;

  return (
    <section className="px-4 py-8 sm:px-5 sm:py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-[1400px] border-y border-[#d8cebf]/70 py-8 sm:py-10 md:py-12">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-eyebrow mb-3">Gallery</p>
            <h2 className="max-w-3xl font-serif text-4xl font-normal leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl">
              See the space before you go.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#70695d]">
            Scroll through the images to get a clearer sense of the atmosphere, details and setting.
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
          {galleryImages.map((image, index) => (
            <figure
              key={`${image.url}-${index}`}
              className="editorial-image relative aspect-[4/5] min-w-[86%] snap-center overflow-hidden rounded-[1.15rem] bg-[#d8cebf] sm:aspect-[5/4] sm:min-w-[58%] lg:min-w-[42%]"
            >
              <Image
                src={image.url}
                alt={image.filename || `${venueName} gallery image ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 58vw, 86vw"
                className="z-0 object-cover"
              />
              <div className="editorial-image-overlay" />
              <div className="editorial-image-grain" />
              <figcaption className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4 text-[#fbf8f1] sm:bottom-5 sm:left-5 sm:right-5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#fbf8f1]/76">{venueName}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#fbf8f1]/70">{index + 1} / {galleryImages.length}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
