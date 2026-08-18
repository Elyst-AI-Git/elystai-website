import { CtaBanner } from "@/components/ui/cta-banner";
import TrackedBookingButton from "@/components/marketing/TrackedBookingButton";
import type { BookingIntent } from "@/lib/marketing-analytics";
import type { ReactNode } from "react";

export default function FinalCta({
  heading = "Change how your team use AI.",
  sub = "Bring tasks that take too long and we will tell you if AI is the answer.",
  buttonLabel = "Book an audit call",
  intent = "audit",
}: {
  heading?: ReactNode;
  sub?: string;
  buttonLabel?: string;
  intent?: BookingIntent;
}) {
  return (
    <CtaBanner
      tone="dark"
      radius="var(--radius)"
      heading={heading}
      sub={sub}
      actions={
        <TrackedBookingButton intent={intent} variant="solid" tone="green">
          {buttonLabel}
        </TrackedBookingButton>
      }
    />
  );
}
