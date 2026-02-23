import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { QrCode, BarChart3, Zap, TrendingUp, Calendar, PackagePlus } from "lucide-react";

// Mock data
const FORECAST_DATA = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 150 },
  { month: "Mar", value: 180 },
  { month: "Apr", value: 210 },
  { month: "May", value: 195 },
  { month: "Jun", value: 240 },
];

const ACTIVE_BOOSTS = [
  {
    id: 1,
    material: "Plastic",
    multiplier: "2x",
    active: true,
    endsIn: "3 days",
  },
  {
    id: 2,
    material: "Paper",
    multiplier: "1.5x",
    active: false,
    endsIn: "Not active",
  },
  {
    id: 3,
    material: "Glass",
    multiplier: "3x",
    active: true,
    endsIn: "1 day",
  },
];

export default function FacultyPortal() {
  const [boosts, setBoosts] = useState(ACTIVE_BOOSTS);

  const toggleBoost = (id) => {
    setBoosts((prev) =>
      prev.map((boost) =>
        boost.id === id ? { ...boost, active: !boost.active } : boost
      )
    );
  };

  const maxValue = Math.max(...FORECAST_DATA.map((d) => d.value));

  return (
    <DashboardLayout role="Faculty">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Faculty Portal</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage waste collection and track school-wide sustainability.
          </p>
        </div>

        {/* Action Center */}
        <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <QrCode className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Action Center</h2>
              <p className="text-sm text-slate-500">
                Initiate QR-powered waste drop-off
              </p>
            </div>
          </div>

          <button className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-8 py-6 text-lg font-bold text-white shadow-lg transition hover:scale-[1.02] hover:bg-emerald-700 hover:shadow-xl active:scale-[0.98]">
            <QrCode className="h-8 w-8 transition group-hover:rotate-12" />
            Quick Scan Waste Drop-off
          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            Scan student QR codes to log waste contributions
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Analytics - Waste Forecasting */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Waste Forecasting
                </h3>
                <p className="text-sm text-slate-500">
                  Predicted collection (kg) for next month
                </p>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="space-y-3">
              {FORECAST_DATA.map((entry) => {
                const heightPercent = (entry.value / maxValue) * 100;
                return (
                  <div key={entry.month} className="flex items-center gap-3">
                    <span className="w-8 text-xs font-semibold text-slate-600">
                      {entry.month}
                    </span>
                    <div className="relative flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                        style={{ width: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-bold text-slate-900">
                      {entry.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  Predicted next month
                </span>
              </div>
              <span className="text-lg font-bold text-blue-600">260 kg</span>
            </div>
          </div>

          {/* Market Engine - Active Point Boosts */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Market Engine
                </h3>
                <p className="text-sm text-slate-500">
                  Manage active point multipliers
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {boosts.map((boost) => (
                <div
                  key={boost.id}
                  className={`flex items-center justify-between rounded-lg border p-4 transition ${
                    boost.active
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        boost.active
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <PackagePlus className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          boost.active ? "text-emerald-900" : "text-slate-700"
                        }`}
                      >
                        {boost.material}
                      </p>
                      <p className="text-xs text-slate-500">
                        {boost.multiplier} Points
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {boost.active && (
                      <div className="flex items-center gap-1 text-xs text-emerald-600">
                        <Calendar className="h-3 w-3" />
                        {boost.endsIn}
                      </div>
                    )}
                    <button
                      onClick={() => toggleBoost(boost.id)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        boost.active ? "bg-emerald-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          boost.active ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
              <Zap className="h-4 w-4" />
              Create New Boost
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
