export type NavSection = "venues" | "services" | "areas" | "guides";

const longevityPaths = new Set([
  "/longevity",
  "/health-screening-london",
  "/blood-testing-london",
  "/cardiovascular-screening-london",
  "/dexa-scan-london",
  "/vo2-max-testing-london",
  "/medical-imaging-london",
]);

const servicePaths = new Set([
  "/services",
  "/sauna-london",
  "/infrared-sauna-london",
  "/cold-plunge-london",
  "/contrast-therapy-london",
  "/cryotherapy-london",
  "/red-light-therapy-london",
  "/hbot-london",
  "/recovery-london",
  "/stress-regulation-london",
  "/assisted-stretching-london",
]);

const areaPaths = new Set([
  "/neighbourhoods",
  "/central-london-wellness",
  "/east-london-wellness",
  "/west-london-wellness",
  "/north-london-wellness",
  "/south-london-wellness",
]);

export function getActiveNavSection(pathname: string): NavSection | null {
  if (pathname === "/explore" || pathname === "/brands" || pathname.startsWith("/facility/") || pathname.startsWith("/brand/")) return "venues";
  if (longevityPaths.has(pathname) || pathname === "/longevity-london") return "services";
  if (pathname.startsWith("/neighbourhoods/") || areaPaths.has(pathname)) return "areas";
  if (
    pathname === "/editorial" ||
    pathname.startsWith("/editorial/") ||
    pathname === "/collections" ||
    pathname.startsWith("/collections/") ||
    pathname.startsWith("/guides/") ||
    pathname.startsWith("/journal") ||
    pathname.startsWith("/best-") ||
    pathname === "/beginner-friendly-wellness-london" ||
    pathname === "/quiet-wellness-spaces-london" ||
    pathname === "/luxury-wellness-spaces-london" ||
    pathname === "/how-we-curate" ||
    pathname === "/editorial-standards"
  ) return "guides";
  if (servicePaths.has(pathname)) return "services";
  return null;
}
