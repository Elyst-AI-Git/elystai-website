import assert from "node:assert/strict";
import test from "node:test";

import nextConfig from "../next.config.ts";

test("old routes redirect directly to their current destination", async () => {
  assert.ok(nextConfig.redirects);
  const redirects = await nextConfig.redirects();
  const destinations = new Map(
    redirects.map(({ source, destination, permanent }) => [
      source,
      { destination, permanent },
    ]),
  );

  const expected: Record<string, string> = {
    "/services": "/transformation",
    "/training": "/kickstart",
    "/aios": "/transformation",
    "/guide": "/transformation",
    "/guide/thank-you": "/transformation",
    "/training/arvind-fashions": "/work/arvind-fashions-ai-training",
    "/training/autobahn-group": "/work/autobahn-ai-training-for-hr",
    "/work/arvind-fashions": "/work/arvind-fashions-ai-training",
    "/work/autobahn-mahindra": "/work/autobahn-ai-training-for-hr",
    "/work/nalakath-holdings": "/work/nalakath-holdings-ai-content-system",
    "/work/kalyan-tourism-travel": "/work/kalyan-ai-onboarding-system",
    "/learn": "/kickstart",
    "/ai-for-work": "/kickstart",
    "/juniors": "/kickstart",
    "/waitlist": "/kickstart",
    "/circle": "/kickstart",
    "/register": "/kickstart",
    "/register/onboarding": "/kickstart",
    "/register/confirmation": "/kickstart",
    "/book/:intent": "/contact",
    "/booking-complete": "/contact",
  };

  for (const [source, destination] of Object.entries(expected)) {
    assert.deepEqual(destinations.get(source), { destination, permanent: true });
  }
});
