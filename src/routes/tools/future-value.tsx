import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { FutureValueCalculator } from "@/components/site/FutureValueCalculator";
import { Mail, Phone, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

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
      <footer id="footer" className="hairline-t pt-16 pb-10 print:hidden">
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

