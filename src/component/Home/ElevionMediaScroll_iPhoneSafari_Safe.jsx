import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import VideoEditing from "../../assets/WorkImage/VideoEditing.png";
import WebsiteDesign from "../../assets/WorkImage/Website Design.png";

// Extra scroll distance (in px) to hold the last card in the center
const HOLD_DISTANCE = 600;

// Tailwind ke `md` breakpoint se match — mobile-desktop-mode fix (pehle se hai)
const MOBILE_BREAKPOINT = 768;

const isSafariOrIOS = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const vendor = navigator.vendor || "";
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const safari =
    /Safari/.test(ua) &&
    /Apple Computer/.test(vendor) &&
    !/Chrome|CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);

  return iOS || safari;
};

const ElevionMediaScroll = () => {
  const safariSafeMode =
    typeof window !== "undefined" &&
    (window.innerWidth < 1024 || isSafariOrIOS());

  const containerRef = useRef(null);
  const introRef = useRef(null);
  const trackRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [totalTravel, setTotalTravel] = useState(0);
  const [introWidth, setIntroWidth] = useState(0);
  const [ready, setReady] = useState(false);

  // ====== NAYA: sticky ki jagah manual fixed/absolute pin logic ======
  // `position: sticky` kisi bhi ancestor pe `overflow: hidden/auto/scroll`
  // ya `transform` lagte hi silently kaam karna band kar deta hai. Bahut
  // saare React projects `body`/`html`/`#root` pe `overflow-x: hidden`
  // rakhte hain (horizontal-scroll sections ke saath bilkul common),
  // jisse yahi symptom aata hai: content beech mein "floating" dikhta hai,
  // upar-neeche khaali jagah reh jaati hai — bilkul jaisa screenshot mein
  // dikha.
  //
  // Fix: hum khud JS se decide karte hain ki content:
  //  - "before" -> section ke top pe (normal flow jaisa, scroll abhi wahan nahi pahuncha)
  //  - "pinned" -> position: fixed (viewport-relative, navbar ke bilkul neeche)
  //  - "after"  -> section ke bottom pe absolute (scroll section se aage nikal chuka)
  // `fixed` positioning `overflow` se kabhi break nahi hota, isliye ye
  // wrapper/App CSS mein kuch bhi ho, hamesha kaam karega.
  const [phase, setPhase] = useState("before"); // "before" | "pinned" | "after"
  const [navOffset, setNavOffset] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  // Navbar (header) ki actual rendered height measure karo, taaki pinned
  // content usse overlap na kare aur beech mein blank gap bhi na bane.
  useEffect(() => {
    const header = document.querySelector("header");

    const measureNav = () => {
      setNavOffset(header ? header.getBoundingClientRect().height : 0);
    };

    measureNav();
    window.addEventListener("resize", measureNav);

    let ro;
    if (header && "ResizeObserver" in window) {
      ro = new ResizeObserver(measureNav);
      ro.observe(header);
    }

  
  if (safariSafeMode) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

          .elevion-media-scroll-safe,
          .elevion-media-scroll-safe * {
            font-family: 'Inter', sans-serif;
            font-style: normal;
          }
        `}</style>

        <section className="elevion-media-scroll-safe relative overflow-hidden bg-gradient-to-b from-[#fffaf2] via-[#fffdf8] to-[#fdf3df] px-4 py-12 md:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full border border-[#e8c878] bg-[#fff8e8] px-4 py-1.5 text-[10px] font-bold tracking-[0.24em] text-[#a26a0a] uppercase">
                ELEVION MEDIA
              </span>

              <h2 className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-tight text-[#b8860b]">
                What is
                <br />
                <span className="text-[#2a1800]">Elevion Media?</span>
              </h2>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#c8780a]" />
                <p className="text-sm font-semibold text-[#6f5637]">
                  Devotional Digital Growth
                </p>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#7c6a52]">
                We help gurus, mandirs, spiritual creators and devotional brands
                grow online through content, design, social media, SEO, paid ads
                and digital marketing.
              </p>
            </div>

            <div className="space-y-5">
              {cards.map((card) => (
                <article
                  key={card.id}
                  onClick={() => {
                    if (card.link) {
                      window.location.href = card.link;
                    } else if (card.cta) {
                      window.open(
                        "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  className={`w-full rounded-[24px] border border-[#ead8a8] bg-gradient-to-br from-[#fffef9] via-[#fffaf0] to-[#fdf1d9] p-5 shadow-[0_10px_32px_rgba(120,80,0,0.08)] ${
                    card.link || card.cta ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-6xl font-extrabold leading-none text-[#e3c56f]/50">
                          0{card.id}
                        </span>

                        <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#e8c878] bg-[#fff7df] px-2.5 py-1 text-[10px] font-semibold text-[#95610d]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#c8780a]" />
                          {card.badge}
                        </div>
                      </div>

                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[16px] border border-[#ead8a8] bg-[#f9edcf]">
                        {!card.cta ? (
                          <img
                            src={card.image}
                            alt={card.imageAlt}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#b8860b]">
                            <MessageCircle size={28} strokeWidth={2.1} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#b8860b]">
                        Spiritual Digital Growth
                      </p>

                      <h3 className="mt-1 text-2xl font-bold leading-tight tracking-tight text-[#2a1800]">
                        {card.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#6f604e]">
                        {card.desc}
                      </p>

                      {card.cta && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            window.open(
                              "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.",
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#b8860b] bg-gradient-to-r from-[#b8860b] to-[#d4a017] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_18px_rgba(184,134,11,0.22)]"
                        >
                          <MessageCircle size={17} strokeWidth={2.2} />
                          Try Now For Free
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return () => {
      window.removeEventListener("resize", measureNav);
      if (ro) ro.disconnect();
    };
  }, []);

  // Viewport height track karo (orientation change / URL bar show-hide pe bhi)
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
  // ====================================================================

  // ====== NAYA: card height ab Tailwind arbitrary class (min-h-[min(...)])
  // se nahi, balki seedha JS se inline style ke through set hoti hai.
  // Tailwind arbitrary values kabhi kabhi build/purge cache ki wajah se
  // properly generate nahi hote, jisse fix "file mein hone ke bawajood"
  // browser mein nahi dikhta. Inline style is problem ko poori tarah
  // bypass kar deta hai — ye kabhi bhi Tailwind ke build process pe
  // depend nahi karta, turant apply hoga.
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
  // ====================================================================

  useLayoutEffect(() => {
    const measure = () => {
      if (safariSafeMode || !trackRef.current) {
        setReady(true);
        return;
      }

      const track = trackRef.current;
      const parent = track.parentElement;
      if (!parent) return;

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const introWidthValue = isMobile
        ? window.innerWidth * 0.85
        : (introRef.current ? introRef.current.offsetWidth : 0);

      const trackRect = track.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const lastCard = track.lastElementChild;

      let travel = Math.max(0, track.scrollWidth - parent.clientWidth);

      if (lastCard) {
        const lastCardRect = lastCard.getBoundingClientRect();
        const lastCardOffsetLeft = lastCardRect.left - trackRect.left;
        const lastCardWidth = lastCardRect.width;

        const centerTravel =
          introWidthValue +
          lastCardOffsetLeft +
          lastCardWidth / 2 -
          parentRect.width / 2;

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

  // ====== NAYA: scroll handler ab phase + progress dono decide karta hai ======
  useEffect(() => {
    if (!ready || safariSafeMode) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // rect.top: viewport ke top se section ke top tak ki distance.
      // navOffset subtract karke check karte hain ki section navbar ke
      // "neeche" pahuncha ya nahi.
      const topRelativeToNav = rect.top - navOffset;
      const scrollableDistance = Math.max(1, totalTravel);

      let newPhase;
      let progress;

      if (topRelativeToNav > 0) {
        // Section abhi navbar tak scroll hoke nahi pahuncha
        newPhase = "before";
        progress = 0;
      } else if (rect.bottom <= viewportHeight) {
        // Section poora scroll ho chuka, content ab section ke bottom se chipka rahega
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
  // ==============================================================================

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

  // NAYA: phase ke hisaab se inline position style
  const pinStyle =
    phase === "pinned"
      ? { position: "fixed", top: navOffset, left: 0, right: 0, height: availableHeight }
      : phase === "after"
      ? {
          position: "absolute",
          top: containerHeight - availableHeight,
          left: 0,
          right: 0,
          height: availableHeight,
        }
      : { position: "absolute", top: 0, left: 0, right: 0, height: availableHeight };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .elevion-media-scroll,
        .elevion-media-scroll * {
          font-family: 'Inter', sans-serif;
          font-style: normal;
        }
      `}</style>

    <section
      ref={containerRef}
      style={{ height: `${Math.max(containerHeight, 1)}px` }}
      className="elevion-media-scroll relative bg-gradient-to-b from-[#fffaf2] via-[#fffdf8] to-[#fdf3df]"
    >
      <div
        style={pinStyle}
        className="w-full overflow-hidden flex items-center px-4 md:px-8 lg:px-14"
      >

        {/* Intro panel - Make it absolute so it flows seamlessly on all devices */}
        <div
          ref={introRef}
          className="absolute left-4 right-4 md:left-8 lg:left-14 top-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-[45%] lg:w-[29%] z-10 pointer-events-none"
          style={{
            transform: `translateY(-50%) translateX(-${scrollProgress * 200}%)`,
            opacity: Math.max(0, 1 - scrollProgress * 2.2),
          }}
        >
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8c878] bg-[#fff8e8] px-3 py-1.5 md:px-4 text-[9px] md:text-[10px] font-bold tracking-[0.24em] text-[#a26a0a] uppercase shadow-sm">
              ELEVION MEDIA
            </span>

            <h2 className="mt-4 md:mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.98] tracking-tight text-[#b8860b]">
              What is
              <br />
              <span className="text-[#2a1800]">Elevion Media?</span>
            </h2>

            <div className="mt-4 md:mt-5 flex items-center gap-2 md:gap-3">
              <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-[#c8780a] shadow-[0_0_0_5px_rgba(200,120,10,0.08)]" />
              <p className="text-sm md:text-lg font-semibold text-[#6f5637]">
                Devotional Digital Growth
              </p>
            </div>

            <p className="mt-3 md:mt-4 max-w-md text-sm md:text-base leading-6 md:leading-7 text-[#7c6a52]">
              We help gurus, mandirs, spiritual creators and devotional brands grow online through content, design, social media, SEO, paid ads and digital marketing.
            </p>
          </div>
        </div>

        {/* Full-width horizontal service track */}
        <div className="w-full lg:h-full flex items-center min-w-0 pointer-events-auto">
          <div
            ref={trackRef}
            className="flex flex-row gap-4 md:gap-5 lg:gap-6 w-max"
            style={{
              transform: `translate3d(${introWidth - scrollProgress * totalTravel}px, 0, 0)`,
              transition: "transform 70ms linear",
            }}
          >
            {cards.map((card) => (
              <article
                key={card.id}
                onClick={() => {
                  if (card.link) window.location.href = card.link;
                  else if (card.cta) {
                    window.open(
                      "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.",
                      "_blank", "noopener,noreferrer"
                    );
                  }
                }}
                style={{ minHeight: `${cardMinHeight}px` }}
                className={`w-[85vw] max-w-[340px] md:max-w-none md:w-[500px] lg:w-[720px] xl:w-[760px] h-auto rounded-[24px] lg:rounded-[34px] p-5 md:p-8 lg:p-10 flex flex-col justify-between flex-shrink-0 border border-[#ead8a8] bg-gradient-to-br from-[#fffef9] via-[#fffaf0] to-[#fdf1d9] shadow-[0_14px_45px_rgba(120,80,0,0.10)] ${
                  card.link || card.cta ? "cursor-pointer" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <span className="text-6xl md:text-8xl lg:text-[150px] font-extrabold leading-none text-[#e3c56f]/50">
                      0{card.id}
                    </span>
                    <div className="mt-1 md:mt-2 inline-flex items-center gap-2 rounded-full border border-[#e8c878] bg-[#fff7df] px-2.5 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#95610d]">
                      <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#c8780a]" />
                      {card.badge}
                    </div>
                  </div>

                  <div className="w-full md:w-[280px] lg:w-[390px] h-[160px] md:h-[200px] lg:h-[245px] rounded-[18px] lg:rounded-[24px] border border-[#ead8a8] bg-gradient-to-br from-[#fff8e7] to-[#f8e8bf] relative overflow-hidden flex items-center justify-center">
                    {!card.cta ? (
                      <>
                        <img
                          src={card.image}
                          alt={card.imageAlt}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3a2200]/35 via-transparent to-[#fff8e8]/10" />
                        <div className="absolute left-3 bottom-3 md:left-4 md:bottom-4 z-10 inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-white/60 bg-white/90 backdrop-blur-md px-2.5 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#4a2a00] shadow-sm">
                          <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#c8780a]" />
                          {card.badge}
                        </div>
                      </>
                    ) : (
                      <div className="text-center px-4 md:px-6">
                        <div className="mx-auto mb-3 md:mb-4 h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#fff7df] border border-[#e8c878] flex items-center justify-center text-[#b8860b] shadow-sm">
                          <MessageCircle size={24} className="md:w-7 md:h-7" strokeWidth={2.1} />
                        </div>
                        <p className="text-[9px] md:text-[10px] font-bold tracking-[0.22em] uppercase text-[#b8860b]">
                          Elevion Media
                        </p>
                        <p className="mt-1 md:mt-2 text-base md:text-xl font-bold text-[#3a2200]">
                          WhatsApp
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 md:mt-8 lg:pr-10">
                  <p className="text-[10px] md:text-sm font-bold tracking-[0.14em] uppercase text-[#b8860b]">
                    Spiritual Digital Growth
                  </p>
                  <h3 className="mt-1 md:mt-2 text-2xl md:text-4xl lg:text-[42px] font-bold text-[#2a1800] tracking-tight leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 md:mt-4 max-w-2xl text-sm md:text-lg lg:text-xl leading-relaxed text-[#6f604e]">
                    {card.desc}
                  </p>

                  {card.cta && (
                    <button
                      type="button"
                      className="mt-4 md:mt-6 inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full border border-[#b8860b] bg-gradient-to-r from-[#b8860b] to-[#d4a017] px-5 py-2.5 md:px-6 md:py-3 text-sm font-bold text-white shadow-[0_6px_18px_rgba(184,134,11,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <MessageCircle size={17} strokeWidth={2.2} />
                      Try Now For Free
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ElevionMediaScroll;