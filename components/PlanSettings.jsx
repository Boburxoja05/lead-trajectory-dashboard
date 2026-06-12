"use client";

import { useEffect, useState } from "react";
import { pulQiymat } from "@/utils/calculations";

const inputStyle = {
  width: "100%",
  background: "var(--panel-3)",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: 9,
  padding: "10px 14px",
  fontSize: 13,
  outline: "none",
};

export default function PlanSettings() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    davr: "Kunlik",
    sanaBoshlanish: "",
    sanaTugash: "",
    leadReja: "",
    cplReja: "",
    sotuvReja: "",
    tushumReja: "",
  });

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
    setForm({ davr: "Kunlik", sanaBoshlanish: "", sanaTugash: "", leadReja: "", cplReja: "", sotuvReja: "", tushumReja: "" });
  }

  function deletePlan(id) {
    const updated = plans.filter((item) => item.id !== id);
    setPlans(updated);
    localStorage.setItem("dashboardPlans", JSON.stringify(updated));
  }

  return (
    <div className="card" style={{ padding: "20px 24px" }}>
      <h2 className="card-title" style={{ marginBottom: 4 }}>Reja sozlamalari</h2>
      <p className="card-subtitle" style={{ marginBottom: 20 }}>
        Sana oralig'i bo'yicha Lead, CPL, Sotuv va Tushum rejasini kiriting.
      </p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <select name="davr" value={form.davr} onChange={handleChange} style={inputStyle}>
          <option>Kunlik</option>
          <option>Haftalik</option>
          <option>Oylik</option>
          <option>Maxsus davr</option>
        </select>
        <input type="date" name="sanaBoshlanish" value={form.sanaBoshlanish} onChange={handleChange} style={inputStyle} />
        <input type="date" name="sanaTugash" value={form.sanaTugash} onChange={handleChange} style={inputStyle} />
        <input name="leadReja" value={form.leadReja} onChange={handleChange} placeholder="Lead reja" style={inputStyle} />
        <input name="cplReja" value={form.cplReja} onChange={handleChange} placeholder="CPL reja ($)" style={inputStyle} />
        <input name="sotuvReja" value={form.sotuvReja} onChange={handleChange} placeholder="Sotuv reja" style={inputStyle} />
        <input name="tushumReja" value={form.tushumReja} onChange={handleChange} placeholder="Tushum reja ($)" style={inputStyle} />

        <button
          onClick={addPlan}
          style={{
            background: "var(--accent)",
            color: "#000",
            border: "none",
            borderRadius: 9,
            padding: "10px 0",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            gridColumn: "1 / -1",
          }}
        >
          + Rejani qo'shish
        </button>
      </div>

      <hr className="divider" style={{ margin: "20px 0" }} />

      <div style={{ overflowX: "auto" }}>
        <table className="table-dark" style={{ minWidth: 820 }}>
          <thead>
            <tr>
              <th>Davr</th>
              <th>Boshlanish</th>
              <th>Tugash</th>
              <th>Lead</th>
              <th>CPL</th>
              <th>Sotuv</th>
              <th>Tushum</th>
              <th>Amal</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((item) => (
              <tr key={item.id}>
                <td style={{ color: "#fff", fontWeight: 600 }}>{item.davr}</td>
                <td>{item.sanaBoshlanish}</td>
                <td>{item.sanaTugash}</td>
                <td>{item.leadReja}</td>
                <td className="accent-text">{pulQiymat(item.cplReja)}</td>
                <td>{item.sotuvReja}</td>
                <td className="green-text">{pulQiymat(item.tushumReja)}</td>
                <td>
                  <button
                    onClick={() => deletePlan(item.id)}
                    className="badge badge-red"
                    style={{ cursor: "pointer", border: "none" }}
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
            {plans.length === 0 && (
              <tr>
                <td colSpan={8} className="muted-text" style={{ textAlign: "center", padding: "24px 0" }}>
                  Hali reja kiritilmagan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
