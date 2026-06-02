import { calculateCR, calculateCAC } from "@/utils/calculations";

export default function SourceTable({ data, spend }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border mt-8">
      <h2 className="text-2xl font-bold text-black mb-6">
        Source Analysis
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="pb-3">Source</th>
            <th className="pb-3">Leads</th>
            <th className="pb-3">Sales</th>
            <th className="pb-3">CR</th>
            <th className="pb-3">CPL</th>
          </tr>
        </thead>

        <tbody>
          {data.map((source) => (
            <tr key={source.source} className="border-b">
              <td className="py-4 font-medium text-black">{source.source}</td>
              <td className="py-4 text-gray-700">{source.leads}</td>
              <td className="py-4 text-gray-700">{source.sales}</td>
              <td className="py-4 font-bold text-blue-600">
                {calculateCR(source.sales, source.leads)}%
              </td>
              <td className="py-4 font-bold text-gray-900">
                ${source.cpl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}