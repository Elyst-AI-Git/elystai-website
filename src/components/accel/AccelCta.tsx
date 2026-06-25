import { BrandButton } from "@/components/ui/brand-button";
import { CtaBanner } from "@/components/ui/cta-banner";

/**
 * Accelerator close — mirrors the AIOS page's closing band via the shared
 * green CtaBanner so both arms resolve their hero's promise the same way.
 * The community (Circle) is the primary action; the AI for Work waitlist is
 * the secondary. Rounded corners (the Accelerator's softer language).
 */
export default function AccelCta() {
  return (
    <CtaBanner
      radius="0.375rem"
      bordered
      wide
      stackedActions
      headingSize="calc(var(--text-h2) - 3px)"
      heading={
        <>
          Join the Circle today.
          <br />
          It&rsquo;s where the learning lives now.
        </>
      }
      actions={
        <>
          <BrandButton href="/circle" variant="solid" tone="emerald">
            Join the community
          </BrandButton>
          <BrandButton href="/waitlist" tone="light">
            AI for Work waitlist
          </BrandButton>
        </>
      }
    />
  );
}
