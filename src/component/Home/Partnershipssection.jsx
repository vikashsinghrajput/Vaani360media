import React from "react";
import {
  Search,
  Facebook,
  Instagram,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";

/* =========================================================
   VAANI 360 MEDIA — PAID ADVERTISING · LIQUID GLASS
   ========================================================= */

const adServices = [
  {
    name: "Google Ads",
    icon: Search,
    label: "GOOGLE ADS",
    sub: "Search • Display • YouTube",
    description:
      "Targeted Google campaigns that help temples, trusts and spiritual leaders reach people actively searching for their services.",
  },
  {
    name: "Meta Ads",
    icon: Facebook,
    label: "META ADS",
    sub: "Facebook • Instagram",
    description:
      "Creative-focused campaigns for temples, trusts and spiritual leaders, built to increase reach, engagement, qualified leads and conversions across Meta platforms.",
  },
  {
    name: "Instagram Advertising",
    icon: Instagram,
    label: "INSTAGRAM ADS",
    sub: "Reels • Stories • Feed",
    description:
      "High-impact campaigns for spiritual leaders, temples, trusts and devotional brands using the formats your audience already watches.",
  },
  {
    name: "Retargeting",
    icon: RefreshCcw,
    label: "RETARGETING",
    sub: "Reconnect • Convert",
    description:
      "We reconnect with people who already interacted with your brand and bring interested audiences back into the journey.",
  },
  {
    name: "Campaign Optimization",
    icon: TrendingUp,
    label: "PERFORMANCE",
    sub: "Optimize • Scale • Grow",
    description:
      "Continuous campaign optimization focused on stronger targeting, better creative performance and smarter ad spend.",
  },
];

const stats = [
  { big: "Google", small: "Search & YouTube Ads" },
  { big: "Meta", small: "Facebook & Instagram" },
  { big: "ROI", small: "Optimize & Scale" },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');

.ad-root {
  --ink: #1D1710; --ink-2: #5E5143; --ink-3: #8F8070;
  --saffron: #F28C28; --saffron-deep: #D96F0B;
  --edge: rgba(255,255,255,.78);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased; color: var(--ink);
  position: relative; width: 100%; overflow: hidden; overflow: clip; isolation: isolate;
  padding: clamp(56px, 8vw, 104px) clamp(16px, 3vw, 32px);
  background:
    radial-gradient(1100px 650px at 8% -8%, #FFE2B8 0%, transparent 60%),
    radial-gradient(900px 600px at 100% 12%, #FFD1C2 0%, transparent 55%),
    radial-gradient(900px 700px at 60% 112%, #FBE7A6 0%, transparent 55%),
    linear-gradient(180deg, #FBF6EF, #F4EBDD);
}
.ad-root *, .ad-root *::before, .ad-root *::after { box-sizing: border-box; }

.ad-blob { position: absolute; border-radius: 50%; filter: blur(70px); z-index: -1; pointer-events: none; }
.ad-blob.a { width: 380px; height: 380px; background: #F6A94A; opacity: .34; top: 4%; left: -100px; animation: adDrift 24s ease-in-out infinite alternate; }
.ad-blob.b { width: 340px; height: 340px; background: #F2B8A0; opacity: .36; top: 40%; right: -90px; animation: adDrift 28s ease-in-out infinite alternate-reverse; }
.ad-blob.c { width: 320px; height: 320px; background: #E7C968; opacity: .32; bottom: -80px; left: 34%; animation: adDrift 32s ease-in-out infinite alternate; }
@keyframes adDrift { to { transform: translate3d(60px,-40px,0) scale(1.12); } }

.ad-glass {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,.66), rgba(255,255,255,.4));
  -webkit-backdrop-filter: blur(28px) saturate(185%); backdrop-filter: blur(28px) saturate(185%);
  border: 1px solid var(--edge);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 -1px 0 rgba(255,255,255,.25) inset, 0 10px 40px rgba(120,70,20,.12);
}
.ad-glass::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 42%); mix-blend-mode: soft-light;
}

.ad-wrap { max-width: 1240px; margin: 0 auto; }

/* heading */
.ad-head { text-align: center; max-width: 780px; margin: 0 auto clamp(34px, 5vw, 56px); }
.ad-chip { display: inline-block; padding: 7px 16px; border-radius: 999px; margin-bottom: 18px; font-size: 11.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--saffron-deep); }
.ad-head h2 { margin: 0; font-weight: 800; letter-spacing: -.035em; line-height: 1.06; font-size: clamp(32px, 5.2vw, 60px); color: var(--ink); }
.ad-head h2 .g1 { background: linear-gradient(180deg, #2A1F14 30%, #7A5226 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.ad-head h2 .g2 { background: linear-gradient(180deg, #F89A3E, var(--saffron-deep)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.ad-head p { margin: 18px auto 0; max-width: 640px; font-size: clamp(14px, 1.4vw, 17px); line-height: 1.7; color: var(--ink-2); }

/* grid: 3 + 2 centred on desktop */
.ad-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: clamp(14px, 1.8vw, 24px); }
.ad-card { grid-column: span 2; }
.ad-card:nth-child(4) { grid-column: 2 / span 2; }
.ad-card:nth-child(5) { grid-column: 4 / span 2; }
@media (max-width: 1023px) {
  .ad-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ad-card, .ad-card:nth-child(4), .ad-card:nth-child(5) { grid-column: auto; }
  .ad-card:nth-child(5) { grid-column: 1 / -1; width: calc(50% - 8px); justify-self: center; }
}
@media (max-width: 639px) {
  .ad-grid { grid-template-columns: 1fr; }
  .ad-card:nth-child(5) { width: auto; }
}

/* card */
.ad-card {
  --mx: 50%; --my: 0%;
  border-radius: 32px; padding: 26px 24px 22px; display: flex; flex-direction: column; overflow: hidden;
  transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s;
}
.ad-card::after { /* light that follows the pointer */
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity .35s;
  background: radial-gradient(260px circle at var(--mx) var(--my), rgba(255,255,255,.7), transparent 65%);
}
.ad-card:hover { transform: translateY(-7px); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 28px 64px rgba(217,111,11,.2); }
.ad-card:hover::after { opacity: 1; }
@media (hover: none) { .ad-card:hover { transform: none; } .ad-card::after { display: none; } }

.ad-tile {
  position: relative; z-index: 1; width: 60px; height: 60px; border-radius: 19px; display: grid; place-items: center; color: #fff; margin-bottom: 20px;
  background: linear-gradient(145deg, #F6B04A, var(--saffron-deep));
  box-shadow: 0 1px 0 rgba(255,255,255,.5) inset, 0 -2px 6px rgba(0,0,0,.08) inset, 0 12px 26px rgba(217,111,11,.32);
  transition: transform .4s cubic-bezier(.2,.8,.2,1);
}
.ad-card:hover .ad-tile { transform: scale(1.07) rotate(-3deg); }

.ad-card > *:not(.ad-tile) { position: relative; z-index: 1; }
.ad-label { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--saffron-deep); }
.ad-card h3 { margin: 6px 0 0; font-size: clamp(20px, 1.8vw, 24px); font-weight: 800; letter-spacing: -.03em; line-height: 1.15; color: var(--ink); }
.ad-sub {
  align-self: flex-start; margin-top: 12px; padding: 5px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; color: var(--ink-2);
  background: rgba(255,255,255,.55); border: 1px solid rgba(255,255,255,.85); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset;
}
.ad-desc { margin: 14px 0 0; font-size: 14.5px; line-height: 1.65; color: var(--ink-2); flex: 1; }
.ad-foot { margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(201,162,39,.22); display: flex; align-items: center; gap: 8px; font-size: 11.5px; font-weight: 600; color: var(--ink-3); }
.ad-foot i { width: 7px; height: 7px; border-radius: 50%; background: var(--saffron-deep); box-shadow: 0 0 0 4px rgba(217,111,11,.12); }

/* stats bar */
.ad-stats { max-width: 820px; margin: clamp(32px, 5vw, 52px) auto 0; border-radius: 30px; display: grid; grid-template-columns: repeat(3, 1fr); padding: 8px; }
.ad-stat { text-align: center; padding: 16px 10px; position: relative; z-index: 1; }
.ad-stat + .ad-stat::before { content: ''; position: absolute; left: 0; top: 22%; bottom: 22%; width: 1px; background: linear-gradient(180deg, transparent, rgba(201,162,39,.4), transparent); }
.ad-stat b { display: block; font-size: clamp(22px, 2.8vw, 32px); font-weight: 800; letter-spacing: -.035em; background: linear-gradient(180deg, #2A1F14 30%, #7A5226 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.ad-stat span { display: block; margin-top: 4px; font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); }
@media (max-width: 560px) {
  .ad-stats { grid-template-columns: 1fr; border-radius: 28px; }
  .ad-stat + .ad-stat::before { left: 18%; right: 18%; top: 0; bottom: auto; width: auto; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,162,39,.4), transparent); }
}

@media (prefers-reduced-motion: reduce) { .ad-root *, .ad-root *::before { animation: none !important; transition: none !important; } }
@media (prefers-reduced-transparency: reduce) { .ad-glass { -webkit-backdrop-filter: none; backdrop-filter: none; background: rgba(255,255,255,.93); } }
`;

export default function PartnershipsSection() {
  // soft light that follows the pointer inside each card
  const track = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="ad-root" aria-label="Paid advertising">
      <style>{STYLES}</style>
      <div className="ad-blob a" />
      <div className="ad-blob b" />
      <div className="ad-blob c" />

      <div className="ad-wrap">
        {/* HEADING */}
        <header className="ad-head">
          <div className="ad-chip ad-glass">Paid Advertising</div>
          <h2>
            <span className="g1">Paid Advertising That </span>
            <span className="g2">Drives Growth</span>
          </h2>
          <p>
            We run targeted Google and Meta ad campaigns for temples, trusts and spiritual leaders — designed to
            increase reach, engagement, qualified leads and conversions while keeping campaigns optimized for
            performance.
          </p>
        </header>

        {/* AD SERVICES */}
        <div className="ad-grid">
          {adServices.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.name} className="ad-card ad-glass" onPointerMove={track}>
                <div className="ad-tile">
                  <Icon size={28} strokeWidth={1.9} />
                </div>
                <div className="ad-label">{service.label}</div>
                <h3>{service.name}</h3>
                <span className="ad-sub">{service.sub}</span>
                <p className="ad-desc">{service.description}</p>
                <div className="ad-foot">
                  <i />
                  Vaani 360 Media Ads
                </div>
              </article>
            );
          })}
        </div>

        {/* TRUST / PERFORMANCE STRIP */}
        <div className="ad-stats ad-glass">
          {stats.map((s) => (
            <div key={s.big} className="ad-stat">
              <b>{s.big}</b>
              <span>{s.small}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}