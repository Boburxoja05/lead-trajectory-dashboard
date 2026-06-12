export default function LeadQuality({ data }) {
  const jami = data.sifatli + data.sifatsiz + data.noAnswer + data.dublikat + data.spam;
  const qualityRate = jami ? ((data.realLid / jami) * 100).toFixed(1) : 0;

  const items = [
    { label: "Sifatli lid", value: data.sifatli, color: "var(--green)", bar: "var(--green)" },
    { label: "No Answer", value: data.noAnswer, color: "var(--red)", bar: "var(--red)" },
    { label: "Sifatsiz lid", value: data.sifatsiz, color: "var(--accent)", bar: "var(--accent)" },
    { label: "Dublikat", value: data.dublikat, color: "var(--purple)", bar: "var(--purple)" },
    { label: "Spam", value: data.spam, color: "#f87171", bar: "#f87171" },
    { label: "Real lid %", value: `${qualityRate}%`, color: "var(--blue)", bar: "var(--blue)" },
  ];

  const max = Math.max(data.sifatli, data.noAnswer, data.sifatsiz, data.dublikat, data.spam, 1);

  return (
    <section className="card p-5">
      <h2 className="card-title">Lid sifati tahlili</h2>
      <p className="card-subtitle" style={{ marginBottom: 18 }}>
        Leadlarning sifati, javobsiz qolganlari, dublikat va spam ulushi
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              background: "var(--panel-3)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "14px",
            }}
          >
            <p className="metric-label">{item.label}</p>
            <p style={{ color: item.color, fontWeight: 800, fontSize: 26, letterSpacing: "-0.03em", margin: "6px 0 8px" }}>
              {item.value}
            </p>
            {typeof item.value === "number" && (
              <div className="bar-track">
                <div style={{ width: `${(item.value / max) * 100}%`, height: "100%", borderRadius: 99, background: item.bar }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
