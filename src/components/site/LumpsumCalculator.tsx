import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, ArrowRight, HelpCircle, RotateCcw } from "lucide-react";

export function LumpsumCalculator() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Inputs
  const [lumpsumAmount, setLumpsumAmount] = useState<string>("100000");
  const [duration, setDuration] = useState<string>("5");
  const [expectedReturn, setExpectedReturn] = useState<string>("11");
  const [showAllReturns, setShowAllReturns] = useState(false);

  // Active Calculation Values
  const [calcLumpsumAmount, setCalcLumpsumAmount] = useState<number>(100000);
  const [calcDuration, setCalcDuration] = useState<number>(5);
  const [calcExpectedReturn, setCalcExpectedReturn] = useState<number>(11);

  // Re-trigger animation when active calculation values are updated
  useEffect(() => {
    if (!animate) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  // Formatter for Indian Rupee
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Short formatter for Chart Labels (e.g. 1.68L, 75K)
  const formatShortINR = (val: number) => {
    if (val >= 10000000) {
      return (val / 10000000).toFixed(2) + "Cr";
    }
    if (val >= 100000) {
      return (val / 100000).toFixed(2) + "L";
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(0) + "K";
    }
    return val.toString();
  };

  // Math calculations for each year
  const yearlyData = useMemo(() => {
    const data = [];
    const P = Math.max(100, calcLumpsumAmount);
    const r = calcExpectedReturn / 100;

    for (let y = 1; y <= calcDuration; y++) {
      // Compounded Value: A = P * (1 + r)^y
      const totalValue = P * Math.pow(1 + r, y);
      const estReturns = Math.max(0, totalValue - P);
      data.push({
        year: y,
        savedAmount: P,
        estReturns: estReturns,
        totalValue: totalValue,
      });
    }
    return data;
  }, [calcLumpsumAmount, calcDuration, calcExpectedReturn]);

  const results = useMemo(() => {
    const totalInvested = calcLumpsumAmount;
    const lastYear = yearlyData[yearlyData.length - 1] || {
      totalValue: totalInvested,
      estReturns: 0,
    };
    const totalValue = lastYear.totalValue;
    const estReturns = lastYear.estReturns;

    return {
      totalInvested,
      estReturns,
      totalValue,
      chartInvestedPct: totalValue > 0 ? (totalInvested / totalValue) * 100 : 50,
    };
  }, [yearlyData, calcLumpsumAmount]);

  const handleCalculate = () => {
    setCalcLumpsumAmount(lumpsumAmount === "" ? 0 : parseInt(lumpsumAmount) || 0);
    setCalcDuration(duration === "" ? 1 : parseInt(duration) || 1);
    setCalcExpectedReturn(expectedReturn === "" ? 0 : parseFloat(expectedReturn) || 0);
    setAnimate(false);
  };

  const handleReset = () => {
    setLumpsumAmount("100000");
    setDuration("5");
    setExpectedReturn("11");

    setCalcLumpsumAmount(100000);
    setCalcDuration(5);
    setCalcExpectedReturn(11);
    setAnimate(false);
  };

  // To match the reference image, the maximum total value in the years helps scale the chart
  const maxChartValue = useMemo(() => {
    if (yearlyData.length === 0) return 100000;
    return Math.max(...yearlyData.map((d) => d.totalValue)) * 1.1;
  }, [yearlyData]);

  return (
    <div className="mx-auto max-w-6xl rounded-3xl border border-border/40 bg-background/50 p-4 sm:p-10 shadow-soft backdrop-blur-xl">
      {/* Title */}
      <div className="mb-8 flex justify-start">
        <h2 className="text-display text-2xl md:text-3xl font-bold text-foreground">
          Gold Lumpsum Calculator
        </h2>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Left Column - Inputs */}
        <div className="space-y-8 min-w-0">
          {/* Header Tag / Pill */}
          <div className="inline-flex rounded-full bg-foreground/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
            Lumpsum
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Lumpsum Amount */}
            <div className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label className="text-sm font-semibold text-foreground/85">
                  Select Lumpsum amount
                </label>
                <div className="relative flex items-center w-full sm:w-auto">
                  <span className="absolute left-3 text-foreground/55 font-medium">₹</span>
                  <input
                    type="number"
                    min="100"
                    step="1000"
                    value={lumpsumAmount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      setLumpsumAmount(val);
                    }}
                    className="w-full sm:w-36 rounded-xl border border-border bg-white py-2 pl-7 pr-3 text-right font-semibold text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              <input
                type="range"
                min="1000"
                max="10000000"
                step="5000"
                value={Number(lumpsumAmount) || 0}
                onChange={(e) => setLumpsumAmount(e.target.value)}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
              />
            </div>

            {/* Time Period */}
            <div className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label className="text-sm font-semibold text-foreground/85">
                  Select time period
                </label>
                <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
                  <span className="text-xs text-foreground/55">Years:</span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={duration}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      if (val === "") {
                        setDuration("");
                      } else {
                        const num = parseInt(val) || 0;
                        setDuration(Math.min(20, Math.max(1, num)).toString());
                      }
                    }}
                    className="w-16 rounded-xl border border-border bg-white py-2 px-3 text-center font-semibold text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={Number(duration) || 0}
                onChange={(e) => setDuration(e.target.value)}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
              />
            </div>

            {/* Gold Price Appreciation Rate */}
            <div className="rounded-2xl border border-border bg-white/40 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground/85">
                    Gold Price Appreciation
                  </span>
                  <div className="group relative">
                    <HelpCircle className="h-4 w-4 text-foreground/45 cursor-help" />
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-lg bg-foreground p-2.5 text-xs text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      Historical CAGR for gold in India is around 10-12% annually over the last 20
                      years.
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, "");
                      if (val === "") {
                        setExpectedReturn("");
                      } else {
                        const num = parseFloat(val) || 0;
                        setExpectedReturn(Math.min(20, Math.max(0, num)).toString());
                      }
                    }}
                    className="w-16 rounded-xl border border-border bg-white py-2 px-3 text-center font-semibold text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <span className="text-sm font-semibold text-foreground/70">%</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
              <button
                onClick={handleCalculate}
                className="flex-1 btn-gold btn-gold-hover py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer text-base"
              >
                Calculate
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 rounded-2xl border border-border/80 hover:border-foreground/40 bg-white/60 px-6 py-4 font-semibold text-foreground/75 transition-colors cursor-pointer text-base"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Results & Bar Chart */}
        <div className="flex flex-col justify-between space-y-6 min-w-0">
          {/* Header Summary Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-border/30 bg-background/30 p-3 sm:p-4">
              <span className="text-[10px] sm:text-xs font-semibold text-foreground/50 uppercase tracking-wider block truncate">
                Invested Amount
              </span>
              <span className="text-lg sm:text-xl font-bold text-foreground block mt-1 truncate">
                {formatINR(results.totalInvested)}
              </span>
            </div>
            <div className="rounded-2xl border border-border/30 bg-background/30 p-3 sm:p-4">
              <span className="text-[10px] sm:text-xs font-semibold text-foreground/50 uppercase tracking-wider block truncate">
                Maturity Value
              </span>
              <span
                className="text-lg sm:text-xl font-bold text-foreground block mt-1 truncate"
                style={{ color: "var(--bronze)" }}
              >
                {formatINR(results.totalValue)}
              </span>
            </div>
          </div>

          {/* Bar Chart Container */}
          <div className="rounded-3xl border border-[#D4AF37]/25 bg-white/80 p-4 sm:p-6 shadow-sm flex flex-col justify-between flex-grow min-h-[350px] overflow-hidden max-w-full">
            {/* Chart Title / Axis Label */}
            <div className="flex items-center justify-between text-xs text-foreground/50 font-medium mb-4">
              <span>Value (₹)</span>
              <span>Year-by-Year Growth</span>
            </div>

            {/* The Chart Scroll Wrapper */}
            <div className="overflow-x-auto max-w-full pb-3 mt-4 scrollbar-thin">
              <div
                className="relative flex items-end justify-between h-48 border-b border-border/40 pb-2 gap-2"
                style={{ minWidth: "100%", width: `${(parseInt(duration) || 0) * 45}px` }}
              >
                {/* Y-Axis Guideline Marks (Simulated) */}
                <div className="absolute left-0 right-0 top-0 border-t border-dashed border-foreground/5 pointer-events-none" />
                <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-foreground/5 pointer-events-none" />

                {/* Yearly Bars */}
                {yearlyData.map((d) => {
                  // Height percentage relative to maxChartValue for the total height of the bar container
                  const barHeightPct = (d.totalValue / maxChartValue) * 100;

                  // Heights of inner components relative to totalValue (summing to 100%)
                  const returnsHeightPct = (d.estReturns / d.totalValue) * 100;
                  const savedHeightPct = (d.savedAmount / d.totalValue) * 100;

                  return (
                    <div
                      key={d.year}
                      className="flex-1 flex flex-col items-center group relative h-full justify-end min-w-[28px]"
                    >
                      {/* Tooltip */}
                      <div className="pointer-events-none absolute bottom-full mb-2 z-10 hidden group-hover:flex flex-col items-center bg-foreground text-background text-xs rounded-lg py-2 px-3 shadow-md min-w-[120px] transition-all">
                        <span className="font-semibold mb-1">Year {d.year}</span>
                        <div className="flex justify-between w-full gap-2 text-[10px]">
                          <span>Returns:</span>
                          <span className="font-bold">{formatINR(d.estReturns)}</span>
                        </div>
                        <div className="flex justify-between w-full gap-2 text-[10px] border-t border-background/25 pt-1 mt-1">
                          <span>Total:</span>
                          <span className="font-bold">{formatINR(d.totalValue)}</span>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                      </div>

                      {/* Value text above bar */}
                      <span className="text-[10px] font-bold text-foreground/75 mb-1.5 transition-transform group-hover:scale-110">
                        {formatShortINR(d.totalValue)}
                      </span>

                      {/* Stacked Bar container with transition and active mount state */}
                      <div
                        className="w-full rounded-t-lg overflow-hidden flex flex-col justify-end shadow-sm hover:brightness-105 cursor-pointer"
                        style={{
                          height: animate ? `${barHeightPct}%` : "0%",
                          minHeight: "4px",
                          transition: "height 2.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {/* Estimated Returns (Teal/Green) */}
                        <div
                          className="w-full bg-[#1A535C]"
                          style={{
                            height: `${returnsHeightPct}%`,
                            transition: "height 2.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        />
                        {/* Saved Amount (Yellow/Gold) */}
                        <div
                          className="w-full bg-[#F4D03F]"
                          style={{
                            height: `${savedHeightPct}%`,
                            transition: "height 2.5s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        />
                      </div>

                      {/* X-axis label */}
                      <span className="text-xs font-semibold text-foreground/60 mt-2">
                        {d.year}Y
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded bg-[#F4D03F] block" />
                <span className="text-xs font-semibold text-foreground/75">Saved Amount</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded bg-[#1A535C] block" />
                <span className="text-xs font-semibold text-foreground/75">Estimated Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* See All Year Returns Toggle */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowAllReturns(!showAllReturns)}
          className="rounded-xl border border-[#D4AF37]/45 bg-white/70 hover:bg-white px-6 py-3 font-semibold text-foreground/85 shadow-sm transition flex items-center gap-2 cursor-pointer hover:border-foreground/30 focus:outline-none"
        >
          {showAllReturns ? "Hide Detailed Yearly Returns" : "See All Year Returns"}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${showAllReturns ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Collapsible Yearly Table */}
      {showAllReturns && (
        <div className="mt-6 overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-white/90 p-4 sm:p-6 shadow-soft animate-reveal">
          <h3 className="text-display text-xl sm:text-2xl mb-4 font-semibold text-foreground">
            Detailed Yearly Growth Breakdown
          </h3>
          <div className="overflow-x-auto max-h-[350px] overflow-y-auto pr-1">
            <table className="w-full text-left text-sm border-collapse min-w-[500px]">
              <thead className="sticky top-0 bg-white border-b border-border/40 z-10">
                <tr>
                  <th className="py-3 px-4 font-semibold text-foreground/60">Year</th>
                  <th className="py-3 px-4 font-semibold text-foreground/60 text-right">
                    Saved Amount
                  </th>
                  <th className="py-3 px-4 font-semibold text-foreground/60 text-right">
                    Estimated Returns
                  </th>
                  <th className="py-3 px-4 font-semibold text-foreground/60 text-right">
                    Total Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {yearlyData.map((d) => (
                  <tr key={d.year} className="hover:bg-foreground/[0.02] transition-colors">
                    <td className="py-3 px-4 font-semibold text-foreground/75">Year {d.year}</td>
                    <td className="py-3 px-4 text-right text-foreground/70">
                      {formatINR(d.savedAmount)}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-700 font-medium">
                      {formatINR(d.estReturns)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-foreground">
                      {formatINR(d.totalValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
