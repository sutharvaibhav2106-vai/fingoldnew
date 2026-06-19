import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import {
  ArrowLeft,
  Coins,
  ShieldCheck,
  TrendingUp,
  History,
  AlertTriangle,
  ArrowRight,
  Layers,
  Sparkles,
  HelpCircle,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/gold-and-inflation")({
  head: () => ({
    meta: [
      { title: "Gold and Inflation — FINGOLD" },
      {
        name: "description",
        content:
          "Why gold shines when currencies weaken. Learn how gold acts as an inflation hedge and how to include it in your financial plan.",
      },
    ],
  }),
  component: GoldAndInflationPage,
});

function GoldAndInflationPage() {
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
              <span className="eyebrow-tag">Macroeconomics</span>
              <span className="h-px w-8 bg-foreground/30" />
              <span className="rounded-full bg-amber-500/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                Macro
              </span>
              <span className="text-xs text-foreground/50">· 5 Min Read</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
              Gold and Inflation: Why Gold <span className="text-gold-gradient">Shines.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-foreground/75 leading-relaxed font-sans max-w-3xl">
              Understand the long-standing relationship between rising cost-of-living index,
              weakening fiat currencies, and gold's role as a shield for your wealth.
            </p>
          </Reveal>
        </section>

        {/* Article Body */}
        <section className="mx-auto max-w-4xl space-y-16">
          {/* Section 1: Introduction */}
          <Reveal delay={150}>
            <div className="space-y-6 text-foreground/80 leading-relaxed text-base">
              <p>
                Have you ever noticed that the price of everyday things seems to rise over time?
              </p>
              <p>
                The cup of tea that once cost ₹10 now costs ₹20. A movie ticket that was ₹100 a few
                years ago may now cost ₹300. Even groceries, fuel, and housing become more expensive
                as the years pass.
              </p>

              {/* Highlight box */}
              <div className="glass-light p-6 rounded-2xl border border-border/30 my-6">
                <p className="font-semibold text-foreground">
                  This gradual increase in prices is called{" "}
                  <span className="text-amber-700">inflation</span>.
                </p>
                <p className="text-sm text-foreground/70 mt-2">
                  Inflation affects everyone because it reduces the purchasing power of money. In
                  simple terms, the same amount of money buys fewer goods and services over time. If
                  inflation rises faster than your savings, your money slowly loses value. This is
                  one reason why investors around the world have historically turned to gold.
                </p>
              </div>

              <p>
                For thousands of years, gold has been viewed as a store of value. Unlike paper
                currencies, which can be printed in large quantities by governments and central
                banks, gold is limited in supply. It cannot simply be created whenever more is
                needed.
              </p>
              <p>
                Because of this scarcity, gold has often performed well during periods when
                currencies weaken and inflation rises.
              </p>

              {/* Quote Wrapper */}
              <div className="glass-dark p-6 rounded-3xl border border-border/40 text-white my-6">
                <p className="text-sm text-white/90 leading-relaxed font-sans italic">
                  "Many investors don't buy gold because they expect to become rich overnight.
                  Instead, they buy it as a way to help preserve wealth when the value of money is
                  being eroded by inflation."
                </p>
              </div>

              <p>
                Understanding this relationship between gold and inflation can help investors make
                smarter long-term financial decisions.
              </p>
            </div>
          </Reveal>

          {/* Section 2: Why Inflation Makes Investors Turn to Gold */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">
                  Why Inflation Makes Investors Turn to Gold
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Imagine you keep <strong>₹1,00,000</strong> in cash under your mattress for ten
                years. If inflation averages 6% per year, the purchasing power of that money
                gradually declines. While the number on the currency notes remains the same, what
                those notes can actually buy becomes significantly less.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                This is where gold becomes attractive. Gold has intrinsic value and is recognized
                worldwide. Whether you're in India, the United States, Europe, or the Middle East,
                gold is accepted as a valuable asset.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                When people begin losing confidence in the purchasing power of their currency, they
                often move part of their wealth into gold. As more investors do this, demand for
                gold increases, which can push prices higher.
              </p>

              {/* Case Study: The 1970s */}
              <div className="rounded-3xl border border-amber-300/30 bg-amber-500/[0.03] p-8 flex gap-6 items-start mt-6">
                <History className="h-8 w-8 text-amber-600 shrink-0 mt-1" />
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block">
                    A Look Back at the 1970s
                  </span>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    One of the most famous examples of gold's relationship with inflation occurred
                    during the 1970s. The decade was marked by rising oil prices, economic
                    uncertainty, and high inflation across many countries.
                  </p>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    In the United States, inflation reached double-digit levels during parts of the
                    decade. As the purchasing power of the dollar declined, investors searched for
                    assets that could protect their wealth.
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Gold responded dramatically: At the beginning of the 1970s, gold traded at
                    around $35 per ounce. By 1980, it had surged to over $800 per ounce.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Section 3: How Gold Works as an Inflation Hedge */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">How Gold Works as an Inflation Hedge</h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Gold is often described as an "inflation hedge" — which simply means that gold has
                historically helped protect wealth during periods when inflation reduces the value
                of cash.
              </p>

              {/* Case Example comparison */}
              <div className="grid gap-6 sm:grid-cols-2 mt-6">
                <div className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-foreground/45">
                    Rahul (Holding Cash)
                  </span>
                  <h4 className="font-semibold text-base text-rose-700">
                    ₹1,00,000 kept in cash in 2010
                  </h4>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    Over time, inflation increased the prices of goods. While Rahul's cash remained
                    the same numeric amount, its real purchasing power gradually declined, buying
                    much less.
                  </p>
                </div>
                <div className="rounded-2xl border border-amber-300/30 bg-amber-500/[0.02] p-6 space-y-3">
                  <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">
                    Amit (Investing in Gold)
                  </span>
                  <h4 className="font-semibold text-base text-emerald-700">
                    ₹1,00,000 partly put in gold in 2010
                  </h4>
                  <p className="text-xs text-foreground/75 leading-relaxed">
                    Amit's gold investment experienced short-term price fluctuations. However, over
                    the long term, it had the potential to reflect the increasing value investors
                    placed on hard assets.
                  </p>
                </div>
              </div>

              <p className="text-xs text-foreground/60 italic mt-4">
                * Gold doesn't always rise every year. In fact, there can be years when gold prices
                fall even while inflation exists. However, over long periods of economic
                uncertainty, gold has repeatedly demonstrated its ability to preserve purchasing
                power better than holding cash alone.
              </p>
            </div>
          </Reveal>

          {/* Section 4: Gold During the 2008 Financial Crisis */}
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] items-center p-8 rounded-3xl border border-border/40 bg-background/40">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <h3 className="font-semibold text-lg text-foreground">
                    Gold During the 2008 Financial Crisis
                  </h3>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  The collapse of major financial institutions in 2008 created panic across global
                  markets. Stock markets fell sharply. In response, governments introduced massive
                  economic stimulus programs and increased money supply.
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  These actions raised concerns about future inflation and currency weakness. As
                  uncertainty increased, many turned to gold as a safe-haven asset, climbing
                  significantly in the years following the crisis.
                </p>
              </div>
              <div className="rounded-2xl bg-amber-500/10 border border-amber-300/25 p-5 text-center">
                <span className="text-display text-3xl text-amber-800"> Refuge </span>
                <p className="text-xs text-foreground/70 mt-2">
                  The 2008 crisis reinforced that gold is not only viewed as protection against
                  inflation but also as a potential refuge during periods of financial stress.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Section 5: Benefits of Owning Gold During Inflation */}
          <Reveal>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Coins className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Benefits of Owning Gold During Inflation</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[
                  {
                    title: "Preserves Purchasing Power",
                    desc: "Gold has historically maintained value over long periods, preserving your ability to buy goods and services.",
                  },
                  {
                    title: "Global Acceptance",
                    desc: "Gold is recognized and valued worldwide. Its value isn't tied to the economic performance of a single country.",
                  },
                  {
                    title: "Diversifies Your Portfolio",
                    desc: "Stocks, bonds, and gold behave differently. When inflation creates uncertainty, gold provides balance.",
                  },
                  {
                    title: "Economic Refuge",
                    desc: "Gold has a long history of attracting investors during times of crisis, high inflation, and market volatility.",
                  },
                  {
                    title: "Limited Supply",
                    desc: "Gold is naturally scarce. Because it cannot be printed or created at will, it remains a reliable store of value.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-light rounded-2xl p-5 flex flex-col justify-between border border-border/30"
                  >
                    <h4 className="font-semibold text-sm text-foreground mb-2">{item.title}</h4>
                    <p className="text-xs text-foreground/75 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Section 6: Investment Strategies for Using Gold Against Inflation */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-amber-600" />
                <h2 className="text-display text-2xl">Investment Strategies</h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Allocate 5%–15%",
                    desc: "Instead of putting all your money in gold, use it as a supporting asset within a diversified portfolio. Allocating between 5% and 15% provides balance.",
                  },
                  {
                    title: "Invest Regularly",
                    desc: "Consider investing consistently (e.g. ₹2,000 every month in digital gold or Gold ETFs) to average out the purchase cost and reduce the impact of short-term swings.",
                  },
                  {
                    title: "Combine Assets",
                    desc: "Think of gold as a financial safety net rather than your only investment. Combine it with long-term equities, mutual funds, and fixed-income investments.",
                  },
                  {
                    title: "Think Long-Term",
                    desc: "Short-term gold prices fluctuate. Investors who view gold as a long-term wealth-preservation tool benefit much more than those trying to trade short swings.",
                  },
                  {
                    title: "Choose the Right Form",
                    desc: "Choose from physical, digital, ETFs, mutual funds, or Sovereign Gold Bonds. For beginners, Gold ETFs and Digital Gold are simple starting points since they require no storage.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/30 bg-background/30 p-6 space-y-2"
                  >
                    <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Section 7: Final Thoughts */}
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-display text-2xl">Final Thoughts</h2>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                Inflation is an unavoidable part of modern economies. As prices rise and currencies
                gradually lose purchasing power, protecting wealth becomes increasingly important.
              </p>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                Throughout history, gold has played a unique role during these periods. From the
                high-inflation environment of the 1970s to the uncertainty of the 2008 financial
                crisis, gold has repeatedly attracted investors seeking stability and long-term
                value preservation.
              </p>

              {/* Summary Conclusion Box */}
              <div className="rounded-2xl bg-amber-500/10 border border-amber-300/30 p-6">
                <p className="text-sm text-foreground/85 font-semibold">
                  While gold is not a guaranteed solution and its price can fluctuate, its
                  historical relationship with inflation makes it an important asset to consider in
                  a well-balanced portfolio. For investors looking to protect purchasing power, gold
                  continues to shine when currencies weaken.
                </p>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-foreground/50 italic leading-relaxed pt-4 border-t border-border/20">
                Disclaimer: This article is for educational purposes only and is not financial
                advice. Investment values can rise or fall, and past performance does not guarantee
                future results.
              </p>
            </div>
          </Reveal>
        </section>

        {/* BOTTOM CTA */}
        <section className="mx-auto max-w-4xl mt-24">
          <Reveal>
            <div className="glass-dark relative overflow-hidden p-8 text-center text-white sm:p-12">
              <span className="eyebrow-tag" style={{ color: "var(--gold-bright)" }}>
                Begin Building Safety Net
              </span>
              <h2 className="text-display text-2xl sm:text-4xl mt-4">Hedge against inflation.</h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">
                Start a regular monthly SIP to build your gold buffer automatically.
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link
                  to="/sip-calculator"
                  className="btn-gold btn-gold-hover btn-shine inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold"
                >
                  SIP Calculator <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/lumpsum-calculator"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Lump Sum Calculator
                </Link>
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
                  href="mailto:fingoldgdm@gmail.com"
                  className="flex items-center gap-2 hover:text-foreground"
                >
                  <Mail className="h-4 w-4" style={{ color: "var(--bronze)" }} />
                  fingoldgdm@gmail.com
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

