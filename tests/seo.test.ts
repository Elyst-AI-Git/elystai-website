import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const expectedIndexablePaths = [
  "/",
  "/transformation",
  "/kickstart",
  "/work",
  "/work/nalakath-holdings-ai-content-system",
  "/work/arvind-fashions-ai-training",
  "/work/kalyan-ai-onboarding-system",
  "/work/autobahn-ai-training-for-hr",
  "/about",
  "/contact",
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

import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { WORK_CASES } from "../src/lib/work-content.ts";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : [path];
  });
}

test("case study titles and descriptions fit search results", () => {
  for (const item of WORK_CASES) {
    assert.ok(item.seoTitle.length <= 60, `${item.slug} title is ${item.seoTitle.length} characters`);
    assert.ok(item.metaDescription.length <= 160, `${item.slug} description is ${item.metaDescription.length} characters`);
  }
});

test("every case study is in the sitemap and in llms.txt", () => {
  const sitemap = readFileSync(new URL("../src/app/sitemap.ts", import.meta.url), "utf8");
  const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
  for (const item of WORK_CASES) {
    assert.ok(sitemap.includes(`/work/${item.slug}"`), `${item.slug} missing from the sitemap`);
    assert.ok(llms.includes(`/work/${item.slug})`), `${item.slug} missing from llms.txt`);
  }
});

test("the site no longer carries the old direction", () => {
  const root = new URL("../src/", import.meta.url).pathname;
  const files = sourceFiles(root).filter((file) => /\.(tsx?|css)$/.test(file));
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /AI interns?\b/i, `${file} mentions AI interns`);
    assert.doesNotMatch(text, /\bAIOS\b/, `${file} mentions AIOS`);
  }
  assert.doesNotMatch(readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8"), /intern/i);
});
