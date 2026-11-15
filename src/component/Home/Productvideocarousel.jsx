import { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo.png";
/* =========================================================
   360 — LIQUID GLASS SHOWCASE
   ========================================================= */

import पुत्रदाएकादशी from "../../assets/Short_Video_Thumbnail/पुत्रदा एकादशी- संतान सुख और श्रीहरि की कृपा.jpeg";
import नागपंचमीपरदिव्यसर्पयज्ञ from "../../assets/Short_Video_Thumbnail/नाग पंचमी पर दिव्य सर्प यज्ञ.jpeg";
import हरियालीतीज2026शिवपार्वतीकापावनप्रेम from "../../assets/Short_Video_Thumbnail/🌿 हरियाली तीज 2026 | शिव-पार्वती का पावन प्रेम 🔱🙏.jpeg";
import हरियालीअमावस्या from "../../assets/Short_Video_Thumbnail/हरियाली अमावस्या.jpeg";
import कांवड़यात्राकायेरहस्यजानकरचौंकजाएंगे from "../../assets/Short_Video_Thumbnail/कांवड़ यात्रा का ये रहस्यजानकर चौंक जाएंगे!.jpeg";
import भगवानविष्णु from "../../assets/Short_Video_Thumbnail/क्यों सो जाते हैं भगवान विष्णु.jpg";
import एकबाबाजीकसोशलमीडियाक्योंचाहिएु from "../../assets/Short_Video_Thumbnail/एक बाबा जी  को सोशल मीडिया क्यों चाहिए.jpg";

const SEO_KEYWORDS = [
  "360",
  "devotional video editing",
  "spiritual video editing",
  "Baba Ji video editing",
  "devotional social media management",
  "spiritual social media marketing",
  "religious content creation",
  "Bhakti video editing",
  "devotional reels editing",
  "spiritual reels",
  "YouTube devotional video editing",
  "Instagram devotional content",
  "Sanatan social media management",
];

const CAT = "धार्मिक / आध्यात्मिक";

const videos = [
  {
    id: 1,
    title: "पुत्रदा एकादशी: संतान सुख और श्रीहरि की कृपा",
    keywords: "पुत्रदा एकादशी, एकादशी व्रत, भगवान विष्णु, संतान सुख, संतान प्राप्ति, विष्णु भक्ति, सनातन धर्म, धार्मिक ज्ञान",
    category: CAT,
    description:
      "पुत्रदा एकादशी 🙏 संतान सुख और श्रीहरि की कृपा से जुड़ी इस पावन एकादशी का महत्व जानिए। भगवान विष्णु की भक्ति और व्रत से जुड़ी कथा व मान्यताओं को इस वीडियो में सरल रूप से समझें।",
    youtubeId: "G1K_NyC3W_w",
    thumb: पुत्रदाएकादशी,
  },
  {
    id: 2,
    title: "नाग पंचमी पर दिव्य सर्प यज्ञ 🐍🔱 | सनातन परंपरा और श्रद्धा का अद्भुत संगम 🙏",
    keywords: "नाग पंचमी, सर्प यज्ञ, नाग पूजा, नाग पंचमी पूजा, सनातन धर्म, भगवान शिव, धार्मिक ज्ञान, आध्यात्मिक वीडियो",
    category: CAT,
    description:
      "नाग पंचमी के पावन अवसर पर दिव्य सर्प यज्ञ 🐍🔱 और सनातन परंपरा से जुड़ी श्रद्धा व धार्मिक महत्व को जानिए। 🙏",
    youtubeId: "fiClcigjA_o",
    thumb: नागपंचमीपरदिव्यसर्पयज्ञ,
  },
  {
    id: 3,
    title: "🌿 हरियाली तीज 2026 | शिव-पार्वती का पावन प्रेम 🔱🙏",
    keywords: "हरियाली तीज 2026, हरियाली तीज, शिव पार्वती, तीज व्रत, सनातन धर्म, भगवान शिव, माता पार्वती, धार्मिक ज्ञान, आध्यात्मिक वीडियो",
    category: CAT,
    description:
      "हरियाली तीज 2026 🌿🔱 शिव-पार्वती के पावन प्रेम, व्रत और सनातन परंपरा से जुड़े इस पर्व का धार्मिक महत्व जानिए। 🙏",
    youtubeId: "ISAhAQZv0pU",
    thumb: हरियालीतीज2026शिवपार्वतीकापावनप्रेम,
  },
  {
    id: 4,
    title: "हरियाली अमावस्या 🌿🔱 | बाल शिव की अद्भुत भक्ति | हर हर महादेव",
    keywords: "Katha video editing, devotional storytelling, spiritual content editing",
    category: CAT,
    description:
      "हरियाली अमावस्या क्यों मनाई जाती है? 🌿🌙 जानिए इस पावन पर्व का धार्मिक महत्व और इससे जुड़ा अद्भुत रहस्य। 🙏🔱 हर हर महादेव! 🚩",
    youtubeId: "jrAK-Z01Vvc",
    thumb: हरियालीअमावस्या,
  },
  {
    id: 5,
    title: "कांवड़ यात्रा का ये रहस्य जानकर चौंक जाएंगे!",
    keywords:
      "कांवड़ यात्रा, कांवड़ यात्रा का रहस्य, कांवड़ यात्रा महत्व, कांवड़ यात्रा क्यों की जाती है, कांवड़ यात्रा इतिहास, भगवान शिव, महादेव, हर हर महादेव, शिव भक्ति, सावन, सावन का महीना, कांवड़िया, कांवड़ यात्रा 2026, शिव भक्त, सनातन धर्म, धार्मिक जानकारी, हिंदू धर्म, शिव पूजा, गंगाजल, कांवड़ यात्रा की कहानी",
    category: CAT,
    description:
      "कांवड़ यात्रा सिर्फ आस्था नहीं, बल्कि भगवान शिव से जुड़ी एक अद्भुत धार्मिक परंपरा है। 🔱🙏 जानिए इसके पीछे छिपा ऐसा रहस्य, जिसे जानकर आप भी चौंक जाएंगे!",
    youtubeId: "FbySpVRc11o",
    thumb: कांवड़यात्राकायेरहस्यजानकरचौंकजाएंगे,
  },
  {
    id: 6,
    title: "😱 क्यों सो जाते हैं भगवान विष्णु? जानिए देवशयनी एकादशी का रहस्य!",
    keywords: "spiritual stories, cinematic devotional editing, religious video editing",
    category: CAT,
    description:
      "देवशयनी एकादशी 🙏 भगवान विष्णु के योगनिद्रा में जाने और इस पावन एकादशी के धार्मिक महत्व व रहस्य को जानिए। 🔱🌿",
    youtubeId: "Wo5UjtQbyxI",
    thumb: भगवानविष्णु,
  },
  {
    id: 7,
    title: "एक बाबा जी को सोशल मीडिया क्यों चाहिए? 🤔 जानिए असली वजह!",
    keywords: "बाबा जी, सोशल मीडिया, संत, सनातन धर्म, आध्यात्मिक ज्ञान, धार्मिक वीडियो, संतों की बातें, भक्ति, सनातन संस्कृति, धर्म प्रचार",
    category: CAT,
    description:
      "एक बाबा जी को सोशल मीडिया की जरूरत क्यों पड़ती है? 🤔 इस वीडियो में जानिए सोशल मीडिया के माध्यम से आध्यात्मिक संदेश, सनातन विचार और सकारात्मक ज्ञान को अधिक से अधिक लोगों तक पहुँचाने की असली वजह। 🙏🚩",
    youtubeId: "36dUMqVPKhA",
    thumb: एकबाबाजीकसोशलमीडियाक्योंचाहिएु,
  },
];

/* =========================================================
   STYLES — liquid glass system
   ========================================================= */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');

.lg-root {
  --cw: clamp(228px, 72vw, 276px);
  --ink: #1D1710;
  --ink-2: #5E5143;
  --ink-3: #8F8070;
  --saffron: #F28C28;
  --saffron-deep: #D96F0B;
  --gold: #C9A227;
  --glass: rgba(255,255,255,.42);
  --glass-strong: rgba(255,255,255,.62);
  --glass-edge: rgba(255,255,255,.75);
  --shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 -1px 0 rgba(255,255,255,.25) inset, 0 10px 40px rgba(120,70,20,.12);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', 'Segoe UI', sans-serif;
  color: var(--ink);
  position: relative;
  overflow: hidden;
  isolation: isolate;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(1200px 700px at 12% -10%, #FFE2B8 0%, transparent 60%),
    radial-gradient(900px 600px at 100% 10%, #FFD1C2 0%, transparent 55%),
    radial-gradient(900px 700px at 70% 110%, #FBE7A6 0%, transparent 55%),
    linear-gradient(180deg, #FBF6EF, #F4EBDD);
  -webkit-font-smoothing: antialiased;
}
.lg-root *, .lg-root *::before, .lg-root *::after { box-sizing: border-box; }
.lg-root button { font-family: inherit; }

/* floating colour blobs — give the glass something to refract */
.lg-blob { position: absolute; border-radius: 50%; filter: blur(70px); z-index: -1; pointer-events: none; }
.lg-blob.a { width: 380px; height: 380px; background: #F6A94A; opacity: .38; top: 8%; left: -90px; animation: lgDrift 22s ease-in-out infinite alternate; }
.lg-blob.b { width: 340px; height: 340px; background: #F2B8A0; opacity: .40; top: 38%; right: -80px; animation: lgDrift 26s ease-in-out infinite alternate-reverse; }
.lg-blob.c { width: 300px; height: 300px; background: #E7C968; opacity: .35; bottom: -60px; left: 38%; animation: lgDrift 30s ease-in-out infinite alternate; }
@keyframes lgDrift { to { transform: translate3d(60px,-40px,0) scale(1.12); } }

/* the glass surface */
.lg-glass {
  position: relative;
  background: linear-gradient(135deg, var(--glass-strong), var(--glass));
  -webkit-backdrop-filter: blur(28px) saturate(185%);
  backdrop-filter: blur(28px) saturate(185%);
  border: 1px solid var(--glass-edge);
  box-shadow: var(--shadow);
}
.lg-glass::before {            /* specular highlight along the top edge */
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 42%);
  mix-blend-mode: soft-light;
}

.lg-btn {
  border: 0; cursor: pointer; border-radius: 999px; font-weight: 600; font-size: 13px;
  padding: 10px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  color: #fff; background: linear-gradient(180deg, #F89A3E, var(--saffron-deep));
  box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 8px 22px rgba(217,111,11,.32);
  transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s;
}
.lg-btn:hover { transform: translateY(-1px) scale(1.02); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 12px 28px rgba(217,111,11,.38); }
.lg-btn:active { transform: scale(.97); }
.lg-btn:focus-visible, .lg-icon:focus-visible, .lg-full:focus-visible, .lg-dot:focus-visible { outline: 2px solid var(--saffron-deep); outline-offset: 3px; }

.lg-icon {
  width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--glass-edge); cursor: pointer;
  display: grid; place-items: center; color: var(--ink);
  background: var(--glass-strong); -webkit-backdrop-filter: blur(20px) saturate(180%); backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 6px 20px rgba(120,70,20,.14);
  transition: transform .2s, background .2s;
}
.lg-icon:hover { transform: scale(1.07); background: rgba(255,255,255,.85); }
.lg-icon:active { transform: scale(.94); }
.lg-icon:disabled { opacity: .4; cursor: default; }

/* hero */
.lg-hero { text-align: center; padding: clamp(40px, 7vw, 72px) 20px 8px; }
.lg-eyebrow { display: inline-block; padding: 7px 16px; border-radius: 999px; margin-bottom: 18px; font-size: 11.5px; font-weight: 700; letter-spacing: .14em; color: var(--saffron-deep); }
.lg-hero h1 {
  margin: 0; font-weight: 800; letter-spacing: -.035em; line-height: 1.04;
  font-size: clamp(34px, 6vw, 68px);
  background: linear-gradient(180deg, #2A1F14 30%, #7A5226 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.lg-hero p { margin: 16px auto 0; max-width: 520px; color: var(--ink-2); font-size: clamp(14px, 1.5vw, 18px); line-height: 1.5; }

/* carousel */
.lg-stage { position: relative; margin-top: 18px; }
.lg-track {
  display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x proximity; scroll-padding-inline: 24px;
  padding: 36px 24px 44px; scrollbar-width: none; cursor: grab; position: relative;
  -webkit-overflow-scrolling: touch;
}
.lg-track > .lg-card:first-child { margin-left: auto; }   /* auto margins centre the row when it fits, */
.lg-track > .lg-card:last-child { margin-right: auto; }   /* and collapse to 0 when it has to scroll */
.lg-track::-webkit-scrollbar { display: none; }
.lg-track.drag { cursor: grabbing; scroll-snap-type: none; }

.lg-card {
  flex: 0 0 auto; width: var(--cw); aspect-ratio: 9 / 16; scroll-snap-align: start;
  position: relative; border-radius: 30px; overflow: hidden; cursor: pointer; padding: 0; border: 1px solid var(--glass-edge);
  background: #E9DCC8; text-align: left; color: #fff;
  box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 18px 44px rgba(90,55,15,.22);
  transform: scale(.97);
  transition: transform .45s cubic-bezier(.2,.8,.2,1), opacity .45s, box-shadow .45s;
}
.lg-card.on { transform: scale(1.03); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 0 0 1.5px rgba(255,255,255,.9), 0 30px 70px rgba(217,111,11,.30); }
.lg-card img.thumb { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; -webkit-user-drag: none; user-select: none; }
.lg-live { position: absolute; top: 0; left: 50%; height: 100%; width: 316%; max-width: none; transform: translateX(-50%); border: 0; pointer-events: none; opacity: 0; transition: opacity .5s ease; }
.lg-live.ready { opacity: 1; }
.lg-card .cap {
  position: absolute; left: 10px; right: 10px; bottom: 10px; border-radius: 22px; padding: 12px 14px 12px;
  background: linear-gradient(135deg, rgba(255,255,255,.34), rgba(255,255,255,.12));
  -webkit-backdrop-filter: blur(22px) saturate(170%); backdrop-filter: blur(22px) saturate(170%);
  border: 1px solid rgba(255,255,255,.5); box-shadow: 0 1px 0 rgba(255,255,255,.55) inset;
}
.lg-card .cap b {
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  font-size: 13px; font-weight: 700; line-height: 1.35; text-shadow: 0 1px 10px rgba(0,0,0,.45);
}
.lg-card .cap span { display: block; margin-top: 5px; font-size: 10.5px; font-weight: 600; opacity: .9; text-shadow: 0 1px 8px rgba(0,0,0,.4); }
.lg-full {
  position: absolute; top: 12px; left: 12px; z-index: 3; display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 13px 8px 11px; border-radius: 999px; cursor: pointer; font-size: 11.5px; font-weight: 600; color: #fff; letter-spacing: -.005em;
  background: rgba(255,255,255,.26); -webkit-backdrop-filter: blur(18px) saturate(180%); backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255,255,255,.55); box-shadow: 0 1px 0 rgba(255,255,255,.55) inset, 0 6px 18px rgba(0,0,0,.2);
  text-shadow: 0 1px 6px rgba(0,0,0,.35); transition: background .2s, transform .2s;
}
.lg-full:hover { background: rgba(242,140,40,.85); transform: scale(1.04); }
.lg-full:active { transform: scale(.96); }
.lg-full:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.lg-play {
  position: absolute; top: 14px; right: 14px; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center;
  background: rgba(255,255,255,.34); -webkit-backdrop-filter: blur(16px) saturate(180%); backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255,255,255,.6); box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 6px 18px rgba(0,0,0,.18);
}

.lg-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 4; }
.lg-arrow.l { left: 20px; }
.lg-arrow.r { right: 20px; }
@media (max-width: 760px) { .lg-arrow { display: none; } }

/* dots */
.lg-dots { align-self: center; display: flex; gap: 7px; padding: 9px 12px; border-radius: 999px; margin-top: -6px; }
.lg-dot { border: 0; padding: 0; height: 7px; width: 7px; border-radius: 999px; background: rgba(94,81,67,.28); cursor: pointer; transition: width .35s cubic-bezier(.2,.8,.2,1), background .3s; }
.lg-dot.on { width: 24px; background: var(--saffron-deep); }

/* bottom dock */
.lg-dock {
  margin: 26px auto 28px; width: min(760px, calc(100% - 28px)); border-radius: 28px; padding: 12px 12px 12px 16px;
  display: flex; align-items: center; justify-content: space-between; gap: 14px;
}
.lg-dock .txt { min-width: 0; }
.lg-dock .t { font-weight: 700; font-size: 14px; letter-spacing: -.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lg-dock .s { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
@media (max-width: 520px) { .lg-dock .btn-label { display: none; } .lg-dock .lg-btn { padding: 12px 14px; } }

/* modal */
.lg-backdrop {
  position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px;
  background: rgba(40,26,12,.38); -webkit-backdrop-filter: blur(18px) saturate(140%); backdrop-filter: blur(18px) saturate(140%);
  animation: lgFade .25s ease;
}
.lg-modal {
  width: min(1280px, 100%); max-height: calc(100dvh - 32px); overflow: hidden; border-radius: 36px;
  display: grid; grid-template-columns: 1.9fr 1fr; padding: 10px; gap: 10px;
  background: linear-gradient(135deg, rgba(255,255,255,.72), rgba(255,255,255,.46));
  box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 40px 120px rgba(40,20,0,.38);
  animation: lgPop .4s cubic-bezier(.2,.9,.25,1.05);
}
.lg-modal .body { display: contents; }
.lg-modal .body.fwd > * { animation: lgInR .38s cubic-bezier(.2,.8,.2,1); }
.lg-modal .body.back > * { animation: lgInL .38s cubic-bezier(.2,.8,.2,1); }
.lg-player { position: relative; border-radius: 28px; overflow: hidden; background: #1D1710; min-height: min(76vh, 720px); }
.lg-player iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.lg-info { display: flex; flex-direction: column; padding: 28px 22px 14px 12px; min-width: 0; overflow-y: auto; }
.lg-info .cat { font-size: 12px; font-weight: 600; color: var(--saffron-deep); }
.lg-info h2 { margin: 8px 0 12px; font-size: clamp(20px, 2.4vw, 27px); line-height: 1.25; font-weight: 800; letter-spacing: -.02em; overflow-wrap: anywhere; }
.lg-info p { margin: 0; font-size: 14px; line-height: 1.75; color: var(--ink-2); }
.lg-info .grow { flex: 1; min-height: 16px; }
.lg-brandcard { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 20px; background: rgba(255,255,255,.5); border: 1px solid rgba(255,255,255,.8); margin-bottom: 14px; }
.lg-brandcard img { width: 40px; height: 40px; border-radius: 11px; background: #fff; padding: 4px; object-fit: contain; }
.lg-brandcard b { display: block; font-size: 13px; }
.lg-brandcard small { color: var(--ink-3); font-size: 11.5px; }
.lg-pager { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.lg-pager .n { font-size: 12.5px; font-weight: 600; color: var(--ink-2); font-variant-numeric: tabular-nums; }
.lg-close { position: absolute; top: 18px; right: 18px; z-index: 5; width: 36px; height: 36px; }

@keyframes lgFade { from { opacity: 0; } }
@keyframes lgPop { from { opacity: 0; transform: translateY(18px) scale(.96); } }
@keyframes lgInR { from { opacity: 0; transform: translateX(46px); } }
@keyframes lgInL { from { opacity: 0; transform: translateX(-46px); } }

@media (max-width: 800px) {
  .lg-modal { grid-template-columns: 1fr; overflow-y: auto; border-radius: 28px; }
  .lg-player { min-height: 0; aspect-ratio: 16 / 9; border-radius: 22px; }
  .lg-info { padding: 14px 10px 8px; overflow: visible; }
  .lg-close { top: 16px; right: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .lg-root *, .lg-backdrop, .lg-modal, .lg-modal .body > * { animation: none !important; transition: none !important; }
}
@media (prefers-reduced-transparency: reduce) {
  .lg-glass, .lg-icon, .lg-card .cap, .lg-full { -webkit-backdrop-filter: none; backdrop-filter: none; background: rgba(255,255,255,.92); }
}
`;

/* =========================================================
   ICONS
   ========================================================= */

const Play = ({ s = 16, c = "currentColor" }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c} aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
  </svg>
);
const Chev = ({ dir = "l" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/* =========================================================
   VIDEO MODAL
   ========================================================= */

/* One shared loader for the YouTube IFrame API */
let ytReady;
const loadYT = () => {
  if (ytReady) return ytReady;
  ytReady = new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return ytReady;
};

/* Phones only allow autoplay after a touch in some modes (e.g. iOS Low Power).
   On the first touch/click anywhere we simply tell every preview to play. */
const players = new Set();
let gestureBound = false;
const bindGesture = () => {
  if (gestureBound) return;
  gestureBound = true;
  const kick = () => {
    players.forEach((p) => {
      try { p.mute(); p.playVideo(); } catch (e) { /* ignore */ }
    });
  };
  ["touchstart", "pointerdown", "keydown"].forEach((ev) =>
    window.addEventListener(ev, kick, { once: true, passive: true })
  );
};

function LiveFrame({ id, delay = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const frame = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!mounted || !frame.current) return;
    let player;
    let dead = false;
    bindGesture();

    // if the API is blocked (ad-blocker etc.) fall back to showing the iframe as it is
    const fallback = setTimeout(() => { if (!player && !dead) setPlaying(true); }, 4500);

    loadYT().then((YT) => {
      if (dead || !frame.current) return;
      player = new YT.Player(frame.current, {
        events: {
          onReady: (e) => {
            players.add(e.target);
            try { e.target.mute(); e.target.playVideo(); } catch (err) { /* ignore */ }
          },
          onStateChange: (e) => {
            if (e.data === 1) setPlaying(true);                 // PLAYING → reveal
            else if (e.data === 0) e.target.playVideo();        // ENDED → loop
            else if (e.data === 2 || e.data === 5) {            // paused / cued (autoplay blocked)
              setPlaying(false);
              try { e.target.playVideo(); } catch (err) { /* ignore */ }
            }
          },
        },
      });
    });

    return () => {
      dead = true;
      clearTimeout(fallback);
      if (player) {
        players.delete(player);
        try { player.stopVideo(); } catch (err) { /* ignore */ }
      }
    };
  }, [mounted]);

  if (!mounted) return null;
  return (
    <iframe
      ref={frame}
      className={`lg-live ${playing ? "ready" : ""}`}
      src={`https://www.youtube.com/embed/${id}?enablejsapi=1&autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3`}
      title="Preview"
      allow="autoplay; encrypted-media"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

function VideoModal({ video, index, total, dir, onClose, onPrev, onNext }) {
  const touchX = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 60) return;
    dx < 0 ? onNext() : onPrev();
  };

  return (
    <div className="lg-backdrop" onClick={onClose}>
      <div
        className="lg-modal lg-glass"
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <button className="lg-icon lg-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <div key={video.id} className={`body ${dir}`}>
          <div className="lg-player">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="lg-info">
            <div className="cat">{video.category}</div>
            <h2 title={video.keywords}>{video.title}</h2>
            <p>{video.description}</p>
            <div className="grow" />
            <div className="lg-brandcard">
              <img src={logo} alt="360" />
              <div>
                <b>360</b>
                <small>Devotional &amp; Spiritual Social Media Management</small>
              </div>
            </div>
            <div className="lg-pager">
              <button className="lg-icon" onClick={onPrev} aria-label="Previous video"><Chev dir="l" /></button>
              <span className="n">{index + 1} / {total}</span>
              <button className="lg-icon" onClick={onNext} aria-label="Next video"><Chev dir="r" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function VideoEditingShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const [dir, setDir] = useState("fwd");

  const [canScroll, setCanScroll] = useState(false);
  const [visible, setVisible] = useState(() => new Set(videos.map((_, i) => i)));
  const [sectionInView, setSectionInView] = useState(false);
  const track = useRef(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  /* SEO */
  useEffect(() => {
    document.title = "Devotional & Spiritual Video Editing | 360";
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
      "360 provides professional devotional and spiritual video editing, Baba Ji video editing, devotional reels, YouTube content and social media management for spiritual brands and creators."
    );
    setMeta("keywords", SEO_KEYWORDS.join(", "));
  }, []);

  const total = videos.length;
  const wrap = (i) => (i + total) % total;

  const nearest = () => {
    const el = track.current;
    if (!el) return 0;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0, gap = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const g = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (g < gap) { gap = g; best = i; }
    });
    return best;
  };

  const centre = (idx, behavior = "smooth") => {
    const el = track.current;
    const c = el?.children[idx];
    if (c) el.scrollTo({ left: c.offsetLeft + c.offsetWidth / 2 - el.clientWidth / 2, behavior });
  };

  const goTo = (i) => {
    const idx = Math.max(0, Math.min(total - 1, i));
    setActiveIndex(idx);
    centre(idx);
  };

  /* start with the first card centred, and keep it centred on resize */
  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) setCanScroll(el.scrollWidth > el.clientWidth + 4);
    };
    const first = () => { if (track.current) track.current.scrollLeft = 0; measure(); };
    first();
    const t = setTimeout(first, 150); // after images/fonts settle
    const onResize = measure;
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(t); window.removeEventListener("resize", onResize); };
  }, []);

  /* which cards are visible inside the track, and is the section on screen at all */
  useEffect(() => {
    const el = track.current;
    if (!el || !("IntersectionObserver" in window)) { setSectionInView(true); return; }

    const cardsIO = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev);
          entries.forEach((e) => {
            const i = Number(e.target.dataset.i);
            if (e.isIntersecting) next.add(i); else next.delete(i);
          });
          return next;
        });
      },
      { root: el, rootMargin: "0px 80px", threshold: 0.35 }
    );
    Array.from(el.children).forEach((c) => cardsIO.observe(c));

    const pageIO = new IntersectionObserver(([e]) => setSectionInView(e.isIntersecting), { threshold: 0.1 });
    pageIO.observe(el);

    return () => { cardsIO.disconnect(); pageIO.disconnect(); };
  }, []);

  const onScroll = () => {
    if (drag.current.down) return;
    const idx = nearest();
    if (idx !== activeIndex) setActiveIndex(idx);
  };

  /* mouse drag */
  const onDown = (e) => {
    drag.current = { down: true, moved: false, startX: e.pageX, startLeft: track.current.scrollLeft };
    track.current.classList.add("drag");
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.pageX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    track.current.scrollLeft = d.startLeft - dx;
  };
  const onUp = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    track.current.classList.remove("drag");
    goTo(nearest());
  };

  const openVideo = (i) => {
    if (drag.current.moved) return; // ignore click that ended a drag
    setActiveIndex(i);
    setDir("fwd");
    setModalIndex(i);
  };

  const step = (delta) => {
    setDir(delta > 0 ? "fwd" : "back");
    setModalIndex((cur) => {
      const next = wrap((cur ?? 0) + delta);
      setActiveIndex(next);
      return next;
    });
  };

  const active = videos[activeIndex];

  return (
    <>
      <style>{STYLES}</style>

      {modalIndex !== null && (
        <VideoModal
          video={videos[modalIndex]}
          index={modalIndex}
          total={total}
          dir={dir}
          onClose={() => setModalIndex(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}

      <div className="lg-root">
        <div className="lg-blob a" />
        <div className="lg-blob b" />
        <div className="lg-blob c" />

        {/* HERO */}
        <section className="lg-hero">
          <div className="lg-eyebrow lg-glass">VIDEO PORTFOLIO</div>
          <h1>Video Editing for<br />Spiritual Content</h1>
          <p>Cinematic &amp; meaningful video editing for Baba Ji, devotional creators and spiritual brands.</p>
        </section>

        {/* CAROUSEL */}
        <section className="lg-stage" aria-label="Video showcase">
          {canScroll && <button className="lg-icon lg-arrow l" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Scroll left">
            <Chev dir="l" />
          </button>}

          <div
            ref={track}
            className="lg-track"
            onScroll={onScroll}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
          >
            {videos.map((v, i) => (
              <div
                key={v.id}
                data-i={i}
                className={`lg-card ${i === activeIndex ? "on" : ""}`}
                onClick={() => openVideo(i)}
              >
                <img className="thumb" src={v.thumb} alt={v.title} draggable={false} />
                {modalIndex === null && sectionInView && visible.has(i) && (
                  <LiveFrame id={v.youtubeId} delay={window.innerWidth < 768 ? 0 : (i % 4) * 250} />
                )}
                <button
                  className="lg-full"
                  onClick={(e) => { e.stopPropagation(); openVideo(i); }}
                  aria-label={`Click to full view: ${v.title}`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
                  </svg>
                  Click to full view
                </button>
                <div className="cap">
                  <b>{v.title}</b>
                  <span>{v.category}</span>
                </div>
              </div>
            ))}
          </div>

          {canScroll && <button className="lg-icon lg-arrow r" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === total - 1} aria-label="Scroll right">
            <Chev dir="r" />
          </button>}
        </section>

        {/* DOTS */}
        <div className="lg-dots lg-glass" role="tablist" aria-label="Choose video">
          {videos.map((v, i) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Video ${i + 1}`}
              className={`lg-dot ${i === activeIndex ? "on" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* DOCK */}
        <footer className="lg-dock lg-glass">
          <div className="txt">
            <div className="t">{active.title}</div>
            <div className="s">{active.category}</div>
          </div>
          <button className="lg-btn" onClick={() => openVideo(activeIndex)}>
            <Play s={12} /> <span className="btn-label">Watch video</span>
          </button>
        </footer>
      </div>
    </>
  );
}