import Link from "next/link";
import PlanSettings from "@/components/PlanSettings";

export default function SettingsPage() {
  return (
    <div className="page-wrap" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        className="card"
        style={{ padding: "20px 24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}
      >
        <div>
          <h1 style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em", margin: 0 }}>
            Sozlamalar
          </h1>
          <p className="muted-text" style={{ fontSize: 13, marginTop: 4 }}>
            Reja qiymatlarini boshqarish bo'limi
          </p>
        </div>
        <Link
          href="/crm"
          style={{
            background: "var(--accent)",
            color: "#000",
            padding: "9px 20px",
            borderRadius: 9,
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          ← Dashboardga qaytish
        </Link>
      </div>

      <PlanSettings />
    </div>
  );
}
