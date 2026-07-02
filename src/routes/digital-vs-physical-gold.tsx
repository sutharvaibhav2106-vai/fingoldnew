import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";
import {
  Smartphone,
  ShieldCheck,
  Check,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Coins,
  DollarSign,
  Activity,
  Award,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/digital-vs-physical-gold")({
  head: () => ({
    meta: [
      { title: "Digital Gold vs Physical Gold — FINGOLD" },
      {
        name: "description",
        content:
          "Compare digital gold vs physical gold features, storage, purity, making charges, and convenience to pick the best investment format.",
      },
    ],
  }),
  component: CompareGoldPage,
});

const comparisonData = [
  {
    feature: "Ownership",
    digital: "Gold is purchased and stored digitally on your behalf.",
    physical: "You physically own the gold in the form of jewelry, coins, or bars.",
  },
  {
    feature: "Purchase Method",
    digital: "Bought online through apps and websites.",
    physical: "Purchased from jewelers, banks, or gold dealers.",
  },
  {
    feature: "Minimum Investment",
    digital: "Can start with very small amounts (₹10, ₹100, etc.).",
    physical: "Requires enough money to buy a coin, bar, or jewelry piece.",
  },
  {
    feature: "Storage",
    digital: "Stored securely in insured vaults by the provider.",
    physical: "Must be stored at home, in a locker, or a vault.",
  },
  {
    feature: "Security Risk",
    digital: "Very low risk of theft or loss.",
    physical: "Risk of theft, damage, or misplacement.",
  },
  {
    feature: "Purity",
    digital: "Usually 24K (99.5%–99.99%) purity.",
    physical: "Purity varies depending on seller and product.",
  },
  {
    feature: "Making Charges",
    digital: "No making charges.",
    physical: "Jewelry includes making and design charges.",
  },
  {
    feature: "Liquidity",
    digital: "Can often be sold instantly online.",
    physical: "Requires visiting a jeweler or dealer to sell.",
  },
  {
    feature: "Convenience",
    digital: "Buy, sell, and track anytime from anywhere.",
    physical: "Requires physical visits for buying and selling.",
  },
  {
    feature: "Documentation",
    digital: "Digital records maintained automatically.",
    physical: "Bills and certificates must be stored safely.",
  },
  {
    feature: "Maintenance Cost",
    digital: "Usually no locker or storage fees for investors.",
    physical: "Locker and insurance costs may apply.",
  },
  {
    feature: "Investment Purpose",
    digital: "Primarily for investment and wealth creation.",
    physical: "Suitable for both investment and personal use.",
  },
  {
    feature: "Gifting",
    digital: "Can be gifted digitally on some platforms.",
    physical: "Commonly gifted during weddings and festivals.",
  },
  { feature: "Wearability", digital: "Cannot be worn.", physical: "Can be worn as jewelry." },
  {
    feature: "Resale Process",
    digital: "Online and often immediate.",
    physical: "Depends on jeweler and market conditions.",
  },
  {
    feature: "Accessibility",
    digital: "Available 24/7 through digital platforms.",
    physical: "Limited to store operating hours.",
  },
  {
    feature: "Transparency",
    digital: "Real-time pricing and holdings visible online.",
    physical: "Pricing may vary between sellers.",
  },
  {
    feature: "Best For",
    digital: "Investors seeking convenience and long-term savings.",
    physical: "People wanting both investment value and personal use.",
  },
];

const summaryData = [
  { want: "Start investing with small amounts", choose: "Digital Gold" },
  { want: "Easy online buying and selling", choose: "Digital Gold" },
  { want: "No storage worries", choose: "Digital Gold" },
  { want: "Gold jewelry for personal use", choose: "Physical Gold" },
  { want: "Wedding and festival purchases", choose: "Physical Gold" },
  { want: "Long-term investment with convenience", choose: "Digital Gold" },
  { want: "Tangible asset you can hold", choose: "Physical Gold" },
];

function CompareGoldPage() {
  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      setTimeout(() => {
        const element = document.getElementById("contact-form");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

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
        "Inquiry Source": "Digital Gold",
      }),
    })
      .then((res) => {
        setIsSubmitting(false);
        if (res.ok) {
          setIsSubmitted(true);
          toast.success("Thank you! Your Digital Gold investment inquiry has been received.", {
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
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(244,208,63,0.32), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute top-[40%] -left-40 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.22), transparent 65%)" }}
      />

      <Nav />

      <main className="pt-32 pb-24 px-4 sm:px-6">
        {/* Back navigation */}
        <section className="mx-auto max-w-7xl mb-12">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60 hover:text-foreground mb-4 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Reveal>
        </section>

        {/* Header Section */}
        <section className="mx-auto max-w-7xl text-center mb-16">
          <Reveal>
            <div className="flex justify-center items-center gap-3">
              <span className="h-px w-10 bg-foreground/30" />
              <span className="eyebrow-tag">Comparison</span>
              <span className="h-px w-10 bg-foreground/30" />
            </div>
            <h1 className="mt-6 text-display text-[clamp(2.25rem,5vw,3.75rem)]">
              Digital Gold vs <span className="text-gold-gradient">Physical Gold.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/65 sm:text-lg">
              Understand the core differences in security, purity, costs, and convenience to choose
              the ideal way to anchor your wealth.
            </p>
          </Reveal>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mx-auto max-w-7xl">
          <Reveal delay={100}>
            <div className="glass-light overflow-hidden rounded-3xl border border-[#D4AF37]/25 shadow-soft">
              <div
                className="p-6 md:p-8 hairline-b"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(244, 208, 63, 0.22) 0%, rgba(212, 175, 55, 0.12) 100%)",
                }}
              >
                <h2 className="text-display text-2xl md:text-3xl font-bold text-foreground">
                  Comparison Table
                </h2>
                <p className="text-sm text-foreground/60 mt-1">
                  A side-by-side feature comparison between digital ownership and physical holding.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-foreground/[0.02] hairline-b">
                      <th className="px-6 py-5 eyebrow-tag w-[20%]">Feature</th>
                      <th className="px-6 py-5 text-display text-xl text-[#1A535C] w-[40%] bg-[#1A535C]/5">
                        Digital Gold
                      </th>
                      <th className="px-6 py-5 text-display text-xl text-[#8A6A2F] w-[40%]">
                        Physical Gold
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {comparisonData.map((row) => (
                      <tr
                        key={row.feature}
                        className="hover:bg-foreground/[0.01] transition-colors"
                      >
                        <td className="px-6 py-5 font-semibold text-foreground/85">
                          {row.feature}
                        </td>
                        <td className="px-6 py-5 text-foreground/75 leading-relaxed bg-[#1A535C]/[0.01] border-r border-border/10">
                          {row.digital}
                        </td>
                        <td className="px-6 py-5 text-foreground/75 leading-relaxed">
                          {row.physical}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Quick Summary Grid Section */}
        <section className="mx-auto max-w-7xl mt-24">
          <Reveal delay={150}>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              {/* Left Column: Context Card */}
              <div className="flex flex-col justify-between rounded-3xl border border-border/40 bg-background/40 p-8 md:p-10 shadow-soft backdrop-blur-xl">
                <div>
                  <span className="eyebrow-tag text-xs" style={{ color: "var(--bronze)" }}>
                    Quick Decision Matrix
                  </span>
                  <h2 className="text-display text-3xl md:text-4xl font-bold text-foreground mt-4 leading-tight">
                    Which should you <span className="text-gold-gradient">choose?</span>
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground/70 mt-6">
                    If you are looking for long-term wealth preservation, cost-efficiency, and
                    instant liquidity, **Digital Gold** eliminates vault fees, locker charges, and
                    safety concerns.
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/70 mt-4">
                    However, if you require gold jewelry for weddings, cultural festivals, or value
                    physical assets that you can hold immediately, **Physical Gold** remains the
                    classic option.
                  </p>
                </div>

                <div className="mt-8 pt-8 hairline-t grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-6 w-6 text-[#1A535C]" />
                    <span className="text-xs font-semibold text-foreground/80">
                      Digital Convenience
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-[#8A6A2F]" />
                    <span className="text-xs font-semibold text-foreground/80">
                      Secured Physical Backing
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Summary Table */}
              <div className="glass-light overflow-hidden rounded-3xl border border-[#D4AF37]/25 shadow-soft flex flex-col justify-between">
                <div
                  className="p-6 md:p-8 hairline-b"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(244, 208, 63, 0.22) 0%, rgba(212, 175, 55, 0.12) 100%)",
                  }}
                >
                  <h3 className="text-display text-2xl font-bold text-foreground">Quick Summary</h3>
                  <p className="text-sm text-foreground/60 mt-1">
                    Match your investment goals with the best option.
                  </p>
                </div>
                <div className="overflow-x-auto flex-grow">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-foreground/[0.02] hairline-b">
                        <th className="px-6 py-4 eyebrow-tag">If You Want...</th>
                        <th className="px-6 py-4 eyebrow-tag text-right">Choose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {summaryData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-foreground/[0.01] transition-colors">
                          <td className="px-6 py-4.5 font-medium text-foreground/80 flex items-center gap-2">
                            <Check className="h-4 w-4 text-emerald-700 shrink-0" />
                            {row.want}
                          </td>
                          <td className="px-6 py-4.5 text-right font-bold">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                                row.choose === "Digital Gold"
                                  ? "bg-[#1A535C]/10 text-[#1A535C]"
                                  : "bg-[#8A6A2F]/10 text-[#8A6A2F]"
                              }`}
                            >
                              {row.choose}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Why Invest in Digital Gold section */}
        <section className="mx-auto max-w-4xl mt-28 mb-24">
          <Reveal>
            <h2 className="text-display text-2xl sm:text-3xl mb-10 border-b border-border/20 pb-4">
              Why Invest in Digital Gold?
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Activity,
                title: "Instant Liquidity",
                desc: "Buy or sell digital gold instantly at real-time market rates 24/7 with immediate bank settlement.",
              },
              {
                icon: Coins,
                title: "Micro-Investing",
                desc: "Start building wealth with as little as ₹100, making gold accumulation accessible to everyone.",
              },
              {
                icon: ShieldCheck,
                title: "100% Insured Storage",
                desc: "Your gold is stored in state-of-the-art, fully insured physical vaults at zero cost to you.",
              },
              {
                icon: Award,
                title: "Pure 24K Gold",
                desc: "Get certified 99.9% fine purity gold directly sourced from MMTC-PAMP and other trusted refineries.",
              },
              {
                icon: DollarSign,
                title: "No Making Charges",
                desc: "Save on design fees, wastage, and making charges associated with buying physical jewelry.",
              },
              {
                icon: Smartphone,
                title: "Doorstep Delivery",
                desc: "Easily convert your digital holdings into physical coins or bars delivered securely to your door.",
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
        <section id="contact-form" className="mx-auto max-w-2xl mt-24">
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
                    Send Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
