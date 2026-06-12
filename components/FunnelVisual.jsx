export default function FunnelVisual({ data }) {
  const colors = [
    "var(--blue)",
    "#818cf8",
    "var(--purple)",
    "var(--accent)",
    "#fb923c",
    "var(--red)",
    "var(--green)",
  ];

  return (
    <div className="card p-5">
      <h2 className="card-title">Lid funnel</h2>
      <p className="card-subtitle" style={{ marginBottom: 20 }}>
        Har bir bosqichdagi lid soni va konversiyasi
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((item, index) => {
          const width = index === 0
            ? 100
            : Number(String(item.bosqichKonversiya).replace(",", "."));

          return (
            <div key={item.status} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 11,
                  fontWeight: 600,
                  width: 140,
                  flexShrink: 0,
                  textAlign: "right",
                }}
              >
                {item.status}
              </p>

              <div
                style={{
                  flex: 1,
                  height: 32,
                  background: "var(--border)",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.max(Math.min(width, 100), 4)}%`,
                    height: "100%",
                    background: colors[index % colors.length],
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 10,
                    transition: "width 0.5s ease",
                  }}
                >
                  <span style={{ color: "#000", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                    {item.soni}
                  </span>
                </div>
              </div>

              <p
                style={{
                  color: "var(--accent)",
                  fontSize: 12,
                  fontWeight: 700,
                  width: 44,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {item.bosqichKonversiya}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
