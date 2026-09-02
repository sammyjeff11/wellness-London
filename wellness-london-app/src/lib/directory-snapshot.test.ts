import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

function readSnapshot(relativePath: string) {
  return JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf8")) as {
    records: Array<{ id: string; fields: Record<string, unknown> }>;
  };
}

function selectName(value: unknown) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "name" in value) return String(value.name || "");
  return "";
}

test("published directory snapshot is non-empty, unique and contains no remote images", () => {
  const snapshot = readSnapshot("../data/generated/directory-snapshot.json");
  const slugs = snapshot.records.map((record) => String(record.fields.Slug || ""));

  assert.ok(snapshot.records.length > 0);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)));

  for (const record of snapshot.records) {
    assert.equal(selectName(record.fields["Publish Status"]), "Published");
    assert.equal(record.fields.Indexable, true);
    assert.equal("Research Notes" in record.fields, false);
    assert.equal("Editorial Confidence" in record.fields, false);

    for (const fieldName of ["Cover Image", "Images"]) {
      const images = (record.fields[fieldName] || []) as Array<{ url?: string }>;
      assert.ok(images.every((image) => image.url?.startsWith(`/venues/${record.fields.Slug}/`)));
      assert.ok(
        images.every(
          (image) => image.url && existsSync(new URL(`../../public${image.url}`, import.meta.url)),
        ),
      );
    }
  }
});

test("service mapping snapshot is non-empty with unique canonical names", () => {
  const snapshot = readSnapshot("../data/generated/service-pillar-mappings.json");
  const names = snapshot.records.map((record) => String(record.fields["Service Name"] || "").toLowerCase());

  assert.ok(snapshot.records.length > 0);
  assert.equal(new Set(names).size, names.length);
});

test("priority diagnostic pages retain verified provider coverage", () => {
  const snapshot = readSnapshot("../data/generated/directory-snapshot.json");
  const providersFor = (diagnostic: string) => snapshot.records.filter((record) => {
    const diagnostics = (record.fields["Confirmed Diagnostics"] || []) as string[];
    return diagnostics.includes(diagnostic);
  });

  assert.ok(providersFor("DEXA Scan").length >= 4, "DEXA page must retain at least four providers");
  assert.ok(
    providersFor("Cardiovascular Screening").length >= 3,
    "cardiovascular page must retain at least three providers",
  );
});
