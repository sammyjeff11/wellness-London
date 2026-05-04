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
    services: ["Sauna", "Cold plunge", "Recovery"],
    priceRange: "Premium",
    description: "Premium wellness experience in London",
    website: "https://www.arccommunity.co.uk",
  },
  {
    name: "Othership London",
    slug: "othership-london",
    area: "London",
    services: ["Sauna", "Ice bath", "Breathwork"],
    priceRange: "Premium",
    description: "Premium wellness experience in London",
    website: "https://www.othership.us",
  },
  {
    name: "Rebase Recovery",
    slug: "rebase-recovery",
    area: "London",
    services: ["Cryotherapy", "Cold plunge", "Recovery"],
    priceRange: "Premium",
    description: "Premium wellness experience in London",
    website: "https://www.rebaserecovery.com",
  },
];
