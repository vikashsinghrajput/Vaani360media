import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Youtube } from "lucide-react";
import logo from "../../assets/logo.png";
import BookDemoModal from "./BookDemoModal";
import { FaWhatsapp } from "react-icons/fa";
import Calendar from "../../assets/Calendar/CalendarSep.png";
import importantdays from "../../assets/Calendar/important days.png";

/* =========================================================
   ELEVION MEDIA — NAVBAR · LIQUID GLASS
   ========================================================= */

// images array component ke bahar: stable reference
const CAROUSEL_IMAGES = [Calendar, importantdays];

const SLIDE_INTERVAL_MS = 1100; // autoplay speed
const SLIDE_TRANSITION_MS = 450; // slide animation

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/vaani360media/", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/share/1FEg5U9GaP/", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@Vaani360media", Icon: Youtube },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.+I%E2%80%99d+like+to+know+more+about+your+services+and+growth+solutions.&type=phone_number&app_absent=0";

const serviceLinks = [
  { icon: "🎬", title: "Video Editing", to: "/services/video-editing" },
  { icon: "🎨", title: "Graphic Design", to: "/services/graphic-design" },
  { icon: "📱", title: "Social Media Marketing", to: "/services/social-media-marketing" },
  { icon: "💻", title: "Website / Web Dev", to: "/services/web-development" },
];

const mobileLinks = [
  { title: "Home", to: "/" },
  { title: "Services", to: "/services" },
  { title: "Pricing", to: "/pricing" },
  { title: "Contact Us", to: "/contact" },
];

/* =========================================================
   STYLES
   ========================================================= */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');

.nv-head {
  --ink: #1D1710; --ink-2: #5E5143; --ink-3: #8F8070;
  --saffron: #F28C28; --saffron-deep: #D96F0B;
  --edge: rgba(255,255,255,.78);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased; color: var(--ink);
  --slot: 64px; --bar: 64px;
  position: sticky; top: 0; z-index: 60; padding: 12px 14px 0; pointer-events: none;
}
.nv-head *, .nv-head *::before, .nv-head *::after { box-sizing: border-box; }
.nv-head a { text-decoration: none; color: inherit; }
.nv-head button { font-family: inherit; }
.nv-head a:focus-visible, .nv-head button:focus-visible { outline: 2px solid var(--saffron-deep); outline-offset: 3px; }

.nv-wrap { position: relative; margin: 0 auto; max-width: 1280px; height: var(--slot); display: flex; align-items: center; pointer-events: auto; }

/* glass surface */
.nv-glass {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,.66), rgba(255,255,255,.4));
  -webkit-backdrop-filter: blur(28px) saturate(185%); backdrop-filter: blur(28px) saturate(185%);
  border: 1px solid var(--edge);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 -1px 0 rgba(255,255,255,.25) inset, 0 10px 40px rgba(120,70,20,.13);
}
.nv-glass::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 45%); mix-blend-mode: soft-light;
}
.nv-bar { transition: max-width .5s cubic-bezier(.2,.8,.2,1), background .4s, box-shadow .4s; }
/* top of the page: plain glass, no drop shadow */
.nv-head:not(.scrolled) .nv-bar { box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 -1px 0 rgba(255,255,255,.25) inset; }
/* after scrolling: slightly narrower, shadow appears */
.nv-head.scrolled .nv-bar { max-width: 1160px; background: linear-gradient(135deg, rgba(255,255,255,.78), rgba(255,255,255,.55)); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 14px 44px rgba(120,70,20,.18); }
.nv-bar { width: 100%; max-width: 1280px; margin: 0 auto; height: var(--bar); border-radius: 999px; display: flex; align-items: center; gap: 14px; padding: 0 10px 0 22px; }
.nv-logo { display: flex; align-items: center; flex: none; }
.nv-logo img { width: clamp(130px, 14vw, 178px); height: auto; display: block; }

.nv-nav { display: none; align-items: center; gap: 2px; margin: 0 auto; }
.nv-link {
  position: relative; display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 0; background: transparent; cursor: pointer;
  font-size: 14px; font-weight: 500; letter-spacing: -.01em; color: var(--ink-2); transition: background .25s, color .25s, box-shadow .25s;
}
.nv-link:hover { background: rgba(255,255,255,.55); color: var(--ink); }
.nv-link.active, .nv-link.open { color: var(--ink); font-weight: 600; background: rgba(255,255,255,.82); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 4px 14px rgba(120,70,20,.12); }
.nv-chev { transition: transform .3s cubic-bezier(.2,.8,.2,1); color: var(--ink-3); }
.nv-link.open .nv-chev { transform: rotate(180deg); }

.nv-right { display: none; align-items: center; gap: 8px; flex: none; }
.nv-soc {
  width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; color: var(--ink-2); flex: none;
  background: rgba(255,255,255,.5); border: 1px solid rgba(255,255,255,.85); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset;
  transition: transform .2s, background .2s, color .2s;
}
.nv-soc:hover { transform: translateY(-1px) scale(1.05); background: #fff; color: var(--saffron-deep); }

.nv-cta {
  border: 0; cursor: pointer; border-radius: 999px; font-size: 13.5px; font-weight: 600; letter-spacing: -.005em; color: #fff; padding: 11px 22px; white-space: nowrap;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(180deg, #F89A3E, var(--saffron-deep));
  box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 8px 22px rgba(217,111,11,.32);
  transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s;
}
.nv-cta:hover { transform: translateY(-1px) scale(1.02); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 12px 28px rgba(217,111,11,.4); }
.nv-cta:active { transform: scale(.97); }
.nv-cta.sm { padding: 9px 18px; font-size: 12.5px; }
.nv-cta.ghost { color: var(--ink); background: rgba(255,255,255,.6); border: 1px solid rgba(255,255,255,.9); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 6px 18px rgba(120,70,20,.12); }
.nv-cta.wa { background: linear-gradient(180deg, #34D07A, #12A150); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 8px 22px rgba(18,161,80,.3); }

/* mobile controls */
.nv-mob { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.nv-mob .nv-soc { width: 32px; height: 32px; }
.nv-burger {
  width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; padding: 0; color: var(--ink);
  background: rgba(255,255,255,.72); border: 1px solid rgba(255,255,255,.95); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 6px 18px rgba(120,70,20,.14);
  transition: transform .2s;
}
.nv-burger:active { transform: scale(.93); }

/* mega panel (desktop) */
.nv-panel {
  position: absolute; left: 0; right: 0; margin-inline: auto; width: min(1120px, 100%); top: calc(100% + 8px); border-radius: 34px; padding: 22px;
  display: grid; grid-template-columns: 1.05fr 1fr; gap: 20px; animation: nvDrop .32s cubic-bezier(.2,.9,.25,1.05); transform-origin: top center;
}
.nv-panel::after { content: ''; position: absolute; left: 0; right: 0; top: -16px; height: 16px; } /* hover bridge */
@keyframes nvDrop { from { opacity: 0; transform: translateY(-10px) scale(.985); } }

.nv-eyebrow { display: flex; align-items: center; gap: 10px; margin: 2px 4px 16px; font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--saffron-deep); }
.nv-eyebrow i { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(201,162,39,.5), transparent); }
.nv-services { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.nv-card {
  display: flex; align-items: center; gap: 13px; padding: 14px; border-radius: 22px; background: rgba(255,255,255,.5); border: 1px solid rgba(255,255,255,.85);
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset; transition: transform .25s cubic-bezier(.2,.8,.2,1), background .25s, box-shadow .25s;
}
.nv-card:hover { transform: translateY(-2px); background: rgba(255,255,255,.88); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 14px 30px rgba(120,70,20,.16); }
.nv-tile { width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center; font-size: 21px; flex: none; background: linear-gradient(145deg, #F6B04A, #D96F0B); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 6px 14px rgba(217,111,11,.28); }
.nv-card b { font-size: 13.5px; font-weight: 600; letter-spacing: -.01em; line-height: 1.3; }

/* calendar card */
.nv-cal { border-radius: 26px; padding: 12px; background: rgba(255,255,255,.5); border: 1px solid rgba(255,255,255,.85); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.nv-slides { position: relative; height: 200px; border-radius: 20px; overflow: hidden; background: #FFFBF0; }
.nv-track { display: flex; height: 100%; }
.nv-slide { height: 100%; flex: none; }
.nv-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
.nv-dots { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; padding: 6px 9px; border-radius: 999px; background: rgba(255,255,255,.5); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,.7); }
.nv-dot { border: 0; padding: 0; height: 6px; width: 6px; border-radius: 999px; background: rgba(94,81,67,.35); cursor: pointer; transition: width .3s cubic-bezier(.2,.8,.2,1), background .3s; }
.nv-dot.on { width: 18px; background: var(--saffron-deep); }
.nv-calfoot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 4px 2px; }
.nv-calfoot h4 { margin: 0; font-size: 15px; font-weight: 700; letter-spacing: -.01em; }
.nv-calfoot h4 span { color: var(--saffron-deep); }
.nv-calfoot p { margin: 2px 0 0; font-size: 12.5px; color: var(--ink-3); }

/* mobile sheet */
.nv-sheet { position: absolute; left: 0; right: 0; top: calc(100% + 8px); border-radius: 30px; padding: 12px; max-height: calc(100dvh - 100px); overflow-y: auto; animation: nvDrop .3s cubic-bezier(.2,.9,.25,1.05); overscroll-behavior: contain; }
.nv-mlink { display: flex; align-items: center; justify-content: space-between; padding: 15px 16px; border-radius: 20px; font-size: 19px; font-weight: 600; letter-spacing: -.02em; color: var(--ink); transition: background .2s; }
.nv-mlink:hover, .nv-mlink:active { background: rgba(255,255,255,.55); }
.nv-mlink.active { background: rgba(255,255,255,.85); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 6px 18px rgba(120,70,20,.1); }
.nv-mlink .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--saffron-deep); }
.nv-msep { height: 1px; margin: 10px 16px; background: linear-gradient(90deg, rgba(201,162,39,.45), transparent); }
.nv-mbtns { display: flex; gap: 10px; padding: 6px 4px 4px; }
.nv-mbtns .nv-cta { flex: 1; padding: 13px 10px; }

@media (min-width: 768px) {
  .nv-nav { display: flex; }
  .nv-right { display: flex; }
  .nv-mob, .nv-sheet { display: none; }
  .nv-bar { padding-left: 26px; }
}
@media (max-width: 1020px) and (min-width: 768px) { .nv-right .nv-soc { display: none; } .nv-link { padding: 9px 12px; } }
@media (max-width: 900px) { .nv-panel { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .nv-head *, .nv-panel, .nv-sheet { animation: none !important; transition: none !important; } }
@media (prefers-reduced-transparency: reduce) { .nv-glass, .nv-dots { -webkit-backdrop-filter: none; backdrop-filter: none; background: rgba(255,255,255,.94); } }
`;

/* =========================================================
   SMALL PIECES
   ========================================================= */

const Chevron = () => (
  <svg className="nv-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Card = ({ icon, title, to, onNavigate }) => (
  <Link to={to} onClick={onNavigate} className="nv-card">
    <span className="nv-tile" aria-hidden="true">{icon}</span>
    <b>{title}</b>
  </Link>
);

/* =========================================================
   NAVBAR
   ========================================================= */

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [slide, setSlide] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);

  // dropdown sirf real mouse/hover device pe (mobile "Desktop Site" mode me nahi)
  const [isFinePointer, setIsFinePointer] = useState(true);

  const intervalRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((was) => (was ? y > 8 : y > 40));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsFinePointer(mq.matches);
    const handler = (e) => setIsFinePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // autoplay sirf dropdown open hone par; hamesha slide 0 se
  useEffect(() => {
    if (!showSolutions) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    setSlide(0);
    intervalRef.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, [showSolutions]);

  // Esc closes everything
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowSolutions(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = ({ isActive }) => `nv-link ${isActive ? "active" : ""}`;
  const n = CAROUSEL_IMAGES.length;

  return (
    <>
      <style>{STYLES}</style>

      <header className={`nv-head ${scrolled ? "scrolled" : ""}`}>
        <div
          className="nv-wrap"
          onMouseLeave={() => setShowSolutions(false)}
        >
          {/* ===== BAR ===== */}
          <div className="nv-bar nv-glass">
            <Link to="/" className="nv-logo" aria-label="Elevion Media home" onClick={() => setOpen(false)}>
              <img src={logo} alt="Elevion Media" />
            </Link>

            {/* desktop nav */}
            <nav className="nv-nav" aria-label="Main">
              <NavLink to="/" end className={linkClass}>Home</NavLink>

              <NavLink
                to="/services"
                className={({ isActive }) => `nv-link ${isActive ? "active" : ""} ${showSolutions ? "open" : ""}`}
                aria-haspopup="true"
                aria-expanded={showSolutions}
                onMouseEnter={() => { if (isFinePointer) setShowSolutions(true); }}
                onFocus={() => { if (isFinePointer) setShowSolutions(true); }}
              >
                Services <Chevron />
              </NavLink>

              <NavLink to="/pricing" className={linkClass}>Pricing</NavLink>
              <NavLink to="/contact" className={linkClass}>Contact Us</NavLink>
            </nav>

            {/* desktop right */}
            <div className="nv-right">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Elevion Media ${label}`} title={label} className="nv-soc">
                  <Icon size={16} strokeWidth={2.1} />
                </a>
              ))}
              <button className="nv-cta" onClick={() => setDemoOpen(true)}>Book Demo</button>
            </div>

            {/* mobile controls */}
            <div className="nv-mob">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Elevion Media ${label}`} title={label} className="nv-soc">
                  <Icon size={14} strokeWidth={2.2} />
                </a>
              ))}
              <button
                className="nv-burger"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* ===== SERVICES MEGA PANEL ===== */}
          {showSolutions && (
            <div className="nv-panel nv-glass">
              <div>
                <div className="nv-eyebrow">Services <i /></div>
                <div className="nv-services">
                  {serviceLinks.map((s) => (
                    <Card key={s.title} icon={s.icon} title={s.title} to={s.to} onNavigate={() => setShowSolutions(false)} />
                  ))}
                </div>
              </div>

              <div className="nv-cal">
                <div className="nv-slides">
                  <div
                    className="nv-track"
                    style={{
                      width: `${n * 100}%`,
                      transform: `translateX(-${slide * (100 / n)}%)`,
                      transition: `transform ${SLIDE_TRANSITION_MS}ms cubic-bezier(.4,0,.2,1)`,
                    }}
                  >
                    {CAROUSEL_IMAGES.map((image, index) => (
                      <div key={index} className="nv-slide" style={{ width: `${100 / n}%` }}>
                        <img src={image} alt={`service slide ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  <div className="nv-dots">
                    {CAROUSEL_IMAGES.map((_, index) => (
                      <button
                        key={index}
                        className={`nv-dot ${slide === index ? "on" : ""}`}
                        onClick={() => setSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="nv-calfoot">
                  <div>
                    <h4>हिन्दू कैलेंडर <span>सितम्बर</span></h4>
                    <p>विक्रम संवत् 2083</p>
                  </div>
                  <button className="nv-cta sm" onClick={() => { setShowSolutions(false); setDemoOpen(true); }}>
                    Book Demo →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== MOBILE SHEET ===== */}
          {open && (
            <div className="nv-sheet nv-glass">
              {mobileLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `nv-mlink ${isActive ? "active" : ""}`}
                >
                  {({ isActive }) => (
                    <>
                      {link.title}
                      {isActive && <span className="dot" />}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="nv-msep" />

              <div className="nv-mbtns">
                <button className="nv-cta ghost" onClick={() => { setOpen(false); setDemoOpen(true); }}>
                  Book Demo
                </button>
                <a className="nv-cta wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                  <FaWhatsapp size={17} /> Chat
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
};

export default Navbar;