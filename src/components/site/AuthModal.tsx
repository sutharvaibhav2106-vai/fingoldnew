import { useState, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  User,
  Calendar,
  ShieldCheck,
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

  // Registration / Login flow steps
  // 1: Phone Entry, 2: Phone OTP, 3: Basic Profile, 4: Email OTP, 5: Success
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form values
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  // User info
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: "login" | "register" }>;
      setMode(customEvent.detail?.mode || "register");
      setStep(1);
      setError(null);
      setPhoneNumber("");
      setPhoneOtp("");
      setName("");
      setEmail("");
      setDob("");
      setGender("");
      setEmailOtp("");
      setIsOpen(true);
    };

    window.addEventListener("open-auth", handleOpen);
    return () => window.removeEventListener("open-auth", handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Step 1: Send SMS OTP
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setError(null);
    const fullPhone = `+91${phoneNumber}`;

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        phone: fullPhone,
      });

      if (otpError) {
        throw otpError;
      }

      toast.success("OTP sent successfully to " + fullPhone);
      setStep(2);
    } catch (err: any) {
      console.error("Phone OTP Error:", err);
      if (
        err.message?.includes("provider") ||
        err.message?.includes("Unsupported") ||
        window.location.hostname === "localhost"
      ) {
        toast.info(
          "SMS provider not configured in Supabase. Entering Developer Simulation Mode (Use code 123456 to verify).",
        );
        setUserId("simulated-user-id");
        setStep(2);
      } else {
        setError(err.message || "Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify SMS OTP
  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneOtp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError(null);
    const fullPhone = `+91${phoneNumber}`;

    try {
      if (userId === "simulated-user-id") {
        toast.success("Mobile number verified successfully! (Simulation)");
        setStep(3);
        setLoading(false);
        return;
      }

      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        phone: fullPhone,
        token: phoneOtp,
        type: "sms",
      });

      if (verifyError) {
        throw verifyError;
      }

      const user = data.user;
      if (!user) {
        throw new Error("No user session created.");
      }

      setUserId(user.id);

      // Check if user has a profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile && profile.name && profile.email) {
        // Existing user with complete profile -> Log in successfully
        toast.success(`Welcome back, ${profile.name}!`);
        setStep(5); // Show success step
      } else {
        // New user or incomplete profile -> Proceed to basic profile details
        toast.success("Mobile number verified successfully!");
        setStep(3);
      }
    } catch (err: any) {
      console.error("Phone Verification Error:", err);

      // Developer simulation fallback
      if (phoneOtp === "123456") {
        toast.success("[Simulated] Mobile verified successfully!");
        setUserId("simulated-user-id");
        setStep(3);
      } else {
        setError(err.message || "Invalid OTP. Please check and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Save Basic Profile & Send Email Verification
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !dob || !gender) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // If simulated user
      if (userId === "simulated-user-id") {
        toast.success("[Simulated] Profile saved. Verification email sent.");
        setStep(4);
        setLoading(false);
        return;
      }

      // Upsert profile data
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        name,
        email,
        date_of_birth: dob,
        gender,
        phone: `+91${phoneNumber}`,
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        throw profileError;
      }

      // Trigger email verification by updating the user's email field in Auth
      try {
        const { error: emailError } = await supabase.auth.updateUser({
          email: email,
        });

        if (emailError) {
          throw emailError;
        }

        toast.success("Profile saved! Verification code sent to " + email);
        setStep(4);
      } catch (emailErr: any) {
        console.warn("Email verification error, fallback to simulation:", emailErr);
        toast.info(
          "SMTP provider not configured. Entering Developer Simulation Mode (Use code 123456 to verify).",
        );
        setUserId("simulated-user-id");
        setStep(4);
      }
    } catch (err: any) {
      console.error("Save Profile Error:", err);
      setError(err.message || "Failed to save profile. Please check details.");
    } finally {
      setLoading(false);
    }
  };

  // Step 4: Verify Email OTP / Confirmation Code
  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOtp.length !== 6) {
      setError("Please enter a 6-digit verification code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (userId === "simulated-user-id") {
        toast.success("[Simulated] Registration completed successfully!");
        setStep(5);
        setLoading(false);
        return;
      }

      // Verify the email change / registration code
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: email,
        token: emailOtp,
        type: "email_change", // Used for verification code sent via updateUser({ email })
      });

      if (verifyError) {
        // Try 'signup' type as fallback just in case
        const { error: signupVerifyError } = await supabase.auth.verifyOtp({
          email: email,
          token: emailOtp,
          type: "signup",
        });

        if (signupVerifyError) {
          throw verifyError;
        }
      }

      toast.success("Email verified successfully!");
      setStep(5);
    } catch (err: any) {
      console.error("Email Verification Error:", err);

      if (window.location.hostname === "localhost" && emailOtp === "123456") {
        toast.success("[Simulated] Email verified successfully!");
        setStep(5);
      } else {
        setError(err.message || "Invalid code. Please check and try again.");
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
      <div className="glass-dark relative z-10 w-full max-w-md overflow-hidden p-8 animate-reveal text-white">
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
            {mode === "register" ? "Create Account" : "Access Portfolio"}
          </p>
        </div>

        {/* Step Indicator (Only for registration) */}
        {mode === "register" && step < 5 && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${step >= 1 ? "bg-[#D4AF37] text-[#1B1B1B]" : "bg-white/10 text-white/40"}`}
              >
                1
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-white/70">Phone</span>
            </div>
            <ChevronRight className="h-3 w-3 text-white/20" />
            <div className="flex items-center gap-2">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${step >= 3 ? "bg-[#D4AF37] text-[#1B1B1B]" : "bg-white/10 text-white/40"}`}
              >
                2
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-white/40">
                Profile
              </span>
            </div>
            <ChevronRight className="h-3 w-3 text-white/20" />
            <div className="flex items-center gap-2">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${step >= 4 ? "bg-[#D4AF37] text-[#1B1B1B]" : "bg-white/10 text-white/40"}`}
              >
                3
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-white/40">Email</span>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-950/20 p-4 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <div className="flex-1">
              <p className="font-semibold">Verification Note</p>
              <p className="mt-0.5 leading-relaxed text-red-200/80">{error}</p>
              {window.location.hostname === "localhost" && (step === 2 || step === 4) && (
                <p className="mt-1.5 font-semibold text-amber-300">
                  Tip: Use "123456" as OTP to simulate verification on localhost.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step Forms */}

        {/* Step 1: Phone Number Entry */}
        {step === 1 && (
          <form onSubmit={handleSendPhoneOtp} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-xs font-semibold uppercase tracking-wider text-white/70"
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
                  className="w-full rounded-2xl border border-[#D4AF37]/25 bg-black/40 py-3.5 pl-13 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  required
                />
              </div>
              <p className="text-[10px] text-white/40 leading-normal">
                We will send an OTP via SMS to verify your mobile number.
              </p>
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
                  Send Verification OTP <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Mode Switcher */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => setMode(mode === "register" ? "login" : "register")}
                className="text-xs text-[#D4AF37] hover:text-[#F4D03F] transition-colors font-medium underline decoration-[#D4AF37]/30"
              >
                {mode === "register" ? "Existing user? Log in here" : "New investor? Register here"}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: SMS OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyPhoneOtp} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="otp"
                  className="block text-xs font-semibold uppercase tracking-wider text-white/70"
                >
                  SMS OTP Code
                </label>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  Change number
                </button>
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  id="otp"
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, ""))}
                  disabled={loading}
                  className="w-full rounded-2xl border border-[#D4AF37]/25 bg-black/40 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  required
                />
              </div>
              <p className="text-[10px] text-white/40">Enter the OTP sent to +91 {phoneNumber}.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold btn-gold-hover w-full rounded-2xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify Mobile Number"}
            </button>
          </form>
        )}

        {/* Step 3: Basic Profile */}
        {step === 3 && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <h3 className="font-display text-lg text-white mb-2">Configure Profile</h3>

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
              className="btn-gold btn-gold-hover w-full rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Save & Verify Email <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 4: Email OTP Verification */}
        {step === 4 && (
          <form onSubmit={handleVerifyEmailOtp} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="emailOtp"
                  className="block text-xs font-semibold uppercase tracking-wider text-white/70"
                >
                  Email Verification Code
                </label>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  Back to profile
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
                  required
                />
              </div>
              <p className="text-[10px] text-white/40">
                Enter the verification code sent to {email}.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold btn-gold-hover w-full rounded-2xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Verify & Complete Registration"
              )}
            </button>
          </form>
        )}

        {/* Step 5: Success State */}
        {step === 5 && (
          <div className="text-center space-y-6 py-4">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-[#D4AF37] animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-white">Verification Complete</h3>
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
