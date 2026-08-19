import type { ComponentProps } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { bookingPageHref, type BookingIntent } from "@/lib/booking";

type BookingButtonProps = Omit<ComponentProps<typeof BrandButton>, "href" | "analyticsIntent"> & {
  intent: BookingIntent;
};

export default function BookingButton({ intent, ...props }: BookingButtonProps) {
  return (
    <BrandButton
      href={bookingPageHref(intent)}
      analyticsIntent={intent}
      {...props}
    />
  );
}
