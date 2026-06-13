import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLeft,
  Coins,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Award,
  Check,
  Lock,
  Percent,
} from "lucide-react";

export const Route = createFileRoute("/sovereign-gold-bonds-guide")({
  head: () => ({
    meta: [
      { title: "Sovereign Gold Bonds (SGB) Guide — FINGOLD" },
      {
        name: "description",
        content:
          "Everything you need to know about Sovereign Gold Bonds (SGBs). Learn key features, benefits, interest earnings, tax exemptions, and comparison with physical gold.",
      },
    ],
  }),
  component: SovereignGoldBondsGuidePage,
});

const comparisonData = [
  { feature: "Storage Required", sgb: "No", physical: "Yes" },
  { feature: "Risk of Theft", sgb: "No", physical: "Yes" },
  { feature: "Interest Income", sgb: "Yes (2.5% p.a.)", physical: "No" },
  { feature: "Purity Concerns", sgb: "No", physical: "Possible" },
  { feature: "Making Charges", sgb: "No", physical: "Yes" },
  { feature: "Government Backing", sgb: "Yes", physical: "No" },
];

function SovereignGoldBondsGuidePage() {
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

      <main className="pt-32 pb-24 px-4">
        {/* Back navigation & Header */}
        <section className="mx-auto max-w-4xl mb-16">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Knowledge Center
            </Link>
          </Reveal>

          <Reveal delay={50}>
            <div className="flex items-center gap-3 mb-6">
              <span className="eyebrow-tag">Guide</span>
              <span className="h-px w-8 bg-foreground/30" />
              <span className="rounded-full bg-amber-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                Bonds
              </span>
              <span className="text-xs text-foreground/55">· 6 Min Read</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
              Sovereign Gold Bonds <span className="text-gold-gradient">(SGB) Guide.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/75 leading-relaxed font-sans max-w-3xl">
              Everything you need to know about Sovereign Gold Bonds. Learn how SGBs offer government backing, annual interest, and tax exemptions to securely compound your wealth.
            </p>
          </Reveal>
        </section>

        {/* Article Body */}
        <section className="mx-auto max-w-4xl space-y-16">
          {/* Section 1: What Are Sovereign Gold Bonds? */}
          <Reveal delay={150}>
            <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] items-start p-8 rounded-3xl border border-border/40 bg-background/40">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-display text-2xl font-bold">What Are Sovereign Gold Bonds?</h2>
                  <p className="text-xs uppercase tracking-wider text-foreground/45 mt-1">Government-backed digital gold</p>
                </div>
              </div>
              <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
                <p>
                  Sovereign Gold Bonds (SGBs) are government-backed investment instruments that allow you to invest in gold without physically buying or storing it. These bonds are issued by the Reserve Bank of India (RBI) on behalf of the Government of India.
                </p>
                <p>
                  When you buy an SGB, you are purchasing gold in digital form. The value of your investment moves according to the market price of gold, just like physical gold.
                </p>
                <p className="font-semibold text-foreground">
                  SGBs were introduced to provide a safer and more efficient way for Indians to invest in gold while reducing the need for physical gold purchases.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 2: How Do Sovereign Gold Bonds Work? */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">How Do Sovereign Gold Bonds Work?</h2>
              </div>
              <p className="text-foreground/85 leading-relaxed max-w-3xl">
                SGBs are denominated in grams of gold. You pay the issue price when you subscribe and receive the current market value of gold at maturity.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/30 bg-background/20 p-6">
                  <h3 className="font-semibold text-base mb-2">Example Investment</h3>
                  <ul className="space-y-2 text-sm text-foreground/75">
                    <li className="flex justify-between"><span>Gold Issue Price:</span> <span className="font-bold">₹7,000 / gram</span></li>
                    <li className="flex justify-between"><span>Quantity Purchased:</span> <span className="font-bold">10 grams</span></li>
                    <li className="flex justify-between border-t border-border/20 pt-2 mt-2 font-semibold text-foreground"><span>Total Investment:</span> <span>₹70,000</span></li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-border/30 bg-background/20 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-base mb-2">Dual Earning Stream</h3>
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      At maturity, you receive the current market value of gold based on the grams owned. Along the way, you also earn regular interest paid directly to your bank account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 3: Key Features of SGBs */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Key Features of SGBs</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Government Backing",
                    desc: "Issued by the RBI on behalf of the Government of India, offering the highest tier of security with zero default risk.",
                  },
                  {
                    icon: Percent,
                    title: "Earn 2.5% Annual Interest",
                    desc: "Unlike physical gold, SGBs pay a fixed interest of 2.5% p.a. on your initial investment, credited semi-annually.",
                  },
                  {
                    icon: Lock,
                    title: "Zero Storage Hassles",
                    desc: "Held digitally in your Demat account or RBI registry. No lockers, no theft risks, and zero storage fees.",
                  },
                  {
                    icon: Sparkles,
                    title: "Guaranteed Purity",
                    desc: "Eliminates purity concerns completely. Value tracks official gold prices without checking certificates.",
                  },
                  {
                    icon: Coins,
                    title: "Wealth Preservation",
                    desc: "Provides a structured, cost-efficient way to protect your capital against inflation and market volatility.",
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="rounded-2xl border border-border/30 bg-background/20 p-6 space-y-4">
                    <div className="flex items-center gap-3 text-amber-600">
                      <feature.icon className="h-6 w-6" />
                      <h3 className="font-semibold text-base">{feature.title}</h3>
                    </div>
                    <p className="text-xs text-foreground/75 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Section 4: Benefits of SGBs */}
          <Reveal>
            <div className="glass-dark p-8 text-white rounded-3xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(244,208,63,0.3), transparent 65%)" }} />
              <div className="relative z-10 grid gap-8 md:grid-cols-[1.3fr_1fr] items-center">
                <div className="space-y-4">
                  <span className="eyebrow-tag" style={{ color: "var(--gold-bright)" }}>Tax Exemption</span>
                  <h2 className="text-display text-3xl font-bold">Unmatched Tax Benefits</h2>
                  <p className="text-sm text-white/85 leading-relaxed">
                    SGBs offer a massive tax advantage: if you hold the bonds for their full **8-year maturity**, the Capital Gains Tax on the appreciation of your gold is **100% exempt** for individual investors.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3">
                  <span className="text-xs text-white/50 uppercase tracking-wider block">Other Advantages:</span>
                  <ul className="space-y-2 text-xs text-white/90">
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-300" /> No making charges</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-300" /> Exempt from GST on purchase</li>
                    <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-amber-300" /> Tradable on stock exchanges</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 5: Who Should Invest in SGBs? */}
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-display text-2xl font-bold">Who Should Invest in SGBs?</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Long-Term Investors",
                    desc: "Ideal for investors who plan to allocate capital to gold for a duration of 5 to 8 years, benefiting from the tax exemption at maturity.",
                  },
                  {
                    title: "Wealth Builders & Pension Planners",
                    desc: "Useful for adding stable, inflation-hedged diversification to a retirement portfolio alongside stocks and mutual funds.",
                  },
                  {
                    title: "Security-Conscious Investors",
                    desc: "Perfect for anyone who wants gold exposure but prefers avoiding the logistics, lockup fees, and security risks of physical storage.",
                  },
                  {
                    title: "Yield Seekers",
                    desc: "For those wanting a regular yield on their investments. SGBs are the only gold instrument that pays annual interest.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-700" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Section 6: Risks to Consider */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Risks to Consider</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-3">
                  <h3 className="font-semibold text-base text-foreground">Gold Price Fluctuations</h3>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    SGB values move directly with international gold prices. If market gold prices drop, the value of your SGB investment will decline accordingly.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-3">
                  <h3 className="font-semibold text-base text-foreground">Lock-In Period</h3>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    Bonds mature in 8 years. Premature redemption is permitted after 5 years, but early exits might miss out on full tax benefits.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-3">
                  <h3 className="font-semibold text-base text-foreground">Liquidity Concerns</h3>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    While SGBs trade on stock exchanges, the volumes are sometimes low, meaning selling quickly before maturity might require a discount.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 7: SGB vs Physical Gold Table */}
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-display text-2xl">SGBs vs Physical Gold</h2>
              <div className="glass-light overflow-hidden rounded-3xl border border-[#D4AF37]/25 shadow-soft">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-foreground/[0.02] hairline-b">
                        <th className="px-6 py-4 eyebrow-tag">Feature</th>
                        <th className="px-6 py-4 text-display text-lg text-amber-800">Sovereign Gold Bonds</th>
                        <th className="px-6 py-4 text-display text-lg text-foreground/60">Physical Gold</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {comparisonData.map((row) => (
                        <tr key={row.feature} className="hover:bg-foreground/[0.01] transition-colors">
                          <td className="px-6 py-4 font-semibold text-foreground/80">{row.feature}</td>
                          <td className="px-6 py-4 text-amber-900 font-medium">{row.sgb}</td>
                          <td className="px-6 py-4 text-foreground/70">{row.physical}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* BOTTOM CTA */}
        <section className="mx-auto max-w-4xl mt-24">
          <Reveal>
            <div className="glass-dark relative overflow-hidden p-8 text-center text-white sm:p-12">
              <span className="eyebrow-tag" style={{ color: "var(--gold-bright)" }}>Ready to Begin?</span>
              <h2 className="text-display text-2xl sm:text-4xl mt-4">
                Invest in SGBs.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">
                Diversify your portfolio with SGBs, gold ETFs, or digital gold starting at just ₹100.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <a href="mailto:info@gallantventures.in" className="btn-gold btn-gold-hover inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold">
                  Start Investing <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <Link to="/sip-calculator" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs font-semibold text-white hover:bg-white/10 transition-colors">
                  Try SIP Calculator
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="footer" className="hairline-t pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: "var(--gradient-gold)" }}>
                  <span className="font-display text-base font-bold text-[#1B1B1B]">F</span>
                </span>
                <span className="font-display text-2xl font-bold">
                  FIN<span className="text-gold-gradient">GOLD</span>
                </span>
              </div>
              <p className="mt-6 max-w-sm text-display text-2xl text-foreground/75">
                Invest in gold. Secure your future.
              </p>
              <div className="mt-8 space-y-3 text-sm text-foreground/70">
                <a href="mailto:info@gallantventures.in" className="flex items-center gap-2 hover:text-foreground">
                  <Mail className="h-4 w-4" style={{ color: "var(--bronze)" }} />
                  info@gallantventures.in
                </a>
                <a href="tel:+919879150287" className="flex items-center gap-2 hover:text-foreground">
                  <Phone className="h-4 w-4" style={{ color: "var(--bronze)" }} />
                  +91 98791 50287
                </a>
              </div>
            </div>
            <div>
              <h4 className="eyebrow-tag">Navigate</h4>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground/70">
                {[
                  { label: "Home", href: "/" },
                  { label: "Investment Options", href: "/#options" },
                  { label: "Calculators", href: "/#tools" },
                  { label: "Learning Center", href: "/#learn" },
                  { label: "FAQ", href: "/#faq" },
                  { label: "Contact", href: "/#cta" },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="eyebrow-tag">Follow</h4>
              <div className="mt-5 flex gap-3">
                {[Linkedin, Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border/50 transition-colors hover:border-foreground/60"
                  >
                    <Icon className="h-4 w-4" style={{ color: "var(--bronze)" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hairline-t mt-14 flex flex-col items-center justify-between gap-4 pt-6 text-xs text-foreground/55 sm:flex-row">
            <p>© {new Date().getFullYear()} Fingold. All rights reserved.</p>
            <p>Crafted for those who plan in generations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
