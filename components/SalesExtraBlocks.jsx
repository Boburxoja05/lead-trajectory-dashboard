export default function SalesExtraBlocks() {
  const followUps = [
    ["1-aloqa darhol", 620, 112, "18%", true],
    ["2-urinish · 1 kun", 210, 19, "9%", true],
    ["3-urinish · 3 kun", 90, 3, "3%", false],
    ["4+ urinish", 30, 1, "1%", false],
  ];

  const response = [
    ["< 5 daqiqa", "89%", "31%", "badge-green"],
    ["5–30 daqiqa", "74%", "23%", "badge-green"],
    ["30 daq – 2 soat", "51%", "14%", "badge-amber"],
    ["> 2 soat", "28%", "6%", "badge-red"],
  ];

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="card p-5 overflow-x-auto">
        <h2 className="card-title">Follow-up samaradorligi</h2>
        <p className="card-subtitle" style={{ marginBottom: 16 }}>
          Nechanchi aloqa urinishida javob va sotuv ko'proq bo'layotganini ko'rsatadi
        </p>

        <table className="table-dark" style={{ minWidth: 480 }}>
          <thead>
            <tr>
              <th>Urinish</th>
              <th>Lead</th>
              <th>Sotuv</th>
              <th>Sotuv %</th>
              <th>Baho</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map(([attempt, leads, sales, cr, good]) => (
              <tr key={attempt}>
                <td style={{ color: "#fff", fontWeight: 600 }}>{attempt}</td>
                <td>{leads}</td>
                <td>{sales}</td>
                <td className="blue-text" style={{ fontWeight: 700 }}>{cr}</td>
                <td>
                  <span className={`badge ${good ? "badge-green" : "badge-red"}`}>
                    {good ? "Samarali" : "Zaif"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: 14,
            background: "var(--green-soft)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <p style={{ color: "var(--text)", fontSize: 12 }}>
            Sotuvlarning katta qismi ilk{" "}
            <span style={{ color: "var(--green)", fontWeight: 700 }}>2 ta follow-up</span> ichida yopiladi.
          </p>
        </div>
      </div>

      <div className="card p-5 overflow-x-auto">
        <h2 className="card-title">Javob vaqti ta'siri</h2>
        <p className="card-subtitle" style={{ marginBottom: 16 }}>
          Leadga qanchalik tez javob berilsa, reach va close rate shunchalik yuqori bo'ladi
        </p>

        <table className="table-dark" style={{ minWidth: 480 }}>
          <thead>
            <tr>
              <th>Javob vaqti</th>
              <th>Reach %</th>
              <th>Close %</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            {response.map(([time, reach, close, badge]) => (
              <tr key={time}>
                <td style={{ color: "#fff", fontWeight: 600 }}>{time}</td>
                <td>{reach}</td>
                <td className="blue-text" style={{ fontWeight: 700 }}>{close}</td>
                <td>
                  <span className={`badge ${badge}`}>
                    {badge === "badge-green" ? "Ideal" : badge === "badge-amber" ? "O'rta" : "Xavfli"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: 14,
            background: "var(--blue-soft)",
            border: "1px solid rgba(96,165,250,0.2)",
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <p style={{ color: "var(--text)", fontSize: 12 }}>
            Tavsiya:{" "}
            <span style={{ color: "var(--blue)", fontWeight: 700 }}>5 daqiqa ichida</span> javob berish CRM jarayonida asosiy KPI bo'lishi kerak.
          </p>
        </div>
      </div>
    </section>
  );
}
