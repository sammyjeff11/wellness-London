export type Facility = {
  name: string;
  slug: string;
  area: string;
  services: string[];
  priceRange: string;
  description: string;
  website: string;
};

export const facilities: Facility[] = [
  {
    name: "Arc Community",
    slug: "arc-community",
    area: "London",
    services: ["Sauna", "Cold Plunge", "Recovery"],
    priceRange: "Premium",
    description: "London wellness venue; check the profile for current services and access.",
    website: "https://www.arccommunity.co.uk",
  },
  {
    name: "Othership London",
    slug: "othership-london",
    area: "London",
    services: ["Sauna", "Cold Plunge", "Breathwork"],
    priceRange: "Premium",
    description: "London wellness venue; check the profile for current services and access.",
    website: "https://www.othership.us",
  },
  {
    name: "Rebase Recovery",
    slug: "rebase-recovery",
    area: "London",
    services: ["Cryotherapy", "Cold Plunge", "Recovery"],
    priceRange: "Premium",
    description: "London wellness venue; check the profile for current services and access.",
    website: "https://www.rebaserecovery.com",
  },
];
