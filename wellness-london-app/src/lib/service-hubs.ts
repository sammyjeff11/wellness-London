const SERVICE_HUBS: { keywords: string[]; href: string }[] = [
  {
    href: "/sauna-london",
    keywords: ["sauna", "infrared", "finnish", "heat therapy", "heat exposure", "steam", "steam room", "thermal"],
  },
  {
    href: "/cold-plunge-london",
    keywords: ["cold plunge", "plunge", "ice bath", "cold exposure", "ice", "cold water"],
  },
  {
    href: "/contrast-therapy-london",
    keywords: ["contrast", "contrast therapy", "hot and cold", "sauna and cold plunge", "thermal cycle"],
  },
  {
    href: "/cryotherapy-london",
    keywords: ["cryotherapy", "cryo", "whole body cryotherapy", "localised cryotherapy", "localized cryotherapy"],
  },
  {
    href: "/recovery-london",
    keywords: ["recovery", "recovery studio", "recovery club", "sports recovery", "performance recovery", "compression", "red light", "lymphatic", "reset"],
  },
];

export function getServiceHubHref(service?: string | null) {
  if (!service) return null;
  const serviceText = service.toLowerCase();
  return SERVICE_HUBS.find((hub) => hub.keywords.some((keyword) => serviceText.includes(keyword)))?.href ?? null;
}
