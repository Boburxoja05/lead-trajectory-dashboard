import { pulQiymat } from "@/utils/calculations";

export default function MoneyLoss({ data }) {
  return (
    <div className="mt-8 rounded-3xl bg-red-50 p-6 border border-red-200">
      <h2 className="text-2xl font-bold text-red-700">
        Pul yo‘qotish bloki
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 border">
          <p className="text-sm text-gray-600">Yo‘qotilgan lidlar</p>
          <h3 className="mt-2 text-3xl font-bold text-red-700">
            {data.yoqotilgan}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-5 border">
          <p className="text-sm text-gray-600">Potensial sotuv</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-950">
            {data.potensialSotuv}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-5 border">
          <p className="text-sm text-gray-600">Potensial tushum</p>
          <h3 className="mt-2 text-3xl font-bold text-green-600">
            {pulQiymat(data.potensialTushum)}
          </h3>
        </div>
      </div>
    </div>
  );
}