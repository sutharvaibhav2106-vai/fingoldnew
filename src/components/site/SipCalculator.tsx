import React, { useState, useMemo } from "react";
import { ChevronDown, ArrowRight, Calculator, Target } from "lucide-react";

type CalculatorMode = "returns" | "target";

export function SipCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("returns");

  // Inputs for Calculate Returns
  const [monthlyInvest, setMonthlyInvest] = useState<string>("500");
  const [durationReturns, setDurationReturns] = useState<string>("10");
  const [expectedReturnReturns, setExpectedReturnReturns] = useState<string>("11");

  // Inputs for Target Amount
  const [targetAmount, setTargetAmount] = useState<string>("100000");
  const [durationTarget, setDurationTarget] = useState<string>("10");
  const [expectedReturnTarget, setExpectedReturnTarget] = useState<string>("11");

  // Validation
  const isMonthlyInvestError = (monthlyInvest === "" ? 0 : parseInt(monthlyInvest) || 0) < 100;

  // Formatter for Indian Rupee
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Math calculations
  const results = useMemo(() => {
    if (mode === "returns") {
      const P = isMonthlyInvestError ? 0 : monthlyInvest === "" ? 0 : parseInt(monthlyInvest) || 0;
      const r = expectedReturnReturns === "" ? 0 : parseFloat(expectedReturnReturns) || 0;
      const n = durationReturns === "" ? 1 : parseInt(durationReturns) || 1;
      const m = n * 12;

      // i = monthly interest rate
      const i = r / 12 / 100;

      // SIP Formula: FV = P * [ ( (1 + i)^m - 1 ) / i ] * (1 + i)
      let totalValue = 0;
      if (i === 0) {
        totalValue = P * m;
      } else {
        totalValue = P * ((Math.pow(1 + i, m) - 1) / i) * (1 + i);
      }

      const totalInvested = P * m;
      const estReturns = Math.max(0, totalValue - totalInvested);

      return {
        totalInvested,
        estReturns,
        totalValue,
        // For rendering
        primaryLabel: "Est. returns",
        primaryVal: estReturns,
        secondaryLabel: "Total Invested",
        secondaryVal: totalInvested,
        maturityLabel: "Maturity Value",
        maturityVal: totalValue,
        chartInvestedPct: totalValue > 0 ? (totalInvested / totalValue) * 100 : 50,
      };
    } else {
      const FV = Math.max(100, targetAmount === "" ? 0 : parseInt(targetAmount) || 0);
      const r = expectedReturnTarget === "" ? 0 : parseFloat(expectedReturnTarget) || 0;
      const n = durationTarget === "" ? 1 : parseInt(durationTarget) || 1;
      const m = n * 12;

      const i = r / 12 / 100;

      // P = FV / [ ( (1 + i)^m - 1 ) / i * (1 + i) ]
      let requiredSIP = 0;
      if (i === 0) {
        requiredSIP = FV / m;
      } else {
        requiredSIP = FV / (((Math.pow(1 + i, m) - 1) / i) * (1 + i));
      }

      // Round to nearest rupee
      const roundedSIP = Math.ceil(requiredSIP);
      const totalInvested = roundedSIP * m;
      const estReturns = Math.max(0, FV - totalInvested);

      return {
        totalInvested,
        estReturns,
        totalValue: FV,
        primaryLabel: "Required Monthly SIP",
        primaryVal: roundedSIP,
        secondaryLabel: "Total Invested",
        secondaryVal: totalInvested,
        maturityLabel: "Target Amount",
        maturityVal: FV,
        chartInvestedPct: FV > 0 ? (totalInvested / FV) * 100 : 50,
      };
    }
  }, [
    mode,
    monthlyInvest,
    durationReturns,
    expectedReturnReturns,
    targetAmount,
    durationTarget,
    expectedReturnTarget,
    isMonthlyInvestError,
  ]);

  return (
    <div className="mx-auto max-w-6xl rounded-3xl border border-border/40 bg-background/50 p-4 sm:p-10 shadow-soft backdrop-blur-xl">
      {/* Title */}
      <div className="mb-8 flex justify-start">
        <h2 className="text-display text-2xl md:text-3xl font-bold text-foreground">
          Gold SIP Calculator
        </h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Left Column - Inputs */}
        <div className="space-y-8 min-w-0">
          {/* Tabs */}
          <div className="flex w-full rounded-xl bg-foreground/[0.04] p-1 border border-border/40">
            <button
              onClick={() => setMode("returns")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-2 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                mode === "returns"
                  ? "bg-white text-foreground shadow-sm border border-border/30"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Calculator className="h-4 w-4 shrink-0" />
              <span className="truncate">Calculate Returns</span>
            </button>
            <button
              onClick={() => setMode("target")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-2 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                mode === "target"
                  ? "bg-white text-foreground shadow-sm border border-border/30"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <Target className="h-4 w-4 shrink-0" />
              <span className="truncate">Target Amount</span>
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {mode === "returns" ? (
              // Tab 1 Fields
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground/85">
                      Monthly Investment (₹)
                    </label>
                    <span className="text-xs text-foreground/50">Min: ₹100</span>
                  </div>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={monthlyInvest}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      setMonthlyInvest(val);
                    }}
                    className={`w-full rounded-xl border bg-white p-4 text-lg font-medium shadow-inner transition focus:outline-none ${
                      isMonthlyInvestError
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-border focus:border-foreground/30"
                    }`}
                  />
                  {isMonthlyInvestError && (
                    <p className="text-xs font-semibold text-red-500 mt-1.5">
                      Minimum monthly investment amount is ₹100.
                    </p>
                  )}
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="100"
                    value={Number(monthlyInvest) || 0}
                    onChange={(e) => setMonthlyInvest(e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground/85">
                      Investment Duration (Years)
                    </label>
                    <span className="text-xs text-foreground/50">{durationReturns} Years</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={durationReturns}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      if (val === "") {
                        setDurationReturns("");
                      } else {
                        const num = parseInt(val) || 0;
                        setDurationReturns(Math.min(40, Math.max(1, num)).toString());
                      }
                    }}
                    className="w-full rounded-xl border border-border bg-white p-4 text-lg font-medium shadow-inner transition focus:border-foreground/30 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={Number(durationReturns) || 0}
                    onChange={(e) => setDurationReturns(e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground/85">
                      Expected Annual Return (%)
                    </label>
                    <span className="text-xs text-foreground/50">Default: 11% (20-year CAGR)</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="0.5"
                    value={expectedReturnReturns}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      if (val === "") {
                        setExpectedReturnReturns("");
                      } else {
                        const num = parseFloat(val) || 0;
                        setExpectedReturnReturns(Math.min(30, Math.max(0.1, num)).toString());
                      }
                    }}
                    className="w-full rounded-xl border border-border bg-white p-4 text-lg font-medium shadow-inner transition focus:border-foreground/30 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={Number(expectedReturnReturns) || 0}
                    onChange={(e) => setExpectedReturnReturns(e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                  />
                </div>
              </>
            ) : (
              // Tab 2 Fields
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground/85">
                      Target Amount (₹)
                    </label>
                    <span className="text-xs text-foreground/50">Min: ₹1,000</span>
                  </div>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={targetAmount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      setTargetAmount(val);
                    }}
                    className="w-full rounded-xl border border-border bg-white p-4 text-lg font-medium shadow-inner transition focus:border-foreground/30 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="1000"
                    max="10000000"
                    step="5000"
                    value={Number(targetAmount) || 0}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground/85">
                      Investment Duration (Years)
                    </label>
                    <span className="text-xs text-foreground/50">{durationTarget} Years</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={durationTarget}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      if (val === "") {
                        setDurationTarget("");
                      } else {
                        const num = parseInt(val) || 0;
                        setDurationTarget(Math.min(40, Math.max(1, num)).toString());
                      }
                    }}
                    className="w-full rounded-xl border border-border bg-white p-4 text-lg font-medium shadow-inner transition focus:border-foreground/30 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={Number(durationTarget) || 0}
                    onChange={(e) => setDurationTarget(e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground/85">
                      Expected Annual Return (%)
                    </label>
                    <span className="text-xs text-foreground/50">Default: 11% (20-year CAGR)</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="0.5"
                    value={expectedReturnTarget}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      if (val === "") {
                        setExpectedReturnTarget("");
                      } else {
                        const num = parseFloat(val) || 0;
                        setExpectedReturnTarget(Math.min(30, Math.max(0.1, num)).toString());
                      }
                    }}
                    className="w-full rounded-xl border border-border bg-white p-4 text-lg font-medium shadow-inner transition focus:border-foreground/30 focus:outline-none"
                  />
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={Number(expectedReturnTarget) || 0}
                    onChange={(e) => setExpectedReturnTarget(e.target.value)}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column - Results Display */}
        <div className="flex flex-col justify-between space-y-6 min-w-0">
          {/* Header Estimate Value */}
          <div className="flex items-center justify-between rounded-2xl bg-[#F4D03F]/10 p-4 border border-[#D4AF37]/25">
            <span className="text-sm font-medium text-foreground/60">{results.primaryLabel}</span>
            <span className="text-2xl font-bold text-foreground">
              {formatINR(results.primaryVal)}
            </span>
          </div>

          {/* Details Box */}
          <div className="glass-light flex-1 rounded-3xl p-4 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Total Invested */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground/75">
                  <span
                    className="h-3 w-3 rounded-full bg-[#8A6A2F]"
                    style={{ backgroundColor: "var(--bronze)" }}
                  />
                  Total Invested
                </span>
                <span className="font-semibold text-foreground/90">
                  {formatINR(results.secondaryVal)}
                </span>
              </div>

              {/* Estimated returns or Target Value */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground/75">
                  <span
                    className="h-3 w-3 rounded-full bg-[#D4AF37]"
                    style={{ backgroundColor: "var(--gold)" }}
                  />
                  {mode === "returns" ? "Est. Returns" : "Target Value"}
                </span>
                <span className="font-semibold text-foreground/90">
                  {formatINR(mode === "returns" ? results.estReturns : results.maturityVal)}
                </span>
              </div>

              {/* Maturity Value Highlight Box */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#D4AF37]/35 bg-[#F4D03F]/5 px-4 py-3 text-sm">
                <span className="font-medium text-foreground">{results.maturityLabel}</span>
                <span className="font-bold text-foreground text-lg">
                  {formatINR(results.maturityVal)}
                </span>
              </div>
            </div>

            {/* Circular Pie Chart (pure CSS conic-gradient matching Bronze & Gold theme colors) */}
            <div className="flex flex-col items-center justify-center py-4">
              <div
                className="relative h-44 w-44 rounded-full shadow-inner border border-white/40 flex items-center justify-center transition-all duration-500 animate-fade-in"
                style={{
                  background: `conic-gradient(#8A6A2F ${results.chartInvestedPct}%, #D4AF37 0%)`,
                }}
              >
                {/* Center cutout to make it look extremely clean */}
                <div className="absolute h-28 w-28 rounded-full bg-white flex flex-col items-center justify-center shadow-md">
                  <span className="text-[10px] uppercase font-semibold text-foreground/50 tracking-wider">
                    SIP Growth
                  </span>
                  <span className="text-xs font-bold text-foreground mt-0.5">
                    {results.chartInvestedPct.toFixed(0)}% Invested
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button styled to match brand primary gold action buttons */}
            <button className="w-full btn-gold btn-gold-hover py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer">
              Start Your Digital Gold SIP
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
