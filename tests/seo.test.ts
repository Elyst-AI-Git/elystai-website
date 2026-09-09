import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const expectedIndexablePaths = [
  "/",
  "/services",
  "/training",
  "/training/arvind-fashions",
  "/training/autobahn-group",
  "/about",
];

test("sitemap contains only canonical commercial pages", () => {
  const source = readFileSync(
    new URL("../src/app/sitemap.ts", import.meta.url),
    "utf8",
  );
  const paths = Array.from(source.matchAll(/^\s+"(\/[^"]*)",$/gm), (match) => match[1]);
  assert.deepEqual(paths, expectedIndexablePaths);
  assert.match(source, /lastModified/);
  assert.doesNotMatch(source, /changeFrequency|priority/);
});

test("legal pages remain accessible but explicitly noindex", () => {
  for (const route of ["privacy", "terms"]) {
    const source = readFileSync(
      new URL(`../src/app/${route}/page.tsx`, import.meta.url),
      "utf8",
    );
    assert.match(source, /robots: \{ index: false, follow: true \}/);
    assert.doesNotMatch(source, /being updated/i);
  }
});

test("retired Circle and registration pages are removed", () => {
  assert.equal(
    existsSync(new URL("../src/app/circle/page.tsx", import.meta.url)),
    false,
  );
  assert.equal(
    existsSync(new URL("../src/app/register/page.tsx", import.meta.url)),
    false,
  );
});
