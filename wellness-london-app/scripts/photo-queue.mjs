import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const app = resolve(fileURLToPath(new URL("..", import.meta.url)));
const source = resolve(app, "src/data/generated/directory-snapshot.json");
const out = resolve(app, "photo-review/venue-photo-queue.json");
const discover = process.argv.includes("--discover");
const maxSites = 20;

function privateIp(ip) {
  const v = ip.toLowerCase();
  if (v.includes(":")) {
    return v === "::1" || v === "::" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe8") || v.startsWith("fe9") || v.startsWith("fea") || v.startsWith("feb") || v.startsWith("::ffff:");
  }
  const p = v.split(".").map(Number);
  return p[0] === 0 || p[0] === 10 || p[0] === 127 || p[0] >= 224 || (p[0] === 169 && p[1] === 254) || (p[0] === 172 && p[1] >= 16 && p[1] <= 31) || (p[0] === 192 && p[1] === 168) || (p[0] === 100 && p[1] >= 64 && p[1] <= 127) || (p[0] === 192 && p[1] === 0);
}
export function allowedWebsite(value) {
  try {
    const u = new URL(value);
    return u.protocol === "https:" && !u.username && !u.password && !u.port && u.hostname.includes(".") && !u.hostname.endsWith(".local") && !isIP(u.hostname) && !["localhost", "metadata.google.internal"].includes(u.hostname);
  } catch { return false; }
}
function extractMeta(html, key) {
  const tags = html.match(/<meta\s+[^>]*>/gi) || [];
  for (const tag of tags) {
    const attr = (name) => {
      const match = tag.match(new RegExp("(?:^|\\s)" + name + "\\s*=\\s*([\"'])(.*?)\\1", "i"));
      return match?.[2] || "";
    };
    if ([attr("property"), attr("name")].includes(key)) return attr("content");
  }
  return "";
}
export function imageCandidates(html, pageUrl) {
  const results = [];
  for (const key of ["og:image", "twitter:image"]) {
    const raw = extractMeta(html, key);
    try {
      const url = new URL(raw, pageUrl);
      if (url.protocol !== "https:" || url.username || url.password || !url.hostname) continue;
      if (!results.some((x) => x.url === url.href)) results.push({ sourceTag: key, url: url.href, permission: "unverified" });
    } catch { /* no valid candidate */ }
  }
  return results;
}
async function inspectWebsite(url) {
  if (!allowedWebsite(url)) return { status: "unsupported_url", candidates: [] };
  try {
    const host = new URL(url).hostname;
    const addresses = await lookup(host, { all: true });
    if (!addresses.length || addresses.some((x) => privateIp(x.address))) return { status: "unsafe_dns", candidates: [] };
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(7500), headers: { "Accept": "text/html", "User-Agent": "WellEditPhotoReview/1.0 (metadata-only; no image downloads)" } });
    if (!response.ok || !(response.headers.get("content-type") || "").toLowerCase().includes("text/html")) return { status: "unavailable_html", candidates: [] };
    const length = Number(response.headers.get("content-length") || 0);
    if (length > 1_000_000) return { status: "too_large", candidates: [] };
    const html = (await response.text()).slice(0, 1_000_000);
    return { status: "candidates_only", candidates: imageCandidates(html, url) };
  } catch { return { status: "request_failed", candidates: [] }; }
}
/** Search-link only: Commons images must still be individually checked for
 * exact venue, source, licence, composition and historical accuracy.
 */
export function commonsMediaSearchUrl(venueName, neighbourhood = "") {
  const cleaned = String(venueName || "")
    .replace(/\s*[—–-]\s*(?:Spa Experience|London|Branch)\s*$/i, "")
    .trim();
  const query = [cleaned, neighbourhood, "London"].filter(Boolean).join(" ");
  const url = new URL("https://commons.wikimedia.org/w/index.php");
  url.searchParams.set("title", "Special:MediaSearch");
  url.searchParams.set("type", "image");
  url.searchParams.set("search", query);
  return url.toString();
}

export function makeQueue(snapshot) {
  const records = Array.isArray(snapshot?.records) ? snapshot.records : [];
  const published = records.filter((r) => r.fields?.["Publish Status"] === "Published" && r.fields?.Indexable === true);
  const queue = published.map((record) => {
    const f = record.fields;
    const coverCount = Array.isArray(f["Cover Image"]) ? f["Cover Image"].length : 0;
    const galleryCount = Array.isArray(f.Images) ? f.Images.length : 0;
    return {
      recordId: record.id, slug: f.Slug, venue: f.Name, neighbourhood: f.Neighborhood || "",
      officialWebsite: f.Website || "", coverCount, galleryCount,
      commonsSearchUrl: commonsMediaSearchUrl(f.Name, f.Neighborhood),
      priority: coverCount === 0 ? "P0_missing_cover" : galleryCount === 0 ? "P1_missing_gallery" : "P2_existing_photos",
      rightsStatus: "not_reviewed", approvedToPublish: false, candidates: []
    };
  }).sort((a, b) => (a.coverCount - b.coverCount) || (a.galleryCount - b.galleryCount) || a.venue.localeCompare(b.venue));
  return {
    createdAt: new Date().toISOString(), snapshotGeneratedAt: snapshot?.generatedAt || null,
    summary: {
      publishedVenues: published.length,
      withoutCover: queue.filter((x) => !x.coverCount).length,
      withoutGallery: queue.filter((x) => !x.galleryCount).length
    }, venues: queue
  };
}
/** Rotate the weekly bounded review across the complete missing-cover queue.
 * Without rotation, every weekly run rechecks the same first 20 venues.
 * Week zero starts at the Unix epoch, giving stable batches across reruns.
 */
export function selectDiscoveryBatch(venues, batchSize = maxSites, at = new Date()) {
  const eligible = venues.filter((venue) => !venue.coverCount && venue.officialWebsite);
  if (eligible.length <= batchSize) return eligible;
  const week = Math.floor(at.getTime() / (7 * 86400000));
  const pages = Math.ceil(eligible.length / batchSize);
  const page = ((week % pages) + pages) % pages;
  return eligible.slice(page * batchSize, (page + 1) * batchSize);
}

async function main() {
  const queue = makeQueue(JSON.parse(await readFile(source, "utf8")));
  if (discover) {
    const batch = selectDiscoveryBatch(queue.venues);
    for (const venue of batch) {
      venue.discovery = await inspectWebsite(venue.officialWebsite);
    }
    queue.summary.officialSitesEligible = queue.venues.filter((v) => !v.coverCount && v.officialWebsite).length;
    queue.summary.officialSitesChecked = batch.length;
    queue.summary.candidateUrls = queue.venues.reduce((n, v) => n + (v.discovery?.candidates?.length || 0), 0);
    queue.summary.discoveryNote = "Bounded weekly rotating batch; candidate metadata only, not licensed images";
  }
  await mkdir(resolve(app, "photo-review"), { recursive: true });
  await writeFile(out, JSON.stringify(queue, null, 2) + "\n");
  console.log(JSON.stringify({ ...queue.summary, artifact: "photo-review/venue-photo-queue.json", note: "Discovery metadata only; no rights granted or images published." }));
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main().catch((error) => { console.error(error.message); process.exitCode = 1; });
