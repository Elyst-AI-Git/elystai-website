import { BrandButton } from "@/components/ui/brand-button";
import { CtaBanner } from "@/components/ui/cta-banner";
import TrackedBookingButton from "@/components/marketing/TrackedBookingButton";
import type { BookingIntent } from "@/lib/marketing-analytics";

/**
 * AIOS close — a deep dark-green panel (the dark tone of the shared CtaBanner)
 * with sharp corners, matching the AIOS page's sharp-edged language. The
 * action is a bright-green button that pops against the dark panel.
 */
export default function AiosCta({
  heading = "See AIOS running in your business.",
  sub = "We will show you exactly what it would do for your team.",
  buttonLabel = "Book a call",
  intent,
}: {
  heading?: React.ReactNode;
  sub?: React.ReactNode;
  buttonLabel?: string;
  intent?: BookingIntent;
}) {
  return (
    <CtaBanner
      sharp
      tone="dark"
      heading={heading}
      sub={sub}
      actions={
        intent ? (
          <TrackedBookingButton intent={intent} variant="solid" tone="green">
            {buttonLabel}
          </TrackedBookingButton>
        ) : (
          <BrandButton href="https://cal.com/elyst-ai/30min" variant="solid" tone="green">
            {buttonLabel}
          </BrandButton>
        )
      }
    />
  );
}
