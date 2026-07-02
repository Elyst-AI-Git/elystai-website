import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { logEvent, normalizeCorrelationId } from "@/lib/logging";

// Client-side journey milestones land here (checkout_viewed, razorpay_opened,
// confirmation_confirmed, etc.). The browser can never write app.* directly —
// this route validates the session and writes on the user's behalf via the
// service-role logger, same trust model as the rest of the app schema.
//
// Deliberately permissive and quiet: an unauthenticated or malformed beacon is
// accepted-and-dropped (204) rather than erroring, because analytics beacons
// (navigator.sendBeacon / fetch keepalive) must never surface errors to the
// user or block navigation.

// Allowlist of client-emittable event names — stops the open endpoint from
// being used to write arbitrary junk into the log.
const ALLOWED_CLIENT_EVENTS = new Set([
  "checkout_viewed",
  "otp_requested",
  "otp_verified",
  "checkout_submitted",
  "razorpay_opened",
  "razorpay_dismissed",
  "razorpay_handler_success",
  "onboarding_viewed",
  "onboarding_submitted",
  "confirmation_pending",
  "confirmation_confirmed",
]);

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Silently drop unauthenticated beacons — nothing to attribute them to.
    if (!user) {
      return new NextResponse(null, { status: 204 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return new NextResponse(null, { status: 204 });
    }

    const event = typeof body.event === "string" ? body.event : "";
    if (!ALLOWED_CLIENT_EVENTS.has(event)) {
      return new NextResponse(null, { status: 204 });
    }

    await logEvent({
      event,
      source: "client",
      correlationId: normalizeCorrelationId(body.correlationId),
      profileId: user.id,
      orderId: typeof body.orderId === "string" ? body.orderId : null,
      payload:
        body.payload && typeof body.payload === "object"
          ? (body.payload as Record<string, unknown>)
          : null,
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    // Never let a logging beacon error bubble to the client.
    return new NextResponse(null, { status: 204 });
  }
}
