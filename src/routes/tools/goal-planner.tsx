import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { GoalPlanner } from "@/components/site/GoalPlanner";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/tools/goal-planner")({
  head: () => ({
    meta: [
      { title: "Goal Planner | Fingold" },
      {
        name: "description",
        content:
          "Plan your financial goals with digital gold investments. Estimate required SIP and gold weight accumulation with Fingold's Goal Planner.",
      },
    ],
  }),
  component: GoalPlannerPage,
});

function GoalPlannerPage() {
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
              <span className="eyebrow-tag">Goal Planner</span>
              <span className="h-px w-10 bg-foreground/30" />
            </div>
            <h1 className="mt-6 text-display text-[clamp(2.25rem,5vw,3.75rem)]">
              Gold <span className="text-gold-gradient">Goal Planner.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/60 sm:text-lg">
              Map your life goals to gold investments. Calculate the starting monthly SIP needed to
              secure your target value.
            </p>
          </Reveal>
        </section>

        {/* Goal Planner Component */}
        <section className="mx-auto max-w-7xl">
          <Reveal delay={100}>
            <GoalPlanner />
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <Footer className="print:hidden" />
    </div>
  );
}
