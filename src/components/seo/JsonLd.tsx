/**
 * Renders a JSON-LD <script>. Serialization escapes "<" to its unicode form so
 * authored content can never break out of the <script> tag (e.g. a stray
 * "</script>" in a description). Server component — no client JS shipped.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
