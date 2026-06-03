export default function LostReasons() {
  const totalLost = 180;

  const reasons = [
    { name: "Narx juda qimmat", percent: 34 },
    { name: "Telefon ko‘tarmadi", percent: 28 },
    { name: "Hozir vaqti yo‘q", percent: 18 },
    { name: "Raqobatchini tanladi", percent: 12 },
    { name: "Follow-up kelmadi", percent: 8 },
  ].map((item) => ({
    ...item,
    count: Math.round((totalLost * item.percent) / 100),
  }));

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-950">
        Yo‘qolish sabablari
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Sotuvga o‘tmagan lidlarning asosiy yo‘qolish sabablari.
      </p>

      <div className="space-y-4">
        {reasons.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-1">
              <p className="text-sm font-semibold text-gray-700">
                {item.name}
              </p>
              <p className="text-sm font-bold text-gray-950">
                {item.percent}% · {item.count} lid
              </p>
            </div>

            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-5">
        <p className="text-sm text-gray-600">Show rate</p>
        <h3 className="text-3xl font-bold text-gray-950">71%</h3>
        <p className="text-sm text-gray-500">
          78 keldi / 110 belgilangan uchrashuv
        </p>
      </div>
    </div>
  );
}