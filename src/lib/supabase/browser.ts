import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a browser-side Supabase client using the public anon key.
 * By default, this uses the 'public' schema. Use `.schema('app')` to query
 * tables in the course platform's app schema.
 */
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-elyst.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
  return createBrowserClient(url, anonKey);
}
