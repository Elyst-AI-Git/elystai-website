import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/deliver";
import { filledTooFast, parseContact, readFormBody } from "@/lib/forms";
import { CONTACT } from "@/lib/site-content";

export async function POST(request: Request) {
  const read = await readFormBody(request);
  if (!("body" in read)) {
    return NextResponse.json({ ok: false, errors: { form: read.message } }, { status: read.status });
  }
  const body = read.body;

  // Honeypot and a minimum fill time: people trip neither. Pretend success.
  if ((typeof body.website === "string" && body.website.length > 0) || filledTooFast(body)) {
    return NextResponse.json({ ok: true });
  }

  const { values, errors } = parseContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const sent = await deliverLead({
    subject: `New enquiry from ${values.company}`,
    replyTo: values.email,
    fields: {
      Name: values.name,
      Company: values.company,
      Email: values.email,
      "Phone / WhatsApp": values.phone,
      "Team size": values.teamSize,
      "Interested in": values.interest,
      "What takes the most time": values.task,
    },
  });

  if (!sent) {
    return NextResponse.json(
      { ok: false, errors: { form: `We could not send this. Please call or WhatsApp us on ${CONTACT.phone}.` } },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
