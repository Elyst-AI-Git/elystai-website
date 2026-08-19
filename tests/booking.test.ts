import assert from "node:assert/strict";
import test from "node:test";

import {
  CALENDAR_URLS,
  bookingPageHref,
  calendarHref,
  isBookingIntent,
} from "../src/lib/booking.ts";

test("services and training use separate booking funnels", () => {
  assert.ok(CALENDAR_URLS.audit.startsWith("https://cal.com/"));
  assert.ok(CALENDAR_URLS.training.startsWith("https://cal.com/"));
  assert.equal(bookingPageHref("audit"), "/book/audit");
  assert.equal(bookingPageHref("training"), "/book/training");
  assert.notEqual(
    new URL(calendarHref("audit")).searchParams.get("utm_campaign"),
    new URL(calendarHref("training")).searchParams.get("utm_campaign"),
  );
});

test("calendar links preserve campaign attribution and reject unrelated parameters", () => {
  const url = new URL(
    calendarHref("audit", {
      utm_source: "linkedin",
      utm_campaign: "kerala_ops",
      referral_code: "should-not-leak",
    }),
  );

  assert.equal(url.searchParams.get("utm_source"), "linkedin");
  assert.equal(url.searchParams.get("utm_medium"), "website");
  assert.equal(url.searchParams.get("utm_campaign"), "kerala_ops");
  assert.equal(url.searchParams.has("referral_code"), false);
});

test("booking intent validation is explicit", () => {
  assert.equal(isBookingIntent("audit"), true);
  assert.equal(isBookingIntent("training"), true);
  assert.equal(isBookingIntent("sales"), false);
});
