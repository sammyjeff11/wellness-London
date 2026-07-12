export function formatPriceFrom(value?: string | number | null) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (/^from\s+/i.test(raw)) return raw.replace(/^from\s+/i, "From ");
  if (/^£/.test(raw)) return `From ${raw}`;
  if (/^\d+(?:\.\d+)?$/.test(raw)) return `From £${raw.replace(/\.00$/, "")}`;
  return raw;
}

export function extractUkPostcode(address: string) {
  return address.match(/\b(?:GIR\s?0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})\b/i)?.[0]?.toUpperCase() || "";
}

export const accessTypes = [
  "Public",
  "Members only",
  "Hotel guests only",
  "Hotel guests + public bookings",
  "Members + hotel guests",
] as const;

export type AccessType = (typeof accessTypes)[number];

const accessTypeAliases: Record<string, AccessType> = {
  public: "Public",
  "open to public": "Public",
  "pay as you go": "Public",
  bookable: "Public",
  "public member options": "Public",
  "public and member options": "Public",
  "members only": "Members only",
  "private members only": "Members only",
  membership: "Members only",
  "membership required": "Members only",
  "hotel guests only": "Hotel guests only",
  "hotel guests limited day access": "Hotel guests + public bookings",
  "hotel guests public bookings": "Hotel guests + public bookings",
  "members hotel guests": "Members + hotel guests",
  "members and hotel guests": "Members + hotel guests",
};

export function normaliseAccessType(value?: string | null): AccessType | "" {
  const key = String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return accessTypeAliases[key] || "";
}
