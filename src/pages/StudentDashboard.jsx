import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import {
  Sparkles, Scale, Shield, Target, Award, Medal, FileText,
  Download, TrendingUp, Clock, Package, Coffee, BookOpen,
  Star, Gift, Loader2, QrCode, X, PieChart, Leaf, ArrowUpRight,
  BarChart3
} from "lucide-react";

// ── Professional Palette ──
const COLORS = {
  accent: "#059669",
  accentHover: "#047857",
  accentLight: "#D1FAE5",
  accentDark: "#064E3B",
  surface: "#FFFFFF",
  background: "#F9FAFB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  amber: "#D97706",
  amberLight: "#FEF3C7",
};

// ── Mock Data ──
const STUDENT_STATS = {
  name: "Sean Roma",
  ecoPoints: 1250,
  wasteContributed: 24.5,
  impactTier: "Green Guardian",
  studentId: "2024-12345",
  wasteBreakdown: { plastic: 40, paper: 30, metal: 30 },
};

const MILESTONE_DATA = {
  currentTier: "Green Guardian",
  nextTier: "Earth Hero",
  progressPercent: 75,
  pointsNeeded: 500,
  estimatedWeeks: 2,
  milestoneReached: false,
};

const LEADERBOARD = [
  { rank: 1, name: "Maria Santos", gradeLevel: "Grade 12", points: 2450, avatar: "MS" },
  { rank: 2, name: "Juan Dela Cruz", gradeLevel: "Grade 11", points: 2100, avatar: "JD" },
  { rank: 3, name: "Chen Wei", gradeLevel: "Grade 10", points: 1890, avatar: "CW" },
  { rank: 4, name: "Sarah Johnson", gradeLevel: "Grade 11", points: 1670, avatar: "SJ" },
  { rank: 5, name: "You", gradeLevel: "Grade 10", points: 1250, avatar: "SR", highlight: true },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "Plastic bottles", weight: "2.5 kg", points: 125, time: "2 min ago", type: "plastic" },
  { id: 2, action: "Paper waste", weight: "1.8 kg", points: 90, time: "15 min ago", type: "paper" },
  { id: 3, action: "Metal cans", weight: "0.8 kg", points: 80, time: "1 hr ago", type: "metal" },
];

const REWARDS = [
  { id: 1, name: "Canteen Credit", description: "₱50 canteen voucher", pointCost: 500, icon: Coffee, color: "orange" },
  { id: 2, name: "School Supplies", description: "1 Pack of Notebooks", pointCost: 1200, icon: BookOpen, color: "blue" },
  { id: 3, name: "Privilege Pass", description: "Free homework pass", pointCost: 2000, icon: Star, color: "purple" },
];

// ── Reusable section heading ──
function SectionHeading({ badge, title, subtitle, align = "left" }) {
  return (
    <div className={`mb-6 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {badge && (
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {badge}
        </span>
      )}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-base leading-relaxed text-gray-500">{subtitle}</p>}
    </div>
  );
}

// ── Count-up hook ──
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime, raf;
    const animate = (t) => {
      if (!startTime) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return count;
}

// ── Stagger animation variants ──
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ═══════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const animatedPoints = useCountUp(STUDENT_STATS.ecoPoints);
  const animatedWeight = useCountUp(STUDENT_STATS.wasteContributed * 10) / 10;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="Student" onQRClick={() => setShowQRModal(true)} studentName={STUDENT_STATS.name.split(" ")[0]}>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-emerald-600" />
            <p className="mt-4 text-sm font-medium text-gray-500">Loading your eco-impact...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="Student" onQRClick={() => setShowQRModal(true)} studentName={STUDENT_STATS.name.split(" ")[0]}>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 — HERO  (full-bleed gradient)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${COLORS.accentDark} 0%, ${COLORS.accent} 55%, #34D399 100%)` }}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-white/[0.04]" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-white/[0.03]" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left — greeting */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur">
                <Leaf className="h-4 w-4 text-emerald-200" />
                <span className="text-sm font-medium text-white/90">Welcome back, {STUDENT_STATS.name.split(" ")[0]}</span>
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your sustainability<br className="hidden sm:block" /> journey continues.
              </h1>
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                You're ranked <span className="font-semibold text-white">#5</span> this month. Keep recycling to climb the leaderboard and unlock exclusive rewards.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowQRModal(true)}
                  className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow-lg shadow-black/10 transition hover:shadow-xl"
                >
                  <QrCode className="h-5 w-5" />
                  Scan QR to Recycle
                </motion.button>
                <a
                  href="#leaderboard"
                  className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <BarChart3 className="h-4 w-4" />
                  View Leaderboard
                </a>
              </div>
            </motion.div>

            {/* Right — stats cluster */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 sm:max-w-sm lg:max-w-md"
            >
              <div className="col-span-2 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-sm font-medium text-white/60">Total Eco-Points</p>
                <p className="mt-1 text-4xl font-extrabold tabular-nums tracking-tight text-white sm:text-5xl">
                  {animatedPoints.toLocaleString()}
                </p>
                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-200">
                  <ArrowUpRight className="h-3.5 w-3.5" /> +125 this week
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <Shield className="mb-2 h-5 w-5 text-emerald-200" />
                <p className="text-xs text-white/50">Tier</p>
                <p className="text-sm font-bold text-white">{STUDENT_STATS.impactTier}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <Scale className="mb-2 h-5 w-5 text-emerald-200" />
                <p className="text-xs text-white/50">Recycled</p>
                <p className="text-sm font-bold text-white">{animatedWeight.toFixed(1)} kg</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 — IMPACT AT A GLANCE  (white bg)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Your Impact"
            title="What you've accomplished"
            subtitle="Every kilogram of waste recycled earns eco-points and pushes us closer to a zero-waste campus."
            align="center"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Waste Card */}
            <motion.div variants={fadeUp} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition group-hover:bg-emerald-100">
                <Scale className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-gray-500">Waste Recycled</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {animatedWeight.toFixed(1)} <span className="text-lg font-medium text-gray-400">kg</span>
              </p>
              <p className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" /> +3.2 kg this month
              </p>
            </motion.div>

            {/* Tier Card */}
            <motion.div variants={fadeUp} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 transition group-hover:bg-emerald-100">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-gray-500">Current Tier</p>
              <p className="mt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-800">
                  <Shield className="h-3.5 w-3.5" />
                  {STUDENT_STATS.impactTier}
                </span>
              </p>
              <p className="mt-3 text-xs text-gray-400">Tier 3 of 5</p>
            </motion.div>

            {/* Breakdown Card */}
            <motion.div variants={fadeUp} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-lg sm:col-span-2 lg:col-span-1">
              <p className="mb-4 text-sm font-semibold text-gray-900">Waste Breakdown</p>
              <div className="flex items-center gap-5">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90 transform">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#3B82F6" strokeWidth="4"
                      strokeDasharray={`${STUDENT_STATS.wasteBreakdown.plastic} 100`} />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#F59E0B" strokeWidth="4"
                      strokeDasharray={`${STUDENT_STATS.wasteBreakdown.paper} 100`}
                      strokeDashoffset={-STUDENT_STATS.wasteBreakdown.plastic} />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#64748B" strokeWidth="4"
                      strokeDasharray={`${STUDENT_STATS.wasteBreakdown.metal} 100`}
                      strokeDashoffset={-(STUDENT_STATS.wasteBreakdown.plastic + STUDENT_STATS.wasteBreakdown.paper)} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="flex-1 space-y-2.5 text-xs">
                  {[
                    { label: "Plastic", value: STUDENT_STATS.wasteBreakdown.plastic, color: "#3B82F6" },
                    { label: "Paper", value: STUDENT_STATS.wasteBreakdown.paper, color: "#F59E0B" },
                    { label: "Metal", value: STUDENT_STATS.wasteBreakdown.metal, color: "#64748B" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-500">{item.label}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 — MILESTONE TRACKER  (gray bg)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-gray-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Progress"
            title="Your path to the next tier"
            subtitle={`You're ${MILESTONE_DATA.progressPercent}% of the way to ${MILESTONE_DATA.nextTier}. Keep going — you're almost there.`}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 lg:grid-cols-[1fr_280px]"
          >
            {/* Main progress area */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Current Tier</p>
                  <p className="text-lg font-bold text-emerald-600">{MILESTONE_DATA.currentTier}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Next Tier</p>
                  <p className="text-lg font-bold text-gray-900">{MILESTONE_DATA.nextTier}</p>
                </div>
              </div>

              <div className="mt-6 h-3.5 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${MILESTONE_DATA.progressPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${COLORS.accent}, #34D399)` }}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Target className="h-4 w-4" />
                  <span>{MILESTONE_DATA.pointsNeeded} points needed</span>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  ~{MILESTONE_DATA.estimatedWeeks} weeks to go
                </span>
              </div>

              {/* Recent drops */}
              <div className="mt-6 border-t border-gray-100 pt-5">
                <div className="mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Recent Drops</h4>
                </div>
                <div className="space-y-2.5">
                  {RECENT_ACTIVITY.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.08 }}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-3.5 transition hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: a.type === "plastic" ? "#DBEAFE" : a.type === "paper" ? COLORS.amberLight : COLORS.borderLight,
                          }}
                        >
                          <Package
                            className="h-4 w-4"
                            style={{ color: a.type === "plastic" ? "#2563EB" : a.type === "paper" ? COLORS.amber : "#64748B" }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{a.action}</p>
                          <p className="text-xs text-gray-400">{a.weight} · {a.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-emerald-600">+{a.points}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificate preview */}
            <div className="flex items-start justify-center lg:justify-end">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full max-w-[280px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <div className="absolute right-2 top-2 opacity-[0.04]">
                  <Award className="h-24 w-24 text-gray-900" />
                </div>
                <div className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100">
                    <FileText className="h-7 w-7 text-amber-600" />
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">Next Certificate</p>
                  <p className="mt-1 text-base font-bold text-gray-900">{MILESTONE_DATA.nextTier}</p>
                  {MILESTONE_DATA.milestoneReached ? (
                    <motion.button
                      animate={{ boxShadow: [`0 0 0 0 ${COLORS.accent}40`, `0 0 0 8px ${COLORS.accent}00`] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md"
                    >
                      <Download className="h-3.5 w-3.5" /> Download PDF
                    </motion.button>
                  ) : (
                    <div className="mt-5 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-400">
                      Not yet unlocked
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 — LEADERBOARD  (white bg)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="leaderboard" className="scroll-mt-20 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Leaderboard"
            title="Top contributors"
            subtitle="See who's leading the charge for a cleaner campus this month."
            align="center"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Rank</th>
                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Student</th>
                    <th className="hidden px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 sm:table-cell">Grade</th>
                    <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {LEADERBOARD.map((entry) => {
                    const bg = entry.highlight ? "bg-emerald-50/60" : entry.rank === 1 ? "bg-amber-50/50" : "";
                    return (
                      <motion.tr
                        key={entry.rank}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: entry.rank * 0.06, duration: 0.35 }}
                        className={`transition hover:bg-gray-50/70 ${bg}`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {entry.rank === 1 && <Medal className="h-5 w-5 text-amber-500" />}
                            {entry.rank === 2 && <Medal className="h-5 w-5 text-slate-400" />}
                            {entry.rank === 3 && <Medal className="h-5 w-5 text-orange-400" />}
                            <span className={`text-sm font-semibold ${entry.highlight ? "text-emerald-600" : "text-gray-900"}`}>
                              #{entry.rank}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                              style={{
                                backgroundColor: entry.highlight ? COLORS.accent : entry.rank === 1 ? COLORS.amber : entry.rank === 2 ? "#94A3B8" : entry.rank === 3 ? "#FB923C" : "#F3F4F6",
                                color: entry.rank <= 3 || entry.highlight ? "#FFF" : "#6B7280",
                              }}
                            >
                              {entry.avatar}
                            </div>
                            <div>
                              <span className={`block text-sm font-semibold ${entry.highlight ? "text-emerald-600" : "text-gray-900"}`}>
                                {entry.name}
                              </span>
                              <span className="block text-xs text-gray-400 sm:hidden">{entry.gradeLevel}</span>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-5 py-4 text-sm text-gray-500 sm:table-cell">{entry.gradeLevel}</td>
                        <td className="px-5 py-4 text-right">
                          <span className={`text-sm font-bold tabular-nums ${entry.highlight ? "text-emerald-600" : "text-gray-900"}`}>
                            {entry.points.toLocaleString()}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 — REWARDS  (gray bg)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-gray-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Rewards"
            title="Redeem your eco-points"
            subtitle="Turn your recycling efforts into real perks. More rewards are added every semester."
            align="center"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {REWARDS.map((reward) => {
              const canAfford = STUDENT_STATS.ecoPoints >= reward.pointCost;
              const Icon = reward.icon;
              return (
                <motion.div
                  key={reward.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg ${
                    canAfford ? "border-emerald-200" : "border-gray-200"
                  }`}
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: reward.color === "orange" ? "#FED7AA" : reward.color === "blue" ? "#DBEAFE" : "#E9D5FF",
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: reward.color === "orange" ? "#EA580C" : reward.color === "blue" ? "#2563EB" : "#9333EA" }}
                    />
                  </div>

                  <h4 className="text-base font-bold text-gray-900">{reward.name}</h4>
                  <p className="mt-1 text-sm text-gray-500">{reward.description}</p>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-bold tabular-nums text-amber-600">{reward.pointCost.toLocaleString()}</span>
                    </div>
                    {canAfford ? (
                      <button className="rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                        Redeem
                      </button>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-400">
                        {(reward.pointCost - STUDENT_STATS.ecoPoints).toLocaleString()} more
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 — CTA BANNER  (white bg + gradient card)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-10 text-center sm:px-12 sm:py-12"
            style={{ background: `linear-gradient(135deg, ${COLORS.accentDark}, ${COLORS.accent})` }}
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/[0.05]" />
            <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-white/[0.05]" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to make an impact?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-base text-white/70">
                Scan your QR code at any campus recycling bin. Every item you recycle earns points
                and brings us closer to a sustainable future.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowQRModal(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-emerald-800 shadow-lg transition hover:shadow-xl"
              >
                <QrCode className="h-5 w-5" />
                Open QR Scanner
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          QR CODE MODAL
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
            onClick={() => setShowQRModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQRModal(false)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-black/10"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className="px-6 py-5"
                style={{ background: `linear-gradient(135deg, ${COLORS.accentDark}, ${COLORS.accent})` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <QrCode className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Scan to Recycle</h3>
                    <p className="text-sm text-white/70">Show this at any bin</p>
                  </div>
                </div>
              </div>

              <div className="p-6 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mb-5 flex justify-center"
                >
                  <div className="rounded-2xl border-2 border-dashed border-gray-200 p-5">
                    <div className="relative h-52 w-52 rounded-xl bg-white">
                      <svg viewBox="0 0 100 100" className="h-full w-full p-2">
                        <rect x="0" y="0" width="100" height="100" fill="#FFF" />
                        <rect x="10" y="10" width="20" height="20" fill={COLORS.accentDark} />
                        <rect x="70" y="10" width="20" height="20" fill={COLORS.accentDark} />
                        <rect x="10" y="70" width="20" height="20" fill={COLORS.accentDark} />
                        <rect x="40" y="20" width="5" height="5" fill={COLORS.accentDark} />
                        <rect x="50" y="20" width="5" height="5" fill={COLORS.accentDark} />
                        <rect x="60" y="20" width="5" height="5" fill={COLORS.accentDark} />
                        <rect x="45" y="30" width="10" height="10" fill={COLORS.accentDark} />
                        <rect x="35" y="45" width="30" height="10" fill={COLORS.accentDark} />
                        <rect x="20" y="60" width="10" height="5" fill={COLORS.accentDark} />
                        <rect x="75" y="60" width="10" height="5" fill={COLORS.accentDark} />
                        <rect x="40" y="75" width="20" height="10" fill={COLORS.accentDark} />
                        <circle cx="50" cy="50" r="8" fill={COLORS.accent} />
                        <text x="50" y="54" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">&#9851;</text>
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Student ID</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{STUDENT_STATS.studentId}</p>

                <div className="mt-5 space-y-1.5 text-sm text-gray-500">
                  <p>Scan the QR code on any trash bin</p>
                  <p>Deposit your recyclables</p>
                  <p>Earn points automatically</p>
                </div>
              </div>

              <div className="border-t border-gray-100 px-6 py-3">
                <p className="text-center text-xs text-gray-400">Need help? Contact your faculty coordinator</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </DashboardLayout>
  );
}
