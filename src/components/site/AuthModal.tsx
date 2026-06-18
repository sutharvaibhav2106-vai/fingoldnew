import { useState, useEffect } from "react";
import {
  X,
  Mail,
  User,
  Calendar,
  Lock,
  Phone,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("register");

  // Flow steps:
  // 1: Form (Login/Register)
  // 2: Email OTP Verification (if signup requires verification)
  // 3: Success
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: "login" | "register" }>;
      setMode(customEvent.detail?.mode || "register");
      setStep(1);
      setError(null);
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setDob("");
      setGender("");
      setEmailOtp("");
      setIsOpen(true);
    };

    window.addEventListener("open-auth", handleOpen);

    // Listen for auth state changes (e.g. user clicked confirmation link in email)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const pending = localStorage.getItem("pending_profile");
        if (pending) {
          try {
            const profileData = JSON.parse(pending);
            const { error: profileError } = await supabase
              .from("profiles")
              .update({
                name: profileData.name,
                date_of_birth: profileData.dob,
                gender: profileData.gender,
                phone: profileData.phone,
                updated_at: new Date().toISOString(),
              })
              .eq("id", session.user.id);

            if (profileError) {
              console.error("Error updating profile from pending storage:", profileError);
            } else {
              toast.success(`Welcome to Fingold, ${profileData.name}! Account verified.`);
            }
          } catch (e) {
            console.error("Error parsing pending profile:", e);
          } finally {
            localStorage.removeItem("pending_profile");
            // Reload page after a short delay to reflect logged-in state in UI
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        }
      }
    });

    return () => {
      window.removeEventListener("open-auth", handleOpen);
      subscription.unsubscribe();
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Register Handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !phoneNumber || !dob || !gender) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user in Supabase auth
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            name,
            phone: `+91${phoneNumber}`,
            date_of_birth: dob,
            gender,
          },
        },
      });

      if (signupError) {
        throw signupError;
      }

      const user = data.user;
      if (!user) {
        throw new Error("Sign up completed but no user returned.");
      }

      // Store pending profile details in localStorage in case they use email link confirmation
      localStorage.setItem(
        "pending_profile",
        JSON.stringify({
          name,
          dob,
          gender,
          phone: `+91${phoneNumber}`,
        }),
      );

      // Check if session exists immediately (email confirmation disabled in Supabase)
      if (data.session) {
        // Update user profile immediately in database
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            name,
            date_of_birth: dob,
            gender,
            phone: `+91${phoneNumber}`,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (profileError) {
          console.error("Profile update error:", profileError);
        }

        localStorage.removeItem("pending_profile");
        toast.success("Registration successful!");
        setStep(3); // Success
      } else {
        // Session is null -> Email verification is required
        toast.success("Account created! Please verify your email.");
        setStep(2); // Go to email OTP verification
      }
    } catch (err: unknown) {
      console.error("Registration Error:", err);
      const errMessage = err instanceof Error ? err.message : String(err);
      // Fallback for simulation on localhost
      if (window.location.hostname === "localhost") {
        toast.info(
          "SMTP provider not configured. Entering Developer Simulation Mode (Use code 123456 to verify).",
        );
        setStep(2);
      } else {
        setError(errMessage || "Failed to sign up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Verify Email OTP Handler
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOtp.length !== 6) {
      setError("Please enter a 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // If we are in simulation mode
      if (window.location.hostname === "localhost" && emailOtp === "123456") {
        toast.success("[Simulated] Registration completed successfully!");
        setStep(3); // Success
        setLoading(false);
        return;
      }

      // Call verifyOtp
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: email,
        token: emailOtp,
        type: "signup",
      });

      if (verifyError) {
        throw verifyError;
      }

      const user = data.user;
      if (!user) {
        throw new Error("Verification succeeded but user is not logged in.");
      }

      // Update the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name,
          date_of_birth: dob,
          gender,
          phone: `+91${phoneNumber}`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
      }

      toast.success("Email verified successfully!");
      setStep(3); // Success
    } catch (err: unknown) {
      console.error("Email Verification Error:", err);
      const errMessage = err instanceof Error ? err.message : String(err);
      if (window.location.hostname === "localhost" && emailOtp === "123456") {
        toast.success("[Simulated] Email verified successfully!");
        setStep(3);
      } else {
        setError(errMessage || "Invalid verification code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        throw loginError;
      }

      toast.success("Welcome back!");
      setStep(3); // Success
    } catch (err: unknown) {
      console.error("Login Error:", err);
      const errMessage = err instanceof Error ? err.message : String(err);
      // Fallback for simulation on localhost
      if (window.location.hostname === "localhost" && password === "123456") {
        toast.success("[Simulated] Welcome back!");
        setStep(3);
      } else {
        setError(errMessage || "Failed to log in. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = () => {
    setIsOpen(false);
    window.location.reload(); // Refresh to update Nav states, header, etc.
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#1A1A1A]/75 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="glass-dark relative z-10 w-full max-w-lg overflow-hidden p-8 animate-reveal text-white">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <span
            className="grid h-10 w-10 place-items-center rounded-full mb-3"
            style={{ background: "var(--gradient-gold)" }}
          >
            <span className="font-display text-base font-bold text-[#1B1B1B]">F</span>
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            FIN<span className="text-gold-gradient">GOLD</span>
          </span>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">
            {mode === "register"
              ? step === 2
                ? "Verify Email"
                : "Create Account"
              : "Access Portfolio"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-950/20 p-4 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <div className="flex-1">
              <p className="font-semibold">Notice</p>
              <p className="mt-0.5 leading-relaxed text-red-200/80">{error}</p>
              {window.location.hostname === "localhost" && step === 2 && (
                <p className="mt-1.5 font-semibold text-amber-300">
                  Tip: Use "123456" as OTP to simulate verification on localhost.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step Forms */}

        {/* Step 1: Forms (Register/Login) */}
        {step === 1 && (
          <>
            {mode === "register" ? (
              /* Unified Registration Form */
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                  >
                    Full Name (as in PAN/Aadhaar)
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={loading}
                      className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        id="email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="password"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                  >
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-white/40">
                      +91
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter 10-digit number"
                      maxLength={10}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                      disabled={loading}
                      className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-13 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="dob"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                    >
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="gender"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      disabled={loading}
                      className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 px-4 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                      required
                    >
                      <option value="" disabled className="bg-[#1A1A1A]">
                        Select
                      </option>
                      <option value="male" className="bg-[#1A1A1A]">
                        Male
                      </option>
                      <option value="female" className="bg-[#1A1A1A]">
                        Female
                      </option>
                      <option value="other" className="bg-[#1A1A1A]">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold btn-gold-hover w-full rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Register & Verify Email <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="pt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-xs text-[#D4AF37] hover:text-[#F4D03F] transition-colors font-medium underline decoration-[#D4AF37]/30"
                  >
                    Existing user? Log in here
                  </button>
                </div>
              </form>
            ) : (
              /* Email / Password Login Form */
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-white/70"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="w-full rounded-2xl border border-[#D4AF37]/25 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-white/70"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="w-full rounded-2xl border border-[#D4AF37]/25 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold btn-gold-hover w-full rounded-2xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Log In to Portfolio <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="pt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-xs text-[#D4AF37] hover:text-[#F4D03F] transition-colors font-medium underline decoration-[#D4AF37]/30"
                  >
                    New investor? Register here
                  </button>
                </div>
              </form>
            )}
          </>
        )}

        {/* Step 2: Email Verification Link & Code Entry */}
        {step === 2 && (
          <form onSubmit={handleVerifyEmail} className="space-y-5">
            <div className="space-y-4">
              {/* Verification link info */}
              <div className="rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 text-xs text-amber-200 space-y-1.5">
                <p className="font-semibold text-[#D4AF37]">Verification Link Sent</p>
                <p className="leading-relaxed text-white/80">
                  We have sent a verification link to{" "}
                  <strong className="text-white">{email}</strong>. Please check your inbox (and spam
                  folder) and click the link to confirm your account.
                </p>
                <p className="text-[11px] text-[#D4AF37]/80 italic">
                  Once clicked, this screen will update and log you in automatically.
                </p>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-[10px] text-white/40 uppercase font-semibold">
                  Or enter code
                </span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="emailOtp"
                    className="block text-xs font-semibold uppercase tracking-wider text-white/70"
                  >
                    6-Digit Verification Code
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                  >
                    Back to Form
                  </button>
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    id="emailOtp"
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))}
                    disabled={loading}
                    className="w-full rounded-2xl border border-[#D4AF37]/25 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold btn-gold-hover w-full rounded-2xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Verify Code & Complete Registration"
              )}
            </button>
          </form>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-[#D4AF37] animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-white">Success!</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {mode === "register"
                  ? "Your Fingold investment account has been set up successfully. Welcome to the future of gold investing."
                  : "You have successfully logged in to your Fingold portfolio dashboard."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleFinish}
              className="btn-gold btn-gold-hover w-full rounded-2xl py-3.5 text-sm font-bold cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
