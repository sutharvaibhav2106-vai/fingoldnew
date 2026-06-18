import { useState, useEffect } from "react";
import {
  X,
  User,
  Calendar,
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
  const [mode, setMode] = useState<"authenticate" | "profile">("authenticate");

  // Flow steps:
  // 1: OAuth Authentication Choice (Google Sign-In)
  // 2: Complete Profile Form
  // 3: Success Screen
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState(false);

  // Form values for step 2 (Profile Form)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const checkProfileCompleteness = async (user: {
    id: string;
    email?: string;
    user_metadata?: { full_name?: string };
  }) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Error fetching profile:", profileError);
        return;
      }

      // If profile doesn't exist or is missing required fields: name, date_of_birth, gender, or phone
      if (
        !profile ||
        !profile.name ||
        !profile.date_of_birth ||
        !profile.gender ||
        !profile.phone
      ) {
        setName(profile?.name || user.user_metadata?.full_name || "");
        setEmail(profile?.email || user.email || "");
        setPhoneNumber(profile?.phone?.replace("+91", "") || "");
        setDob(profile?.date_of_birth || "");
        setGender(profile?.gender || "");

        // Transition directly to the Profile Form step
        setMode("profile");
        setStep(2);
        setIsOpen(true);
      }
    } catch (err) {
      console.error("Error checking profile completeness:", err);
    }
  };

  useEffect(() => {
    // Initial check if there's already a logged in user
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await checkProfileCompleteness(session.user);
      }
    };
    checkUser();

    // Listen to custom "open-auth" events triggered by buttons
    const handleOpen = async (e: Event) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await checkProfileCompleteness(session.user);
      } else {
        setMode("authenticate");
        setStep(1);
        setError(null);
        setIsSimulated(false);
        setName("");
        setEmail("");
        setPhoneNumber("");
        setDob("");
        setGender("");
        setIsOpen(true);
      }
    };

    window.addEventListener("open-auth", handleOpen);

    // Listen for auth state changes (e.g. user clicked Google redirect link)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await checkProfileCompleteness(session.user);
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

  // Google OAuth Sign-In handler
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (oauthError) {
        throw oauthError;
      }
    } catch (err: unknown) {
      console.error("Google OAuth Error:", err);
      const errMessage = err instanceof Error ? err.message : String(err);
      setError(errMessage || "Failed to initiate Google Sign-In.");
      setLoading(false);
    }
  };

  // Developer simulation handler (For testing onboarding flow on localhost)
  const handleSimulateGoogleSignIn = () => {
    setIsSimulated(true);
    setName("John Doe");
    setEmail("johndoe@gmail.com");
    setPhoneNumber("9876543210");
    setDob("1995-01-01");
    setGender("male");

    toast.success("Simulation session created as John Doe");
    setMode("profile");
    setStep(2);
  };

  // Profile Save handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !dob || !gender || !phoneNumber) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isSimulated) {
        toast.success("[Simulated] Profile saved successfully!");
        setStep(3); // Success
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error("No active session found. Please sign in again.");
      }

      // Update user profile details in database
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          name,
          date_of_birth: dob,
          gender,
          phone: `+91${phoneNumber}`,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id);

      if (profileError) {
        throw profileError;
      }

      toast.success("Profile saved successfully!");
      setStep(3); // Success
    } catch (err: unknown) {
      console.error("Save Profile Error:", err);
      const errMessage = err instanceof Error ? err.message : String(err);
      setError(errMessage || "Failed to save profile. Please try again.");
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
            {step === 1 ? "Sign In / Register" : step === 2 ? "Complete Profile" : "Success"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-950/20 p-4 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <div className="flex-1">
              <p className="font-semibold">Notice</p>
              <p className="mt-0.5 leading-relaxed text-red-200/80">{error}</p>
              {error.toLowerCase().includes("provider") && (
                <div className="mt-3 pt-3 border-t border-red-500/10 space-y-1 text-amber-300 font-semibold">
                  <p>How to resolve this:</p>
                  <ol className="list-decimal pl-4 font-normal text-amber-200/90 space-y-1">
                    <li>
                      Go to your <strong>Supabase Dashboard</strong>.
                    </li>
                    <li>
                      Navigate to <strong>Auth</strong> &rarr; <strong>Providers</strong> &rarr;{" "}
                      <strong>Google</strong>.
                    </li>
                    <li>Toggle Google Auth on, and configure your client details.</li>
                  </ol>
                  {window.location.hostname === "localhost" && (
                    <p className="mt-2 text-amber-300/80 text-[11px] font-normal italic">
                      💡 Tip: For local testing, click the "Developer Google Simulation" button
                      below!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step Forms */}

        {/* Step 1: Sign in choice */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-display text-xl font-semibold">Join Fingold</h3>
              <p className="text-xs text-white/60">
                Sign up or log in instantly using Google to manage your digital gold.
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.147 4.114-3.41 0-6.177-2.767-6.177-6.177s2.767-6.177 6.177-6.177c1.494 0 2.861.533 3.935 1.41l3.056-3.056C19.141 2.215 15.908 1 12.24 1 5.48 1 0 6.48 0 13.24s5.48 12.24 12.24 12.24c6.76 0 11.76-4.75 11.76-11.76 0-.61-.06-1.17-.18-1.715H12.24Z"
                />
              </svg>
              {loading ? "Redirecting..." : "Continue with Google"}
            </button>

            {/* Developer simulation (Localhost only) */}
            {window.location.hostname === "localhost" && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSimulateGoogleSignIn}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 py-3 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37]/15 transition-all cursor-pointer"
                >
                  Developer Google Simulation 🛠️
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Complete Profile */}
        {step === 2 && (
          <form onSubmit={handleSaveProfile} className="space-y-4 animate-reveal">
            <div className="text-center mb-2">
              <h3 className="font-display text-lg font-semibold">Verify & Complete Profile</h3>
              <p className="text-xs text-white/50">
                Please provide your details to activate your gold investment profile.
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
              >
                Full Name (as in PAN/Aadhaar)
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 px-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                disabled
                className="w-full rounded-xl border border-white/5 bg-white/5 py-3 px-4 text-sm text-white/50 focus:outline-none"
              />
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
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 px-4 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                  required
                />
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
                  Save & Complete Onboarding <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Step 3: Success Screen */}
        {step === 3 && (
          <div className="text-center space-y-6 py-4 animate-reveal">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-[#D4AF37] animate-bounce" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-white">Success!</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Your Fingold investment account has been set up successfully. Welcome to the future
                of gold investing.
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
