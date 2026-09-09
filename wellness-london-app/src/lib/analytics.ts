export type AnalyticsProperties = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    dataLayer?: AnalyticsProperties[];
    gtag?: (command: "event", eventName: string, properties: Record<string, string | number | boolean>) => void;
  }
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;

  const cleanProperties = Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  ) as Record<string, string | number | boolean>;

  window.gtag?.("event", eventName, cleanProperties);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...cleanProperties });
}

export function trackVenueReferral(properties: AnalyticsProperties = {}) {
  const slug = properties.facility_slug;
  if (typeof window === "undefined" || typeof slug !== "string" || !["booking", "website"].includes(String(properties.cta_type))) return;
  trackEvent("venue_outbound_click", properties);
  try {
    const key = `wellplus:referral:${slug}`;
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
    trackEvent("venue_unique_referral", { ...properties, page_path: window.location.pathname });
  } catch { /* Unavailable session storage cannot reliably establish uniqueness. */ }
}
