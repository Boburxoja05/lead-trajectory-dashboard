export default function SpeedQuality() {
  const cards = [
    { title: "O‘rtacha javob vaqti", value: "3,2 daq", note: "Ideal: < 5 daq", color: "text-green-600" },
    { title: "Reach rate", value: "68%", note: "Maqsad: 80%", color: "text-orange-600" },
    { title: "Pipeline velocity", value: "11,4 kun", note: "O‘rtacha sotuv sikli", color: "text-blue-600" },
    { title: "CAC", value: "$68,03", note: "Mijoz tannarxi", color: "text-red-600" },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <div key={item.title} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">{item.title}</p>
          <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>{item.value}</h2>
          <p className="mt-1 text-sm text-gray-500">{item.note}</p>
        </div>
      ))}
    </section>
  );
}