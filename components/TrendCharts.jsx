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

function getPlanForDate(plans, sana, kompaniya, key) {
  const activePlan = plans
    .filter((p) => p.kompaniya === kompaniya || p.kompaniya === "Hammasi")
    .find((p) => sana >= p.sanaBoshlanish && sana <= p.sanaTugash);

  if (!activePlan) return 0;

  const map = {
    lid: activePlan.leadReja,
    cpl: activePlan.cplReja,
    sotuv: activePlan.sotuvReja,
    tushum: activePlan.tushumReja,
  };

  return map[key] || 0;
}

function CustomTooltip({ active, payload, label, valueType }) {
  if (!active || !payload?.length) return null;

  const fakt = payload.find((p) => p.dataKey === "fakt")?.value;
  const reja = payload.find((p) => p.dataKey === "reja")?.value;
  const farq = Number(fakt || 0) - Number(reja || 0);

  const format = (v) =>
    valueType === "money" ? pulQiymat(v) : raqamFormat(v);

  return (
    <div className="rounded-xl border bg-white p-3 shadow text-sm">
      <p className="font-bold text-gray-950">{label}</p>
      <p className="text-blue-600">Fakt: {format(fakt)}</p>
      <p className="text-gray-700">Reja: {format(reja)}</p>
      <p className={farq >= 0 ? "text-green-600" : "text-red-600"}>
        Farq: {format(farq)}
      </p>
    </div>
  );
}

function ChartCard({ title, description, data, dataKey, plans, kompaniya, valueType = "number" }) {
  const chartData = data.map((item) => ({
    ...item,
    fakt: item[dataKey],
    reja: getPlanForDate(plans, item.sana, kompaniya, dataKey),
  }));

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <h2 className="text-base font-bold text-gray-950">{title}</h2>
      <p className="text-xs text-gray-500 mb-4">{description}</p>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sanaLabel" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip valueType={valueType} />} />
            <Legend />
            <Line dataKey="reja" name="Reja" strokeWidth={2} strokeDasharray="6 6" dot={false} />
            <Line dataKey="fakt" name="Fakt" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function TrendCharts({ data, plans, kompaniya }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-950 mb-1">
        Kunlik dinamika
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Fakt natijalar sozlamalarda kiritilgan reja bilan solishtiriladi.
      </p>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Kunlik lidlar" description="Kunlik tushgan lidlar." data={data} dataKey="lid" plans={plans} kompaniya={kompaniya} />
        <ChartCard title="Lid narxi dinamikasi" description="Kunlik CPL." data={data} dataKey="cpl" plans={plans} kompaniya={kompaniya} valueType="money" />
        <ChartCard title="Sotuv dinamikasi" description="Kunlik sotuv." data={data} dataKey="sotuv" plans={plans} kompaniya={kompaniya} />
        <ChartCard title="Tushum dinamikasi" description="Kunlik tushum." data={data} dataKey="tushum" plans={plans} kompaniya={kompaniya} valueType="money" />
      </div>
    </section>
  );
}