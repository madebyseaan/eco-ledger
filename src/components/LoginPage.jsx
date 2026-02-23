import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Lock, User, Eye, EyeOff, Loader2, AlertCircle, X } from "lucide-react";

const ROLES = ["Student", "Faculty"];

const ROLE_ROUTES = {
  Student: "/dashboard",
  Faculty: "/faculty-portal",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("Student");
  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- School ID mask: 0000-00000 ---------- */
  const formatSchoolId = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    if (digits.length > 4) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    }
    return digits;
  };

  const handleSchoolIdChange = (e) => {
    setSchoolId(formatSchoolId(e.target.value));
  };

  const isSchoolIdValid = /^\d{4}-\d{5}$/.test(schoolId);

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isSchoolIdValid) {
      setError("Please enter a valid School ID (format: 0000-00000).");
      return;
    }
    if (password.length < 1) {
      setError("Password is required.");
      return;
    }

    setIsLoading(true);
    // Simulate network request — replace with real auth logic
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);

    // On success, navigate based on role
    navigate(ROLE_ROUTES[selectedRole]);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 overflow-hidden" style={{ backgroundColor: '#ECFDF5' }}>
      {/* ---- Leaf-pattern background ---- */}
      <LeafBackground />

      {/* ---- Error toast ---- */}
      {error && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-5 py-3 shadow-lg animate-slide-down">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
          <span className="text-sm font-medium text-red-800">{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-2 rounded p-0.5 text-red-400 transition hover:bg-red-100 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ---- Card ---- */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm sm:p-10">
        {/* Logo + Title */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: '#22C55E' }}>
            <Leaf className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#1F2937' }}>
            EcoLedger
          </h1>
          <p className="text-sm text-slate-500">
            Sign in to your account to continue
          </p>
        </div>

        {/* Role Switcher */}
        <div className="mb-6">
          <div className="flex rounded-lg bg-slate-100 p-1">
            {ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all duration-200 ${
                  selectedRole === role
                    ? "text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={selectedRole === role ? { backgroundColor: '#22C55E' } : {}}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* School ID */}
          <div>
            <label
              htmlFor="schoolId"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              School ID
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <User className="h-5 w-5" />
              </span>
              <input
                id="schoolId"
                type="text"
                inputMode="numeric"
                placeholder="0000-00000"
                value={schoolId}
                onChange={handleSchoolIdChange}
                className={`block w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
                  schoolId && !isSchoolIdValid
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-300 focus:ring-2"
                }`}
                style={schoolId && isSchoolIdValid ? { borderColor: '#22C55E', boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.2)' } : { color: '#1F2937' }}
              />
            </div>
            {schoolId && !isSchoolIdValid && (
              <p className="mt-1 text-xs text-red-500">
                Format: 0000-00000
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="h-5 w-5" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-11 text-sm placeholder:text-slate-400 transition focus:outline-none focus:ring-2"
                style={{ color: '#1F2937', borderColor: password ? '#22C55E' : undefined, boxShadow: password ? '0 0 0 2px rgba(34, 197, 94, 0.2)' : undefined }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition hover:text-slate-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 focus:ring-2"
                style={{ accentColor: '#22C55E' }}
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm font-medium transition hover:underline"
              style={{ color: '#22C55E' }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: '#22C55E', boxShadow: !isLoading ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : undefined }}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} EcoLedger &mdash; Sustainability
          starts here.
        </p>
      </div>
    </div>
  );
}

/* ---------- Subtle leaf-pattern SVG background ---------- */
function LeafBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.04]">
      <svg
        className="absolute -top-20 -left-20 h-[600px] w-[600px]"
        viewBox="0 0 200 200"
        fill="currentColor"
        style={{ color: '#22C55E' }}
      >
        <path d="M100 0C60 40 0 80 0 130c0 38.66 44.77 70 100 70s100-31.34 100-70C200 80 140 40 100 0zM100 10c35 35 85 70 85 120 0 33.14-38.06 60-85 60S15 163.14 15 130C15 80 65 45 100 10z" />
      </svg>
      <svg
        className="absolute -right-16 -bottom-16 h-[500px] w-[500px] rotate-45"
        viewBox="0 0 200 200"
        fill="currentColor"
        style={{ color: '#22C55E' }}
      >
        <path d="M100 0C60 40 0 80 0 130c0 38.66 44.77 70 100 70s100-31.34 100-70C200 80 140 40 100 0zM100 10c35 35 85 70 85 120 0 33.14-38.06 60-85 60S15 163.14 15 130C15 80 65 45 100 10z" />
      </svg>
      <svg
        className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -rotate-12"
        viewBox="0 0 200 200"
        fill="currentColor"
        style={{ color: '#22C55E' }}
      >
        <path d="M100 0C60 40 0 80 0 130c0 38.66 44.77 70 100 70s100-31.34 100-70C200 80 140 40 100 0z" />
      </svg>
    </div>
  );
}
