import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLeft,
  ArrowRight,
  Receipt,
  ShieldCheck,
  AlertTriangle,
  Check,
  X,
  FileText,
  Coins,
  Landmark,
  Smartphone,
  LineChart,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Info,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/gold-taxation")({
  head: () => ({
    meta: [
      { title: "Gold Investment Taxation in India (2026) — FINGOLD" },
      {
        name: "description",
        content:
          "A simple, clear guide to gold investment taxation in India for 2026. Understand GST, capital gains, and the new SGB tax rule changes across physical gold, digital gold, ETFs, and Sovereign Gold Bonds.",
      },
    ],
  }),
  component: GoldTaxationPage,
});

const taxTable = [
  {
    type: "Physical Gold",
    interest: "No",
    taxBenefit: "Capital gains tax may apply",
    friendly: false,
  },
  {
    type: "Digital Gold",
    interest: "No",
    taxBenefit: "Capital gains tax may apply",
    friendly: false,
  },
  {
    type: "Gold ETF",
    interest: "No",
    taxBenefit: "Capital gains tax may apply",
    friendly: false,
  },
  {
    type: "SGB (Original Subscriber)",
    interest: "Yes (Taxable)",
    taxBenefit: "Tax-free capital gains at maturity",
    friendly: true,
  },
  {
    type: "SGB (Secondary Market Buyer)",
    interest: "Yes (Taxable)",
    taxBenefit: "Capital gains may be taxable",
    friendly: false,
  },
];

const tipCards = [
  {
    icon: FileText,
    title: "Keep All Purchase Records",
    desc: "Always save bills, invoices, contract notes, and demat statements. These documents help calculate taxes correctly when you sell.",
  },
  {
    icon: TrendingUp,
    title: "Think Long Term",
    desc: "Gold is generally considered a long-term investment. Frequent buying and selling can increase tax complexity significantly.",
  },
  {
    icon: BookOpen,
    title: "Understand the Product",
    desc: "Different gold investments have different tax rules. Understanding them beforehand can help you choose the most suitable option.",
  },
];

function GoldTaxationPage() {
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
                Tax
              </span>
              <span className="text-xs text-foreground/55">· 5 Min Read</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
              Gold Investment <span className="text-gold-gradient">Taxation.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/75 leading-relaxed font-sans max-w-3xl">
              A simple, clear breakdown of how taxes work across physical gold, digital gold, ETFs,
              and Sovereign Gold Bonds — including the key 2026 rule changes.
            </p>
          </Reveal>
        </section>

        {/* Article Body */}
        <section className="mx-auto max-w-4xl space-y-16">
          {/* Section 1: Introduction */}
          <Reveal delay={150}>
            <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] items-start p-8 rounded-3xl border border-border/40 bg-background/40">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                  <Receipt className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-display text-2xl font-bold">
                    Why Does Gold Investment Have Tax?
                  </h2>
                  <p className="text-xs uppercase tracking-wider text-foreground/45 mt-1">
                    Capital gains explained
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
                <p>
                  Gold has always been a favorite investment for Indians — whether it's jewelry,
                  gold coins, Gold ETFs, Digital Gold, or Sovereign Gold Bonds (SGBs). Before
                  investing, it's important to understand how taxes can affect your final profit.
                </p>
                <p>
                  Whenever you make a profit from an investment, the government may charge tax on
                  that profit. This profit is called a{" "}
                  <strong className="text-foreground">capital gain</strong>.
                </p>
                <div className="rounded-2xl border border-border/30 bg-background/20 p-4 space-y-2">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">
                    Example
                  </span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>You buy gold for</span>
                      <span className="font-semibold">₹50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>You sell it for</span>
                      <span className="font-semibold">₹70,000</span>
                    </div>
                    <div className="flex justify-between border-t border-border/20 pt-1 mt-1 font-bold text-foreground">
                      <span>Your taxable profit</span>
                      <span>₹20,000</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-foreground/60 italic">
                  Taxes may apply depending on the type of gold investment you own.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 2: Physical Gold */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Coins className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Tax on Physical Gold</h2>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Physical gold includes gold jewelry, gold coins, and gold bars. There are two key
                tax events to be aware of:
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">
                    When You Buy Gold
                  </span>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    You pay <strong className="text-foreground">3% GST</strong> on the value of
                    gold. If you're buying jewelry, GST may also apply to making charges separately.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">
                    When You Sell Gold
                  </span>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    If you sell gold at a profit,{" "}
                    <strong className="text-foreground">capital gains tax</strong> may apply. For
                    example: Purchase ₹1,00,000 → Sale ₹1,40,000 → Taxable profit of ₹40,000.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 3: Digital Gold */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Tax on Digital Gold</h2>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Digital Gold allows investors to buy gold online through apps and platforms. Tax
                treatment is generally{" "}
                <strong className="text-foreground">similar to physical gold</strong>.
              </p>
              <div className="rounded-2xl border border-border/30 bg-background/20 p-6 space-y-4">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">
                  Key Points
                </span>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" /> No annual interest
                    income
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Tax may apply when sold
                    at a profit
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" /> Purchase records should
                    be maintained carefully
                  </li>
                </ul>
                <p className="text-xs text-foreground/55 italic border-t border-border/20 pt-3">
                  Digital Gold is convenient, but investors should always check the terms provided
                  by the platform.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 4: Gold ETFs */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <LineChart className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Tax on Gold ETFs</h2>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Gold ETFs are investment products traded on stock exchanges and linked to gold
                prices. They offer easy liquidity, no storage concerns, and pure gold exposure.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/30 bg-background/20 p-6 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">
                    Interest Income
                  </span>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Gold ETFs <strong className="text-foreground">do not provide</strong> any
                    interest income. Returns come purely from gold price appreciation.
                  </p>
                </div>
                <div className="rounded-2xl border border-border/30 bg-background/20 p-6 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">
                    On Sale / Capital Gains
                  </span>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    If you sell ETF units at a higher price than your purchase price, capital gains
                    tax may apply on the profit.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/25 bg-amber-500/[0.03] p-5">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block mb-3">
                  <Info className="h-3.5 w-3.5 inline mr-1" />
                  Keep These Records
                </span>
                <div className="flex flex-wrap gap-3">
                  {["Purchase date", "Purchase price", "Sale value"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-amber-300/30 bg-amber-500/5 px-3 py-1.5 text-xs font-semibold text-amber-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-foreground/55 mt-3">
                  These details are required while filing income tax returns.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 5: SGBs — with 2026 rule change */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Landmark className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Tax on Sovereign Gold Bonds (SGBs)</h2>
              </div>
              <p className="text-sm text-foreground/75 leading-relaxed">
                Sovereign Gold Bonds are government-backed gold investments issued by the RBI. They
                have traditionally been one of the most tax-efficient ways to invest in gold.
              </p>

              {/* Interest Income note */}
              <div className="rounded-2xl border border-border/30 bg-background/20 p-6 space-y-2">
                <h3 className="font-semibold text-base text-foreground">Interest Income</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  SGBs provide <strong className="text-foreground">2.5% annual interest</strong>.
                  This interest is taxable and must be reported while filing your income tax return.
                </p>
              </div>

              {/* 2026 Rule Change — highlighted callout */}
              <div className="glass-dark relative overflow-hidden rounded-3xl p-8 text-white">
                <div
                  className="absolute -top-16 -right-16 h-48 w-48 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(244,208,63,0.28), transparent 65%)",
                  }}
                />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                    <span className="eyebrow-tag" style={{ color: "var(--gold-bright)" }}>
                      Important 2026 Tax Rule Change
                    </span>
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed">
                    A major tax rule changed from{" "}
                    <strong className="text-white">1 April 2026</strong>. Earlier, investors who
                    held SGBs until maturity generally enjoyed tax-free capital gains. The exemption
                    is now conditional.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
                        ✅ Still Gets Tax-Free Benefits
                      </span>
                      <ul className="space-y-2 text-xs text-white/85">
                        <li className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          Purchased SGB during the original RBI issue
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          Held continuously until maturity
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-red-300 block">
                        ❌ Will Pay Capital Gains Tax
                      </span>
                      <ul className="space-y-2 text-xs text-white/85">
                        <li className="flex items-start gap-2">
                          <X className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                          Purchased SGBs from the stock exchange (secondary market)
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                          Sold before maturity
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
                          Received SGBs through transfer (not original subscriber)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 6: Comparison Table */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">
                  Which Gold Investment Is Most Tax Friendly?
                </h2>
              </div>
              <div className="glass-light overflow-hidden rounded-3xl border border-[#D4AF37]/25 shadow-soft">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-foreground/[0.02] hairline-b">
                        <th className="px-6 py-4 eyebrow-tag">Investment Type</th>
                        <th className="px-6 py-4 text-display text-base text-amber-800">
                          Interest Income
                        </th>
                        <th className="px-6 py-4 text-display text-base text-foreground/70">
                          Tax Benefit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {taxTable.map((row) => (
                        <tr key={row.type} className="hover:bg-foreground/[0.01] transition-colors">
                          <td className="px-6 py-4 font-semibold text-foreground/85">{row.type}</td>
                          <td className="px-6 py-4 text-foreground/70">{row.interest}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${row.friendly ? "text-emerald-700" : "text-foreground/60"}`}
                            >
                              {row.friendly && <Check className="h-3.5 w-3.5" />}
                              {row.taxBenefit}
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

          {/* Section 7: Tips for Investors */}
          <Reveal>
            <div className="space-y-8">
              <h2 className="text-display text-2xl">Tips for Gold Investors</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {tipCards.map((tip, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-4"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                      <tip.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-foreground">{tip.title}</h3>
                    <p className="text-xs text-foreground/70 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-foreground/50 italic leading-relaxed pt-4 border-t border-border/20">
                Disclaimer: This article is for educational purposes only and is not financial
                advice. Tax rules are subject to change. Please consult a qualified tax advisor or
                chartered accountant for advice specific to your situation.
              </p>
            </div>
          </Reveal>
        </section>

        {/* BOTTOM CTA */}
        <section className="mx-auto max-w-4xl mt-24">
          <Reveal>
            <div className="glass-dark relative overflow-hidden p-8 text-center text-white sm:p-12">
              <span className="eyebrow-tag" style={{ color: "var(--gold-bright)" }}>
                Ready to Begin?
              </span>
              <h2 className="text-display text-2xl sm:text-4xl mt-4">
                Invest in gold the smart way.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">
                Choose the most tax-efficient gold instrument for your goals — from digital gold to
                SGBs — with expert guidance.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <button className="btn-gold btn-gold-hover btn-shine inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold cursor-pointer">
                  Start Investing <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer">
                  Contact Advisor
                </button>
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
                <span
                  className="grid h-10 w-10 place-items-center rounded-full"
                  style={{ background: "var(--gradient-gold)" }}
                >
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
                <a
                  href="mailto:info@gallantventures.in"
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <Mail className="h-4 w-4" style={{ color: "var(--bronze)" }} />
                  info@gallantventures.in
                </a>
                <a
                  href="tel:+919879150287"
                  className="flex items-center gap-2 hover:text-foreground"
                >
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
