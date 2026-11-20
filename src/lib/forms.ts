export const TEAM_SIZES = ["1–9", "10–30", "31+"] as const;
export const INTERESTS = ["AI Kickstart", "AI Transformation", "Not sure"] as const;

export type FormResult = { ok: true } | { ok: false; errors: Record<string, string> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Validates a contact enquiry. Returns the cleaned values on success. */
export function parseContact(input: Record<string, unknown>) {
  const values = {
    name: text(input.name, 120),
    company: text(input.company, 160),
    email: text(input.email, 200),
    phone: text(input.phone, 40),
    teamSize: text(input.teamSize, 10),
    interest: text(input.interest, 40),
    task: text(input.task, 2000),
  };
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Please add your name.";
  if (!values.company) errors.company = "Please add your company.";
  if (!EMAIL.test(values.email)) errors.email = "Please add a valid work email.";
  if (values.phone.replace(/\D/g, "").length < 7) errors.phone = "Please add a phone or WhatsApp number.";
  if (!(TEAM_SIZES as readonly string[]).includes(values.teamSize)) errors.teamSize = "Please choose a team size.";
  if (!(INTERESTS as readonly string[]).includes(values.interest)) errors.interest = "Please choose one.";
  return { values, errors };
}

const MAX_BODY_BYTES = 10_000;
const ALLOWED_HOSTS = new Set(["elystai.com", "www.elystai.com", "localhost"]);

/** Blocks cross-site posts: the Origin (or Referer) host must be ours or a preview. */
export function isAllowedOrigin(request: Request): boolean {
  const source = request.headers.get("origin") ?? request.headers.get("referer");
  if (!source) return false;
  try {
    const host = new URL(source).hostname;
    return ALLOWED_HOSTS.has(host) || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

/**
 * Reads and checks a JSON form post. Returns the body, or an error response
 * status and message to send back.
 */
export async function readFormBody(
  request: Request,
): Promise<{ body: Record<string, unknown> } | { status: number; message: string }> {
  if (!isAllowedOrigin(request)) return { status: 403, message: "Not allowed." };
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return { status: 415, message: "Invalid request." };
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return { status: 413, message: "Invalid request." };
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return { status: 413, message: "Invalid request." };
    const body = JSON.parse(raw) as unknown;
    if (!body || typeof body !== "object" || Array.isArray(body)) return { status: 400, message: "Invalid request." };
    return { body: body as Record<string, unknown> };
  } catch {
    return { status: 400, message: "Invalid request." };
  }
}

/** A person cannot fill in a form in under three seconds; a script can. */
export function filledTooFast(input: Record<string, unknown>): boolean {
  const opened = Number(input.openedAt);
  return Number.isFinite(opened) && opened > 0 && Date.now() - opened < 3000;
}
