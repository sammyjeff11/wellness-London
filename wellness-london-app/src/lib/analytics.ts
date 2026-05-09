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
