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
  const rejaW = (rejaValue / max) * 100;
  const faktW = (faktValue / max) * 100;

  return (
    <div
      style={{
        background: "var(--panel-3)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{name}</p>
        <span className={`badge ${yaxshi ? "badge-green" : "badge-red"}`}>
          {yaxshi ? "Rejaga mos" : "E'tibor kerak"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span className="muted-text" style={{ fontSize: 11, fontWeight: 600 }}>REJA</span>
            <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 700 }}>{formatValue(rejaValue, type)}</span>
          </div>
          <div className="bar-track">
            <div style={{ width: `${rejaW}%`, height: "100%", borderRadius: 99, background: "var(--muted)" }} />
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span className="muted-text" style={{ fontSize: 11, fontWeight: 600 }}>FAKT</span>
            <span style={{ color: yaxshi ? "var(--green)" : "var(--red)", fontSize: 12, fontWeight: 700 }}>
              {formatValue(faktValue, type)}
            </span>
          </div>
          <div className="bar-track">
            <div
              style={{
                width: `${faktW}%`,
                height: "100%",
                borderRadius: 99,
                background: yaxshi ? "var(--green)" : "var(--red)",
              }}
            />
          </div>
        </div>
      </div>

      <p className="muted-text" style={{ fontSize: 11, marginTop: 10 }}>
        Farq:{" "}
        <span style={{ color: yaxshi ? "var(--green)" : "var(--red)", fontWeight: 700 }}>
          {formatValue(Math.abs(farq), type)}
        </span>
      </p>
    </div>
  );
}

export default function KPIComparisonChart({ reja, fakt }) {
  const crFakt = Number(String(fakt.cr).replace(",", "."));

  return (
    <section className="card p-5">
      <h2 className="card-title">Reja / Fakt KPI taqqoslash</h2>
      <p className="card-subtitle" style={{ marginBottom: 18 }}>
        Reja va fakt natija bar chart orqali solishtiriladi
      </p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <BarRow name="Lid" reja={reja.lid} fakt={fakt.jamiLid} />
        <BarRow name="CPL" reja={reja.cpl} fakt={fakt.cpl} type="money" higherIsBetter={false} />
        <BarRow name="Sotuv" reja={reja.sotuv} fakt={fakt.jamiSotuv} />
        <BarRow name="Sales CR" reja={reja.cr} fakt={crFakt} type="percent" />
        <BarRow name="ROAS" reja={reja.roas} fakt={fakt.roas} type="x" />
      </div>
    </section>
  );
}
