export function isSafeImageUrl(value?: string | null): value is string {
  if (!value) return false;

  const trimmedValue = value.trim();
  if (!trimmedValue) return false;

  return trimmedValue.startsWith("/") && !trimmedValue.startsWith("//");
}

export function safeImageUrl(value?: string | null) {
  return isSafeImageUrl(value) ? value.trim() : undefined;
}
