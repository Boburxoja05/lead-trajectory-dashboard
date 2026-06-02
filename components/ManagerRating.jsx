import { pulQiymat } from "@/utils/calculations";

export default function ManagerRating({ data }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200 overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-950 mb-4">
        Menejerlar reytingi
      </h2>

      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-gray-700">
            <th className="pb-3">Menejer</th>
            <th className="pb-3">Lid</th>
            <th className="pb-3">Sotuv</th>
            <th className="pb-3">Sales CR</th>
            <th className="pb-3">Revenue</th>
            <th className="pb-3">O‘rtacha tushum</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.menejer} className="border-b border-gray-100">
              <td className="py-4 font-semibold text-gray-950">{item.menejer}</td>
              <td className="py-4 text-gray-900">{item.lid}</td>
              <td className="py-4 text-gray-900">{item.sotuv}</td>
              <td className="py-4 font-bold text-blue-600">{item.cr}%</td>
              <td className="py-4 font-bold text-green-600">{pulQiymat(item.tushum)}</td>
              <td className="py-4 text-gray-900">
                {pulQiymat(item.sotuv ? item.tushum / item.sotuv : 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}