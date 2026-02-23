import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, LogOut, Menu, X, User, ChevronDown } from "lucide-react";
import Navbar from "./Navbar";

const NAV_LINKS = [
  { label: "Dashboard", path: "" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "Rewards", path: "/rewards" },
  { label: "History", path: "/history" },
];

export default function DashboardLayout({ children, role = "Student", onQRClick, studentName = "Sean" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const basePath = role === "Student" ? "/dashboard" : "/faculty-portal";

  const isActive = (path) => location.pathname === basePath + path;

  const handleNavClick = (path) => {
    navigate(basePath + path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ═══════════════════════════════════════════════════════════
          TOP NAVIGATION — website-style horizontal bar
          ═══════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-[100] border-b border-gray-200/80 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <button onClick={() => handleNavClick("")} className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
              <Leaf className="h-[18px] w-[18px] text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Eco<span className="text-emerald-600">Ledger</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right side — user pill + hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop user pill */}
            <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-1.5 pl-1.5 pr-4 md:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {studentName.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">{studentName}</span>
            </div>

            <button
              onClick={() => navigate("/")}
              className="hidden rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 md:block"
            >
              Sign out
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-gray-100 md:hidden"
            >
              <div className="space-y-1 px-4 py-3">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.path)}
                      className={`flex w-full rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        active
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={() => navigate("/")}
                    className="flex w-full rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          PAGE CONTENT — full-width, sections manage their own max-w
          ═══════════════════════════════════════════════════════════ */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER — website credibility
          ═══════════════════════════════════════════════════════════ */}
      <footer className="hidden border-t border-gray-100 bg-gray-50/50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Leaf className="h-4 w-4" />
            <span>EcoLedger · MRF Sustainability Platform</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 All rights reserved</p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE BOTTOM NAV — app-like on phones
          ═══════════════════════════════════════════════════════════ */}
      <Navbar basePath={basePath} onQRClick={onQRClick} />
    </div>
  );
}
