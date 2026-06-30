import { BrandButton } from "@/components/ui/brand-button";
import { CtaBanner } from "@/components/ui/cta-banner";

/**
 * AIOS close — a deep dark-green panel (the dark tone of the shared CtaBanner)
 * with sharp corners, matching the AIOS page's sharp-edged language. The
 * action is a bright-green button that pops against the dark panel.
 */
export default function AiosCta() {
  return (
    <CtaBanner
      sharp
      tone="dark"
      heading="See AIOS running in your business."
      sub="We will show you exactly what it would do for your team."
      actions={
        <BrandButton href="https://cal.com/elyst-ai/30min" variant="solid" tone="green">
          Book a call
        </BrandButton>
      }
    />
  );
}
