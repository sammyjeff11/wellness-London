const SERVICE_HUBS: { keywords: string[]; href: string }[] = [
  {
    href: "/sauna-london",
    keywords: ["sauna", "infrared", "finnish", "heat therapy", "steam"],
  },
  {
    href: "/cold-plunge-london",
    keywords: ["cold plunge", "ice bath", "cold exposure", "contrast"],
  },
  {
    href: "/cryotherapy-london",
    keywords: ["cryotherapy", "cryo"],
  },
];

export function getServiceHubHref(service?: string | null) {
  if (!service) return null;
  const serviceText = service.toLowerCase();
  return SERVICE_HUBS.find((hub) => hub.keywords.some((keyword) => serviceText.includes(keyword)))?.href ?? null;
}
