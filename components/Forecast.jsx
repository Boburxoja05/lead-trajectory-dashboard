import { pulQiymat } from "@/utils/calculations";

export default function Forecast({ data }) {
  return (
    <div className="mt-8 rounded-3xl bg-blue-50 p-6 border border-blue-200">
      <h2 className="text-2xl font-bold text-blue-700">
        Prognoz
      </h2>

      <p className="mt-2 text-gray-700">
        Oxirgi 7 kun natijasiga asoslangan oy yakuni prognozi
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 border">
          <p className="text-sm text-gray-600">Lid</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-950">
            {data.lid}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-5 border">
          <p className="text-sm text-gray-600">Sotuv</p>
          <h3 className="mt-2 text-3xl font-bold text-green-600">
            {data.sotuv}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-5 border">
          <p className="text-sm text-gray-600">Tushum</p>
          <h3 className="mt-2 text-3xl font-bold text-blue-600">
            {pulQiymat(data.tushum)}
          </h3>
        </div>
      </div>
    </div>
  );
}