import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import VideoEditing from "../../assets/WorkImage/VideoEditing.png";
import WebsiteDesign from "../../assets/WorkImage/Website Design.png";

/* =========================================================
   ELEVION MEDIA — WHAT WE DO · PINNED HORIZONTAL SCROLL
   Liquid-glass redesign. Scroll/pin logic is unchanged:
   section pins with position:fixed (never sticky), so it keeps
   working even if an ancestor has overflow-x:hidden.
   ========================================================= */

// Extra scroll distance (in px) to hold the last card in the center
const HOLD_DISTANCE = 600;

// Tailwind `md` breakpoint
const MOBILE_BREAKPOINT = 768;

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.";

const cards = [
  {
    id: 1,
    title: "Social Media Management",
    desc: "Complete social media management for devotional brands with content planning, posts, reels, captions, community handling and growth strategy.",
    badge: "Content Planned",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
    imageAlt: "Social media content planning",
  },
  {
    id: 2,
    title: "Video Editing & Graphic Design",
    desc: "Devotional reels, shorts, YouTube videos, posters, thumbnails, festival creatives and branded social media visuals — all handled under one creative service.",
    badge: "Creative Ready",
    image: VideoEditing,
    imageAlt: "Devotional video editing and graphic design",
  },
  {
    id: 3,
    title: "Website / Web Dev",
    desc: "Modern, responsive websites for mandirs, gurus, spiritual organizations, events, bookings and devotional brands.",
    badge: "Website Ready",
    image: WebsiteDesign,
    imageAlt: "Spiritual website design",
    link: "/services/web-development",
  },
  {
    id: 4,
    title: "Try Now For Free",
    desc: "Start a conversation with Elevion Media on WhatsApp and discuss your devotional or spiritual digital growth requirements.",
    badge: "Free Consultation",
    cta: true,
  },
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');

.es-sec {
  --ink: #1D1710; --ink-2: #5E5143; --ink-3: #8F8070;
  --saffron: #F28C28; --saffron-deep: #D96F0B;
  --edge: rgba(255,255,255,.78);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased; color: var(--ink); position: relative;
  background: linear-gradient(180deg, #FBF6EF, #F6EDE0 60%, #F4EBDD);
}
.es-sec *, .es-sec *::before, .es-sec *::after { box-sizing: border-box; }
.es-sec button { font-family: inherit; }

/* pinned layer: padding + clipped colour blobs (blobs live INSIDE it so they pin with it) */
.es-pin { width: 100%; overflow: hidden; display: flex; align-items: center; padding: 0 16px; isolation: isolate; }
@media (min-width: 768px) { .es-pin { padding: 0 32px; } }
@media (min-width: 1024px) { .es-pin { padding: 0 56px; } }

.es-blob { position: absolute; border-radius: 50%; filter: blur(70px); z-index: -1; pointer-events: none; }
.es-blob.a { width: 380px; height: 380px; background: #F6A94A; opacity: .34; top: 6%; left: -90px; animation: esDrift 24s ease-in-out infinite alternate; }
.es-blob.b { width: 340px; height: 340px; background: #F2B8A0; opacity: .36; top: 44%; right: -80px; animation: esDrift 28s ease-in-out infinite alternate-reverse; }
.es-blob.c { width: 320px; height: 320px; background: #E7C968; opacity: .32; bottom: -80px; left: 38%; animation: esDrift 32s ease-in-out infinite alternate; }
@keyframes esDrift { to { transform: translate3d(60px,-40px,0) scale(1.12); } }

.es-glass {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,.66), rgba(255,255,255,.4));
  -webkit-backdrop-filter: blur(28px) saturate(185%); backdrop-filter: blur(28px) saturate(185%);
  border: 1px solid var(--edge);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 -1px 0 rgba(255,255,255,.25) inset, 0 14px 44px rgba(120,70,20,.13);
}
.es-glass::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 42%); mix-blend-mode: soft-light;
}

/* intro */
.es-intro { position: absolute; left: 16px; right: 16px; top: 50%; width: calc(100% - 2rem); z-index: 10; pointer-events: none; will-change: transform, opacity; }
@media (min-width: 768px) { .es-intro { left: 32px; width: 45%; } }
@media (min-width: 1024px) { .es-intro { left: 56px; width: 29%; } }
.es-chip { display: inline-block; padding: 7px 16px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: .16em; color: var(--saffron-deep); }
.es-intro h2 { margin: 18px 0 0; font-weight: 800; letter-spacing: -.04em; line-height: 1; font-size: clamp(38px, 5.2vw, 66px); color: var(--ink); }
.es-intro h2 .l1 { display: block; background: linear-gradient(180deg, #F89A3E, var(--saffron-deep)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.es-intro h2 .l2 { display: block; background: linear-gradient(180deg, #2A1F14 30%, #7A5226 100%); -webkit-background-clip: text; background-clip: text; color: transparent; padding-bottom: .08em; }
.es-tag { display: flex; align-items: center; gap: 10px; margin-top: 18px; font-size: clamp(14px, 1.5vw, 18px); font-weight: 600; letter-spacing: -.015em; color: var(--ink); }
.es-tag i { width: 9px; height: 9px; border-radius: 50%; background: var(--saffron-deep); box-shadow: 0 0 0 5px rgba(217,111,11,.12); }
.es-intro p { margin: 14px 0 0; max-width: 460px; font-size: clamp(13.5px, 1.2vw, 16px); line-height: 1.7; color: var(--ink-2); }

/* track + cards */
.es-trackbox { width: 100%; min-width: 0; display: flex; align-items: center; pointer-events: auto; }
.es-track { display: flex; flex-direction: row; gap: 16px; width: max-content; will-change: transform; }
@media (min-width: 768px) { .es-track { gap: 20px; } }
@media (min-width: 1024px) { .es-track { gap: 24px; } }

.es-card {
  flex: none; width: min(85vw, 340px); display: flex; flex-direction: column; justify-content: space-between; border-radius: 30px; padding: 20px;
  transition: transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s;
}
.es-card.click { cursor: pointer; }
.es-card.click:hover { transform: translateY(-5px); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 28px 64px rgba(217,111,11,.2); }
@media (min-width: 768px) { .es-card { width: 500px; padding: 30px; border-radius: 36px; } }
@media (min-width: 1024px) { .es-card { width: 720px; padding: 38px; border-radius: 42px; } }
@media (min-width: 1280px) { .es-card { width: 760px; } }

.es-top { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; width: 100%; }
@media (min-width: 768px) { .es-top { flex-direction: row; justify-content: space-between; gap: 24px; } }

.es-num {
  display: block; font-size: 60px; font-weight: 800; line-height: .95; letter-spacing: -.05em;
  background: linear-gradient(180deg, rgba(242,140,40,.6), rgba(201,162,39,.16)); -webkit-background-clip: text; background-clip: text; color: transparent;
}
@media (min-width: 768px) { .es-num { font-size: 96px; } }
@media (min-width: 1024px) { .es-num { font-size: 148px; } }
.es-badge {
  display: inline-flex; align-items: center; gap: 8px; margin-top: 8px; padding: 6px 12px; border-radius: 999px; font-size: 11.5px; font-weight: 600; color: var(--saffron-deep);
  background: rgba(242,140,40,.12); border: 1px solid rgba(242,140,40,.24);
}
.es-badge i { width: 6px; height: 6px; border-radius: 50%; background: var(--saffron-deep); }

.es-media { position: relative; width: 100%; height: 160px; border-radius: 22px; overflow: hidden; flex: none; background: linear-gradient(145deg, #FFF3DC, #F8E0B4); box-shadow: 0 0 0 1px rgba(255,255,255,.7); display: grid; place-items: center; }
@media (min-width: 768px) { .es-media { width: 280px; height: 200px; border-radius: 26px; } }
@media (min-width: 1024px) { .es-media { width: 390px; height: 245px; border-radius: 30px; } }
.es-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.es-media .shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,.18) 0%, transparent 35%, rgba(40,22,4,.3) 100%); }
.es-media .glassbadge {
  position: absolute; left: 12px; bottom: 12px; z-index: 2; display: inline-flex; align-items: center; gap: 8px; padding: 7px 13px; border-radius: 999px; font-size: 11.5px; font-weight: 600; color: var(--ink);
  background: rgba(255,255,255,.6); -webkit-backdrop-filter: blur(18px) saturate(180%); backdrop-filter: blur(18px) saturate(180%); border: 1px solid rgba(255,255,255,.85); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 6px 18px rgba(0,0,0,.14);
}
.es-media .glassbadge i { width: 6px; height: 6px; border-radius: 50%; background: var(--saffron-deep); }
.es-wa { text-align: center; padding: 0 16px; }
.es-wa .ic { width: 58px; height: 58px; margin: 0 auto 12px; border-radius: 50%; display: grid; place-items: center; color: #fff; background: linear-gradient(180deg, #34D07A, #12A150); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 10px 26px rgba(18,161,80,.32); }
.es-wa small { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--saffron-deep); }
.es-wa b { display: block; margin-top: 4px; font-size: clamp(17px, 1.6vw, 21px); font-weight: 700; letter-spacing: -.02em; }

.es-body { margin-top: 20px; }
@media (min-width: 768px) { .es-body { margin-top: 30px; } }
@media (min-width: 1024px) { .es-body { padding-right: 40px; } }
.es-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--saffron-deep); }
@media (min-width: 768px) { .es-eyebrow { font-size: 12.5px; } }
.es-body h3 { margin: 6px 0 0; font-size: 25px; font-weight: 800; letter-spacing: -.035em; line-height: 1.12; color: var(--ink); }
@media (min-width: 768px) { .es-body h3 { font-size: 36px; margin-top: 8px; } }
@media (min-width: 1024px) { .es-body h3 { font-size: 42px; } }
.es-body p { margin: 10px 0 0; max-width: 640px; font-size: 14px; line-height: 1.65; color: var(--ink-2); }
@media (min-width: 768px) { .es-body p { font-size: 17px; margin-top: 14px; } }
@media (min-width: 1024px) { .es-body p { font-size: 19px; } }

.es-btn {
  margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; border: 0; cursor: pointer; border-radius: 999px; padding: 13px 24px; font-size: 14px; font-weight: 600; color: #fff;
  background: linear-gradient(180deg, #34D07A, #12A150); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 10px 26px rgba(18,161,80,.3);
  transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s;
}
.es-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 14px 32px rgba(18,161,80,.38); }
.es-btn:active { transform: scale(.97); }
.es-btn:focus-visible { outline: 2px solid var(--saffron-deep); outline-offset: 3px; }
@media (min-width: 768px) { .es-btn { width: auto; margin-top: 24px; padding: 14px 28px; } }

/* progress */
.es-progress { position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); z-index: 12; width: min(220px, 50%); height: 28px; border-radius: 999px; padding: 10px 14px; pointer-events: none; transition: opacity .3s; }
.es-progress span { display: block; height: 100%; border-radius: 999px; background: rgba(94,81,67,.16); position: relative; overflow: hidden; }
.es-progress span i { position: absolute; inset: 0 auto 0 0; border-radius: inherit; background: linear-gradient(90deg, #F89A3E, var(--saffron-deep)); }

@media (prefers-reduced-motion: reduce) { .es-sec *, .es-sec *::before { animation: none !important; } .es-card { transition: none !important; } }
@media (prefers-reduced-transparency: reduce) { .es-glass, .es-media .glassbadge { -webkit-backdrop-filter: none; backdrop-filter: none; background: rgba(255,255,255,.93); } }
`;

const ElevionMediaScroll = () => {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const trackRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [totalTravel, setTotalTravel] = useState(0);
  const [introWidth, setIntroWidth] = useState(0);
  const [ready, setReady] = useState(false);

  // Manual pin (fixed / absolute) instead of position: sticky.
  // "before" -> section top | "pinned" -> position: fixed under navbar | "after" -> section bottom
  const [phase, setPhase] = useState("before");
  const [navOffset, setNavOffset] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  // measure the navbar so pinned content never overlaps it
  useEffect(() => {
    const header = document.querySelector("header");
    const measureNav = () => setNavOffset(header ? header.getBoundingClientRect().height : 0);

    measureNav();
    window.addEventListener("resize", measureNav);

    let ro;
    if (header && "ResizeObserver" in window) {
      ro = new ResizeObserver(measureNav);
      ro.observe(header);
    }
    return () => {
      window.removeEventListener("resize", measureNav);
      if (ro) ro.disconnect();
    };
  }, []);

  // viewport height (orientation change / mobile URL bar)
  useEffect(() => {
    const updateVH = () => setViewportHeight(window.innerHeight);
    updateVH();
    window.addEventListener("resize", updateVH);
    window.addEventListener("orientationchange", updateVH);
    return () => {
      window.removeEventListener("resize", updateVH);
      window.removeEventListener("orientationchange", updateVH);
    };
  }, []);

  const availableHeight = Math.max(0, viewportHeight - navOffset);
  const containerHeight = availableHeight + totalTravel + HOLD_DISTANCE;

  // card min-height via inline style (no dependency on Tailwind build)
  const [cardMinHeight, setCardMinHeight] = useState(560);
  useEffect(() => {
    const computeCardHeight = () => {
      const w = window.innerWidth;
      const vh = window.innerHeight;
      let vhPercent = 0.78;
      let cap = 560;
      if (w >= 1024) {
        vhPercent = 0.68;
        cap = 640;
      } else if (w >= 768) {
        vhPercent = 0.72;
        cap = 600;
      }
      setCardMinHeight(Math.min(vh * vhPercent, cap));
    };
    computeCardHeight();
    window.addEventListener("resize", computeCardHeight);
    window.addEventListener("orientationchange", computeCardHeight);
    return () => {
      window.removeEventListener("resize", computeCardHeight);
      window.removeEventListener("orientationchange", computeCardHeight);
    };
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;

      const track = trackRef.current;
      const parent = track.parentElement;
      if (!parent) return;

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const introWidthValue = isMobile
        ? window.innerWidth * 0.85
        : introRef.current
        ? introRef.current.offsetWidth
        : 0;

      const trackRect = track.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const lastCard = track.lastElementChild;

      let travel = Math.max(0, track.scrollWidth - parent.clientWidth);

      if (lastCard) {
        const lastCardRect = lastCard.getBoundingClientRect();
        const lastCardOffsetLeft = lastCardRect.left - trackRect.left;
        const lastCardWidth = lastCardRect.width;

        const centerTravel =
          introWidthValue + lastCardOffsetLeft + lastCardWidth / 2 - parentRect.width / 2;

        travel = Math.max(0, centerTravel);
      }

      setIntroWidth(introWidthValue);
      setTotalTravel(travel);
      setReady(true);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    if (introRef.current) resizeObserver.observe(introRef.current);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // scroll → phase + progress
  useEffect(() => {
    if (!ready) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const topRelativeToNav = rect.top - navOffset;
      const scrollableDistance = Math.max(1, totalTravel);

      let newPhase;
      let progress;

      if (topRelativeToNav > 0) {
        newPhase = "before";
        progress = 0;
      } else if (rect.bottom <= viewportHeight) {
        newPhase = "after";
        progress = 1;
      } else {
        newPhase = "pinned";
        const scrolled = -topRelativeToNav;
        progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      }

      setPhase(newPhase);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ready, totalTravel, navOffset, viewportHeight]);

  const pinStyle =
    phase === "pinned"
      ? { position: "fixed", top: navOffset, left: 0, right: 0, height: availableHeight }
      : phase === "after"
      ? { position: "absolute", top: containerHeight - availableHeight, left: 0, right: 0, height: availableHeight }
      : { position: "absolute", top: 0, left: 0, right: 0, height: availableHeight };

  const openCard = (card) => {
    if (card.link) window.location.href = card.link;
    else if (card.cta) window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={containerRef}
      style={{ height: `${Math.max(containerHeight, 1)}px` }}
      className="es-sec"
      aria-label="What is Elevion Media"
    >
      <style>{STYLES}</style>

      <div style={pinStyle} className="es-pin">
        <div className="es-blob a" />
        <div className="es-blob b" />
        <div className="es-blob c" />

        {/* Intro */}
        <div
          ref={introRef}
          className="es-intro"
          style={{
            transform: `translateY(-50%) translateX(-${scrollProgress * 200}%)`,
            opacity: Math.max(0, 1 - scrollProgress * 2.2),
          }}
        >
          <div className="es-chip es-glass">ELEVION MEDIA</div>
          <h2>
            <span className="l1">What is</span>
            <span className="l2">Elevion Media?</span>
          </h2>
          <div className="es-tag"><i /> Devotional Digital Growth</div>
          <p>
            We help gurus, mandirs, spiritual creators and devotional brands grow online through content, design, social media, SEO, paid ads and digital marketing.
          </p>
        </div>

        {/* Horizontal track */}
        <div className="es-trackbox">
          <div
            ref={trackRef}
            className="es-track"
            style={{
              transform: `translate3d(${introWidth - scrollProgress * totalTravel}px, 0, 0)`,
              transition: "transform 70ms linear",
            }}
          >
            {cards.map((card) => (
              <article
                key={card.id}
                onClick={() => openCard(card)}
                style={{ minHeight: `${cardMinHeight}px` }}
                className={`es-card es-glass ${card.link || card.cta ? "click" : ""}`}
              >
                <div className="es-top">
                  <div style={{ flexShrink: 0 }}>
                    <span className="es-num">0{card.id}</span>
                    <div className="es-badge"><i />{card.badge}</div>
                  </div>

                  <div className="es-media">
                    {!card.cta ? (
                      <>
                        <img src={card.image} alt={card.imageAlt} loading="lazy" />
                        <div className="shade" />
                        <div className="glassbadge"><i />{card.badge}</div>
                      </>
                    ) : (
                      <div className="es-wa">
                        <div className="ic"><MessageCircle size={26} strokeWidth={2.1} /></div>
                        <small>Elevion Media</small>
                        <b>WhatsApp</b>
                      </div>
                    )}
                  </div>
                </div>

                <div className="es-body">
                  <div className="es-eyebrow">Spiritual Digital Growth</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>

                  {card.cta && (
                    <button type="button" className="es-btn">
                      <MessageCircle size={17} strokeWidth={2.2} />
                      Try Now For Free
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* progress */}
        <div className="es-progress es-glass" aria-hidden="true">
          <span><i style={{ width: `${Math.round(scrollProgress * 100)}%` }} /></span>
        </div>
      </div>
    </section>
  );
};

export default ElevionMediaScroll;