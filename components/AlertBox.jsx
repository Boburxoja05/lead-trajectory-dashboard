export default function AlertBox({ biggestDrop }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-red-700">
        ⚠️ Biggest Lead Loss
      </h2>

      <p className="mt-3 text-gray-800">
        Eng katta yo‘qotish:
        <span className="font-bold">
          {" "}
          {biggestDrop.from} → {biggestDrop.to}
        </span>
      </p>

      <p className="mt-2 text-red-700 font-bold text-xl">
        Lost: {biggestDrop.lost} leads
      </p>
    </div>
  );
}