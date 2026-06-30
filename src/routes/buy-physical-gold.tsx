import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { useLiveGoldPrice } from "@/hooks/useLiveGoldPrice";
import { 
  ShieldCheck, 
  Check, 
  Truck, 
  FileText, 
  CreditCard, 
  ChevronRight, 
  Info, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Coins, 
  Printer, 
  Loader2 
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/buy-physical-gold")({
  head: () => ({
    meta: [
      { title: "Buy Physical Gold — FINGOLD" },
      {
        name: "description",
        content: "Purchase fine 24K gold coins, bars, or 22K jewelry at real-time live prices. Insured doorstep delivery with digital invoice receipt.",
      },
    ],
  }),
  component: BuyPhysicalGoldPage,
});

interface ShippingForm {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function BuyPhysicalGoldPage() {
  const { data: priceData, isLoading: priceLoading } = useLiveGoldPrice();
  
  // Steps: 1 = Configure & Address, 2 = Review & Pay, 3 = Receipt
  const [step, setStep] = useState(1);
  
  // Product Setup
  const [goldType, setGoldType] = useState<"24k_coin" | "24k_bar" | "22k_jewelry">("24k_coin");
  const [weight, setWeight] = useState<number>(10);
  const [customWeight, setCustomWeight] = useState<string>("");
  
  // Shipping Setup
  const [shipping, setShipping] = useState<ShippingForm>({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });
  
  const [deliveryPartner, setDeliveryPartner] = useState<"bullionguard" | "safepost" | "sequoia">("bullionguard");
  const [formErrors, setFormErrors] = useState<Partial<ShippingForm>>({});
  
  // Payment states
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "verifying" | "insuring" | "connecting" | "finalizing" | "success">("idle");
  const [transactionId, setTransactionId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [receiptNo, setReceiptNo] = useState("");

  // Prefill details from user profile if logged in
  useEffect(() => {
    const prefillUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          
          // Fetch additional profile data from database if available
          const { data: dbProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setShipping(prev => ({
            ...prev,
            name: dbProfile?.name || userMeta.name || userMeta.full_name || "",
            email: dbProfile?.email || session.user.email || "",
            city: dbProfile?.city || userMeta.city || "",
            state: dbProfile?.state || userMeta.state || "Maharashtra",
          }));
        }
      } catch (err) {
        console.warn("Could not prefill user profile data:", err);
      }
    };
    prefillUserData();
  }, []);

  // Compute live price rates
  const goldRate24k = useMemo(() => {
    return priceData?.metals?.gold || 7412; // Fallback rate if API is unavailable
  }, [priceData]);

  const liveRate = useMemo(() => {
    if (goldType === "22k_jewelry") {
      return goldRate24k * 0.9167; // 22K gold is 91.67% pure
    }
    return goldRate24k;
  }, [goldType, goldRate24k]);

  // Making charges: Coins: 3%, Bars: 2%, Jewelry: 8%
  const makingChargePct = useMemo(() => {
    if (goldType === "24k_coin") return 0.03;
    if (goldType === "24k_bar") return 0.02;
    return 0.08;
  }, [goldType]);

  const selectedWeight = useMemo(() => {
    if (weight === 0) {
      const parsed = parseFloat(customWeight);
      return isNaN(parsed) || parsed <= 0 ? 0 : parsed;
    }
    return weight;
  }, [weight, customWeight]);

  // Financial calculations
  const baseGoldValue = useMemo(() => {
    return selectedWeight * liveRate;
  }, [selectedWeight, liveRate]);

  const makingCharges = useMemo(() => {
    return baseGoldValue * makingChargePct;
  }, [baseGoldValue, makingChargePct]);

  const subtotal = useMemo(() => {
    return baseGoldValue + makingCharges;
  }, [baseGoldValue, makingCharges]);

  // Standard Gold GST rate in India is 3%
  const gst = useMemo(() => {
    return subtotal * 0.03;
  }, [subtotal]);

  const totalAmount = useMemo(() => {
    return subtotal + gst;
  }, [subtotal, gst]);

  // Validation
  const validateForm = (): boolean => {
    const errors: Partial<ShippingForm> = {};
    if (!shipping.name.trim()) errors.name = "Full name is required";
    if (!shipping.phone.trim() || !/^\d{10}$/.test(shipping.phone.trim())) {
      errors.phone = "Valid 10-digit mobile number is required";
    }
    if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email.trim())) {
      errors.email = "Valid email address is required";
    }
    if (!shipping.addressLine1.trim()) errors.addressLine1 = "Address Line 1 is required";
    if (!shipping.city.trim()) errors.city = "City is required";
    if (!shipping.pincode.trim() || !/^\d{6}$/.test(shipping.pincode.trim())) {
      errors.pincode = "Valid 6-digit pincode is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWeight <= 0) {
      toast.error("Please select or enter a valid gold weight");
      return;
    }
    if (validateForm()) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      toast.error("Please fill in all shipping details correctly");
    }
  };

  const handleBackStep = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  // Mock Payment Flow
  const startPayment = async () => {
    setPaymentStatus("verifying");
    
    // Progress through checkout milestones
    setTimeout(() => {
      setPaymentStatus("insuring");
      setTimeout(() => {
        setPaymentStatus("connecting");
        setTimeout(() => {
          setPaymentStatus("finalizing");
          setTimeout(() => {
            // Generate details
            const txId = "TXN" + Math.floor(100000000 + Math.random() * 900000000);
            const rcNo = "FG" + Math.floor(100000 + Math.random() * 900000);
            const dateStr = new Date().toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            });
            
            setTransactionId(txId);
            setReceiptNo(rcNo);
            setOrderDate(dateStr);
            setPaymentStatus("success");
            toast.success("Payment Received Successfully!");
            setStep(3);
            window.scrollTo(0, 0);
          }, 1200);
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setStep(1);
    setPaymentStatus("idle");
    setWeight(10);
    setCustomWeight("");
    // keep address but clear custom fields
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-noise">
      {/* Background radial overlays */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full print:hidden"
        style={{ background: "radial-gradient(circle, rgba(244,208,63,0.25), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute top-[45%] -left-40 h-[500px] w-[500px] rounded-full print:hidden"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 65%)" }}
      />

      <div className="print:hidden">
        <Nav />
      </div>

      <main className="pt-32 pb-24 px-4 max-w-7xl mx-auto print:pt-0 print:pb-0 print:px-0">
        
        {/* WIZARD PROGRESS BAR (Hidden on Receipt page and print) */}
        {step < 3 && (
          <section className="max-w-3xl mx-auto mb-12 print:hidden">
            <Reveal>
              <div className="flex items-center justify-between px-6">
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                    step === 1 
                      ? "bg-foreground text-background border-foreground" 
                      : "bg-emerald-800 border-emerald-800 text-white"
                  }`}>
                    {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                  </div>
                  <span className="text-xs font-semibold mt-2 text-foreground/80">Configure & Address</span>
                </div>
                <div className={`flex-1 h-0.5 mx-4 transition-colors ${step > 1 ? "bg-emerald-800" : "bg-border"}`} />
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                    step === 2 
                      ? "bg-foreground text-background border-foreground shadow-gold" 
                      : "bg-background border-border text-foreground/40"
                  }`}>
                    2
                  </div>
                  <span className="text-xs font-semibold mt-2 text-foreground/60">Secure Payment</span>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* STEP 1: CONFIGURE GOLD & SHIPPING DETAILS */}
        {step === 1 && (
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-start print:hidden">
            
            {/* LEFT COLUMN: CONFIGURATION FORM */}
            <Reveal delay={50}>
              <form onSubmit={handleNextStep} className="glass-light rounded-3xl border border-[#D4AF37]/20 p-6 md:p-8 space-y-8 shadow-soft backdrop-blur-xl">
                
                {/* Product Type Selection */}
                <div>
                  <h2 className="text-display text-xl font-bold flex items-center gap-2 text-foreground mb-4">
                    <Coins className="h-5 w-5 text-bronze" /> 1. Select Gold Format
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { id: "24k_coin", label: "24K Gold Coin", desc: "99.9% Purity · 3% Making", val: "24k_coin" },
                      { id: "24k_bar", label: "24K Gold Bar", desc: "99.9% Purity · 2% Making", val: "24k_bar" },
                      { id: "22k_jewelry", label: "22K Gold Jewelry", desc: "91.6% Purity · 8% Making", val: "22k_jewelry" },
                    ].map((item) => (
                      <label 
                        key={item.id} 
                        className={`flex flex-col justify-between p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          goldType === item.val 
                            ? "bg-foreground/5 border-foreground ring-2 ring-foreground/10" 
                            : "border-border/60 hover:border-foreground/30 bg-background/20"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="goldType" 
                          value={item.val} 
                          checked={goldType === item.val}
                          onChange={() => setGoldType(item.val as any)}
                          className="sr-only"
                        />
                        <span className="font-bold text-sm text-foreground">{item.label}</span>
                        <span className="text-[11px] text-foreground/60 mt-1">{item.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Weight Selection */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-display text-xl font-bold flex items-center gap-2 text-foreground">
                      <FileText className="h-5 w-5 text-bronze" /> 2. Gold Weight (Grams)
                    </h2>
                    <span className="text-xs font-semibold text-[#8A6A2F]">Min: 1 gram</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {[1, 5, 10, 20, 50].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => { setWeight(w); setCustomWeight(""); }}
                        className={`py-3.5 rounded-xl border text-sm font-bold transition-all ${
                          weight === w 
                            ? "bg-foreground text-background border-foreground" 
                            : "border-border/60 hover:border-foreground/30 bg-background/20 text-foreground/80"
                        }`}
                      >
                        {w}g
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setWeight(0)}
                      className={`w-full py-3.5 px-4 rounded-xl border text-sm font-bold text-left transition-all ${
                        weight === 0 
                          ? "bg-foreground/5 border-foreground" 
                          : "border-border/60 bg-background/20 text-foreground/80"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>Or Enter Custom Weight:</span>
                        {weight === 0 && (
                          <input
                            type="number"
                            step="0.1"
                            min="1"
                            value={customWeight}
                            onChange={(e) => setCustomWeight(e.target.value)}
                            placeholder="Enter grams"
                            className="bg-transparent text-right border-b border-foreground/30 focus:border-foreground outline-none font-bold text-foreground w-28 pr-1"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Delivery Address Details */}
                <div className="space-y-4">
                  <h2 className="text-display text-xl font-bold flex items-center gap-2 text-foreground">
                    <MapPin className="h-5 w-5 text-bronze" /> 3. Insured Delivery Location
                  </h2>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Full Name</label>
                      <input 
                        type="text" 
                        value={shipping.name}
                        onChange={(e) => setShipping({...shipping, name: e.target.value})}
                        placeholder="John Doe"
                        className={`w-full p-3 rounded-xl border bg-background/30 focus:ring-2 focus:ring-foreground/10 outline-none text-sm transition-all ${formErrors.name ? 'border-destructive/60' : 'border-border/60'}`}
                      />
                      {formErrors.name && <p className="text-[11px] text-destructive/90">{formErrors.name}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Mobile Number</label>
                      <input 
                        type="tel" 
                        maxLength={10}
                        value={shipping.phone}
                        onChange={(e) => setShipping({...shipping, phone: e.target.value.replace(/\D/g, "")})}
                        placeholder="9876543210"
                        className={`w-full p-3 rounded-xl border bg-background/30 focus:ring-2 focus:ring-foreground/10 outline-none text-sm transition-all ${formErrors.phone ? 'border-destructive/60' : 'border-border/60'}`}
                      />
                      {formErrors.phone && <p className="text-[11px] text-destructive/90">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email Address</label>
                    <input 
                      type="email" 
                      value={shipping.email}
                      onChange={(e) => setShipping({...shipping, email: e.target.value})}
                      placeholder="johndoe@example.com"
                      className={`w-full p-3 rounded-xl border bg-background/30 focus:ring-2 focus:ring-foreground/10 outline-none text-sm transition-all ${formErrors.email ? 'border-destructive/60' : 'border-border/60'}`}
                    />
                    {formErrors.email && <p className="text-[11px] text-destructive/90">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Address Line 1</label>
                    <input 
                      type="text" 
                      value={shipping.addressLine1}
                      onChange={(e) => setShipping({...shipping, addressLine1: e.target.value})}
                      placeholder="House / Apartment No., Street Address"
                      className={`w-full p-3 rounded-xl border bg-background/30 focus:ring-2 focus:ring-foreground/10 outline-none text-sm transition-all ${formErrors.addressLine1 ? 'border-destructive/60' : 'border-border/60'}`}
                    />
                    {formErrors.addressLine1 && <p className="text-[11px] text-destructive/90">{formErrors.addressLine1}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Address Line 2 (Optional)</label>
                    <input 
                      type="text" 
                      value={shipping.addressLine2}
                      onChange={(e) => setShipping({...shipping, addressLine2: e.target.value})}
                      placeholder="Landmark, Area, Colony"
                      className="w-full p-3 rounded-xl border bg-background/30 border-border/60 focus:ring-2 focus:ring-foreground/10 outline-none text-sm"
                    />
                  </div>

                  <div className="grid gap-4 grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">City</label>
                      <input 
                        type="text" 
                        value={shipping.city}
                        onChange={(e) => setShipping({...shipping, city: e.target.value})}
                        placeholder="Mumbai"
                        className={`w-full p-3 rounded-xl border bg-background/30 focus:ring-2 focus:ring-foreground/10 outline-none text-sm transition-all ${formErrors.city ? 'border-destructive/60' : 'border-border/60'}`}
                      />
                      {formErrors.city && <p className="text-[11px] text-destructive/90">{formErrors.city}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">State</label>
                      <select 
                        value={shipping.state}
                        onChange={(e) => setShipping({...shipping, state: e.target.value})}
                        className="w-full p-3 rounded-xl border bg-background/30 border-border/60 focus:ring-2 focus:ring-foreground/10 outline-none text-sm cursor-pointer"
                      >
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/60">Pincode</label>
                      <input 
                        type="text" 
                        maxLength={6}
                        value={shipping.pincode}
                        onChange={(e) => setShipping({...shipping, pincode: e.target.value.replace(/\D/g, "")})}
                        placeholder="400001"
                        className={`w-full p-3 rounded-xl border bg-background/30 focus:ring-2 focus:ring-foreground/10 outline-none text-sm transition-all ${formErrors.pincode ? 'border-destructive/60' : 'border-border/60'}`}
                      />
                      {formErrors.pincode && <p className="text-[11px] text-destructive/90">{formErrors.pincode}</p>}
                    </div>
                  </div>
                </div>

                {/* Delivery Security Partner selection */}
                <div>
                  <h2 className="text-display text-xl font-bold flex items-center gap-2 text-foreground mb-4">
                    <Truck className="h-5 w-5 text-bronze" /> 4. Shipping Insurance Partner
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { id: "bullionguard", label: "BullionGuard Secur", desc: "Armored shipping · Free", val: "bullionguard" },
                      { id: "safepost", label: "Safepost Insured", desc: "100% Insured transit · Free", val: "safepost" },
                      { id: "sequoia", label: "Sequoia Express", desc: "Hand-delivered priority · Free", val: "sequoia" },
                    ].map((partner) => (
                      <label 
                        key={partner.id} 
                        className={`flex flex-col justify-between p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          deliveryPartner === partner.val 
                            ? "bg-foreground/5 border-foreground ring-2 ring-foreground/10" 
                            : "border-border/60 hover:border-foreground/30 bg-background/20"
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="deliveryPartner" 
                          value={partner.val} 
                          checked={deliveryPartner === partner.val}
                          onChange={() => setDeliveryPartner(partner.val as any)}
                          className="sr-only"
                        />
                        <span className="font-bold text-sm text-foreground">{partner.label}</span>
                        <span className="text-[11px] text-foreground/60 mt-1">{partner.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full btn-gold btn-gold-hover py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm cursor-pointer mt-4"
                >
                  Review Order details <ChevronRight className="h-4 w-4" />
                </button>

              </form>
            </Reveal>

            {/* RIGHT COLUMN: PRICE SUMMARY & METRICS */}
            <div className="space-y-6">
              
              {/* LIVE RATE CARD */}
              <Reveal delay={100}>
                <div className="glass-light rounded-3xl border border-[#D4AF37]/20 p-6 flex flex-col justify-between shadow-soft backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  
                  <div>
                    <span className="eyebrow-tag text-[10px] tracking-widest text-bronze uppercase">Real-Time Gold Pricing</span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <h3 className="text-display text-4xl font-bold text-foreground">
                        {priceLoading ? (
                          <span className="inline-block h-8 w-32 animate-pulse bg-foreground/10 rounded" />
                        ) : (
                          `₹ ${Math.round(liveRate).toLocaleString("en-IN")}`
                        )}
                      </h3>
                      <span className="text-xs text-foreground/60">/ gram (24K)</span>
                    </div>
                    <p className="text-[11px] text-foreground/50 mt-1 flex items-center gap-1">
                      <Info className="h-3 w-3" /> Live gold rate dynamically sourced and locked.
                    </p>
                  </div>

                  <div className="mt-6 pt-6 hairline-t grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-foreground/50">Base purity</span>
                      <p className="text-sm font-bold text-foreground mt-0.5">
                        {goldType === "22k_jewelry" ? "22K (91.6% Fine)" : "24K (99.9% Fine)"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-foreground/50">Insured Vaulting</span>
                      <p className="text-sm font-bold text-foreground mt-0.5">Bullion-Standard</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* ESTIMATE CALCULATOR RECEIPT PREVIEW */}
              <Reveal delay={150}>
                <div className="glass-light rounded-3xl border border-[#D4AF37]/20 p-6 shadow-soft backdrop-blur-xl">
                  <h3 className="text-display text-lg font-bold text-foreground mb-4 pb-2 border-b border-border/20">Cost Breakdown</h3>
                  
                  <div className="space-y-3.5 text-sm">
                    <div className="flex justify-between text-foreground/75">
                      <span>Gold Value ({selectedWeight}g × ₹{Math.round(liveRate).toLocaleString("en-IN")})</span>
                      <span className="font-medium text-foreground">₹ {Math.round(baseGoldValue).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-foreground/75">
                      <span>Making Charges ({makingChargePct * 100}%)</span>
                      <span className="font-medium text-foreground">₹ {Math.round(makingCharges).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-foreground/75">
                      <span>GST (3%)</span>
                      <span className="font-medium text-foreground">₹ {Math.round(gst).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-foreground/75">
                      <span>Delivery & Armored Insurance</span>
                      <span className="font-semibold text-emerald-800">FREE</span>
                    </div>
                    
                    <div className="pt-4 mt-2 border-t border-dashed border-border/30 flex justify-between items-baseline">
                      <span className="text-base font-bold text-foreground">Total (Estimated)</span>
                      <span className="text-2xl font-bold text-gold-deep">
                        ₹ {Math.round(totalAmount).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#8A6A2F] shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed text-foreground/70">
                      <strong>Insured Guarantee:</strong> All Fingold physical products are delivered in tamper-proof sealed packaging, insured for transit, and require verification upon hand-delivery.
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>

          </div>
        )}

        {/* STEP 2: REVIEW & SECURE PAYMENT PORTAL */}
        {step === 2 && (
          <div className="max-w-3xl mx-auto print:hidden">
            <Reveal>
              
              <div className="glass-light rounded-3xl border border-[#D4AF37]/20 p-6 md:p-8 space-y-8 shadow-soft backdrop-blur-xl relative">
                
                {/* Back button */}
                <button
                  type="button"
                  onClick={handleBackStep}
                  disabled={paymentStatus !== "idle"}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground cursor-pointer transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Edit Order
                </button>

                <div className="text-center space-y-2">
                  <span className="eyebrow-tag text-xs tracking-wider text-bronze uppercase">Security Verification</span>
                  <h1 className="text-display text-3xl font-bold text-foreground">Review & Confirm Order</h1>
                  <p className="text-xs text-foreground/60 max-w-md mx-auto">
                    Please review your purchase breakdown and shipping details. Click "Confirm & Pay" to process the transaction.
                  </p>
                </div>

                {/* Grid details */}
                <div className="grid gap-6 md:grid-cols-2">
                  
                  {/* Delivery Location Details */}
                  <div className="p-5 rounded-2xl border border-border/30 bg-background/20 space-y-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-foreground/50">Insured Delivery Address</h3>
                    <div className="text-sm space-y-1 text-foreground/80">
                      <p className="font-bold text-foreground">{shipping.name}</p>
                      <p>{shipping.addressLine1}</p>
                      {shipping.addressLine2 && <p>{shipping.addressLine2}</p>}
                      <p>{shipping.city}, {shipping.state} - {shipping.pincode}</p>
                      <p className="pt-2 font-medium flex items-center gap-1 text-xs text-foreground/60"><Phone className="h-3.5 w-3.5" /> +91 {shipping.phone}</p>
                      <p className="font-medium flex items-center gap-1 text-xs text-foreground/60"><Mail className="h-3.5 w-3.5" /> {shipping.email}</p>
                    </div>
                  </div>

                  {/* Delivery details & Format */}
                  <div className="p-5 rounded-2xl border border-border/30 bg-background/20 space-y-4">
                    <div>
                      <h3 className="font-bold text-xs uppercase tracking-wider text-foreground/50 mb-1">Product Details</h3>
                      <p className="text-sm font-bold text-foreground">
                        {goldType === "24k_coin" && "24K Gold Coin (99.9% Purity)"}
                        {goldType === "24k_bar" && "24K Gold Bar (99.9% Purity)"}
                        {goldType === "22k_jewelry" && "22K Gold Jewelry (91.6% Purity)"}
                      </p>
                      <p className="text-xs text-foreground/60 mt-0.5">Quantity: {selectedWeight} grams</p>
                    </div>

                    <div>
                      <h3 className="font-bold text-xs uppercase tracking-wider text-foreground/50 mb-1">Transit Carrier</h3>
                      <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        <Truck className="h-4 w-4 text-[#8A6A2F]" />
                        {deliveryPartner === "bullionguard" && "BullionGuard Secure Transit"}
                        {deliveryPartner === "safepost" && "Safepost Insured Postal"}
                        {deliveryPartner === "sequoia" && "Sequoia Express Priority"}
                      </p>
                      <p className="text-xs text-emerald-800 font-semibold mt-0.5">Tamper-Proof Armored Transport</p>
                    </div>
                  </div>

                </div>

                {/* Final Cost Receipt */}
                <div className="p-6 rounded-2xl border border-border/40 bg-foreground/[0.02] space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-foreground/50 pb-2 border-b border-border/20">Payment Invoice</h3>
                  
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-foreground/75">
                      <span>Gold Base Value</span>
                      <span className="font-medium text-foreground">₹ {Math.round(baseGoldValue).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-foreground/75">
                      <span>Making Charges</span>
                      <span className="font-medium text-foreground">₹ {Math.round(makingCharges).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-foreground/75">
                      <span>GST (3%)</span>
                      <span className="font-medium text-foreground">₹ {Math.round(gst).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-foreground/75">
                      <span>Vaulting & Armored Transit Insurance</span>
                      <span className="font-semibold text-emerald-800">FREE</span>
                    </div>
                    <div className="h-px bg-border/20 my-2" />
                    <div className="flex justify-between items-baseline font-bold">
                      <span className="text-base text-foreground">Final Payable Amount</span>
                      <span className="text-3xl text-gold-deep">
                        ₹ {Math.round(totalAmount).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment button */}
                {paymentStatus === "idle" ? (
                  <button
                    type="button"
                    onClick={startPayment}
                    className="w-full btn-gold btn-gold-hover py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm cursor-pointer shadow-gold"
                  >
                    <CreditCard className="h-4 w-4" /> Confirm & Securely Pay ₹ {Math.round(totalAmount).toLocaleString("en-IN")}
                  </button>
                ) : (
                  <div className="w-full p-6 rounded-xl border border-border/30 bg-background/40 flex flex-col items-center justify-center space-y-4 text-center">
                    <Loader2 className="h-8 w-8 text-gold animate-spin" />
                    <div className="space-y-1">
                      <p className="font-bold text-foreground text-sm">
                        {paymentStatus === "verifying" && "Verifying Live Gold Rate Lock..."}
                        {paymentStatus === "insuring" && "Allocating Doorstep Delivery Insurance..."}
                        {paymentStatus === "connecting" && "Initiating Secure Bank Portal..."}
                        {paymentStatus === "finalizing" && "Authorizing Token & Generating Receipt..."}
                      </p>
                      <p className="text-xs text-foreground/60">Do not refresh this page or close the window.</p>
                    </div>
                  </div>
                )}

              </div>
              
            </Reveal>
          </div>
        )}

        {/* STEP 3: ORDER RECEIPT INVOICE */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <Reveal>
              
              <div className="bg-white text-slate-900 border border-slate-200 shadow-xl rounded-3xl p-6 md:p-10 relative overflow-hidden print:shadow-none print:border-none print:p-0">
                
                {/* Gold header borders for print / layout */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 print:hidden" />
                
                {/* SUCCESS ICON HEADER (hidden on print) */}
                <div className="text-center space-y-3 pb-8 border-b border-slate-100 print:hidden">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                    <Check className="h-6 w-6" />
                  </div>
                  <h1 className="text-xl font-bold text-slate-800">Order Completed Successfully</h1>
                  <p className="text-xs text-slate-500">Your physical gold has been locked and allocated for armored delivery.</p>
                </div>

                {/* INVOICE HERO HEADER */}
                <div className="flex justify-between items-start pt-8 pb-6 print:pt-0">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-wider text-slate-800 font-sans">FINGOLD</h2>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">Gold Custody & Delivery</p>
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Official Receipt</h3>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">No: {receiptNo}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Date: {orderDate}</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 py-6 border-t border-b border-slate-100 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-2">Customer Details</h4>
                    <p className="font-bold text-slate-800">{shipping.name}</p>
                    <p className="text-slate-500">+91 {shipping.phone}</p>
                    <p className="text-slate-500">{shipping.email}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-2">Destination Address</h4>
                    <p className="text-slate-600">{shipping.addressLine1}</p>
                    {shipping.addressLine2 && <p className="text-slate-600">{shipping.addressLine2}</p>}
                    <p className="text-slate-600">{shipping.city}, {shipping.state} - {shipping.pincode}</p>
                    <p className="font-semibold text-slate-700 mt-2 flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5 shrink-0" />
                      Carrier: {
                        deliveryPartner === "bullionguard" ? "BullionGuard Secure Transit" :
                        deliveryPartner === "safepost" ? "Safepost Insured Postal" : "Sequoia Express Priority"
                      }
                    </p>
                  </div>
                </div>

                {/* PRODUCT LIST */}
                <div className="py-6 border-b border-slate-100">
                  <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Itemized Details</h4>
                  
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 pb-2">
                        <th className="font-bold pb-2">Product Description</th>
                        <th className="font-bold text-center pb-2">Weight</th>
                        <th className="font-bold text-right pb-2">Live Rate /g</th>
                        <th className="font-bold text-right pb-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-700">
                      <tr>
                        <td className="py-3 font-semibold text-slate-800">
                          {goldType === "24k_coin" && "24K Gold Coin (99.9% Purity)"}
                          {goldType === "24k_bar" && "24K Gold Bar (99.9% Purity)"}
                          {goldType === "22k_jewelry" && "22K Gold Jewelry (91.6% Purity)"}
                        </td>
                        <td className="py-3 text-center">{selectedWeight}g</td>
                        <td className="py-3 text-right">₹ {Math.round(liveRate).toLocaleString("en-IN")}</td>
                        <td className="py-3 text-right font-medium">₹ {Math.round(baseGoldValue).toLocaleString("en-IN")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* TOTAL COST RECEIPT BREAKDOWN */}
                <div className="py-6 text-xs flex justify-end">
                  <div className="w-64 space-y-2 text-slate-600">
                    <div className="flex justify-between">
                      <span>Gold Base Cost</span>
                      <span className="font-medium text-slate-800">₹ {Math.round(baseGoldValue).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Making Charges</span>
                      <span className="font-medium text-slate-800">₹ {Math.round(makingCharges).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (3%)</span>
                      <span className="font-medium text-slate-800">₹ {Math.round(gst).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-emerald-800">
                      <span>Transit Insurance</span>
                      <span>FREE</span>
                    </div>
                    <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-slate-800">
                      <span className="text-sm">Total Paid</span>
                      <span className="text-base text-slate-900">₹ {Math.round(totalAmount).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                {/* TRANSACTION METRICS */}
                <div className="bg-slate-50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 gap-4 mt-2">
                  <div>
                    <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider">Gateway Transaction ID</span>
                    <span className="font-mono font-semibold text-slate-700">{transactionId}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 uppercase text-[9px] tracking-wider">Custody Allocation status</span>
                    <span className="font-semibold text-emerald-800">Paid · Preparing Shipment</span>
                  </div>
                </div>

                <div className="mt-8 text-center text-[10px] text-slate-400 leading-relaxed border-t border-slate-100 pt-6">
                  Thank you for investing with Fingold. This is a computer-generated transaction record invoice.
                  Your shipment is fully transit-insured by BullionGuard Insurances. Delivery will require OTP signature verification.
                </div>

                {/* BUTTONS (Hidden on Print) */}
                <div className="mt-10 flex gap-3 print:hidden justify-center">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-slate-300 font-semibold text-sm hover:bg-slate-50 cursor-pointer text-slate-700"
                  >
                    <Printer className="h-4 w-4" /> Print / Save Invoice
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 cursor-pointer"
                  >
                    Buy Gold Again
                  </button>
                </div>

              </div>

            </Reveal>
          </div>
        )}

      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
