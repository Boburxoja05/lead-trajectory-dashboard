"use client";

import { useEffect, useState } from "react";
import { pulQiymat } from "@/utils/calculations";

export default function PlanSettings() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    kompaniya: "Hammasi",
    davr: "Kunlik",
    sanaBoshlanish: "",
    sanaTugash: "",
    leadReja: "",
    cplReja: "",
    sotuvReja: "",
    tushumReja: "",
  });

  const inputStyle =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  useEffect(() => {
    const saved = localStorage.getItem("dashboardPlans");
    if (saved) setPlans(JSON.parse(saved));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addPlan() {
    if (!form.sanaBoshlanish || !form.sanaTugash) {
      alert("Boshlanish va tugash sanasini kiriting");
      return;
    }

    const newPlan = {
      id: Date.now(),
      ...form,
      leadReja: Number(form.leadReja || 0),
      cplReja: Number(form.cplReja || 0),
      sotuvReja: Number(form.sotuvReja || 0),
      tushumReja: Number(form.tushumReja || 0),
    };

    const updated = [...plans, newPlan];
    setPlans(updated);
    localStorage.setItem("dashboardPlans", JSON.stringify(updated));

    setForm({
      kompaniya: "Hammasi",
      davr: "Kunlik",
      sanaBoshlanish: "",
      sanaTugash: "",
      leadReja: "",
      cplReja: "",
      sotuvReja: "",
      tushumReja: "",
    });
  }

  function deletePlan(id) {
    const updated = plans.filter((item) => item.id !== id);
    setPlans(updated);
    localStorage.setItem("dashboardPlans", JSON.stringify(updated));
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-950">Reja sozlamalari</h2>

      <p className="mt-2 text-slate-500">
        Kompaniya va sana oralig‘i bo‘yicha Lead, CPL, Sotuv va Tushum rejasini kiriting.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <select name="kompaniya" value={form.kompaniya} onChange={handleChange} className={inputStyle}>
          <option>Hammasi</option>
          <option>FullContact</option>
          <option>Sales Doctor</option>
        </select>

        <select name="davr" value={form.davr} onChange={handleChange} className={inputStyle}>
          <option>Kunlik</option>
          <option>Haftalik</option>
          <option>Oylik</option>
          <option>Maxsus davr</option>
        </select>

        <input type="date" name="sanaBoshlanish" value={form.sanaBoshlanish} onChange={handleChange} className={inputStyle} />

        <input type="date" name="sanaTugash" value={form.sanaTugash} onChange={handleChange} className={inputStyle} />

        <input name="leadReja" value={form.leadReja} onChange={handleChange} placeholder="Lead reja" className={inputStyle} />

        <input name="cplReja" value={form.cplReja} onChange={handleChange} placeholder="CPL reja" className={inputStyle} />

        <input name="sotuvReja" value={form.sotuvReja} onChange={handleChange} placeholder="Sotuv reja" className={inputStyle} />

        <input name="tushumReja" value={form.tushumReja} onChange={handleChange} placeholder="Tushum reja" className={inputStyle} />

        <button
          onClick={addPlan}
          className="rounded-xl bg-blue-600 p-3 font-bold text-white transition hover:bg-blue-700 md:col-span-4"
        >
          Rejani qo‘shish
        </button>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-300 text-slate-700">
              <th className="pb-3">Kompaniya</th>
              <th className="pb-3">Davr</th>
              <th className="pb-3">Boshlanish</th>
              <th className="pb-3">Tugash</th>
              <th className="pb-3">Lead</th>
              <th className="pb-3">CPL</th>
              <th className="pb-3">Sotuv</th>
              <th className="pb-3">Tushum</th>
              <th className="pb-3">Amal</th>
            </tr>
          </thead>

          <tbody>
            {plans.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="py-4 font-bold text-slate-950">{item.kompaniya}</td>
                <td className="py-4 text-slate-900">{item.davr}</td>
                <td className="py-4 text-slate-900">{item.sanaBoshlanish}</td>
                <td className="py-4 text-slate-900">{item.sanaTugash}</td>
                <td className="py-4 font-semibold text-slate-950">{item.leadReja}</td>
                <td className="py-4 font-semibold text-slate-950">{pulQiymat(item.cplReja)}</td>
                <td className="py-4 font-semibold text-slate-950">{item.sotuvReja}</td>
                <td className="py-4 font-semibold text-slate-950">{pulQiymat(item.tushumReja)}</td>
                <td className="py-4">
                  <button
                    onClick={() => deletePlan(item.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                  >
                    O‘chirish
                  </button>
                </td>
              </tr>
            ))}

            {plans.length === 0 && (
              <tr>
                <td colSpan="9" className="py-6 text-center text-slate-500">
                  Hali reja kiritilmagan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}