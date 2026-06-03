function Badge({ text }) {
  const color =
    text === "Yaxshi" || text === "Ideal"
      ? "bg-green-50 text-green-700"
      : text === "O‘rta" || text === "Past"
      ? "bg-yellow-50 text-yellow-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {text}
    </span>
  );
}

export default function SalesExtraBlocks() {
  const followUps = [
    ["1-aloqa darhol", 620, 112, "18%", "Yaxshi"],
    ["2-urinish 1 kun", 210, 19, "9%", "O‘rta"],
    ["3-urinish 3 kun", 90, 3, "3%", "Past"],
    ["4+ urinish", 30, 1, "1%", "Stop"],
  ];

  const response = [
    ["< 5 daqiqa", "89%", "31%", "Ideal"],
    ["5–30 daqiqa", "74%", "23%", "Yaxshi"],
    ["30 daq – 2 soat", "51%", "14%", "O‘rta"],
    ["> 2 soat", "28%", "6%", "Xavfli"],
  ];

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-950">
          Follow-up samaradorligi
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Nechanchi aloqa urinishida javob va sotuv ko‘proq bo‘layotganini ko‘rsatadi.
        </p>

        <table className="w-full min-w-[650px] text-left text-sm">
          <thead>
            <tr className="border-b text-gray-700">
              <th className="pb-3">Urinish</th>
              <th className="pb-3">Lead</th>
              <th className="pb-3">Sotuv</th>
              <th className="pb-3">Sotuv %</th>
              <th className="pb-3">Baho</th>
            </tr>
          </thead>

          <tbody>
            {followUps.map(([attempt, leads, sales, cr, status]) => (
              <tr key={attempt} className="border-b border-gray-100">
                <td className="py-3 font-semibold text-gray-950">{attempt}</td>
                <td className="py-3 text-gray-900">{leads}</td>
                <td className="py-3 text-gray-900">{sales}</td>
                <td className="py-3 font-bold text-blue-600">{cr}</td>
                <td className="py-3"><Badge text={status} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 rounded-xl bg-green-50 border border-green-100 p-4">
          <p className="text-sm text-gray-700">
            Asosiy xulosa: sotuvlarning katta qismi ilk 2 ta follow-up ichida yopiladi.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-950">
          Javob vaqti ta’siri
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Leadga qanchalik tez javob berilsa, reach va close rate shunchalik yuqori bo‘ladi.
        </p>

        <table className="w-full min-w-[650px] text-left text-sm">
          <thead>
            <tr className="border-b text-gray-700">
              <th className="pb-3">Javob vaqti</th>
              <th className="pb-3">Reach %</th>
              <th className="pb-3">Close %</th>
              <th className="pb-3">Holat</th>
            </tr>
          </thead>

          <tbody>
            {response.map(([time, reach, close, status]) => (
              <tr key={time} className="border-b border-gray-100">
                <td className="py-3 font-semibold text-gray-950">{time}</td>
                <td className="py-3 text-gray-900">{reach}</td>
                <td className="py-3 font-bold text-blue-600">{close}</td>
                <td className="py-3"><Badge text={status} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-4">
          <p className="text-sm text-gray-700">
            Tavsiya: 5 daqiqa ichida javob berish CRM jarayonida asosiy KPI bo‘lishi kerak.
          </p>
        </div>
      </div>
    </section>
  );
}