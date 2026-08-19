import type { ReactNode } from "react";
import BookingButton from "@/components/marketing/BookingButton";
import { CtaBanner } from "@/components/ui/cta-banner";
import type { BookingIntent } from "@/lib/booking";

export default function ClosingCta({
  heading = "Change how your team uses AI.",
  sub = "Bring tasks that take too long and we will tell you if AI is the answer.",
  buttonLabel = "Book an audit call",
  intent = "audit",
}: {
  heading?: ReactNode;
  sub?: ReactNode;
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
        <BookingButton intent={intent} variant="solid" tone="green">
          {buttonLabel}
        </BookingButton>
      }
    />
  );
}
