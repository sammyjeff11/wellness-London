export type AirtableImage = {
  id: string;
  url: string;
  filename: string;
};

export type ServiceKey =
  | "sauna"
  | "cold-plunge"
  | "cryotherapy"
  | "recovery"
  | "breathwork"
  | "yoga"
  | "meditation";

export type AirtableFacility = {
  id: string;
  slug: string;
  name: string;
  website: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  images: AirtableImage[];
  servicesOffered: string[];
  serviceKeys: ServiceKey[];
  typeOfExperience: string[];
  accessType: string;
  overallPriceRange: string;
  googleRating: string;
  bookingLink: string;
  openingHours: string;
  editorialSummary: string;
  neighbourhood: string;
  areaOfLondon: string;
  instagramLink: string;
};

type AirtableAttachment = {
  id?: string;
  url?: string;
  filename?: string;
};

type AirtableRecord = {
  id: string;
  fields: {
    Name?: string;
    Slug?: string;
    Website?: string;
    Address?: string;
    Phone?: string;
    Email?: string;
    Description?: string;
    Images?: AirtableAttachment[];
    "Services Offered"?: string[] | string;
    "Type of Experience"?: string[] | string;
    "Access Type"?: string[] | string;
    "Overall Price Range"?: string;
    "Google Rating"?: string;
    "Booking Link"?: string;
    "Opening Hours"?: string;
    "Editorial Summary"?: string;
    Neighbourhood?: string[] | string;
    "Area of London"?: string[] | string;
    "Instagram Link"?: string;
  };
};

type AirtableResponse = {
  records?: AirtableRecord[];
  offset?: string;
};

function normaliseList(value: string[] | string | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normaliseSingle(value: string[] | string | undefined): string {
  return normaliseList(value).join(", ");
}

function normaliseImages(value: AirtableAttachment[] | undefined): AirtableImage[] {
  if (!value) return [];
  return value
    .filter((image) => image.url)
    .map((image) => ({
      id: image.id || image.url || "",
      url: image.url || "",
      filename: image.filename || "Wellness London image",
    }));
}

function createSlug(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return slug || fallback.toLowerCase();
}

function normaliseServiceKeys(services: string[]): ServiceKey[] {
  const keys = new Set<ServiceKey>();

  services.forEach((service) => {
    const value = service.toLowerCase();

    if (value.includes("sauna") || value.includes("infrared") || value.includes("finnish")) {
      keys.add("sauna");
    }

    if (
      value.includes("cold") ||
      value.includes("plunge") ||
      value.includes("ice bath") ||
      value.includes("ice tub")
    ) {
      keys.add("cold-plunge");
    }

    if (value.includes("cryo")) {
      keys.add("cryotherapy");
    }

    if (
      value.includes("recovery") ||
      value.includes("compression") ||
      value.includes("red light") ||
      value.includes("massage")
    ) {
      keys.add("recovery");
    }

    if (value.includes("breath")) {
      keys.add("breathwork");
    }

    if (value.includes("yoga")) {
      keys.add("yoga");
    }

    if (value.includes("meditation") || value.includes("sound bath")) {
      keys.add("meditation");
    }
  });

  return Array.from(keys);
}

function mapRecordToFacility(record: AirtableRecord): AirtableFacility {
  const name = record.fields.Name || "Unnamed wellness space";
  const servicesOffered = normaliseList(record.fields["Services Offered"]);
  const neighbourhood = normaliseSingle(record.fields.Neighbourhood);
  const areaOfLondon = normaliseSingle(record.fields["Area of London"]);
  const slugSource = record.fields.Slug || [name, neighbourhood || areaOfLondon].filter(Boolean).join(" ");

  return {
    id: record.id,
    slug: createSlug(slugSource, record.id),
    name,
    website: record.fields.Website || "#",
    address: record.fields.Address || "London",
    phone: record.fields.Phone || "",
    email: record.fields.Email || "",
    description: record.fields.Description || "Premium wellness experience in London",
    images: normaliseImages(record.fields.Images),
    servicesOffered,
    serviceKeys: normaliseServiceKeys(servicesOffered),
    typeOfExperience: normaliseList(record.fields["Type of Experience"]),
    accessType: normaliseSingle(record.fields["Access Type"]),
    overallPriceRange: record.fields["Overall Price Range"] || "",
    googleRating: record.fields["Google Rating"] || "",
    bookingLink: record.fields["Booking Link"] || "",
    openingHours: record.fields["Opening Hours"] || "",
    editorialSummary: record.fields["Editorial Summary"] || "",
    neighbourhood,
    areaOfLondon,
    instagramLink: record.fields["Instagram Link"] || "",
  };
}

export async function getFacilities(): Promise<AirtableFacility[]> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Wellness London";

  if (!apiKey || !baseId) {
    console.warn("Airtable environment variables are missing. Falling back to no live records.");
    return [];
  }

  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams({ pageSize: "100" });

    if (offset) {
      params.set("offset", offset);
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error("Failed to fetch Airtable facilities", response.status, response.statusText);
      return records.map(mapRecordToFacility);
    }

    const data = (await response.json()) as AirtableResponse;
    records.push(...(data.records || []));
    offset = data.offset;
  } while (offset);

  return records.map(mapRecordToFacility);
}
