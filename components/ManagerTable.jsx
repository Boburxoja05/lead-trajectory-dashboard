import { calculateCR } from "@/utils/calculations";

export default function ManagerTable({ data }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border mt-8">
      <h2 className="text-2xl font-bold text-black mb-6">
        Manager Performance
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="pb-3">Manager</th>
            <th className="pb-3">Leads</th>
            <th className="pb-3">Sales</th>
            <th className="pb-3">Close Rate</th>
          </tr>
        </thead>

        <tbody>
          {data.map((manager) => (
            <tr key={manager.name} className="border-b">
              <td className="py-4 font-medium text-black">{manager.name}</td>
              <td className="py-4 text-gray-700">{manager.leads}</td>
              <td className="py-4 text-gray-700">{manager.sales}</td>
              <td className="py-4 font-bold text-blue-600">
                {calculateCR(manager.sales, manager.leads)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}