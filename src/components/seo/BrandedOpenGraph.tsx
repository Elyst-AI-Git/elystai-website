export default function BrandedOpenGraph({
  eyebrow,
  headline,
  supporting,
}: {
  eyebrow: string;
  headline: string;
  supporting: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 82px",
        color: "#f5f8f6",
        background:
          "linear-gradient(135deg, #03624c 0%, #05271f 58%, #08110d 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          color: "#00df82",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ width: 54, height: 2, background: "#00df82" }} />
        {eyebrow}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            display: "flex",
            maxWidth: 1000,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: "-0.045em",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 900,
            color: "rgba(245,248,246,0.74)",
            fontSize: 28,
            lineHeight: 1.35,
          }}
        >
          {supporting}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ color: "#ffffff", fontSize: 34, fontWeight: 700 }}>elyst AI</div>
        <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.16)" }} />
        <div style={{ color: "#00df82", fontSize: 22 }}>elystai.com</div>
      </div>
    </div>
  );
}
