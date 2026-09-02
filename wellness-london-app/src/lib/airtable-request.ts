type AirtableFetchOptions = {
  revalidate: number;
  tags: string[];
};

export class AirtableRequestError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AirtableRequestError";
    this.status = status;
  }
}

/**
 * Fetch Airtable data without converting an upstream outage into valid empty data.
 * Throwing is intentional: during ISR, Next.js keeps serving the last successfully
 * generated page when revalidation fails instead of replacing it with missing content.
 */
export async function fetchAirtableJson<T>(
  url: string,
  apiKey: string,
  options: AirtableFetchOptions,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, {
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: options,
    });
  } catch (error) {
    throw new AirtableRequestError(
      `Airtable request failed before a response was received: ${error instanceof Error ? error.message : "unknown network error"}`,
    );
  }

  if (!response.ok) {
    throw new AirtableRequestError(
      `Airtable request failed with ${response.status} ${response.statusText}`.trim(),
      response.status,
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new AirtableRequestError("Airtable returned an invalid JSON response", response.status);
  }
}
