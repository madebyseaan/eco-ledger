import { useNavigate, useLocation } from "react-router-dom";
import { Home, BarChart3, Gift, QrCode, User } from "lucide-react";

const BOTTOM_NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home, path: "" },
  { id: "leaderboard", label: "Board", icon: BarChart3, path: "/leaderboard" },
  { id: "qr", label: "Scan", icon: QrCode, path: null },
  { id: "rewards", label: "Rewards", icon: Gift, path: "/rewards" },
  { id: "profile", label: "Profile", icon: User, path: "/history" },
];

export default function Navbar({ basePath = "/dashboard", onQRClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    path !== null && location.pathname === basePath + path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200/80 bg-white/95 backdrop-blur-lg md:hidden">
      {/* Safe-area wrapper — adds iOS home-indicator inset + comfortable height */}
      <div
        className="mx-auto grid max-w-lg grid-cols-5 items-end px-1 xs:px-3 sm:px-4"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 6px)" }}
      >
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;

          /* ── Centred QR fab button ── */
          if (item.id === "qr") {
            return (
              <div key={item.id} className="flex justify-center">
                <button
                  onClick={onQRClick}
                  aria-label="Scan QR Code"
                  className="-mt-5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-emerald-600 shadow-lg shadow-emerald-600/25 ring-[3px] ring-white transition active:scale-95 sm:h-14 sm:w-14"
                >
                  <QrCode className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                </button>
              </div>
            );
          }

          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(basePath + item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 pb-1.5 pt-2.5 text-[10px] font-medium transition xs:text-[11px] sm:pb-2 sm:pt-3 sm:text-xs ${
                active ? "text-emerald-600" : "text-gray-400"
              }`}
            >
              <Icon className={`h-[18px] w-[18px] sm:h-5 sm:w-5 ${active ? "text-emerald-600" : ""}`} />
              <span className="leading-tight">{item.label}</span>
              {active && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-emerald-600" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
