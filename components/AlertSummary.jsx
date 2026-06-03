export default function AlertSummary({ data }) {
  const alerts = [
    {
      title: "Menejerlar bo‘yicha risk",
      text: `${data.zeroSalesManagers} ta menejerda sotuv yo‘q`,
    },
    {
      title: "Kampaniyalar bo‘yicha risk",
      text: `${data.zeroRoasCampaigns} ta kampaniya daromad bermayapti`,
    },
    {
      title: "Javobsiz leadlar",
      text: `${data.noAnswerLeads} ta lead No Answer holatida`,
    },
    {
      title: "Konversiya farqi",
      text: `Reja: ${data.planCr}% · Fakt: ${data.factCr}%`,
    },
  ];

  return (
    <section className="rounded-2xl bg-red-50 border border-red-200 p-5">
      <h2 className="text-xl font-bold text-red-700">
        ⚠ Diqqat talab qiluvchi holatlar
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {alerts.map((item) => (
          <div key={item.title} className="rounded-xl bg-white border border-red-100 p-4">
            <p className="text-sm text-gray-600">{item.title}</p>
            <h3 className="mt-2 text-lg font-bold text-red-700">{item.text}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}