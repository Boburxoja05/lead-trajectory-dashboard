export default function LeadQuality({ data }) {
  const jami =
    data.sifatli + data.sifatsiz + data.noAnswer + data.dublikat + data.spam;

  const qualityRate = jami ? ((data.realLid / jami) * 100).toFixed(1) : 0;

  const cards = [
    { nomi: "Sifatli lid", qiymat: data.sifatli, rang: "text-green-600" },
    { nomi: "Sifatsiz lid", qiymat: data.sifatsiz, rang: "text-orange-600" },
    { nomi: "No Answer", qiymat: data.noAnswer, rang: "text-red-600" },
    { nomi: "Dublikat", qiymat: data.dublikat, rang: "text-purple-600" },
    { nomi: "Spam", qiymat: data.spam, rang: "text-red-700" },
    { nomi: "Real lid %", qiymat: `${qualityRate}%`, rang: "text-blue-600" },
  ];

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-950">
        Lid sifati tahlili
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Leadlarning sifati, javobsiz qolganlari, dublikat va spam ulushini ko‘rsatadi.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {cards.map((item) => (
          <div key={item.nomi} className="rounded-2xl bg-slate-50 p-4 border">
            <p className="text-sm text-gray-600">{item.nomi}</p>
            <h3 className={`mt-2 text-3xl font-bold ${item.rang}`}>
              {item.qiymat}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}