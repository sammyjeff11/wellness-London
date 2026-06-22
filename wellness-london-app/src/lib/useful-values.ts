const placeholderValues = new Set([
  "#",
  "unknown",
  "details not yet confirmed",
  "booking details unclear",
  "private/shared not confirmed",
  "price not listed",
  "unverified listing",
  "checked details not yet confirmed",
]);

const placeholderFragments = [
  "being checked",
  "being refined",
  "not yet confirmed",
  "unclear",
];

export function isUsefulValue(value: unknown): boolean {
  if (value === undefined || value === null || value === false) return false;

  if (Array.isArray(value)) {
    return value.some((item) => isUsefulValue(item));
  }

  const text = String(value).trim();
  if (!text) return false;

  const normalized = text.toLowerCase().replace(/\s+/g, " ");
  if (placeholderValues.has(normalized)) return false;

  return !placeholderFragments.some((fragment) => normalized.includes(fragment));
}

export function cleanValue(value: unknown): string | undefined {
  if (!isUsefulValue(value)) return undefined;
  return String(value).trim();
}

export function cleanList(values: unknown[] = []): string[] {
  const seen = new Set<string>();

  return values.reduce<string[]>((items, value) => {
    const cleaned = cleanValue(value);
    if (!cleaned) return items;

    const key = cleaned.toLowerCase();
    if (seen.has(key)) return items;

    seen.add(key);
    items.push(cleaned);

    return items;
  }, []);
}
