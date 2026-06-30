import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { Footer } from "@/components/site/Footer";
import { Smartphone, ShieldCheck, Check } from "lucide-react";

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
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
