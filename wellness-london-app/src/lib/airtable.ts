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
  | "meditation"
  | "red-light"
  | "hbot";

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
  bestFor: string[];
  editorialVerdict: string;
  experienceType: string[];
  ambience: string;
  beginnerFriendly: string;
  premiumLevel: string;
  saunaType: string[];
  coldPlungeType: string;
  cryoType: string;
  contrastTherapyAvailable: string;
  guidedSessionsAvailable: string;
  priceFrom: string;
  priceNotes: string;
  bookingRequired: string;
  privateOrShared: string;
  towelsIncluded: string;
  showersAvailable: string;
  changingRooms: string;
  relaxationArea: string;
  nearestStation: string;
  postcode: string;
  borough: string;
  areaGroup: string;
  lastCheckedDate: string;
  verificationStatus: string;
  dataSource: string;
  profileCompletenessScore: number;
  isFeatured: boolean;
};

type AirtableAttachment = {
  id?: string;
  url?: string;
  filename?: string;
};

type AirtableFieldValue = string[] | string | number | boolean | null | undefined;

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
    Services?: string[] | string;
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
    "Best For"?: AirtableFieldValue;
    best_for?: AirtableFieldValue;
    "Editorial Verdict"?: string;
    editorial_verdict?: string;
    "Experience Type"?: AirtableFieldValue;
    experience_type?: AirtableFieldValue;
    Ambience?: AirtableFieldValue;
    ambience?: AirtableFieldValue;
    "Beginner Friendly"?: AirtableFieldValue;
    beginner_friendly?: AirtableFieldValue;
    "Premium Level"?: AirtableFieldValue;
    premium_level?: AirtableFieldValue;
    "Sauna Type"?: AirtableFieldValue;
    sauna_type?: AirtableFieldValue;
    "Cold Plunge Type"?: AirtableFieldValue;
    cold_plunge_type?: AirtableFieldValue;
    "Cryo Type"?: AirtableFieldValue;
    cryo_type?: AirtableFieldValue;
    "Contrast Therapy Available"?: AirtableFieldValue;
    contrast_therapy_available?: AirtableFieldValue;
    "Guided Sessions Available"?: AirtableFieldValue;
    guided_sessions_available?: AirtableFieldValue;
    "Price From"?: AirtableFieldValue;
    price_from?: AirtableFieldValue;
    "Price Notes"?: string;
    price_notes?: string;
    "Booking Required"?: AirtableFieldValue;
    booking_required?: AirtableFieldValue;
    "Private or Shared"?: AirtableFieldValue;
    private_or_shared?: AirtableFieldValue;
    "Towels Included"?: AirtableFieldValue;
    towels_included?: AirtableFieldValue;
    "Showers Available"?: AirtableFieldValue;
    showers_available?: AirtableFieldValue;
    "Changing Rooms"?: AirtableFieldValue;
    changing_rooms?: AirtableFieldValue;
    "Relaxation Area"?: AirtableFieldValue;
    relaxation_area?: AirtableFieldValue;
    "Nearest Station"?: string;
    nearest_station?: string;
    Postcode?: string;
    postcode?: string;
    Borough?: string;
    borough?: string;
    "Area Group"?: AirtableFieldValue;
    area_group?: AirtableFieldValue;
    "Last Checked Date"?: string;
    last_checked_date?: string;
    "Verification Status"?: AirtableFieldValue;
    verification_status?: AirtableFieldValue;
    "Data Source"?: AirtableFieldValue;
    data_source?: AirtableFieldValue;
    "Profile Completeness Score"?: number;
    profile_completeness_score?: number;
    "Is Featured"?: boolean;
    is_featured?: boolean;
  };
};

type AirtableResponse = {
  records?: AirtableRecord[];
  offset?: string;
};

function normaliseList(value: AirtableFieldValue): string[] {
  if (value === undefined || value === null || value === false) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normaliseSingle(value: AirtableFieldValue): string {
  return normaliseList(value).join(", ");
}

function normaliseBooleanLabel(value: AirtableFieldValue, fallback = "Unknown"): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  const text = normaliseSingle(value);
  return text || fallback;
}

function firstDefined<T>(...values: (T | undefined)[]): T | undefined {
  return values.find((value) => value !== undefined && value !== "") as T | undefined;
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

function normaliseImages(value: AirtableAttachment[] | undefined): AirtableImage[] {
  if (!value) return [];
  return value
    .filter((image) => image.url)
    .map((image) => ({
      id: image.id || image.url || "",
      url: image.url || "",
      filename: image.filename || "Well Edit image",
    }));
}

function normaliseServiceKeys(services: string[]): ServiceKey[] {
  const keys = new Set<ServiceKey>();

  services.forEach((service) => {
    const value = service.toLowerCase();

    if (value.includes("sauna") || value.includes("infrared") || value.includes("finnish") || value.includes("steam")) keys.add("sauna");
    if (value.includes("cold") || value.includes("plunge") || value.includes("ice bath") || value.includes("ice tub")) keys.add("cold-plunge");
    if (value.includes("cryo")) keys.add("cryotherapy");
    if (value.includes("recovery") || value.includes("compression") || value.includes("massage")) keys.add("recovery");
    if (value.includes("red light")) keys.add("red-light");
    if (value.includes("hbot") || value.includes("hyperbaric")) keys.add("hbot");
    if (value.includes("breath")) keys.add("breathwork");
    if (value.includes("yoga")) keys.add("yoga");
    if (value.includes("meditation") || value.includes("sound bath")) keys.add("meditation");
  });

  return Array.from(keys);
}

function mapRecordToFacility(record: AirtableRecord): AirtableFacility {
  const name = record.fields.Name || "Unnamed wellness space";
  const servicesOffered = normaliseList(firstDefined(record.fields.Services, record.fields["Services Offered"]));
  const neighbourhood = normaliseSingle(record.fields.Neighbourhood);
  const areaOfLondon = normaliseSingle(record.fields["Area of London"]);
  const slugSource = record.fields.Slug || [name, neighbourhood || areaOfLondon].filter(Boolean).join(" ");
  const experienceType = normaliseList(firstDefined(record.fields["Experience Type"], record.fields.experience_type, record.fields["Type of Experience"]));
  const bestFor = normaliseList(firstDefined(record.fields["Best For"], record.fields.best_for, record.fields["Type of Experience"]));
  const priceFromValue = firstDefined(record.fields["Price From"], record.fields.price_from);
  const overallPriceRange = record.fields["Overall Price Range"] || "";

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
    overallPriceRange,
    googleRating: record.fields["Google Rating"] || "",
    bookingLink: record.fields["Booking Link"] || "",
    openingHours: record.fields["Opening Hours"] || "",
    editorialSummary: record.fields["Editorial Summary"] || "",
    neighbourhood,
    areaOfLondon,
    instagramLink: record.fields["Instagram Link"] || "",
    bestFor,
    editorialVerdict: firstDefined(record.fields["Editorial Verdict"], record.fields.editorial_verdict, record.fields["Editorial Summary"], record.fields.Description) || "",
    experienceType,
    ambience: normaliseSingle(firstDefined(record.fields.Ambience, record.fields.ambience)),
    beginnerFriendly: normaliseBooleanLabel(firstDefined(record.fields["Beginner Friendly"], record.fields.beginner_friendly)),
    premiumLevel: normaliseSingle(firstDefined(record.fields["Premium Level"], record.fields.premium_level, overallPriceRange)) || "Details not yet confirmed",
    saunaType: normaliseList(firstDefined(record.fields["Sauna Type"], record.fields.sauna_type)),
    coldPlungeType: normaliseSingle(firstDefined(record.fields["Cold Plunge Type"], record.fields.cold_plunge_type)) || "Unknown",
    cryoType: normaliseSingle(firstDefined(record.fields["Cryo Type"], record.fields.cryo_type)) || "Unknown",
    contrastTherapyAvailable: normaliseBooleanLabel(firstDefined(record.fields["Contrast Therapy Available"], record.fields.contrast_therapy_available)),
    guidedSessionsAvailable: normaliseBooleanLabel(firstDefined(record.fields["Guided Sessions Available"], record.fields.guided_sessions_available)),
    priceFrom: priceFromValue ? String(priceFromValue) : overallPriceRange || "Price not listed",
    priceNotes: firstDefined(record.fields["Price Notes"], record.fields.price_notes) || "Pricing may vary by package or membership.",
    bookingRequired: normaliseSingle(firstDefined(record.fields["Booking Required"], record.fields.booking_required)) || "Booking details unclear",
    privateOrShared: normaliseSingle(firstDefined(record.fields["Private or Shared"], record.fields.private_or_shared, record.fields["Access Type"])) || "Private/shared not confirmed",
    towelsIncluded: normaliseBooleanLabel(firstDefined(record.fields["Towels Included"], record.fields.towels_included), "Details not yet confirmed"),
    showersAvailable: normaliseBooleanLabel(firstDefined(record.fields["Showers Available"], record.fields.showers_available), "Details not yet confirmed"),
    changingRooms: normaliseBooleanLabel(firstDefined(record.fields["Changing Rooms"], record.fields.changing_rooms), "Details not yet confirmed"),
    relaxationArea: normaliseBooleanLabel(firstDefined(record.fields["Relaxation Area"], record.fields.relaxation_area), "Details not yet confirmed"),
    nearestStation: firstDefined(record.fields["Nearest Station"], record.fields.nearest_station) || "",
    postcode: firstDefined(record.fields.Postcode, record.fields.postcode) || "",
    borough: firstDefined(record.fields.Borough, record.fields.borough) || "",
    areaGroup: normaliseSingle(firstDefined(record.fields["Area Group"], record.fields.area_group, record.fields["Area of London"])),
    lastCheckedDate: firstDefined(record.fields["Last Checked Date"], record.fields.last_checked_date) || "Details not yet confirmed",
    verificationStatus: normaliseSingle(firstDefined(record.fields["Verification Status"], record.fields.verification_status)) || "Unverified listing",
    dataSource: normaliseSingle(firstDefined(record.fields["Data Source"], record.fields.data_source)) || "Public sources",
    profileCompletenessScore: firstDefined(record.fields["Profile Completeness Score"], record.fields.profile_completeness_score) || 0,
    isFeatured: Boolean(firstDefined(record.fields["Is Featured"], record.fields.is_featured)),
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
