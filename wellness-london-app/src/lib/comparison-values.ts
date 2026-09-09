/** Treat ordering differences in multi-value source fields as the same format. */
export function normaliseSessionFormat(value?: string) {
  return (
    value
      ?.split(" · ")
      .map((part) => part.trim())
      .filter(Boolean)
      .sort()
      .join(" · ") || ""
  );
}

export function comparisonSignature(value: string | string[] | undefined) {
  const parts = (Array.isArray(value) ? value : [value || ""])
    .map((part) => part.trim().toLowerCase())
    .filter(
      (part) =>
        part &&
        !["unknown", "not confirmed", "details not yet confirmed"].includes(
          part,
        ),
    );
  return Array.from(new Set(parts)).sort().join(" | ") || "not confirmed";
}
