import React, { useState, useMemo, useEffect } from "react";
import {
  Heart,
  Home,
  Car,
  GraduationCap,
  Compass,
  Calendar,
  HelpCircle,
  ArrowRight,
  Share2,
  Download,
  Sparkles,
  Target,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { toast } from "sonner";

interface GoalOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const GOAL_OPTIONS: GoalOption[] = [
  {
    id: "wedding",
    label: "Wedding",
    icon: Heart,
    description: "Save for a grand celebration or jewelry.",
  },
  {
    id: "house",
    label: "House",
    icon: Home,
    description: "Secure the down payment for your dream home.",
  },
  { id: "car", label: "Car", icon: Car, description: "Get the keys to your next vehicle." },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    description: "Fund higher education or study abroad.",
  },
  { id: "travel", label: "Travel", icon: Compass, description: "Plan a journey around the globe." },
  {
    id: "retirement",
    label: "Retirement",
    icon: Calendar,
    description: "Build a golden nest egg for peace of mind.",
  },
  {
    id: "other",
    label: "Other",
    icon: Target,
    description: "Define your own financial milestone.",
  },
];

export function GoalPlanner() {
  // Read state from URL query parameters if present for sharing
  const getInitialState = () => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return {
      goal: params.get("goal") || "wedding",
      customGoal: params.get("customGoal") || "",
      amount: params.get("amount") || "1000000",
      years: params.get("years") || "10",
      rate: params.get("rate") || "8",
      stepup: params.get("stepup") || "0",
      goldPrice: params.get("goldPrice") || "10000",
    };
  };

  const initial = getInitialState();

  const [selectedGoal, setSelectedGoal] = useState<string>(initial?.goal || "wedding");
  const [customGoal, setCustomGoal] = useState<string>(initial?.customGoal || "");
  const [targetAmount, setTargetAmount] = useState<string>(initial?.amount || "1000000");
  const [targetYears, setTargetYears] = useState<string>(initial?.years || "10");
  const [growthRate, setGrowthRate] = useState<string>(initial?.rate || "8");
  const [stepUp, setStepUp] = useState<string>(initial?.stepup || "0");
  const [goldPrice, setGoldPrice] = useState<string>(initial?.goldPrice || "10000");

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Formatter for Indian Rupee
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Format short values for chart axis
  const formatShortINR = (val: number) => {
    if (val >= 10000000) return (val / 10000000).toFixed(1) + "Cr";
    if (val >= 100000) return (val / 100000).toFixed(1) + "L";
    if (val >= 1000) return (val / 1000).toFixed(0) + "K";
    return val.toString();
  };

  // Inputs parsing and validation
  const parsedAmount = useMemo(() => {
    const num = parseInt(targetAmount) || 0;
    return Math.min(100000000, Math.max(10000, num));
  }, [targetAmount]);

  const parsedYears = useMemo(() => {
    const num = parseInt(targetYears) || 0;
    return Math.min(40, Math.max(1, num));
  }, [targetYears]);

  const parsedRate = useMemo(() => {
    const num = parseFloat(growthRate) || 0;
    return Math.min(20, Math.max(3, num));
  }, [growthRate]);

  const parsedStepUp = useMemo(() => {
    const num = parseFloat(stepUp) || 0;
    return Math.min(20, Math.max(0, num));
  }, [stepUp]);

  const parsedGoldPrice = useMemo(() => {
    const num = parseFloat(goldPrice) || 0;
    return Math.max(1000, num);
  }, [goldPrice]);

  // Goal Planner math logic
  const calculations = useMemo(() => {
    const FV = parsedAmount;
    const Y = parsedYears;
    const r = parsedRate / 12 / 100; // monthly rate
    const s = parsedStepUp / 100; // annual step-up rate

    // F12 = Future value factor of a 12-month standard SIP at end of year
    let F12 = 12;
    if (r > 0) {
      F12 = ((Math.pow(1 + r, 12) - 1) / r) * (1 + r);
    }

    const B = Math.pow(1 + r, 12);
    const A = 1 + s;

    let S = Y;
    if (Math.abs(A - B) > 1e-9) {
      S = (Math.pow(B, Y) - Math.pow(A, Y)) / (B - A);
    } else {
      S = Y * Math.pow(B, Y - 1);
    }

    // Required starting SIP
    const requiredSIP = S > 0 ? Math.ceil(FV / (F12 * S)) : 0;

    // Generate year-by-year details for charts and tables
    const yearlyData = [];
    let totalInvestedAcc = 0;

    for (let y = 1; y <= Y; y++) {
      // Annualized starting SIP for year y
      const currentYearSIP = requiredSIP * Math.pow(1 + s, y - 1);
      const yearInvestment = currentYearSIP * 12;
      totalInvestedAcc += yearInvestment;

      // Projected value at year y
      let valAtY = 0;
      let Sy = y;
      if (Math.abs(A - B) > 1e-9) {
        Sy = (Math.pow(B, y) - Math.pow(A, y)) / (B - A);
      } else {
        Sy = y * Math.pow(B, y - 1);
      }
      valAtY = requiredSIP * F12 * Sy;

      // Cap at target FV if it goes slightly over due to ceiling
      const projectedValue = y === Y ? FV : valAtY;
      const returns = Math.max(0, projectedValue - totalInvestedAcc);

      yearlyData.push({
        year: `${y} Yr`,
        "Invested Amount": Math.round(totalInvestedAcc),
        "Projected Value": Math.round(projectedValue),
        Returns: Math.round(returns),
      });
    }

    // Goal Probability check
    let probability: "Very High" | "High" | "Moderate" | "Low" = "Low";
    let badgeColor = "bg-rose-500/10 text-rose-700 border-rose-500/20";
    let progressColor = "bg-rose-500";
    let progressPercent = 25;

    if (requiredSIP < 5000) {
      probability = "Very High";
      badgeColor = "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      progressColor = "bg-emerald-500";
      progressPercent = 100;
    } else if (requiredSIP <= 15000) {
      probability = "High";
      badgeColor = "bg-teal-500/10 text-teal-700 border-teal-500/20";
      progressColor = "bg-teal-500";
      progressPercent = 75;
    } else if (requiredSIP <= 30000) {
      probability = "Moderate";
      badgeColor = "bg-amber-500/10 text-amber-700 border-amber-500/20";
      progressColor = "bg-amber-500";
      progressPercent = 50;
    }

    return {
      requiredSIP,
      totalInvested: totalInvestedAcc,
      futureValue: FV,
      probability,
      badgeColor,
      progressColor,
      progressPercent,
      yearlyData,
    };
  }, [parsedAmount, parsedYears, parsedRate, parsedStepUp]);

  const goldGrams = useMemo(() => {
    return parsedAmount / parsedGoldPrice;
  }, [parsedAmount, parsedGoldPrice]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("goal", selectedGoal);
      if (selectedGoal === "other" && customGoal) params.set("customGoal", customGoal);
      params.set("amount", targetAmount);
      params.set("years", targetYears);
      params.set("rate", growthRate);
      params.set("stepup", stepUp);
      params.set("goldPrice", goldPrice);

      const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

      if (navigator.share) {
        navigator
          .share({
            title: "Fingold - Goal Planner Result",
            text: `Check out my goal planning results on Fingold!`,
            url: shareUrl,
          })
          .catch((err) => {
            // If the user cancelled or it failed, don't show error toast, just fallback or do nothing
            if (err.name !== "AbortError") {
              navigator.clipboard.writeText(shareUrl);
              toast.success("Shareable link copied to clipboard!");
            }
          });
      } else {
        navigator.clipboard.writeText(shareUrl);
        toast.success("Shareable link copied to clipboard!");
      }
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      {/* Interactive Web UI (Hidden when printing) */}
      <div className="mx-auto max-w-7xl px-4 py-8 print:hidden">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border/40 bg-background/50 p-4 sm:p-10 shadow-soft backdrop-blur-xl">
          {/* Actions / Export Bar */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-foreground/80 hover:bg-foreground/[0.02] transition cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share Result
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-foreground/80 hover:bg-foreground/[0.02] transition cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </button>
          </div>

          {/* Goal Selection Banner */}
          <div className="mb-10">
            <p className="eyebrow-tag mb-4">1. Select your target goal</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
              {GOAL_OPTIONS.map((g) => {
                const IconComp = g.icon;
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition cursor-pointer ${
                      isSelected
                        ? "bg-[#F4D03F]/10 border-[#D4AF37] shadow-sm text-foreground"
                        : "bg-white/40 border-border/60 text-foreground/60 hover:bg-white/70 hover:border-foreground/20"
                    }`}
                  >
                    <IconComp
                      className={`h-6 w-6 mb-2 ${isSelected ? "text-gold-deep" : "text-foreground/40"}`}
                    />
                    <span className="text-xs font-bold truncate w-full">{g.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedGoal === "other" && (
              <div className="mt-4 max-w-sm">
                <label className="text-xs font-bold text-foreground/60 mb-2 block">
                  Describe your custom goal
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dream Venture fund"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            )}
          </div>

          {/* Main Grid Layout */}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            {/* Left Column: Input Panel */}
            <div className="space-y-6">
              <p className="eyebrow-tag">2. Adjust goal metrics</p>

              {/* Target Goal Amount */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/85">
                  Target Goal Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-foreground/45">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="10000"
                    max="100000000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value.replace(/^0+(?=\d)/, ""))}
                    className="w-full rounded-2xl border border-border bg-white py-4 pl-8 pr-4 text-lg font-bold shadow-inner focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Target Duration */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-foreground/85">Target Years</label>
                  <span className="text-xs font-bold text-foreground/60">{targetYears} Years</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={targetYears}
                  onChange={(e) => {
                    const val = e.target.value.replace(/^0+(?=\d)/, "");
                    setTargetYears(
                      val === "" ? "" : Math.min(40, Math.max(1, parseInt(val) || 1)).toString(),
                    );
                  }}
                  className="w-full rounded-2xl border border-border bg-white p-4 text-lg font-bold shadow-inner focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={Number(targetYears) || 0}
                  onChange={(e) => setTargetYears(e.target.value)}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                />
              </div>

              {/* Growth Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-foreground/85">
                    Expected Gold Annual Return (%)
                  </label>
                  <span className="text-xs font-bold text-foreground/60">{growthRate}%</span>
                </div>
                <input
                  type="number"
                  min="3"
                  max="20"
                  step="0.5"
                  value={growthRate}
                  onChange={(e) => {
                    const val = e.target.value.replace(/^0+(?=\d)/, "");
                    setGrowthRate(
                      val === "" ? "" : Math.min(20, Math.max(3, parseFloat(val) || 3)).toString(),
                    );
                  }}
                  className="w-full rounded-2xl border border-border bg-white p-4 text-lg font-bold shadow-inner focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="0.5"
                  value={Number(growthRate) || 0}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                />
              </div>

              {/* Monthly SIP Increase (Optional step-up) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <label className="text-sm font-bold text-foreground/85">
                      Annual SIP Step-up (%)
                    </label>
                    <div className="group relative">
                      <HelpCircle className="h-4 w-4 text-foreground/45 cursor-help" />
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-lg bg-foreground p-2.5 text-xs text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        Stepping up your SIP amount annually helps you achieve your goals faster and
                        accounts for increase in disposable income.
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-foreground/60">{stepUp}%</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={stepUp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/^0+(?=\d)/, "");
                    setStepUp(
                      val === "" ? "" : Math.min(20, Math.max(0, parseInt(val) || 0)).toString(),
                    );
                  }}
                  className="w-full rounded-2xl border border-border bg-white p-4 text-lg font-bold shadow-inner focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={Number(stepUp) || 0}
                  onChange={(e) => setStepUp(e.target.value)}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                />
              </div>

              {/* Configurable Gold Price Source */}
              <div className="rounded-2xl border border-border/40 bg-white/40 p-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-foreground/75">
                    Gold Reference Price (₹ / gram)
                  </label>
                  <input
                    type="number"
                    value={goldPrice}
                    onChange={(e) => setGoldPrice(e.target.value.replace(/^0+(?=\d)/, ""))}
                    className="w-24 rounded-xl border border-border bg-white py-1 px-3 text-right text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Output / Dashboard */}
            <div className="flex flex-col justify-between space-y-6">
              {/* Header / Required Monthly SIP Card */}
              <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F4D03F]/10 p-6 shadow-sm flex flex-col justify-between items-start">
                <div className="w-full flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">
                      Required Monthly Gold SIP
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-foreground block mt-1 tracking-tight">
                      {formatINR(calculations.requiredSIP)}
                    </span>
                  </div>
                  {calculations.probability && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${calculations.badgeColor}`}
                    >
                      {calculations.probability} Probability
                    </span>
                  )}
                </div>

                {/* Progress Bar Visual Indicator */}
                <div className="w-full mt-4">
                  <div className="flex justify-between items-center text-[10px] font-semibold text-foreground/50 mb-1.5">
                    <span>SIP Feasibility</span>
                    <span>{calculations.probability} Achievement Ease</span>
                  </div>
                  <div className="h-2 w-full bg-foreground/[0.08] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${calculations.progressColor}`}
                      style={{ width: `${calculations.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Metric Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                  <span className="text-xs font-semibold text-foreground/50 block">
                    Target Portfolio Value
                  </span>
                  <span className="text-lg font-bold text-foreground block mt-1">
                    {formatINR(calculations.futureValue)}
                  </span>
                </div>
                <div className="rounded-2xl border border-border/30 bg-background/40 p-4">
                  <span className="text-xs font-semibold text-foreground/50 block">
                    Gold Accumulated
                  </span>
                  <span className="text-lg font-bold text-gold-deep block mt-1">
                    {goldGrams.toFixed(1)} grams
                  </span>
                </div>
              </div>

              {/* Interactive Area Chart */}
              <div className="rounded-3xl border border-border/30 bg-white/70 p-4 sm:p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/45 block mb-4">
                    Investment Growth Forecast
                  </span>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={calculations.yearlyData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="var(--gold)" stopOpacity={0.0} />
                          </linearGradient>
                          <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--bronze)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--bronze)" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="rgba(0,0,0,0.05)"
                        />
                        <XAxis
                          dataKey="year"
                          tickLine={false}
                          axisLine={false}
                          style={{ fontSize: 10, fontWeight: 500 }}
                        />
                        <YAxis
                          tickFormatter={formatShortINR}
                          tickLine={false}
                          axisLine={false}
                          style={{ fontSize: 10, fontWeight: 500 }}
                        />
                        <Tooltip
                          formatter={(value: any) => [formatINR(value), ""]}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid rgba(0,0,0,0.08)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="Projected Value"
                          stroke="var(--gold)"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        />
                        <Area
                          type="monotone"
                          dataKey="Invested Amount"
                          stroke="var(--bronze)"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorInvested)"
                        />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{ fontSize: "11px", fontWeight: 600, pt: 10 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Call To Action Redirect */}
              <a
                href="/sip-calculator"
                className="w-full btn-gold btn-gold-hover py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer text-center text-sm"
              >
                Start Investing
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PDF PRINT LAYOUT (Only visible when printing) */}
      <div className="hidden print:block bg-white text-black p-8 font-sans border-[6px] border-[#D4AF37] rounded-3xl relative">
        <div className="pb-6">
          <h1 className="text-3xl font-bold text-black border-b-2 border-[#D4AF37] pb-2 font-serif uppercase">
            Goal Investment Plan
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            This projection details the monthly Gold SIP metrics required to secure the financial
            target.
          </p>
        </div>

        {/* Selected Goal Callout */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Planned Milestone
            </span>
            <span className="text-lg font-bold text-black capitalize">
              {selectedGoal === "other" ? customGoal || "Custom Milestone" : selectedGoal} Goal
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Goal Status Probability
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4D03F]/20 text-[#8A6A2F] border border-[#D4AF37]/30">
              {calculations.probability} Feasibility
            </span>
          </div>
        </div>

        {/* Inputs & Outputs Grid side by side */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Target Parameters */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-1">
              Goal Inputs
            </h3>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Target Year Duration:</span>
              <span className="font-bold">{parsedYears} Years</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Expected Gold Return:</span>
              <span className="font-bold">{parsedRate}% p.a.</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Annual SIP Step-up Rate:</span>
              <span className="font-bold">{parsedStepUp}%</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Gold Reference Price:</span>
              <span className="font-bold">{formatINR(parsedGoldPrice)} / gram</span>
            </div>
          </div>

          {/* Key Calculated Forecasts */}
          <div className="space-y-3 bg-[#F4D03F]/5 p-4 rounded-xl border border-[#D4AF37]/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A6A2F] border-b border-[#D4AF37]/25 pb-1">
              Goal Projections
            </h3>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Starting Monthly SIP:</span>
              <span className="font-extrabold text-[#8A6A2F]">
                {formatINR(calculations.requiredSIP)} / mo
              </span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Total Invested Capital:</span>
              <span className="font-bold">{formatINR(calculations.totalInvested)}</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Projected Portfolio Value:</span>
              <span className="font-extrabold text-[#8A6A2F]">
                {formatINR(calculations.futureValue)}
              </span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Gold grams Accumulated:</span>
              <span className="font-bold">{goldGrams.toFixed(1)} grams</span>
            </div>
          </div>
        </div>

        {/* Detailed Year Schedule Table */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
            Year-wise Projection Schedule
          </h3>
          <table className="w-full text-left text-[10px] border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 text-gray-400 uppercase font-bold">Year</th>
                <th className="py-2 text-gray-400 uppercase font-bold text-right">
                  Invested Capital
                </th>
                <th className="py-2 text-gray-400 uppercase font-bold text-right">
                  Returns Generated
                </th>
                <th className="py-2 text-gray-400 uppercase font-bold text-right">
                  Projected Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {calculations.yearlyData.map((d) => (
                <tr key={d.year}>
                  <td className="py-2 font-bold text-gray-700">{d.year}</td>
                  <td className="py-2 text-right text-gray-600">
                    {formatINR(d["Invested Amount"])}
                  </td>
                  <td className="py-2 text-right text-emerald-700">+{formatINR(d.Returns)}</td>
                  <td className="py-2 text-right font-extrabold text-black">
                    {formatINR(d["Projected Value"])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Disclaimer */}
        <div className="absolute bottom-4 left-4 right-4 border-t border-gray-200 pt-4 flex justify-between text-[8px] text-gray-400">
          <div>
            Disclaimer: Historical CAGRs do not guarantee future performance. Gold market values
            fluctuate.
          </div>
          <div>Generated via Fingold Wealth Management Suite · www.fingold.com</div>
        </div>
      </div>
    </>
  );
}
