import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";
import { Sparkles, Scale, Shield, Target, Award, Medal, FileText, Download, TrendingUp, Clock, Package, Coffee, BookOpen, Star, Gift } from "lucide-react";

// Mock data
const STUDENT_STATS = {
  ecoPoints: 1250,
  wasteContributed: 24.5,
  impactTier: "Green Guardian",
};

const PROGRESS_DATA = {
  current: 1250,
  nextMilestone: 2000,
  nextCertificate: "Eco Warrior",
};

const MILESTONE_DATA = {
  currentTier: "Green Guardian",
  nextTier: "Earth Hero",
  progressPercent: 75,
  pointsNeeded: 500,
  estimatedWeeks: 2,
  milestoneReached: false, // Set to true to test the download button
};

const LEADERBOARD = [
  { rank: 1, name: "Maria Santos", gradeLevel: "Grade 12", points: 2450, avatar: "MS", isNew: false },
  { rank: 2, name: "Juan Dela Cruz", gradeLevel: "Grade 11", points: 2100, avatar: "JD", isNew: false },
  { rank: 3, name: "Chen Wei", gradeLevel: "Grade 10", points: 1890, avatar: "CW", isNew: false },
  { rank: 4, name: "Sarah Johnson", gradeLevel: "Grade 11", points: 1670, avatar: "SJ", isNew: false },
  { rank: 5, name: "You", gradeLevel: "Grade 10", points: 1250, avatar: "YO", highlight: true, isNew: false },
];

const RECENT_ACTIVITY = [
  { id: 1, action: "Plastic bottles", weight: "2.5 kg", points: 125, time: "2 minutes ago", type: "plastic" },
  { id: 2, action: "Paper waste", weight: "1.8 kg", points: 90, time: "15 minutes ago", type: "paper" },
  { id: 3, action: "Metal cans", weight: "0.8 kg", points: 80, time: "1 hour ago", type: "metal" },
];

const REWARDS = [
  { 
    id: 1, 
    name: "Canteen Credit", 
    description: "₱50 canteen voucher", 
    pointCost: 500, 
    icon: Coffee,
    color: "orange"
  },
  { 
    id: 2, 
    name: "School Supplies", 
    description: "1 Pack of Notebooks", 
    pointCost: 1200, 
    icon: BookOpen,
    color: "blue"
  },
  { 
    id: 3, 
    name: "Privilege Pass", 
    description: "Free homework pass", 
    pointCost: 2000, 
    icon: Star,
    color: "purple"
  },
];

// Custom hook for count-up animation
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
}

export default function Dashboard() {
  const progressPercent = Math.round(
    (PROGRESS_DATA.current / PROGRESS_DATA.nextMilestone) * 100
  );

  // Animated counters
  const animatedPoints = useCountUp(STUDENT_STATS.ecoPoints);
  const animatedWeight = useCountUp(STUDENT_STATS.wasteContributed * 10) / 10;

  // State for new entry flash animation (mock trigger)
  const [flashingRow, setFlashingRow] = useState(null);

  // Mock: Simulate a new entry being added (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlashingRow(1); // Flash rank 1 as demo
      setTimeout(() => setFlashingRow(null), 2000); // Remove flash after 2s
    }, 3000); // Trigger 3s after page load

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout role="Student">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back!</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your eco-impact and climb the leaderboard.
          </p>
        </div>

        {/* Impact Cards - 3 Column Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Total Eco-Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="flex flex-col items-center justify-center rounded-xl border border-emerald-50 bg-white p-8 shadow-sm"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50">
              <Sparkles className="h-8 w-8 text-amber-600" />
            </div>
            <p className="mb-2 text-sm font-medium text-slate-500">
              Total Eco-Points
            </p>
            <p className="text-4xl font-bold text-slate-900">
              {animatedPoints.toLocaleString()}
            </p>
            <p className="mt-2 text-xs text-emerald-600">+120 this week</p>
          </motion.div>

          {/* Card 2: Current Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="flex flex-col items-center justify-center rounded-xl border border-emerald-50 bg-white p-8 shadow-sm"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50">
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="mb-2 text-sm font-medium text-slate-500">
              Current Tier
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-700">
                {STUDENT_STATS.impactTier}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">Tier 3 of 5</p>
          </motion.div>

          {/* Card 3: Waste Diverted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="flex flex-col items-center justify-center rounded-xl border border-emerald-50 bg-white p-8 shadow-sm sm:col-span-2 lg:col-span-1"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50">
              <Scale className="h-8 w-8 text-blue-600" />
            </div>
            <p className="mb-2 text-sm font-medium text-slate-500">
              Waste Diverted
            </p>
            <p className="text-4xl font-bold text-slate-900">
              {animatedWeight.toFixed(1)} <span className="text-2xl text-slate-500">kg</span>
            </p>
            <p className="mt-2 text-xs text-emerald-600">+3.2 kg this week</p>
          </motion.div>
        </div>

        {/* Milestone Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Milestone Tracker
              </h3>
              <p className="text-sm text-slate-500">
                {MILESTONE_DATA.progressPercent}% to {MILESTONE_DATA.nextTier}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr,auto]">
            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Current Tier
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {MILESTONE_DATA.currentTier}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-600">Next Tier</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {MILESTONE_DATA.nextTier}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-6 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${MILESTONE_DATA.progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 shadow-inner"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    {MILESTONE_DATA.progressPercent}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Target className="h-4 w-4" />
                  <span>{MILESTONE_DATA.pointsNeeded} points needed</span>
                </div>
                <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  Based on your habits, you'll reach the next tier in{" "}
                  {MILESTONE_DATA.estimatedWeeks} weeks!
                </div>
              </div>
            </div>

            {/* Certificate Card */}
            <div className="flex items-center justify-center lg:justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-full max-w-[200px] overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6 shadow-lg"
              >
                <div className="absolute right-2 top-2 text-emerald-200 opacity-20">
                  <Award className="h-16 w-16" />
                </div>
                <div className="relative text-center">
                  <FileText className="mx-auto mb-3 h-10 w-10 text-emerald-600" />
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Next Certificate
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {MILESTONE_DATA.nextTier}
                  </p>
                  {MILESTONE_DATA.milestoneReached ? (
                    <motion.button
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(16, 185, 129, 0.4)",
                          "0 0 0 8px rgba(16, 185, 129, 0)",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-emerald-700"
                    >
                      <Download className="h-3 w-3" />
                      Download PDF
                    </motion.button>
                  ) : (
                    <div className="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
                      Not yet unlocked
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Progress Tracker */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                <Target className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Progress to Next Certificate
                </h3>
                <p className="text-sm text-slate-500">
                  {PROGRESS_DATA.nextCertificate}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-600">
                {progressPercent}%
              </p>
              <p className="text-xs text-slate-500">
                {PROGRESS_DATA.nextMilestone - PROGRESS_DATA.current} points to
                go
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>{PROGRESS_DATA.current} pts</span>
            <span>{PROGRESS_DATA.nextMilestone} pts</span>
          </div>
        </div>

        {/* Top Contributors Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-amber-50">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Top Contributors
              </h3>
              <p className="text-sm text-slate-500">
                Leading eco-warriors this month
              </p>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Student
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 sm:table-cell">
                    Grade Level
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {LEADERBOARD.map((entry) => {
                  const isFlashing = flashingRow === entry.rank;
                  let bgClass = "bg-white";
                  
                  if (entry.highlight) {
                    bgClass = "bg-emerald-50";
                  } else if (entry.rank === 1) {
                    bgClass = "bg-gradient-to-r from-amber-50 to-amber-100/30";
                  } else if (entry.rank === 2) {
                    bgClass = "bg-gradient-to-r from-slate-50 to-slate-100/30";
                  } else if (entry.rank === 3) {
                    bgClass = "bg-gradient-to-r from-orange-50 to-orange-100/30";
                  }

                  return (
                    <motion.tr
                      key={entry.rank}
                      animate={
                        isFlashing
                          ? {
                              backgroundColor: [
                                "rgb(255, 255, 255)",
                                "rgb(209, 250, 229)",
                                "rgb(255, 255, 255)",
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 0.6, repeat: 2 }}
                      className={`transition hover:brightness-95 ${bgClass}`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {entry.rank === 1 && (
                            <Medal className="h-6 w-6 text-amber-500" />
                          )}
                          {entry.rank === 2 && (
                            <Medal className="h-6 w-6 text-slate-400" />
                          )}
                          {entry.rank === 3 && (
                            <Medal className="h-6 w-6 text-orange-600" />
                          )}
                          <span
                            className={`text-sm font-bold ${
                              entry.highlight
                                ? "text-emerald-700"
                                : entry.rank <= 3
                                ? "text-slate-800"
                                : "text-slate-600"
                            }`}
                          >
                            #{entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold shadow-sm ${
                              entry.highlight
                                ? "bg-emerald-600 text-white"
                                : entry.rank === 1
                                ? "bg-amber-500 text-white"
                                : entry.rank === 2
                                ? "bg-slate-400 text-white"
                                : entry.rank === 3
                                ? "bg-orange-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {entry.avatar}
                          </div>
                          <div>
                            <span
                              className={`block text-sm font-semibold ${
                                entry.highlight
                                  ? "text-emerald-700"
                                  : "text-slate-900"
                              }`}
                            >
                              {entry.name}
                            </span>
                            <span className="block text-xs text-slate-500 sm:hidden">
                              {entry.gradeLevel}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-4 py-4 sm:table-cell">
                        <span className="text-sm font-medium text-slate-600">
                          {entry.gradeLevel}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span
                          className={`text-sm font-bold ${
                            entry.highlight
                              ? "text-emerald-700"
                              : entry.rank <= 3
                              ? "text-slate-900"
                              : "text-slate-700"
                          }`}
                        >
                          {entry.points.toLocaleString()}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-slate-400" />
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                Recent Activity
              </h4>
            </div>

            <div className="space-y-3">
              {RECENT_ACTIVITY.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        activity.type === "plastic"
                          ? "bg-blue-100"
                          : activity.type === "paper"
                          ? "bg-amber-100"
                          : "bg-slate-200"
                      }`}
                    >
                      <Package
                        className={`h-5 w-5 ${
                          activity.type === "plastic"
                            ? "text-blue-600"
                            : activity.type === "paper"
                            ? "text-amber-600"
                            : "text-slate-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-slate-500">
                        {activity.weight} • +{activity.points} points
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Rewards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-purple-50">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Rewards Preview
              </h3>
              <p className="text-sm text-slate-500">
                Redeem your eco-points for awesome rewards
              </p>
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REWARDS.map((reward, index) => {
              const canAfford = STUDENT_STATS.ecoPoints >= reward.pointCost;
              const Icon = reward.icon;

              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`relative overflow-hidden rounded-xl border p-6 shadow-sm transition ${
                    canAfford
                      ? "border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${
                      reward.color === "orange"
                        ? "bg-orange-100"
                        : reward.color === "blue"
                        ? "bg-blue-100"
                        : "bg-purple-100"
                    }`}
                  >
                    <Icon
                      className={`h-7 w-7 ${
                        reward.color === "orange"
                          ? "text-orange-600"
                          : reward.color === "blue"
                          ? "text-blue-600"
                          : "text-purple-600"
                      }`}
                    />
                  </div>

                  {/* Reward Details */}
                  <h4 className="mb-1 text-lg font-bold text-slate-900">
                    {reward.name}
                  </h4>
                  <p className="mb-4 text-sm text-slate-500">
                    {reward.description}
                  </p>

                  {/* Point Cost */}
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-semibold text-slate-700">
                      {reward.pointCost.toLocaleString()} points
                    </span>
                  </div>

                  {/* Redeem Button */}
                  <button
                    disabled={!canAfford}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition ${
                      canAfford
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md active:scale-95"
                        : "cursor-not-allowed bg-slate-200 text-slate-400"
                    }`}
                  >
                    {canAfford ? (
                      <>
                        <Gift className="h-4 w-4" />
                        Redeem Now
                      </>
                    ) : (
                      <>
                        <Target className="h-4 w-4" />
                        {(reward.pointCost - STUDENT_STATS.ecoPoints).toLocaleString()} more
                        pts needed
                      </>
                    )}
                  </button>

                  {/* Affordability Badge */}
                  {canAfford && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                      className="absolute right-3 top-3 rounded-full bg-emerald-600 px-2 py-1 text-xs font-bold text-white shadow-md"
                    >
                      Available!
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
