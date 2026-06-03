import { pulQiymat, lidNarxi, mijozNarxi, rentabellik } from "@/utils/calculations";

export default function CampaignRisk({ data }) {
  const risky = data.filter((item) => item.tushum === 0 || rentabellik(item.tushum, item.xarajat) < 1);

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200 overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-950 mb-4">
        Kampaniyalar bo‘yicha risklar
      </h2>

      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-gray-700">
            <th className="pb-3">Kampaniya</th>
            <th className="pb-3">Xarajat</th>
            <th className="pb-3">Lid</th>
            <th className="pb-3">CPL</th>
            <th className="pb-3">Sotuv</th>
            <th className="pb-3">CPA</th>
            <th className="pb-3">Revenue</th>
            <th className="pb-3">ROAS</th>
            <th className="pb-3">Holat</th>
          </tr>
        </thead>

        <tbody>
          {risky.map((item) => (
            <tr key={item.kampaniya} className="border-b border-red-100 bg-red-50">
              <td className="py-3 font-semibold text-gray-950">{item.kampaniya}</td>
              <td className="py-3 text-gray-900">{pulQiymat(item.xarajat)}</td>
              <td className="py-3 text-gray-900">{item.lid}</td>
              <td className="py-3 text-orange-600 font-bold">{pulQiymat(lidNarxi(item.xarajat, item.lid))}</td>
              <td className="py-3 text-gray-900">{item.sotuv}</td>
              <td className="py-3 text-red-600 font-bold">{pulQiymat(mijozNarxi(item.xarajat, item.sotuv))}</td>
              <td className="py-3 text-green-600 font-bold">{pulQiymat(item.tushum)}</td>
              <td className="py-3 text-blue-600 font-bold">{rentabellik(item.tushum, item.xarajat).toFixed(1)}x</td>
              <td className="py-3 font-bold text-red-700">E’tibor kerak</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}