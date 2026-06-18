import { useState } from "react";

const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F0D060";
const GOLD_PALE = "#FDF8E7";
const BLACK = "#111111";
const DARK = "#1A1A1A";
const GRAY = "#4A4A4A";
const LIGHT_GRAY = "#F5F5F5";
const WHITE = "#FFFFFF";
const BORDER = "#E8E0C8";

const sections = [
  "Executive Summary",
  "Product Vision",
  "Business Goals",
  "User Personas",
  "Feature List",
  "Functional Requirements",
  "Non-Functional Requirements",
  "User Flows",
  "Information Architecture",
  "Database Schema",
  "API Requirements",
  "Security Framework",
  "Admin Dashboard",
  "Monetization",
  "Dev Roadmap",
  "MVP Scope",
  "Future Enhancements",
  "Success Metrics",
  "UI/UX Guidelines",
  "Technical Architecture",
];

const prdContent = {
  "Executive Summary": {
    icon: "📋",
    content: [
      {
        type: "para",
        text: "Fingold is a next-generation digital gold investment platform designed to democratize access to gold-based financial instruments in India and emerging markets. By consolidating Digital Gold, Physical Gold, Gold ETFs, Sovereign Gold Bonds, Gold Mutual Funds, Gold Mining Stocks, and Gold Futures & Options into a single unified platform, Fingold eliminates the friction, complexity, and opacity that has historically kept retail investors away from gold as an asset class.",
      },
      {
        type: "para",
        text: 'The platform operates under the tagline "Invest in Gold, Secure Your Future" — a promise that speaks directly to first-time investors, salaried professionals, small business owners, long-term wealth builders, and young investors aged 18–40. Fingold is built on a foundation of regulatory compliance, bank-grade security, real-time market data, and a premium yet approachable user experience.',
      },
      {
        type: "highlight",
        text: "Market Opportunity: India's gold investment market is valued at over $40 billion annually, with digital gold adoption growing at 35% CAGR. Less than 8% of Indian retail investors currently have access to diversified gold investment products through a single platform. Fingold captures this gap with a mobile-first, regulation-compliant, and trust-first product.",
      },
      {
        type: "kv",
        items: [
          ["Document Version", "1.0.0"],
          ["Document Status", "Final Draft"],
          ["Prepared For", "Designers, Developers, PMs, Investors, Stakeholders"],
          ["Platform Type", "Web + Mobile (PWA)"],
          ["Target Launch", "Q3 2025 (MVP)"],
          ["Regulatory Framework", "SEBI, RBI, PMLA, KYC Norms"],
          ["Primary Market", "India (Global expansion Phase 3)"],
        ],
      },
    ],
  },
  "Product Vision": {
    icon: "🔭",
    content: [
      {
        type: "heading",
        text: "Vision Statement",
      },
      {
        type: "quote",
        text: "To become the most trusted gold investment platform in Asia by making every form of gold investment accessible, transparent, and intelligent for every investor — regardless of their financial literacy or wealth level.",
      },
      {
        type: "heading",
        text: "Mission Statement",
      },
      {
        type: "para",
        text: "Fingold's mission is to simplify the gold investment journey by providing a secure, regulation-compliant, and beautifully designed platform that empowers users to invest across the full spectrum of gold assets — from ₹1 digital gold to sovereign bonds — with complete transparency, real-time insights, and institutional-grade security.",
      },
      {
        type: "heading",
        text: "Core Pillars",
      },
      {
        type: "pillars",
        items: [
          {
            title: "Accessibility",
            desc: "Start investing with as little as ₹1. No financial expertise required. Simplified onboarding with guided education.",
          },
          {
            title: "Transparency",
            desc: "Real-time gold prices. No hidden fees. Full audit trail. Regulatory compliance at every step.",
          },
          {
            title: "Security",
            desc: "Bank-grade encryption. 2FA. SEBI-regulated. Insured gold storage. Fraud detection systems.",
          },
          {
            title: "Intelligence",
            desc: "AI-powered portfolio insights. Predictive analytics. Personalized investment recommendations.",
          },
          {
            title: "Completeness",
            desc: "All gold investment instruments in one place. No need for multiple platforms or brokers.",
          },
        ],
      },
      {
        type: "heading",
        text: "Design Philosophy",
      },
      {
        type: "para",
        text: "Fingold is designed to feel like the intersection of a luxury private bank and a modern fintech app. The visual language uses deep blacks, warm golds, and crisp whites to evoke premium trust, wealth, and clarity. Every pixel earns its place by either building trust or reducing friction.",
      },
    ],
  },
  "Business Goals": {
    icon: "🎯",
    content: [
      {
        type: "heading",
        text: "12-Month Business Goals",
      },
      {
        type: "goals",
        items: [
          {
            metric: "100,000+",
            label: "Registered Users",
            detail:
              "Achieved through referral programs, content marketing, and partnership channels",
          },
          {
            metric: "₹500 Cr+",
            label: "Assets Under Management",
            detail: "Across all gold investment categories within 18 months of launch",
          },
          {
            metric: "60%",
            label: "KYC Completion Rate",
            detail: "Industry-leading KYC funnel powered by video KYC and DigiLocker integration",
          },
          {
            metric: "4.5★",
            label: "App Store Rating",
            detail: "Maintained through continuous UX improvements and responsive support",
          },
          {
            metric: "35%",
            label: "Monthly Active User Rate",
            detail: "Driven by portfolio dashboards, price alerts, and educational content loops",
          },
          {
            metric: "<2%",
            label: "Customer Churn Rate",
            detail: "Ensured through engagement hooks, SIP auto-investments, and loyalty rewards",
          },
        ],
      },
      {
        type: "heading",
        text: "Revenue Goals",
      },
      {
        type: "kv",
        items: [
          ["Year 1 Revenue Target", "₹15 Crore"],
          ["Year 2 Revenue Target", "₹60 Crore"],
          ["Year 3 Revenue Target", "₹180 Crore"],
          ["Break-even Timeline", "Month 18 post-launch"],
          ["Primary Revenue Stream", "Transaction Spread + Platform Fees"],
          ["Secondary Revenue Stream", "Premium Subscriptions + Advisory"],
        ],
      },
      {
        type: "heading",
        text: "Strategic Objectives",
      },
      {
        type: "list",
        items: [
          "Obtain SEBI broker license and AMFI registration within 6 months of incorporation",
          "Partner with minimum 3 SEBI-registered gold custodians for physical gold storage",
          "Integrate with minimum 5 major payment gateways (Razorpay, PayU, Cashfree, etc.)",
          "Establish co-branding partnerships with at least 2 major banks by Month 12",
          "Launch API marketplace for B2B gold investment-as-a-service by Year 2",
          "Achieve ISO 27001 certification for information security by Month 9",
          "File for international money transfer license for NRI gold investments by Month 15",
        ],
      },
    ],
  },
  "User Personas": {
    icon: "👥",
    content: [
      {
        type: "personas",
        items: [
          {
            name: "Priya Sharma",
            role: "First-Time Investor",
            age: "24",
            income: "₹3.5L/year",
            tech: "High",
            goal: "Start investing with small amounts, learn as she goes",
            pain: "Overwhelmed by financial jargon, doesn't trust traditional brokers, fears losing money",
            behavior: "Researches on YouTube/Instagram, prefers mobile apps, needs hand-holding",
            features: ["Gold SIP from ₹100", "Learning Center", "Goal Planner", "Simple UI"],
          },
          {
            name: "Rajesh Mehta",
            role: "Salaried Professional",
            age: "34",
            income: "₹12L/year",
            tech: "Medium",
            goal: "Diversify portfolio, hedge against inflation, systematic wealth building",
            pain: "No single platform for all gold types, complex KYC processes, poor portfolio visibility",
            behavior: "Uses multiple apps, prefers web dashboard, values analytics",
            features: ["Portfolio Dashboard", "ETF + SGB Investments", "Tax Reports", "Analytics"],
          },
          {
            name: "Sunita Agarwal",
            role: "Small Business Owner",
            age: "42",
            income: "₹25L/year",
            tech: "Low-Medium",
            goal: "Store wealth in gold as business hedge, buy physical gold",
            pain: "Doesn't trust digital gold, wants physical delivery option, needs bulk investment",
            behavior: "Prefers phone calls, needs simple UX, trusts brands with physical presence",
            features: [
              "Physical Gold Delivery",
              "Gold Bars/Coins",
              "Bulk Purchase",
              "Relationship Manager",
            ],
          },
          {
            name: "Arjun Nair",
            role: "Long-term Wealth Builder",
            age: "38",
            income: "₹30L/year",
            tech: "High",
            goal: "Build generational wealth, track performance vs benchmarks, diversify globally",
            pain: "Wants advanced analytics, frustrated by lack of gold futures access, needs tax optimization",
            behavior: "Uses Bloomberg, reads research reports, wants API access",
            features: ["Futures & Options", "Mining Stocks", "Advanced Analytics", "API Access"],
          },
          {
            name: "Kavya Reddy",
            role: "Young Digital Native",
            age: "21",
            income: "₹1.8L/year",
            tech: "Very High",
            goal: "Start early, micro-investments, learn about gold as an asset class",
            pain: "Very small investable amount, needs education, wants gamification",
            behavior: "Social media driven, peer reviews, referral-based discovery",
            features: ["₹1 Digital Gold", "Referral Program", "Learning Badges", "Price Alerts"],
          },
          {
            name: "Ramesh Joshi",
            role: "Gold Enthusiast / Collector",
            age: "55",
            income: "₹18L/year",
            tech: "Low",
            goal: "Invest in physical gold coins, track collection value, buy on auspicious dates",
            pain: "Purity verification, storage safety, high offline dealer markups",
            behavior: "Prefers trusted brands, needs phone support, values assurance certificates",
            features: [
              "Certified Physical Gold",
              "BIS Hallmark Verification",
              "Storage Insurance",
              "Phone Support",
            ],
          },
        ],
      },
    ],
  },
  "Feature List": {
    icon: "⭐",
    content: [
      {
        type: "feature_categories",
        items: [
          {
            category: "Digital Gold",
            color: "#D4AF37",
            features: [
              "Instant buy/sell with real-time pricing",
              "Fractional ownership (from ₹1)",
              "Auto-debit SIP for digital gold",
              "Price alerts (SMS/email/push)",
              "Secure vault storage with insurance",
              "Digital gold certificate generation",
              "Transfer to family members",
              "Redemption to physical gold",
            ],
          },
          {
            category: "Physical Gold",
            color: "#B8960C",
            features: [
              "Gold coins (0.5g to 100g)",
              "Gold bars (1g to 1kg)",
              "BIS Hallmark certified products",
              "Home delivery with tracking",
              "Tamper-proof packaging",
              "Purity assay certificate",
              "Buyback guarantee",
              "Safe deposit locker integration",
            ],
          },
          {
            category: "Gold ETFs",
            color: "#C49A00",
            features: [
              "10+ Gold ETF options",
              "Real-time NAV tracking",
              "ETF comparison tool",
              "SIP investments in ETFs",
              "Expense ratio comparison",
              "Tax efficiency analysis",
              "Performance vs gold price benchmark",
              "Broker integration (Zerodha/Groww)",
            ],
          },
          {
            category: "Sovereign Gold Bonds",
            color: "#A67C00",
            features: [
              "New tranche subscription alerts",
              "RBI-authorized bond purchase",
              "Interest tracking (2.5% p.a.)",
              "Maturity calendar",
              "Premature exit guidance",
              "Tax exemption tracking",
              "Digital bond certificate storage",
              "Nomination management",
            ],
          },
          {
            category: "Gold Mutual Funds",
            color: "#D4AF37",
            features: [
              "20+ Gold fund options",
              "Fund comparison by returns/risk",
              "SIP & lump sum investments",
              "NAV history charts",
              "Automatic rebalancing alerts",
              "Capital gains statements",
              "ELSS Gold Fund filtering",
              "Fund manager profile",
            ],
          },
          {
            category: "Gold Mining Stocks",
            color: "#B8960C",
            features: [
              "Indian & global mining stocks",
              "Company financials & ratios",
              "Correlation with gold prices",
              "Sector news integration",
              "Analyst ratings",
              "Dividend tracking",
              "Portfolio correlation analysis",
              "Stock screener",
            ],
          },
          {
            category: "Gold Futures & Options",
            color: "#C49A00",
            features: [
              "MCX futures education module",
              "Paper trading simulator",
              "Risk disclosure acceptance",
              "Margin calculator",
              "Options chain viewer",
              "Expiry calendar & alerts",
              "P&L tracker",
              "Advanced investor verification",
            ],
          },
          {
            category: "Platform Features",
            color: "#1A1A1A",
            features: [
              "Unified portfolio dashboard",
              "Multi-asset allocation pie chart",
              "Tax report generation (LTCG/STCG)",
              "Transaction history export (CSV/PDF)",
              "Nominee management",
              "Joint account support",
              "Dark mode UI",
              "Multi-language support (6 languages)",
            ],
          },
        ],
      },
    ],
  },
  "Functional Requirements": {
    icon: "⚙️",
    content: [
      {
        type: "heading",
        text: "FR-01: User Authentication & Onboarding",
      },
      {
        type: "req_table",
        headers: ["ID", "Requirement", "Priority", "Module"],
        rows: [
          ["FR-01.1", "Mobile OTP registration with Aadhaar-linked number", "P0", "Auth"],
          ["FR-01.2", "Email verification with secure token", "P0", "Auth"],
          ["FR-01.3", "Video KYC with face liveness detection", "P0", "KYC"],
          ["FR-01.4", "PAN verification via NSDL API", "P0", "KYC"],
          ["FR-01.5", "DigiLocker Aadhaar linking", "P0", "KYC"],
          ["FR-01.6", "Bank account verification via penny drop", "P0", "KYC"],
          ["FR-01.7", "Biometric login (Face ID / Fingerprint)", "P1", "Auth"],
          ["FR-01.8", "MPIN setup for quick access", "P1", "Auth"],
          ["FR-01.9", "Social login (Google/Apple)", "P2", "Auth"],
          ["FR-01.10", "Referral code entry during signup", "P2", "Growth"],
        ],
      },
      {
        type: "heading",
        text: "FR-02: Gold Investment Transactions",
      },
      {
        type: "req_table",
        headers: ["ID", "Requirement", "Priority", "Module"],
        rows: [
          ["FR-02.1", "Buy digital gold in INR amount or gram quantity", "P0", "Trading"],
          ["FR-02.2", "Sell digital gold with T+1 settlement", "P0", "Trading"],
          ["FR-02.3", "Real-time gold price with 15-second refresh", "P0", "Market Data"],
          ["FR-02.4", "Bid-ask spread display with transaction fee breakdown", "P0", "Trading"],
          ["FR-02.5", "SIP setup with custom frequency (daily/weekly/monthly)", "P0", "SIP"],
          ["FR-02.6", "Lump sum investment with limit/market order", "P0", "Trading"],
          ["FR-02.7", "Physical delivery request from digital gold balance", "P1", "Delivery"],
          ["FR-02.8", "ETF purchase through NSE/BSE integration", "P1", "ETF"],
          ["FR-02.9", "SGB subscription during RBI issue windows", "P1", "SGB"],
          ["FR-02.10", "Mutual fund SIP/lump sum via AMFI-registered RTA", "P1", "MF"],
        ],
      },
      {
        type: "heading",
        text: "FR-03: Portfolio & Analytics",
      },
      {
        type: "req_table",
        headers: ["ID", "Requirement", "Priority", "Module"],
        rows: [
          ["FR-03.1", "Unified portfolio view across all gold asset types", "P0", "Portfolio"],
          ["FR-03.2", "Live P&L with percentage change from cost basis", "P0", "Portfolio"],
          ["FR-03.3", "Asset allocation pie chart with drill-down", "P0", "Analytics"],
          ["FR-03.4", "Transaction history with filters (date/type/asset)", "P0", "Portfolio"],
          ["FR-03.5", "Capital gains report for income tax filing", "P1", "Tax"],
          ["FR-03.6", "XIRR calculation for each investment", "P1", "Analytics"],
          ["FR-03.7", "Portfolio performance vs gold price benchmark", "P1", "Analytics"],
          ["FR-03.8", "Downloadable account statement (PDF/CSV)", "P1", "Reports"],
          ["FR-03.9", "Goal progress tracker with projected achievement date", "P2", "Goals"],
          ["FR-03.10", "Predictive portfolio value (AI-based forecast)", "P3", "AI"],
        ],
      },
      {
        type: "heading",
        text: "FR-04: Payment Processing",
      },
      {
        type: "req_table",
        headers: ["ID", "Requirement", "Priority", "Module"],
        rows: [
          ["FR-04.1", "UPI payment with instant settlement", "P0", "Payments"],
          ["FR-04.2", "Net banking via 50+ banks", "P0", "Payments"],
          ["FR-04.3", "Debit card payment (Visa/Mastercard/RuPay)", "P0", "Payments"],
          ["FR-04.4", "Credit card payment with 0% EMI option", "P1", "Payments"],
          ["FR-04.5", "Wallet integration (Paytm/PhonePe/Amazon Pay)", "P1", "Payments"],
          ["FR-04.6", "Auto-debit NACH mandate for SIP", "P0", "SIP"],
          ["FR-04.7", "Failed payment retry with user notification", "P0", "Payments"],
          ["FR-04.8", "Refund processing within 3-5 business days", "P0", "Payments"],
        ],
      },
    ],
  },
  "Non-Functional Requirements": {
    icon: "🔧",
    content: [
      {
        type: "heading",
        text: "Performance Requirements",
      },
      {
        type: "nfr_table",
        headers: ["Requirement", "Target", "Measurement"],
        rows: [
          ["Page Load Time (LCP)", "< 2.5 seconds", "Google Lighthouse"],
          ["API Response Time (P95)", "< 500ms", "APM Tools"],
          ["Gold Price Update Latency", "< 15 seconds", "Real-time monitoring"],
          ["Transaction Completion Time", "< 3 seconds", "End-to-end tracing"],
          ["System Uptime", "99.95% SLA", "Uptime monitoring"],
          ["Concurrent Users", "100,000+", "Load testing"],
          ["Database Query Time", "< 100ms (P99)", "DB profiling"],
          ["Mobile First Contentful Paint", "< 1.8 seconds", "WebPageTest"],
        ],
      },
      {
        type: "heading",
        text: "Scalability Requirements",
      },
      {
        type: "list",
        items: [
          "Horizontal auto-scaling on AWS/GCP with Kubernetes orchestration",
          "Database read replicas for analytics queries",
          "CDN distribution across 5+ PoPs for static assets",
          "Microservices architecture for independent scaling of trading, payments, and analytics modules",
          "Event-driven architecture (Kafka/SQS) for transaction processing at scale",
          "Cache layer (Redis) for gold prices, user sessions, and portfolio summaries",
          "Rate limiting: 1000 API calls/minute per user, 10,000 for enterprise partners",
        ],
      },
      {
        type: "heading",
        text: "Accessibility & Compliance",
      },
      {
        type: "nfr_table",
        headers: ["Standard", "Requirement", "Scope"],
        rows: [
          ["WCAG 2.1", "Level AA compliance", "All web pages"],
          ["SEBI Regulations", "Full broker compliance", "Trading features"],
          ["RBI Guidelines", "Payment aggregator compliance", "Payments"],
          ["PMLA Act", "AML/CFT compliance", "Transactions"],
          ["IT Act 2000", "Data protection compliance", "All data"],
          ["GDPR", "Data residency & rights", "Global users"],
          ["PCI DSS", "Level 1 certification", "Payment processing"],
          ["ISO 27001", "Information security", "Full platform"],
        ],
      },
      {
        type: "heading",
        text: "Reliability & Disaster Recovery",
      },
      {
        type: "kv",
        items: [
          ["RTO (Recovery Time Objective)", "< 4 hours"],
          ["RPO (Recovery Point Objective)", "< 1 hour"],
          ["Backup Frequency", "Every 6 hours (incremental), Daily (full)"],
          ["Backup Retention", "90 days"],
          ["DR Region", "Secondary AWS region (auto-failover)"],
          ["Data Replication", "Synchronous multi-AZ replication"],
          ["Chaos Engineering", "Monthly resilience testing"],
        ],
      },
    ],
  },
  "User Flows": {
    icon: "🔄",
    content: [
      {
        type: "heading",
        text: "UF-01: New User Registration & KYC Flow",
      },
      {
        type: "flow",
        steps: [
          {
            step: "1",
            title: "App Discovery",
            desc: "User downloads app / visits website via ad, referral, or organic search",
          },
          {
            step: "2",
            title: "Phone Number Entry",
            desc: "User enters mobile number → OTP sent via SMS → OTP verified",
          },
          {
            step: "3",
            title: "Basic Profile",
            desc: "Name, email, date of birth, gender collected. Email OTP verification.",
          },
          {
            step: "4",
            title: "PAN Verification",
            desc: "User enters PAN → NSDL API validates → Name match verification",
          },
          {
            step: "5",
            title: "Aadhaar KYC",
            desc: "DigiLocker link OR Video KYC → Face liveness check → Document OCR",
          },
          {
            step: "6",
            title: "Bank Account Linking",
            desc: "Account number + IFSC → Penny drop verification → Account confirmed",
          },
          {
            step: "7",
            title: "Risk Profiling",
            desc: "5-question risk appetite survey → Investment profile assigned",
          },
          {
            step: "8",
            title: "Dashboard Onboarding",
            desc: "Guided tour of platform → First investment prompt → SIP setup offer",
          },
        ],
      },
      {
        type: "heading",
        text: "UF-02: Digital Gold Purchase Flow",
      },
      {
        type: "flow",
        steps: [
          {
            step: "1",
            title: "Product Selection",
            desc: "User taps 'Digital Gold' from home or product page",
          },
          {
            step: "2",
            title: "Amount / Quantity Entry",
            desc: "Toggle between INR amount and gram quantity. Live conversion shown.",
          },
          {
            step: "3",
            title: "Price Lock",
            desc: "30-second price lock activated. Countdown timer shown to user.",
          },
          {
            step: "4",
            title: "Order Summary",
            desc: "Breakdown: gold price, platform fee, GST, total payable. User confirms.",
          },
          {
            step: "5",
            title: "Payment",
            desc: "UPI/Net Banking/Card selection → Payment gateway → Transaction in progress",
          },
          {
            step: "6",
            title: "Order Processing",
            desc: "Gold allocated from vault partner → Ledger updated → Certificate generated",
          },
          {
            step: "7",
            title: "Confirmation",
            desc: "Success screen with order ID, gold grams credited, portfolio update",
          },
          {
            step: "8",
            title: "Post-Purchase",
            desc: "Email/SMS receipt → Portfolio reflects new holding → Share investment option",
          },
        ],
      },
      {
        type: "heading",
        text: "UF-03: SIP Setup Flow",
      },
      {
        type: "flow",
        steps: [
          {
            step: "1",
            title: "SIP Initiation",
            desc: "User selects investment type → Chooses 'Start SIP'",
          },
          {
            step: "2",
            title: "SIP Configuration",
            desc: "Amount, frequency (daily/weekly/monthly), start date, duration",
          },
          {
            step: "3",
            title: "NACH Mandate",
            desc: "User authorizes auto-debit via net banking or Aadhaar-based e-NACH",
          },
          {
            step: "4",
            title: "SIP Confirmation",
            desc: "SIP summary, next debit date, projected corpus calculator shown",
          },
          {
            step: "5",
            title: "Ongoing Management",
            desc: "User can pause, modify, or cancel SIP from dashboard at any time",
          },
        ],
      },
      {
        type: "heading",
        text: "UF-04: Physical Gold Delivery Flow",
      },
      {
        type: "flow",
        steps: [
          {
            step: "1",
            title: "Redemption Request",
            desc: "User selects digital gold balance → Clicks 'Request Physical Delivery'",
          },
          {
            step: "2",
            title: "Product Selection",
            desc: "Choose from available denominations (coins/bars) matching balance",
          },
          {
            step: "3",
            title: "Address Entry",
            desc: "Delivery address with PIN code validation. ID proof for delivery required.",
          },
          {
            step: "4",
            title: "Fee Payment",
            desc: "Making charges + delivery charges + GST displayed. Payment processed.",
          },
          {
            step: "5",
            title: "Order Placed",
            desc: "Gold minted/packed at partner vault. Order ID and tracking number issued.",
          },
          {
            step: "6",
            title: "Delivery Tracking",
            desc: "Courier updates via SMS/app. Estimated 5-7 business days delivery.",
          },
          {
            step: "7",
            title: "Delivery Confirmation",
            desc: "OTP-based delivery confirmation. Certificate and invoice emailed.",
          },
        ],
      },
    ],
  },
  "Information Architecture": {
    icon: "🗺️",
    content: [
      {
        type: "heading",
        text: "Site Map — Public Website",
      },
      {
        type: "sitemap",
        tree: [
          {
            label: "Home",
            children: [
              "Hero + Value Proposition",
              "Live Gold Price Ticker",
              "Investment Categories",
              "Benefits Section",
              "Testimonials",
              "CTA Sections",
            ],
          },
          {
            label: "Investment Products",
            children: [
              "Digital Gold",
              "Physical Gold",
              "Gold ETFs",
              "Sovereign Gold Bonds",
              "Gold Mutual Funds",
              "Gold Mining Stocks",
              "Gold Futures & Options",
              "Product Comparison Table",
            ],
          },
          {
            label: "Live Gold Price",
            children: [
              "Real-time 24K/22K/18K Prices",
              "Historical Price Charts",
              "Gold Rate by City",
              "Market Insights",
              "Price Alerts Signup",
            ],
          },
          {
            label: "Calculators",
            children: [
              "Gold SIP Calculator",
              "Lump Sum Calculator",
              "Goal Planner",
              "Future Value Calculator",
              "Physical Gold Value Calculator",
            ],
          },
          {
            label: "Learning Center",
            children: [
              "Blog / Articles",
              "Gold Investment Guides",
              "Video Tutorials",
              "Market News",
              "Glossary",
              "FAQs",
            ],
          },
          {
            label: "About Us",
            children: [
              "Company Vision & Mission",
              "Leadership Team",
              "Why Fingold",
              "Press & Media",
              "Careers",
              "Regulatory Compliance",
            ],
          },
        ],
      },
      {
        type: "heading",
        text: "App Architecture — Authenticated Users",
      },
      {
        type: "sitemap",
        tree: [
          {
            label: "Dashboard (Home)",
            children: [
              "Portfolio Summary",
              "Quick Actions (Buy/Sell)",
              "Live Gold Price Widget",
              "Active SIPs",
              "Recent Transactions",
              "Market Insights",
            ],
          },
          {
            label: "Invest",
            children: [
              "Digital Gold",
              "Physical Gold",
              "Gold ETFs",
              "Sovereign Gold Bonds",
              "Gold Mutual Funds",
              "Mining Stocks",
              "Futures & Options",
            ],
          },
          {
            label: "Portfolio",
            children: [
              "Holdings Overview",
              "Asset Allocation",
              "P&L Tracker",
              "Transaction History",
              "Performance Analytics",
              "Tax Reports",
            ],
          },
          {
            label: "SIPs",
            children: ["Active SIPs", "SIP Calendar", "Start New SIP", "SIP Analytics"],
          },
          {
            label: "Account",
            children: [
              "Profile & KYC",
              "Bank Accounts",
              "Nominees",
              "Notifications",
              "Security Settings",
              "Documents",
              "Refer & Earn",
            ],
          },
        ],
      },
    ],
  },
  "Database Schema": {
    icon: "🗄️",
    content: [
      {
        type: "heading",
        text: "Core Database Tables",
      },
      {
        type: "schema",
        tables: [
          {
            name: "users",
            desc: "Core user identity and profile",
            fields: [
              "id (UUID, PK)",
              "phone_number (VARCHAR, UNIQUE, NOT NULL)",
              "email (VARCHAR, UNIQUE)",
              "full_name (VARCHAR)",
              "date_of_birth (DATE)",
              "gender (ENUM)",
              "pan_number (VARCHAR, ENCRYPTED)",
              "aadhaar_last4 (VARCHAR)",
              "kyc_status (ENUM: pending/submitted/verified/rejected)",
              "risk_profile (ENUM: conservative/moderate/aggressive)",
              "referral_code (VARCHAR, UNIQUE)",
              "referred_by (UUID, FK → users)",
              "is_active (BOOLEAN)",
              "created_at (TIMESTAMP)",
              "updated_at (TIMESTAMP)",
            ],
          },
          {
            name: "portfolios",
            desc: "User investment holdings per asset type",
            fields: [
              "id (UUID, PK)",
              "user_id (UUID, FK → users)",
              "asset_type (ENUM: digital_gold/etf/sgb/mf/stock/futures)",
              "quantity (DECIMAL 18,8)",
              "average_cost (DECIMAL 18,4)",
              "current_value (DECIMAL 18,4)",
              "unrealized_pnl (DECIMAL 18,4)",
              "last_updated (TIMESTAMP)",
            ],
          },
          {
            name: "transactions",
            desc: "All buy/sell/redemption records",
            fields: [
              "id (UUID, PK)",
              "user_id (UUID, FK → users)",
              "transaction_type (ENUM: buy/sell/sip/delivery/redemption)",
              "asset_type (ENUM)",
              "asset_id (VARCHAR)",
              "quantity (DECIMAL 18,8)",
              "price_per_unit (DECIMAL 18,4)",
              "total_amount (DECIMAL 18,4)",
              "fees (DECIMAL 18,4)",
              "gst (DECIMAL 18,4)",
              "net_amount (DECIMAL 18,4)",
              "payment_id (UUID, FK → payments)",
              "status (ENUM: pending/processing/completed/failed/reversed)",
              "created_at (TIMESTAMP)",
              "settled_at (TIMESTAMP)",
            ],
          },
          {
            name: "sips",
            desc: "Systematic Investment Plans",
            fields: [
              "id (UUID, PK)",
              "user_id (UUID, FK → users)",
              "asset_type (ENUM)",
              "amount (DECIMAL 18,4)",
              "frequency (ENUM: daily/weekly/monthly)",
              "start_date (DATE)",
              "end_date (DATE)",
              "next_debit_date (DATE)",
              "mandate_id (VARCHAR)",
              "status (ENUM: active/paused/cancelled/completed)",
              "total_invested (DECIMAL 18,4)",
              "installments_completed (INTEGER)",
            ],
          },
          {
            name: "gold_prices",
            desc: "Real-time and historical gold price data",
            fields: [
              "id (BIGINT, PK)",
              "metal (ENUM: gold/silver)",
              "purity (ENUM: 24k/22k/18k)",
              "price_per_gram (DECIMAL 18,4)",
              "price_per_10g (DECIMAL 18,4)",
              "price_per_oz (DECIMAL 18,4)",
              "currency (VARCHAR, default INR)",
              "source (VARCHAR)",
              "recorded_at (TIMESTAMP)",
              "city (VARCHAR, nullable)",
            ],
          },
          {
            name: "kyc_documents",
            desc: "KYC verification document records",
            fields: [
              "id (UUID, PK)",
              "user_id (UUID, FK → users)",
              "document_type (ENUM: pan/aadhaar/passport/voter_id)",
              "document_number (VARCHAR, ENCRYPTED)",
              "verification_status (ENUM)",
              "verified_at (TIMESTAMP)",
              "verifier_id (UUID, FK → admin_users)",
              "rejection_reason (TEXT)",
              "storage_path (VARCHAR, S3 path)",
            ],
          },
          {
            name: "payments",
            desc: "Payment gateway transactions",
            fields: [
              "id (UUID, PK)",
              "user_id (UUID, FK → users)",
              "gateway (ENUM: razorpay/cashfree/payu)",
              "gateway_payment_id (VARCHAR)",
              "gateway_order_id (VARCHAR)",
              "method (ENUM: upi/netbanking/card/wallet)",
              "amount (DECIMAL 18,4)",
              "currency (VARCHAR)",
              "status (ENUM: initiated/pending/success/failed/refunded)",
              "created_at (TIMESTAMP)",
              "completed_at (TIMESTAMP)",
            ],
          },
          {
            name: "delivery_orders",
            desc: "Physical gold delivery tracking",
            fields: [
              "id (UUID, PK)",
              "user_id (UUID, FK → users)",
              "gold_grams (DECIMAL 18,4)",
              "product_type (ENUM: coin/bar)",
              "product_weight (DECIMAL)",
              "delivery_address_id (UUID, FK → addresses)",
              "courier_name (VARCHAR)",
              "tracking_number (VARCHAR)",
              "status (ENUM: placed/processing/dispatched/delivered/failed)",
              "delivery_charges (DECIMAL 18,4)",
              "making_charges (DECIMAL 18,4)",
              "expected_delivery (DATE)",
              "delivered_at (TIMESTAMP)",
            ],
          },
        ],
      },
    ],
  },
  "API Requirements": {
    icon: "🔌",
    content: [
      {
        type: "heading",
        text: "API Architecture Overview",
      },
      {
        type: "para",
        text: "Fingold's API layer follows RESTful conventions with GraphQL support for complex portfolio queries. All APIs are versioned (v1, v2), protected by JWT authentication, rate-limited, and documented via OpenAPI 3.0 (Swagger). A public API tier enables B2B partners to embed gold investment in their own apps.",
      },
      {
        type: "heading",
        text: "Core API Modules",
      },
      {
        type: "api_table",
        headers: ["Endpoint Group", "Method", "Endpoint", "Description"],
        rows: [
          ["Auth", "POST", "/api/v1/auth/send-otp", "Send OTP to mobile number"],
          ["Auth", "POST", "/api/v1/auth/verify-otp", "Verify OTP, return JWT"],
          ["Auth", "POST", "/api/v1/auth/refresh", "Refresh access token"],
          ["Auth", "DELETE", "/api/v1/auth/logout", "Invalidate session"],
          ["Users", "GET", "/api/v1/users/me", "Get authenticated user profile"],
          ["Users", "PATCH", "/api/v1/users/me", "Update profile details"],
          ["KYC", "POST", "/api/v1/kyc/pan/verify", "Verify PAN number"],
          ["KYC", "POST", "/api/v1/kyc/aadhaar/initiate", "Start Aadhaar KYC"],
          ["KYC", "POST", "/api/v1/kyc/bank/verify", "Penny drop bank verification"],
          ["KYC", "GET", "/api/v1/kyc/status", "Get KYC completion status"],
          ["Gold Prices", "GET", "/api/v1/prices/gold/live", "Real-time gold prices"],
          ["Gold Prices", "GET", "/api/v1/prices/gold/history", "Historical price data"],
          ["Gold Prices", "GET", "/api/v1/prices/gold/cities", "City-wise gold rates"],
          ["Trading", "POST", "/api/v1/orders/digital-gold/buy", "Place digital gold buy order"],
          ["Trading", "POST", "/api/v1/orders/digital-gold/sell", "Place digital gold sell order"],
          ["Trading", "GET", "/api/v1/orders/{id}", "Get order status"],
          ["Trading", "GET", "/api/v1/orders/history", "Transaction history with filters"],
          ["SIP", "POST", "/api/v1/sip/create", "Create new SIP"],
          ["SIP", "GET", "/api/v1/sip/list", "List all active SIPs"],
          ["SIP", "PATCH", "/api/v1/sip/{id}/pause", "Pause SIP"],
          ["SIP", "DELETE", "/api/v1/sip/{id}/cancel", "Cancel SIP"],
          ["Portfolio", "GET", "/api/v1/portfolio/summary", "Portfolio overview"],
          ["Portfolio", "GET", "/api/v1/portfolio/holdings", "Detailed holdings"],
          ["Portfolio", "GET", "/api/v1/portfolio/pnl", "P&L analysis"],
          ["Portfolio", "GET", "/api/v1/portfolio/tax-report", "Tax report generation"],
          ["Payments", "POST", "/api/v1/payments/initiate", "Create payment order"],
          ["Payments", "POST", "/api/v1/payments/verify", "Verify payment status"],
          ["Payments", "POST", "/api/v1/payments/refund", "Initiate refund"],
          ["Delivery", "POST", "/api/v1/delivery/request", "Request physical delivery"],
          ["Delivery", "GET", "/api/v1/delivery/{id}/track", "Track delivery order"],
        ],
      },
      {
        type: "heading",
        text: "Third-Party API Integrations",
      },
      {
        type: "kv",
        items: [
          ["Gold Price Data", "MCX, IBJA, Refinitiv (Reuters), World Gold Council"],
          ["KYC Provider", "Digio, Karza Technologies, IDfy"],
          ["PAN Verification", "NSDL API, Surepass"],
          ["Aadhaar KYC", "UIDAI / DigiLocker API"],
          ["Payment Gateway", "Razorpay, Cashfree, PayU"],
          ["NACH/e-Mandate", "NPCI, Razorpay NACH"],
          ["Gold Vault Partner", "MMTC-PAMP, SafeGold, Augmont"],
          ["SMS / OTP", "MSG91, Exotel"],
          ["Email Service", "AWS SES, SendGrid"],
          ["Stock Market Data", "NSE Data Hub, BSE API, Zerodha Kite Connect"],
          ["Push Notifications", "Firebase Cloud Messaging (FCM)"],
          ["CDN", "AWS CloudFront / Cloudflare"],
        ],
      },
    ],
  },
  "Security Framework": {
    icon: "🔒",
    content: [
      {
        type: "heading",
        text: "Security Architecture Overview",
      },
      {
        type: "para",
        text: "Fingold's security framework is built on a zero-trust architecture model, where every request is authenticated, authorized, and audited. The platform undergoes quarterly third-party penetration testing, continuous vulnerability scanning, and real-time threat monitoring.",
      },
      {
        type: "heading",
        text: "Authentication & Authorization",
      },
      {
        type: "list",
        items: [
          "JWT access tokens (15-minute expiry) + Refresh tokens (30-day, rotating)",
          "RBAC (Role-Based Access Control) with 6 roles: Guest, Investor, Premium Investor, Analyst, Admin, Super Admin",
          "Mandatory 2FA for transactions above ₹10,000 (OTP or TOTP)",
          "Device fingerprinting with trusted device management",
          "IP-based anomaly detection with automatic account lock",
          "Session invalidation on password change or suspicious activity",
          "MPIN + biometric authentication for mobile app",
        ],
      },
      {
        type: "heading",
        text: "Data Security",
      },
      {
        type: "nfr_table",
        headers: ["Data Type", "Encryption Standard", "Storage Method"],
        rows: [
          ["PAN / Aadhaar Number", "AES-256-GCM", "Encrypted at rest, access logged"],
          [
            "Bank Account Details",
            "AES-256 + Key Management Service",
            "Tokenized, never stored raw",
          ],
          ["User Passwords/MPINs", "bcrypt (cost factor 12)", "Hashed, never reversible"],
          ["API Keys", "SHA-256 HMAC", "Stored as hash only"],
          ["Transaction Data", "TLS 1.3 in transit", "Encrypted at rest (RDS)"],
          ["Document Scans", "AES-256", "S3 with server-side encryption"],
          ["Session Tokens", "RSA-2048", "Redis with TTL, HTTPS only"],
          ["Gold Holdings Data", "AES-256", "Separate encrypted DB"],
        ],
      },
      {
        type: "heading",
        text: "Fraud Detection Systems",
      },
      {
        type: "list",
        items: [
          "ML-based transaction anomaly detection (unusual amounts, frequencies, geolocations)",
          "Velocity checks: max 3 failed payment attempts per hour",
          "Suspicious login alerts: new device, new location, unusual hours",
          "AML monitoring: transactions above ₹50,000 flagged for review",
          "PEP (Politically Exposed Person) screening at KYC",
          "Real-time blacklist checking against RBI and SEBI watchlists",
          "Manual review queue for flagged accounts with 24-hour SLA",
          "Automatic freeze on accounts with 5+ suspicious signals",
        ],
      },
      {
        type: "heading",
        text: "Infrastructure Security",
      },
      {
        type: "list",
        items: [
          "VPC with private subnets for database and payment services",
          "WAF (Web Application Firewall) with OWASP Top 10 protection",
          "DDoS protection via AWS Shield Advanced / Cloudflare Enterprise",
          "Security groups with least-privilege network access",
          "Secrets management via AWS Secrets Manager / HashiCorp Vault",
          "Container image scanning (Trivy) in CI/CD pipeline",
          "Dependency vulnerability scanning (Snyk, Dependabot)",
          "SIEM integration for security event correlation and alerting",
          "SOC 2 Type II audit compliance",
        ],
      },
    ],
  },
  "Admin Dashboard": {
    icon: "🖥️",
    content: [
      {
        type: "heading",
        text: "Admin Panel Architecture",
      },
      {
        type: "para",
        text: "The Fingold Admin Panel is a separate, secure web application accessible only via VPN and 2FA-protected admin accounts. It provides comprehensive tools for user management, KYC processing, content management, and business analytics.",
      },
      {
        type: "heading",
        text: "Admin Modules",
      },
      {
        type: "admin_modules",
        modules: [
          {
            name: "User Management",
            features: [
              "Search and filter users by status, KYC, investment amount",
              "View full user profile, documents, and activity log",
              "Freeze/unfreeze accounts with reason logging",
              "Send in-app notifications and emails to user segments",
              "Export user data in CSV/Excel",
              "Manual KYC override with supervisor approval",
            ],
          },
          {
            name: "KYC Processing",
            features: [
              "Video KYC review queue with SLA tracking",
              "Document verification with zoom and annotation tools",
              "Approve/reject with dropdown reason codes",
              "Escalation workflow to senior reviewer",
              "Bulk document processing tools",
              "Daily KYC completion rate dashboard",
            ],
          },
          {
            name: "Transaction Management",
            features: [
              "Real-time transaction monitoring feed",
              "Flagged transaction review queue",
              "Manual reversal with dual-approval workflow",
              "Settlement reconciliation reports",
              "Failed transaction analysis and retry",
              "GST and TDS calculation reports",
            ],
          },
          {
            name: "Gold Price Management",
            features: [
              "Manual price override (emergency use)",
              "Price feed source configuration",
              "Spread and fee configuration",
              "Price alert management",
              "Historical price audit log",
              "City-wise price markup configuration",
            ],
          },
          {
            name: "Content Management",
            features: [
              "Blog post creation and publishing (WYSIWYG editor)",
              "Learning Center article management",
              "Banner and promotional content management",
              "FAQ management",
              "Push notification campaign creation",
              "Email template management",
            ],
          },
          {
            name: "Analytics Dashboard",
            features: [
              "Daily/weekly/monthly AUM charts",
              "User acquisition funnel (registration → KYC → investment)",
              "Revenue breakdown by product type",
              "SIP performance and churn metrics",
              "Geographic investment heatmap",
              "Gold product popularity rankings",
            ],
          },
          {
            name: "Compliance & Risk",
            features: [
              "AML alerts review queue",
              "Suspicious transaction reports (STR) filing",
              "PEP screening results",
              "Regulatory report generation (SEBI/RBI)",
              "Audit trail export",
              "Risk matrix visualization",
            ],
          },
          {
            name: "Physical Delivery",
            features: [
              "Delivery order management queue",
              "Courier partner integration",
              "Tracking update management",
              "Failed delivery resolution workflow",
              "Vault inventory management",
              "Delivery SLA monitoring",
            ],
          },
        ],
      },
    ],
  },
  Monetization: {
    icon: "💰",
    content: [
      {
        type: "heading",
        text: "Revenue Model Overview",
      },
      {
        type: "para",
        text: "Fingold employs a multi-layered monetization strategy that balances user-friendly pricing with sustainable revenue generation. The primary revenue comes from transactional spreads, with premium subscriptions and B2B services as high-margin growth pillars.",
      },
      {
        type: "heading",
        text: "Revenue Streams",
      },
      {
        type: "revenue_table",
        headers: ["Revenue Stream", "Mechanism", "Est. Margin", "Timeline"],
        rows: [
          [
            "Transaction Spread (Digital Gold)",
            "Buy price 0.5% above spot, Sell 0.5% below spot",
            "~1% per transaction",
            "Day 1",
          ],
          ["Platform Fee", "0.1% - 0.5% on ETF, MF, SGB orders", "0.1-0.5% per order", "Day 1"],
          [
            "Physical Gold Markup",
            "5-8% making charges + ₹150 delivery",
            "₹500-2000 per order",
            "Day 1",
          ],
          [
            "SIP Management Fee",
            "₹5/month per active SIP above ₹500 threshold",
            "₹60/SIP/year",
            "Month 3",
          ],
          [
            "Premium Subscription",
            "₹199/month - advanced analytics, priority support, lower spreads",
            "₹1,788/user/year",
            "Month 6",
          ],
          [
            "Gold Advisory",
            "₹999/quarter for personalized gold portfolio review",
            "₹3,996/user/year",
            "Month 9",
          ],
          [
            "B2B API License",
            "₹2-10L/year for white-label gold investment APIs",
            "70% margin",
            "Year 2",
          ],
          [
            "Interest Income",
            "Float income on settled but uninvested funds",
            "3-4% on float",
            "Year 1",
          ],
          [
            "Referral Revenue",
            "Revenue share from partner broker referrals",
            "20-30% of fees",
            "Month 6",
          ],
          [
            "Data & Insights",
            "Anonymized market trend reports for institutional clients",
            "₹5-20L/report",
            "Year 2",
          ],
        ],
      },
      {
        type: "heading",
        text: "Pricing Strategy",
      },
      {
        type: "kv",
        items: [
          ["Minimum Investment (Digital Gold)", "₹1"],
          ["Maximum Investment per transaction", "₹10,00,000 (₹10 Lakhs)"],
          ["Annual Investment Limit (Digital Gold)", "₹20,00,000 (₹20 Lakhs)"],
          ["Free Tier", "All basic features, 2 free physical deliveries/year"],
          ["Premium Tier", "₹199/month or ₹1,999/year"],
          ["Transaction Spread", "0.5-2% depending on product type"],
          ["SIP Fee", "Free for first 6 months"],
        ],
      },
    ],
  },
  "Dev Roadmap": {
    icon: "🗓️",
    content: [
      {
        type: "heading",
        text: "Development Timeline Overview",
      },
      {
        type: "roadmap",
        phases: [
          {
            phase: "Phase 0",
            title: "Foundation (Month 1-2)",
            color: "#8B7355",
            items: [
              "Technology stack finalization and architecture design",
              "Infrastructure setup (AWS/GCP, CI/CD, monitoring)",
              "Design system creation (Figma component library)",
              "Third-party vendor contracts (vault, KYC, payment)",
              "Legal entity setup, SEBI compliance preparation",
              "Database schema design and API contract finalization",
              "Core team hiring: 2 backend, 2 frontend, 1 design, 1 DevOps",
            ],
          },
          {
            phase: "Phase 1",
            title: "MVP Development (Month 3-5)",
            color: "#B8960C",
            items: [
              "User registration and OTP authentication",
              "KYC integration (PAN, Aadhaar, Video KYC)",
              "Digital gold buy/sell with real-time pricing",
              "Razorpay payment gateway integration",
              "Basic portfolio dashboard",
              "Price alerts (push/email)",
              "Admin panel (user management, KYC approval)",
              "Mobile-responsive web app (PWA)",
            ],
          },
          {
            phase: "Phase 2",
            title: "Product Expansion (Month 6-8)",
            color: "#D4AF37",
            items: [
              "SIP setup with NACH mandate integration",
              "Gold ETF investment module",
              "Sovereign Gold Bond subscription",
              "Physical gold ordering and delivery tracking",
              "Learning Center with blog and guides",
              "Gold calculators (SIP, lump sum, goal planner)",
              "Transaction history with CSV export",
              "Email/SMS notification system",
            ],
          },
          {
            phase: "Phase 3",
            title: "Advanced Features (Month 9-12)",
            color: "#F0D060",
            items: [
              "Gold Mutual Funds integration (AMFI via RTA)",
              "Gold Mining Stocks module",
              "Gold Futures & Options (educational + paper trading)",
              "Advanced analytics and XIRR calculations",
              "Tax report generation (LTCG/STCG)",
              "Premium subscription tier launch",
              "Referral program with tracking",
              "Native iOS and Android apps",
            ],
          },
          {
            phase: "Phase 4",
            title: "Growth & Scale (Month 13-18)",
            color: "#D4AF37",
            items: [
              "B2B API marketplace for partners",
              "AI-powered portfolio recommendations",
              "Gold advisory service launch",
              "Multi-language support (6 Indian languages)",
              "NRI investment module",
              "Gold gifting and transfer features",
              "Social investing features (copy portfolio)",
              "International market expansion planning",
            ],
          },
        ],
      },
    ],
  },
  "MVP Scope": {
    icon: "🚀",
    content: [
      {
        type: "heading",
        text: "MVP Definition",
      },
      {
        type: "highlight",
        text: "The Fingold MVP (Minimum Viable Product) is designed to validate the core user hypothesis: 'Users will invest in digital gold through a mobile-first platform if it offers real-time pricing, instant transactions, and bank-grade security.' The MVP focuses on Digital Gold only, with a simplified onboarding and clean portfolio view.",
      },
      {
        type: "heading",
        text: "MVP Features (In Scope)",
      },
      {
        type: "list",
        items: [
          "✅ Mobile number + email registration with OTP",
          "✅ PAN + Aadhaar KYC (video KYC via Digio)",
          "✅ Bank account linking via penny drop",
          "✅ Real-time 24K digital gold price display (15-second refresh)",
          "✅ Buy digital gold (INR amount or gram quantity)",
          "✅ Sell digital gold with T+1 settlement",
          "✅ UPI + Net Banking payment integration (Razorpay)",
          "✅ Basic portfolio: holdings, P&L, transaction history",
          "✅ Email + push notification for transactions",
          "✅ Gold price alerts (push notification)",
          "✅ Basic admin panel (user list, KYC queue, transactions)",
          "✅ Marketing website (Home, About, Gold Price, Login)",
          "✅ Basic gold SIP calculator",
          "✅ Mobile-responsive web app (PWA)",
        ],
      },
      {
        type: "heading",
        text: "MVP Features (Out of Scope / Phase 2+)",
      },
      {
        type: "list",
        items: [
          "❌ Physical gold delivery",
          "❌ Gold ETFs, SGBs, Mutual Funds, Mining Stocks, Futures",
          "❌ SIP with NACH mandate",
          "❌ Native mobile apps (iOS/Android)",
          "❌ Learning Center / Blog",
          "❌ Advanced analytics and tax reports",
          "❌ Premium subscription tier",
          "❌ Referral program",
          "❌ Multi-language support",
          "❌ B2B API",
        ],
      },
      {
        type: "heading",
        text: "MVP Success Criteria",
      },
      {
        type: "kv",
        items: [
          ["Launch Timeline", "3 months from kickoff"],
          ["Target Beta Users", "500 invited users (closed beta)"],
          ["KYC Completion Rate", "> 50% of registered users"],
          ["Transaction Success Rate", "> 98%"],
          ["App Load Time", "< 3 seconds on 4G"],
          ["User Retention (Week 2)", "> 40%"],
          ["NPS Score (Beta)", "> 30"],
          ["Critical Bug Rate", "0 P0 bugs at launch"],
        ],
      },
    ],
  },
  "Future Enhancements": {
    icon: "🔮",
    content: [
      {
        type: "heading",
        text: "Year 2-3 Product Roadmap",
      },
      {
        type: "pillars",
        items: [
          {
            title: "AI Gold Advisor",
            desc: "GPT-powered conversational gold investment advisor. Ask 'Should I buy gold now?' and get personalized, data-driven recommendations based on your portfolio, risk profile, and market conditions.",
          },
          {
            title: "Gold Gifting Platform",
            desc: "Gift digital gold for festivals (Akshaya Tritiya, Dhanteras), birthdays, and weddings. Recipients claim gold via OTP link. No account required to receive.",
          },
          {
            title: "Social Investing",
            desc: "Follow top gold investors' portfolios. Copy allocation strategies. Leaderboard of best-performing gold portfolios. Community-driven market sentiment tracker.",
          },
          {
            title: "International Gold",
            desc: "Invest in London Bullion Market (LBMA) gold. Access to international gold ETFs (GLD, IAU). Multi-currency support for NRI investors.",
          },
          {
            title: "Gold Credit Line",
            desc: "Loan against digital gold holdings (LTV up to 75%). Instant disbursement to bank account. Interest-only monthly repayment. NBFC partnership required.",
          },
          {
            title: "Blockchain Gold Certificates",
            desc: "NFT-based digital gold ownership certificates on public blockchain. Tamper-proof provenance tracking. Transferable between wallets. DeFi integration.",
          },
          {
            title: "Smart Portfolio Rebalancing",
            desc: "AI-driven automatic rebalancing across gold asset types. Tax-loss harvesting suggestions. Goal-based rebalancing with minimal tax impact.",
          },
          {
            title: "Corporate Gold Treasury",
            desc: "B2B product for companies to invest excess cash in gold. CFO dashboard. Bulk transaction capabilities. GST-compliant invoicing. Multi-user approval workflow.",
          },
        ],
      },
      {
        type: "heading",
        text: "Technology Enhancements",
      },
      {
        type: "list",
        items: [
          "WebSocket-based real-time price streaming (replacing polling)",
          "Offline-first PWA with service workers for zero-connectivity portfolio access",
          "Machine learning model for gold price trend prediction",
          "Computer vision for automatic KYC document extraction and validation",
          "Voice interface integration ('Hey Fingold, show me my portfolio')",
          "Apple Watch / WearOS companion app for quick price checks",
          "Open Banking API integration for automatic portfolio aggregation",
        ],
      },
    ],
  },
  "Success Metrics": {
    icon: "📊",
    content: [
      {
        type: "heading",
        text: "Key Performance Indicators (KPIs)",
      },
      {
        type: "heading",
        text: "Acquisition Metrics",
      },
      {
        type: "nfr_table",
        headers: ["KPI", "Target (Month 6)", "Target (Month 12)", "Measurement"],
        rows: [
          ["App Downloads", "25,000", "150,000", "App stores + web analytics"],
          ["Registered Users", "15,000", "100,000", "Database"],
          ["KYC Verified Users", "9,000 (60%)", "65,000 (65%)", "Database"],
          ["Cost Per Acquisition", "< ₹250", "< ₹150", "Marketing analytics"],
          ["Organic Traffic", "10,000/month", "50,000/month", "Google Analytics"],
          ["Referral Rate", "15% of new users", "25% of new users", "Referral tracking"],
        ],
      },
      {
        type: "heading",
        text: "Engagement Metrics",
      },
      {
        type: "nfr_table",
        headers: ["KPI", "Target (Month 6)", "Target (Month 12)", "Measurement"],
        rows: [
          ["Monthly Active Users (MAU)", "35% of base", "40% of base", "App analytics"],
          ["Daily Active Users (DAU)", "8% of base", "12% of base", "App analytics"],
          ["Average Session Duration", "> 3.5 minutes", "> 4.5 minutes", "App analytics"],
          ["Transactions per Active User/Month", "2.5", "4.0", "Database"],
          ["SIP Adoption Rate", "20% of investors", "35% of investors", "Database"],
          ["D30 Retention Rate", "> 45%", "> 55%", "Cohort analysis"],
        ],
      },
      {
        type: "heading",
        text: "Financial Metrics",
      },
      {
        type: "nfr_table",
        headers: ["KPI", "Target (Month 6)", "Target (Month 12)", "Measurement"],
        rows: [
          ["Total AUM", "₹50 Crore", "₹500 Crore", "Portfolio DB"],
          ["Monthly Transaction Volume", "₹10 Crore", "₹100 Crore", "Transaction DB"],
          ["Monthly Recurring Revenue", "₹25 Lakhs", "₹2.5 Crore", "Finance reports"],
          ["Average Order Value", "₹2,500", "₹4,000", "Transaction DB"],
          ["Revenue Per User", "₹150/year", "₹400/year", "Finance reports"],
          ["Gross Margin", "> 65%", "> 70%", "Finance reports"],
        ],
      },
      {
        type: "heading",
        text: "Quality & Trust Metrics",
      },
      {
        type: "nfr_table",
        headers: ["KPI", "Target", "Measurement"],
        rows: [
          ["NPS (Net Promoter Score)", "> 50", "Quarterly survey"],
          ["CSAT Score", "> 4.3/5", "Post-transaction survey"],
          ["App Store Rating", "> 4.5 stars", "App store"],
          ["Support Ticket Resolution SLA", "< 24 hours (95%)", "CRM system"],
          ["Transaction Success Rate", "> 99%", "Payment gateway analytics"],
          ["System Uptime", "> 99.95%", "Uptime monitoring"],
          ["KYC Rejection Rate", "< 8%", "KYC system"],
          ["Fraud Rate", "< 0.01% of transactions", "Fraud detection system"],
        ],
      },
    ],
  },
  "UI/UX Guidelines": {
    icon: "🎨",
    content: [
      {
        type: "heading",
        text: "Design System Overview",
      },
      {
        type: "para",
        text: "Fingold's design language is called 'Aurum' — Latin for gold. It combines the warmth and weight of gold with the precision and clarity of modern fintech interfaces. Every design decision reinforces one of three values: Trust, Clarity, or Premium Feel.",
      },
      {
        type: "heading",
        text: "Color Palette",
      },
      {
        type: "colors",
        items: [
          { name: "Gold Primary", hex: "#D4AF37", use: "CTAs, highlights, icons, brand moments" },
          {
            name: "Gold Light",
            hex: "#F0D060",
            use: "Hover states, success indicators, backgrounds",
          },
          { name: "Gold Pale", hex: "#FDF8E7", use: "Page backgrounds, card backgrounds" },
          { name: "Black", hex: "#111111", use: "Primary text, headers, navigation" },
          {
            name: "Dark Gray",
            hex: "#1A1A1A",
            use: "Card backgrounds (dark mode), secondary text",
          },
          { name: "Mid Gray", hex: "#4A4A4A", use: "Body text, labels, descriptions" },
          { name: "Light Gray", hex: "#F5F5F5", use: "Dividers, inactive states, borders" },
          { name: "White", hex: "#FFFFFF", use: "Cards, form backgrounds, contrast elements" },
          { name: "Success Green", hex: "#27AE60", use: "Positive returns, success states" },
          { name: "Error Red", hex: "#E74C3C", use: "Negative returns, errors, warnings" },
        ],
      },
      {
        type: "heading",
        text: "Typography",
      },
      {
        type: "kv",
        items: [
          ["Display Font", "Playfair Display (Serif) — Used for headings, hero text, premium feel"],
          ["Body Font", "Inter (Sans-serif) — Used for all body copy, labels, data"],
          ["Monospace Font", "JetBrains Mono — Used for gold prices, financial numbers, codes"],
          ["H1 Size", "48px / 600 weight / Line height 1.2"],
          ["H2 Size", "36px / 600 weight / Line height 1.3"],
          ["H3 Size", "24px / 600 weight / Line height 1.4"],
          ["Body Large", "18px / 400 weight / Line height 1.6"],
          ["Body Regular", "16px / 400 weight / Line height 1.6"],
          ["Caption", "12px / 400 weight / Line height 1.5"],
          ["Price Display", "32px / 700 weight / JetBrains Mono"],
        ],
      },
      {
        type: "heading",
        text: "Component Design Principles",
      },
      {
        type: "list",
        items: [
          "Border Radius: 8px for cards, 4px for inputs, 24px for CTAs, 50% for badges",
          "Shadows: Soft, warm-tinted shadows (rgba(212, 175, 55, 0.1)) for card elevation",
          "Spacing Scale: 4px base unit — 4, 8, 12, 16, 24, 32, 48, 64, 96px",
          "Icon Set: Lucide Icons (consistent 24px stroke-based icons)",
          "Motion: 200ms ease-out transitions, 300ms for modals, no animations in reduced-motion mode",
          "Form Design: Floating labels, real-time validation, clear error messages in plain language",
          "Empty States: Illustrated, encourage action with clear CTAs, no dead ends",
          "Loading States: Gold shimmer skeleton screens, never blank white",
          "Trust Signals: Partner logos, security badges, and certification marks prominently placed",
          "Mobile First: Touch targets minimum 44x44px, thumb-friendly bottom navigation",
        ],
      },
      {
        type: "heading",
        text: "Key UX Principles",
      },
      {
        type: "pillars",
        items: [
          {
            title: "Zero Jargon",
            desc: "Explain every financial term on first use. Tooltip on tap for any investment terminology. Plain language in all communications.",
          },
          {
            title: "Progressive Disclosure",
            desc: "Show simple information first. Advanced details available on expansion. Never overwhelm new users with complexity.",
          },
          {
            title: "Real-time Feedback",
            desc: "Instant visual feedback on every action. Live price updates. Transaction status in real-time. No silent loading.",
          },
          {
            title: "Trust by Design",
            desc: "Display security badges, RBI/SEBI compliance, partner logos, and insurance information throughout the investment journey.",
          },
        ],
      },
    ],
  },
  "Technical Architecture": {
    icon: "🏗️",
    content: [
      {
        type: "heading",
        text: "Technology Stack",
      },
      {
        type: "tech_stack",
        categories: [
          {
            category: "Frontend (Web)",
            items: [
              "React 18 with TypeScript",
              "Next.js 14 (App Router, SSR/SSG)",
              "Tailwind CSS + Shadcn/UI",
              "Zustand (state management)",
              "React Query (server state)",
              "Recharts (financial charts)",
              "PWA with Workbox service worker",
            ],
          },
          {
            category: "Mobile Apps",
            items: [
              "React Native with Expo",
              "Native biometric auth (expo-local-authentication)",
              "React Navigation 6",
              "Reanimated 3 for animations",
              "Push notifications via FCM/APNs",
            ],
          },
          {
            category: "Backend Services",
            items: [
              "Node.js with Express / NestJS (API Gateway)",
              "Python FastAPI (ML services, analytics)",
              "GraphQL (Apollo Server for portfolio queries)",
              "WebSocket server (Socket.io for live prices)",
              "Bull Queue (job processing for SIPs, settlements)",
              "Prisma ORM with PostgreSQL",
            ],
          },
          {
            category: "Databases",
            items: [
              "PostgreSQL 15 (primary relational DB)",
              "Redis 7 (caching, sessions, rate limiting)",
              "TimescaleDB (gold price time-series data)",
              "Elasticsearch (transaction search, audit logs)",
              "S3 (document storage, static assets)",
            ],
          },
          {
            category: "Infrastructure",
            items: [
              "AWS (primary cloud provider)",
              "EKS (Kubernetes for container orchestration)",
              "RDS PostgreSQL (Multi-AZ)",
              "ElastiCache Redis (cluster mode)",
              "CloudFront CDN",
              "Route 53 (DNS)",
              "AWS WAF + Shield",
            ],
          },
          {
            category: "DevOps & Monitoring",
            items: [
              "GitHub Actions (CI/CD)",
              "Docker + Kubernetes (containerization)",
              "Terraform (infrastructure as code)",
              "Datadog (APM, logs, infrastructure)",
              "PagerDuty (incident management)",
              "Sentry (error tracking)",
              "Grafana (custom dashboards)",
            ],
          },
        ],
      },
      {
        type: "heading",
        text: "System Architecture Diagram",
      },
      {
        type: "arch_diagram",
      },
      {
        type: "heading",
        text: "Microservices Architecture",
      },
      {
        type: "kv",
        items: [
          ["auth-service", "OTP, JWT, session management"],
          ["kyc-service", "Document verification, KYC workflow"],
          ["pricing-service", "Real-time gold price aggregation and distribution"],
          ["trading-service", "Order management, buy/sell execution"],
          ["payment-service", "Gateway integration, settlement, refunds"],
          ["portfolio-service", "Holdings calculation, P&L, analytics"],
          ["sip-service", "SIP scheduling, mandate management, execution"],
          ["notification-service", "Push, email, SMS notification dispatch"],
          ["delivery-service", "Physical gold order and courier management"],
          ["admin-service", "Admin panel backend, reporting"],
          ["content-service", "Blog, learning center, CMS APIs"],
          ["analytics-service", "Business intelligence, dashboards, reports"],
        ],
      },
    ],
  },
};

function ColorSwatch({ hex, name, use }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: hex,
          border: `1px solid ${hex === "#FFFFFF" ? "#E0D5B5" : "transparent"}`,
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontWeight: 600, fontSize: 13, color: BLACK }}>
          {name} <span style={{ fontFamily: "monospace", color: GRAY, fontSize: 12 }}>{hex}</span>
        </div>
        <div style={{ fontSize: 12, color: GRAY }}>{use}</div>
      </div>
    </div>
  );
}

function ReqTable({ headers, rows }) {
  return (
    <div
      style={{
        overflowX: "auto",
        marginBottom: 20,
        borderRadius: 8,
        border: `1px solid ${BORDER}`,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: BLACK }}>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  padding: "10px 14px",
                  color: GOLD,
                  textAlign: "left",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? WHITE : GOLD_PALE }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "9px 14px",
                    color: j === 0 ? GOLD : BLACK,
                    fontFamily: j === 0 ? "monospace" : "inherit",
                    fontSize: j === 0 ? 12 : 13,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Flow({ steps }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 20 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: GOLD,
                color: BLACK,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {s.step}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 2, height: 32, background: `${GOLD}60` }} />
            )}
          </div>
          <div
            style={{ marginLeft: 14, paddingBottom: i < steps.length - 1 ? 12 : 0, paddingTop: 6 }}
          >
            <div style={{ fontWeight: 700, color: BLACK, fontSize: 14 }}>{s.title}</div>
            <div style={{ color: GRAY, fontSize: 13, lineHeight: 1.5 }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SiteMap({ tree }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
      {tree.map((node, i) => (
        <div
          key={i}
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            padding: "14px 16px",
            minWidth: 200,
            flex: "1 1 200px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: GOLD,
              marginBottom: 10,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                background: GOLD,
                color: WHITE,
                borderRadius: 4,
                padding: "2px 7px",
                fontSize: 11,
              }}
            >
              PAGE
            </span>
            {node.label}
          </div>
          {node.children.map((c, j) => (
            <div
              key={j}
              style={{
                color: GRAY,
                fontSize: 13,
                padding: "3px 0",
                borderBottom: j < node.children.length - 1 ? `1px solid ${LIGHT_GRAY}` : "none",
              }}
            >
              └ {c}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Schema({ tables }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {tables.map((t, i) => (
        <div
          key={i}
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: BLACK,
              padding: "10px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: GOLD, fontFamily: "monospace", fontWeight: 700, fontSize: 14 }}>
              {t.name}
            </span>
            <span style={{ color: "#888", fontSize: 12 }}>{t.desc}</span>
          </div>
          <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
            {t.fields.map((f, j) => (
              <div
                key={j}
                style={{ fontFamily: "monospace", fontSize: 12, color: GRAY, whiteSpace: "nowrap" }}
              >
                <span style={{ color: GOLD }}>•</span> {f}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Personas({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {items.map((p, i) => (
        <div
          key={i}
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: BLACK }}>{p.name}</div>
              <div style={{ color: GOLD, fontSize: 13, fontWeight: 600 }}>{p.role}</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                ["Age", p.age],
                ["Income", p.income],
                ["Tech", p.tech],
              ].map(([k, v]) => (
                <div key={k} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: GRAY }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: BLACK }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {[
              ["🎯 Goal", p.goal],
              ["😖 Pain Points", p.pain],
              ["📱 Behavior", p.behavior],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 12, fontWeight: 600, color: BLACK, marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>{val}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: BLACK, marginBottom: 6 }}>
              Key Features Needed
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.features.map((f, j) => (
                <span
                  key={j}
                  style={{
                    background: GOLD_PALE,
                    color: "#7A6000",
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 20,
                    border: `1px solid ${GOLD}40`,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureCategories({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {items.map((cat, i) => (
        <div
          key={i}
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div style={{ background: cat.color, padding: "10px 16px" }}>
            <div
              style={{
                fontWeight: 700,
                color: cat.color === "#1A1A1A" ? GOLD : BLACK,
                fontSize: 14,
              }}
            >
              {cat.category}
            </div>
          </div>
          <div style={{ padding: "12px 16px" }}>
            {cat.features.map((f, j) => (
              <div
                key={j}
                style={{
                  fontSize: 13,
                  color: GRAY,
                  padding: "5px 0",
                  borderBottom: j < cat.features.length - 1 ? `1px solid ${LIGHT_GRAY}` : "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <span style={{ color: GOLD, flexShrink: 0 }}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Pillars({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 14,
        marginBottom: 20,
      }}
    >
      {items.map((p, i) => (
        <div
          key={i}
          style={{
            background: GOLD_PALE,
            border: `1px solid ${GOLD}40`,
            borderRadius: 10,
            padding: "16px",
          }}
        >
          <div style={{ fontWeight: 700, color: BLACK, fontSize: 14, marginBottom: 6 }}>
            {p.title}
          </div>
          <div style={{ fontSize: 13, color: GRAY, lineHeight: 1.6 }}>{p.desc}</div>
        </div>
      ))}
    </div>
  );
}

function Goals({ items }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 14,
        marginBottom: 20,
      }}
    >
      {items.map((g, i) => (
        <div
          key={i}
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800, color: GOLD, fontFamily: "monospace" }}>
            {g.metric}
          </div>
          <div style={{ fontWeight: 700, color: BLACK, marginBottom: 6, fontSize: 14 }}>
            {g.label}
          </div>
          <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>{g.detail}</div>
        </div>
      ))}
    </div>
  );
}

function RevenueTable({ headers, rows }) {
  return (
    <div
      style={{
        overflowX: "auto",
        marginBottom: 20,
        borderRadius: 8,
        border: `1px solid ${BORDER}`,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: BLACK }}>
            {headers.map((h) => (
              <th
                key={h}
                style={{ padding: "10px 14px", color: GOLD, textAlign: "left", fontWeight: 600 }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? WHITE : GOLD_PALE }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "9px 14px",
                    color: j === 2 ? "#27AE60" : BLACK,
                    fontWeight: j === 2 ? 700 : 400,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Roadmap({ phases }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {phases.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 0 }}>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48 }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: p.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: BLACK,
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {p.phase.split(" ")[1]}
              </span>
            </div>
            {i < phases.length - 1 && (
              <div style={{ width: 2, flex: 1, minHeight: 20, background: `${GOLD}40` }} />
            )}
          </div>
          <div style={{ marginLeft: 16, paddingBottom: 24, paddingTop: 8, flex: 1 }}>
            <div style={{ fontWeight: 700, color: BLACK, fontSize: 15 }}>
              {p.phase}: {p.title}
            </div>
            <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {p.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, color: GRAY, display: "flex", gap: 6 }}>
                  <span style={{ color: GOLD, flexShrink: 0 }}>→</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TechStack({ categories }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 14,
        marginBottom: 20,
      }}
    >
      {categories.map((cat, i) => (
        <div
          key={i}
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div style={{ background: DARK, padding: "8px 14px" }}>
            <div style={{ color: GOLD, fontWeight: 700, fontSize: 13 }}>{cat.category}</div>
          </div>
          <div style={{ padding: "10px 14px" }}>
            {cat.items.map((item, j) => (
              <div
                key={j}
                style={{ fontSize: 13, color: GRAY, padding: "3px 0", display: "flex", gap: 6 }}
              >
                <span style={{ color: GOLD }}>▸</span> {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminModules({ modules }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 14,
      }}
    >
      {modules.map((m, i) => (
        <div
          key={i}
          style={{
            background: WHITE,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: DARK,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD }} />
            <div style={{ color: GOLD, fontWeight: 700, fontSize: 14 }}>{m.name}</div>
          </div>
          <div style={{ padding: "12px 14px" }}>
            {m.features.map((f, j) => (
              <div
                key={j}
                style={{
                  fontSize: 13,
                  color: GRAY,
                  padding: "4px 0",
                  borderBottom: j < m.features.length - 1 ? `1px solid ${LIGHT_GRAY}` : "none",
                }}
              >
                ✓ {f}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArchDiagram() {
  return (
    <div
      style={{
        background: BLACK,
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
        fontFamily: "monospace",
        fontSize: 12,
        color: "#888",
        lineHeight: 1.8,
        overflowX: "auto",
      }}
    >
      <pre style={{ margin: 0, color: "#aaa" }}>{`
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENTS                                    │
│   [Web Browser / PWA]    [iOS App]    [Android App]    [Admin]   │
└────────────┬─────────────────┬───────────────┬───────────────────┘
             │                 │               │
             ▼                 ▼               ▼
┌──────────────────────────────────────────────────────────────────┐
│                   CDN (CloudFront / Cloudflare)                   │
│              Static Assets  •  Edge Caching  •  WAF              │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│              API GATEWAY (Kong / AWS API Gateway)                 │
│         Auth  •  Rate Limiting  •  Load Balancing  •  SSL        │
└──┬──────────┬──────────┬──────────┬──────────┬────────────┬──────┘
   │          │          │          │          │            │
   ▼          ▼          ▼          ▼          ▼            ▼
[auth]   [trading]  [pricing]  [portfolio] [payment]  [kyc-svc]
   │          │          │          │          │            │
   └──────────┴──────────┴──────────┴──────────┴────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         [PostgreSQL]      [Redis]      [TimescaleDB]
          (Primary DB)    (Cache/       (Gold Prices
          Multi-AZ RDS     Sessions)    Time Series)
              │
              ▼
         [Elasticsearch]    [S3]
         (Search/Audit)  (Documents)
`}</pre>
    </div>
  );
}

function renderContent(contentArray) {
  return contentArray.map((block, i) => {
    switch (block.type) {
      case "para":
        return (
          <p key={i} style={{ color: GRAY, lineHeight: 1.8, marginBottom: 16, fontSize: 14 }}>
            {block.text}
          </p>
        );
      case "heading":
        return (
          <h3
            key={i}
            style={{
              color: BLACK,
              fontSize: 15,
              fontWeight: 700,
              margin: "24px 0 10px",
              borderBottom: `2px solid ${GOLD}`,
              paddingBottom: 6,
              display: "inline-block",
            }}
          >
            {block.text}
          </h3>
        );
      case "quote":
        return (
          <blockquote
            key={i}
            style={{
              borderLeft: `4px solid ${GOLD}`,
              background: GOLD_PALE,
              padding: "14px 18px",
              borderRadius: "0 8px 8px 0",
              color: BLACK,
              fontStyle: "italic",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 16,
            }}
          >
            {block.text}
          </blockquote>
        );
      case "highlight":
        return (
          <div
            key={i}
            style={{
              background: `${GOLD}15`,
              border: `1px solid ${GOLD}40`,
              borderRadius: 8,
              padding: "14px 16px",
              marginBottom: 16,
              color: DARK,
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            <span style={{ color: GOLD, fontWeight: 700 }}>💡 </span>
            {block.text}
          </div>
        );
      case "kv":
        return (
          <div
            key={i}
            style={{
              background: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            {block.items.map(([k, v], j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  padding: "9px 14px",
                  background: j % 2 === 0 ? WHITE : GOLD_PALE,
                  borderBottom: j < block.items.length - 1 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: BLACK,
                    fontSize: 13,
                    minWidth: 200,
                    flexShrink: 0,
                  }}
                >
                  {k}
                </div>
                <div style={{ color: GRAY, fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>
        );
      case "list":
        return (
          <ul key={i} style={{ paddingLeft: 0, marginBottom: 20, listStyle: "none" }}>
            {block.items.map((item, j) => (
              <li
                key={j}
                style={{
                  color: GRAY,
                  fontSize: 13,
                  padding: "5px 0",
                  borderBottom: `1px solid ${LIGHT_GRAY}`,
                  display: "flex",
                  gap: 8,
                  lineHeight: 1.6,
                }}
              >
                {item.startsWith("✅") || item.startsWith("❌") ? (
                  <>{item}</>
                ) : (
                  <>
                    <span style={{ color: GOLD }}>•</span> {item}
                  </>
                )}
              </li>
            ))}
          </ul>
        );
      case "pillars":
        return <Pillars key={i} items={block.items} />;
      case "goals":
        return <Goals key={i} items={block.items} />;
      case "personas":
        return <Personas key={i} items={block.items} />;
      case "feature_categories":
        return <FeatureCategories key={i} items={block.items} />;
      case "req_table":
      case "nfr_table":
      case "api_table":
        return <ReqTable key={i} headers={block.headers} rows={block.rows} />;
      case "flow":
        return <Flow key={i} steps={block.steps} />;
      case "sitemap":
        return <SiteMap key={i} tree={block.tree} />;
      case "schema":
        return <Schema key={i} tables={block.tables} />;
      case "revenue_table":
        return <RevenueTable key={i} headers={block.headers} rows={block.rows} />;
      case "roadmap":
        return <Roadmap key={i} phases={block.phases} />;
      case "tech_stack":
        return <TechStack key={i} categories={block.categories} />;
      case "admin_modules":
        return <AdminModules key={i} modules={block.modules} />;
      case "colors":
        return (
          <div
            key={i}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}
          >
            {block.items.map((c, j) => (
              <ColorSwatch key={j} {...c} />
            ))}
          </div>
        );
      case "arch_diagram":
        return <ArchDiagram key={i} />;
      default:
        return null;
    }
  });
}

export default function FingoldPRD() {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const section = prdContent[activeSection];
  const currentIdx = sections.indexOf(activeSection);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        fontFamily: "Inter, -apple-system, sans-serif",
        background: LIGHT_GRAY,
        minHeight: "100vh",
      }}
    >
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { margin: 0; padding: 20px; }
          body { background: white; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${LIGHT_GRAY}; }
        ::-webkit-scrollbar-thumb { background: ${GOLD}80; border-radius: 3px; }
      `}</style>

      {/* TOP HEADER */}
      <div
        className="no-print"
        style={{
          background: BLACK,
          padding: "0 24px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: `2px solid ${GOLD}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              color: GOLD,
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            ☰
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: BLACK,
                fontSize: 14,
              }}
            >
              F
            </div>
            <div>
              <div style={{ color: WHITE, fontWeight: 700, fontSize: 15 }}>Fingold</div>
              <div style={{ color: GOLD, fontSize: 10 }}>Product Requirements Document v1.0</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ color: "#666", fontSize: 12 }}>
            {currentIdx + 1} / {sections.length}
          </div>
          <button
            onClick={handlePrint}
            style={{
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
              color: BLACK,
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ⬇ Download PDF
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        {/* SIDEBAR */}
        {sidebarOpen && (
          <div
            className="no-print"
            style={{
              width: 260,
              background: DARK,
              overflowY: "auto",
              flexShrink: 0,
              borderRight: `1px solid #333`,
            }}
          >
            <div style={{ padding: "16px 12px 8px" }}>
              <div
                style={{
                  color: "#666",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Table of Contents
              </div>
              {sections.map((s, i) => {
                const sec = prdContent[s];
                const isActive = s === activeSection;
                return (
                  <button
                    key={s}
                    onClick={() => setActiveSection(s)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: isActive ? `${GOLD}20` : "none",
                      border: isActive ? `1px solid ${GOLD}40` : "1px solid transparent",
                      borderRadius: 8,
                      padding: "9px 12px",
                      cursor: "pointer",
                      marginBottom: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: isActive ? GOLD : "#aaa",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{sec.icon}</span>
                    <span
                      style={{ fontSize: 12, fontWeight: isActive ? 700 : 400, lineHeight: 1.4 }}
                    >
                      <span style={{ color: isActive ? GOLD : "#555", marginRight: 4 }}>
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      {s}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }} className="print-area">
          {/* Section Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ color: GOLD, fontSize: 12, fontWeight: 700 }}>
                SECTION {String(currentIdx + 1).padStart(2, "0")}
              </span>
              <span style={{ color: "#ccc", fontSize: 12 }}>of {sections.length}</span>
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: BLACK,
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>{section.icon}</span>
              {activeSection}
            </h1>
            <div
              style={{
                height: 3,
                background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                marginTop: 12,
                borderRadius: 2,
              }}
            />
          </div>

          {/* Section Content */}
          {renderContent(section.content)}

          {/* Navigation */}
          <div
            className="no-print"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 40,
              paddingTop: 20,
              borderTop: `1px solid ${BORDER}`,
            }}
          >
            <button
              onClick={() => currentIdx > 0 && setActiveSection(sections[currentIdx - 1])}
              disabled={currentIdx === 0}
              style={{
                background: currentIdx === 0 ? LIGHT_GRAY : WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                padding: "10px 20px",
                cursor: currentIdx === 0 ? "not-allowed" : "pointer",
                color: currentIdx === 0 ? "#bbb" : BLACK,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              ← {currentIdx > 0 ? sections[currentIdx - 1] : "Start"}
            </button>

            <div style={{ display: "flex", gap: 4 }}>
              {sections.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveSection(sections[i])}
                  style={{
                    width: i === currentIdx ? 24 : 6,
                    height: 6,
                    background: i === currentIdx ? GOLD : `${GOLD}40`,
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() =>
                currentIdx < sections.length - 1 && setActiveSection(sections[currentIdx + 1])
              }
              disabled={currentIdx === sections.length - 1}
              style={{
                background:
                  currentIdx === sections.length - 1
                    ? LIGHT_GRAY
                    : `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                border: "none",
                borderRadius: 8,
                padding: "10px 20px",
                cursor: currentIdx === sections.length - 1 ? "not-allowed" : "pointer",
                color: currentIdx === sections.length - 1 ? "#bbb" : BLACK,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {currentIdx < sections.length - 1 ? sections[currentIdx + 1] : "End"} →
            </button>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 24, color: "#bbb", fontSize: 11 }}>
            Fingold PRD v1.0 • Confidential & Proprietary • © 2025 Fingold Technologies Pvt. Ltd.
          </div>
        </div>
      </div>
    </div>
  );
}
