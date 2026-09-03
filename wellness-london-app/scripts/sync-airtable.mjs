import { mkdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateDirectoryInsights } from "./generate-directory-insights.mjs";

const appRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const directoryPath = join(appRoot, "src/data/generated/directory-snapshot.json");
const mappingPath = join(appRoot, "src/data/generated/service-pillar-mappings.json");
const publicRoot = join(appRoot, "public");

const DIRECTORY_TABLE_ID = "tbl0obGXRinZFBnUM";
const MAPPING_TABLE_ID = "tbla50fh3UBUk3LKw";
const AIRTABLE_PAGE_SIZE = "100";
const MAX_RETRIES = 4;

const publicDirectoryFields = new Set([
  "Name", "Slug", "Website", "Business Name", "Brand / Operator", "Address", "Phone", "Email",
  "Description", "Cover Image", "Images", "Services Offered", "Primary Service", "Secondary Services",
  "Activity Category", "Activity Tags Standardized", "Activity Display Labels", "Venue Type Standardized",
  "Theme Tags Standardized", "Primary Pillar", "Best For Standardized", "Type of Experience", "Access Type",
  "Overall Price Range", "Google Rating", "Google Review Count", "Booking Link", "Opening Hours",
  "Editorial Summary", "Good To Know", "Neighborhood", "Area of London", "Instagram Link", "Best For",
  "Editorial Verdict", "Price From", "Experience Type", "Showers Available", "Towels Included", "Atmosphere",
  "Well Suited For", "Publish Status", "Indexable", "Verification Status", "Last Checked", "Clinic Model",
  "Clinical Oversight", "Confirmed Diagnostics", "Assessment Format", "Results Included", "Venue Confirmed",
  "Service Last Verified", "Access Model", "Social Format", "Community Features", "Social & Community Note",
]);

const mappingFields = new Set([
  "Service Name", "Canonical Service Slug", "Primary Pillar", "Display on Pillar Page?", "Notes",
]);

function selectName(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value.name || "";
  return typeof value === "string" ? value : "";
}

function isPublishedIndexable(record) {
  return selectName(record.fields?.["Publish Status"]) === "Published" && record.fields?.Indexable === true;
}

function slugFor(record) {
  return String(record.fields?.Slug || "").trim();
}

function normalisePublicValue(value) {
  if (Array.isArray(value)) return value.map(normalisePublicValue);
  if (
    value &&
    typeof value === "object" &&
    typeof value.name === "string" &&
    (String(value.id || "").startsWith("sel") || "color" in value)
  ) {
    return value.name;
  }
  return value;
}

function sanitiseFields(fields, allowedFields) {
  return Object.fromEntries(
    Object.entries(fields || {})
      .filter(([name, value]) => allowedFields.has(name) && value !== undefined)
      .map(([name, value]) => [name, normalisePublicValue(value)]),
  );
}

function imageExtension(attachment) {
  const extension = extname(attachment.filename || "").toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"].includes(extension)) return extension;

  const typeExtensions = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/avif": ".avif",
    "image/gif": ".gif",
  };
  return typeExtensions[attachment.type] || ".jpg";
}

async function fileExists(path) {
  try {
    return (await stat(path)).size > 0;
  } catch {
    return false;
  }
}

async function downloadImage(url, destination) {
  const response = await fetch(url, { signal: AbortSignal.timeout(45_000) });
  if (!response.ok) throw new Error(`Image download failed with ${response.status}: ${url}`);

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) throw new Error(`Attachment is not an image: ${url}`);

  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength === 0 || bytes.byteLength > 12_000_000) {
    throw new Error(`Attachment has an invalid size (${bytes.byteLength} bytes): ${url}`);
  }

  const temporary = `${destination}.tmp`;
  await writeFile(temporary, bytes);
  await rename(temporary, destination);
}

async function mirrorAttachments(record) {
  const slug = slugFor(record);
  const fields = record.fields;

  for (const fieldName of ["Cover Image", "Images"]) {
    const attachments = Array.isArray(fields[fieldName]) ? fields[fieldName] : [];
    const mirrored = [];

    for (const attachment of attachments) {
      if (!attachment?.id || !attachment?.url) continue;

      if (attachment.url.startsWith("/venues/")) {
        mirrored.push({ id: attachment.id, url: attachment.url, filename: attachment.filename || "Well+ image" });
        continue;
      }

      const extension = imageExtension(attachment);
      const relativeUrl = `/venues/${slug}/${attachment.id}${extension}`;
      const directory = join(publicRoot, "venues", slug);
      const destination = join(publicRoot, relativeUrl);
      await mkdir(directory, { recursive: true });

      if (!(await fileExists(destination))) await downloadImage(attachment.url, destination);
      mirrored.push({ id: attachment.id, url: relativeUrl, filename: attachment.filename || "Well+ image" });
    }

    if (mirrored.length > 0) fields[fieldName] = mirrored;
    else delete fields[fieldName];
  }
}

export function validateDirectoryRecords(records, previousPublishedCount = 0) {
  if (!Array.isArray(records) || records.length === 0) throw new Error("Directory snapshot contains no published venues.");

  const ids = new Set();
  const slugs = new Set();

  for (const record of records) {
    const slug = slugFor(record);
    const name = String(record.fields?.Name || "").trim();
    const hasEditorialCopy = ["Editorial Summary", "Editorial Verdict", "Description"]
      .some((field) => String(record.fields?.[field] || "").trim());

    if (!record.id || ids.has(record.id)) throw new Error(`Duplicate or missing Airtable record ID: ${record.id || "(blank)"}`);
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid production slug: ${slug || "(blank)"}`);
    if (slugs.has(slug)) throw new Error(`Duplicate production slug: ${slug}`);
    if (!name) throw new Error(`Published venue ${slug} has no name.`);
    if (!hasEditorialCopy) throw new Error(`Published venue ${slug} has no useful editorial copy.`);
    if (!isPublishedIndexable(record)) throw new Error(`Non-published venue entered the production snapshot: ${slug}`);

    const unexpectedFields = Object.keys(record.fields || {}).filter((field) => !publicDirectoryFields.has(field));
    if (unexpectedFields.length) throw new Error(`Private or unknown fields found for ${slug}: ${unexpectedFields.join(", ")}`);

    for (const fieldName of ["Cover Image", "Images"]) {
      for (const attachment of record.fields?.[fieldName] || []) {
        if (!String(attachment.url || "").startsWith(`/venues/${slug}/`)) {
          throw new Error(`Venue ${slug} still contains a remote or invalid image URL.`);
        }
      }
    }

    ids.add(record.id);
    slugs.add(slug);
  }

  if (
    previousPublishedCount > 0 &&
    records.length < Math.ceil(previousPublishedCount * 0.8) &&
    process.env.ALLOW_LARGE_DIRECTORY_REDUCTION !== "true"
  ) {
    throw new Error(
      `Published venue count fell from ${previousPublishedCount} to ${records.length}. Set ALLOW_LARGE_DIRECTORY_REDUCTION=true only after confirming the removal.`,
    );
  }
}

export function validateMappingRecords(records) {
  if (!Array.isArray(records) || records.length === 0) throw new Error("Service mapping snapshot is empty.");
  const services = new Set();

  for (const record of records) {
    const fields = record.fields || {};
    const serviceName = String(fields["Service Name"] || "").trim();
    const slug = String(fields["Canonical Service Slug"] || "").trim();
    const unexpectedFields = Object.keys(fields).filter((field) => !mappingFields.has(field));

    if (!serviceName || services.has(serviceName.toLowerCase())) throw new Error(`Duplicate or missing service mapping: ${serviceName || "(blank)"}`);
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid service slug for ${serviceName}: ${slug}`);
    if (!selectName(fields["Primary Pillar"])) throw new Error(`Service mapping ${serviceName} has no primary pillar.`);
    if (unexpectedFields.length) throw new Error(`Unknown service mapping fields: ${unexpectedFields.join(", ")}`);
    services.add(serviceName.toLowerCase());
  }
}

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function fetchAirtableTable(baseId, tableId, apiKey) {
  const records = [];
  let offset;

  do {
    const params = new URLSearchParams({ pageSize: AIRTABLE_PAGE_SIZE });
    if (offset) params.set("offset", offset);
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}?${params}`;

    let response;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
      response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(45_000),
      });
      if (response.ok) break;
      if (![429, 500, 502, 503, 504].includes(response.status) || attempt === MAX_RETRIES) {
        throw new Error(`Airtable request failed with ${response.status} ${response.statusText}`);
      }
      const retryAfter = Number(response.headers.get("retry-after"));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : attempt * 5_000;
      await new Promise((resolveDelay) => setTimeout(resolveDelay, Math.min(delay, 30_000)));
    }

    const payload = await response.json();
    if (!Array.isArray(payload.records)) throw new Error("Airtable returned an invalid records response.");
    records.push(...payload.records);
    offset = payload.offset;
  } while (offset);

  return records;
}

function snapshotContent(snapshot) {
  return JSON.stringify({ schemaVersion: snapshot.schemaVersion, source: snapshot.source, records: snapshot.records });
}

async function publishSnapshots(rawDirectoryRecords, rawMappingRecords) {
  const previousDirectory = await readJson(directoryPath);
  const previousMappings = await readJson(mappingPath);
  const previousPublishedCount = (previousDirectory?.records || []).filter(isPublishedIndexable).length;

  const directoryRecords = rawDirectoryRecords
    .filter(isPublishedIndexable)
    .map((record) => ({ id: record.id, fields: sanitiseFields(record.fields, publicDirectoryFields) }))
    .sort((a, b) => slugFor(a).localeCompare(slugFor(b)));
  const serviceMappingRecords = rawMappingRecords
    .map((record) => ({ id: record.id, fields: sanitiseFields(record.fields, mappingFields) }))
    .sort((a, b) => String(a.fields["Service Name"] || "").localeCompare(String(b.fields["Service Name"] || "")));

  for (const record of directoryRecords) await mirrorAttachments(record);
  validateDirectoryRecords(directoryRecords, previousPublishedCount);
  validateMappingRecords(serviceMappingRecords);

  const now = new Date().toISOString();
  const nextDirectory = {
    schemaVersion: 1,
    generatedAt: now,
    source: { base: "Wellness Listings", table: "Wellness London" },
    records: directoryRecords,
  };
  const nextMappings = {
    schemaVersion: 1,
    generatedAt: now,
    source: { base: "Wellness Listings", table: "Service Pillar Mapping" },
    records: serviceMappingRecords,
  };

  if (previousDirectory && snapshotContent(previousDirectory) === snapshotContent(nextDirectory)) {
    nextDirectory.generatedAt = previousDirectory.generatedAt;
  }
  if (previousMappings && snapshotContent(previousMappings) === snapshotContent(nextMappings)) {
    nextMappings.generatedAt = previousMappings.generatedAt;
  }

  await mkdir(join(appRoot, "src/data/generated"), { recursive: true });
  await writeFile(directoryPath, `${JSON.stringify(nextDirectory, null, 2)}\n`);
  await writeFile(mappingPath, `${JSON.stringify(nextMappings, null, 2)}\n`);
  await generateDirectoryInsights();
  console.log(`Published snapshot: ${directoryRecords.length} venues, ${serviceMappingRecords.length} service mappings.`);
}

async function main() {
  if (process.argv.includes("--validate-only")) {
    const directory = await readJson(directoryPath);
    const mappings = await readJson(mappingPath);
    validateDirectoryRecords(directory?.records || []);
    validateMappingRecords(mappings?.records || []);
    console.log(`Validated snapshot: ${directory.records.length} venues, ${mappings.records.length} service mappings.`);
    return;
  }

  if (process.argv.includes("--prepare-existing")) {
    const directory = await readJson(directoryPath);
    const mappings = await readJson(mappingPath);
    if (!directory || !mappings) throw new Error("Existing raw snapshots are required for initial preparation.");
    await publishSnapshots(directory.records, mappings.records);
    return;
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) throw new Error("AIRTABLE_API_KEY and AIRTABLE_BASE_ID are required to publish Airtable data.");

  const [directoryRecords, serviceMappingRecords] = await Promise.all([
    fetchAirtableTable(baseId, DIRECTORY_TABLE_ID, apiKey),
    fetchAirtableTable(baseId, MAPPING_TABLE_ID, apiKey),
  ]);
  await publishSnapshots(directoryRecords, serviceMappingRecords);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
