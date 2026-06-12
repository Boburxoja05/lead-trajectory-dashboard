"use client";

import { useMemo, useState } from "react";

import KPIComparisonChart from "@/components/KPIComparisonChart";
import TrendCharts from "@/components/TrendCharts";
import SourceAnalysis from "@/components/SourceAnalysis";
import CampaignRisk from "@/components/CampaignRisk";

import {
  lidlar,
  kampaniyalar,
  kreativlar,
  rejaKpi,
} from "@/data/demoData";

import {
  filterByDavr,
  umumiyKpi,
  sourceAnalitika,
  kunlikTrend,
  pulQiymat,
  lidNarxi,
  mijozNarxi,
  rentabellik,
} from "@/utils/calculations";

const DAVRLAR = ["7 kun", "14 kun", "30 kun", "Maks"];

function KpiCard({ label, value, sub, color = "#fff", accent = false }) {
  return (
    <div
      style={{
        background: accent ? "var(--accent-soft)" : "var(--panel-2)",
        border: `1px solid ${accent ? "rgba(245,158,11,0.3)" : "var(--border)"}`,
        borderRadius: 14,
        padding: "18px 20px",
      }}
    >
      <p className="metric-label">{label}</p>
      <p style={{ color, fontWeight: 800, fontSize: 30, letterSpacing: "-0.03em", margin: "8px 0 4px", lineHeight: 1 }}>
        {value}
      </p>
      <p className="muted-text" style={{ fontSize: 11 }}>{sub}</p>
    </div>
  );
}

function CreativeTable({ data }) {
  return (
    <div className="card p-5 overflow-x-auto">
      <h2 className="card-title" style={{ marginBottom: 4 }}>Kreativlar tahlili</h2>
      <p className="card-subtitle" style={{ marginBottom: 16 }}>
        Har bir kreativning CPL, sotuv va ROAS ko'rsatkichlari
      </p>
      <table className="table-dark" style={{ minWidth: 720 }}>
        <thead>
          <tr>
            <th>Kreativ</th>
            <th>Lid</th>
            <th>CPL</th>
            <th>Sotuv</th>
            <th>CPA</th>
            <th>Revenue</th>
            <th>ROAS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const roas = rentabellik(item.tushum, item.xarajat);
            return (
              <tr key={item.kreativ}>
                <td style={{ color: "#fff", fontWeight: 600 }}>{item.kreativ}</td>
                <td>{item.lid}</td>
                <td className="accent-text" style={{ fontWeight: 700 }}>
                  {pulQiymat(lidNarxi(item.xarajat, item.lid))}
                </td>
                <td>{item.sotuv}</td>
                <td className="red-text" style={{ fontWeight: 700 }}>
                  {pulQiymat(mijozNarxi(item.xarajat, item.sotuv))}
                </td>
                <td className="green-text" style={{ fontWeight: 700 }}>{pulQiymat(item.tushum)}</td>
                <td className="blue-text" style={{ fontWeight: 700 }}>{roas.toFixed(1)}x</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function AdsPage() {
  const [davr, setDavr] = useState("30 kun");

  const filteredLidlar = useMemo(() => filterByDavr(lidlar, davr), [davr]);

  const kpi     = umumiyKpi(filteredLidlar);
  const manbalar = sourceAnalitika(filteredLidlar);
  const trend   = kunlikTrend(filteredLidlar);

  const totalSpend = filteredLidlar.reduce((s, l) => s + l.xarajat, 0);
  const avgCtr     = 2.3;

  return (
    <div className="page-wrap" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Header */}
      <div
        style={{
          background: "var(--panel-2)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", margin: 0 }}>
              FB Ads Dashboard
            </h1>
            <p className="muted-text" style={{ fontSize: 13, marginTop: 4 }}>
              Meta reklama · Kampaniyalar · Kreativlar · ROAS tahlili
            </p>
          </div>
          <span className="badge badge-blue">● Meta Ads</span>
        </div>

        {/* Davr filtri */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {DAVRLAR.map((item) => (
            <button
              key={item}
              onClick={() => setDavr(item)}
              className={`tab-btn ${davr === item ? "tab-btn-active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label="Jami sarflandi"
          value={pulQiymat(totalSpend)}
          sub="Reklama xarajati"
          color="var(--red)"
        />
        <KpiCard
          label="Jami lidlar"
          value={kpi.jamiLid}
          sub="Meta orqali tushgan"
          color="#fff"
        />
        <KpiCard
          label="CPL"
          value={pulQiymat(kpi.cpl)}
          sub="Lid narxi"
          color="var(--accent)"
          accent
        />
        <KpiCard
          label="Revenue"
          value={pulQiymat(kpi.jamiTushum)}
          sub="Jami tushum"
          color="var(--green)"
        />
        <KpiCard
          label="ROAS"
          value={`${kpi.roas.toFixed(1)}x`}
          sub="Reklama rentabelligi"
          color="var(--blue)"
        />
        <KpiCard
          label="Avg CTR"
          value={`${avgCtr}%`}
          sub="O'rtacha bosish darajasi"
          color="var(--purple)"
        />
      </div>

      {/* KPI Reja/Fakt */}
      <KPIComparisonChart reja={rejaKpi} fakt={kpi} />

      {/* Trend charts */}
      <TrendCharts data={trend} />

      {/* Campaign table */}
      <CampaignRisk data={kampaniyalar} />

      {/* Creative table */}
      <CreativeTable data={kreativlar} />

      {/* Source analysis */}
      <SourceAnalysis data={manbalar} />

      {/* Budget summary */}
      <div
        style={{
          background: "var(--panel-2)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "20px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 24,
        }}
      >
        {[
          { label: "Facebook", spend: pulQiymat(totalSpend * 0.55), lid: Math.round(kpi.jamiLid * 0.55), color: "var(--blue)" },
          { label: "Instagram", spend: pulQiymat(totalSpend * 0.35), lid: Math.round(kpi.jamiLid * 0.35), color: "var(--purple)" },
          { label: "Messenger", spend: pulQiymat(totalSpend * 0.10), lid: Math.round(kpi.jamiLid * 0.10), color: "var(--accent)" },
        ].map((s) => (
          <div key={s.label}>
            <p className="metric-label">{s.label}</p>
            <p style={{ color: s.color, fontWeight: 800, fontSize: 22, margin: "6px 0 2px" }}>{s.spend}</p>
            <p className="muted-text" style={{ fontSize: 11 }}>{s.lid} lid</p>
          </div>
        ))}
      </div>

    </div>
  );
}
