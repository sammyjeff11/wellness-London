import assert from "node:assert/strict";
import test from "node:test";
import { AirtableRequestError, fetchAirtableJson } from "./airtable-request.ts";

test("returns parsed Airtable JSON for a successful response", async (context) => {
  context.mock.method(globalThis, "fetch", async () =>
    new Response(JSON.stringify({ records: [{ id: "rec1" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  );

  const result = await fetchAirtableJson<{ records: { id: string }[] }>(
    "https://api.airtable.com/v0/base/table",
    "test-key",
    { revalidate: 60, tags: ["test"] },
  );

  assert.deepEqual(result, { records: [{ id: "rec1" }] });
});

test("throws on an Airtable error instead of returning empty data", async (context) => {
  context.mock.method(globalThis, "fetch", async () =>
    new Response("rate limited", { status: 429, statusText: "Too Many Requests" }),
  );

  await assert.rejects(
    fetchAirtableJson(
      "https://api.airtable.com/v0/base/table",
      "test-key",
      { revalidate: 60, tags: ["test"] },
    ),
    (error: unknown) =>
      error instanceof AirtableRequestError &&
      error.status === 429 &&
      /429/.test(error.message),
  );
});

test("throws when Airtable returns malformed JSON", async (context) => {
  context.mock.method(globalThis, "fetch", async () =>
    new Response("not-json", { status: 200 }),
  );

  await assert.rejects(
    fetchAirtableJson(
      "https://api.airtable.com/v0/base/table",
      "test-key",
      { revalidate: 60, tags: ["test"] },
    ),
    /invalid JSON/,
  );
});
