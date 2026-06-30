import { BrandButton } from "@/components/ui/brand-button";
import { CtaBanner } from "@/components/ui/cta-banner";

/**
 * Circle close — now the shared green CtaBanner so the Circle resolves the same
 * way as the AIOS, Accelerator and AI-for-Work closes, instead of the page's
 * old bespoke dark band. Rounded + bordered, matching the Accelerator close.
 */
export default function CircleCta() {
  return (
    <CtaBanner
      radius="var(--radius)"
      bordered
      heading={
        <>
          Everyone in this circle is moving.
          <br />
          The only question is whether you&rsquo;re in it.
        </>
      }
      sub="Apply now and join the people already ahead."
      actions={
        <BrandButton href="https://nas.io/elystaicircle" variant="solid" tone="emerald">
          Apply now
        </BrandButton>
      }
    />
  );
}
