import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { LumpsumCalculator } from "@/components/site/LumpsumCalculator";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/lumpsum-calculator")({
  head: () => ({
    meta: [
      { title: "Gold Lumpsum Calculator — FINGOLD" },
      {
        name: "description",
        content:
          "Calculate and project returns for your one-time gold investment. Model SGB, ETF and digital gold compound growth with precision using Fingold's lumpsum calculator.",
      },
    ],
  }),
  component: LumpsumCalculatorPage,
});

function LumpsumCalculatorPage() {
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
              <span className="eyebrow-tag">Planning</span>
              <span className="h-px w-10 bg-foreground/30" />
            </div>
            <h1 className="mt-6 text-display text-[clamp(2.25rem,5vw,3.75rem)]">
              Gold <span className="text-gold-gradient">Lumpsum Calculator.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/60 sm:text-lg">
              Calculate the value of your one-time investment and see the compound growth of your
              wealth in fine gold over time.
            </p>
          </Reveal>
        </section>

        {/* Calculator Component */}
        <section className="mx-auto max-w-7xl">
          <Reveal delay={100}>
            <LumpsumCalculator />
          </Reveal>
        </section>

        {/* Info & Educational Content */}
        <section className="mx-auto max-w-4xl mt-24 space-y-8 text-foreground/85">
          <Reveal delay={150}>
            <h2 className="text-display text-2xl font-bold">
              Why choose a Gold Lumpsum Investment?
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/30 bg-background/30 p-6">
                <h3 className="font-semibold text-lg">Compound Growth</h3>
                <p className="text-sm text-foreground/70 mt-2">
                  Investing a single lump sum allows your entire principal to appreciate from day
                  one. Compound returns benefit from the full duration of your investment timeline.
                </p>
              </div>
              <div className="rounded-2xl border border-border/30 bg-background/30 p-6">
                <h3 className="font-semibold text-lg">Portfolio Diversification</h3>
                <p className="text-sm text-foreground/70 mt-2">
                  Instantly stabilize your portfolio during periods of high inflation or stock
                  market volatility by allocating a significant portion of idle capital directly to
                  gold.
                </p>
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
