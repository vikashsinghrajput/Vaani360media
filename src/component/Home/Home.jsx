import { useState, useEffect } from "react";
import CarStudio from "./GraphicDesignSection";
import WhiteServicesUI from "../About/About";
import ProductVideoCarousel from "./Productvideocarousel";
import CaseStudySection from "./SocialMedia";
import HowWeWork from "./HowWeWork";
import PartnershipsSection from "./Partnershipssection";
import SpiritualHero from "./Benner";
import FAQSection from "../Pricing/FAQSection";
import SpiritualProjectsSection from "../Pricing/ProjectsSection";
import WhatElevionMedia from "./WhatElevionMedia";
import ClientsSection from "./ClientsSection_LogoMarquee";
import GoogleReviews from "./GoogleReviews";
import Babaimage from "../../assets/Baba_Home.png";

/* ───────── Brand colors (from logo) ───────── */
const C = {
  orange: "#FF6A00",
  orangeDeep: "#E05A00",
  orangeLight: "#FFB26B",
  orangePale: "#FFF1E6",
  charcoal: "#2E2E2E",
  charcoalSoft: "#4A4A4A",
  grey: "#777777",
  ivory: "#FFFAF5",
  line: "#F0E2D4",
}

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.+I%E2%80%99d+like+to+know+more+about+your+services+and+growth+solutions.&type=phone_number&app_absent=0";

const SEO_KEYWORDS = [
  "Elevion Media",
  "spiritual digital marketing agency",
  "digital marketing for temples",
  "temple website development",
  "trust website development",
  "devotional social media management",
  "spiritual social media management",
  "devotional video editing",
  "spiritual video editing",
  "Baba Ji video editing",
  "devotional reels editing",
  "Bhakti video editing",
  "spiritual graphic design",
  "religious content creation",
  "Sanatan social media management",
  "guru social media management",
];

const services = {
  "Web Development": {
    icon: "🌐",
    short: "Temple & trust websites",
    tagline: "Ek aisi website jo aapki sanstha ka naam badhaye.",
    description:
      "Temples, trusts aur spiritual leaders ke liye fast, mobile-friendly aur sundar websites — jahan se bhakt donation kar sakein, events dekh sakein aur aapse jud sakein.",
    features: [
      "Temple, Trust & Ashram Websites",
      "Online Donation & Seva Booking",
      "Events, Aarti Timings & Live Darshan Pages",
      "Fast, Mobile-First Design",
      "SEO-Ready Structure for Google Ranking",
      "Easy Content Updates, No Coding Needed",
    ],
  },
  "Video Editing": {
    icon: "🎬",
    short: "Pravachan, reels & shorts",
    tagline: "Pravachan se reels tak — har video asardaar.",
    description:
      "Baba Ji ke pravachan, bhajan aur katha ko professional editing se aise banate hain ki YouTube aur Instagram par zyada log dekhein aur share karein.",
    features: [
      "Pravachan, Katha & Satsang Editing",
      "Instagram Reels & YouTube Shorts",
      "Long-form YouTube Video Editing",
      "Subtitles in Hindi & English",
      "Thumbnails, Intro & Outro Design",
      "Fast Turnaround, Consistent Quality",
    ],
  },
  "Graphic Design": {
    icon: "🎨",
    short: "Posters & thumbnails",
    tagline: "Har poster mein shraddha aur shaili dono.",
    description:
      "Festival posters, event banners, thumbnails aur social media creatives jo aapki spiritual identity ko saaf aur sundar tareeke se dikhate hain.",
    features: [
      "Festival & Event Posters",
      "YouTube Thumbnails & Social Media Posts",
      "Logo & Brand Identity for Trusts",
      "Banners, Flex & Print Designs",
      "Donation Campaign Creatives",
      "Source Files Included",
    ],
  },
  "Social Media Mgmt": {
    icon: "📱",
    short: "Content & community growth",
    tagline: "Ek sacchi bhakt community banayein.",
    description:
      "Content calendar, creative posts aur regular engagement se hum aapke temple, trust ya guru ko social media par ek mazboot pehchaan dete hain.",
    features: [
      "Content Calendar & Creative Design",
      "Instagram, Facebook & YouTube Management",
      "Reels & Short-form Video Strategy",
      "Community Engagement & Growth",
      "Festival & Event Campaign Planning",
      "Monthly Performance & Growth Reports",
    ],
  },
}

const marqueeItems = [
  "Web Development", "Video Editing", "Graphic Design", "Social Media",
  "Temples", "Trusts", "Spiritual Leaders",
];

/* ───────── Styles ───────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.dm-root { font-family: 'Plus Jakarta Sans', sans-serif; background: ${C.ivory}; position: relative; overflow: hidden; color: ${C.charcoal}; }
.dm-root *, .dm-root *::before, .dm-root *::after { box-sizing: border-box; }
.dm-root button { font-family: inherit; }
.dm-root :focus-visible { outline: 3px solid ${C.orange}; outline-offset: 3px; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes spinRev { to { transform: rotate(-360deg); } }
@keyframes sunPulse { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.08); } }
@keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes ping { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.6); opacity: 0; } }
@keyframes scrollMarquee { to { transform: translateX(-50%); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popIn { from { opacity: 0; transform: translateY(24px) scale(.96); } to { opacity: 1; transform: none; } }

/* decorative background */
.dm-dots { position: absolute; inset: 0; pointer-events: none; opacity: .5;
  background-image: radial-gradient(circle, ${C.orangeLight} 1.4px, transparent 1.4px); background-size: 34px 34px; }
.dm-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.dm-mandala { position: absolute; pointer-events: none; }

/* layout: visual LEFT, content RIGHT */
.dm-hero { position: relative; z-index: 10; max-width: 1240px; margin: 0 auto; padding: 56px 40px 80px;
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }

/* ── Visual (Baba Ji on the RIGHT, free-standing, no frame) ── */
.dm-hero-text { order: 1; }
.dm-visual { order: 2; position: relative; display: flex; justify-content: center; align-items: center; min-height: 580px; }
.dm-sun { position: absolute; top: 46%; left: 50%; width: 640px; height: 640px; transform: translate(-50%, -50%); pointer-events: none; z-index: 0; }
.dm-rays { position: absolute; inset: 0; border-radius: 50%;
  background: repeating-conic-gradient(from 0deg, rgba(255,106,0,.30) 0deg 5deg, transparent 5deg 15deg);
  -webkit-mask-image: radial-gradient(circle, #000 0%, #000 26%, transparent 68%);
  mask-image: radial-gradient(circle, #000 0%, #000 26%, transparent 68%);
  animation: spin 50s linear infinite; }
.dm-rays2 { position: absolute; inset: 12%; border-radius: 50%;
  background: repeating-conic-gradient(from 7deg, rgba(46,46,46,.14) 0deg 3deg, transparent 3deg 22.5deg);
  -webkit-mask-image: radial-gradient(circle, #000 0%, #000 28%, transparent 68%);
  mask-image: radial-gradient(circle, #000 0%, #000 28%, transparent 68%);
  animation: spinRev 80s linear infinite; }
.dm-disc { position: absolute; top: 50%; left: 50%; width: 360px; height: 360px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,106,0,.55) 0%, rgba(255,178,107,.42) 40%, rgba(255,178,107,0) 72%);
  animation: sunPulse 6s ease-in-out infinite; }
.dm-photo { position: relative; z-index: 2; width: 480px; max-width: 100%; height: 560px; flex-shrink: 0; }
.dm-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block;
  filter: sepia(6%) brightness(1.02) contrast(1.01);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 16%, #000 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 84%, transparent 100%);
  -webkit-mask-composite: destination-in;
  mask-image: linear-gradient(to right, transparent 0%, #000 16%, #000 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 84%, transparent 100%);
  mask-composite: intersect; }

.dm-card { position: absolute; z-index: 5; display: flex; align-items: center; gap: 10px; padding: 12px 18px; border-radius: 22px;
  background: linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.36));
  border: 1px solid rgba(255,255,255,.85);
  -webkit-backdrop-filter: blur(18px) saturate(180%); backdrop-filter: blur(18px) saturate(180%);
  box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), inset 0 -1px 3px rgba(255,106,0,.08), 0 14px 34px rgba(46,46,46,.18); }
.dm-card .ic { width: 38px; height: 38px; border-radius: 10px; background: ${C.orangePale}; display: grid; place-items: center; font-size: 18px; flex-shrink: 0; }
.dm-card b { display: block; font-size: 16px; font-weight: 800; line-height: 1.1; }
.dm-card small { font-size: 11px; color: ${C.grey}; }
.dm-card.a { top: 10%; left: -26px; animation: floaty 4s ease-in-out infinite; }
.dm-card.b { bottom: 20%; left: -34px; }
.dm-card.c { top: 22%; right: -26px; }
.dm-card.d { bottom: 9%; right: -22px; animation: floaty 4s ease-in-out 1.2s infinite; }
.dm-bar { height: 4px; width: 90px; border-radius: 2px; background: ${C.line}; margin-top: 7px; overflow: hidden; }
.dm-bar i { display: block; height: 100%; background: ${C.orange}; border-radius: 2px; }

/* ── Content ── */
.dm-badge { display: inline-flex; align-items: center; gap: 8px; background: ${C.orangePale}; border: 1px solid ${C.orangeLight};
  border-radius: 999px; padding: 5px 16px 5px 6px; font-size: 13px; font-weight: 700; color: ${C.orangeDeep}; margin-bottom: 22px; }
.dm-badge span { width: 22px; height: 22px; border-radius: 50%; background: ${C.orange}; color: #fff; display: grid; place-items: center; font-size: 11px; }
.dm-h1 { font-size: clamp(34px, 4.4vw, 58px); font-weight: 800; line-height: 1.1; letter-spacing: -1px; margin: 0 0 18px; color: ${C.charcoal}; }
.dm-h1 em { font-style: normal; color: ${C.orange}; }
.dm-lead { font-size: 17px; line-height: 1.75; color: ${C.charcoalSoft}; max-width: 520px; margin: 0 0 20px; }
.dm-audience { display: inline-flex; align-items: center; gap: 10px; color: #fff; border-radius: 999px; padding: 11px 24px;
  font-size: 14px; font-weight: 600; margin-bottom: 24px; border: 1px solid rgba(255,255,255,.18);
  background: linear-gradient(180deg, rgba(78,78,78,.88), rgba(46,46,46,.92));
  -webkit-backdrop-filter: blur(18px) saturate(180%); backdrop-filter: blur(18px) saturate(180%);
  box-shadow: inset 0 1.5px 1px rgba(255,255,255,.35), inset 0 -2px 4px rgba(0,0,0,.3), 0 12px 26px rgba(46,46,46,.28); }
.dm-audience i { width: 8px; height: 8px; background: ${C.orange}; transform: rotate(45deg); border-radius: 2px; }

/* services 2x2 */
.dm-services { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 26px; max-width: 560px; }
.dm-svc { position: relative; overflow: hidden; isolation: isolate; text-align: left; display: flex; gap: 12px; align-items: center; cursor: pointer;
  background: linear-gradient(135deg, rgba(255,255,255,.78), rgba(255,255,255,.34));
  border: 1px solid rgba(255,255,255,.85); border-radius: 22px; padding: 13px 18px;
  -webkit-backdrop-filter: blur(18px) saturate(180%); backdrop-filter: blur(18px) saturate(180%);
  box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), inset 0 -2px 4px rgba(255,106,0,.07), 0 0 0 1px rgba(46,46,46,.06), 0 10px 26px rgba(46,46,46,.09);
  transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, background .25s ease; }
.dm-svc::before { content: ""; position: absolute; z-index: -1; left: 8%; right: 8%; top: 2px; height: 42%; border-radius: 999px;
  background: linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,0)); pointer-events: none; }
.dm-svc:hover, .dm-svc[aria-pressed="true"] { transform: translateY(-3px) scale(1.02);
  background: linear-gradient(135deg, rgba(255,241,230,.92), rgba(255,178,107,.38));
  box-shadow: inset 0 1.5px 1px rgba(255,255,255,1), inset 0 -2px 6px rgba(255,106,0,.18), 0 0 0 1px rgba(255,106,0,.35), 0 16px 34px rgba(255,106,0,.22); }
.dm-svc:active { transform: scale(.97); }
.dm-svc .ic { width: 42px; height: 42px; border-radius: 12px; background: ${C.orangePale}; display: grid; place-items: center; font-size: 20px; flex-shrink: 0; }
.dm-svc b { display: block; font-size: 15px; font-weight: 800; color: ${C.charcoal}; }
.dm-svc small { font-size: 12px; color: ${C.grey}; }

/* CTA */
.dm-cta { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 28px; }
.dm-btn { position: relative; overflow: hidden; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  border: 1px solid rgba(255,255,255,.55); border-radius: 999px; padding: 16px 36px; font-size: 15px; font-weight: 700; letter-spacing: .1px;
  color: #fff; cursor: pointer; text-shadow: 0 1px 2px rgba(120,40,0,.35);
  background: linear-gradient(180deg, rgba(255,146,60,.92) 0%, rgba(255,106,0,.80) 100%);
  -webkit-backdrop-filter: blur(18px) saturate(180%); backdrop-filter: blur(18px) saturate(180%);
  box-shadow: inset 0 1.5px 1px rgba(255,255,255,.75), inset 0 -3px 8px rgba(170,60,0,.35), inset 0 0 0 1px rgba(255,255,255,.12),
    0 12px 30px rgba(255,106,0,.40), 0 2px 6px rgba(46,46,46,.14);
  transition: transform .28s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, filter .25s ease; }
.dm-btn::before { content: ""; position: absolute; z-index: -1; left: 7%; right: 7%; top: 3px; height: 48%; border-radius: 999px;
  background: linear-gradient(180deg, rgba(255,255,255,.60), rgba(255,255,255,0)); pointer-events: none; }
.dm-btn::after { content: ""; position: absolute; z-index: -1; top: 0; bottom: 0; left: -60%; width: 40%;
  background: linear-gradient(110deg, transparent, rgba(255,255,255,.45), transparent); transform: skewX(-18deg);
  transition: left .6s ease; pointer-events: none; }
.dm-btn:hover { transform: translateY(-3px) scale(1.04); filter: brightness(1.06) saturate(1.1);
  box-shadow: inset 0 1.5px 1px rgba(255,255,255,.85), inset 0 -3px 8px rgba(170,60,0,.35), 0 18px 40px rgba(255,106,0,.46), 0 3px 8px rgba(46,46,46,.14); }
.dm-btn:hover::after { left: 120%; }
.dm-btn:active { transform: scale(.96); filter: brightness(.96); }
.dm-btn .ring { position: absolute; inset: 0; z-index: -1; border: 2px solid ${C.orange}; border-radius: 999px; animation: ping 1.8s ease-out infinite; pointer-events: none; }
.dm-loc { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: ${C.charcoalSoft}; }

/* stats */
.dm-stats { display: flex; flex-wrap: wrap; border-top: 1px solid ${C.line}; padding-top: 22px; }
.dm-stats > div { padding-right: 28px; margin-right: 28px; border-right: 1px solid ${C.line}; }
.dm-stats > div:last-child { border: 0; margin: 0; padding: 0; }
.dm-stats strong { display: block; font-size: 28px; font-weight: 800; letter-spacing: -.5px; }
.dm-stats span { font-size: 13px; color: ${C.grey}; }

/* marquee */
.dm-marquee { position: relative; z-index: 10; background: ${C.charcoal}; overflow: hidden; padding: 20px 0; }
.dm-track { display: flex; width: max-content; animation: scrollMarquee 30s linear infinite; }
.dm-track > div { display: flex; align-items: center; flex-shrink: 0; }
.dm-track .it { color: #fff; font-size: 28px; font-weight: 700; padding: 0 26px; white-space: nowrap; }
.dm-track .sep { width: 12px; height: 12px; background: ${C.orange}; border-radius: 3px; transform: rotate(45deg); flex-shrink: 0; }

/* popup */
.dm-overlay { position: fixed; inset: 0; z-index: 1000; padding: 20px; background: rgba(30,24,20,.6); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; animation: fadeIn .25s ease; }
.dm-modal { position: relative; width: 100%; max-width: 520px; max-height: 86vh; overflow-y: auto;
  background: linear-gradient(160deg, rgba(255,252,248,.90), rgba(255,244,232,.80));
  -webkit-backdrop-filter: blur(28px) saturate(180%); backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid rgba(255,255,255,.85); border-top: 8px solid ${C.orange}; border-radius: 28px; padding: 32px 32px 28px;
  box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), 0 30px 70px rgba(0,0,0,.35);
  animation: popIn .3s cubic-bezier(.34,1.56,.64,1); }
.dm-close { position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; border-radius: 50%; color: ${C.charcoal}; font-size: 14px; font-weight: 700; cursor: pointer;
  background: linear-gradient(135deg, rgba(255,255,255,.85), rgba(255,255,255,.45)); border: 1px solid rgba(255,255,255,.9);
  -webkit-backdrop-filter: blur(18px) saturate(180%); backdrop-filter: blur(18px) saturate(180%);
  box-shadow: inset 0 1px 1px rgba(255,255,255,1), 0 4px 12px rgba(46,46,46,.15); transition: transform .2s ease, background .2s ease, color .2s ease; }
.dm-close:hover { background: rgba(46,46,46,.92); color: #fff; transform: scale(1.1) rotate(90deg); }
.dm-modal .big { width: 56px; height: 56px; border-radius: 16px; background: ${C.orangePale}; border: 1px solid ${C.orangeLight};
  display: grid; place-items: center; font-size: 26px; margin-bottom: 14px; }
.dm-modal h2 { font-size: 26px; font-weight: 800; margin: 0 0 6px; }
.dm-modal .tag { color: ${C.orangeDeep}; font-weight: 700; font-size: 14px; margin: 0 0 14px; }
.dm-modal .desc { color: ${C.charcoalSoft}; line-height: 1.8; font-size: 15.5px; margin: 0 0 16px; padding-top: 16px; border-top: 1px solid ${C.line}; }
.dm-feat { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px; font-size: 14.5px; font-weight: 500; }
.dm-feat i { flex-shrink: 0; margin-top: 6px; width: 8px; height: 8px; background: ${C.orange}; border-radius: 2px; transform: rotate(45deg); }
.dm-modal .dm-btn { width: 100%; justify-content: center; margin-top: 14px; }

/* ── Tablet / mobile ── */
@media (max-width: 960px) {
  .dm-hero { grid-template-columns: 1fr; gap: 48px; padding: 32px 22px 56px; }
  .dm-hero-text { text-align: center; }
  .dm-lead { margin-left: auto; margin-right: auto; }
  .dm-services { margin-left: auto; margin-right: auto; }
  .dm-cta, .dm-stats { justify-content: center; }
  .dm-visual { min-height: 470px; }
  .dm-sun { width: 480px; height: 480px; }
  .dm-disc { width: 280px; height: 280px; }
  .dm-photo { width: 360px; height: 450px; }
  .dm-card.a, .dm-card.b { left: 0; } .dm-card.c, .dm-card.d { right: 0; }
}
@media (max-width: 560px) {
  .dm-h1 { letter-spacing: -.5px; }
  .dm-lead { font-size: 15px; }
  .dm-services { grid-template-columns: 1fr; }
  .dm-svc { text-align: left; }
  .dm-btn { width: 100%; justify-content: center; }
  .dm-stats > div { padding-right: 14px; margin-right: 14px; }
  .dm-stats strong { font-size: 21px; }
  .dm-stats span { font-size: 11px; }
  .dm-visual { min-height: 400px; }
  .dm-sun { width: 380px; height: 380px; }
  .dm-disc { width: 220px; height: 220px; }
  .dm-photo { width: 270px; height: 360px; }
  .dm-card { transform: scale(.68); padding: 10px 12px; }
  .dm-card.a { transform-origin: left center; left: -14px; }
  .dm-card.b { transform-origin: left center; left: -14px; }
  .dm-card.c { transform-origin: right center; right: -14px; }
  .dm-card.d { transform-origin: right center; right: -14px; }
  .dm-card.a, .dm-card.d { animation: none; }
  .dm-track .it { font-size: 20px; padding: 0 16px; }
  .dm-modal { padding: 28px 22px 22px; }
}
@media (prefers-reduced-motion: reduce) {
  .dm-rays, .dm-rays2, .dm-disc, .dm-card, .dm-btn .ring, .dm-btn, .dm-btn::after, .dm-svc, .dm-track, .dm-mandala svg { animation: none !important; }
}
`;

/* ───────── Component ───────── */
export default function DigitalMarketingHero() {
  const names = Object.keys(services);
  const [active, setActive] = useState(names[0]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    document.title =
      "Spiritual Digital Marketing Agency | Web Development, Video Editing, Graphic Design & Social Media";
    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    }
    setMeta(
      "description",
      "Spiritual digital marketing agency for temples, trusts and spiritual leaders. Web development, video editing, graphic design and social media management by Elevion Media."
    );
    setMeta("keywords", SEO_KEYWORDS.join(", "));
  }, []);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  // External link → window.open (navigate() is only for in-app routes)
  const openWhatsApp = () => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  const pick = (n) => { setActive(n); setModal(n); }
  const detail = modal ? services[modal] : null;

  return (
    <>
      <div className="dm-root">
        <style>{css}</style>

        {/* Background decoration */}
        <div className="dm-dots" />
        <div className="dm-orb" style={{ width: 420, height: 420, background: "#FFD9B8", opacity: .6, top: -80, left: "8%" }} />
        <div className="dm-orb" style={{ width: 300, height: 300, background: "#FFB26B", opacity: .3, bottom: 0, right: 0 }} />
        <div className="dm-mandala" style={{ top: -60, right: "8%", width: 340, height: 340, opacity: .08 }}>
          <svg viewBox="0 0 200 200" style={{ animation: "spin 60s linear infinite" }}>
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <ellipse cx="100" cy="45" rx="12" ry="28" fill={C.orange} />
                <ellipse cx="100" cy="155" rx="12" ry="28" fill={C.orange} />
                <ellipse cx="45" cy="100" rx="28" ry="12" fill={C.orange} />
                <ellipse cx="155" cy="100" rx="28" ry="12" fill={C.orange} />
              </g>
            ))}
            <circle cx="100" cy="100" r="22" fill="none" stroke={C.orange} strokeWidth="2" />
            <circle cx="100" cy="100" r="10" fill={C.orange} />
          </svg>
        </div>
        <div className="dm-mandala" style={{ bottom: -40, left: -40, width: 260, height: 260, opacity: .07 }}>
          <svg viewBox="0 0 200 200" style={{ animation: "spinRev 80s linear infinite" }}>
            {[0, 45, 90, 135].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <ellipse cx="100" cy="40" rx="10" ry="24" fill={C.charcoal} />
                <ellipse cx="100" cy="160" rx="10" ry="24" fill={C.charcoal} />
              </g>
            ))}
            <circle cx="100" cy="100" r="28" fill="none" stroke={C.charcoal} strokeWidth="1.5" />
          </svg>
        </div>

        {/* ───────── HERO ───────── */}
        <section className="dm-hero">

          {/* RIGHT — Baba Ji + rotating sunrise (placed right via CSS order) */}
          <div className="dm-visual">
            <div className="dm-sun" aria-hidden="true">
              <div className="dm-disc" />
              <div className="dm-rays" />
              <div className="dm-rays2" />
            </div>
            <div className="dm-photo">
              <img
                src={Babaimage}
                alt="Spiritual brand expert"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=90&auto=format&fit=crop&crop=faces";
                }}
              />
            </div>

            <div className="dm-card a">
              <div className="ic">🎨</div>
              <div>
                <b>Graphic Design</b>
                <small>Posters &amp; Thumbnails</small>
                <div className="dm-bar"><i style={{ width: "85%" }} /></div>
              </div>
            </div>
            <div className="dm-card b">
              <div className="ic">🙏</div>
              <div>
                <b>2.4K+</b>
                <small>Happy Clients</small>
              </div>
            </div>
            <div className="dm-card c">
              <div className="ic">📱</div>
              <div>
                <b>Social Media</b>
                <small>Content &amp; Growth</small>
              </div>
            </div>
            <div className="dm-card d">
              <div className="ic">🎬</div>
              <div>
                <b>98.2%</b>
                <small>Campaign Success</small>
                <div className="dm-bar"><i style={{ width: "98%" }} /></div>
              </div>
            </div>
          </div>

          {/* LEFT — content */}
          <div className="dm-hero-text">
            <div className="dm-badge">
              <span>ॐ</span>
              #1 Spiritual Digital Marketing Agency
            </div>

            <h1 className="dm-h1">
              We Grow Your <em>Spiritual Brand</em> Online
            </h1>

            <p className="dm-lead">
              Web development, video editing, graphic design and social media
              management — everything your spiritual presence needs to reach more
              devotees online.
            </p>

            <div className="dm-audience">
              <i />
              For Temples, Trusts &amp; Spiritual Leaders
            </div>

            <div className="dm-services" role="group" aria-label="Our services">
              {names.map((n) => (
                <button
                  key={n}
                  className="dm-svc"
                  aria-pressed={active === n}
                  onClick={() => pick(n)}
                >
                  <span className="ic" aria-hidden="true">{services[n].icon}</span>
                  <span>
                    <b>{n}</b>
                    <small>{services[n].short}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="dm-cta">
              <button className="dm-btn" onClick={openWhatsApp}>
                <span className="ring" />
                Get Started
              </button>
              <div className="dm-loc">
                <span style={{ fontSize: 18 }}>🪔</span>
                Ghaziabad, India
              </div>
            </div>

            <div className="dm-stats">
              <div>
                <strong>2,400+</strong>
                <span>Clients all over India</span>
              </div>
              <div>
                <strong>4.9 ★</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>10x</strong>
                <span>ROAS goal</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── MARQUEE ───────── */}
        <div className="dm-marquee" aria-hidden="true">
          <div className="dm-track">
            {[0, 1].map((g) => (
              <div key={g}>
                {marqueeItems.map((item) => (
                  <span key={item} style={{ display: "flex", alignItems: "center" }}>
                    <span className="it">{item}</span>
                    <span className="sep" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ───────── POPUP ───────── */}
        {detail && (
          <div className="dm-overlay" onClick={() => setModal(null)}>
            <div
              className="dm-modal"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="dm-close" aria-label="Close" onClick={() => setModal(null)}>✕</button>
              <div className="big">{detail.icon}</div>
              <h2>{modal}</h2>
              <p className="tag">{detail.tagline}</p>
              <p className="desc">{detail.description}</p>
              {detail.features.map((f) => (
                <div className="dm-feat" key={f}>
                  <i />
                  <span>{f}</span>
                </div>
              ))}
              <button className="dm-btn" onClick={openWhatsApp}>Got it, Let's Talk</button>
            </div>
          </div>
        )}
      </div>

      
      <SpiritualProjectsSection />
      <ProductVideoCarousel />
      <CarStudio />
      <ClientsSection />
      <WhatElevionMedia />
      <CaseStudySection />
      <HowWeWork />
      <PartnershipsSection />
      <SpiritualHero />
      <GoogleReviews />
      <FAQSection />
    </>
  );
}