export default function LeadQuality({ data }) {
  const cards = [
    { nomi: "Sifatli lid", qiymat: data.sifatli },
    { nomi: "Sifatsiz lid", qiymat: data.sifatsiz },
    { nomi: "No Answer", qiymat: data.noAnswer },
    { nomi: "Dublikat", qiymat: data.dublikat },
    { nomi: "Spam", qiymat: data.spam },
    { nomi: "Real lid", qiymat: data.realLid },
  ];

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-950 mb-5">
        Lid sifati tahlili
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {cards.map((item) => (
          <div key={item.nomi} className="rounded-2xl bg-slate-50 p-4 border">
            <p className="text-sm text-gray-600">{item.nomi}</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-950">
              {item.qiymat}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}