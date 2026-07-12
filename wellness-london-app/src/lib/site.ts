export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://welledit.co.uk").replace(/\/$/, "");

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncateMetaText(value: string, maxLength = 158) {
  const normalised = value.replace(/\s+/g, " ").trim();
  if (normalised.length <= maxLength) return normalised;

  const shortened = normalised.slice(0, maxLength - 1).replace(/\s+\S*$/, "").trim();
  return `${shortened || normalised.slice(0, maxLength - 1).trim()}…`;
}
