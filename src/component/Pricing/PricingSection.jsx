import { useState, useEffect, useRef } from "react";
import ToolsWeUse from "./ToolsWeUse";
import ProjectsSection from "./ProjectsSection";
import FAQSection from "./FAQSection";

// ── Icons ──────────────────────────────────────────────────────────────────
const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#b8860b" opacity="0.15"/>
    <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="#b8860b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Cross = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="7" fill="#d4a0a0" opacity="0.2"/>
    <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="#c08080" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LotusDivider = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "6px 0 18px" }}>
    <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, transparent, #b8860b)" }} />
    <span style={{ fontSize: "16px" }}>❀</span>
    <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #b8860b, transparent)" }} />
  </div>
);

const Mandala = ({ size = 80, opacity = 0.06 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, pointerEvents: "none" }}>
    <circle cx="50" cy="50" r="48" stroke="#b8860b" strokeWidth="0.6" fill="none"/>
    <circle cx="50" cy="50" r="36" stroke="#b8860b" strokeWidth="0.6" fill="none"/>
    <circle cx="50" cy="50" r="24" stroke="#b8860b" strokeWidth="0.6" fill="none"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
      <line key={a} x1="50" y1="50"
        x2={50+48*Math.cos(a*Math.PI/180)} y2={50+48*Math.sin(a*Math.PI/180)}
        stroke="#b8860b" strokeWidth="0.4"/>
    ))}
    {[0,45,90,135,180,225,270,315].map(a => (
      <circle key={a}
        cx={50+36*Math.cos(a*Math.PI/180)} cy={50+36*Math.sin(a*Math.PI/180)}
        r="2.5" fill="#b8860b" opacity="0.5"/>
    ))}
    <circle cx="50" cy="50" r="4" fill="#b8860b" opacity="0.5"/>
  </svg>
);

// ── Plan detail data ────────────────────────────────────────────────────────
const V = ({ children }) => <span style={{ color: "#8b6914", fontWeight: 700, fontSize: "11px" }}>{children}</span>;

const planDetails = {
  LITE: { sections: [
    { title: "Social Media Management", accent: true, rows: [
      ["Platforms",<V>Instagram + Facebook</V>],
      ["Creative Posts",<V>8 / Month</V>],
      ["Reels / Shorts",<V>4 / Month</V>],
      ["Stories",<V>4 / Month</V>],
      ["Captions & Hashtags",<Check/>],
      ["Content Calendar",<Check/>],
      ["Community Management",<V>Basic</V>],
    ]},
    { title: "Graphic Design", rows: [
      ["Social Media Creatives",<V>8 / Month</V>],
      ["YouTube Thumbnails",<V>2 / Month</V>],
      ["Festival / Tithi Creatives",<V>2 / Month</V>],
      ["Basic Brand Style Setup",<Check/>],
    ]},
    { title: "Video Editing", rows: [
      ["Devotional Reels / Shorts",<V>4 / Month</V>],
      ["Basic Video Editing",<Check/>],
      ["Subtitles / Captions",<Check/>],
    ]},
    { title: "SEO & Google", rows: [
      ["Basic SEO Setup",<Check/>],
      ["Keyword Research",<V>50 Keywords</V>],
      ["Google Business Profile",<V>Setup / Review</V>],
      ["Website Indexing Check",<Check/>],
    ]},
    { title: "Paid Ads", rows: [
      ["Google / Meta Ads Setup",<V>Basic</V>],
      ["Campaign Management",<V>1 Campaign</V>],
      ["Ad Spend",<V>Separate</V>],
      ["Monthly Optimization",<Check/>],
    ]},
    { title: "Reporting & Support", rows: [
      ["Monthly Performance Report",<Check/>],
      ["Strategy Call",<V>1 / Month</V>],
      ["WhatsApp Support",<Check/>],
    ]},
  ]},
  STANDARD: { sections: [
    { title: "Social Media Management", accent: true, rows: [
      ["Platforms",<V>Instagram + Facebook + YouTube</V>],
      ["Creative Posts",<V>12 / Month</V>],
      ["Reels / Shorts",<V>8 / Month</V>],
      ["Stories",<V>8 / Month</V>],
      ["Content Strategy",<Check/>],
      ["Community Management",<V>Standard</V>],
    ]},
    { title: "Graphic Design", rows: [
      ["Social Media Creatives",<V>12 / Month</V>],
      ["YouTube Thumbnails",<V>4 / Month</V>],
      ["Darbar / Event Creatives",<V>4 / Month</V>],
      ["Festival Campaign Creatives",<V>2 / Month</V>],
    ]},
    { title: "Video Editing", rows: [
      ["Devotional Reels / Shorts",<V>8 / Month</V>],
      ["YouTube Video Editing",<V>2 / Month</V>],
      ["Subtitles / Captions",<Check/>],
      ["Hook & Retention Editing",<Check/>],
    ]},
    { title: "SEO & Local Growth", rows: [
      ["SEO Audit",<V>Comprehensive</V>],
      ["Keyword Research",<V>100 Keywords</V>],
      ["On-Page SEO",<V>Priority Pages</V>],
      ["Google Business Profile",<Check/>],
      ["GMB Posts",<V>4 / Month</V>],
      ["Monthly SEO Reporting",<Check/>],
    ]},
    { title: "Paid Ads", rows: [
      ["Google Ads",<V>Search / YouTube</V>],
      ["Meta Ads",<V>Facebook / Instagram</V>],
      ["Campaign Management",<V>Up to 2 Campaigns</V>],
      ["Retargeting",<V>Basic</V>],
      ["Ad Spend",<V>Separate</V>],
      ["Performance Optimization",<V>Bi-weekly</V>],
    ]},
    { title: "Website & Reporting", rows: [
      ["Website Conversion Review",<Check/>],
      ["Analytics / Pixel Review",<Check/>],
      ["Monthly Reporting",<Check/>],
      ["Strategy Calls",<V>2 / Month</V>],
    ]},
  ]},
  ADVANCE: { sections: [
    { title: "Social Media Management", accent: true, rows: [
      ["Platforms",<V>Instagram + Facebook + YouTube</V>],
      ["Creative Posts",<V>16 / Month</V>],
      ["Reels / Shorts",<V>12 / Month</V>],
      ["Stories",<V>12 / Month</V>],
      ["Content Strategy",<Check/>],
      ["Advanced Community Management",<Check/>],
    ]},
    { title: "Creative Production", rows: [
      ["Graphic Creatives",<V>16 / Month</V>],
      ["YouTube Thumbnails",<V>6 / Month</V>],
      ["Darbar / Event Campaign Creatives",<V>4 / Month</V>],
      ["Brand Creative Direction",<Check/>],
    ]},
    { title: "Video Editing", rows: [
      ["Devotional Reels / Shorts",<V>12 / Month</V>],
      ["YouTube Video Editing",<V>4 / Month</V>],
      ["Advanced Captions / Motion",<Check/>],
      ["Retention-focused Editing",<Check/>],
    ]},
    { title: "SEO & Website Growth", rows: [
      ["Advanced SEO Audit & Strategy",<Check/>],
      ["Keyword Research",<V>200 Keywords</V>],
      ["Technical SEO Review",<Check/>],
      ["Local SEO / Google Business",<V>Advanced</V>],
      ["Competitor Analysis",<Check/>],
      ["Website Conversion Review",<Check/>],
    ]},
    { title: "Performance Ads", rows: [
      ["Google Ads",<V>Search + YouTube</V>],
      ["Meta Ads",<V>Facebook + Instagram</V>],
      ["Campaign Management",<V>Up to 4 Campaigns</V>],
      ["Retargeting",<Check/>],
      ["Creative Testing",<Check/>],
      ["Ad Spend",<V>Separate</V>],
      ["Weekly Optimization",<Check/>],
    ]},
    { title: "Growth Reporting", rows: [
      ["Analytics Dashboard",<Check/>],
      ["Monthly Growth Report",<Check/>],
      ["Bi-weekly Strategy Review",<Check/>],
      ["Priority WhatsApp Support",<Check/>],
    ]},
  ]},
  ENTERPRISE: { sections: [
    { title: "Full Social Media Management", accent: true, rows: [
      ["Platforms",<V>Instagram + Facebook + YouTube</V>],
      ["Creative Posts",<V>24+ / Month</V>],
      ["Reels / Shorts",<V>16+ / Month</V>],
      ["Stories",<V>16+ / Month</V>],
      ["Full Community Management",<Check/>],
      ["Monthly Content Strategy",<Check/>],
    ]},
    { title: "Creative Production", rows: [
      ["Graphic Creatives",<V>24+ / Month</V>],
      ["YouTube Thumbnails",<V>8 / Month</V>],
      ["Darbar / Event Campaign Creatives",<V>6 / Month</V>],
      ["Brand Creative Direction",<Check/>],
      ["Event Creative Support",<Check/>],
    ]},
    { title: "Video & Content", rows: [
      ["Reels / Shorts Editing",<V>16+ / Month</V>],
      ["Long-form YouTube Videos",<V>4 / Month</V>],
      ["Katha / Satsang Content",<Check/>],
      ["Advanced Motion Graphics",<Check/>],
      ["Multi-format Export",<Check/>],
    ]},
    { title: "SEO & Website", rows: [
      ["Full SEO Strategy",<Check/>],
      ["Keyword Research",<V>300+ Keywords</V>],
      ["Technical SEO",<Check/>],
      ["Local SEO / Google Business",<V>Full Management</V>],
      ["Website Conversion Optimization",<Check/>],
      ["Competitor Analysis",<Check/>],
    ]},
    { title: "Performance Marketing", rows: [
      ["Google Ads",<V>Search + Display + YouTube</V>],
      ["Meta Ads",<V>Facebook + Instagram</V>],
      ["Retargeting & Funnels",<Check/>],
      ["Creative A/B Testing",<Check/>],
      ["Landing Page Recommendations",<Check/>],
      ["Ad Spend",<V>Separate</V>],
      ["Priority Optimization",<Check/>],
    ]},
    { title: "Dedicated Growth Support", rows: [
      ["Analytics Dashboard",<Check/>],
      ["Monthly Growth Review",<Check/>],
      ["Priority Support",<Check/>],
      ["Quarterly Growth Planning",<Check/>],
    ]},
  ]},
};

// ── Plan cards data ─────────────────────────────────────────────────────────
const plans = [
  {
    name: "LITE",
    subtitle: "Starter Plan",
    emoji: "🪔",
    price: { Month: 9999, Quarterly: 26997, "Half Yearly": 50994, Yearly: 95988 },
    tag: null, featured: false,
    target: "For New Spiritual Creators",
    features: [
      "Instagram + Facebook",
      "8 Creative Posts / Month",
      "4 Reels / Shorts / Month",
      "Basic SEO + Google Business",
      "Monthly Report + WhatsApp Support",
    ],
  },
  {
    name: "STANDARD",
    subtitle: "Most Popular",
    emoji: "🌸",
    price: { Month: 19999, Quarterly: 53997, "Half Yearly": 101994, Yearly: 191988 },
    tag: "Most Popular", featured: true,
    target: "For Growing Gurus & Spiritual Brands",
    features: [
      "Instagram + Facebook + YouTube",
      "12 Creative Posts / Month",
      "8 Reels / Shorts / Month",
      "SEO + Local SEO + Google Business",
      "Google + Meta Ads Management",
    ],
  },
  {
    name: "ADVANCE",
    subtitle: "Growth Plan",
    emoji: "🔱",
    price: { Month: 34999, Quarterly: 94497, "Half Yearly": 178494, Yearly: 335988 },
    tag: null, featured: false,
    target: "For Established Spiritual Brands",
    features: [
      "Instagram + Facebook + YouTube",
      "16 Creative Posts / Month",
      "12 Reels / Shorts / Month",
      "Advanced SEO + Competitor Analysis",
      "Google + Meta Ads + Retargeting",
    ],
  },
  {
    name: "ENTERPRISE",
    subtitle: "Full Growth Partner",
    emoji: "☀️",
    price: { Month: 49999, Quarterly: 134997, "Half Yearly": 254994, Yearly: 479988 },
    tag: null, featured: false,
    target: "For Serious Growth & Scale",
    features: [
      "Full Social Media Management",
      "24+ Creative Posts / Month",
      "16+ Reels / Shorts / Month",
      "SEO + Website Conversion Optimization",
      "Google + Meta Performance Ads",
    ],
  },
];

const periods = ["Month", "Quarterly", "Half Yearly", "Yearly"];
const periodSub = { Month: "1 Month", Quarterly: "3 Months • Save 10%", "Half Yearly": "6 Months • Save 15%", Yearly: "12 Months • Save 20%" };

function formatINR(n) { return new Intl.NumberFormat("en-IN").format(n); }

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.+I%E2%80%99d+like+to+know+more+about+your+services+and+growth+solutions.&type=phone_number&app_absent=0";

// ── Modal ────────────────────────────────────────────────────────────────────
function DetailRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #f0e8d0", gap: "8px" }}>
      <span style={{ color: "#7a6040", fontSize: "11px", lineHeight: 1.4 }}>{label}</span>
      <span style={{ fontSize: "11px", fontWeight: 600, flexShrink: 0 }}>{value}</span>
    </div>
  );
}

function SectionCard({ section }) {
  return (
    <div style={{ borderRadius: "12px", padding: "14px", border: section.accent ? "1.5px solid #b8860b" : "1px solid #e8dcc8", background: "#fffdf7", marginBottom: "2px" }}>
      <div style={{ fontSize: "12px", fontWeight: 700, color: "#5c3d00", letterSpacing: "0.5px", marginBottom: section.accent ? "3px" : "8px" }}>{section.title}</div>
      {section.accent && <div style={{ width: "28px", height: "2px", background: "#b8860b", borderRadius: "2px", marginBottom: "8px" }} />}
      {section.rows.map(([label, value], i) => <DetailRow key={i} label={label} value={value} />)}
    </div>
  );
}

function Modal({ plan, onClose }) {
  const details = planDetails[plan.name];
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(60,30,0,0.55)", padding: "16px", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "#fffcf5", borderRadius: "24px", width: "100%", maxWidth: "920px", maxHeight: "90vh", display: "flex", flexDirection: "column", border: "1px solid #e8dcc0", boxShadow: "0 24px 64px rgba(100,60,0,0.18)" }}>

        {/* Modal header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px 16px", borderBottom: "1px solid #f0e4c8" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #f5e6b0, #e8c860)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{plan.emoji}</div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#1e1000", letterSpacing: "2px", fontFamily: "Georgia, serif" }}>{plan.name}</div>
              <div style={{ fontSize: "11px", color: "#b8860b", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>{plan.subtitle}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #e0d0b0", background: "#fdf8ee", color: "#8b6914", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>×</button>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
            {details.sections.map((s, i) => <SectionCard key={i} section={s} />)}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 28px", borderTop: "1px solid #f0e4c8", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose} style={{ padding: "9px 20px", borderRadius: "50px", border: "1px solid #e0d0b0", background: "transparent", color: "#8b6914", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Close</button>
          <button style={{ padding: "9px 24px", borderRadius: "50px", border: "none", background: "linear-gradient(135deg, #b8860b, #d4a017)", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px" }} onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}>🙏 Get Started</button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function PricingTable() {
  const [activePeriod, setActivePeriod] = useState("Month");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [periodBarFixed, setPeriodBarFixed] = useState(true);
  const pricingCardsRef = useRef(null);
  const pricingSectionRef = useRef(null);
  const periodsScrollRef = useRef(null);
  const periodBtnRefs = useRef({});

  useEffect(() => {
    const section = pricingSectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPeriodBarFixed(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handlePeriodChange = (period) => {
    // Change the active pricing period so all cards recalculate immediately.
    setActivePeriod(period);

    // Return the whole pricing component/page to the very top.
    setPeriodBarFixed(true);

    // Mobile: smoothly bring the tapped tab to the horizontal center of its
    // scroll row, so it's easy to see which one is active even mid-scroll.
    const btn = periodBtnRefs.current[period];
    const scroller = periodsScrollRef.current;
    if (btn && scroller) {
      const targetLeft =
        btn.offsetLeft - scroller.clientWidth / 2 + btn.clientWidth / 2;
      scroller.scrollTo({ left: targetLeft, behavior: "smooth" });
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  };

  return (
    <>

      <style>{`
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          max-width: 1320px;
          margin: 0 auto;
        }

        .pricing-card {
          min-width: 0;
        }

        .pricing-periods {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 44px;
        }

        .pricing-period-btn {
          min-width: 118px;
        }

        @media (max-width: 1100px) {
          .pricing-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 820px;
          }

          .individual-services-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 700px) {
          /* Mobile: single horizontal row, swipeable, snap-to-center */
          .pricing-periods {
            display: flex !important;
            flex-wrap: nowrap;
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            scroll-snap-type: x proximity;
            gap: 8px;
            width: 100%;
            scrollbar-width: none;
          }

          .pricing-periods::-webkit-scrollbar {
            display: none;
          }

          .pricing-periods.is-fixed {
            position: fixed;
            top: 76px;
            left: 12px;
            right: 12px;
            width: auto;
            max-width: 520px;
            margin: 0 auto !important;
            padding: 8px 10px;
            z-index: 999;
            background: rgba(255, 252, 244, 0.97);
            border: 1px solid rgba(226, 208, 160, 0.95);
            border-radius: 20px;
            box-shadow:
              0 10px 28px rgba(80, 45, 0, 0.12),
              0 2px 8px rgba(80, 45, 0, 0.06);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }

          .pricing-periods.is-flow {
            position: relative;
            margin: 0 0 28px !important;
            padding: 0 4px;
            background: transparent;
            border: 0;
            border-radius: 0;
            box-shadow: none;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }

          /* Fixed width so text never wraps/cuts, scroll-snap centers each tab */
          .pricing-period-btn {
            flex: 0 0 150px;
            width: 150px;
            min-width: 150px;
            max-width: 150px;
            scroll-snap-align: center;
            border-radius: 50px !important;
            white-space: nowrap;
          }

          .pricing-periods.is-fixed .pricing-period-btn {
            min-height: 50px;
          }

          .pricing-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            max-width: 520px;
            padding-top: 8px;
          }

          .pricing-card {
            width: 100%;
            padding: 28px 20px 22px !important;
            border-radius: 20px !important;
          }

          .pricing-card-price {
            margin-bottom: 16px !important;
          }

          .pricing-card-price-value {
            font-size: 31px !important;
          }

          .pricing-card-feature-list {
            gap: 8px !important;
          }

          .pricing-card-feature-item {
            font-size: 12px !important;
          }

          .pricing-periods {
            margin-bottom: 14px;
          }

          .pricing-period-btn {
            min-height: 50px;
            padding: 9px 10px !important;
          }

          .pricing-header {
            margin-bottom: 28px !important;
          }

          /* Push header content down while the period bar is fixed/floating
             over it, so the eyebrow badge + heading never get hidden behind it. */
          .bar-fixed .pricing-header {
            padding-top: 76px;
          }

          .pricing-header-description {
            font-size: 13px !important;
            padding: 0 8px;
          }

          .individual-services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 430px) {
          .pricing-card {
            padding: 26px 16px 20px !important;
          }

          .pricing-card-name {
            font-size: 17px !important;
          }

          .pricing-card-price-value {
            font-size: 29px !important;
          }
        }
      `}</style>

      <style>{`
        @media (max-width: 1100px) {
          .individual-services-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 720px) {
          .individual-services-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 480px) {
          .individual-services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
      <div
        ref={pricingSectionRef}
        className={periodBarFixed ? "pricing-section bar-fixed" : "pricing-section"}
        style={{ background: "linear-gradient(160deg, #fdf8ed 0%, #fef9f0 50%, #fdf5e6 100%)", minHeight: "100vh", padding: "60px 20px 80px", position: "relative", overflow: "hidden", fontFamily: "system-ui, sans-serif" }}>

      {/* Background mandala decoration */}
      <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.05 }}><Mandala size={200} opacity={1} /></div>
      <div style={{ position: "absolute", bottom: -20, left: -20, opacity: 0.04 }}><Mandala size={180} opacity={1} /></div>

      {/* Section header — matches homepage style */}
      <div className="pricing-header" style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#fdf0d0", border: "1px solid #e8c860", borderRadius: "50px", padding: "5px 14px", marginBottom: "16px" }}>
          <span style={{ fontSize: "13px" }}>☸️</span>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#8b6914", letterSpacing: "2px", textTransform: "uppercase" }}>DEVOTIONAL & SPIRITUAL DIGITAL GROWTH</span>
        </div>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, color: "#1a1000", margin: "0 0 4px", fontFamily: "Georgia, serif", lineHeight: 1.2 }}>
          Choose Your <span style={{ color: "#b8860b", fontStyle: "italic" }}>Growth Plan</span>
        </h2>
        <LotusDivider />
        <p className="pricing-header-description" style={{ color: "#7a6040", fontSize: "15px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontStyle: "italic" }}>
          Affordable digital growth for gurus, mandirs, spiritual creators and devotional brands — without the heavy agency pricing.
        </p>
      </div>

      {/* Period tabs — pill style like homepage service tags */}
      <div
        ref={periodsScrollRef}
        className={`pricing-periods ${periodBarFixed ? "is-fixed" : "is-flow"}`}
      >
        {periods.map((p) => (
          <button
            className="pricing-period-btn"
            key={p}
            ref={(el) => { periodBtnRefs.current[p] = el; }}
            onClick={() => handlePeriodChange(p)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "10px 24px", borderRadius: "50px", cursor: "pointer", transition: "all .2s",
              background: activePeriod === p ? "linear-gradient(135deg, #b8860b, #d4a017)" : "#fff",
              color: activePeriod === p ? "#fff" : "#5c3d00",
              border: activePeriod === p ? "1.5px solid #b8860b" : "1.5px solid #e8dcc0",
              boxShadow: activePeriod === p ? "0 4px 16px rgba(184,134,11,0.30)" : "0 1px 4px rgba(0,0,0,0.06)",
              fontWeight: 700, fontSize: "13px",
            }}>
            {p}
            <span style={{ fontSize: "10px", fontWeight: 500, opacity: 0.75, marginTop: "2px" }}>({periodSub[p]})</span>
          </button>
        ))}
      </div>

      {/* Cards grid — 4 fixed columns, no shrinking */}
      <div ref={pricingCardsRef} className="pricing-cards-grid">
        {plans.map((plan) => {
          const f = plan.featured;
          /* light cards: warm cream with visible dark text
             featured card: rich saffron-maroon with bright gold text */
          return (
            <div className="pricing-card" key={plan.name} style={{
              position: "relative", borderRadius: "22px",
              padding: f ? "36px 26px 26px" : "30px 26px 26px",
              display: "flex", flexDirection: "column", overflow: "hidden",
              background: f
                ? "linear-gradient(160deg, #6b3300 0%, #4a2000 60%, #3a1800 100%)"
                : "linear-gradient(160deg, #fffef8 0%, #fff9ec 100%)",
              border: f ? "2px solid #d4a017" : "1.5px solid #e2d0a0",
              boxShadow: f
                ? "0 16px 56px rgba(184,134,11,0.30), inset 0 1px 0 rgba(255,220,100,0.15)"
                : "0 6px 28px rgba(120,80,0,0.10)",
            }}>

              {/* Corner mandala */}
              <div style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none" }}>
                <Mandala size={90} opacity={f ? 0.14 : 0.07} />
              </div>

              {/* Popular badge */}
              {plan.tag && (
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #b8860b, #f0c040)", color: "#3a1800", fontSize: "10px", fontWeight: 800, padding: "5px 18px", borderRadius: "0 0 14px 14px", letterSpacing: "1.5px", whiteSpace: "nowrap", textTransform: "uppercase" }}>
                  ★ {plan.tag} ★
                </div>
              )}

              {/* Plan icon + name */}
              <div style={{ textAlign: "center", fontSize: "28px", marginBottom: "8px" }}>{plan.emoji}</div>
              <div className="pricing-card-name" style={{ textAlign: "center", fontSize: "18px", fontWeight: 900, letterSpacing: "3px", color: f ? "#f8dc70" : "#2a1400", fontFamily: "Georgia, serif", marginBottom: "3px" }}>{plan.name}</div>
              <div style={{ textAlign: "center", fontSize: "12px", color: f ? "#e0b060" : "#9a6c10", fontWeight: 600, marginBottom: "20px", letterSpacing: "0.5px" }}>{plan.subtitle}</div>

              {/* Price */}
              <div className="pricing-card-price" style={{ textAlign: "center", marginBottom: "20px" }}>
                <span className="pricing-card-price-value" style={{ fontSize: "34px", fontWeight: 900, color: f ? "#f8dc70" : "#1e1000", fontFamily: "Georgia, serif" }}>
                  ₹{formatINR(plan.price[activePeriod])}
                </span>
                <span style={{ fontSize: "13px", color: f ? "#c8a050" : "#7a5810", marginLeft: "5px" }}>
                  /{activePeriod === "Month" ? "month" : activePeriod === "Quarterly" ? "3 Months" : activePeriod === "Half Yearly" ? "6 Months" : "12 Months"}
                </span>
              </div>

              {/* Primary CTA */}
              <button style={{
                width: "100%", padding: "12px", borderRadius: "50px", border: "none", cursor: "pointer",
                fontWeight: 700, fontSize: "13px", marginBottom: "20px", letterSpacing: "0.5px",
                background: f ? "linear-gradient(135deg, #e8b020, #f8dc70)" : "linear-gradient(135deg, #b8860b, #d4a017)",
                color: f ? "#2a1000" : "#fff",
                boxShadow: f ? "0 6px 20px rgba(232,176,32,0.50)" : "0 4px 14px rgba(184,134,11,0.35)",
              }} onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}>🙏 Get Quote</button>

              {/* Divider */}
              <div style={{ height: "1px", background: f ? "rgba(220,170,80,0.35)" : "#ead8a8", marginBottom: "14px" }} />

              {/* Target label */}
              <div style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: f ? "#daa84a" : "#9a6c10", marginBottom: "16px" }}>
                ❀ {plan.target} ❀
              </div>

              {/* Features */}
              <ul className="pricing-card-feature-list" style={{ flex: 1, margin: "0 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map((feat, i) => (
                  <li className="pricing-card-feature-item" key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px", fontSize: "13px", color: f ? "#f0d090" : "#3a2200", lineHeight: 1.55, fontWeight: 500 }}>
                    <span style={{ flexShrink: 0, marginTop: "2px" }}><Check /></span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* View Details CTA */}
              <button onClick={() => setSelectedPlan(plan)}
                style={{
                  width: "100%", padding: "11px", borderRadius: "50px", cursor: "pointer",
                  fontWeight: 700, fontSize: "13px", letterSpacing: "0.5px",
                  border: f ? "1.5px solid rgba(220,170,80,0.6)" : "1.5px solid #d4b870",
                  background: f ? "rgba(220,170,80,0.14)" : "transparent",
                  color: f ? "#f8dc70" : "#8b6000",
                }}>
                View Details →
              </button>
            </div>
          );
        })}
      </div>

      {/* Individual Services — starting prices */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "26px auto 0",
          border: "1.5px solid #e2d0a0",
          borderRadius: "18px",
          background: "linear-gradient(160deg, #fffef8 0%, #fff9ec 100%)",
          overflow: "hidden",
          boxShadow: "0 6px 28px rgba(120,80,0,0.10)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "12px 16px 8px",
            color: "#b8860b",
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
          }}
        >
          INDIVIDUAL SERVICES (STARTING PRICE)
        </div>

        <div
          className="individual-services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(11, minmax(0, 1fr))",
            borderTop: "1px solid #ead8a8",
          }}
        >
          {[
            ["🎬", "Reel / Short Editing", "₹999", "/reel"],
            ["🖼️", "Social Media Post", "₹499", "/post"],
            ["▶️", "YouTube Thumbnail", "₹599", "/thumbnail"],
            ["✿", "Festival / Tithi Creative", "₹799", "/design"],
            ["🗓️", "Event / Darbar Poster", "₹999", "/design"],
            ["🎥", "YouTube Video Editing", "₹2,499", "/video"],
            ["🖥️", "Banner / Cover Design", "₹1,199", "/design"],
            ["✎", "Logo / Branding Design", "₹2,999+", "/project"],
            ["🌐", "Website Design", "₹24,999+", "/website"],
            ["📣", "Meta Ads Management", "₹7,999", "/month"],
            ["📈", "SEO", "₹9,999", "/month"],
          ].map(([icon, title, price, unit], index) => (
            <div
              key={title}
              style={{
                padding: "12px 8px",
                minWidth: 0,
                textAlign: "center",
                borderRight: index < 10 ? "1px solid #ead8a8" : "none",
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "4px" }}>{icon}</div>
              <div
                style={{
                  fontSize: "10px",
                  lineHeight: 1.25,
                  minHeight: "26px",
                  fontWeight: 700,
                  color: "#3a2200",
                  letterSpacing: "0.1px",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginTop: "7px",
                  fontSize: "14px",
                  fontWeight: 900,
                  color: "#2a1800",
                }}
              >
                {price}
                <span style={{ fontSize: "9px", fontWeight: 600, color: "#7a5810" }}>
                  {" "}{unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar — matches homepage */}
      <div style={{ textAlign: "center", marginTop: "28px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "20px" }}>🙏🌸☀️</span>
        <span style={{ color: "#7a6040", fontSize: "13px" }}>Built for <strong style={{ color: "#2a1800" }}>Gurus, Mandirs & Spiritual Brands</strong></span>
        <span style={{ color: "#d4a017", fontSize: "16px", letterSpacing: "2px" }}>★★★★★</span>
        <span style={{ color: "#5c3d00", fontSize: "13px", fontWeight: 700 }}>4.9</span>
      </div>

      {selectedPlan && <Modal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </div>
   
    <ProjectsSection/>
    <FAQSection/>
    </>
   
  );
}