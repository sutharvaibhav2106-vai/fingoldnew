import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import goldBar from "@/assets/gold-bar-hero.jpg";
import {
  ShieldCheck,
  TrendingUp,
  PieChart,
  Droplets,
  Globe2,
  Anchor,
  Coins,
  Smartphone,
  LineChart,
  Landmark,
  Wallet,
  Factory,
  Activity,
  Lock,
  Tag,
  Zap,
  Settings2,
  BookOpen,
  Calculator,
  Target,
  Sparkles,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  ArrowUpRight,
  Check,
  Quote,
  UserPlus,
  ShoppingBag,
  TrendingDown,
  Minus,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FINGOLD — Invest in Gold, Secure Your Future" },
      {
        name: "description",
        content:
          "Premium gold investment platform. Buy digital gold, ETFs, SGBs and physical gold. Simple, secure, and accessible wealth building with Fingold.",
      },
      { property: "og:title", content: "FINGOLD — Invest in Gold, Secure Your Future" },
      { property: "og:description", content: "Premium gold investment platform — buy, save, grow and redeem gold with confidence." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const whyGold = [
  { icon: ShieldCheck, title: "Inflation Shield", desc: "Holds value as currencies lose purchasing power." },
  { icon: TrendingUp, title: "Wealth Preservation", desc: "Compounds across generations and cycles." },
  { icon: PieChart, title: "Diversification", desc: "Low correlation with stocks and bonds." },
  { icon: Droplets, title: "Liquidity", desc: "Convert to cash anywhere, anytime." },
  { icon: Globe2, title: "Global Acceptance", desc: "A universal, borderless store of value." },
  { icon: Anchor, title: "Safe Haven", desc: "A hedge during shocks and uncertainty." },
];

const options = [
  { icon: Coins, title: "Physical Gold", includes: ["Coins", "Bars", "Jewelry"], benefits: ["Tangible asset", "Long-term storage", "Inheritable"] },
  { icon: Smartphone, title: "Digital Gold", benefits: ["Start from ₹100", "Buy & sell anytime", "Insured storage", "Online instant"] },
  { icon: LineChart, title: "Gold ETFs", benefits: ["High liquidity", "Zero storage", "Transparent pricing", "Easy diversification"] },
  { icon: Landmark, title: "Sovereign Gold Bonds", benefits: ["Govt-backed", "Interest income", "No storage cost", "Long-term wealth"] },
  { icon: Wallet, title: "Gold Mutual Funds", benefits: ["Pro management", "No demat needed", "SIP enabled"] },
  { icon: Factory, title: "Gold Mining Stocks", benefits: ["Higher upside", "Industry exposure"] },
  { icon: Activity, title: "Futures & Options", benefits: ["Trading edge", "Portfolio hedge"], risk: "High" },
];

const whyChoose = [
  { icon: Lock, title: "Secure", desc: "Bank-grade encryption, insured vaults." },
  { icon: Tag, title: "Transparent", desc: "Live rates, no hidden charges." },
  { icon: Zap, title: "Instant", desc: "Buy, sell, redeem in seconds." },
  { icon: Settings2, title: "Flexible", desc: "From ₹100 SIPs to bullion bars." },
  { icon: BookOpen, title: "Expert Insights", desc: "Research from gold strategists." },
];

const tools = [
  { icon: Calculator, title: "Gold SIP Calculator", desc: "Project monthly investment value.", href: "/sip-calculator" },
  { icon: Coins, title: "Lump Sum Calculator", desc: "See one-time growth over time.", href: "/lumpsum-calculator" },
  { icon: Target, title: "Goal Planner", desc: "Map life goals to gold." },
  { icon: TrendingUp, title: "Future Value", desc: "Forecast portfolio worth." },
];

const learn = [
  { tag: "Beginner", title: "Beginner's Guide to Gold Investing", desc: "Start your first gold investment with confidence.", href: "/beginners-guide" },
  { tag: "Compare", title: "Digital Gold vs Physical Gold", desc: "Which form fits your goals best?", href: "/digital-vs-physical-gold" },
  { tag: "Markets", title: "Gold ETFs Explained", desc: "How exchange-traded gold works." },
  { tag: "Bonds", title: "Sovereign Gold Bonds Guide", desc: "Earn interest while owning gold." },
  { tag: "Macro", title: "Gold and Inflation", desc: "Why gold shines when currencies weaken." },
  { tag: "Tax", title: "Gold Investment Taxation", desc: "A clear breakdown across instruments." },
];

const faqs = [
  { q: "What is Digital Gold?", a: "Digital Gold lets you buy and own gold online — backed by physical gold stored in insured vaults — without handling it yourself." },
  { q: "Can I start with a small amount?", a: "Yes. Fingold supports investments starting from as little as ₹100, with daily or monthly SIPs." },
  { q: "Is gold a safe investment?", a: "Gold is regarded as a reliable long-term wealth preservation asset and a proven hedge in uncertain markets." },
  { q: "Can I sell my gold anytime?", a: "Most Fingold instruments offer same-day liquidity at live market prices, with funds settled to your bank in 24h." },
];

const ticker = [
  { sym: "GOLD 24K", price: "₹ 7,412 /g", chg: "+0.84%", up: true },
  { sym: "GOLD 22K", price: "₹ 6,793 /g", chg: "+0.81%", up: true },
  { sym: "SILVER", price: "₹ 92.4 /g", chg: "-0.22%", up: false },
  { sym: "USD/INR", price: "83.12", chg: "+0.06%", up: true },
  { sym: "SGB 2032", price: "₹ 6,128", chg: "+1.12%", up: true },
  { sym: "GOLDBEES", price: "₹ 71.20", chg: "+0.93%", up: true },
];

const steps = [
  { n: "01", icon: UserPlus, title: "Open Account", desc: "Sign up in 60 seconds with PAN & Aadhaar. Zero paperwork." },
  { n: "02", icon: ShoppingBag, title: "Choose Your Gold", desc: "Pick digital gold, ETFs, SGBs, mutual funds — or physical bullion." },
  { n: "03", icon: TrendingUp, title: "Grow & Redeem", desc: "Track in real time. Redeem to cash or doorstep delivery, anytime." },
];

const testimonials = [
  { name: "Arjun Mehta", role: "Founder, Helix Studios", quote: "Fingold made gold feel as easy as a stock trade. The dashboard alone is worth it." },
  { name: "Priya Iyer", role: "Wealth Advisor", quote: "I move client allocations through Fingold weekly. Transparent pricing, instant settlement." },
  { name: "Rohit Shah", role: "Family Office", quote: "We hold bullion, SGBs and ETFs in one view. It replaced three of our legacy tools." },
];

const compareRows = [
  { f: "Min. Investment", a: "₹100", b: "10g+ bar", c: "₹500", d: "Govt set" },
  { f: "Liquidity", a: "Instant", b: "Days", c: "Same-day", d: "5+ years" },
  { f: "Storage", a: "Insured vault", b: "Self / locker", c: "Demat", d: "Demat / paper" },
  { f: "Interest", a: "—", b: "—", c: "—", d: "2.5% p.a." },
  { f: "Best For", a: "Beginners", b: "Long-term", c: "Active investors", d: "Steady income" },
];

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-noise">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(244,208,63,0.32), transparent 65%)" }} />
      <div className="pointer-events-none absolute top-[40%] -left-40 h-[500px] w-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.22), transparent 65%)" }} />

      <Nav />

      <main className="pt-28">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="eyebrow-tag">Est. 2025 — Bullion Grade</span>
                  <span className="h-px w-16 bg-foreground/20" />
                </div>
                <h1 className="text-display text-[clamp(3rem,8.5vw,7.5rem)]">
                  Invest in
                  <br />
                  <span className="text-gold-gradient">Gold.</span>
                  <span className="italic font-light text-foreground/85"> Quietly</span>
                  <br />
                  <span className="italic font-light text-foreground/85">build wealth.</span>
                </h1>
                <p className="max-w-lg text-base leading-relaxed text-foreground/65 sm:text-lg">
                  A wealth platform engineered around a single, timeless asset.
                  Buy, save, grow and redeem gold — with the precision of private banking.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="#cta" className="btn-gold btn-gold-hover btn-shine inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold">
                    Start Investing <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#options" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/60">
                    Explore options
                  </a>
                </div>
                <dl className="hairline-t grid max-w-xl grid-cols-3 gap-3 sm:gap-6 pt-8">
                  {[
                    { v: "₹10Cr+", l: "AUM" },
                    { v: "25,000+", l: "Investors" },
                    { v: "99.99%", l: "Vault Purity" },
                  ].map((s) => (
                    <div key={s.l}>
                      <dt className="text-display text-2xl sm:text-4xl">{s.v}</dt>
                      <dd className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-foreground/55">{s.l}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative mx-auto aspect-square w-full max-w-[560px]">
                <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 60% 40%, rgba(244,208,63,0.45), transparent 60%)" }} />
                <img
                  src={goldBar}
                  alt="FINGOLD 999.9 fine gold investment bar"
                  width={1024}
                  height={1024}
                  className="float-y relative z-10 mx-auto w-[88%] drop-shadow-2xl"
                  style={{ filter: "drop-shadow(0 40px 60px rgba(180,130,30,0.45))" }}
                />
                <div className="glass-dark absolute -bottom-4 left-0 right-4 z-20 p-6 sm:right-8 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">Live · 999.9</span>
                    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--gold-bright)" }}>
                      <TrendingUp className="h-3.5 w-3.5" /> +0.84%
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-display text-4xl text-white">₹7,412</span>
                    <span className="text-sm text-white/55">/ gram</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] text-white/70">
                    <div><span className="block text-white/45">24h H</span>7,438</div>
                    <div><span className="block text-white/45">24h L</span>7,361</div>
                    <div><span className="block text-white/45">Vol</span>2.4K kg</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TICKER */}
        <section className="hairline-t hairline-b relative overflow-hidden bg-foreground/[0.03] py-5">
          <div className="marquee flex w-max gap-12 whitespace-nowrap">
            {[...ticker, ...ticker].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="eyebrow-tag">{t.sym}</span>
                <span className="font-display text-base font-semibold">{t.price}</span>
                <span className={`flex items-center gap-1 text-xs font-semibold ${t.up ? "text-emerald-700" : "text-rose-700"}`}>
                  {t.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {t.chg}
                </span>
                <span className="h-1 w-1 rounded-full bg-foreground/25" />
              </div>
            ))}
          </div>
        </section>

        {/* WHY GOLD */}
        <section id="why" className="mx-auto max-w-7xl px-4 py-24 sm:py-32">
          <Reveal>
            <SectionHeader eyebrow="Fundamentals" title="Why gold, still." sub="Six reasons gold anchors the world's wealthiest portfolios." />
          </Reveal>
          <div className="mt-16 grid divide-y divide-border/40 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3">
            {whyGold.map((c, i) => (
              <Reveal key={c.title} delay={i * 50}>
                <article className="group h-full p-8 transition-colors hover:bg-foreground/[0.03]">
                  <div className="flex items-start justify-between">
                    <c.icon className="h-7 w-7" style={{ color: "var(--bronze)" }} />
                    <span className="eyebrow-tag">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-display text-2xl">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">{c.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-7xl px-4 py-24">
          <Reveal>
            <SectionHeader eyebrow="The Process" title="Three steps to gold." sub="No paperwork. No friction. Just precision." />
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-border/40 bg-background/40 p-8 transition-colors hover:border-foreground/40">
                  <span className="text-display absolute -right-4 -top-8 text-[10rem] leading-none text-foreground/[0.05]">
                    {s.n}
                  </span>
                  <s.icon className="h-8 w-8" style={{ color: "var(--bronze)" }} />
                  <h3 className="mt-8 text-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* INVESTMENT OPTIONS */}
        <section id="options" className="mx-auto max-w-7xl px-4 py-24">
          <Reveal>
            <SectionHeader eyebrow="Portfolio" title="Seven ways to own gold." sub="From bullion to bonds — pick your strategy." />
          </Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((o, i) => (
              <Reveal key={o.title} delay={i * 50}>
                <article className="glass-dark card-lift relative h-full p-7 text-white">
                  <div className="flex items-center justify-between">
                    <o.icon className="h-7 w-7" style={{ color: "var(--gold-bright)" }} />
                    {o.risk && (
                      <span className="rounded-full border border-amber-300/40 px-3 py-1 text-[10px] font-semibold tracking-wider text-amber-200">
                        Risk · {o.risk}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-8 text-display text-2xl">{o.title}</h3>
                  {o.includes && (
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/45">
                      {o.includes.join(" · ")}
                    </p>
                  )}
                  <ul className="mt-5 space-y-2">
                    {o.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-white/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold-bright)" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href="#cta" className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--gold-bright)" }}>
                    Invest <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* COMPARE */}
        <section className="mx-auto max-w-7xl px-4 py-24">
          <Reveal>
            <SectionHeader eyebrow="Decisions" title="Compare instruments." sub="One table, four pathways. Pick what fits." />
          </Reveal>
          <Reveal delay={120}>
            <div className="glass-light mt-14 overflow-hidden rounded-3xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[600px]">
                  <thead>
                    <tr className="hairline-b">
                      <th className="px-6 py-5 eyebrow-tag">Feature</th>
                      <th className="px-6 py-5 text-display text-lg">Digital Gold</th>
                      <th className="px-6 py-5 text-display text-lg">Physical</th>
                      <th className="px-6 py-5 text-display text-lg">ETF</th>
                      <th className="px-6 py-5 text-display text-lg">SGB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((r, i) => (
                      <tr key={r.f} className={i !== compareRows.length - 1 ? "border-b border-border/30" : ""}>
                        <td className="px-6 py-5 font-semibold text-foreground/80">{r.f}</td>
                        <td className="px-6 py-5 text-foreground/75">{r.a}</td>
                        <td className="px-6 py-5 text-foreground/75">{r.b}</td>
                        <td className="px-6 py-5 text-foreground/75">{r.c}</td>
                        <td className="px-6 py-5 text-foreground/75">{r.d === "—" ? <Minus className="h-4 w-4 text-foreground/40" /> : r.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </section>

        {/* WHY CHOOSE */}
        <section className="mx-auto max-w-7xl px-4 py-24">
          <Reveal>
            <SectionHeader eyebrow="The Fingold Edge" title="Engineered for trust." sub="Five commitments behind every transaction." />
          </Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {whyChoose.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <article className="h-full rounded-3xl border border-border/40 bg-background/40 p-6 transition-all hover:border-foreground/40 hover:bg-foreground/[0.03]">
                  <c.icon className="h-6 w-6" style={{ color: "var(--bronze)" }} />
                  <h3 className="mt-6 text-display text-xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-foreground/65">{c.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TOOLS */}
        <section id="tools" className="mx-auto max-w-7xl px-4 py-24">
          <Reveal>
            <SectionHeader eyebrow="Plan" title="Tools & Calculators" sub="Model every gold scenario in seconds." />
          </Reveal>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t, i) => {
              const CardContent = (
                <article className="group h-full rounded-3xl border border-border/40 bg-background/40 p-7 transition-all hover:-translate-y-1 hover:border-foreground/40 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <t.icon className="h-7 w-7" style={{ color: "var(--bronze)" }} />
                    <ArrowUpRight className="h-5 w-5 text-foreground/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
                  </div>
                  <h3 className="mt-10 text-display text-xl">{t.title}</h3>
                  <p className="mt-2 text-sm text-foreground/65">{t.desc}</p>
                </article>
              );
              return (
                <Reveal key={t.title} delay={i * 70}>
                  {t.href ? (
                    <Link to={t.href} className="block h-full">
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-4 py-24">
          <Reveal>
            <SectionHeader eyebrow="Voices" title="Quietly trusted." sub="Founders, advisors and family offices on Fingold." />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="glass-light flex h-full flex-col rounded-3xl p-8">
                  <Quote className="h-8 w-8" style={{ color: "var(--gold-deep)" }} />
                  <blockquote className="mt-6 flex-1 text-display text-xl leading-snug text-foreground/85">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="hairline-t mt-8 flex items-center justify-between pt-5">
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-foreground/55">{t.role}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5 fill-current" style={{ color: "var(--gold)" }} />
                      ))}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* LEARN */}
        <section id="learn" className="mx-auto max-w-7xl px-4 py-24">
          <Reveal>
            <SectionHeader eyebrow="Knowledge" title="Learn with Fingold." sub="Deep-dive guides written by gold strategists." />
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learn.map((l, i) => {
              const CardContent = (
                <article className="group h-full overflow-hidden rounded-3xl border border-border/40 bg-background/40 transition-all hover:border-foreground/40 cursor-pointer">
                  <div className="relative h-44 overflow-hidden" style={{ background: "var(--gradient-gold-shine)", backgroundSize: "200% auto", animation: "gold-shine 10s linear infinite" }}>
                    <div className="absolute inset-0 grid place-items-center">
                      <Coins className="h-14 w-14 text-[#1B1B1B]/25" />
                    </div>
                    <span className="absolute left-5 top-5 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                      {l.tag}
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-display text-xl">{l.title}</h3>
                    <p className="mt-3 text-sm text-foreground/65">{l.desc}</p>
                    <div className="hairline-t mt-6 flex items-center justify-between pt-4">
                      <span className="text-xs uppercase tracking-[0.18em] text-foreground/50">5 min read</span>
                      <ArrowUpRight className="h-5 w-5 text-foreground/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
                    </div>
                  </div>
                </article>
              );
              return (
                <Reveal key={l.title} delay={i * 60}>
                  {l.href ? (
                    <Link to={l.href} className="block h-full">
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-4xl px-4 py-24">
          <Reveal>
            <SectionHeader eyebrow="Answers" title="Common questions." sub="Quick clarity on what investors ask most." />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-14 rounded-3xl border border-border/40 bg-background/40 px-4 py-2 sm:px-10">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-border/30 last:border-0">
                    <AccordionTrigger className="py-6 text-left text-display text-lg hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-base text-foreground/70">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section id="cta" className="mx-auto max-w-6xl px-4 py-24">
          <Reveal>
            <div className="glass-dark relative overflow-hidden px-6 py-12 text-center text-white sm:p-20">
              <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(244,208,63,0.5), transparent 65%)" }} />
              <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.4), transparent 65%)" }} />
              <span className="eyebrow-tag relative" style={{ color: "var(--gold-bright)" }}>Begin</span>
              <h2 className="relative mt-6 text-display text-[clamp(2.5rem,6vw,5rem)]">
                Your gold journey.
                <br />
                <span className="text-gold-gradient">Starts here.</span>
              </h2>
              <p className="relative mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg">
                Invest smart. Invest in gold. Invest with Fingold.
              </p>
              <div className="relative mt-10 flex flex-wrap justify-center gap-4">
                <a href="mailto:info@gallantventures.in" className="btn-gold btn-gold-hover btn-shine inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold">
                  Start Investing <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#footer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                  Contact Us
                </a>
              </div>
            </div>
          </Reveal>
        </section>

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
                    <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full border border-border/50 transition-colors hover:border-foreground/60">
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
      </main>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-foreground/30" />
        <span className="eyebrow-tag">{eyebrow}</span>
      </div>
      <h2 className="mt-6 text-display text-[clamp(2.25rem,5vw,4rem)]">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base text-foreground/60 sm:text-lg">{sub}</p>
    </div>
  );
}
