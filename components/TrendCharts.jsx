"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, LabelList
} from "recharts";
import { pulQiymat, raqamFormat } from "@/utils/calculations";

function ChartCard({ title, data, dataKey, valueType = "number" }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <h2 className="text-base font-bold text-gray-950 mb-4">{title}</h2>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 25, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sanaLabel" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => valueType === "money" ? pulQiymat(v) : raqamFormat(v)} />
            <Line type="monotone" dataKey={dataKey} strokeWidth={3}>
              <LabelList
                dataKey={dataKey}
                position="top"
                formatter={(v) => valueType === "money" ? pulQiymat(v) : raqamFormat(v)}
                style={{ fontSize: 10, fontWeight: 700 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function TrendCharts({ data }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
      <ChartCard title="Kunlik lidlar dinamikasi" data={data} dataKey="lid" />
      <ChartCard title="Lid narxi dinamikasi (CPL)" data={data} dataKey="cpl" valueType="money" />
      <ChartCard title="Sotuv dinamikasi" data={data} dataKey="sotuv" />
      <ChartCard title="Tushum dinamikasi (USD)" data={data} dataKey="tushum" valueType="money" />
    </div>
  );
}