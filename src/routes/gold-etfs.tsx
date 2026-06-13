import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLeft,
  Coins,
  ShieldCheck,
  TrendingUp,
  Layers,
  History,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Eye,
  BarChart3,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/gold-etfs")({
  head: () => ({
    meta: [
      { title: "Gold ETFs Explained — FINGOLD" },
      {
        name: "description",
        content:
          "Learn how Gold ETFs work, their benefits, historical performance, and beginner-friendly investment strategies.",
      },
    ],
  }),
  component: GoldEtfsPage,
});

function GoldEtfsPage() {
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
              <span className="eyebrow-tag">Markets</span>
              <span className="h-px w-8 bg-foreground/30" />
              <span className="rounded-full bg-amber-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                ETF
              </span>
              <span className="text-xs text-foreground/50">· 5 Min Read</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
              Gold ETFs: A <span className="text-gold-gradient">Beginner-Friendly</span> Way to Invest.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/75 leading-relaxed font-sans max-w-3xl">
              Discover how Exchange-Traded Funds offer the smartest way to gain exposure to gold prices without the burden of storing physical bullion.
            </p>
          </Reveal>
        </section>

        {/* Article Body */}
        <section className="mx-auto max-w-4xl space-y-16">
          {/* Section 1: Intro */}
          <Reveal delay={150}>
            <div className="space-y-6 text-foreground/80 leading-relaxed text-base">
              <p>
                Gold has fascinated people for thousands of years. Ancient civilizations used it as money, kingdoms stored it in vaults, and families passed it down through generations as a symbol of wealth and security. Even today, investors often turn to gold when they worry about inflation, economic uncertainty, or stock market volatility.
              </p>
              <p>
                Traditionally, investing in gold meant buying coins, bars, or jewelry. But physical gold comes with practical challenges: storage, insurance, and the risk of loss or theft. This is where Gold ETFs (Exchange-Traded Funds) come in.
              </p>

              {/* Digital Wrapper Callout */}
              <div className="glass-dark p-8 rounded-3xl border border-border/40 text-white relative overflow-hidden my-8">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex gap-4 items-start">
                  <span className="text-display text-4xl text-amber-400 leading-none">“</span>
                  <div className="space-y-2">
                    <h3 className="text-display text-xl sm:text-2xl text-white">Think of a Gold ETF as a digital wrapper around gold.</h3>
                    <p className="text-sm text-white/70">
                      Instead of buying a gold bar and storing it yourself, you buy units of a fund that owns gold on behalf of investors. Your investment rises and falls with the price of gold, but you avoid the hassle of handling the metal directly.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                For many beginners, Gold ETFs are one of the simplest and most accessible ways to get exposure to gold.
              </p>
            </div>
          </Reveal>

          {/* Section 2: Benefits of Gold ETFs */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Benefits of Gold ETFs</h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "No Storage Worries",
                    desc: "When you buy physical gold, you need a secure place to keep it (home safe, bank locker). With an ETF, the fund handles storage and security. You simply hold the units in your brokerage account.",
                  },
                  {
                    title: "Easy to Buy and Sell",
                    desc: "Gold ETFs trade on stock exchanges just like regular shares. You can buy or sell them instantly during market hours with zero physical friction.",
                  },
                  {
                    title: "Lower Entry Barrier",
                    desc: "Buying a full gold bar is expensive. An ETF allows you to invest smaller amounts (starting with a few thousand rupees) and build exposure gradually.",
                  },
                  {
                    title: "Transparent Pricing",
                    desc: "Gold ETF prices track the live market price of gold transparently. You see the exact value during trading hours without negotiating with dealers.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Extra benefit row */}
              <div className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-amber-600" /> Portfolio Diversification
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Gold often behaves differently from stocks and bonds. When equity markets struggle, gold may hold its value better or even rise, helping to reduce overall portfolio volatility.
                </p>
              </div>

              {/* Crisis Example Case Study */}
              <div className="border-l-2 border-amber-500 pl-6 space-y-2 my-4">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">Historical Focus · 2008 Financial Crisis</span>
                <p className="text-sm text-foreground/75 italic">
                  Many stock markets experienced steep declines. Gold, meanwhile, attracted investors seeking a perceived safe haven. While the exact performance varied, gold generally held up better than many risk assets during periods of extreme uncertainty.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 3: How Gold ETFs Work */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">How Gold ETFs Work</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { step: "1", title: "Fund Vaulting", desc: "The ETF buys physical gold and stores it in secure vaults through custodians." },
                  { step: "2", title: "Buy Units", desc: "You purchase ETF units, effectively buying a proportional interest in the fund's gold." },
                  { step: "3", title: "Price Tracking", desc: "The unit price tracks the gold price closely. It rises or falls as the gold market changes." },
                  { step: "4", title: "Trade Instantly", desc: "You trade units through your standard brokerage account without physical deliveries." },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl bg-amber-500/[0.02] border border-amber-300/20 p-5 relative overflow-hidden">
                    <span className="absolute right-4 top-2 text-[4rem] font-bold text-amber-600/5 leading-none">{item.step}</span>
                    <h4 className="font-semibold text-foreground text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-foreground/75 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Simple Example Calculations */}
              <div className="rounded-3xl border border-border/40 bg-background/20 p-6 md:p-8 space-y-6">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" /> Simple Investment Example
                </h3>
                <p className="text-sm text-foreground/75">
                  Imagine a Gold ETF unit is priced at <strong>₹60</strong>:
                </p>
                <div className="grid gap-3 sm:grid-cols-5 text-xs text-foreground/75">
                  <div className="bg-background/40 p-4 rounded-xl border border-border/30">
                    <span className="block text-foreground/45 mb-1">Buy Units</span>
                    <span className="font-semibold text-sm">100 units</span>
                  </div>
                  <div className="bg-background/40 p-4 rounded-xl border border-border/30">
                    <span className="block text-foreground/45 mb-1">Initial Capital</span>
                    <span className="font-semibold text-sm">₹6,000</span>
                  </div>
                  <div className="bg-background/40 p-4 rounded-xl border border-border/30">
                    <span className="block text-foreground/45 mb-1">Gold Price Gain</span>
                    <span className="font-semibold text-sm text-emerald-700">+10%</span>
                  </div>
                  <div className="bg-background/40 p-4 rounded-xl border border-border/30">
                    <span className="block text-foreground/45 mb-1">New Unit Value</span>
                    <span className="font-semibold text-sm">₹66 / unit</span>
                  </div>
                  <div className="bg-background/40 p-4 rounded-xl border border-border/30">
                    <span className="block text-foreground/45 mb-1">Final Capital</span>
                    <span className="font-semibold text-sm text-emerald-700">₹6,600*</span>
                  </div>
                </div>
                <p className="text-[11px] text-foreground/55 italic">
                  * Note: The exact return may differ slightly due to fund expenses, management fees, and tracking differences.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Historical Context Panel */}
          <Reveal>
            <div className="rounded-3xl bg-amber-500/[0.03] border border-amber-300/30 p-8 flex gap-6 items-start">
              <History className="h-8 w-8 text-amber-600 shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Historical Context</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  The first major Gold ETFs appeared in the early 2000s. They quickly became popular because they allowed ordinary investors to access gold through the stock market without dealing with physical delivery. Today, Gold ETFs are widely used by retail investors, financial advisors, and institutional investors around the world.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 4: Investment Strategies for Beginners */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Investment Strategies for Beginners</h2>
              </div>

              {/* 1. Start Small */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground">1. Start Small</h3>
                <p className="text-sm text-foreground/75">
                  If you're new to investing, avoid putting a large portion of your money into gold immediately.
                </p>
                <div className="bg-background/30 border border-border/30 rounded-2xl p-4 text-xs italic text-foreground/70">
                  <strong>Example:</strong> Suppose you have ₹1,00,000 invested across stocks, bonds, and cash. A beginner might allocate 5%–10% (₹5,000–₹10,000) to a Gold ETF rather than making gold the majority of the portfolio.
                </div>
              </div>

              {/* 2. Use Gold as a Diversifier */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">2. Use Gold as a Diversifier</h3>
                <p className="text-sm text-foreground/75">
                  Gold works best for many investors as a supporting asset, not the entire investment plan.
                </p>

                {/* Example Allocation Table */}
                <div className="glass-light rounded-3xl overflow-hidden max-w-md border border-border/30">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-foreground/5 border-b border-border/30">
                        <th className="px-5 py-3 font-semibold text-foreground/85">Asset</th>
                        <th className="px-5 py-3 font-semibold text-foreground/85">Allocation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {[
                        { asset: "Stocks", allocation: "60%" },
                        { asset: "Bonds", allocation: "25%" },
                        { asset: "Gold ETF", allocation: "10%" },
                        { asset: "Cash", allocation: "5%" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-foreground/[0.01]">
                          <td className="px-5 py-3.5 font-medium text-foreground/80">{item.asset}</td>
                          <td className="px-5 py-3.5 text-amber-700 font-semibold">{item.allocation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-foreground/55 italic">This type of mix aims to balance growth potential with stability.</p>
              </div>

              {/* 3. Invest Regularly */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground">3. Invest Regularly</h3>
                <p className="text-sm text-foreground/75">
                  Instead of trying to guess the perfect time to buy gold, many investors use a systematic investment approach.
                </p>
                <div className="bg-background/30 border border-border/30 rounded-2xl p-4 text-xs text-foreground/70 space-y-1">
                  <p><strong>Example (Systematic Plan):</strong> Invest ₹1,000 into a Gold ETF every month.</p>
                  <p>• When prices are high, you buy fewer units.</p>
                  <p>• When prices are low, you buy more units.</p>
                  <p>Over time, this can reduce the impact of short-term price swings.</p>
                </div>
              </div>

              {/* 4. Avoid Emotional Decisions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground">4. Avoid Emotional Decisions</h3>
                <p className="text-sm text-foreground/75 font-medium">
                  Gold often receives a lot of attention during crises. Headlines may suggest that gold will either soar forever or crash dramatically.
                </p>
                <div className="rounded-2xl border border-border/30 bg-background/25 p-5 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">A Practical Rule:</span>
                  <ul className="space-y-2 text-xs text-foreground/80">
                    <li className="flex gap-2">
                      <span className="text-amber-600 font-bold">1.</span>
                      Decide your target allocation in advance.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600 font-bold">2.</span>
                      Review it periodically (for example, once or twice a year).
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600 font-bold">3.</span>
                      Rebalance if gold becomes much larger or smaller than your target.
                    </li>
                  </ul>
                  <p className="text-[11px] text-foreground/55 pt-2 border-t border-border/20">
                    This disciplined approach is usually more effective than reacting to daily news.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 5: Long-Term Perspective */}
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-display text-2xl">A Simple Long-Term Perspective</h2>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                Gold has survived empires, wars, currency changes, and financial crises. Its enduring appeal comes from scarcity, global acceptance, and its role as a store of value. However, gold is not a magic investment. It can experience long periods of flat or disappointing returns, and it does not generate income like dividends or interest.
              </p>

              <div className="rounded-3xl border border-border/40 bg-background/40 p-6 md:p-8 space-y-4">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-bold block">For most beginners, Gold ETFs offer a practical middle ground:</span>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground/75">
                  <li>✔ <strong>Easier:</strong> No hassle of storing physical gold bars or coins.</li>
                  <li>✔ <strong>Affordable:</strong> More affordable than buying large bullion bars.</li>
                  <li>✔ <strong>Transparent:</strong> More transparent pricing than traditional gold purchases.</li>
                  <li>✔ <strong>Diversifying:</strong> Highly useful as a diversification tool within a broader portfolio.</li>
                </ul>
              </div>

              {/* Takeaway Container */}
              <div className="rounded-2xl bg-amber-500/10 border border-amber-300/30 p-6 space-y-2">
                <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">Key Takeaway</span>
                <p className="text-sm text-foreground/85">
                  If you're considering your first gold investment, a Gold ETF can be a sensible starting point. Begin with a modest allocation, invest regularly, and view gold as one component of a diversified long-term financial plan rather than a shortcut to quick profits.
                </p>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-foreground/50 italic leading-relaxed pt-4 border-t border-border/20">
                Disclaimer: This article is for educational purposes only and is not financial advice. Investment values can rise or fall, and past performance does not guarantee future results.
              </p>
            </div>
          </Reveal>
        </section>

        {/* BOTTOM CTA */}
        <section className="mx-auto max-w-4xl mt-24">
          <Reveal>
            <div className="glass-dark relative overflow-hidden p-8 text-center text-white sm:p-12">
              <span className="eyebrow-tag" style={{ color: "var(--gold-bright)" }}>Take Action</span>
              <h2 className="text-display text-2xl sm:text-4xl mt-4">
                Start your ETF investment.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">
                Model target allocations and project SIP returns with precision before taking the next step.
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
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-2">
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
