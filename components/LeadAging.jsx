import { pulQiymat } from "@/utils/calculations";

export default function LeadAging() {
  const averageDeal = 500;

  const data = [
    { label: "0–1 kun", count: 120, note: "Yangi lidlar", status: "Normal", statusColor: "var(--green)", barColor: "var(--green)" },
    { label: "2–3 kun", count: 84,  note: "Follow-up kerak", status: "Nazorat", statusColor: "var(--accent)", barColor: "var(--accent)" },
    { label: "4–7 kun", count: 42,  note: "Sovish xavfi bor", status: "Xavf", statusColor: "#fb923c", barColor: "#fb923c" },
    { label: "7+ kun", count: 18,  note: "Tezkor harakat kerak", status: "Kritik", statusColor: "var(--red)", barColor: "var(--red)" },
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);
  const critical = data.find((item) => item.label === "7+ kun");

  return (
    <section className="card p-5">
      <h2 className="card-title">Lead Aging</h2>
      <p className="card-subtitle" style={{ marginBottom: 18 }}>
        Javobsiz yoki yopilmagan lidlar qancha kundan beri turib qolganini ko'rsatadi
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.map((item) => {
          const percent = Math.round((item.count / total) * 100);
          return (
            <div key={item.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 8, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, width: 56, flexShrink: 0 }}>{item.label}</span>
                  <span className="muted-text" style={{ fontSize: 12 }}>{item.count} lid · {percent}%</span>
                </div>
                <span className="badge" style={{ background: item.barColor + "22", color: item.statusColor, flexShrink: 0 }}>
                  {item.status}
                </span>
              </div>
              <div className="bar-track">
                <div style={{ width: `${percent}%`, height: "100%", borderRadius: 99, background: item.barColor }} />
              </div>
              <p className="muted-text" style={{ fontSize: 11, marginTop: 3 }}>{item.note}</p>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 18,
          background: "var(--red-soft)",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 10,
          padding: "12px 14px",
        }}
      >
        <p style={{ color: "#f87171", fontSize: 13, fontWeight: 600 }}>
          Kritik zona: {critical.count} ta lid 7 kundan ortiq turib qolgan.
        </p>
        <p className="muted-text" style={{ fontSize: 12, marginTop: 3 }}>
          Qayta ishlash orqali tiklanishi mumkin:{" "}
          <span style={{ color: "var(--green)", fontWeight: 700 }}>{pulQiymat(critical.count * averageDeal)}</span>
        </p>
      </div>
    </section>
  );
}
