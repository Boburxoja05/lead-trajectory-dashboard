export default function FunnelVisual({ data }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-950 mb-5">
        Funnel vizualizatsiyasi
      </h2>

      <div className="space-y-4">
        {data.map((item, index) => {
          const width = index === 0 ? 100 : Number(String(item.bosqichKonversiya).replace(",", "."));

          return (
            <div key={item.status} className="grid grid-cols-[170px_1fr_90px] items-center gap-4">
              <p className="text-sm font-semibold text-gray-700">{item.status}</p>

              <div className="h-8 rounded-xl bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-xl bg-blue-500 flex items-center px-3 text-white text-sm font-bold"
                  style={{ width: `${Math.max(Math.min(width, 100), 5)}%` }}
                >
                  {item.soni}
                </div>
              </div>

              <p className="text-sm font-bold text-gray-800">
                {item.bosqichKonversiya}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}