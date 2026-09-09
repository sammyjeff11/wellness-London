export type PriceInput = {
  slug?: string; priceFrom?: string; priceNotes?: string; goodToKnow?: string;
  accessType?: string; description?: string;
};

/** Keep the published amount and its basis together. Unknown units are never session prices. */
export function venuePrice(venue: PriceInput) {
  const amount = Number(venue.priceFrom?.replace(/,/g, "").match(/£?\s*(\d+(?:\.\d+)?)/)?.[1]);
  if (!amount || !Number.isFinite(amount)) return { label: "Price not confirmed", comparable: Infinity, basis: "unconfirmed" };
  const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 }).format(amount).replace(/\.00$/, "");
  const notes = `${venue.priceNotes || ""} ${venue.goodToKnow || ""}`;
  const slug = venue.slug || "";
  let basis = "basis unconfirmed";
  let comparable = Infinity;
  if (slug === "sael-spa") basis = "annual membership · £250 joining fee";
  else if (slug === "the-method-club-notting-hill") basis = "monthly membership · £530 joining fee · 12-month minimum";
  else if (slug === "jab-sw1-victoria") basis = "monthly membership · published rates conflict; confirm current rate";
  else if (slug === "numa-oxygen-marylebone") basis = "consultation · treatment costs extra";
  else if (slug.startsWith("stretchlab-")) basis = "introductory 50-minute assisted stretch";
  else if (slug.startsWith("rebody-")) basis = "introductory consultation + first session";
  else if (slug === "sauna-social-club-peckham") basis = "unwaged concession · standard rate varies";
  else if (slug.startsWith("neko-health")) basis = "one-hour preventive health scan";
  else if (slug.startsWith("bodyscan-") || slug.startsWith("bodyview-")) basis = "individual DEXA scan · combined scans cost extra";
  else if (slug === "preventicum-london") basis = "Ultimate health assessment";
  else if (slug === "welbeck-heart-health") basis = "heart-health assessment package";
  else if (slug === "sea-lanes-canary-wharf") basis = "swimming + sauna visit";
  else if (/members only/i.test(venue.accessType || "")) basis = "membership · billing period unconfirmed";
  else if (/per month|monthly|\/month/i.test(venue.priceFrom || "")) basis = "monthly membership";
  else if (/per year|annual|\/year/i.test(venue.priceFrom || "")) basis = "annual membership";
  else if (slug === "banya-no-1-chiswick") { basis = "90-minute access · treatments extra"; comparable = amount; }
  else if (slug === "community-sauna-baths-peckham") { basis = "75-minute sauna session · no cold plunge"; comparable = amount; }
  else if (/^community-sauna-baths-|^pulse-club-sauna-|^lowlu-sauna-ilford$|^skuna-sauna-boat-/.test(slug)) {
    basis = /off.?peak/i.test(notes) ? "off-peak session · peak rates vary" : "shared sauna session";
    comparable = amount;
  }
  else if (/per session|\/session/i.test(venue.priceFrom || "")) { basis = "session"; comparable = amount; }
  return { label: `From ${money} · ${basis}`, comparable, basis };
}

export function sessionPriceBand(venue: PriceInput) {
  const price = venuePrice(venue).comparable;
  return !Number.isFinite(price) ? "" : price <= 25 ? "Up to £25" : price <= 50 ? "£25–£50" : price <= 100 ? "£50–£100" : "Over £100";
}
