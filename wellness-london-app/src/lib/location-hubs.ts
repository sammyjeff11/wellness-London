export const LOCATION_HUBS: Record<string, string> = {
  "Central London": "/central-london-wellness",
  "East London": "/east-london-wellness",
  "West London": "/west-london-wellness",
  "North London": "/north-london-wellness",
  "South London": "/south-london-wellness",
  "Greater London": "/greater-london-wellness",
};

export function getLocationHubHref(location?: string | null) {
  if (!location) return null;
  return LOCATION_HUBS[location.trim()] ?? null;
}

export const locationHubLinks = [
  { href: "/central-london-wellness", label: "Central London wellness spaces" },
  { href: "/east-london-wellness", label: "East London saunas and recovery studios" },
  { href: "/west-london-wellness", label: "West London wellness spaces" },
  { href: "/north-london-wellness", label: "North London recovery spaces" },
  { href: "/south-london-wellness", label: "South London wellness spaces" },
];
