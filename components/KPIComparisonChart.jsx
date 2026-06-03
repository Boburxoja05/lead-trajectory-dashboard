import { pulQiymat, raqamFormat } from "@/utils/calculations";

function formatValue(value, type) {
  if (type === "money") return pulQiymat(value);
  if (type === "percent") return `${raqamFormat(value)}%`;
  if (type === "x") return `${raqamFormat(value)}x`;
  return raqamFormat(value);
}

function BarRow({ name, reja, fakt, type = "number", higherIsBetter = true }) {
  const rejaValue = Number(reja || 0);
  const faktValue = Number(fakt || 0);
  const max = Math.max(rejaValue, faktValue, 1);
  const farq = faktValue - rejaValue;
  const yaxshi = higherIsBetter ? farq >= 0 : farq <= 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold text-gray-950">{name}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            yaxshi ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {yaxshi ? "Rejaga mos" : "E’tibor kerak"}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-semibold text-gray-800">Reja</span>
            <b className="text-gray-950">{formatValue(rejaValue, type)}</b>
          </div>
          <div className="h-4 rounded-full bg-slate-100">
            <div
              className="h-4 rounded-full bg-gray-700"
              style={{ width: `${(rejaValue / max) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span className="font-semibold text-gray-800">Fakt</span>
            <b className="text-blue-600">{formatValue(faktValue, type)}</b>
          </div>
          <div className="h-4 rounded-full bg-slate-100">
            <div
              className={`h-4 rounded-full ${
                yaxshi ? "bg-blue-600" : "bg-red-500"
              }`}
              style={{ width: `${(faktValue / max) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Farq:{" "}
        <b className={yaxshi ? "text-green-600" : "text-red-600"}>
          {formatValue(Math.abs(farq), type)}
        </b>
      </p>
    </div>
  );
}

export default function KPIComparisonChart({ reja, fakt }) {
  const crFakt = Number(String(fakt.cr).replace(",", "."));

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-950">
        Reja / Fakt KPI taqqoslash
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Reja va fakt natija bar chart orqali solishtiriladi. Reja — qora chiziq,
        fakt — ko‘k yoki qizil chiziq.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <BarRow name="Lid" reja={reja.lid} fakt={fakt.jamiLid} />
        <BarRow name="CPL" reja={reja.cpl} fakt={fakt.cpl} type="money" higherIsBetter={false} />
        <BarRow name="Sotuv" reja={reja.sotuv} fakt={fakt.jamiSotuv} />
        <BarRow name="Sales CR" reja={reja.cr} fakt={crFakt} type="percent" />
        <BarRow name="ROAS" reja={reja.roas} fakt={fakt.roas} type="x" />
      </div>
    </section>
  );
}