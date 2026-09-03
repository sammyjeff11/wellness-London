import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const snapshotPath = join(appRoot, "src/data/generated/directory-snapshot.json");
const healthPath = join(appRoot, "src/data/generated/directory-health.json");
const historyRoot = join(appRoot, "src/data/history");
const reportPath = join(appRoot, "reports/directory-health.md");

const fieldChecks = [
  { key: "editorial", label: "Useful description", test: (fields) => hasAny(fields, ["Editorial Summary", "Editorial Verdict", "Description"]) },
  { key: "location", label: "Location", test: (fields) => hasAny(fields, ["Neighborhood", "Area of London", "Address"]) },
  { key: "services", label: "Services", test: (fields) => hasList(fields["Services Offered"]) },
  { key: "price", label: "Price", test: (fields) => hasAny(fields, ["Price From", "Overall Price Range"]) },
  { key: "access", label: "Access", test: (fields) => hasAny(fields, ["Access Model", "Access Type"]) },
  { key: "booking", label: "Booking route", test: (fields) => hasAny(fields, ["Booking Link", "Website"]) },
  { key: "hours", label: "Opening hours", test: (fields) => hasAny(fields, ["Opening Hours"]) },
  { key: "checked", label: "Checked date", test: (fields) => hasAny(fields, ["Last Checked", "Service Last Verified"]) },
];

function hasValue(value) {
  if (Array.isArray(value)) return value.some(hasValue);
  if (typeof value === "number" || typeof value === "boolean") return true;
  if (typeof value !== "string") return false;
  const normalised = value.trim().toLowerCase();
  return Boolean(normalised) && !["unknown", "not specified", "not available", "n/a", "na", "details not yet confirmed"].includes(normalised);
}

function hasAny(fields, names) {
  return names.some((name) => hasValue(fields[name]));
}

function hasList(value) {
  return Array.isArray(value) && value.some(hasValue);
}

function selectDate(fields) {
  return fields["Last Checked"] || fields["Service Last Verified"] || "";
}

function ageInDays(value, now) {
  const time = new Date(value).getTime();
  if (!value || Number.isNaN(time)) return null;
  return Math.max(0, Math.floor((now.getTime() - time) / 86_400_000));
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function countBy(values) {
  const counts = new Map();
  for (const value of values.filter(hasValue)) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || String(a.name).localeCompare(String(b.name)));
}

function compactVenue(record) {
  const fields = record.fields || {};
  return {
    slug: fields.Slug,
    name: fields.Name,
    brand: fields["Brand / Operator"] || fields["Business Name"] || "",
    neighbourhood: fields.Neighborhood || "",
    area: fields["Area of London"] || "",
    services: fields["Services Offered"] || [],
    priceFrom: fields["Price From"] ?? null,
    priceRange: fields["Overall Price Range"] || "",
    access: fields["Access Model"] || fields["Access Type"] || "",
    openingHours: fields["Opening Hours"] || "",
    verificationStatus: fields["Verification Status"] || "",
    lastChecked: selectDate(fields),
  };
}

function buildHealth(snapshot, generatedAt) {
  const records = snapshot.records || [];
  const now = new Date(generatedAt);
  const fields = fieldChecks.map((check) => {
    const complete = records.filter((record) => check.test(record.fields || {})).length;
    return {
      key: check.key,
      label: check.label,
      complete,
      missing: records.length - complete,
      percentage: records.length ? round((complete / records.length) * 100) : 0,
    };
  });

  const venues = records.map((record) => {
    const venueFields = record.fields || {};
    const missing = fieldChecks.filter((check) => !check.test(venueFields)).map((check) => check.key);
    const checkedAgeDays = ageInDays(selectDate(venueFields), now);
    return {
      slug: venueFields.Slug,
      name: venueFields.Name,
      neighbourhood: venueFields.Neighborhood || venueFields["Area of London"] || "London",
      completeness: round(((fieldChecks.length - missing.length) / fieldChecks.length) * 100),
      missing,
      checkedAgeDays,
      stale: checkedAgeDays === null || checkedAgeDays > 90,
    };
  });

  const neighbourhoods = countBy(records.map((record) => record.fields?.Neighborhood));
  const areas = countBy(records.map((record) => record.fields?.["Area of London"]));
  const services = countBy(records.flatMap((record) => record.fields?.["Services Offered"] || []));
  const staleVenues = venues.filter((venue) => venue.stale).sort((a, b) => (b.checkedAgeDays ?? 9999) - (a.checkedAgeDays ?? 9999));
  const lowestCompleteness = [...venues].sort((a, b) => a.completeness - b.completeness || String(a.name).localeCompare(String(b.name))).slice(0, 15);
  const averageCompleteness = venues.length ? round(venues.reduce((sum, venue) => sum + venue.completeness, 0) / venues.length) : 0;

  return {
    schemaVersion: 1,
    generatedAt,
    sourceGeneratedAt: snapshot.generatedAt,
    thresholds: { staleAfterDays: 90, publishableSampleSize: 5, publishableFieldCompleteness: 70 },
    summary: {
      publishedVenues: records.length,
      neighbourhoods: neighbourhoods.length,
      services: services.length,
      averageCompleteness,
      staleVenues: staleVenues.length,
    },
    fields,
    coverage: { areas, neighbourhoods, services },
    staleVenues,
    lowestCompleteness,
    publishable: {
      fields: fields.filter((field) => field.percentage >= 70),
      areas: areas.filter((area) => area.count >= 5),
      services: services.filter((service) => service.count >= 5),
    },
  };
}

function healthReport(health) {
  const fieldRows = health.fields.map((field) => `| ${field.label} | ${field.complete}/${health.summary.publishedVenues} | ${field.percentage}% | ${field.missing} |`).join("\n");
  const incompleteRows = health.lowestCompleteness.map((venue) => `| ${venue.name} | ${venue.neighbourhood} | ${venue.completeness}% | ${venue.missing.join(", ") || "None"} |`).join("\n");
  const staleRows = health.staleVenues.length
    ? health.staleVenues.map((venue) => `| ${venue.name} | ${venue.checkedAgeDays === null ? "No checked date" : `${venue.checkedAgeDays} days`} |`).join("\n")
    : "| None | — |";

  return `# Well+ directory health\n\nGenerated ${health.generatedAt}. This report is internal and is rebuilt whenever the Airtable directory is published.\n\n## Snapshot\n\n- **${health.summary.publishedVenues}** published venues\n- **${health.summary.neighbourhoods}** neighbourhoods\n- **${health.summary.services}** services\n- **${health.summary.averageCompleteness}%** average profile completeness\n- **${health.summary.staleVenues}** venues stale or missing a checked date\n\n## Field completeness\n\n| Field | Complete | Coverage | Missing |\n| --- | ---: | ---: | ---: |\n${fieldRows}\n\n## Lowest-completeness profiles\n\n| Venue | Location | Score | Missing |\n| --- | --- | ---: | --- |\n${incompleteRows}\n\n## Stale profiles\n\nA profile is stale after ${health.thresholds.staleAfterDays} days.\n\n| Venue | Age |\n| --- | ---: |\n${staleRows}\n`;
}

export async function generateDirectoryInsights() {
  const snapshot = JSON.parse(await readFile(snapshotPath, "utf8"));
  const generatedAt = new Date().toISOString();
  const health = buildHealth(snapshot, generatedAt);
  const month = generatedAt.slice(0, 7);
  const history = {
    schemaVersion: 1,
    capturedAt: generatedAt,
    sourceGeneratedAt: snapshot.generatedAt,
    records: (snapshot.records || []).map(compactVenue),
  };

  await mkdir(join(appRoot, "src/data/generated"), { recursive: true });
  await mkdir(historyRoot, { recursive: true });
  await mkdir(join(appRoot, "reports"), { recursive: true });
  await writeFile(healthPath, `${JSON.stringify(health, null, 2)}\n`);
  await writeFile(reportPath, healthReport(health));

  try {
    await writeFile(join(historyRoot, `${month}.json`), `${JSON.stringify(history, null, 2)}\n`, { flag: "wx" });
  } catch (error) {
    if (error?.code !== "EEXIST") throw error;
  }

  console.log(`Directory insights: ${health.summary.averageCompleteness}% complete, ${health.summary.staleVenues} stale venues.`);
  return health;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateDirectoryInsights().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
