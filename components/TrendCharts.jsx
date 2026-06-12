"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import { pulQiymat, raqamFormat } from "@/utils/calculations";

function CustomTooltip({ active, payload, label, valueType }) {
  if (!active || !payload?.length) return null;
  const fakt = payload.find((p) => p.dataKey === "fakt")?.value;
  const reja = payload.find((p) => p.dataKey === "reja")?.value;
  const farq = Number(fakt || 0) - Number(reja || 0);
  const format = (v) => (valueType === "money" ? pulQiymat(v) : raqamFormat(v));

  return (
    <div
      style={{
        background: "var(--panel-2)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
      }}
    >
      <p style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>{label}</p>
      <p style={{ color: "var(--blue)" }}>Fakt: {format(fakt)}</p>
      <p style={{ color: "var(--muted)" }}>Reja: {format(reja)}</p>
      <p style={{ color: farq >= 0 ? "var(--green)" : "var(--red)" }}>
        Farq: {format(Math.abs(farq))}
      </p>
    </div>
  );
}

function ChartCard({ title, description, data, dataKey, plans, kompaniya, valueType = "number" }) {
  const chartData = data.map((item) => ({
    ...item,
    fakt: item[dataKey],
    reja: 0,
  }));

  return (
    <div className="card p-5">
      <p className="card-title" style={{ marginBottom: 2 }}>{title}</p>
      <p className="card-subtitle" style={{ marginBottom: 14 }}>{description}</p>

      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="sanaLabel" tick={{ fontSize: 10, fill: "var(--muted)" }} />
            <YAxis tick={{ fontSize: 10, fill: "var(--muted)" }} />
            <Tooltip content={<CustomTooltip valueType={valueType} />} />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "var(--muted)" }}
              formatter={(v) => (v === "fakt" ? "Fakt" : "Reja")}
            />
            <Line
              dataKey="reja"
              name="reja"
              stroke="var(--muted)"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
            />
            <Line
              dataKey="fakt"
              name="fakt"
              stroke="var(--blue)"
              strokeWidth={2.5}
              dot={{ r: 2, fill: "var(--blue)" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function TrendCharts({ data, plans = [], kompaniya = "Hammasi" }) {
  return (
    <section>
      <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
        Kunlik dinamika
      </h2>
      <p className="muted-text" style={{ fontSize: 12, marginBottom: 14 }}>
        Fakt natijalarning kunlik o'zgarishi
      </p>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Kunlik lidlar" description="Kunlik tushgan lidlar soni" data={data} dataKey="lid" plans={plans} kompaniya={kompaniya} />
        <ChartCard title="CPL dinamikasi" description="Kunlik lid narxi ($)" data={data} dataKey="cpl" plans={plans} kompaniya={kompaniya} valueType="money" />
        <ChartCard title="Sotuv dinamikasi" description="Kunlik yopilgan bitimlar" data={data} dataKey="sotuv" plans={plans} kompaniya={kompaniya} />
        <ChartCard title="Revenue dinamikasi" description="Kunlik tushum ($)" data={data} dataKey="tushum" plans={plans} kompaniya={kompaniya} valueType="money" />
      </div>
    </section>
  );
}
