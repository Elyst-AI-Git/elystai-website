"use client";

import { useEffect } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import {
  bookingHref,
  CAL_BOOKING_URL,
  captureArrivalUtm,
  trackBookingIntent,
  type BookingIntent,
} from "@/lib/marketing-analytics";

type TrackedBookingButtonProps = {
  intent: BookingIntent;
  children: React.ReactNode;
  variant?: "metal" | "outline" | "solid";
  tone?: "emerald" | "light" | "green";
  className?: string;
  full?: boolean;
  preset?: "chromatic" | "silver" | "gold";
  onClick?: () => void;
};

export default function TrackedBookingButton({
  intent,
  children,
  variant,
  tone,
  className,
  full,
  preset,
  onClick,
}: TrackedBookingButtonProps) {
  useEffect(() => {
    captureArrivalUtm();
  }, [intent]);

  return (
    <BrandButton
      href={CAL_BOOKING_URL}
      variant={variant}
      tone={tone}
      className={className}
      full={full}
      preset={preset}
      onClick={(event) => {
        captureArrivalUtm();
        trackBookingIntent(intent);
        event.preventDefault();
        window.location.assign(bookingHref(intent));
        onClick?.();
      }}
    >
      {children}
    </BrandButton>
  );
}
