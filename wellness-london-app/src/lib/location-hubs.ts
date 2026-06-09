export const LOCATION_HUBS: Record<string, string> = {
  "Central London": "/central-london-wellness",
  "East London": "/east-london-wellness",
  "West London": "/west-london-wellness",
  "North London": "/north-london-wellness",
  "South London": "/south-london-wellness",
  Shoreditch: "/neighbourhoods/shoreditch",
  "Canary Wharf": "/neighbourhoods/canary-wharf",
  Kensington: "/neighbourhoods/kensington",
  Marylebone: "/neighbourhoods/marylebone",
  "Notting Hill": "/neighbourhoods/notting-hill",
  Soho: "/neighbourhoods/soho",
  Hampstead: "/neighbourhoods/hampstead",
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

export const supportedNeighbourhoodHubLinks = [
  { href: "/neighbourhoods/shoreditch", label: "Shoreditch wellness spaces", region: "East London" },
  { href: "/neighbourhoods/canary-wharf", label: "Canary Wharf wellness spaces", region: "East London" },
  { href: "/neighbourhoods/kensington", label: "Kensington wellness spaces", region: "West London" },
  { href: "/neighbourhoods/marylebone", label: "Marylebone wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/notting-hill", label: "Notting Hill wellness spaces", region: "West London" },
  { href: "/neighbourhoods/soho", label: "Soho wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/hampstead", label: "Hampstead wellness spaces", region: "North London" },
];
