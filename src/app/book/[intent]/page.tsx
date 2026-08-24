import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingScheduler from "@/components/marketing/BookingScheduler";
import { calendarHref, isBookingIntent } from "@/lib/booking";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ intent: string }>;
}): Promise<Metadata> {
  const { intent } = await params;
  const title = intent === "training"
    ? "Plan a team AI training session | Elyst AI"
    : "Book an AI workflow call | Elyst AI";

  return {
    title: { absolute: title },
    robots: { index: false, follow: false },
  };
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ intent: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ intent }, campaignParameters] = await Promise.all([params, searchParams]);
  if (!isBookingIntent(intent)) notFound();

  const isIdentify = intent === "identify";

  return (
    <main id="main" className="flex-1 bg-bg pt-28">
      <section style={{ padding: "clamp(32px, 5vw, 64px) var(--section-px) var(--section-py)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">{isIdentify ? "Services" : "Training"}</p>
            <h1 className="mt-4 text-fg" style={{ fontSize: "var(--text-h1)" }}>
              {isIdentify ? "Book an AI workflow call." : "Plan a team AI training session."}
            </h1>
            <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
              Choose a suitable time below.
            </p>
          </div>
          <BookingScheduler intent={intent} src={calendarHref(intent, campaignParameters)} />
          <noscript>
            <p className="mt-5 text-fg-2">
              JavaScript is required to load the calendar. You can also use the direct booking link:
              {" "}
              <a className="font-bold text-emerald underline" href={calendarHref(intent, campaignParameters)}>
                open Cal.com
              </a>.
            </p>
          </noscript>
        </div>
      </section>
    </main>
  );
}
