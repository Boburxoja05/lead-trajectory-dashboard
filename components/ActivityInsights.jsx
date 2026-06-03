"use client";

import { useState } from "react";

function StatusBadge({ text }) {
  const color =
    text === "Yaxshi"
      ? "bg-green-50 text-green-700"
      : text === "O‘rta"
      ? "bg-yellow-50 text-yellow-700"
      : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      {text}
    </span>
  );
}

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
      ["Dushanba", "7,8%", 78, 6, "O‘rta"],
      ["Seshanba", "8,5%", 85, 7, "Yaxshi"],
      ["Chorshanba", "6,9%", 72, 5, "O‘rta"],
      ["Payshanba", "9,2%", 90, 8, "Yaxshi"],
      ["Juma", "7,1%", 69, 5, "O‘rta"],
    ],
    Haftalik: [
      ["1-hafta", "6,8%", 240, 16, "O‘rta"],
      ["2-hafta", "7,4%", 260, 19, "Yaxshi"],
      ["3-hafta", "5,9%", 250, 15, "O‘rta"],
      ["4-hafta", "8,1%", 250, 20, "Yaxshi"],
    ],
    Oylik: [
      ["Aprel", "5,9%", 850, 50, "O‘rta"],
      ["May", "6,4%", 920, 59, "O‘rta"],
      ["Iyun", "7,5%", 1000, 75, "Yaxshi"],
    ],
  };

  const peak = hours.reduce((max, item) => (item[1] > max[1] ? item : max), hours[0]);
  const total = hours.reduce((sum, item) => sum + item[1], 0);
  const peakShare = Math.round((peak[1] / total) * 100);

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-950">
          Soat bo‘yicha aktivlik
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Qaysi soatda lead ko‘proq tushishini va javob berish uchun eng faol vaqtni ko‘rsatadi.
        </p>

        <div className="flex items-end gap-3 h-56">
          {hours.map(([hour, value]) => (
            <div key={hour} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-sm font-bold text-gray-950">{value}</span>
              <div
                className="w-full rounded-t-xl bg-blue-500"
                style={{ height: `${value * 2}px` }}
              />
              <span className="text-xs font-semibold text-gray-700">{hour}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-blue-50 border border-blue-100 p-4">
          <p className="text-sm text-gray-700">
            Eng faol vaqt: <b>{peak[0]}</b>. Shu vaqtda barcha leadlarning{" "}
            <b>{peakShare}%</b> qismi tushgan.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200 overflow-x-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-950">
              Konversiya tahlili
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Kunlik, haftalik va oylik kesimda Sales CR natijalarini solishtiradi.
            </p>
          </div>

          <div className="flex rounded-xl border border-gray-200 p-1">
            {["Kunlik", "Haftalik", "Oylik"].map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded-lg px-3 py-2 text-xs font-bold ${
                  mode === item
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full min-w-[650px] text-left text-sm">
          <thead>
            <tr className="border-b text-gray-700">
              <th className="pb-3">Davr</th>
              <th className="pb-3">Lead</th>
              <th className="pb-3">Sotuv</th>
              <th className="pb-3">Sales CR</th>
              <th className="pb-3">Holat</th>
            </tr>
          </thead>

          <tbody>
            {conversionData[mode].map(([period, cr, leads, sales, status]) => (
              <tr key={period} className="border-b border-gray-100">
                <td className="py-3 font-semibold text-gray-950">{period}</td>
                <td className="py-3 text-gray-900">{leads}</td>
                <td className="py-3 text-gray-900">{sales}</td>
                <td className="py-3 font-bold text-blue-600">{cr}</td>
                <td className="py-3">
                  <StatusBadge text={status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}