"use client";

import { useMemo, useState } from "react";

import LeadQuality from "@/components/LeadQuality";
import ManagerRating from "@/components/ManagerRating";
import MoneyLoss from "@/components/MoneyLoss";
import SourceAnalysis from "@/components/SourceAnalysis";
import TargetKPI from "@/components/TargetKPI";
import TrendCharts from "@/components/TrendCharts";

import {
  kompaniyalar,
  lidStatuslari,
  lidlar,
  kampaniyalar,
  kreativlar,
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
  lidNarxi,
  mijozNarxi,
  rentabellik,
  foiz,
} from "@/utils/calculations";

function Karta({ nomi, qiymat, izoh, rang = "text-blue-600", icon = "📊" }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200 flex gap-4 items-center">
      <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{nomi}</p>
        <h2 className={`text-3xl font-bold ${rang}`}>{qiymat}</h2>
        <p className="text-sm text-gray-500">{izoh}</p>
      </div>
    </div>
  );
}

function Jadval({ sarlavha, children }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200 overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-950 mb-4">{sarlavha}</h2>
      {children}
    </div>
  );
}

function TabFiltr({ items, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`rounded-2xl px-6 py-3 text-sm font-bold transition ${
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

  const davrlar = ["Bugun", "Kecha", "7 kun", "14 kun", "30 kun", "Shu oy", "O‘tgan oy", "Maks"];

  const filterlanganLidlar = useMemo(() => {
    const byCompany = filterByKompaniya(lidlar, kompaniya);
    return filterByDavr(byCompany, davr);
  }, [kompaniya, davr]);

  const filterlanganKampaniyalar = useMemo(
    () => filterByKompaniya(kampaniyalar, kompaniya),
    [kompaniya]
  );

  const filterlanganKreativlar = useMemo(
    () => filterByKompaniya(kreativlar, kompaniya),
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
  const reja = rejaKpi[kompaniya];

  return (
    <main className="min-h-screen bg-slate-100 p-3 md:p-4">
      <div className="mx-auto max-w-[1800px] space-y-4">
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-950">
            Lidlar Oqimi Dashboardi
          </h1>

          <p className="mt-2 text-gray-600">
            FullContact va Sales Doctor bo‘yicha Meta Ads → CRM → Menejer → Sotuv nazorati
          </p>

          <div className="mt-5">
            <TabFiltr items={kompaniyalar} active={kompaniya} onChange={setKompaniya} />
          </div>

          <div className="mt-5 flex flex-wrap gap-1 rounded-2xl border border-blue-500 p-1">
            {davrlar.map((item) => (
              <button
                key={item}
                onClick={() => setDavr(item)}
                className={`rounded-xl px-5 py-2 text-sm font-bold transition ${
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

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
          <Karta nomi="Lid" qiymat={kpi.jamiLid} izoh="Jami tushgan lidlar" icon="👥" />
          <Karta nomi="CPL" qiymat={pulQiymat(kpi.cpl)} izoh="Lid narxi" rang="text-orange-600" icon="🏷️" />
          <Karta nomi="CPA" qiymat={pulQiymat(kpi.cpa)} izoh="Mijoz narxi" rang="text-red-600" icon="👤" />
          <Karta nomi="Sales CR" qiymat={`${kpi.cr}%`} izoh="Lid → Sotuv" rang="text-purple-600" icon="📈" />
          <Karta nomi="Revenue" qiymat={pulQiymat(kpi.jamiTushum)} izoh="Jami tushum" rang="text-green-600" icon="💵" />
          <Karta nomi="ROAS" qiymat={`${kpi.roas.toFixed(1)}x`} izoh="Reklama rentabelligi" icon="📊" />
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="text-2xl font-bold text-red-700">⚠ Eng katta lid yo‘qotish</h2>
          <p className="mt-2 text-gray-900">
            Eng katta yo‘qotish bosqichi: <b>{yoqotish.qayerdan} → {yoqotish.qayerga}</b>
          </p>
          <p className="mt-1 text-xl font-bold text-red-700">
            Yo‘qotilgan lidlar: {yoqotish.yoqotish}
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <TargetKPI reja={reja} fakt={kpi} />

          <div className="space-y-4">
            <LeadQuality data={sifat} />
            <MoneyLoss data={yoqotilganPul} />
          </div>
        </section>

        <TrendCharts data={trend} />

        <section className="space-y-4">
          <ManagerRating data={menejerlar} />

          <SourceAnalysis data={manbalar} />

          <Jadval sarlavha="Top kampaniyalar">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300 text-gray-700">
                  <th className="pb-3">Kampaniya</th>
                  <th className="pb-3">Xarajat</th>
                  <th className="pb-3">Lid</th>
                  <th className="pb-3">CPL</th>
                  <th className="pb-3">Sotuv</th>
                  <th className="pb-3">CPA</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">ROAS</th>
                </tr>
              </thead>

              <tbody>
                {filterlanganKampaniyalar.slice(0, 8).map((item) => (
                  <tr key={item.kampaniya} className="border-b border-gray-100">
                    <td className="py-3 font-semibold text-gray-950">{item.kampaniya}</td>
                    <td className="py-3 text-gray-900">{pulQiymat(item.xarajat)}</td>
                    <td className="py-3 text-gray-900">{item.lid}</td>
                    <td className="py-3 font-bold text-orange-600">{pulQiymat(lidNarxi(item.xarajat, item.lid))}</td>
                    <td className="py-3 text-gray-900">{item.sotuv}</td>
                    <td className="py-3 font-bold text-red-600">{pulQiymat(mijozNarxi(item.xarajat, item.sotuv))}</td>
                    <td className="py-3 font-bold text-green-600">{pulQiymat(item.tushum)}</td>
                    <td className="py-3 font-bold text-blue-600">
                      {rentabellik(item.tushum, item.xarajat).toFixed(1)}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Jadval>
        </section>

        <Jadval sarlavha="Funnel Conversion Block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-gray-700">
                <th className="pb-3">Bosqich</th>
                <th className="pb-3">Lidlar soni</th>
                <th className="pb-3">Jami ulushi</th>
                <th className="pb-3">Bosqich konversiyasi</th>
              </tr>
            </thead>

            <tbody>
              {konversiyaliVoronka.map((item) => (
                <tr key={item.status} className="border-b border-gray-100">
                  <td className="py-4 font-semibold text-gray-950">{item.status}</td>
                  <td className="py-4 text-gray-900">{item.soni}</td>
                  <td className="py-4 font-bold text-blue-600">{foiz(item.soni, kpi.jamiLid)}%</td>
                  <td className="py-4 font-bold text-purple-600">{item.bosqichKonversiya}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Jadval>
      </div>
    </main>
  );
}