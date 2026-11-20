import { CONTACT } from "@/lib/site-content";

/** True when the email provider is configured, so forms can actually deliver. */
export function deliveryReady(): boolean {
  return Boolean(process.env.EMAIL_API_KEY && process.env.LEADS_FROM);
}

/** Removes line breaks so a value can never inject extra email headers. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

type Lead = {
  subject: string;
  replyTo?: string;
  fields: Record<string, string>;
};

/**
 * Emails an enquiry to the team through the provider's REST API (Resend by
 * default). No SDK: one fetch. Never logs the submitted values.
 */
export async function deliverLead(lead: Lead): Promise<boolean> {
  const key = process.env.EMAIL_API_KEY;
  const from = process.env.LEADS_FROM;
  if (!key || !from) return false;

  const text = Object.entries(lead.fields)
    .map(([label, value]) => `${label}: ${value || "-"}`)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [process.env.LEADS_TO || CONTACT.email],
        subject: oneLine(lead.subject),
        text,
        ...(lead.replyTo ? { reply_to: oneLine(lead.replyTo) } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
