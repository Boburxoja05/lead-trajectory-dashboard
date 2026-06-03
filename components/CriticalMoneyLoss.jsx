import { pulQiymat } from "@/utils/calculations";

export default function CriticalMoneyLoss({ data }) {
  return (
    <section className="rounded-2xl bg-orange-50 border border-orange-200 p-5">
      <h2 className="text-xl font-bold text-orange-700">
        O‘sish imkoniyatlari
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        Bu blok yo‘qotilgan yoki javobsiz qolgan leadlarni qayta ishlash orqali
        qancha qo‘shimcha sotuv va tushum olish mumkinligini ko‘rsatadi.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white border border-orange-100 p-5">
          <p className="text-sm text-gray-600">Risk ostidagi leadlar</p>
          <h3 className="mt-2 text-3xl font-bold text-orange-700">
            {data.yoqotilgan}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Sotuvga o‘tmay qolgan leadlar
          </p>
        </div>

        <div className="rounded-xl bg-white border border-orange-100 p-5">
          <p className="text-sm text-gray-600">Potensial sotuv</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-950">
            {data.potensialSotuv}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Qayta ishlansa yopilishi mumkin
          </p>
        </div>

        <div className="rounded-xl bg-white border border-orange-100 p-5">
          <p className="text-sm text-gray-600">Potensial tushum</p>
          <h3 className="mt-2 text-3xl font-bold text-green-600">
            {pulQiymat(data.potensialTushum)}
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Tiklanishi mumkin bo‘lgan qiymat
          </p>
        </div>
      </div>
    </section>
  );
}