"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import Image from "next/image";
import { safeImageUrl } from "@/lib/image-utils";

type SafeImageProps = Omit<ComponentProps<typeof Image>, "src"> & {
  src?: string | null;
  fallback?: ReactNode;
};

function DefaultImageFallback({ alt }: { alt: string }) {
  return (
    <div className="absolute inset-0 flex items-end bg-[radial-gradient(circle_at_18%_18%,rgba(251,248,241,0.68),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(216,206,191,0.58),transparent_28%),linear-gradient(145deg,rgba(244,239,230,0.92),rgba(194,177,153,0.58)_48%,rgba(41,36,29,0.22))] p-5 text-xs uppercase tracking-[0.2em] text-[#70695d]">
      <span>{alt || "Well+"}</span>
    </div>
  );
}

export default function SafeImage({ src, alt, fallback, onError, ...props }: SafeImageProps) {
  const imageUrl = safeImageUrl(src);
  const [loadError, setLoadError] = useState<{ src?: string; failed: boolean }>({ failed: false });
  const hasLoadError = Boolean(imageUrl && loadError.src === imageUrl && loadError.failed);

  if (!imageUrl || hasLoadError) {
    return <>{fallback ?? <DefaultImageFallback alt={alt} />}</>;
  }

  return (
    <Image
      {...props}
      src={imageUrl}
      alt={alt}
      onError={(event) => {
        setLoadError({ src: imageUrl, failed: true });
        onError?.(event);
      }}
    />
  );
}
