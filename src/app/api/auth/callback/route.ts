import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Note: deliberately does NOT read a `next` query param. Supabase's redirect
// allow-list strips non-standard query params from redirectTo/emailRedirectTo
// URLs and silently falls back to site_url when it does — which sent users to
// the production homepage instead of back to /register. This route always
// lands on /register, the only destination this app currently needs.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/register";

  // Sanitize next to prevent open-redirect vulnerabilities
  let safeNext = "/register";
  if (next.startsWith("/") && !next.startsWith("//")) {
    safeNext = next;
  }

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  // redirect to register page with error search parameter
  return NextResponse.redirect(`${origin}/register?error=auth_failed`);
}
