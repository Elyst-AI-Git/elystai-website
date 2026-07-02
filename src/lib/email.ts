import type { SupabaseClient } from "@supabase/supabase-js";
import { logEvent } from "@/lib/logging";

/**
 * Post-payment confirmation email (Issue 1).
 *
 * Sending is env-gated: if RESEND_API_KEY is set we send via Resend's HTTP API
 * (no SDK dependency); otherwise we log-and-skip so the flow still works in
 * environments without email configured. Single-fire is guaranteed by the
 * caller claiming app.enrollments.confirmation_sent_at atomically before we
 * ever hit the provider (see claimAndSendConfirmation).
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function formatPaise(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString("en-IN")}`;
}

async function sendViaResend(to: string, amountPaise: number | null): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Elyst AI <onboarding@resend.dev>";
  if (!apiKey) return false; // not configured — caller logs the skip

  const priceLine = amountPaise != null ? ` of ${formatPaise(amountPaise)}` : "";
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: "You're enrolled — AI for Work by Elyst AI",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;color:#0A0F0C">
          <h2 style="color:#03624c">You're officially enrolled 🎉</h2>
          <p>Thanks for registering for <strong>AI for Work</strong>. Your payment${priceLine} is confirmed and your seat is reserved.</p>
          <p>Our team will reach out on WhatsApp with the next steps and joining details.</p>
          <p style="color:#4b5563;font-size:13px">If you didn't make this payment, reply to this email right away.</p>
          <p style="margin-top:24px">— Team Elyst AI</p>
        </div>`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
  return true;
}

/**
 * Atomically claim the confirmation-email slot for an enrollment and, if this
 * caller won the claim, send the email. Safe to call from the webhook AND the
 * verify route AND retries — only the first successful claim sends.
 *
 * Best-effort: never throws into the payment flow. A provider failure is
 * logged; the claim stays set (we do not un-claim) to avoid retry storms —
 * the log + interaction_events give support the trail to resend manually.
 */
export async function claimAndSendConfirmation(
  admin: SupabaseClient,
  params: { enrollmentId: string; email: string | null; amountPaise: number | null; correlationId: string | null; orderId: string | null }
): Promise<void> {
  const { enrollmentId, email, amountPaise, correlationId, orderId } = params;
  try {
    // Claim: flip NULL -> now(), returning the row only if WE set it.
    const { data: claimed } = await admin
      .schema("app")
      .from("enrollments")
      .update({ confirmation_sent_at: new Date().toISOString() })
      .eq("id", enrollmentId)
      .is("confirmation_sent_at", null)
      .select("id")
      .maybeSingle();

    if (!claimed) return; // someone already claimed/sent — skip silently

    if (!email) {
      await logEvent({ event: "email.confirmation.skipped", source: "server", correlationId, orderId, payload: { reason: "no_email", enrollmentId } });
      return;
    }

    const sent = await sendViaResend(email, amountPaise);
    await logEvent({
      event: sent ? "email.confirmation.sent" : "email.confirmation.skipped",
      source: "server",
      correlationId,
      orderId,
      payload: sent ? { enrollmentId } : { reason: "no_provider_configured", enrollmentId },
    });
  } catch (err) {
    console.error("claimAndSendConfirmation failed:", err);
    await logEvent({
      event: "email.confirmation.failed",
      source: "server",
      correlationId,
      orderId,
      payload: { enrollmentId, error: (err as Error).message },
    });
  }
}
