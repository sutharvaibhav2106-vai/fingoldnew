import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { FutureValueCalculator } from "@/components/site/FutureValueCalculator";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/tools/future-value")({
  head: () => ({
    meta: [
      { title: "Future Value Calculator | Fingold" },
      {
        name: "description",
        content:
          "Forecast the future value of your gold portfolio with compounding and inflation adjustments using Fingold's Future Value Calculator.",
      },
    ],
  }),
  component: FutureValueCalculatorPage,
});

function FutureValueCalculatorPage() {
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
        <section className="mx-auto max-w-7xl text-center mb-10 print:mb-4">
          <Reveal>
            <div className="flex justify-center items-center gap-3">
              <span className="h-px w-10 bg-foreground/30" />
              <span className="eyebrow-tag">Calculator</span>
              <span className="h-px w-10 bg-foreground/30" />
            </div>
            <h1 className="mt-6 text-display text-[clamp(2.25rem,5vw,3.75rem)]">
              Gold <span className="text-gold-gradient">Future Value.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/60 sm:text-lg">
              Forecast your future gold portfolio worth. Estimate the total returns, capital growth,
              and real value adjusted for inflation.
            </p>
          </Reveal>
        </section>

        {/* Future Value Calculator Component */}
        <section className="mx-auto max-w-7xl">
          <Reveal delay={100}>
            <FutureValueCalculator />
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <Footer className="print:hidden" />
    </div>
  );
}
