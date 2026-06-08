"use client";

import { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);

  if (galleryImages.length === 0) return null;

  const activeImage = galleryImages[activeIndex] || galleryImages[0];

  return (
    <div className="rounded-[1.35rem] border border-[#d8cebf]/75 bg-[#fbf8f1]/70 p-3 shadow-[0_18px_45px_rgba(41,36,29,0.045)] sm:p-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-[#d8cebf]">
        <SafeImage
          src={activeImage.url}
          alt={activeImage.filename || `${venueName} image ${activeIndex + 1}`}
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-cover"
          priority={activeIndex === 0}
        />
      </div>

      {galleryImages.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
          {galleryImages.slice(0, 5).map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${venueName} image ${index + 1}`}
                aria-pressed={isActive}
                className={`relative aspect-square overflow-hidden rounded-[0.75rem] bg-[#d8cebf] transition focus:outline-none focus:ring-2 focus:ring-[#6f6048] ${
                  isActive ? "ring-2 ring-[#29241d] ring-offset-2 ring-offset-[#fbf8f1]" : "opacity-82 hover:opacity-100"
                }`}
              >
                <SafeImage
                  src={image.url}
                  alt={image.filename || `${venueName} thumbnail ${index + 1}`}
                  fill
                  sizes="8rem"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
