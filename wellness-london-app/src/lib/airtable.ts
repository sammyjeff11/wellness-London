export type AirtableImage = {
  id: string;
  url: string;
  filename: string;
};

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

function createSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function mapRecordToFacility(record: AirtableRecord): AirtableFacility {
  const name = record.fields.Name || "Unnamed wellness space";
  const neighbourhood = normaliseSingle(record.fields.Neighbourhood);
  const areaOfLondon = normaliseSingle(record.fields["Area of London"]);
  const slugSource = record.fields.Slug || [name, neighbourhood || areaOfLondon].filter(Boolean).join(" ");

  return {
    id: record.id,
    slug: createSlug(slugSource) || record.id,
    name,
    website: record.fields.Website || "#",
    address: record.fields.Address || "London",
    phone: record.fields.Phone || "",
    email: record.fields.Email || "",
    description: record.fields.Description || "Premium wellness experience in London",
    images: normaliseImages(record.fields.Images),
    servicesOffered: normaliseList(record.fields["Services Offered"]),
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
