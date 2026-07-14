import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { permanentRouteRedirects } from "./route-consolidation.ts";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [path] : [];
  });
}

const exactRetiredRoutes = permanentRouteRedirects
  .map((redirect) => redirect.source)
  .filter((source) => !source.includes(":"));

const internalLinkSource = sourceFiles("src")
  .filter((path) => !path.endsWith("route-consolidation.ts") && !path.endsWith("route-consolidation.test.ts"))
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");

test("permanent route consolidations do not create redirect chains", () => {
  const sources = new Set(permanentRouteRedirects.map((redirect) => redirect.source));

  permanentRouteRedirects.forEach((redirect) => {
    assert.ok(!sources.has(redirect.destination), `Redirect chain detected at ${redirect.destination}`);
  });
});

test("retired routes are absent from internal links and the app router", () => {
  exactRetiredRoutes.forEach((route) => {
    const escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.ok(
      !new RegExp(`["']${escapedRoute}["']`).test(internalLinkSource),
      `Internal link still targets retired route: ${route}`,
    );
    assert.ok(!existsSync(`src/app${route}/page.tsx`), `Retired page still exists: ${route}`);
  });
});
