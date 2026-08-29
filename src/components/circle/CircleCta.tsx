import ClosingCta from "@/components/marketing/ClosingCta";

/**
 * Circle close — uses the same CTA surface as the other marketing pages.
 */
export default function CircleCta() {
  return (
    <ClosingCta
      heading={
        <>
          Everyone in this circle is moving.
          <br />
          The only question is whether you&rsquo;re in it.
        </>
      }
      sub="Apply now and join the people already ahead."
      buttonLabel="Apply now"
      href="https://nas.io/elystaicircle"
    />
  );
}
