"use client";

import { useEffect, useState } from "react";
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

export default function FacilityGallery({ images, venueName }: FacilityGalleryProps) {
  const galleryImages = images.filter((image) => Boolean(image.url));
  const previewImages = galleryImages.slice(0, 5);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "ArrowRight") setActiveIndex((index) => (index + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [galleryImages.length, isOpen]);

  if (previewImages.length === 0) return null;

  const primaryImage = previewImages[0];
  const secondaryImages = previewImages.slice(1, 5);
  const activeImage = galleryImages[activeIndex] || galleryImages[0];

  function openLibrary(index = 0) {
    setActiveIndex(index);
    setIsOpen(true);
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-[1.15rem] border border-[#d8cebf]/75 bg-[#fbf8f1]/72 p-2 shadow-[0_16px_40px_rgba(41,36,29,0.04)] sm:rounded-[1.35rem] sm:p-3">
        <div className="grid gap-2 md:grid-cols-[1.35fr_0.65fr]">
          <button type="button" onClick={() => openLibrary(0)} className="group relative aspect-[4/3] overflow-hidden rounded-[0.95rem] bg-[#d8cebf] text-left focus:outline-none focus:ring-2 focus:ring-[#6f6048] md:aspect-[5/4]" aria-label={`Open ${venueName} photo library`}>
            <SafeImage src={primaryImage.url} alt={primaryImage.filename || `${venueName} main image`} fill priority sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
          </button>

          {secondaryImages.length > 0 ? (
            <div className="hidden gap-2 md:grid">
              {secondaryImages.slice(0, 2).map((image, index) => (
                <button key={`${image.url}-${index}`} type="button" onClick={() => openLibrary(index + 1)} className="group relative overflow-hidden rounded-[0.95rem] bg-[#d8cebf] text-left focus:outline-none focus:ring-2 focus:ring-[#6f6048]" aria-label={`Open ${venueName} photo ${index + 2}`}>
                  <SafeImage src={image.url} alt={image.filename || `${venueName} image ${index + 2}`} fill sizes="14rem" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {secondaryImages.length > 0 ? (
          <div className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 md:hidden">
            {secondaryImages.map((image, index) => (
              <button key={`${image.url}-${index}`} type="button" onClick={() => openLibrary(index + 1)} className="relative aspect-[4/3] min-w-[42%] snap-start overflow-hidden rounded-[0.8rem] bg-[#d8cebf] focus:outline-none focus:ring-2 focus:ring-[#6f6048]" aria-label={`Open ${venueName} photo ${index + 2}`}>
                <SafeImage src={image.url} alt={image.filename || `${venueName} image ${index + 2}`} fill sizes="42vw" className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}

        {galleryImages.length > 1 ? (
          <button type="button" onClick={() => openLibrary(0)} className="absolute bottom-4 right-4 rounded-full bg-[#fbf8f1]/95 px-4 py-2 text-xs font-medium text-[#29241d] shadow-[0_8px_22px_rgba(41,36,29,0.14)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#6f6048]">
            View photos
          </button>
        ) : null}
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-[#15120e]/96 text-[#fbf8f1]" role="dialog" aria-modal="true" aria-label={`${venueName} photo library`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#d8cebf]">Photo library</p>
                <p className="mt-1 text-sm text-[#fbf8f1]/82">{venueName} · {activeIndex + 1} of {galleryImages.length}</p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:bg-white hover:text-[#29241d] focus:outline-none focus:ring-2 focus:ring-white/70">
                Close
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-6">
              {galleryImages.length > 1 ? (
                <button type="button" onClick={() => setActiveIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[#fbf8f1]/92 px-4 py-3 text-[#29241d] shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/70 sm:block" aria-label="Previous photo">
                  ←
                </button>
              ) : null}

              <div className="relative h-full max-h-[68vh] w-full max-w-5xl overflow-hidden rounded-[1rem] bg-black/30 sm:max-h-[72vh]">
                <SafeImage src={activeImage.url} alt={activeImage.filename || `${venueName} photo ${activeIndex + 1}`} fill sizes="100vw" className="object-contain" />
              </div>

              {galleryImages.length > 1 ? (
                <button type="button" onClick={() => setActiveIndex((index) => (index + 1) % galleryImages.length)} className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[#fbf8f1]/92 px-4 py-3 text-[#29241d] shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/70 sm:block" aria-label="Next photo">
                  →
                </button>
              ) : null}
            </div>

            {galleryImages.length > 1 ? (
              <div className="border-t border-white/10 px-4 py-3 sm:px-6">
                <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((image, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button key={`${image.url}-library-${index}`} type="button" onClick={() => setActiveIndex(index)} className={`relative h-20 min-w-[8.75rem] snap-start overflow-hidden rounded-[0.7rem] bg-[#211d17] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:h-24 sm:min-w-[11rem] ${isActive ? "opacity-100" : "opacity-55 hover:opacity-100"}`} aria-label={`Show photo ${index + 1}`} aria-pressed={isActive}>
                        <SafeImage src={image.url} alt={image.filename || `${venueName} thumbnail ${index + 1}`} fill sizes="11rem" className="object-contain" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
