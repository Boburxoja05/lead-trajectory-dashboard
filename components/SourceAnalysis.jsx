import { pulQiymat } from "@/utils/calculations";

export default function SourceAnalysis({ data }) {
  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm border border-gray-200 overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-950 mb-5">
        Manbalar tahlili
      </h2>

      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-gray-700">
            <th className="pb-3">Manba</th>
            <th className="pb-3">Lid</th>
            <th className="pb-3">CPL</th>
            <th className="pb-3">Sotuv</th>
            <th className="pb-3">CPA</th>
            <th className="pb-3">Sales CR</th>
            <th className="pb-3">Revenue</th>
            <th className="pb-3">ROAS</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.manba} className="border-b border-gray-100">
              <td className="py-4 font-semibold text-gray-950">{item.manba}</td>
              <td className="py-4 text-gray-900">{item.lid}</td>
              <td className="py-4 font-bold text-orange-600">{pulQiymat(item.cpl)}</td>
              <td className="py-4 text-gray-900">{item.sotuv}</td>
              <td className="py-4 font-bold text-red-600">{pulQiymat(item.cpa)}</td>
              <td className="py-4 font-bold text-purple-600">{item.cr}%</td>
              <td className="py-4 font-bold text-green-600">{pulQiymat(item.tushum)}</td>
              <td className="py-4 font-bold text-blue-600">{item.roas.toFixed(1)}x</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}