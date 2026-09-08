export const LOCATION_HUBS: Record<string, string> = {
  "Central London": "/central-london-wellness",
  "East London": "/east-london-wellness",
  "West London": "/west-london-wellness",
  "North London": "/north-london-wellness",
  "South London": "/south-london-wellness",
  Shoreditch: "/neighbourhoods/shoreditch",
  "Canary Wharf": "/neighbourhoods/canary-wharf",
  Bayswater: "/neighbourhoods/bayswater",
  Belgravia: "/neighbourhoods/belgravia",
  Chelsea: "/neighbourhoods/chelsea",
  "City of London": "/neighbourhoods/city-of-london",
  "Covent Garden": "/neighbourhoods/covent-garden-strand",
  "Covent Garden / Strand": "/neighbourhoods/covent-garden-strand",
  Fitzrovia: "/neighbourhoods/fitzrovia",
  Fulham: "/neighbourhoods/fulham",
  Islington: "/neighbourhoods/islington",
  Kensington: "/neighbourhoods/kensington",
  Marylebone: "/neighbourhoods/marylebone",
  Mayfair: "/neighbourhoods/mayfair",
  "Notting Hill": "/neighbourhoods/notting-hill",
  Peckham: "/neighbourhoods/peckham",
  Richmond: "/neighbourhoods/richmond",
  Soho: "/neighbourhoods/soho",
  Victoria: "/neighbourhoods/victoria",
  Wandsworth: "/neighbourhoods/wandsworth",
  "White City": "/neighbourhoods/white-city",
};

export type LondonRegion = {
  name: string;
  href: string;
  copy: string;
  areaValues: string[];
  neighbourhoodSlugs: string[];
};

export const londonRegions: LondonRegion[] = [
  {
    name: "Central London",
    href: "/central-london-wellness",
    copy: "City-centre recovery, premium clubs, spas and clinic-led wellness.",
    areaValues: ["Central London"],
    neighbourhoodSlugs: ["belgravia", "city-of-london", "covent-garden-strand", "fitzrovia", "marylebone", "mayfair", "soho", "victoria"],
  },
  {
    name: "East London",
    href: "/east-london-wellness",
    copy: "Community sauna, contrast therapy and design-led recovery spaces.",
    areaValues: ["East London"],
    neighbourhoodSlugs: ["shoreditch", "canary-wharf"],
  },
  {
    name: "West London",
    href: "/west-london-wellness",
    copy: "Premium studios, private wellness and longevity-led services.",
    areaValues: ["West London"],
    neighbourhoodSlugs: ["bayswater", "chelsea", "fulham", "kensington", "notting-hill", "richmond", "white-city"],
  },
  {
    name: "North London",
    href: "/north-london-wellness",
    copy: "Restorative spaces, neighbourhood studios and slower wellness routines.",
    areaValues: ["North London", "North East London"],
    neighbourhoodSlugs: ["hampstead", "islington"],
  },
  {
    name: "South London",
    href: "/south-london-wellness",
    copy: "Community sauna, recovery studios and accessible local rituals.",
    areaValues: ["South London"],
    neighbourhoodSlugs: ["peckham", "wandsworth"],
  },
];

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
  { href: "/neighbourhoods/bayswater", label: "Bayswater wellness spaces", region: "West London" },
  { href: "/neighbourhoods/belgravia", label: "Belgravia wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/chelsea", label: "Chelsea wellness spaces", region: "West London" },
  { href: "/neighbourhoods/city-of-london", label: "City of London wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/covent-garden-strand", label: "Covent Garden and Strand wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/fitzrovia", label: "Fitzrovia wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/fulham", label: "Fulham wellness spaces", region: "West London" },
  { href: "/neighbourhoods/islington", label: "Islington wellness spaces", region: "North London" },
  { href: "/neighbourhoods/kensington", label: "Kensington wellness spaces", region: "West London" },
  { href: "/neighbourhoods/marylebone", label: "Marylebone wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/mayfair", label: "Mayfair wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/notting-hill", label: "Notting Hill wellness spaces", region: "West London" },
  { href: "/neighbourhoods/peckham", label: "Peckham wellness spaces", region: "South London" },
  { href: "/neighbourhoods/richmond", label: "Richmond wellness spaces", region: "West London" },
  { href: "/neighbourhoods/soho", label: "Soho wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/victoria", label: "Victoria wellness spaces", region: "Central London" },
  { href: "/neighbourhoods/wandsworth", label: "Wandsworth wellness spaces", region: "South London" },
  { href: "/neighbourhoods/white-city", label: "White City wellness spaces", region: "West London" },
];
