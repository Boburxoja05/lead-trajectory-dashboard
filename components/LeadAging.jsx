import { pulQiymat } from "@/utils/calculations";

export default function LeadAging() {
  const averageDeal = 500;

  const data = [
    { label: "0–1 kun", count: 120, note: "Yangi leadlar", status: "Normal", color: "bg-green-500" },
    { label: "2–3 kun", count: 84, note: "Follow-up kerak", status: "Nazorat", color: "bg-yellow-500" },
    { label: "4–7 kun", count: 42, note: "Sovish xavfi bor", status: "Xavf", color: "bg-orange-500" },
    { label: "7+ kun", count: 18, note: "Tezkor harakat kerak", status: "Kritik", color: "bg-red-500" },
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);
  const critical = data.find((item) => item.label === "7+ kun");
  const potentialRevenue = critical.count * averageDeal;

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-950">
        Lead aging
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Javobsiz yoki yopilmagan leadlar qancha kundan beri turib qolganini ko‘rsatadi.
      </p>

      <div className="space-y-4">
        {data.map((item) => {
          const percent = Math.round((item.count / total) * 100);

          return (
            <div key={item.label}>
              <div className="mb-1 grid grid-cols-4 gap-3 text-sm">
                <span className="font-semibold text-gray-800">{item.label}</span>
                <span className="text-gray-700">{item.count} lead</span>
                <span className="text-gray-700">{percent}% ulush</span>
                <span
                  className={`font-bold ${
                    item.status === "Kritik"
                      ? "text-red-700"
                      : item.status === "Xavf"
                      ? "text-orange-600"
                      : item.status === "Nazorat"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">{item.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
        <p className="text-sm font-semibold text-red-700">
          Kritik zona: {critical.count} ta lead 7 kundan ortiq turib qolgan.
        </p>
        <p className="mt-1 text-sm text-gray-700">
          Qayta ishlash orqali tiklanishi mumkin bo‘lgan qiymat:{" "}
          <b>{pulQiymat(potentialRevenue)}</b>
        </p>
      </div>
    </section>
  );
}