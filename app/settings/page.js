import Link from "next/link";
import PlanSettings from "@/components/PlanSettings";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-[1600px] space-y-4">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-950">
                Sozlamalar
              </h1>

              <p className="mt-2 text-slate-500">
                Reja qiymatlarini boshqarish bo‘limi
              </p>
            </div>

            <Link
              href="/"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Dashboardga qaytish
            </Link>
          </div>
        </section>

        <PlanSettings />
      </div>
    </main>
  );
}