import { useState, useEffect } from "react";
import {
  X,
  User,
  Calendar,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  MapPin,
  Calendar as CalendarIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";

// Mapping of popular Indian cities to their states for auto-population
const cityToStateMap: Record<string, string> = {
  mumbai: "Maharashtra",
  pune: "Maharashtra",
  nagpur: "Maharashtra",
  thane: "Maharashtra",
  nashik: "Maharashtra",
  "navi mumbai": "Maharashtra",
  aurangabad: "Maharashtra",
  kolhapur: "Maharashtra",
  solapur: "Maharashtra",
  jalgaon: "Maharashtra",
  amravati: "Maharashtra",
  nanded: "Maharashtra",

  adipur: "Gujarat",
  gandhidham: "Gujarat",
  ahmedabad: "Gujarat",
  surat: "Gujarat",
  vadodara: "Gujarat",
  rajkot: "Gujarat",
  jamnagar: "Gujarat",
  bhavnagar: "Gujarat",
  bhuj: "Gujarat",
  anand: "Gujarat",
  navsari: "Gujarat",
  morbi: "Gujarat",
  mehsana: "Gujarat",
  junagadh: "Gujarat",
  gandhinagar: "Gujarat",
  vapi: "Gujarat",
  porbandar: "Gujarat",

  delhi: "Delhi",
  "new delhi": "Delhi",
  noida: "Uttar Pradesh",
  ghaziabad: "Uttar Pradesh",
  gurugram: "Haryana",
  gurgaon: "Haryana",
  faridabad: "Haryana",

  bengaluru: "Karnataka",
  bangalore: "Karnataka",
  mysore: "Karnataka",
  mangalore: "Karnataka",
  hubli: "Karnataka",
  belgaum: "Karnataka",

  chennai: "Tamil Nadu",
  coimbatore: "Tamil Nadu",
  madurai: "Tamil Nadu",
  trichy: "Tamil Nadu",
  salem: "Tamil Nadu",
  tirunelveli: "Tamil Nadu",

  hyderabad: "Telangana",
  warangal: "Telangana",

  kolkata: "West Bengal",
  howrah: "West Bengal",
  darjeeling: "West Bengal",
  siliguri: "West Bengal",

  jaipur: "Rajasthan",
  jodhpur: "Rajasthan",
  udaipur: "Rajasthan",
  kota: "Rajasthan",
  ajmer: "Rajasthan",
  bikaner: "Rajasthan",
  alwar: "Rajasthan",

  lucknow: "Uttar Pradesh",
  kanpur: "Uttar Pradesh",
  agra: "Uttar Pradesh",
  varanasi: "Uttar Pradesh",
  meerut: "Uttar Pradesh",
  prayagraj: "Uttar Pradesh",
  allahabad: "Uttar Pradesh",
  bareilly: "Uttar Pradesh",
  aligarh: "Uttar Pradesh",
  gorakhpur: "Uttar Pradesh",

  patna: "Bihar",
  gaya: "Bihar",
  bhagalpur: "Bihar",
  muzaffarpur: "Bihar",

  bhopal: "Madhya Pradesh",
  indore: "Madhya Pradesh",
  gwalior: "Madhya Pradesh",
  jabalpur: "Madhya Pradesh",
  ujjain: "Madhya Pradesh",

  chandigarh: "Chandigarh",

  amritsar: "Punjab",
  ludhiana: "Punjab",
  jalandhar: "Punjab",
  patiala: "Punjab",

  kochi: "Kerala",
  trivandrum: "Kerala",
  kozhikode: "Kerala",
  thrissur: "Kerala",
  kollam: "Kerala",

  panaji: "Goa",
  margao: "Goa",

  dehradun: "Uttarakhand",
  haridwar: "Uttarakhand",

  shimla: "Himachal Pradesh",

  ranchi: "Jharkhand",
  jamshedpur: "Jharkhand",
  dhanbad: "Jharkhand",

  raipur: "Chhattisgarh",
  bilaspur: "Chhattisgarh",

  bhubaneswar: "Odisha",
  cuttack: "Odisha",
  rourkela: "Odisha",

  guwahati: "Assam",
};

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"authenticate" | "profile">("authenticate");

  // Flow steps:
  // 1: OAuth Authentication Choice / Email Form
  // 2: Complete Profile Form
  // 3: Success Screen
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auth Mode: signin vs signup
  const [authSubMode, setAuthSubMode] = useState<"signin" | "signup">("signin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form values for step 2 (Profile Form)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");

  useEffect(() => {
    // Listen to custom "open-auth" and "edit-profile" events triggered by buttons
    const handleOpen = async (e: Event) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const forceEdit = e.type === "edit-profile";
      const customEvent = e as CustomEvent;
      const eventMode = customEvent.detail?.mode; // "login" | "register"

      if (session?.user) {
        if (forceEdit) {
          let dbProfile: {
            name?: string;
            email?: string;
            date_of_birth?: string;
            gender?: string;
            profession?: string;
            city?: string;
            state?: string;
          } | null = null;
          try {
            const { data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
            dbProfile = data;
          } catch (e) {
            console.error("Failed to fetch profiles:", e);
          }

          const userMeta = session.user.user_metadata || {};
          setName(dbProfile?.name || userMeta.name || userMeta.full_name || "");
          setEmail(dbProfile?.email || session.user.email || "");
          setDob(dbProfile?.date_of_birth || userMeta.date_of_birth || "");
          setGender(dbProfile?.gender || userMeta.gender || "");
          setProfession(dbProfile?.profession || userMeta.profession || "");
          setCity(dbProfile?.city || userMeta.city || "");
          setStateVal(dbProfile?.state || userMeta.state || "");

          setMode("profile");
          setStep(2);
          setIsOpen(true);
        }
      } else {
        setMode("authenticate");
        setStep(1);
        setError(null);
        setName("");
        setEmail("");
        setPassword("");
        setDob("");
        setGender("");
        setProfession("");
        setCity("");
        setStateVal("");

        if (eventMode === "login") {
          setAuthSubMode("signin");
        } else if (eventMode === "register") {
          setAuthSubMode("signup");
        } else {
          setAuthSubMode("signin"); // default fallback
        }

        setIsOpen(true);
      }
    };

    window.addEventListener("open-auth", handleOpen);
    window.addEventListener("edit-profile", handleOpen);

    return () => {
      window.removeEventListener("open-auth", handleOpen);
      window.removeEventListener("edit-profile", handleOpen);
    };
  }, []);

  useEffect(() => {
    const checkSessionAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const userMeta = session.user.user_metadata || {};
        const hasMetadata =
          userMeta.gender &&
          (userMeta.date_of_birth || userMeta.dob) &&
          userMeta.city &&
          userMeta.state;

        if (hasMetadata) {
          return;
        }

        try {
          const { data: dbProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          const hasDbProfile =
            dbProfile &&
            dbProfile.gender &&
            (dbProfile.date_of_birth || dbProfile.dob || dbProfile.date_of_birth === "") &&
            dbProfile.city &&
            dbProfile.state;

          if (hasDbProfile) {
            return;
          }
        } catch (dbErr) {
          console.log("No profile row found or check failed:", dbErr);
        }

        // Profile is incomplete. Trigger Step 2 onboarding modal.
        setName(userMeta.name || userMeta.full_name || "");
        setEmail(session.user.email || "");
        setMode("profile");
        setStep(2);
        setIsOpen(true);
      }
    };

    checkSessionAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const userMeta = session.user.user_metadata || {};
        const hasMetadata =
          userMeta.gender &&
          (userMeta.date_of_birth || userMeta.dob) &&
          userMeta.city &&
          userMeta.state;

        if (hasMetadata) return;

        try {
          const { data: dbProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (dbProfile?.gender && dbProfile?.city && dbProfile?.state) {
            return;
          }
        } catch (e) {
          console.error("Failed to query profile on sign in:", e);
        }

        setName(userMeta.name || userMeta.full_name || "");
        setEmail(session.user.email || "");
        setMode("profile");
        setStep(2);
        setIsOpen(true);
      }
    });

    return () => {
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

  // Email/Password sign in or register handler
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (authSubMode === "signup") {
      // In register mode, transition to Step 2 (profile details) first
      setError(null);
      setStep(2);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;
      toast.success("Signed in successfully!");
      setIsOpen(false);
      window.location.href = "/";
    } catch (err: unknown) {
      console.error("Email Auth Error:", err);
      const errMessage = err instanceof Error ? err.message : String(err);
      setError(errMessage || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Profile Save handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !dob || !gender || !profession || !city || !stateVal) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    // City and State mismatch validation
    const normalizedCity = city.trim().toLowerCase();
    const expectedState = cityToStateMap[normalizedCity];
    if (expectedState && stateVal.trim().toLowerCase() !== expectedState.toLowerCase()) {
      setError(`The city "${city}" is located in ${expectedState}. Please correct the state.`);
      setLoading(false);
      return;
    }

    // Age validation check (must be at least 18 years old)
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        setError("You must be at least 18 years old to register.");
        setLoading(false);
        return;
      }
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        // Registration Sign Up flow
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              gender,
              date_of_birth: dob,
              profession,
              city,
              state: stateVal,
            },
          },
        });

        if (authError) throw authError;

        if (data.session) {
          toast.success("Registered and profile completed successfully!");
          setStep(3); // Success
        } else {
          toast.success(
            "Registration successful! Please check your email for a verification link.",
          );
          setStep(3); // Success (Show success screen anyway instead of closing modal)
        }
        return;
      }

      // Existing User (Signed In/OAuth/Edit flow)
      // 1. Save to Supabase User Metadata (always works)
      const { error: metaError } = await supabase.auth.updateUser({
        data: {
          name,
          date_of_birth: dob,
          gender,
          profession,
          city,
          state: stateVal,
        },
      });
      if (metaError) throw metaError;

      // 2. Try saving to profiles table.
      try {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            name,
            date_of_birth: dob,
            gender,
            profession,
            city,
            state: stateVal,
            updated_at: new Date().toISOString(),
          })
          .eq("id", session.user.id);

        if (profileError) {
          // If columns profession/city/state do not exist (error 42703), fall back to only saving name/dob/gender
          if (profileError.code === "42703") {
            const { error: fallbackError } = await supabase
              .from("profiles")
              .update({
                name,
                date_of_birth: dob,
                gender,
                updated_at: new Date().toISOString(),
              })
              .eq("id", session.user.id);

            if (fallbackError) throw fallbackError;
          } else {
            throw profileError;
          }
        }
      } catch (dbErr) {
        console.warn("DB profiles update failed, falling back to auth metadata:", dbErr);
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
    window.location.href = "/";
  };

  const handleCityChange = (val: string) => {
    setCity(val);
    const normalizedCity = val.trim().toLowerCase();
    if (cityToStateMap[normalizedCity]) {
      setStateVal(cityToStateMap[normalizedCity]);
    }
  };

  const parsedDob = dob ? new Date(dob) : undefined;

  const handleSelectDob = (date: Date | undefined) => {
    if (date) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      setDob(`${yyyy}-${mm}-${dd}`);
    } else {
      setDob("");
    }
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
            {step === 1
              ? authSubMode === "signin"
                ? "Sign In"
                : "Register"
              : step === 2
                ? "Complete Profile"
                : "Success"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-start gap-2.5 rounded-2xl border border-red-500/20 bg-red-950/20 p-4 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <div className="flex-1">
              <p className="font-semibold">Notice</p>
              <p className="mt-0.5 leading-relaxed text-red-200/80">{error}</p>
            </div>
          </div>
        )}

        {/* Step Forms */}

        {/* Step 1: Sign in choice */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Tab Selector */}
            <div className="flex rounded-xl bg-black/40 p-1 border border-white/5">
              <button
                type="button"
                onClick={() => setAuthSubMode("signin")}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                  authSubMode === "signin"
                    ? "bg-[#D4AF37] text-[#1B1B1B] shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthSubMode("signup")}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                  authSubMode === "signup"
                    ? "bg-[#D4AF37] text-[#1B1B1B] shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Register
              </button>
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-display text-lg font-semibold">
                {authSubMode === "signin" ? "Welcome Back" : "Create Account"}
              </h3>
              <p className="text-xs text-white/50">
                {authSubMode === "signin"
                  ? "Sign in to manage your digital gold assets."
                  : "Start your digital gold investment journey today."}
              </p>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              <div className="space-y-1.5">
                <label
                  htmlFor="auth-email"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="name@example.com"
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
                  htmlFor="auth-password"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-11 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold btn-gold-hover w-full rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : authSubMode === "signin" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative px-3 bg-[#1e150b] text-[10px] uppercase tracking-wider text-white/40">
                or continue with
              </span>
            </div>

            <button
              type="button"
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
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <User className="h-4 w-4" />
                </span>
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

            <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-1.5">
                <label
                  htmlFor="dob"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                >
                  Date of Birth
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      disabled={loading}
                      className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-4 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors text-left flex items-center justify-between cursor-pointer relative"
                    >
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
                        <CalendarIcon className="h-4 w-4" />
                      </span>
                      <span>{dob ? dob : "Select Date"}</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#1e150b] border border-[#D4AF37]/30 text-white z-[200]">
                    <CalendarUI
                      mode="single"
                      selected={parsedDob}
                      onSelect={handleSelectDob}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                      captionLayout="dropdown"
                      className="bg-[#1e150b] text-white border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="profession"
                className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
              >
                Profession
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                  <Briefcase className="h-4 w-4" />
                </span>
                <input
                  id="profession"
                  type="text"
                  placeholder="e.g. Software Engineer, Business Owner"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="city"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                >
                  City
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <input
                    id="city"
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="state"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-white/60"
                >
                  State
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <input
                    id="state"
                    type="text"
                    placeholder="e.g. Maharashtra"
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-[#D4AF37]/25 bg-black/40 py-3 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    required
                  />
                </div>
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
