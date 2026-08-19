import type { ReactNode } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import BookingButton from "@/components/marketing/BookingButton";
import { CtaBanner } from "@/components/ui/cta-banner";
import type { BookingIntent } from "@/lib/booking";

export default function ClosingCta({
  heading = "Change how your team uses AI at work.",
  sub = "Bring tasks that take too long and we will tell you if AI is the answer.",
  buttonLabel = "See how we work",
  intent = "audit",
  href = "/services",
}: {
  heading?: ReactNode;
  sub?: ReactNode;
  buttonLabel?: string;
  intent?: BookingIntent;
  href?: string;
}) {
  const action = intent === "training" ? (
    <BookingButton intent={intent} variant="solid" tone="green">
      {buttonLabel}
    </BookingButton>
  ) : (
    <BrandButton href={href} variant="solid" tone="green">
      {buttonLabel}
    </BrandButton>
  );

  return (
    <CtaBanner
      tone="dark"
      radius="var(--radius)"
      heading={heading}
      sub={sub}
      actions={action}
    />
  );
}
