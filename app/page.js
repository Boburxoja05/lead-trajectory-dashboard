"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import AlertSummary from "@/components/AlertSummary";
import CriticalMoneyLoss from "@/components/CriticalMoneyLoss";
import CampaignRisk from "@/components/CampaignRisk";
import LeadAging from "@/components/LeadAging";
import ActivityInsights from "@/components/ActivityInsights";
import LeadQuality from "@/components/LeadQuality";
import ManagerRating from "@/components/ManagerRating";
import SourceAnalysis from "@/components/SourceAnalysis";
import KPIComparisonChart from "@/components/KPIComparisonChart";
import TrendCharts from "@/components/TrendCharts";
import FunnelVisual from "@/components/FunnelVisual";
import LostReasons from "@/components/LostReasons";
import SalesExtraBlocks from "@/components/SalesExtraBlocks";

import {
  kompaniyalar,
  lidStatuslari,
  lidlar,
  kampaniyalar,
  rejaKpi,
} from "@/data/demoData";

import {
  filterByKompaniya,
  filterByDavr,
  umumiyKpi,
  voronkaHisobla,
  voronkaKonversiya,
  engKattaYoqotish,
  kunlikTrend,
  lidSifati,
  menejerReyting,
  sourceAnalitika,
  pulYoqotish,
  pulQiymat,
  rentabellik,
} from "@/utils/calculations";

function Karta({ nomi, qiymat, izoh, rang = "text-blue-600", icon = "📊" }) {
  return (
    <div className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-gray-200 flex gap-3 sm:gap-4 items-center min-w-0">
      <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center text-xl sm:text-2xl">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
          {nomi}
        </p>
        <h2 className={`text-2xl sm:text-3xl font-bold ${rang} break-words`}>
          {qiymat}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">{izoh}</p>
      </div>
    </div>
  );
}

function TabFiltr({ items, active, onChange }) {
  return (
    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`shrink-0 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition ${
            active === item
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 border border-gray-300 hover:border-blue-500"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [kompaniya, setKompaniya] = useState("Hammasi");
  const [davr, setDavr] = useState("30 kun");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("dashboardPlans");
    if (saved) setPlans(JSON.parse(saved));
  }, []);

  const davrlar = [
    "Bugun",
    "Kecha",
    "7 kun",
    "14 kun",
    "30 kun",
    "Shu oy",
    "O‘tgan oy",
    "Maks",
  ];

  const filterlanganLidlar = useMemo(() => {
    const byCompany = filterByKompaniya(lidlar, kompaniya);
    return filterByDavr(byCompany, davr);
  }, [kompaniya, davr]);

  const filterlanganKampaniyalar = useMemo(
    () => filterByKompaniya(kampaniyalar, kompaniya),
    [kompaniya]
  );

  const kpi = umumiyKpi(filterlanganLidlar);
  const voronka = voronkaHisobla(filterlanganLidlar, lidStatuslari);
  const konversiyaliVoronka = voronkaKonversiya(voronka);
  const yoqotish = engKattaYoqotish(voronka);
  const trend = kunlikTrend(filterlanganLidlar);
  const sifat = lidSifati(filterlanganLidlar);
  const menejerlar = menejerReyting(filterlanganLidlar);
  const manbalar = sourceAnalitika(filterlanganLidlar);
  const yoqotilganPul = pulYoqotish(filterlanganLidlar, 500);

  const reja =
    rejaKpi[kompaniya] || {
      lid: 0,
      cpl: 0,
      sotuv: 0,
      cr: 0,
      roas: 0,
    };

  const alertData = {
    zeroSalesManagers: menejerlar.filter((m) => m.sotuv === 0).length,
    zeroRoasCampaigns: filterlanganKampaniyalar.filter(
      (k) => k.tushum === 0 || rentabellik(k.tushum, k.xarajat) < 1
    ).length,
    noAnswerLeads: filterlanganLidlar.filter((l) => l.sifat === "No Answer")
      .length,
    planCr: reja.cr,
    factCr: kpi.cr,
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto w-full max-w-[1800px] space-y-4 sm:space-y-5">
        <section className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-950 leading-tight">
                Lidlar Oqimi Dashboardi
              </h1>

              <p className="mt-2 text-sm sm:text-base text-gray-600">
                FullContact va Sales Doctor bo‘yicha Meta Ads → CRM → Menejer →
                Sotuv nazorati
              </p>
            </div>

            <Link
              href="/settings"
              className="w-full sm:w-auto text-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              Sozlamalar
            </Link>
          </div>

          <div className="mt-5">
            <TabFiltr
              items={kompaniyalar}
              active={kompaniya}
              onChange={setKompaniya}
            />
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-blue-500 p-2">
            {davrlar.map((item) => (
              <button
                key={item}
                onClick={() => setDavr(item)}
                className={`shrink-0 rounded-xl px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition ${
                  davr === item
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="w-full overflow-hidden">
          <AlertSummary data={alertData} />
        </div>

        <div className="w-full overflow-hidden">
          <CriticalMoneyLoss data={yoqotilganPul} />
        </div>

        <section className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-7">
          <Karta nomi="Lid" qiymat={kpi.jamiLid} izoh="Jami tushgan lidlar" icon="👥" />

          <Karta
            nomi="Sotilgan lid"
            qiymat={kpi.jamiSotuv}
            izoh="Yopilgan bitimlar"
            rang="text-green-600"
            icon="✅"
          />

          <Karta
            nomi="CPL"
            qiymat={pulQiymat(kpi.cpl)}
            izoh="Lid narxi"
            rang="text-orange-600"
            icon="🏷️"
          />

          <Karta
            nomi="CPA"
            qiymat={pulQiymat(kpi.cpa)}
            izoh="Mijoz narxi"
            rang="text-red-600"
            icon="👤"
          />

          <Karta
            nomi="Sales CR"
            qiymat={`${kpi.cr}%`}
            izoh="Lid → Sotuv"
            rang="text-purple-600"
            icon="📈"
          />

          <Karta
            nomi="Revenue"
            qiymat={pulQiymat(kpi.jamiTushum)}
            izoh="Jami tushum"
            rang="text-green-600"
            icon="💵"
          />

          <Karta
            nomi="ROAS"
            qiymat={`${kpi.roas.toFixed(1)}x`}
            izoh="Reklama rentabelligi"
            icon="📊"
          />
        </section>

        <div className="w-full overflow-hidden">
          <KPIComparisonChart reja={reja} fakt={kpi} />
        </div>

        <div className="w-full overflow-hidden">
          <LeadQuality data={sifat} />
        </div>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="min-w-0 overflow-hidden">
            <FunnelVisual data={konversiyaliVoronka} />
          </div>
          <div className="min-w-0 overflow-hidden">
            <LostReasons />
          </div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
          <h2 className="text-xl sm:text-2xl font-bold text-red-700">
            ⚠ Eng katta lid yo‘qotish
          </h2>

          <p className="mt-2 text-sm sm:text-base text-gray-900">
            Eng katta yo‘qotish bosqichi:{" "}
            <b>
              {yoqotish.qayerdan} → {yoqotish.qayerga}
            </b>
          </p>

          <p className="mt-1 text-lg sm:text-xl font-bold text-red-700">
            Yo‘qotilgan lidlar: {yoqotish.yoqotish}
          </p>
        </section>

        <div className="w-full overflow-hidden">
          <TrendCharts data={trend} plans={plans} kompaniya={kompaniya} />
        </div>

        <div className="w-full overflow-hidden">
          <LeadAging />
        </div>

        <div className="w-full overflow-hidden">
          <ActivityInsights />
        </div>

        <section className="space-y-4">
          <div className="w-full overflow-x-auto">
            <ManagerRating data={menejerlar} />
          </div>

          <div className="w-full overflow-x-auto">
            <CampaignRisk data={filterlanganKampaniyalar} />
          </div>

          <div className="w-full overflow-x-auto">
            <SourceAnalysis data={manbalar} />
          </div>
        </section>

        <div className="w-full overflow-x-auto">
          <SalesExtraBlocks />
        </div>
      </div>
    </main>
  );
}