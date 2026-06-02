export default function FunnelSection({ data }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border mt-8">
      <h2 className="text-2xl font-bold text-black mb-6">
        Lead Funnel
      </h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.stage}
            className="flex justify-between items-center border-b border-gray-200 pb-3"
          >
            <span className="text-lg font-medium text-black">
              {item.stage}
            </span>

            <span className="text-lg font-bold text-blue-600">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}