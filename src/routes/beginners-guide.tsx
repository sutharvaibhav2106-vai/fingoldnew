import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLeft,
  Coins,
  ShieldCheck,
  TrendingUp,
  PieChart,
  Award,
  AlertTriangle,
  HelpCircle,
  TrendingDown,
  Layers,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/beginners-guide")({
  head: () => ({
    meta: [
      { title: "Beginner's Guide to Gold Investing — FINGOLD" },
      {
        name: "description",
        content:
          "Start your first gold investment with confidence. Learn why gold is valuable, common mistakes, and how to build a diversified portfolio.",
      },
    ],
  }),
  component: BeginnersGuidePage,
});

function BeginnersGuidePage() {
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
                Beginner
              </span>
              <span className="text-xs text-foreground/50">· 5 Min Read</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
              Beginner's Guide to <span className="text-gold-gradient">Gold Investing.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/75 leading-relaxed font-sans max-w-3xl">
              Start your first gold investment with confidence. Learn the fundamentals of wealth preservation, common pitfalls, and strategies to build a robust portfolio.
            </p>
          </Reveal>
        </section>

        {/* Article Body */}
        <section className="mx-auto max-w-4xl space-y-16">
          {/* Section 1: Why Gold Has Always Been Valuable */}
          <Reveal delay={150}>
            <div className="grid gap-8 md:grid-cols-[1fr_1.5fr] items-start p-8 rounded-3xl border border-border/40 bg-background/40">
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-display text-2xl font-bold">Why Gold Has Always Been Valuable</h2>
                  <p className="text-xs uppercase tracking-wider text-foreground/45 mt-1">A historical store of wealth</p>
                </div>
              </div>
              <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
                <p>
                  For thousands of years, gold has been trusted as a store of wealth. From ancient civilizations to modern economies, people have turned to gold during times of uncertainty because it holds value over the long term.
                </p>
                <p>
                  Unlike paper money, gold cannot be printed by governments. It is limited in supply, widely accepted around the world, and has a long history of protecting wealth. This is why many investors include gold as part of their financial planning.
                </p>
                <p className="font-semibold text-foreground">
                  Today, investing in gold is easier than ever. You no longer need to buy and store physical gold bars or coins. Digital platforms now allow anyone to start investing in gold with small amounts of money.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 2: What Is Gold Investing? */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">What Is Gold Investing?</h2>
              </div>
              <p className="text-foreground/85 leading-relaxed max-w-3xl">
                Gold investing simply means putting your money into gold with the expectation that its value will grow over time or help protect your wealth.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[
                  "To protect against inflation",
                  "To diversify their investment portfolio",
                  "To preserve wealth during economic uncertainty",
                  "To achieve long-term financial goals",
                  "To build a secure financial future",
                ].map((reason, idx) => (
                  <div key={idx} className="glass-light rounded-2xl p-5 flex items-start gap-3 border border-border/30">
                    <span className="text-xs font-semibold text-amber-700 bg-amber-500/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-medium text-foreground/90">{reason}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-foreground/60 italic">
                * Gold is often considered a "safe-haven asset" because investors tend to trust it during market volatility.
              </p>
            </div>
          </Reveal>

          {/* Section 3: Why Should Beginners Consider Gold? */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Coins className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Why Should Beginners Consider Gold?</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* 1. Inflation */}
                <div className="rounded-3xl border border-border/30 bg-background/20 p-6 space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                    <ShieldCheck className="h-6 w-6" />
                    <h3 className="font-semibold text-lg">1. Protection Against Inflation</h3>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Over time, the prices of goods and services increase. This reduces the purchasing power of money.
                  </p>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Gold has historically helped preserve wealth because its value often rises when inflation increases. For example, if the cost of living rises significantly, gold may help protect the value of your savings.
                  </p>
                </div>

                {/* 2. Stability */}
                <div className="rounded-3xl border border-border/30 bg-background/20 p-6 space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="font-semibold text-lg">2. Stability During Uncertain Times</h3>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Stock markets can experience sharp ups and downs. Economic crises, geopolitical events, and market volatility can impact investments.
                  </p>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Gold often performs differently from stocks, making it a useful asset during uncertain periods.
                  </p>
                </div>

                {/* 3. Portfolio Diversification */}
                <div className="rounded-3xl border border-border/30 bg-background/20 p-6 space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                    <PieChart className="h-6 w-6" />
                    <h3 className="font-semibold text-lg">3. Portfolio Diversification</h3>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Financial experts recommend not putting all your money into a single investment.
                  </p>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    By including gold alongside stocks, mutual funds, and other investments, you can reduce overall portfolio risk.
                  </p>
                </div>

                {/* 4. Wealth Preservation */}
                <div className="rounded-3xl border border-border/30 bg-background/20 p-6 space-y-4">
                  <div className="flex items-center gap-3 text-amber-600">
                    <Layers className="h-6 w-6" />
                    <h3 className="font-semibold text-lg">4. Long-Term Wealth Preservation</h3>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Gold is not usually viewed as a "get rich quick" investment. Instead, it is often used as a long-term wealth preservation tool.
                  </p>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Many investors hold gold for years or even decades.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 4: How Much Gold Should You Invest In? */}
          <Reveal>
            <div className="glass-dark p-8 text-white rounded-3xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(244,208,63,0.3), transparent 65%)" }} />
              <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
                <div className="space-y-4">
                  <span className="eyebrow-tag" style={{ color: "var(--gold-bright)" }}>Allocation Guide</span>
                  <h2 className="text-display text-3xl font-bold">How Much Gold Should You Invest In?</h2>
                  <p className="text-sm text-white/80 leading-relaxed">
                    There is no one-size-fits-all answer. Many financial planners suggest allocating approximately <strong className="text-amber-300">5% to 15%</strong> of an investment portfolio to gold, depending on individual goals, risk tolerance, and financial situation.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3">
                  <span className="text-xs text-white/50 uppercase tracking-wider block">Key Factors:</span>
                  <ul className="space-y-1.5 text-xs text-white/90">
                    <li>• Your age & timeline</li>
                    <li>• Income level & stability</li>
                    <li>• Financial goals</li>
                    <li>• Existing investments</li>
                    <li>• Risk appetite</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 5: Common Mistakes Beginners Make */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Common Mistakes Beginners Make</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Investing Only in Gold",
                    desc: "Gold is an important asset, but it should generally be part of a diversified investment strategy. Relying entirely on gold may limit overall growth opportunities.",
                  },
                  {
                    title: "Buying Jewelry as an Investment",
                    desc: "While jewelry contains gold, making charges and design costs reduce its investment efficiency. Coins, bars, digital gold, ETFs, or bonds are often better investment-focused options.",
                  },
                  {
                    title: "Trying to Time the Market",
                    desc: "Many beginners wait endlessly for the 'perfect' price. Instead, investing regularly over time can help reduce the impact of short-term price fluctuations.",
                  },
                  {
                    title: "Ignoring Investment Goals",
                    desc: "Before investing, clarify: Why am I investing? How long do I plan to invest? What financial goal am I trying to achieve? Clear goals help make better decisions.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-rose-500" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Section 6: Tips for First-Time Gold Investors */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Tips for First-Time Gold Investors</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-amber-300/30 bg-amber-500/[0.03] p-6 space-y-3">
                  <h3 className="font-semibold text-lg text-amber-800">Start Small</h3>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    You do not need a large amount of money to begin investing in gold. Starting small allows you to learn while gradually building your investment.
                  </p>
                </div>
                <div className="rounded-2xl border border-amber-300/30 bg-amber-500/[0.03] p-6 space-y-3">
                  <h3 className="font-semibold text-lg text-amber-800">Invest Consistently</h3>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    Regular investments can help build discipline and reduce the impact of market volatility. Consider setting up SIPs.
                  </p>
                </div>
                <div className="rounded-2xl border border-amber-300/30 bg-amber-500/[0.03] p-6 space-y-3">
                  <h3 className="font-semibold text-lg text-amber-800">Think Long Term</h3>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    Gold is built for decades. Focus on long-term wealth protection and asset security rather than short-term price swings.
                  </p>
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
                Start your gold journey.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">
                Put the principles into action. Build your safe-haven buffer starting from just ₹100.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link to="/sip-calculator" className="btn-gold btn-gold-hover inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold">
                  Try SIP Calculator <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a href="mailto:info@gallantventures.in" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs font-semibold text-white hover:bg-white/10 transition-colors">
                  Contact Advisor
                </a>
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
