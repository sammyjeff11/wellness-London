"use client";

import type { ReactNode } from "react";
import { trackEvent, type AnalyticsProperties } from "@/lib/analytics";

type TrackedExternalLinkProps = {
  href: string;
  eventName: "listing_cta_click" | "map_click";
  properties?: AnalyticsProperties;
  className?: string;
  children: ReactNode;
};

export default function TrackedExternalLink({ href, eventName, properties, className, children }: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() => trackEvent(eventName, properties)}
    >
      {children}
    </a>
  );
}
