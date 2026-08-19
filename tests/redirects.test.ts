import assert from "node:assert/strict";
import test from "node:test";

import nextConfig from "../next.config.ts";

test("retired routes redirect directly to their current destination", async () => {
  assert.ok(nextConfig.redirects);
  const redirects = await nextConfig.redirects();
  const destinations = new Map(
    redirects.map(({ source, destination, permanent }) => [
      source,
      { destination, permanent },
    ]),
  );

  for (const source of ["/aios"]) {
    assert.deepEqual(destinations.get(source), {
      destination: "/services",
      permanent: true,
    });
  }

  for (const source of [
    "/learn",
    "/ai-for-work",
    "/juniors",
    "/waitlist",
    "/register/onboarding",
    "/register/confirmation",
  ]) {
    assert.deepEqual(destinations.get(source), {
      destination: "/training",
      permanent: true,
    });
  }
});
