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
