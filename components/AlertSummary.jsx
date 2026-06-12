export default function AlertSummary({ data }) {
  const alerts = [
    {
      label: "Menejer riski",
      value: `${data.zeroSalesManagers} ta menejer`,
      sub: "Sotuv yo'q",
      icon: "👤",
    },
    {
      label: "Kampaniya riski",
      value: `${data.zeroRoasCampaigns} ta kampaniya`,
      sub: "Daromad bermayapti",
      icon: "📢",
    },
    {
      label: "Javobsiz lidlar",
      value: `${data.noAnswerLeads} ta lid`,
      sub: "No Answer holatida",
      icon: "📵",
    },
    {
      label: "Konversiya farqi",
      value: `Fakt: ${data.factCr}%`,
      sub: `Reja: ${data.planCr}%`,
      icon: "📉",
    },
  ];

  return (
    <section className="alert-card p-5">
      <h2 style={{ color: "#f87171", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
        ⚠ Diqqat talab qiluvchi holatlar
      </h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {alerts.map((item) => (
          <div
            key={item.label}
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 10,
              padding: "14px 16px",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <div>
              <p className="muted-text" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {item.label}
              </p>
              <p style={{ color: "#f87171", fontWeight: 700, fontSize: 16, marginTop: 2 }}>{item.value}</p>
              <p className="muted-text" style={{ fontSize: 11, marginTop: 1 }}>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
