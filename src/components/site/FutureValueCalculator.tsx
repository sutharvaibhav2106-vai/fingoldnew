import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowRight,
  HelpCircle,
  Share2,
  Download,
  TrendingUp,
  TrendingDown,
  Percent,
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

export function FutureValueCalculator() {
  // Read state from URL query parameters if present for sharing
  const getInitialState = () => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return {
      sip: params.get("sip") || "5000",
      years: params.get("years") || "10",
      rate: params.get("rate") || "8",
      goldPrice: params.get("goldPrice") || "10000",
      adjustInflation: params.get("adjustInflation") === "true",
      inflationRate: params.get("inflationRate") || "6",
    };
  };

  const initial = getInitialState();

  const [monthlySip, setMonthlySip] = useState<string>(initial?.sip || "5000");
  const [durationYears, setDurationYears] = useState<string>(initial?.years || "10");
  const [expectedRate, setExpectedRate] = useState<string>(initial?.rate || "8");
  const [goldPrice, setGoldPrice] = useState<string>(initial?.goldPrice || "10000");

  // Inflation adjustment
  const [adjustInflation, setAdjustInflation] = useState<boolean>(
    initial?.adjustInflation || false,
  );
  const [inflationRate, setInflationRate] = useState<string>(initial?.inflationRate || "6");

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Formatters
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatShortINR = (val: number) => {
    if (val >= 10000000) return (val / 10000000).toFixed(1) + "Cr";
    if (val >= 100000) return (val / 100000).toFixed(1) + "L";
    if (val >= 1000) return (val / 1000).toFixed(0) + "K";
    return val.toString();
  };

  // Parsed values
  const parsedSip = useMemo(() => {
    const num = parseInt(monthlySip) || 0;
    return Math.max(100, num);
  }, [monthlySip]);

  const parsedYears = useMemo(() => {
    const num = parseInt(durationYears) || 0;
    return Math.min(40, Math.max(1, num));
  }, [durationYears]);

  const parsedRate = useMemo(() => {
    const num = parseFloat(expectedRate) || 0;
    return Math.max(0.1, num);
  }, [expectedRate]);

  const parsedGoldPrice = useMemo(() => {
    const num = parseFloat(goldPrice) || 0;
    return Math.max(1000, num);
  }, [goldPrice]);

  const parsedInflation = useMemo(() => {
    const num = parseFloat(inflationRate) || 0;
    return Math.max(0, num);
  }, [inflationRate]);

  // Main Calculations Engine
  const calculations = useMemo(() => {
    const P = parsedSip;
    const Y = parsedYears;
    const rNominal = parsedRate / 100;
    const rInflation = adjustInflation ? parsedInflation / 100 : 0;

    // Real rate of return (Fisher equation or simple difference)
    // Here we compute nominal future value, then discount it by inflation to show purchasing power.
    // This is the most standard way to show inflation-adjusted returns.
    const monthlyRate = parsedRate / 12 / 100;
    const totalMonths = Y * 12;

    // nominal future value of SIP (annuity due)
    let nominalFV = 0;
    if (monthlyRate === 0) {
      nominalFV = P * totalMonths;
    } else {
      nominalFV =
        P * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    }

    const totalInvested = P * totalMonths;

    // Discount future value back by inflation
    const inflationFactor = Math.pow(1 + rInflation, Y);
    const finalValue = adjustInflation ? nominalFV / inflationFactor : nominalFV;
    const totalReturns = Math.max(0, finalValue - totalInvested);
    const goldGrams = finalValue / parsedGoldPrice;

    // Generate Chart Data separated to prevent re-renders on goldPrice change

    // Advanced: Growth Rate Sensitivity Analysis
    const sensitivityRates = [6, 8, 12];
    const sensitivityData = sensitivityRates.map((rate) => {
      const mRate = rate / 12 / 100;
      let sensFV = 0;
      if (mRate === 0) {
        sensFV = P * totalMonths;
      } else {
        sensFV = P * ((Math.pow(1 + mRate, totalMonths) - 1) / mRate) * (1 + mRate);
      }
      const val = adjustInflation ? sensFV / inflationFactor : sensFV;
      return {
        rate,
        value: val,
        goldGrams: val / parsedGoldPrice,
      };
    });

    // Advanced: Gold Price Scenario Analysis
    const scenarios = [
      { label: "Base Price", factor: 1.0, price: parsedGoldPrice },
      { label: "Gold Price +5%", factor: 1.05, price: parsedGoldPrice * 1.05 },
      { label: "Gold Price +10%", factor: 1.1, price: parsedGoldPrice * 1.1 },
      { label: "Gold Price +15%", factor: 1.15, price: parsedGoldPrice * 1.15 },
    ];
    const scenarioData = scenarios.map((sc) => ({
      ...sc,
      goldQuantity: finalValue / sc.price,
    }));

    return {
      totalInvested,
      portfolioValue: finalValue,
      totalReturns,
      goldGrams,
      sensitivityData,
      scenarioData,
    };
  }, [parsedSip, parsedYears, parsedRate, adjustInflation, parsedInflation, parsedGoldPrice]);

  const yearlyData = useMemo(() => {
    const P = parsedSip;
    const Y = parsedYears;
    const monthlyRate = parsedRate / 12 / 100;
    const rInflation = adjustInflation ? parsedInflation / 100 : 0;

    const data = [];
    for (let y = 1; y <= Y; y++) {
      const months = y * 12;
      let yNominalVal = 0;
      if (monthlyRate === 0) {
        yNominalVal = P * months;
      } else {
        yNominalVal =
          P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      }

      const yInflationFactor = Math.pow(1 + rInflation, y);
      const yValue = adjustInflation ? yNominalVal / yInflationFactor : yNominalVal;
      const yInvested = P * months;
      const yReturns = Math.max(0, yValue - yInvested);

      data.push({
        year: `${y} Yr`,
        "Invested Capital": Math.round(yInvested),
        "Portfolio Growth": Math.round(yValue),
        "Returns Generated": Math.round(yReturns),
      });
    }
    return data;
  }, [parsedSip, parsedYears, parsedRate, adjustInflation, parsedInflation]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      params.set("sip", monthlySip);
      params.set("years", durationYears);
      params.set("rate", expectedRate);
      params.set("goldPrice", goldPrice);
      params.set("adjustInflation", adjustInflation.toString());
      if (adjustInflation) params.set("inflationRate", inflationRate);

      const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

      if (navigator.share) {
        navigator
          .share({
            title: "Fingold - Future Value Calculator Result",
            text: `Check out my future value calculation results on Fingold!`,
            url: shareUrl,
          })
          .catch((err) => {
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

          {/* main grid */}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            {/* Left Column: Form Controls */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                Portfolio Settings
              </h3>

              {/* Monthly Investment */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-foreground/85">
                    Monthly Investment (₹)
                  </label>
                  <span className="text-xs font-semibold text-foreground/40">Min: ₹100</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-foreground/45">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="100"
                    value={monthlySip}
                    onChange={(e) => setMonthlySip(e.target.value.replace(/^0+(?=\d)/, ""))}
                    className="w-full rounded-2xl border border-border bg-white py-4 pl-8 pr-4 text-lg font-bold shadow-inner focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <input
                  type="range"
                  min="100"
                  max="100000"
                  step="500"
                  value={Number(monthlySip) || 0}
                  onChange={(e) => setMonthlySip(e.target.value)}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-foreground/85">
                    Investment Duration (Years)
                  </label>
                  <span className="text-xs font-bold text-foreground/60">
                    {durationYears} Years
                  </span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={durationYears}
                  onChange={(e) => {
                    const val = e.target.value.replace(/^0+(?=\d)/, "");
                    setDurationYears(
                      val === "" ? "" : Math.min(40, Math.max(1, parseInt(val) || 1)).toString(),
                    );
                  }}
                  className="w-full rounded-2xl border border-border bg-white p-4 text-lg font-bold shadow-inner focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={Number(durationYears) || 0}
                  onChange={(e) => setDurationYears(e.target.value)}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                />
              </div>

              {/* Expected Return Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-foreground/85">
                    Expected Gold Annual Return (%)
                  </label>
                  <span className="text-xs font-bold text-foreground/60">{expectedRate}%</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="25"
                  step="0.5"
                  value={expectedRate}
                  onChange={(e) => {
                    const val = e.target.value.replace(/^0+(?=\d)/, "");
                    setExpectedRate(
                      val === ""
                        ? ""
                        : Math.min(25, Math.max(0.1, parseFloat(val) || 0.1)).toString(),
                    );
                  }}
                  className="w-full rounded-2xl border border-border bg-white p-4 text-lg font-bold shadow-inner focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.5"
                  value={Number(expectedRate) || 0}
                  onChange={(e) => setExpectedRate(e.target.value)}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-[#D4AF37]"
                />
              </div>

              {/* Gold Price Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/85">
                  Current Gold Price (₹ / gram)
                </label>
                <input
                  type="number"
                  value={goldPrice}
                  onChange={(e) => setGoldPrice(e.target.value.replace(/^0+(?=\d)/, ""))}
                  className="w-full rounded-2xl border border-border bg-white p-4 text-lg font-bold shadow-inner focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              {/* Inflation Toggle & Input */}
              <div className="rounded-2xl border border-border/40 bg-white/40 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground/85">
                      Adjust for Inflation
                    </span>
                    <span className="text-xs text-foreground/50">Show real purchasing power</span>
                  </div>
                  <button
                    onClick={() => setAdjustInflation(!adjustInflation)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      adjustInflation ? "bg-[#D4AF37]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        adjustInflation ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {adjustInflation && (
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-semibold text-foreground/60">
                      Estimated Inflation Rate:
                    </span>
                    <div className="relative w-24">
                      <input
                        type="number"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value.replace(/^0+(?=\d)/, ""))}
                        className="w-full rounded-lg border border-border bg-white py-1 px-3 text-right text-sm font-bold focus:outline-none"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-foreground/45 font-bold">
                        %
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Dashboard Outputs */}
            <div className="flex flex-col justify-between space-y-6">
              {/* Main Result Card */}
              <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#F4D03F]/10 p-6 shadow-sm flex flex-col justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider block">
                    Future Portfolio Value {adjustInflation && "(Inflation Adjusted)"}
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground block mt-1 tracking-tight">
                    {formatINR(calculations.portfolioValue)}
                  </span>
                </div>
                <div className="mt-4 flex gap-4 w-full text-xs font-bold text-foreground/60">
                  <div>
                    <span className="block text-[10px] text-foreground/45 uppercase">
                      Total Invested
                    </span>
                    <span className="text-sm text-foreground mt-0.5 block">
                      {formatINR(calculations.totalInvested)}
                    </span>
                  </div>
                  <div className="border-l border-foreground/20 pl-4">
                    <span className="block text-[10px] text-foreground/45 uppercase">
                      Total Returns
                    </span>
                    <span className="text-sm text-emerald-700 mt-0.5 block">
                      +{formatINR(calculations.totalReturns)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gold Quantity Result Card */}
              <div className="rounded-2xl border border-border/30 bg-background/40 p-4 flex justify-between items-center">
                <div>
                  <span className="text-xs font-semibold text-foreground/50 block">
                    Gold Quantity Accumulated
                  </span>
                  <span className="text-2xl font-bold text-gold-deep block mt-1">
                    {calculations.goldGrams.toFixed(1)} grams
                  </span>
                </div>
                <div className="h-10 w-10 rounded-full bg-gold-deep/15 grid place-items-center">
                  <Percent className="h-5 w-5 text-gold-deep" />
                </div>
              </div>

              {/* Chart Area */}
              <div className="rounded-3xl border border-border/30 bg-white/70 p-4 sm:p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/45 block mb-4">
                    Growth Over Time
                  </span>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={yearlyData}
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
                          dataKey="Portfolio Growth"
                          stroke="var(--gold)"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorValue)"
                        />
                        <Area
                          type="monotone"
                          dataKey="Invested Capital"
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
            </div>
          </div>

          {/* Growth Rate Sensitivity & Gold Price Scenario Analysis */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Sensitivity Table */}
            <div className="rounded-3xl border border-border/30 bg-white/60 p-6">
              <h4 className="text-display text-lg mb-4 font-bold text-foreground">
                Rate Sensitivity Analysis
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border/40 pb-2">
                      <th className="pb-2 font-bold text-foreground/50 uppercase">Scenario</th>
                      <th className="pb-2 font-bold text-foreground/50 uppercase text-right">
                        Portfolio Value
                      </th>
                      <th className="pb-2 font-bold text-foreground/50 uppercase text-right">
                        Gold Grams
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {calculations.sensitivityData.map((sens) => {
                      let label = "Expected";
                      if (sens.rate === 6) label = "Conservative (6%)";
                      if (sens.rate === 8) label = "Expected (8%)";
                      if (sens.rate === 12) label = "Aggressive (12%)";
                      return (
                        <tr key={sens.rate}>
                          <td className="py-2.5 font-semibold text-foreground/80">{label}</td>
                          <td className="py-2.5 text-right font-bold text-foreground">
                            {formatINR(sens.value)}
                          </td>
                          <td className="py-2.5 text-right font-medium text-gold-deep">
                            {sens.goldGrams.toFixed(1)}g
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scenario Analysis Table */}
            <div className="rounded-3xl border border-border/30 bg-white/60 p-6">
              <h4 className="text-display text-lg mb-4 font-bold text-foreground">
                Gold Price Scenario Analysis
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border/40 pb-2">
                      <th className="pb-2 font-bold text-foreground/50 uppercase">
                        Gold Price Trend
                      </th>
                      <th className="pb-2 font-bold text-foreground/50 uppercase text-right">
                        Price per gram
                      </th>
                      <th className="pb-2 font-bold text-foreground/50 uppercase text-right">
                        Accumulated Grams
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {calculations.scenarioData.map((sc) => (
                      <tr key={sc.label}>
                        <td className="py-2.5 font-semibold text-foreground/80">{sc.label}</td>
                        <td className="py-2.5 text-right font-bold text-foreground">
                          {formatINR(sc.price)}
                        </td>
                        <td className="py-2.5 text-right font-bold text-gold-deep">
                          {sc.goldQuantity.toFixed(1)}g
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF PRINT LAYOUT (Only visible when printing) */}
      <div className="hidden print:block bg-white text-black p-8 font-sans border-[6px] border-[#D4AF37] rounded-3xl relative">
        <div className="pb-6">
          <h1 className="text-3xl font-bold text-black border-b-2 border-[#D4AF37] pb-2 font-serif uppercase">
            Future Value Projection
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            This projection details the estimated wealth compounding and portfolio worth of fine
            gold assets.
          </p>
        </div>

        {/* Inputs & Outputs Grid side by side */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Target Parameters */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-1">
              Forecast Inputs
            </h3>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Monthly Investment SIP:</span>
              <span className="font-bold">{formatINR(parsedSip)} / mo</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Investment Duration:</span>
              <span className="font-bold">{parsedYears} Years</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Expected Annual Return:</span>
              <span className="font-bold">{parsedRate}% p.a.</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Gold Reference Price:</span>
              <span className="font-bold">{formatINR(parsedGoldPrice)} / gram</span>
            </div>
            {adjustInflation && (
              <div className="flex justify-between text-xs py-1 text-rose-700">
                <span>Inflation Adjustment:</span>
                <span className="font-bold">{parsedInflation}%</span>
              </div>
            )}
          </div>

          {/* Key Calculated Forecasts */}
          <div className="space-y-3 bg-[#F4D03F]/5 p-4 rounded-xl border border-[#D4AF37]/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A6A2F] border-b border-[#D4AF37]/25 pb-1">
              Portfolio Projections
            </h3>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Total Invested Capital:</span>
              <span className="font-bold">{formatINR(calculations.totalInvested)}</span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Total Returns Generated:</span>
              <span className="font-extrabold text-emerald-700">
                +{formatINR(calculations.totalReturns)}
              </span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Future Portfolio Value:</span>
              <span className="font-extrabold text-[#8A6A2F]">
                {formatINR(calculations.portfolioValue)}
              </span>
            </div>
            <div className="flex justify-between text-xs py-1">
              <span className="text-gray-500">Gold grams Accumulated:</span>
              <span className="font-bold">{calculations.goldGrams.toFixed(1)} grams</span>
            </div>
          </div>
        </div>

        {/* Detailed Year Schedule Table */}
        <div className="mb-6">
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
              {yearlyData.map((d) => (
                <tr key={d.year}>
                  <td className="py-2 font-bold text-gray-700">{d.year}</td>
                  <td className="py-2 text-right text-gray-600">
                    {formatINR(d["Invested Capital"])}
                  </td>
                  <td className="py-2 text-right text-emerald-700">
                    +{formatINR(d["Returns Generated"])}
                  </td>
                  <td className="py-2 text-right font-extrabold text-black">
                    {formatINR(d["Portfolio Growth"])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Advanced scenarios in print */}
        <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-6">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Growth Sensitivity
            </h4>
            <div className="space-y-1 text-[9px]">
              {calculations.sensitivityData.map((s) => (
                <div key={s.rate} className="flex justify-between">
                  <span>CAGR {s.rate}%:</span>
                  <span className="font-bold">{formatINR(s.value)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Gold Price Trend Impact
            </h4>
            <div className="space-y-1 text-[9px]">
              {calculations.scenarioData.map((s) => (
                <div key={s.label} className="flex justify-between">
                  <span>{s.label}:</span>
                  <span className="font-bold">{s.goldQuantity.toFixed(1)}g</span>
                </div>
              ))}
            </div>
          </div>
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
