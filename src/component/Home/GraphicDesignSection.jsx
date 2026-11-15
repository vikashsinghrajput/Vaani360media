import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Image,
  Clapperboard,
  Youtube,
  HeartHandshake,
  Badge,
  LayoutTemplate,
  Quote,
} from "lucide-react";

/* =========================================================
   ELEVION MEDIA — GRAPHIC DESIGN · LIQUID GLASS
   (image paths: apne project ke hisaab se adjust karna)
   ========================================================= */

import ramKatha from "../../assets/creative/Ram Katha.jpg";
import jagannathratyatra from "../../assets/creative/jagannath rath yatra.jpg";
import divyadarbar1 from "../../assets/creative/divyadarbar1.png";
import divyadarbar2 from "../../assets/creative/Divya Darbar1.jpg";
import DayLeft1 from "../../assets/creative/DayLeft-1.jpg";
import Ekadashi1 from "../../assets/creative/ekadashi-1.jpg";
import Ekadashi2 from "../../assets/creative/Ekdasssi-2.jpg";
import Ekadashi3 from "../../assets/creative/Ekdasssi-3.jpg";
import SreeMadhBhagavadGita1 from "../../assets/creative/sree madh bhagavad gita-1.jpg";
import SreeMadhBhagavadGita2 from "../../assets/creative/sree madh bhagavad gita-2.jpg";

import DailyClipThumbnail1 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 1.jpeg";
import DailyClipThumbnail2 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 2.jpeg";
import DailyClipThumbnail3 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 3.jpeg";
import DailyClipThumbnail4 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 4.jpeg";
import DailyClipThumbnail5 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 5.jpeg";
import DailyClipThumbnail6 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 6.jpg";
import DailyClipThumbnail7 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 7.jpg";
import DailyClipThumbnail8 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 8.jpg";
import DailyClipThumbnail9 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 9.jpg";
import DailyClipThumbnail10 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 10.jpg";
import DailyClipThumbnail11 from "../../assets/Daily Clip Thumbnail/daily clip thumbnail 11.jpg";

import LivekathaThumbnail from "../../assets/Live_katha_Thumbnail/live katha 1.jpg";

import LivekathaPatii1 from "../../assets/Live_katha_Patti/Livepatti-1.png";
import LivekathaPatii2 from "../../assets/Live_katha_Patti/Livepatti-2.png";

import DailyVichar1 from "../../assets/Daily_Vichar/VICHAR 1.jpg";
import DailyVichar2 from "../../assets/Daily_Vichar/VICHAR 2.jpg";
import DailyVichar3 from "../../assets/Daily_Vichar/VICHAR 3.jpg";
import DailyVichar4 from "../../assets/Daily_Vichar/VICHAR 4.jpg";
import DailyVichar5 from "../../assets/Daily_Vichar/VICHAR 5.jpg";
import DailyVichar6 from "../../assets/Daily_Vichar/VICHAR 6.jpg";
import DailyVichar7 from "../../assets/Daily_Vichar/VICHAR 7.jpg";
import DailyVichar8 from "../../assets/Daily_Vichar/VICHAR 8.jpg";
import DailyVichar9 from "../../assets/Daily_Vichar/VICHAR 9.jpg";
import DailyVichar10 from "../../assets/Daily_Vichar/VICHAR 10.jpg";
import DailyVichar11 from "../../assets/Daily_Vichar/VICHAR 11.jpg";
import DailyVichar12 from "../../assets/Daily_Vichar/VICHAR 12.jpg";
import DailyVichar13 from "../../assets/Daily_Vichar/VICHAR 13.jpg";
import DailyVichar14 from "../../assets/Daily_Vichar/VICHAR 14.jpg";
import DailyVichar15 from "../../assets/Daily_Vichar/VICHAR 15.jpeg";

import DonationPoster1 from "../../assets/Donation Poster/DONATION 1.jpg";
import DonationPoster2 from "../../assets/Donation Poster/DONATION 2.jpg";
import DonationPoster3 from "../../assets/Donation Poster/DONATION 3.jpg";
import DonationPoster4 from "../../assets/Donation Poster/DONATION 4.jpg";
import DonationPoster5 from "../../assets/Donation Poster/DONATION 5.jpg";
import DonationPoster6 from "../../assets/Donation Poster/DONATION 6.jpg";
import DonationPoster7 from "../../assets/Donation Poster/DONATION 7.jpg";
import DonationPoster8 from "../../assets/Donation Poster/DONATION 8.jpg";
import DonationPoster9 from "../../assets/Donation Poster/DONATION 9.jpg";
import DonationPoster10 from "../../assets/Donation Poster/DONATION 10.jpg";

import Lband1 from "../../assets/L band/L band 1.png";
import Lband2 from "../../assets/L band/L band 2.png";
import Lband3 from "../../assets/L band/L band 3.png";
import Lband4 from "../../assets/L band/L band 4.png";
import Lband5 from "../../assets/L band/L band 5.png";

const SEO_KEYWORDS = [
  "Elevion Media",
  "graphic design agency",
  "devotional graphic design",
  "spiritual graphic design",
  "religious poster design",
  "devotional poster design",
  "Baba Ji poster design",
  "spiritual social media creatives",
  "Bhakti social media design",
  "Sanatan graphic design",
  "devotional thumbnail design",
  "YouTube thumbnail design",
  "Instagram post design",
  "spiritual branding",
  "religious event poster design",
  "darbar poster design",
  "spiritual content design",
  "devotional social media management",
];

/* =========================================================
   DATA — same categories, cleaner definitions
   ========================================================= */

// list of images that share one alt/title pattern
const set = (srcs, label, alt) =>
  srcs.map((src, i) => ({ src, title: `${label} ${i + 1}`, alt: `${alt} ${i + 1}` }));

const poster = (src, title, alt) => ({ src, title, alt });

const carData = {
  PosterDesign: [
    poster(ramKatha, "Ram Katha Poster", "Ram Katha event poster design - premium religious event poster"),
    poster(jagannathratyatra, "Jagannath Rath Yatra Poster", "Jagannath Rath Yatra festival poster design"),
    poster(Ekadashi1, "Ekadashi Poster", "Ekadashi devotional poster design"),
    poster(Ekadashi2, "Ekadashi Poster", "Ekadashi devotional poster design"),
    poster(Ekadashi3, "Ekadashi Poster", "Ekadashi devotional poster design"),
    poster(divyadarbar1, "Divya Darbar Poster", "Divya Darbar event poster design"),
    poster(divyadarbar2, "Divya Darbar Poster", "Divya Darbar event poster design"),
    poster(DayLeft1, "Days Left Poster", "Event countdown days left poster design"),
    poster(SreeMadhBhagavadGita1, "Shrimad Bhagavad Gita Poster", "Shrimad Bhagavad Gita katha poster design"),
    poster(SreeMadhBhagavadGita2, "Shrimad Bhagavad Gita Poster", "Shrimad Bhagavad Gita katha poster design"),
  ],
  Daily_Clip_Thumbnail: set(
    [
      DailyClipThumbnail1, DailyClipThumbnail2, DailyClipThumbnail3, DailyClipThumbnail4,
      DailyClipThumbnail5, DailyClipThumbnail6, DailyClipThumbnail7, DailyClipThumbnail8,
      DailyClipThumbnail9, DailyClipThumbnail10, DailyClipThumbnail11,
    ],
    "Daily Clip Thumbnail",
    "Devotional daily clip YouTube thumbnail design"
  ),
  Live_katha_Thumbnail: set([LivekathaThumbnail], "Live Katha Thumbnail", "Live katha YouTube thumbnail design"),
  Donation_Vichar: set(
    [
      DonationPoster1, DonationPoster2, DonationPoster3, DonationPoster4, DonationPoster5,
      DonationPoster6, DonationPoster7, DonationPoster8, DonationPoster9, DonationPoster10,
    ],
    "Donation Poster",
    "Donation appeal poster design"
  ),
  L_Band: set([Lband1, Lband2, Lband3, Lband4, Lband5], "L Band", "L band design for live patti"),
  Live_katha_Patii: set([LivekathaPatii1, LivekathaPatii2], "Live Katha Patti", "Live katha patti design"),
  Daily_Vichar: set(
    [
      DailyVichar1, DailyVichar2, DailyVichar3, DailyVichar4, DailyVichar5,
      DailyVichar6, DailyVichar7, DailyVichar8, DailyVichar9, DailyVichar10,
      DailyVichar11, DailyVichar12, DailyVichar13, DailyVichar14, DailyVichar15,
    ],
    "Daily Vichar",
    "Daily vichar spiritual quote design"
  ),
};

const categoryLabels = {
  PosterDesign: "Poster Design",
  Daily_Clip_Thumbnail: "Daily Clip Thumbnail",
  Live_katha_Thumbnail: "Live Katha Thumbnail",
  Donation_Vichar: "Donation Poster",
  L_Band: "L Band",
  Live_katha_Patii: "Live Katha Patti",
  Daily_Vichar: "Daily Vichar",
};

const categoryIcons = {
  PosterDesign: Image,
  Daily_Clip_Thumbnail: Clapperboard,
  Live_katha_Thumbnail: Youtube,
  Donation_Vichar: HeartHandshake,
  L_Band: Badge,
  Live_katha_Patii: LayoutTemplate,
  Daily_Vichar: Quote,
};

const categoryTiles = {
  PosterDesign: ["#F6B04A", "#C8860A"],
  Daily_Clip_Thumbnail: ["#F77B7B", "#DC2626"],
  Live_katha_Thumbnail: ["#FF7A6E", "#E31C14"],
  Donation_Vichar: ["#F79A55", "#EA580C"],
  L_Band: ["#E8C24F", "#B8860B"],
  Live_katha_Patii: ["#E9A04E", "#C8780A"],
  Daily_Vichar: ["#E5BE45", "#CA8A04"],
};

/* =========================================================
   STYLES
   ========================================================= */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');

.gd-root {
  --ink: #1D1710; --ink-2: #5E5143; --ink-3: #8F8070;
  --saffron: #F28C28; --saffron-deep: #D96F0B;
  --glass: rgba(255,255,255,.42); --glass-strong: rgba(255,255,255,.64); --edge: rgba(255,255,255,.78);
  --shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 -1px 0 rgba(255,255,255,.25) inset, 0 10px 40px rgba(120,70,20,.12);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', 'Segoe UI', sans-serif;
  color: var(--ink); position: relative; overflow: hidden; overflow: clip; isolation: isolate;
  width: 100%; max-width: 100%; min-width: 0; flex: 1 1 100%; align-self: stretch; margin-inline: auto; -webkit-font-smoothing: antialiased;
  padding: clamp(44px, 7vw, 84px) clamp(14px, 3vw, 32px) clamp(48px, 6vw, 80px);
  background:
    radial-gradient(1100px 650px at 8% -8%, #FFE2B8 0%, transparent 60%),
    radial-gradient(900px 600px at 100% 12%, #FFD1C2 0%, transparent 55%),
    radial-gradient(900px 700px at 60% 112%, #FBE7A6 0%, transparent 55%),
    linear-gradient(180deg, #FBF6EF, #F4EBDD);
}
.gd-root *, .gd-root *::before, .gd-root *::after { box-sizing: border-box; }
.gd-root button { font-family: inherit; }

.gd-blob { position: absolute; border-radius: 50%; filter: blur(70px); z-index: -1; pointer-events: none; }
.gd-blob.a { width: 360px; height: 360px; background: #F6A94A; opacity: .36; top: 10%; left: -90px; animation: gdDrift 24s ease-in-out infinite alternate; }
.gd-blob.b { width: 340px; height: 340px; background: #F2B8A0; opacity: .38; top: 46%; right: -80px; animation: gdDrift 28s ease-in-out infinite alternate-reverse; }
.gd-blob.c { width: 300px; height: 300px; background: #E7C968; opacity: .34; bottom: -70px; left: 34%; animation: gdDrift 32s ease-in-out infinite alternate; }
@keyframes gdDrift { to { transform: translate3d(60px,-40px,0) scale(1.12); } }

.gd-glass {
  position: relative;
  background: linear-gradient(135deg, var(--glass-strong), var(--glass));
  -webkit-backdrop-filter: blur(28px) saturate(185%); backdrop-filter: blur(28px) saturate(185%);
  border: 1px solid var(--edge); box-shadow: var(--shadow);
}
.gd-glass::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 42%); mix-blend-mode: soft-light;
}

/* heading */
.gd-head { text-align: center; margin: 0 auto clamp(30px, 5vw, 52px); max-width: 720px; }
.gd-chip { display: inline-block; padding: 7px 16px; border-radius: 999px; margin-bottom: 18px; font-size: 11.5px; font-weight: 700; letter-spacing: .14em; color: var(--saffron-deep); }
.gd-head h2 {
  margin: 0; font-weight: 800; letter-spacing: -.035em; line-height: 1.06; font-size: clamp(32px, 5.4vw, 60px);
  background: linear-gradient(180deg, #2A1F14 30%, #7A5226 100%); -webkit-background-clip: text; background-clip: text; color: transparent;
}
.gd-head p { margin: 16px auto 0; max-width: 520px; color: var(--ink-2); font-size: clamp(14px, 1.5vw, 17px); line-height: 1.55; }

/* layout */
.gd-layout { width: 100%; max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: 290px minmax(0, 1fr); gap: 22px; align-items: start; }

/* sidebar */
.gd-side { border-radius: 30px; padding: 18px 12px 12px; position: sticky; top: 20px; }
.gd-side h3 { margin: 0 8px 12px; font-size: 15px; font-weight: 700; letter-spacing: -.01em; }
.gd-cats { display: flex; flex-direction: column; gap: 4px; }
.gd-cat {
  display: flex; align-items: center; gap: 12px; width: 100%; padding: 9px 10px; border-radius: 20px; border: 1px solid transparent;
  background: transparent; cursor: pointer; text-align: left; color: var(--ink); transition: background .25s, border-color .25s, box-shadow .25s, transform .2s;
}
.gd-cat:hover { background: rgba(255,255,255,.45); }
.gd-cat:active { transform: scale(.98); }
.gd-cat.on { background: rgba(255,255,255,.78); border-color: rgba(255,255,255,.95); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 8px 24px rgba(120,70,20,.14); }
.gd-tile { width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; color: #fff; flex: none; box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 4px 12px rgba(0,0,0,.14); }
.gd-cat .nm { font-size: 13.5px; font-weight: 600; letter-spacing: -.01em; flex: 1; min-width: 0; }
.gd-cat .ct { font-size: 12px; font-weight: 600; color: var(--ink-3); font-variant-numeric: tabular-nums; }
.gd-cat.on .ct { color: var(--saffron-deep); }

/* stage */
.gd-stage { border-radius: 34px; padding: 10px; min-width: 0; }
.gd-view {
  position: relative; border-radius: 26px; overflow: hidden; height: 260px;
  background: #F3E9DA; cursor: zoom-in;
}
.gd-ambient { position: absolute; z-index: 0; inset: -40px; width: calc(100% + 80px); height: calc(100% + 80px); object-fit: cover; filter: blur(46px) saturate(150%); opacity: .55; transform: scale(1.1); pointer-events: none; }
@media (min-width: 768px) { .gd-view { height: 420px; } }
.gd-main { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; max-width: none; object-fit: contain; animation: gdIn .45s cubic-bezier(.2,.8,.2,1); -webkit-user-drag: none; user-select: none; }
@keyframes gdIn { from { opacity: 0; transform: scale(.975); } }

.gd-btn {
  position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); z-index: 3; display: inline-flex; align-items: center; gap: 8px;
  padding: 11px 20px; border-radius: 999px; border: 1px solid rgba(255,255,255,.7); cursor: pointer; font-size: 13px; font-weight: 600; color: var(--ink);
  background: rgba(255,255,255,.55); -webkit-backdrop-filter: blur(22px) saturate(180%); backdrop-filter: blur(22px) saturate(180%);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 8px 26px rgba(90,55,15,.2); transition: background .2s, color .2s, transform .2s;
}
.gd-btn:hover { background: linear-gradient(180deg, #F89A3E, var(--saffron-deep)); color: #fff; transform: translateX(-50%) scale(1.03); }
.gd-btn:active { transform: translateX(-50%) scale(.97); }

.gd-icon {
  width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--edge); cursor: pointer; display: grid; place-items: center; color: var(--ink); padding: 0;
  background: rgba(255,255,255,.58); -webkit-backdrop-filter: blur(20px) saturate(180%); backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 6px 20px rgba(120,70,20,.16); transition: transform .2s, background .2s;
}
.gd-icon:hover { transform: scale(1.07); background: rgba(255,255,255,.88); }
.gd-icon:active { transform: scale(.94); }
.gd-nav { position: absolute; top: 50%; margin-top: -22px; z-index: 3; }
.gd-nav.l { left: 14px; } .gd-nav.r { right: 14px; }
.gd-full-ico { position: absolute; top: 14px; right: 14px; z-index: 3; width: 40px; height: 40px; }
.gd-count {
  position: absolute; top: 14px; left: 14px; z-index: 3; padding: 7px 13px; border-radius: 999px; font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums; color: var(--ink-2);
  background: rgba(255,255,255,.55); -webkit-backdrop-filter: blur(20px) saturate(180%); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255,255,255,.75);
}

.gd-cap { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 14px 6px; }
.gd-cap b { font-size: 15px; font-weight: 700; letter-spacing: -.015em; }
.gd-cap span { font-size: 12.5px; color: var(--ink-3); white-space: nowrap; }

/* thumbs */
.gd-thumbs { position: relative; display: flex; gap: 10px; overflow-x: auto; padding: 8px 10px 12px; scrollbar-width: none; scroll-snap-type: x proximity; }
.gd-thumbs::-webkit-scrollbar { display: none; }
.gd-th {
  flex: none; width: 74px; height: 74px; border-radius: 20px; overflow: hidden; padding: 0; cursor: pointer; scroll-snap-align: center;
  border: 1px solid rgba(255,255,255,.85); background: #fff; opacity: .72; transform: scale(.94);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 4px 14px rgba(120,70,20,.12); transition: transform .3s cubic-bezier(.2,.8,.2,1), opacity .3s, box-shadow .3s;
}
.gd-th img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gd-th:hover { opacity: 1; }
.gd-th.on { opacity: 1; transform: scale(1); box-shadow: 0 0 0 2.5px #fff, 0 0 0 4.5px var(--saffron), 0 10px 26px rgba(217,111,11,.3); }

.gd-root button:focus-visible { outline: 2px solid var(--saffron-deep); outline-offset: 3px; }

/* lightbox */
.gd-lb { --ink: #1D1710; --edge: rgba(255,255,255,.78);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; }
.gd-lb, .gd-lb *, .gd-lb *::before, .gd-lb *::after { box-sizing: border-box; }
.gd-lb button { font-family: inherit; }
.gd-lb button:focus-visible { outline: 2px solid #D96F0B; outline-offset: 3px; }
.gd-lb {
  position: fixed; inset: 0; z-index: 2147483000; overscroll-behavior: contain; touch-action: none; display: grid; place-items: center; padding: 16px;
  background: rgba(30,18,6,.5); -webkit-backdrop-filter: blur(26px) saturate(150%); backdrop-filter: blur(26px) saturate(150%); animation: gdFade .25s ease;
}
.gd-lb img { max-width: 86vw; max-height: 88vh; object-fit: contain; border-radius: 12px; box-shadow: 0 40px 120px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.35); animation: gdPop .4s cubic-bezier(.2,.9,.25,1.05); -webkit-user-drag: none; }
.gd-lb .gd-icon { position: absolute; z-index: 2; }
.gd-lb .p { left: max(12px, 2vw); top: 50%; margin-top: -22px; }
.gd-lb .n { right: max(12px, 2vw); top: 50%; margin-top: -22px; }
.gd-lb .x { top: 16px; right: 16px; width: 40px; height: 40px; }
.gd-lb .info {
  position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); padding: 9px 18px; border-radius: 999px; font-size: 13px; font-weight: 600; color: var(--ink); white-space: nowrap;
  background: rgba(255,255,255,.62); -webkit-backdrop-filter: blur(22px) saturate(180%); backdrop-filter: blur(22px) saturate(180%); border: 1px solid rgba(255,255,255,.8);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 8px 26px rgba(0,0,0,.2); font-variant-numeric: tabular-nums;
}
@keyframes gdFade { from { opacity: 0; } }
@keyframes gdPop { from { opacity: 0; transform: scale(.96); } }

/* tablet / mobile: sidebar becomes a swipe row of glass pills */
@media (max-width: 980px) {
  .gd-layout { grid-template-columns: 1fr; gap: 16px; }
  .gd-side { position: static; padding: 8px; border-radius: 999px; }
  .gd-side h3 { display: none; }
  .gd-cats { flex-direction: row; overflow-x: auto; scrollbar-width: none; gap: 6px; }
  .gd-cats::-webkit-scrollbar { display: none; }
  .gd-cat { width: auto; flex: none; padding: 6px 14px 6px 6px; border-radius: 999px; }
  .gd-tile { width: 30px; height: 30px; border-radius: 50%; }
  .gd-cat .nm { white-space: nowrap; flex: none; }
  .gd-cat .ct { display: none; }
}
@media (max-width: 560px) {
  .gd-nav { display: none; }
  .gd-th { width: 62px; height: 62px; border-radius: 17px; }
  .gd-stage { border-radius: 28px; padding: 8px; }
  .gd-lb .p, .gd-lb .n { display: none; }
}
@media (prefers-reduced-motion: reduce) { .gd-root *, .gd-lb, .gd-lb img { animation: none !important; transition: none !important; } }
@media (prefers-reduced-transparency: reduce) {
  .gd-glass, .gd-icon, .gd-btn, .gd-count, .gd-lb .info { -webkit-backdrop-filter: none; backdrop-filter: none; background: rgba(255,255,255,.93); }
}
`;

/* =========================================================
   ICONS
   ========================================================= */

const Chev = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);
const Expand = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </svg>
);

/* =========================================================
   COMPONENT
   ========================================================= */

const CarStudio = () => {
  const [selectedCar, setSelectedCar] = useState("PosterDesign");
  const [activeImage, setActiveImage] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const list = carData[selectedCar];
  const total = list.length;
  const currentImage = list[activeImage];
  const label = categoryLabels[selectedCar];

  const touchX = useRef(null);
  const activeThumb = useRef(null);
  const thumbsRef = useRef(null);

  /* reserve the scrollbar space: layout never jumps when page height changes */
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollbarGutter;
    el.style.scrollbarGutter = "stable";
    return () => { el.style.scrollbarGutter = prev; };
  }, []);

  /* SEO */
  useEffect(() => {
    document.title = "Graphic Design for Spiritual Brands | Elevion Media";
    const setMeta = (name, content) => {
      let m = document.querySelector(`meta[name="${name}"]`);
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", name);
        document.head.appendChild(m);
      }
      m.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Elevion Media creates professional devotional and spiritual graphic designs, religious posters, social media creatives, YouTube thumbnails, branding and event designs for Baba Ji, gurus and spiritual brands."
    );
    setMeta("keywords", SEO_KEYWORDS.join(", "));
    setMeta("robots", "index, follow");
  }, []);

  const prev = () => setActiveImage((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setActiveImage((c) => (c === total - 1 ? 0 : c + 1));

  /* lightbox: keyboard + scroll lock (scrollbar stays, so nothing shifts) */
  useEffect(() => {
    if (!isImageOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsImageOpen(false);
      if (e.key === "ArrowLeft") setActiveImage((c) => (c === 0 ? total - 1 : c - 1));
      if (e.key === "ArrowRight") setActiveImage((c) => (c === total - 1 ? 0 : c + 1));
    };
    // Lock the page behind the viewer WITHOUT hiding the scrollbar
    // (body{overflow:hidden} removes the scrollbar and shifts the whole layout sideways).
    const stop = (e) => e.preventDefault();
    const stopKeys = (e) => {
      if ([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keydown", stopKeys);
    window.addEventListener("wheel", stop, { passive: false });
    window.addEventListener("touchmove", stop, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keydown", stopKeys);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
  }, [isImageOpen, total]);

  /* centre the active thumbnail inside its own strip only */
  useEffect(() => {
    const box = thumbsRef.current;
    const el = activeThumb.current;
    if (!box || !el) return;
    box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  }, [activeImage, selectedCar]);

  const swipe = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    dx < 0 ? next() : prev();
  };
  const swipeProps = {
    onTouchStart: (e) => (touchX.current = e.touches[0].clientX),
    onTouchEnd: swipe,
  };

  return (
    <>
      <style>{STYLES}</style>

      <section className="gd-root" aria-label="Brand creative design portfolio">
        <div className="gd-blob a" />
        <div className="gd-blob b" />
        <div className="gd-blob c" />

        {/* HEADING */}
        <div className="gd-head">
          <div className="gd-chip gd-glass">GRAPHIC DESIGN</div>
          <h2>We Design Your Visual Identity</h2>
          <p>Creative, premium and purposeful designs crafted to build a strong visual identity for spiritual brands.</p>
        </div>

        <div className="gd-layout">
          {/* CATEGORIES */}
          <aside className="gd-side gd-glass">
            <h3>Explore Graphic Design</h3>
            <div className="gd-cats">
              {Object.keys(carData).map((key) => {
                const Icon = categoryIcons[key] || Image;
                const [c1, c2] = categoryTiles[key] || ["#F6B04A", "#C8860A"];
                return (
                  <button
                    key={key}
                    className={`gd-cat ${selectedCar === key ? "on" : ""}`}
                    onClick={() => {
                      setSelectedCar(key);
                      setActiveImage(0);
                    }}
                    aria-pressed={selectedCar === key}
                    aria-label={`Show ${categoryLabels[key]} designs`}
                  >
                    <span className="gd-tile" style={{ background: `linear-gradient(145deg, ${c1}, ${c2})` }}>
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <span className="nm">{categoryLabels[key]}</span>
                    <span className="ct">{carData[key].length}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* STAGE */}
          <div className="gd-stage gd-glass">
            <div className="gd-view" onClick={() => setIsImageOpen(true)} {...swipeProps}>
              <img className="gd-ambient" src={currentImage.src} alt="" aria-hidden="true" />

              <div className="gd-count">{activeImage + 1} / {total}</div>

              <button
                className="gd-icon gd-full-ico"
                onClick={(e) => { e.stopPropagation(); setIsImageOpen(true); }}
                aria-label="Open full screen image preview"
              >
                <Expand />
              </button>

              {total > 1 && (
                <>
                  <button className="gd-icon gd-nav l" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image"><Chev dir="l" /></button>
                  <button className="gd-icon gd-nav r" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image"><Chev dir="r" /></button>
                </>
              )}

              <img
                key={currentImage.src}
                className="gd-main"
                src={currentImage.src}
                alt={`${currentImage.alt} | Elevion Media Graphic Design`}
                title={`${currentImage.title} | Click to enlarge`}
                draggable={false}
              />

              <button className="gd-btn" onClick={(e) => { e.stopPropagation(); setIsImageOpen(true); }}>
                <Expand s={15} /> Click to full view
              </button>
            </div>

            <div className="gd-cap">
              <b>{currentImage.title}</b>
              <span>{label}</span>
            </div>

            {total > 1 && (
              <div className="gd-thumbs" ref={thumbsRef}>
                {list.map((img, i) => (
                  <button
                    key={`${selectedCar}-${i}`}
                    ref={i === activeImage ? activeThumb : null}
                    className={`gd-th ${i === activeImage ? "on" : ""}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show ${img.title}`}
                    aria-current={i === activeImage}
                  >
                    <img src={img.src} alt={`${img.alt} | Elevion Media Graphic Design`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LIGHTBOX */}
        {isImageOpen && createPortal(
          <div
            className="gd-lb"
            onClick={() => setIsImageOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${currentImage.title} enlarged image`}
            {...swipeProps}
          >
            {total > 1 && (
              <button className="gd-icon p" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image"><Chev dir="l" /></button>
            )}

            <img
              key={currentImage.src}
              src={currentImage.src}
              alt={`${currentImage.alt} | Enlarged`}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {total > 1 && (
              <button className="gd-icon n" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image"><Chev dir="r" /></button>
            )}

            <button className="gd-icon x" onClick={() => setIsImageOpen(false)} aria-label="Close image preview">
              <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>

            <div className="info" onClick={(e) => e.stopPropagation()}>
              {activeImage + 1} / {total} · {currentImage.title}
            </div>
          </div>,
          document.body
        )}
      </section>
    </>
  );
};

export default CarStudio;