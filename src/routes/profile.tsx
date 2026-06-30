import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { triggerAuthModal } from "@/lib/utils";
import {
  User as UserIcon,
  Mail,
  Calendar,
  Briefcase,
  MapPin,
  Edit,
  LogOut,
  Loader2,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — FINGOLD" },
      {
        name: "description",
        content: "View and manage your Fingold investment profile details.",
      },
    ],
  }),
  component: ProfilePage,
});

interface ProfileData {
  name: string;
  email: string;
  gender: string;
  dob: string;
  profession: string;
  city: string;
  state: string;
}

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(session.user);

      // Fetch from profiles table
      const { data: dbProfile, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (dbError && dbError.code !== "PGRST116") {
        console.error("Error fetching db profile:", dbError);
      }

      const userMeta = session.user.user_metadata || {};

      // Merge database profile with user metadata
      setProfile({
        name: dbProfile?.name || userMeta.name || userMeta.full_name || "N/A",
        email: dbProfile?.email || session.user.email || "N/A",
        gender: dbProfile?.gender || userMeta.gender || "N/A",
        dob: dbProfile?.date_of_birth || userMeta.date_of_birth || "N/A",
        profession: dbProfile?.profession || userMeta.profession || "N/A",
        city: dbProfile?.city || userMeta.city || "N/A",
        state: dbProfile?.state || userMeta.state || "N/A",
      });
    } catch (err) {
      console.error("Error loading profile:", err);
      toast.error("Failed to load profile details.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
        navigate({ to: "/" });
      } else {
        fetchProfile();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile, navigate]);

  const handleEditProfile = () => {
    window.dispatchEvent(new CustomEvent("edit-profile"));
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Successfully logged out");
      navigate({ to: "/" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error("Logout failed: " + msg);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-noise flex items-center justify-center">
        <Nav />
        <div className="flex flex-col items-center gap-3 text-foreground/70">
          <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
          <p className="text-sm font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-noise">
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(244,208,63,0.25), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute top-[40%] -left-40 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.15), transparent 65%)" }}
      />

      <Nav />

      <main className="pt-32 pb-24 px-4 flex justify-center">
        <div className="w-full max-w-2xl">
          {user && profile ? (
            <Reveal>
              {/* Profile Card Header */}
              <div className="text-center mb-10">
                <div className="flex justify-center items-center gap-3">
                  <span className="h-px w-10 bg-foreground/30" />
                  <span className="eyebrow-tag">Account</span>
                  <span className="h-px w-10 bg-foreground/30" />
                </div>
                <h1 className="mt-6 text-display text-4xl sm:text-5xl">
                  Investor <span className="text-gold-gradient">Profile</span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm text-foreground/60">
                  Manage your secure digital gold investment credentials and personal details.
                </p>
              </div>

              {/* Profile Card */}
              <div className="glass-dark relative overflow-hidden p-8 sm:p-10 text-white rounded-[2.5rem] border border-[#D4AF37]/22 shadow-glass">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4.5">
                    <div className="h-16 w-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]">
                      <UserIcon className="h-8 w-8" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="font-display text-2xl font-bold tracking-tight">
                        {profile.name}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/5 border border-white/10 text-white/60 mt-1">
                        <Shield className="h-3 w-3 text-[#D4AF37]" /> Verified Account
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={handleEditProfile}
                      className="btn-gold btn-gold-hover flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl py-2.5 px-5 text-xs font-bold cursor-pointer"
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-950/15 py-2.5 px-5 text-xs font-semibold text-red-200 hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Log Out
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className="grid gap-6 sm:grid-cols-2 mt-8">
                  {/* Email */}
                  <div className="space-y-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      Email Address
                    </span>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Mail className="h-4.5 w-4.5 text-[#D4AF37]/75 shrink-0" />
                      <span className="text-white/80">{profile.email}</span>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      Date of Birth
                    </span>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Calendar className="h-4.5 w-4.5 text-[#D4AF37]/75 shrink-0" />
                      <span className="text-white/80">{profile.dob}</span>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      Gender
                    </span>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <UserIcon className="h-4.5 w-4.5 text-[#D4AF37]/75 shrink-0" />
                      <span className="text-white/80 capitalize">{profile.gender}</span>
                    </div>
                  </div>

                  {/* Profession */}
                  <div className="space-y-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      Profession
                    </span>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <Briefcase className="h-4.5 w-4.5 text-[#D4AF37]/75 shrink-0" />
                      <span className="text-white/80">{profile.profession}</span>
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-1 col-span-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      City
                    </span>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <MapPin className="h-4.5 w-4.5 text-[#D4AF37]/75 shrink-0" />
                      <span className="text-white/80">{profile.city}</span>
                    </div>
                  </div>

                  {/* State */}
                  <div className="space-y-1 col-span-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      State
                    </span>
                    <div className="flex items-center gap-3 text-sm font-medium">
                      <MapPin className="h-4.5 w-4.5 text-[#D4AF37]/75 shrink-0" />
                      <span className="text-white/80">{profile.state}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="text-center p-12 glass-light rounded-3xl border border-[#D4AF37]/25 shadow-soft">
                <div className="h-16 w-16 mx-auto rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6">
                  <UserIcon className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl font-bold">Access Restricted</h2>
                <p className="text-sm text-foreground/60 mt-3 max-w-sm mx-auto leading-relaxed">
                  Please log in or register to view your profile and manage your digital gold
                  investments.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={() => triggerAuthModal("login")}
                    className="btn-gold btn-gold-hover rounded-full px-6 py-2.5 text-sm font-semibold cursor-pointer"
                  >
                    Log In / Sign Up
                  </button>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer id="footer" className="hairline-t pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-foreground/55">
          <p>© {new Date().getFullYear()} Fingold. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
