"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsProperties } from "@/lib/analytics";

type AnalyticsPageViewProps = {
  eventName: "service_page_view" | "facility_page_view" | "location_page_view";
  properties?: AnalyticsProperties;
};

export default function AnalyticsPageView({ eventName, properties }: AnalyticsPageViewProps) {
  useEffect(() => {
    trackEvent(eventName, properties);
  }, [eventName, properties]);

  return null;
}
