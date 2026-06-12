"use client";

import { useMemo, useState } from "react";

import AlertSummary from "@/components/AlertSummary";
import CriticalMoneyLoss from "@/components/CriticalMoneyLoss";
import FunnelVisual from "@/components/FunnelVisual";
import LostReasons from "@/components/LostReasons";
import LeadQuality from "@/components/LeadQuality";
import LeadAging from "@/components/LeadAging";
import ActivityInsights from "@/components/ActivityInsights";
import ManagerRating from "@/components/ManagerRating";
import SalesExtraBlocks from "@/components/SalesExtraBlocks";

import {
  lidlar,
  lidStatuslari,
} from "@/data/demoData";

import {
  filterByDavr,
  umumiyKpi,
  voronkaHisobla,
  voronkaKonversiya,
  engKattaYoqotish,
  lidSifati,
  menejerReyting,
  pulYoqotish,
  pulQiymat,
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

export default function CRMPage() {
  const [davr, setDavr] = useState("30 kun");

  const filteredLidlar = useMemo(() => filterByDavr(lidlar, davr), [davr]);

  const kpi       = umumiyKpi(filteredLidlar);
  const voronka   = voronkaHisobla(filteredLidlar, lidStatuslari);
  const funnel    = voronkaKonversiya(voronka);
  const yoqotish  = engKattaYoqotish(voronka);
  const sifat     = lidSifati(filteredLidlar);
  const menejerlar = menejerReyting(filteredLidlar);
  const lostData  = pulYoqotish(filteredLidlar, 500);

  const alertData = {
    zeroSalesManagers: menejerlar.filter((m) => m.sotuv === 0).length,
    zeroRoasCampaigns: 0,
    noAnswerLeads: filteredLidlar.filter((l) => l.sifat === "No Answer").length,
    planCr: 9,
    factCr: kpi.cr,
  };

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
              CRM Dashboard
            </h1>
            <p className="muted-text" style={{ fontSize: 13, marginTop: 4 }}>
              Lid oqimi · Menejer samaradorligi · Funnel tahlili
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="badge badge-green">● Jonli demo</span>
          </div>
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

      {/* Alert */}
      <AlertSummary data={alertData} />

      {/* Growth opportunities */}
      <CriticalMoneyLoss data={lostData} />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Jami lidlar" value={kpi.jamiLid} sub="Tushgan lidlar" color="#fff" />
        <KpiCard
          label="Sotilgan"
          value={kpi.jamiSotuv}
          sub="Yopilgan bitimlar"
          color="var(--green)"
        />
        <KpiCard
          label="Sales CR"
          value={`${kpi.cr}%`}
          sub="Lid → Sotuv"
          color="var(--blue)"
        />
        <KpiCard
          label="Revenue"
          value={pulQiymat(kpi.jamiTushum)}
          sub="Jami tushum"
          color="var(--green)"
        />
        <KpiCard
          label="CPA"
          value={pulQiymat(kpi.cpa)}
          sub="Mijoz narxi"
          color="var(--accent)"
          accent
        />
        <KpiCard
          label="Sifatli lidlar"
          value={sifat.sifatli}
          sub="Real murojaat"
          color="var(--purple)"
        />
      </div>

      {/* Eng katta yo'qotish banner */}
      <div
        style={{
          background: "var(--red-soft)",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: 14,
          padding: "16px 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ color: "#f87171", fontWeight: 700, fontSize: 14 }}>⚠ Eng katta lid yo'qotish bosqichi</p>
          <p style={{ color: "var(--text)", fontSize: 13, marginTop: 4 }}>
            <span className="muted-text">Bosqich: </span>
            <span style={{ color: "#fff", fontWeight: 700 }}>
              {yoqotish.qayerdan} → {yoqotish.qayerga}
            </span>
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="metric-label">Yo'qotilgan</p>
          <p style={{ color: "var(--red)", fontWeight: 800, fontSize: 26 }}>{yoqotish.yoqotish} lid</p>
        </div>
      </div>

      {/* Funnel + Lost reasons */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <FunnelVisual data={funnel} />
        <LostReasons />
      </div>

      {/* Lead quality */}
      <LeadQuality data={sifat} />

      {/* Lead aging */}
      <LeadAging />

      {/* Activity insights */}
      <ActivityInsights />

      {/* Manager rating */}
      <ManagerRating data={menejerlar} />

      {/* Follow-up & response */}
      <SalesExtraBlocks />

    </div>
  );
}
