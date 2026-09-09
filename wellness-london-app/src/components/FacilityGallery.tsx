"use client";
import { useState } from "react";
import SafeImage from "@/components/SafeImage";
import OverlayDialog from "@/components/OverlayDialog";

type FacilityGalleryImage = { url: string; filename?: string };
export default function FacilityGallery({
  images,
  venueName,
}: {
  images: FacilityGalleryImage[];
  venueName: string;
  facilitySlug?: string;
}) {
  const photos = images.filter((image) => image.url);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  if (!photos.length) return null;
  function show(index: number) {
    setActive(index);
    setOpen(true);
  }
  function move(direction: number) {
    setActive((index) => (index + direction + photos.length) % photos.length);
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => show(0)}
        aria-label={`Open ${venueName} photo library`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#d8cebf]"
      >
        <SafeImage
          src={photos[0].url}
          alt={`${venueName}, venue photograph`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute bottom-4 right-4 rounded-full bg-[#fbf8f1] px-4 py-3 text-sm text-[#29241d]">
          View {photos.length} {photos.length === 1 ? "photo" : "photos"}
        </span>
      </button>
      <OverlayDialog
        open={open}
        onClose={() => setOpen(false)}
        title={`${venueName} photos`}
      >
        <div
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="relative aspect-[4/3] bg-[#29241d]">
            <SafeImage
              src={photos[active].url}
              alt={`${venueName}, photograph ${active + 1}`}
              fill
              sizes="640px"
              className="object-contain"
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={photos.length === 1}
              className="min-h-11 rounded-full border border-[#b9ab97] px-4 text-sm disabled:opacity-40"
              aria-label="Previous photo"
            >
              ← Previous
            </button>
            <p role="status" className="text-sm">
              {active + 1} of {photos.length}
            </p>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={photos.length === 1}
              className="min-h-11 rounded-full border border-[#b9ab97] px-4 text-sm disabled:opacity-40"
              aria-label="Next photo"
            >
              Next →
            </button>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {photos.map((photo, index) => (
              <button
                key={`${photo.url}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={active === index}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${active === index ? "border-[#29241d]" : "border-transparent"}`}
              >
                <SafeImage
                  src={photo.url}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </OverlayDialog>
    </div>
  );
}
