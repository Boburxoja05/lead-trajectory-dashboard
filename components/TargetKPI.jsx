import { pulQiymat } from "@/utils/calculations";

export default function TargetKPI({ reja, fakt }) {
  const rows = [
    { kpi: "Lid", reja: reja.lid, fakt: fakt.jamiLid },
    { kpi: "CPL", reja: pulQiymat(reja.cpl), fakt: pulQiymat(fakt.cpl) },
    { kpi: "Sotuv", reja: reja.sotuv, fakt: fakt.jamiSotuv },
    { kpi: "CR", reja: `${reja.cr}%`, fakt: `${fakt.cr}%` },
    { kpi: "ROAS", reja: `${reja.roas}x`, fakt: `${fakt.roas.toFixed(1)}x` },
  ];

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm border border-gray-200 overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-950 mb-5">
        Reja / Fakt KPI paneli
      </h2>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-gray-700">
            <th className="pb-3">KPI</th>
            <th className="pb-3">Reja</th>
            <th className="pb-3">Fakt</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((item) => (
            <tr key={item.kpi} className="border-b border-gray-100">
              <td className="py-4 font-semibold text-gray-950">{item.kpi}</td>
              <td className="py-4 text-gray-900">{item.reja}</td>
              <td className="py-4 font-bold text-blue-600">{item.fakt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}