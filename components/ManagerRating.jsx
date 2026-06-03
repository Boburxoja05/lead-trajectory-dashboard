import { pulQiymat } from "@/utils/calculations";

export default function ManagerRating({ data }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200 overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-950 mb-4">
        Menejerlar reytingi
      </h2>

      <table className="w-full min-w-[1000px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-300 text-gray-700">
            <th className="pb-3">Menejer</th>
            <th className="pb-3">Lid</th>
            <th className="pb-3">Sotuv</th>
            <th className="pb-3">Sales CR</th>
            <th className="pb-3">Revenue</th>
            <th className="pb-3">O‘rtacha chek</th>
            <th className="pb-3">Holat</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {
            const xavf = item.sotuv === 0 || Number(String(item.cr).replace(",", ".")) < 5;

            return (
              <tr
                key={item.menejer}
                className={`border-b ${
                  xavf ? "bg-red-50 border-red-100" : "border-gray-100"
                }`}
              >
                <td className="py-4 font-semibold text-gray-950">{item.menejer}</td>
                <td className="py-4 text-gray-900">{item.lid}</td>
                <td className="py-4 text-gray-900">{item.sotuv}</td>
                <td className="py-4 font-bold text-blue-600">{item.cr}%</td>
                <td className="py-4 font-bold text-green-600">{pulQiymat(item.tushum)}</td>
                <td className="py-4 text-gray-900">
                  {pulQiymat(item.sotuv ? item.tushum / item.sotuv : 0)}
                </td>
                <td className={`py-4 font-bold ${xavf ? "text-red-700" : "text-green-700"}`}>
                  {xavf ? "E’tibor kerak" : "Barqaror"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}