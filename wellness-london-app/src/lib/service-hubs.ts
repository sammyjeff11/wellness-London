const SERVICE_HUBS: { keywords: string[]; href: string }[] = [
  {
    href: "/activities/sauna-london",
    keywords: ["sauna", "finnish", "heat therapy", "heat exposure"],
  },
  {
    href: "/activities/infrared-sauna-london",
    keywords: ["infrared sauna", "infrared"],
  },
  {
    href: "/activities/cold-plunge-london",
    keywords: ["cold plunge", "plunge", "ice bath", "ice bath & cold plunge", "cold exposure", "cold water"],
  },
  {
    href: "/activities/contrast-therapy-london",
    keywords: ["contrast", "contrast therapy", "hot and cold", "sauna and cold plunge", "sauna & cold plunge", "thermal cycle"],
  },
  {
    href: "/activities/cryotherapy-london",
    keywords: ["cryotherapy", "cryo", "whole body cryotherapy", "localised cryotherapy", "localized cryotherapy"],
  },
  {
    href: "/activities/red-light-therapy-london",
    keywords: ["red light", "red light therapy"],
  },
  {
    href: "/activities/hbot-london",
    keywords: ["hbot", "hyperbaric", "hyperbaric oxygen therapy"],
  },
  {
    href: "/activities/massage-london",
    keywords: ["massage", "sports massage", "body treatment"],
  },
  {
    href: "/activities/physiotherapy-london",
    keywords: ["physiotherapy", "physio"],
  },
  {
    href: "/activities/compression-therapy-london",
    keywords: ["compression", "compression therapy"],
  },
  {
    href: "/recovery-london",
    keywords: ["recovery", "recovery studio", "recovery club", "sports recovery", "performance recovery", "lymphatic", "reset"],
  },
];

export function getServiceHubHref(service?: string | null) {
  if (!service) return null;
  const serviceText = service.toLowerCase();
  return SERVICE_HUBS.find((hub) => hub.keywords.some((keyword) => serviceText.includes(keyword)))?.href ?? null;
}
