export default function LostReasons() {
  const totalLost = 180;

  const reasons = [
    { name: "Narx juda qimmat", percent: 34 },
    { name: "Telefon ko'tarmadi", percent: 28 },
    { name: "Hozir vaqti yo'q", percent: 18 },
    { name: "Raqobatchini tanladi", percent: 12 },
    { name: "Follow-up kelmadi", percent: 8 },
  ].map((item) => ({
    ...item,
    count: Math.round((totalLost * item.percent) / 100),
  }));

  const barColors = [
    "var(--red)",
    "#fb923c",
    "var(--accent)",
    "var(--purple)",
    "var(--muted)",
  ];

  return (
    <div className="card p-5">
      <h2 className="card-title">Yo'qolish sabablari</h2>
      <p className="card-subtitle" style={{ marginBottom: 18 }}>
        Sotuvga o'tmagan lidlarning asosiy yo'qolish sabablari
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {reasons.map((item, i) => (
          <div key={item.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <p style={{ color: "var(--text)", fontSize: 13, fontWeight: 500 }}>{item.name}</p>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>
                {item.percent}%
                <span className="muted-text" style={{ fontWeight: 500, marginLeft: 6 }}>
                  · {item.count} lid
                </span>
              </p>
            </div>
            <div className="bar-track">
              <div style={{ width: `${item.percent}%`, height: "100%", borderRadius: 99, background: barColors[i] }} />
            </div>
          </div>
        ))}
      </div>

      <hr className="divider" style={{ margin: "18px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="metric-label">Show rate</p>
          <p style={{ color: "#fff", fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", margin: "4px 0 2px" }}>
            71%
          </p>
          <p className="muted-text" style={{ fontSize: 11 }}>78 keldi / 110 belgilangan uchrashuv</p>
        </div>
        <span className="badge badge-amber">Yaxshilash mumkin</span>
      </div>
    </div>
  );
}
