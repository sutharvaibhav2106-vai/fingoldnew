import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";
import {
  ArrowLeft,
  TrendingUp,
  ShieldCheck,
  Coins,
  ArrowRight,
  Layers,
  Sparkles,
  DollarSign,
  Activity,
  Award,
  CheckCircle2,
  Loader2,
  ChevronDown,
  TrendingDown,
  Percent,
  Settings2,
} from "lucide-react";

export const Route = createFileRoute("/futures-and-options")({
  head: () => ({
    meta: [
      { title: "Gold Futures & Options — Derivatives Trading | FINGOLD" },
      {
        name: "description",
        content:
          "Gold Futures & Options enable advanced traders to leverage and hedge positions on gold prices on regulated commodity exchanges.",
      },
    ],
  }),
  component: FuturesAndOptionsPage,
});

function FuturesAndOptionsPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "₹1 Lakh - ₹5 Lakhs",
    message: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const investmentOptions = [
    "Under ₹1 Lakh",
    "₹1 Lakh - ₹5 Lakhs",
    "₹5 Lakhs - ₹20 Lakhs",
    "Above ₹20 Lakhs",
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Full name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formState.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formState.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formState.message.trim()) {
      newErrors.message = "Message / comments are required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the errors in the form before submitting.");
      return;
    }
    setIsSubmitting(true);
    fetch("https://formsubmit.co/ajax/fingoldgdm@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Name: formState.name,
        Email: formState.email,
        Phone: formState.phone,
        "Investment Size": formState.amount,
        Message: formState.message,
        "Inquiry Source": "Gold Futures & Options",
      }),
    })
      .then((res) => {
        setIsSubmitting(false);
        if (res.ok) {
          setIsSubmitted(true);
          toast.success("Thank you! Your Futures & Options inquiry has been received.", {
            description: "An advisor will get in touch with you shortly.",
          });
        } else {
          toast.error("Failed to submit inquiry. Please try again later.");
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        toast.error("An error occurred. Please check your connection and try again.");
      });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-noise">
      {/* Ambient decorative glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(244,208,63,0.25), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute top-[50%] -left-40 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 65%)" }}
      />

      <Nav />

      <main className="pt-32 pb-24 px-4 sm:px-6">
        {/* Back navigation & Header */}
        <section className="mx-auto max-w-4xl mb-16">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60 hover:text-foreground mb-8 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight">
              Futures & Options
            </h1>
            <p className="mt-4 text-display text-lg sm:text-2xl text-amber-500 font-medium">
              Professional Derivatives Trading for Hedging and Leverage
            </p>
            <p className="mt-8 text-base sm:text-lg text-foreground/80 leading-relaxed font-sans max-w-3xl">
              Gold Futures & Options are derivative contracts traded on exchanges like MCX. They
              allow traders and advanced investors to speculate on future gold price movements,
              hedge portfolio risk, and trade with substantial leverage.
            </p>
          </Reveal>
        </section>

        {/* Benefits Grid Section */}
        <section className="mx-auto max-w-4xl mb-24">
          <Reveal delay={150}>
            <h2 className="text-display text-2xl sm:text-3xl mb-10 border-b border-border/20 pb-4">
              Why Invest in Gold Futures & Options?
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Percent,
                title: "High Leverage",
                desc: "Control large gold contracts with a fraction of the total trade value as margin, optimizing capital efficiency.",
              },
              {
                icon: TrendingDown,
                title: "Short Selling",
                desc: "Profit from falling gold prices by taking short positions in the futures market, hedging against down cycles.",
              },
              {
                icon: ShieldCheck,
                title: "Portfolio Hedging",
                desc: "Lock in future gold prices to protect physical collections, business inventory, or other gold-heavy portfolios.",
              },
              {
                icon: Activity,
                title: "Deep Liquidity",
                desc: "Highly active contracts with tight bid-ask spreads allow for fast, cost-efficient, and precise order execution.",
              },
              {
                icon: Settings2,
                title: "Dynamic Trading Strategies",
                desc: "Build complex multi-leg options spreads to profit from market volatility, stability, or directional price movements.",
              },
              {
                icon: Award,
                title: "Exchange Regulated",
                desc: "All transactions are traded on regulated commodity exchanges under SEBI oversight, ensuring complete transparency.",
              },
            ].map((item, idx) => (
              <Reveal key={idx} delay={50 * idx}>
                <div className="group h-full rounded-2xl border border-border/30 bg-background/25 p-6 hover:border-amber-500/40 hover:bg-foreground/[0.01] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20 transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="mx-auto max-w-2xl">
          <Reveal>
            <div className="glass-dark border border-border/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />

              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <span className="eyebrow-tag" style={{ color: "var(--gold-bright)" }}>
                      Inquire Now
                    </span>
                    <h3 className="text-display text-2xl sm:text-3xl mt-3">
                      Connect with an Advisor
                    </h3>
                    <p className="text-sm text-white/60 mt-2">
                      Ready to start your digital gold journey? Submit this form and our investment
                      team will guide you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all ${
                          errors.name
                            ? "border-rose-500/60 ring-1 ring-rose-500/60"
                            : "border-white/10"
                        }`}
                      />
                      {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all ${
                            errors.email
                              ? "border-rose-500/60 ring-1 ring-rose-500/60"
                              : "border-white/10"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all ${
                            errors.phone
                              ? "border-rose-500/60 ring-1 ring-rose-500/60"
                              : "border-white/10"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
                        Expected Investment Size
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all text-left cursor-pointer"
                      >
                        <span>{formState.amount}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-white/60 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsDropdownOpen(false)}
                          />
                          <ul className="absolute z-50 left-0 right-0 mt-2 bg-zinc-950/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md transition-all">
                            {investmentOptions.map((opt) => (
                              <li
                                key={opt}
                                onClick={() => {
                                  setFormState({ ...formState, amount: opt });
                                  setIsDropdownOpen(false);
                                }}
                                className="px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-amber-500/20 cursor-pointer transition-colors"
                              >
                                {opt}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium">
                        Message / Comments
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your investment goals..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none ${
                          errors.message
                            ? "border-rose-500/60 ring-1 ring-rose-500/60"
                            : "border-white/10"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-400 mt-1">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gold btn-gold-hover inline-flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4 transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending Inquiry...
                        </>
                      ) : (
                        <>
                          Submit Inquiry <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 px-4 flex flex-col items-center">
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full mb-6">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h3 className="text-display text-2xl sm:text-3xl mb-3">Inquiry Submitted!</h3>
                  <p className="text-sm text-white/70 max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you,{" "}
                    <span className="font-semibold text-amber-400">{formState.name}</span>. We have
                    registered your interest in investing{" "}
                    <span className="font-semibold text-white">{formState.amount}</span>. One of our
                    expert gold advisors will contact you at{" "}
                    <span className="font-semibold text-white">{formState.email}</span> or{" "}
                    <span className="font-semibold text-white">{formState.phone}</span> within the
                    next 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        phone: "",
                        amount: "₹1 Lakh - ₹5 Lakhs",
                        message: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
