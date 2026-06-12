import { pulQiymat } from "@/utils/calculations";

export default function CriticalMoneyLoss({ data }) {
  const items = [
    {
      label: "Risk ostidagi lidlar",
      value: data.yoqotilgan,
      sub: "Sotuvga o'tmay qolgan",
      color: "var(--accent)",
    },
    {
      label: "Potensial sotuv",
      value: data.potensialSotuv,
      sub: "Qayta ishlansa yopilishi mumkin",
      color: "#fff",
    },
    {
      label: "Tiklanishi mumkin",
      value: pulQiymat(data.potensialTushum),
      sub: "Potensial tushum",
      color: "var(--green)",
    },
  ];

  return (
    <section className="opportunity-card p-5">
      <h2 style={{ color: "var(--accent)", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
        ◈ O'sish imkoniyatlari
      </h2>
      <p className="muted-text" style={{ fontSize: 12, marginBottom: 14 }}>
        Yo'qotilgan yoki javobsiz lidlarni qayta ishlash orqali qo'shimcha tushum olish mumkin.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(245,158,11,0.2)",
              borderRadius: 10,
              padding: "16px",
            }}
          >
            <p className="metric-label">{item.label}</p>
            <p style={{ color: item.color, fontWeight: 800, fontSize: 28, letterSpacing: "-0.03em", margin: "6px 0 2px" }}>
              {item.value}
            </p>
            <p className="muted-text" style={{ fontSize: 11 }}>{item.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
