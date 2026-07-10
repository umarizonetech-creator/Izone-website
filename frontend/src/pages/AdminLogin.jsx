import { useState, useRef, useEffect, useCallback } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  LockKeyhole, User, Eye, EyeOff, ArrowLeft, KeyRound, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/context/AdminContext";

const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const RESEND_SECONDS = 60;
const FALLBACK_MASKED_EMAIL = "the configured admin email";

// ── step meta ─────────────────────────────────────────────────────────────────
const META = {
  login:  { badge: "Secure Access",    title: "Admin Login",     subtitle: "Sign in to open the iZone admin dashboard." },
  forgot: { badge: "Account Recovery", title: "Forgot Password", subtitle: "Enter your username to receive a 6-digit OTP." },
};

// ── OTP 6-box input ───────────────────────────────────────────────────────────
function OtpInput({ value, onChange }) {
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");
  const refs = useRef(Array.from({ length: 6 }, () => null));

  const update = (idx, char) => {
    const next = digits.map((d, i) => (i === idx ? char : d));
    onChange(next.join(""));
  };

  const handleKey = (idx, e) => {
    if (e.key === "Backspace") {
      if (digits[idx]) { update(idx, ""); return; }
      if (idx > 0) { refs.current[idx - 1]?.focus(); update(idx - 1, ""); }
      return;
    }
    if (e.key === "ArrowLeft" && idx > 0) { refs.current[idx - 1]?.focus(); return; }
    if (e.key === "ArrowRight" && idx < 5) { refs.current[idx + 1]?.focus(); return; }
  };

  const handleChange = (idx, e) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) return;
    update(idx, char);
    if (idx < 5) refs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(Array.from({ length: 6 }, (_, i) => pasted[i] || "").join(""));
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex gap-2 justify-between">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          className={[
            "w-11 h-12 text-center text-lg font-semibold rounded-lg border bg-background",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "transition-all duration-150",
            d ? "border-primary text-foreground" : "border-input text-muted-foreground",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

// ── Step progress bar (2 steps: forgot → reset) ───────────────────────────────
function StepBar({ stage }) {
  // stage: 0 = username, 1 = otp shown, 2 = reset shown
  const filled = stage; // 0,1,2 segments filled
  return (
    <div className="flex items-center gap-1 mb-6">
      {[0, 1].map((i) => (
        <div key={i} className="flex items-center flex-1">
          <div className={[
            "h-1.5 flex-1 rounded-full transition-all duration-300",
            i < filled ? "bg-primary" : i === filled ? "bg-primary/50" : "bg-muted",
          ].join(" ")} />
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminLoggedIn, adminLogin } = useAdmin();

  // login
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // forgot flow — single view, progressive reveal
  const [view, setView] = useState("login");
  const [fpUsername, setFpUsername] = useState("");
  const [maskedEmail, setMaskedEmail] = useState(FALLBACK_MASKED_EMAIL);
  const [otpSent, setOtpSent]     = useState(false);  // shows OTP boxes
  const [otpVerified, setOtpVerified] = useState(false); // shows reset fields
  const [otp, setOtp] = useState("");
  const [resetData, setResetData] = useState({ newPassword: "", confirmPassword: "" });
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // UI
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState("");

  // resend cooldown
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef(null);

  const startResendTimer = useCallback(() => {
    setResendTimer(RESEND_SECONDS);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((t) => { if (t <= 1) { clearInterval(timerRef.current); return 0; } return t - 1; });
    }, 1000);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  if (isAdminLoggedIn) return <Navigate to="/admin" replace />;

  const clear = () => { setError(""); setSuccess(""); };

  const goToForgot = () => {
    clear();
    setFpUsername(""); setOtp(""); setOtpSent(false); setOtpVerified(false);
    setMaskedEmail(FALLBACK_MASKED_EMAIL);
    setResetData({ newPassword: "", confirmPassword: "" });
    clearInterval(timerRef.current); setResendTimer(0);
    setView("forgot");
  };

  const goToLogin = () => { clear(); setView("login"); };

  // stage for progress bar
  const stage = !otpSent ? 0 : !otpVerified ? 1 : 2;

  // ── LOGIN ────────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault(); clear(); setIsSubmitting(true);
    if (await adminLogin(loginData.username.trim(), loginData.password)) {
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
      return;
    }
    setIsSubmitting(false);
    setError("Invalid admin username or password.");
  };

  // ── SEND OTP ─────────────────────────────────────────────────────────────────
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!fpUsername.trim()) { setError("Please enter your admin username."); return; }
    clear(); setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fpUsername.trim() }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || "Failed to send OTP. Please try again.");
      }
      const data = await res.json().catch(() => ({}));
      const destination = data.masked_email || FALLBACK_MASKED_EMAIL;
      setMaskedEmail(destination);
      setOtpSent(true);
      startResendTimer();
      setSuccess(`OTP sent to ${destination}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── RESEND OTP ───────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (resendTimer > 0 || isSubmitting) return;
    clear(); setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fpUsername.trim() }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || "Failed to resend OTP.");
      }
      const data = await res.json().catch(() => ({}));
      const destination = data.masked_email || maskedEmail;
      setMaskedEmail(destination);
      setOtp(""); startResendTimer();
      setSuccess(`New OTP sent to ${destination}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── VERIFY OTP ───────────────────────────────────────────────────────────────
  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.replace(/\D/g, "").length < 6) { setError("Please enter the complete 6-digit OTP."); return; }
    clear(); setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fpUsername.trim(), code: otp.trim() }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || "Invalid or expired OTP.");
      }
      clearInterval(timerRef.current);
      setOtpVerified(true);
      setSuccess("OTP verified! Set your new password below.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── RESET PASSWORD ───────────────────────────────────────────────────────────
  const handleReset = async (e) => {
    e.preventDefault();
    if (!resetData.newPassword)                              { setError("Please enter a new password."); return; }
    if (resetData.newPassword.length < 6)                   { setError("Password must be at least 6 characters."); return; }
    if (resetData.newPassword !== resetData.confirmPassword) { setError("Passwords do not match."); return; }
    clear(); setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fpUsername.trim(), code: otp.trim(), new_password: resetData.newPassword }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || "Failed to reset password. Please try again.");
      }
      setLoginSuccess("Password reset successfully. You can now log in.");
      setView("login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const meta = META[view] || META.login;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-xl">

        {/* ── Header ── */}
        <div className="relative mb-8">
          <button
            type="button"
            onClick={() => { if (view === "login") { navigate(-1); return; } if (otpVerified) { setOtpVerified(false); setResetData({ newPassword: "", confirmPassword: "" }); clear(); return; } if (otpSent) { setOtpSent(false); setOtp(""); clearInterval(timerRef.current); setResendTimer(0); clear(); return; } goToLogin(); }}
            className="fixed left-4 top-4 z-20 inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:left-6 md:top-6"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <div className="text-center">
            <p className="text-sm font-medium text-primary mb-3">{meta.badge}</p>
            <h1 className="font-display text-3xl font-bold">{meta.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{meta.subtitle}</p>
          </div>
        </div>

        {/* ── Step bar (forgot view only) ── */}
        {view === "forgot" && <StepBar stage={stage} />}

        {/* ══════════════ LOGIN ══════════════ */}
        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            {loginSuccess && (
              <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                {loginSuccess}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  value={loginData.username}
                  onChange={(e) => { setLoginData((p) => ({ ...p, username: e.target.value })); setLoginSuccess(""); clear(); }}
                  placeholder="Enter admin username"
                  className="pl-10"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) => { setLoginData((p) => ({ ...p, password: e.target.value })); setLoginSuccess(""); clear(); }}
                  placeholder="Enter password"
                  className="pl-10 pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="text-right mt-1.5">
                <button type="button" onClick={goToForgot} className="text-xs text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Opening..." : "Open Dashboard"}
            </Button>
          </form>
        )}

        {/* ══════════════ FORGOT (progressive) ══════════════ */}
        {view === "forgot" && (
          <div className="space-y-5">

            {/* ── Username + Send OTP ── */}
            <form onSubmit={otpSent ? (e) => e.preventDefault() : handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Admin Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    value={fpUsername}
                    onChange={(e) => { if (!otpSent) { setFpUsername(e.target.value); clear(); } }}
                    placeholder="Enter Your Admin Username"
                    className={`pl-10 ${otpSent ? "opacity-60 cursor-not-allowed" : ""}`}
                    autoComplete="username"
                    autoFocus={!otpSent}
                    readOnly={otpSent}
                  />
                </div>
                {/* Default email hint */}
                <p className="text-xs text-muted-foreground mt-1.5">
                  OTP will be sent to <span className="font-medium text-foreground">{maskedEmail}</span>
                </p>
              </div>

              {!otpSent && (
                <>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending OTP..." : "Send 6-Digit Code"}
                  </Button>
                </>
              )}
            </form>

            {/* ── OTP input (appears after send) ── */}
            {otpSent && !otpVerified && (
              <form onSubmit={handleVerify} className="space-y-4 border-t border-border pt-5">
                {success && (
                  <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    {success}
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium mb-3">
                    <ShieldCheck className="inline mr-1.5 text-primary" size={15} />
                    Enter 6-Digit OTP
                  </label>
                  <OtpInput value={otp} onChange={(v) => { setOtp(v); clear(); }} />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="w-full" disabled={isSubmitting || otp.replace(/\D/g, "").length < 6}>
                  {isSubmitting ? "Verifying..." : "Verify OTP"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Didn&apos;t receive the code?{" "}
                  {resendTimer > 0 ? (
                    <span>Resend in {resendTimer}s</span>
                  ) : (
                    <button type="button" onClick={handleResend} disabled={isSubmitting}
                      className="text-primary hover:underline disabled:opacity-50">
                      Resend OTP
                    </button>
                  )}
                </p>
              </form>
            )}

            {/* ── Reset password fields (appears after OTP verified) ── */}
            {otpVerified && (
              <form onSubmit={handleReset} className="space-y-4 border-t border-border pt-5">
                {success && (
                  <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    {success}
                  </p>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      type={showNew ? "text" : "password"}
                      value={resetData.newPassword}
                      onChange={(e) => { setResetData((p) => ({ ...p, newPassword: e.target.value })); clear(); }}
                      placeholder="Enter new password"
                      className="pl-10 pr-12"
                      autoComplete="new-password"
                      autoFocus
                    />
                    <button
                      type="button"
                      aria-label={showNew ? "Hide new password" : "Show new password"}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setShowNew((p) => !p)}
                      className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      type={showConfirm ? "text" : "password"}
                      value={resetData.confirmPassword}
                      onChange={(e) => { setResetData((p) => ({ ...p, confirmPassword: e.target.value })); clear(); }}
                      placeholder="Confirm new password"
                      className="pl-10 pr-12"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setShowConfirm((p) => !p)}
                      className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {resetData.confirmPassword.length > 0 && (
                    <p className={`text-xs mt-1.5 ${resetData.newPassword === resetData.confirmPassword ? "text-emerald-600" : "text-destructive"}`}>
                      {resetData.newPassword === resetData.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                    </p>
                  )}
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
