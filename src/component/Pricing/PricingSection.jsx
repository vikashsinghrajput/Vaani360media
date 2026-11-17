import { useState, useEffect, useRef } from "react";
import ToolsWeUse from "./ToolsWeUse";
import ProjectsSection from "./ProjectsSection";
import FAQSection from "./FAQSection";

/**
 * Elevion Media — Pricing · Liquid Glass
 * Brand colors from logo: Orange #F25400 · Charcoal #232323
 * Background, content & logic unchanged.
 */

// ── Icons ──────────────────────────────────────────────────────────────────
const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#F25400" opacity="0.16"/>
    <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="#F25400" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Cross = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="7" fill="#232323" opacity="0.1"/>
    <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="#6F6A64" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LotusDivider = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "6px 0 18px" }}>
    <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, transparent, #F25400)" }} />
    <span style={{ fontSize: "16px", color: "#F25400" }}>❀</span>
    <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, #F25400, transparent)" }} />
  </div>
);

const Mandala = ({ size = 80, opacity = 0.06 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, pointerEvents: "none" }}>
    <circle cx="50" cy="50" r="48" stroke="#F25400" strokeWidth="0.6" fill="none"/>
    <circle cx="50" cy="50" r="36" stroke="#F25400" strokeWidth="0.6" fill="none"/>
    <circle cx="50" cy="50" r="24" stroke="#F25400" strokeWidth="0.6" fill="none"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
      <line key={a} x1="50" y1="50"
        x2={50+48*Math.cos(a*Math.PI/180)} y2={50+48*Math.sin(a*Math.PI/180)}
        stroke="#F25400" strokeWidth="0.4"/>
    ))}
    {[0,45,90,135,180,225,270,315].map(a => (
      <circle key={a}
        cx={50+36*Math.cos(a*Math.PI/180)} cy={50+36*Math.sin(a*Math.PI/180)}
        r="2.5" fill="#F25400" opacity="0.5"/>
    ))}
    <circle cx="50" cy="50" r="4" fill="#F25400" opacity="0.5"/>
  </svg>
);

// ── Plan detail data ────────────────────────────────────────────────────────
const V = ({ children }) => <span className="pt-v">{children}</span>;

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

const services = [
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
];

function formatINR(n) { return new Intl.NumberFormat("en-IN").format(n); }

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.+I%E2%80%99d+like+to+know+more+about+your+services+and+growth+solutions.&type=phone_number&app_absent=0";

// ── Modal ────────────────────────────────────────────────────────────────────
function DetailRow({ label, value }) {
  return (
    <div className="pt-row">
      <span className="pt-row-l">{label}</span>
      <span className="pt-row-v">{value}</span>
    </div>
  );
}

function SectionCard({ section }) {
  return (
    <div className={`pt-sec ${section.accent ? "accent" : ""}`}>
      <div className="pt-sec-t">{section.title}</div>
      {section.accent && <div className="pt-sec-bar" />}
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
    <div className="pt-modal-bg" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pt-modal glass">

        {/* Modal header */}
        <div className="pt-modal-head">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            <div className="pt-modal-ico">{plan.emoji}</div>
            <div style={{ minWidth: 0 }}>
              <div className="pt-modal-name">{plan.name}</div>
              <div className="pt-modal-sub">{plan.subtitle}</div>
            </div>
          </div>
          <button className="pt-x" onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Scrollable content */}
        <div className="pt-modal-body">
          <div className="pt-modal-grid">
            {details.sections.map((s, i) => <SectionCard key={i} section={s} />)}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-modal-foot">
          <button className="pt-btn ghost" onClick={onClose}>Close</button>
          <button className="pt-btn primary" onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}>🙏 Get Started</button>
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
        .pt-root {
          --o: #F25400; --o2: #FF8A3D; --od: #D44A00;
          --ink: #232323; --ink2: #6F6A64;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent;
          background: linear-gradient(160deg, #fdf8ed 0%, #fef9f0 50%, #fdf5e6 100%);
          min-height: 100vh; padding: 60px 20px 80px; position: relative; overflow: hidden;
        }
        .pt-root *, .pt-root *::before, .pt-root *::after, .pt-modal-bg *, .pt-modal-bg *::before, .pt-modal-bg *::after { box-sizing: border-box; }
        .pt-root button, .pt-modal-bg button { font-family: inherit; touch-action: manipulation; }

        /* ---------- LIQUID GLASS ---------- */
        .glass {
          position: relative;
          background: linear-gradient(135deg, rgba(255,255,255,.74) 0%, rgba(255,255,255,.40) 100%);
          -webkit-backdrop-filter: blur(24px) saturate(180%); backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255,255,255,.78);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,.95),
            inset 0 -1px 0 rgba(242,84,0,.06),
            0 1px 2px rgba(35,35,35,.04),
            0 24px 60px -18px rgba(242,84,0,.20),
            0 12px 30px -12px rgba(35,35,35,.12);
        }
        .glass::before {
          content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
          background: linear-gradient(160deg, rgba(255,255,255,.95), rgba(255,255,255,0) 40%, rgba(242,84,0,.22) 100%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
        }

        /* ---------- LIQUID BUTTONS ---------- */
        .pt-btn {
          position: relative; isolation: isolate; overflow: hidden; cursor: pointer; width: auto;
          border-radius: 999px; padding: 12px 22px; min-height: 44px;
          font-size: 13px; font-weight: 700; letter-spacing: .3px; white-space: nowrap;
          transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, background .3s ease;
        }
        .pt-btn::after {
          content: ""; position: absolute; left: 8%; right: 8%; top: 2px; height: 46%; border-radius: 999px; pointer-events: none;
          background: linear-gradient(to bottom, rgba(255,255,255,.55), rgba(255,255,255,0));
        }
        .pt-btn:active { transform: scale(.96); transition-duration: .12s; }
        @media (hover: hover) { .pt-btn:hover { transform: translateY(-2px) scale(1.03); } }
        .pt-btn.primary {
          color: #fff; border: 1px solid rgba(255,255,255,.45);
          background: linear-gradient(135deg, #FF7A2E 0%, #F25400 100%);
          box-shadow: inset 0 1.5px 1px rgba(255,255,255,.5), inset 0 -3px 6px rgba(160,50,0,.35), 0 10px 22px -6px rgba(242,84,0,.55);
        }
        .pt-btn.ghost {
          color: var(--ink); border: 1px solid rgba(255,255,255,.85);
          background: linear-gradient(135deg, rgba(255,255,255,.65), rgba(255,255,255,.25) 60%, rgba(242,84,0,.10));
          -webkit-backdrop-filter: blur(14px) saturate(200%); backdrop-filter: blur(14px) saturate(200%);
          box-shadow: inset 0 2px 1px rgba(255,255,255,.95), inset 0 -3px 6px rgba(242,84,0,.14), 0 6px 16px -6px rgba(35,35,35,.18);
        }
        .pt-btn:focus-visible, .pt-period:focus-visible, .pt-x:focus-visible { outline: 2px solid var(--o); outline-offset: 3px; }
        .pt-card-btn { width: 100%; }

        /* ---------- HEADER ---------- */
        .pt-eyebrow {
          display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 6px 16px; margin-bottom: 16px; max-width: 100%;
        }
        .pt-eyebrow span:last-child { font-size: 11px; font-weight: 700; color: var(--o); letter-spacing: 2px; text-transform: uppercase; }
        .pt-h2 { font-size: clamp(28px, 5vw, 46px); font-weight: 900; color: var(--ink); margin: 0 0 4px; font-family: Georgia, serif; line-height: 1.2; }
        .pt-h2 em { color: var(--o); font-style: italic; }
        .pt-lead { color: var(--ink2); font-size: 15px; max-width: 520px; margin: 0 auto; line-height: 1.7; font-style: italic; }

        /* ---------- PERIOD TABS ---------- */
        .pt-period {
          display: flex; flex-direction: column; align-items: center; padding: 10px 24px; border-radius: 999px; cursor: pointer;
          font-weight: 700; font-size: 13px; color: var(--ink);
          background: linear-gradient(135deg, rgba(255,255,255,.7), rgba(255,255,255,.3));
          -webkit-backdrop-filter: blur(14px) saturate(190%); backdrop-filter: blur(14px) saturate(190%);
          border: 1px solid rgba(255,255,255,.85);
          box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), 0 6px 16px -8px rgba(35,35,35,.2);
          transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, background .3s ease, color .2s;
        }
        .pt-period span { font-size: 10px; font-weight: 500; opacity: .7; margin-top: 2px; }
        .pt-period.on {
          color: #fff; border-color: rgba(255,255,255,.5);
          background: linear-gradient(135deg, #FF7A2E 0%, #F25400 100%);
          box-shadow: inset 0 1.5px 1px rgba(255,255,255,.5), inset 0 -3px 6px rgba(160,50,0,.3), 0 10px 22px -6px rgba(242,84,0,.5);
        }
        .pt-period.on span { opacity: .9; }
        @media (hover: hover) { .pt-period:hover { transform: translateY(-2px); } }
        .pt-period:active { transform: scale(.96); }

        /* ---------- GRID + CARDS ---------- */
        .pricing-cards-grid {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px; max-width: 1320px; margin: 0 auto;
        }
        .pricing-card { min-width: 0; }
        .pricing-periods { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 44px; }
        .pricing-period-btn { min-width: 118px; }

        .pt-card {
          position: relative; border-radius: 26px; padding: 30px 26px 26px; display: flex; flex-direction: column; overflow: hidden;
        }
        .pt-card.feat { padding: 36px 26px 26px; }
        .pt-card.feat {
          background: linear-gradient(160deg, rgba(255,226,204,.92) 0%, rgba(255,240,226,.78) 50%, rgba(255,255,255,.6) 100%);
          border: 1.5px solid rgba(242,84,0,.6);
          -webkit-backdrop-filter: blur(24px) saturate(180%); backdrop-filter: blur(24px) saturate(180%);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,.95),
            inset 0 -1px 0 rgba(242,84,0,.12),
            0 24px 60px -16px rgba(242,84,0,.40),
            0 12px 30px -12px rgba(35,35,35,.14);
        }
        .pt-card.feat::before {
          background: linear-gradient(160deg, rgba(255,255,255,.95), rgba(255,255,255,0) 40%, rgba(242,84,0,.4) 100%);
        }
        .pt-badge {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%); z-index: 2;
          background: linear-gradient(135deg, #FF7A2E, #F25400); color: #fff; font-size: 10px; font-weight: 800;
          padding: 5px 18px; border-radius: 0 0 14px 14px; letter-spacing: 1.5px; white-space: nowrap; text-transform: uppercase;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.4), 0 6px 14px -4px rgba(242,84,0,.6);
        }
        .pt-corner { position: absolute; top: 0; right: 0; pointer-events: none; }
        .pt-emoji { text-align: center; font-size: 28px; margin-bottom: 8px; position: relative; }
        .pricing-card-name { text-align: center; font-size: 18px; font-weight: 900; letter-spacing: 3px; color: var(--ink); font-family: Georgia, serif; margin-bottom: 3px; position: relative; }
        .pt-sub { text-align: center; font-size: 12px; color: var(--od); font-weight: 600; margin-bottom: 20px; letter-spacing: .5px; position: relative; }
        .pricing-card-price { text-align: center; margin-bottom: 20px; position: relative; }
        .pricing-card-price-value { font-size: 34px; font-weight: 900; color: var(--ink); font-family: Georgia, serif; }
        .pt-per { font-size: 13px; color: var(--ink2); margin-left: 5px; }
        .pt-card .pt-card-btn.primary { margin-bottom: 20px; }
        .pt-hr { height: 1px; background: rgba(35,35,35,.1); margin-bottom: 14px; position: relative; }
        .pt-target { text-align: center; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--od); margin-bottom: 16px; position: relative; }
        .pricing-card-feature-list { flex: 1; margin: 0 0 20px; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; position: relative; }
        .pricing-card-feature-item { display: flex; align-items: flex-start; gap: 9px; font-size: 13px; color: var(--ink); line-height: 1.55; font-weight: 500; }
        .pt-check { flex-shrink: 0; margin-top: 2px; }

        /* featured card: same dark text, just orange accents */
        .pt-card.feat .pricing-card-name, .pt-card.feat .pricing-card-price-value { color: var(--ink); }
        .pt-card.feat .pt-hr { background: rgba(242,84,0,.25); }

        /* ---------- INDIVIDUAL SERVICES ---------- */
        .pt-svc { max-width: 1320px; margin: 26px auto 0; border-radius: 26px; padding: 14px 14px 16px; overflow: hidden; }
        .pt-svc-title { text-align: center; padding: 6px 12px 12px; color: var(--o); font-size: 14px; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase; position: relative; }
        .individual-services-grid { display: grid; grid-template-columns: repeat(11, minmax(0, 1fr)); gap: 8px; position: relative; }
        .pt-tile {
          min-width: 0; text-align: center; padding: 12px 6px; border-radius: 18px;
          background: linear-gradient(135deg, rgba(255,255,255,.7), rgba(255,255,255,.3));
          border: 1px solid rgba(255,255,255,.85);
          box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), 0 6px 14px -8px rgba(35,35,35,.18);
          transition: transform .35s cubic-bezier(.34,1.56,.64,1);
        }
        @media (hover: hover) { .pt-tile:hover { transform: translateY(-3px); } }
        .pt-tile-i { font-size: 18px; margin-bottom: 4px; }
        .pt-tile-t { font-size: 10px; line-height: 1.25; min-height: 26px; font-weight: 700; color: var(--ink); }
        .pt-tile-p { margin-top: 7px; font-size: 14px; font-weight: 900; color: var(--ink); }
        .pt-tile-p span { font-size: 9px; font-weight: 600; color: var(--od); }

        .pt-trust { text-align: center; margin-top: 28px; display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .pt-trust .t { color: var(--ink2); font-size: 13px; }
        .pt-trust .t strong { color: var(--ink); }

        /* ---------- MODAL ---------- */
        .pt-modal-bg {
          position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center;
          background: rgba(35,35,35,.45); padding: 16px; -webkit-backdrop-filter: blur(14px) saturate(140%); backdrop-filter: blur(14px) saturate(140%);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased;
          --o: #F25400; --od: #D44A00; --ink: #232323; --ink2: #6F6A64;
          animation: ptFade .25s ease;
        }
        @keyframes ptFade { from { opacity: 0; } }
        @keyframes ptPop { from { opacity: 0; transform: translateY(14px) scale(.98); } }
        .pt-modal {
          width: 100%; max-width: 920px; max-height: 90vh; max-height: 90dvh; display: flex; flex-direction: column; border-radius: 30px; overflow: hidden;
          background: linear-gradient(135deg, rgba(255,255,255,.86), rgba(255,250,242,.72));
          animation: ptPop .35s cubic-bezier(.2,.9,.25,1.05);
        }
        .pt-modal-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 20px 28px 16px; border-bottom: 1px solid rgba(35,35,35,.08); position: relative; }
        .pt-modal-ico {
          width: 44px; height: 44px; border-radius: 50%; flex: none; display: flex; align-items: center; justify-content: center; font-size: 22px;
          background: linear-gradient(135deg, #FFD2B0, #FF9A55); box-shadow: inset 0 1.5px 1px rgba(255,255,255,.7), 0 6px 14px -4px rgba(242,84,0,.4);
        }
        .pt-modal-name { font-size: 22px; font-weight: 800; color: var(--ink); letter-spacing: 2px; font-family: Georgia, serif; }
        .pt-modal-sub { font-size: 11px; color: var(--o); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
        .pt-x {
          width: 44px; height: 44px; flex: none; border-radius: 50%; cursor: pointer; font-size: 20px; font-weight: 700; color: var(--ink);
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(255,255,255,.8), rgba(255,255,255,.35));
          border: 1px solid rgba(255,255,255,.9); box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), 0 6px 14px -6px rgba(35,35,35,.2);
        }
        .pt-modal-body { overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; flex: 1; padding: 20px 28px; position: relative; }
        .pt-modal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
        .pt-modal-foot { padding: 14px 28px calc(14px + env(safe-area-inset-bottom)); border-top: 1px solid rgba(35,35,35,.08); display: flex; justify-content: flex-end; gap: 10px; position: relative; }

        .pt-sec {
          border-radius: 18px; padding: 14px; margin-bottom: 2px;
          background: linear-gradient(135deg, rgba(255,255,255,.8), rgba(255,255,255,.4));
          border: 1px solid rgba(255,255,255,.9); box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), 0 6px 16px -10px rgba(35,35,35,.18);
        }
        .pt-sec.accent { border: 1.5px solid rgba(242,84,0,.55); box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), 0 10px 24px -12px rgba(242,84,0,.4); }
        .pt-sec-t { font-size: 12px; font-weight: 700; color: var(--ink); letter-spacing: .5px; margin-bottom: 8px; }
        .pt-sec.accent .pt-sec-t { margin-bottom: 3px; }
        .pt-sec-bar { width: 28px; height: 2px; background: linear-gradient(90deg, #FF7A2E, #F25400); border-radius: 2px; margin-bottom: 8px; }
        .pt-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid rgba(35,35,35,.07); gap: 8px; }
        .pt-row:last-child { border-bottom: 0; }
        .pt-row-l { color: var(--ink2); font-size: 11.5px; line-height: 1.4; }
        .pt-row-v { font-size: 11px; font-weight: 600; flex-shrink: 0; text-align: right; max-width: 55%; }
        .pt-v { color: var(--od); font-weight: 700; font-size: 11px; }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 1100px) {
          .pricing-cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 820px; }
          .individual-services-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
        }

        @media (max-width: 720px) {
          .individual-services-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 700px) {
          /* Mobile: single horizontal row, swipeable, snap-to-center */
          .pricing-periods {
            display: flex !important; flex-wrap: nowrap; justify-content: flex-start;
            overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; scroll-behavior: smooth; scroll-snap-type: x proximity;
            gap: 8px; width: 100%; scrollbar-width: none;
          }
          .pricing-periods::-webkit-scrollbar { display: none; }

          .pricing-periods.is-fixed {
            position: fixed; top: 76px; left: 12px; right: 12px; width: auto; max-width: 520px; margin: 0 auto !important;
            padding: 8px 10px; z-index: 999; border-radius: 26px;
            background: linear-gradient(135deg, rgba(255,255,255,.78), rgba(255,255,255,.5));
            -webkit-backdrop-filter: blur(22px) saturate(180%); backdrop-filter: blur(22px) saturate(180%);
            border: 1px solid rgba(255,255,255,.85);
            box-shadow: inset 0 1.5px 0 rgba(255,255,255,.95), 0 14px 32px -10px rgba(242,84,0,.25), 0 4px 12px rgba(35,35,35,.08);
          }
          .pricing-periods.is-flow {
            position: relative; margin: 0 0 28px !important; padding: 0 4px; background: transparent; border: 0; border-radius: 0; box-shadow: none;
            -webkit-backdrop-filter: none; backdrop-filter: none;
          }

          /* Fixed width so text never wraps/cuts, scroll-snap centers each tab */
          .pricing-period-btn {
            flex: 0 0 150px; width: 150px; min-width: 150px; max-width: 150px; scroll-snap-align: center;
            white-space: nowrap; min-height: 50px; padding: 9px 10px !important;
          }
          .pricing-periods { margin-bottom: 14px; }

          .pricing-cards-grid { grid-template-columns: 1fr; gap: 16px; max-width: 520px; padding-top: 8px; }
          .pricing-card { width: 100%; padding: 28px 20px 22px !important; border-radius: 22px !important; }
          .pricing-card-price { margin-bottom: 16px !important; }
          .pricing-card-price-value { font-size: 31px !important; }
          .pricing-card-feature-list { gap: 8px !important; }
          .pricing-card-feature-item { font-size: 12.5px !important; }

          .pricing-header { margin-bottom: 28px !important; }
          /* push header down while the period bar floats over it */
          .bar-fixed .pricing-header { padding-top: 76px; }
          .pt-lead { font-size: 13px; padding: 0 8px; }

          .pt-svc { border-radius: 22px; padding: 10px 10px 12px; }
          .pt-svc-title { font-size: 12.5px; letter-spacing: 1px; }

        }

        @media (max-width: 480px) {
          .individual-services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 430px) {
          .pricing-card { padding: 26px 16px 20px !important; }
          .pricing-card-name { font-size: 17px !important; }
          .pricing-card-price-value { font-size: 29px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pt-modal-bg, .pt-modal, .pt-btn, .pt-period, .pt-tile { animation: none !important; transition: none !important; }
        }
        @media (prefers-reduced-transparency: reduce) {
          .glass, .pt-period, .pt-btn.ghost, .pt-modal-bg { -webkit-backdrop-filter: none; backdrop-filter: none; }
          .glass { background: rgba(255,255,255,.95); }
        }
      `}</style>

      <div
        ref={pricingSectionRef}
        className={periodBarFixed ? "pt-root pricing-section bar-fixed" : "pt-root pricing-section"}
      >
        {/* Background mandala decoration */}
        <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.05, pointerEvents: "none" }}><Mandala size={200} opacity={1} /></div>
        <div style={{ position: "absolute", bottom: -20, left: -20, opacity: 0.04, pointerEvents: "none" }}><Mandala size={180} opacity={1} /></div>

        {/* Section header */}
        <div className="pricing-header" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="pt-eyebrow glass">
            <span style={{ fontSize: "13px" }}>☸️</span>
            <span>DEVOTIONAL & SPIRITUAL DIGITAL GROWTH</span>
          </div>
          <h2 className="pt-h2">
            Choose Your <em>Growth Plan</em>
          </h2>
          <LotusDivider />
          <p className="pt-lead">
            Affordable digital growth for gurus, mandirs, spiritual creators and devotional brands — without the heavy agency pricing.
          </p>
        </div>

        {/* Period tabs */}
        <div
          ref={periodsScrollRef}
          className={`pricing-periods ${periodBarFixed ? "is-fixed" : "is-flow"}`}
        >
          {periods.map((p) => (
            <button
              key={p}
              ref={(el) => { periodBtnRefs.current[p] = el; }}
              className={`pricing-period-btn pt-period ${activePeriod === p ? "on" : ""}`}
              onClick={() => handlePeriodChange(p)}
              aria-pressed={activePeriod === p}
            >
              {p}
              <span>({periodSub[p]})</span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div ref={pricingCardsRef} className="pricing-cards-grid">
          {plans.map((plan) => {
            const f = plan.featured;
            return (
              <div className={`pricing-card pt-card ${f ? "feat" : "glass"}`} key={plan.name}>

                {/* Corner mandala */}
                <div className="pt-corner">
                  <Mandala size={90} opacity={f ? 0.18 : 0.08} />
                </div>

                {/* Popular badge */}
                {plan.tag && <div className="pt-badge">★ {plan.tag} ★</div>}

                {/* Plan icon + name */}
                <div className="pt-emoji">{plan.emoji}</div>
                <div className="pricing-card-name">{plan.name}</div>
                <div className="pt-sub">{plan.subtitle}</div>

                {/* Price */}
                <div className="pricing-card-price">
                  <span className="pricing-card-price-value">
                    ₹{formatINR(plan.price[activePeriod])}
                  </span>
                  <span className="pt-per">
                    /{activePeriod === "Month" ? "month" : activePeriod === "Quarterly" ? "3 Months" : activePeriod === "Half Yearly" ? "6 Months" : "12 Months"}
                  </span>
                </div>

                {/* Primary CTA */}
                <button
                  className="pt-btn primary pt-card-btn"
                  onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
                >🙏 Get Quote</button>

                <div className="pt-hr" />

                {/* Target label */}
                <div className="pt-target">❀ {plan.target} ❀</div>

                {/* Features */}
                <ul className="pricing-card-feature-list">
                  {plan.features.map((feat, i) => (
                    <li className="pricing-card-feature-item" key={i}>
                      <span className="pt-check"><Check /></span>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* View Details CTA */}
                <button className="pt-btn ghost pt-card-btn" onClick={() => setSelectedPlan(plan)}>
                  View Details →
                </button>
              </div>
            );
          })}
        </div>

        {/* Individual Services — starting prices */}
        <div className="pt-svc glass">
          <div className="pt-svc-title">INDIVIDUAL SERVICES (STARTING PRICE)</div>

          <div className="individual-services-grid">
            {services.map(([icon, title, price, unit]) => (
              <div className="pt-tile" key={title}>
                <div className="pt-tile-i">{icon}</div>
                <div className="pt-tile-t">{title}</div>
                <div className="pt-tile-p">
                  {price}
                  <span> {unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div className="pt-trust">
          <span style={{ fontSize: "20px" }}>🙏🌸☀️</span>
          <span className="t">Built for <strong>Gurus, Mandirs & Spiritual Brands</strong></span>
          <span style={{ color: "#F25400", fontSize: "16px", letterSpacing: "2px" }}>★★★★★</span>
          <span style={{ color: "#232323", fontSize: "13px", fontWeight: 700 }}>4.9</span>
        </div>

        {selectedPlan && <Modal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
      </div>

      <ProjectsSection/>
      <FAQSection/>
    </>
  );
}