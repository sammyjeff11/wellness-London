const allowedRemoteImageHosts = new Set(["v5.airtableusercontent.com", "v6.airtableusercontent.com"]);

export function isSafeImageUrl(value?: string | null): value is string {
  if (!value) return false;

  const trimmedValue = value.trim();
  if (!trimmedValue) return false;

  if (trimmedValue.startsWith("/") && !trimmedValue.startsWith("//")) return true;

  let url: URL;
  try {
    url = new URL(trimmedValue);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;
  if (allowedRemoteImageHosts.has(url.hostname)) return true;

  return url.hostname === "dl.airtable.com" && url.pathname.startsWith("/.attachments/");
}

export function safeImageUrl(value?: string | null) {
  return isSafeImageUrl(value) ? value.trim() : undefined;
}
