import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // 1. Verify signature on RAW body
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    // A malformed signature header (not valid hex) or a malformed JSON body
    // will never succeed on retry — return 400 (no retry) instead of letting
    // it fall through to the catch-all 500 (which Razorpay retries forever).
    let signatureValid = false;
    try {
      const expectedBuf = Buffer.from(expectedSignature, "hex");
      const signatureBuf = Buffer.from(signature, "hex");
      signatureValid =
        expectedBuf.length === signatureBuf.length &&
        crypto.timingSafeEqual(expectedBuf, signatureBuf);
    } catch {
      return NextResponse.json({ error: "Malformed signature header" }, { status: 400 });
    }

    if (!signatureValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    type RazorpayWebhookPayload = {
      id?: string;
      event?: string;
      payload?: {
        order?: { entity?: { id?: string } };
        payment?: { entity?: { id?: string; order_id?: string; amount?: number; currency?: string } };
      };
    };
    let payload: RazorpayWebhookPayload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Malformed JSON payload" }, { status: 400 });
    }
    // Prefer the header Razorpay guarantees on every delivery over the body's
    // own `id` field, which depends on JSON parsing succeeding cleanly.
    const eventId = request.headers.get("x-razorpay-event-id") || payload.id;
    const eventType = payload.event;

    if (!eventId) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const supabaseAdmin = createAdminSupabaseClient();

    // 2. Deduplicate using app.webhook_events
    const { error: insertEventError } = await supabaseAdmin
      .schema("app")
      .from("webhook_events")
      .insert({
        event_id: eventId,
        event_type: eventType,
        payload: payload,
        status: "received",
      });

    if (insertEventError) {
      if (insertEventError.code === "23505") {
        // A row for this event already exists. Only short-circuit if it was
        // already fully processed — if a previous attempt left it at
        // "received" or "failed" (crashed mid-way, transient DB error), let
        // this retry fall through and actually finish the work instead of
        // swallowing it as a no-op duplicate.
        const { data: existingEvent } = await supabaseAdmin
          .schema("app")
          .from("webhook_events")
          .select("status")
          .eq("event_id", eventId)
          .maybeSingle();

        if (existingEvent?.status === "processed") {
          return NextResponse.json({ status: "duplicate" }, { status: 200 });
        }
        // Fall through to step 3 and reprocess; step 4 will mark it processed.
      } else {
        return NextResponse.json(
          { error: `Failed to record event: ${insertEventError.message}` },
          { status: 500 }
        );
      }
    }

    // 3. Process events
    if (eventType === "order.paid" || eventType === "payment.captured") {
      let razorpayOrderId: string | undefined;
      let razorpayPaymentId: string | undefined;

      if (eventType === "order.paid") {
        razorpayOrderId = payload.payload?.order?.entity?.id;
        razorpayPaymentId = payload.payload?.payment?.entity?.id;
      } else if (eventType === "payment.captured") {
        razorpayOrderId = payload.payload?.payment?.entity?.order_id;
        razorpayPaymentId = payload.payload?.payment?.entity?.id;
      }

      if (!razorpayOrderId) {
        await supabaseAdmin
          .schema("app")
          .from("webhook_events")
          .update({ status: "failed" })
          .eq("event_id", eventId);
        return NextResponse.json(
          { error: "Missing Razorpay order ID in payload" },
          { status: 400 }
        );
      }

      // Fetch current payment status
      const { data: payment, error: paymentFetchError } = await supabaseAdmin
        .schema("app")
        .from("payments")
        .select("id, status, enrollment_id, amount, currency")
        .eq("razorpay_order_id", razorpayOrderId)
        .maybeSingle();

      if (paymentFetchError || !payment) {
        await supabaseAdmin
          .schema("app")
          .from("webhook_events")
          .update({ status: "failed" })
          .eq("event_id", eventId);
        return NextResponse.json(
          { error: `Payment record not found for order ID: ${razorpayOrderId}` },
          { status: 404 }
        );
      }

      // The amount/currency Razorpay says was captured must match what we
      // told Razorpay to charge when the order was created — otherwise a
      // tampered or mismatched event could activate an enrollment for less
      // than the real price. Checked for BOTH event types: order.paid's
      // payload also carries payload.payment.entity.amount/currency, and
      // skipping the check there would let an order.paid delivery activate
      // an enrollment without ever being amount-verified.
      const eventAmount = payload.payload?.payment?.entity?.amount;
      const eventCurrency = payload.payload?.payment?.entity?.currency;
      if (
        eventAmount !== undefined &&
        (eventCurrency == null || eventAmount !== payment.amount || eventCurrency !== payment.currency)
      ) {
        await supabaseAdmin
          .schema("app")
          .from("webhook_events")
          .update({ status: "failed" })
          .eq("event_id", eventId);
        return NextResponse.json(
          { error: "Payment amount/currency mismatch" },
          { status: 400 }
        );
      }

      // Out-of-order tolerance: check if payment is already marked 'paid'
      if (payment.status !== "paid") {
        // Update payment row to 'paid'
        const { error: paymentUpdateError } = await supabaseAdmin
          .schema("app")
          .from("payments")
          .update({
            status: "paid",
            razorpay_payment_id: razorpayPaymentId || null,
            paid_at: new Date().toISOString(),
          })
          .eq("id", payment.id);

        if (paymentUpdateError) {
          await supabaseAdmin
            .schema("app")
            .from("webhook_events")
            .update({ status: "failed" })
            .eq("event_id", eventId);
          return NextResponse.json(
            { error: `Failed to update payment: ${paymentUpdateError.message}` },
            { status: 500 }
          );
        }

        // Update enrollment row to 'active'
        const { error: enrollmentUpdateError } = await supabaseAdmin
          .schema("app")
          .from("enrollments")
          .update({
            status: "active",
          })
          .eq("id", payment.enrollment_id);

        if (enrollmentUpdateError) {
          console.error("Failed to activate enrollment:", enrollmentUpdateError);
          // Do NOT mark the webhook event "processed" — the payment is paid
          // but the enrollment never went active, which would otherwise look
          // identical to a successful delivery and never get retried. Leave
          // the event row at "received" and return 500 so Razorpay retries;
          // the payment-status guard above makes the retry idempotent (it'll
          // skip re-updating payment and just retry this enrollment update).
          return NextResponse.json(
            { error: `Failed to activate enrollment: ${enrollmentUpdateError.message}` },
            { status: 500 }
          );
        }
      }
    } else if (eventType === "payment.failed") {
      const razorpayOrderId = payload.payload?.payment?.entity?.order_id;
      if (razorpayOrderId) {
        const { data: payment, error: paymentFetchError } = await supabaseAdmin
          .schema("app")
          .from("payments")
          .select("id, status")
          .eq("razorpay_order_id", razorpayOrderId)
          .maybeSingle();

        if (payment && !paymentFetchError) {
          // Out-of-order check: only mark failed if it hasn't been set to paid
          if (payment.status !== "paid") {
            await supabaseAdmin
              .schema("app")
              .from("payments")
              .update({
                status: "failed",
              })
              .eq("id", payment.id);
          }
        }
      }
    }

    // 4. Mark webhook event as processed
    await supabaseAdmin
      .schema("app")
      .from("webhook_events")
      .update({
        status: "processed",
        processed_at: new Date().toISOString(),
      })
      .eq("event_id", eventId);

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Webhook processing error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
