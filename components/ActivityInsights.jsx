"use client";
import { useState } from "react";

export default function ActivityInsights() {
  const [mode, setMode] = useState("Kunlik");

  const hours = [
    ["09:00", 42],
    ["11:00", 68],
    ["13:00", 55],
    ["15:00", 84],
    ["17:00", 73],
    ["19:00", 49],
  ];

  const conversionData = {
    Kunlik: [
      ["Dushanba", "7,8%", 78, 6, true],
      ["Seshanba", "8,5%", 85, 7, true],
      ["Chorshanba", "6,9%", 72, 5, false],
      ["Payshanba", "9,2%", 90, 8, true],
      ["Juma", "7,1%", 69, 5, false],
    ],
    Haftalik: [
      ["1-hafta", "6,8%", 240, 16, false],
      ["2-hafta", "7,4%", 260, 19, true],
      ["3-hafta", "5,9%", 250, 15, false],
      ["4-hafta", "8,1%", 250, 20, true],
    ],
    Oylik: [
      ["Aprel", "5,9%", 850, 50, false],
      ["May", "6,4%", 920, 59, false],
      ["Iyun", "7,5%", 1000, 75, true],
    ],
  };

  const peak = hours.reduce((max, item) => (item[1] > max[1] ? item : max), hours[0]);
  const total = hours.reduce((sum, item) => sum + item[1], 0);
  const peakShare = Math.round((peak[1] / total) * 100);
  const maxVal = Math.max(...hours.map((h) => h[1]));

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="card p-5">
        <h2 className="card-title">Soat bo'yicha aktivlik</h2>
        <p className="card-subtitle" style={{ marginBottom: 16 }}>
          Qaysi soatda lid ko'proq tushishini va javob berish uchun eng faol vaqtni ko'rsatadi
        </p>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160, marginBottom: 12 }}>
          {hours.map(([hour, value]) => {
            const isPeak = hour === peak[0];
            return (
              <div key={hour} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ color: isPeak ? "var(--accent)" : "var(--text)", fontSize: 11, fontWeight: 700 }}>
                  {value}
                </span>
                <div
                  style={{
                    width: "100%",
                    height: `${(value / maxVal) * 120}px`,
                    background: isPeak ? "var(--accent)" : "var(--blue)",
                    borderRadius: "6px 6px 0 0",
                    opacity: isPeak ? 1 : 0.6,
                  }}
                />
                <span className="muted-text" style={{ fontSize: 10 }}>{hour}</span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            background: "var(--accent-soft)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 10,
            padding: "10px 14px",
          }}
        >
          <p style={{ color: "var(--text)", fontSize: 12 }}>
            Eng faol vaqt:{" "}
            <span style={{ color: "var(--accent)", fontWeight: 700 }}>{peak[0]}</span>.
            Shu vaqtda barcha lidlarning{" "}
            <span style={{ color: "var(--accent)", fontWeight: 700 }}>{peakShare}%</span> qismi tushgan.
          </p>
        </div>
      </div>

      <div className="card p-5 overflow-x-auto">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
          <div>
            <h2 className="card-title">Konversiya tahlili</h2>
            <p className="card-subtitle">Kunlik, haftalik va oylik kesimda Sales CR</p>
          </div>
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            {["Kunlik", "Haftalik", "Oylik"].map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`tab-btn ${mode === item ? "tab-btn-active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <table className="table-dark" style={{ minWidth: 520 }}>
          <thead>
            <tr>
              <th>Davr</th>
              <th>Lead</th>
              <th>Sotuv</th>
              <th>Sales CR</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            {conversionData[mode].map(([period, cr, leads, sales, good]) => (
              <tr key={period}>
                <td style={{ color: "#fff", fontWeight: 600 }}>{period}</td>
                <td>{leads}</td>
                <td>{sales}</td>
                <td className="blue-text" style={{ fontWeight: 700 }}>{cr}</td>
                <td>
                  <span className={`badge ${good ? "badge-green" : "badge-amber"}`}>
                    {good ? "Yaxshi" : "O'rta"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
