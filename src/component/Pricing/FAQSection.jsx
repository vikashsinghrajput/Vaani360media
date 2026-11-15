import { useState } from "react";
import BookDemoModal from "../Layout/BookDemoModal";

const faqs = [
  {
    q: "What services does Elevion Media provide?",
    a: "Elevion Media helps devotional and spiritual brands build a strong digital presence through social media management, video editing, graphic design, website design, product photography, content creation, SEO and paid advertising.",
  },
  {
    q: "Do you manage social media for spiritual brands?",
    a: "Yes. We can handle the complete social media workflow — content planning, creative posts, reels, captions, publishing, audience engagement and growth-focused strategy for Instagram, Facebook, YouTube and other relevant platforms.",
  },
  {
    q: "Do you run Google and Meta Ads?",
    a: "Yes. We run targeted Google Ads, YouTube Ads, Facebook Ads and Instagram Ads. Campaigns are planned around your audience, offer and goals, then optimized for reach, leads, conversions and efficient ad spend.",
  },
  {
    q: "Can you edit devotional and spiritual videos?",
    a: "Yes. We create and edit devotional reels, shorts, YouTube videos, darbar highlights, katha videos and other spiritual content with clean cuts, subtitles, music, storytelling and platform-friendly formats.",
  },
  {
    q: "Do you create posters, thumbnails and social media creatives?",
    a: "Yes. Our graphic design work includes devotional posters, event creatives, YouTube thumbnails, Instagram posts, campaign creatives and brand visuals designed to keep your spiritual brand consistent and professional.",
  },
  {
    q: "Can you build a website for my guru or spiritual brand?",
    a: "Yes. We design modern, responsive websites for gurus, spiritual creators, devotional organizations and spiritual businesses with clear messaging, strong visuals and conversion-focused sections.",
  },
  {
    q: "How do I get started with Elevion Media?",
    a: "Click Book Free Strategy Call and our existing booking form will open. We can understand your brand, current digital presence, goals and requirements, then suggest the right growth plan for you.",
  },
  {
    q: "How long does it take to see results?",
    a: "The timeline depends on the service and starting point. Paid advertising can produce data and results quickly, while organic social media, SEO and brand growth usually require consistent content, testing and optimization over time.",
  },
];

/* ── MANDALA ── */
function Mandala({ size, opacity, reverse = false }) {
  return (
    <svg viewBox="0 0 120 120"
      style={{ width: size, height: size, opacity, pointerEvents: "none",
        animation: `spin ${reverse ? "100s" : "80s"} linear infinite ${reverse ? "reverse" : ""}` }}>
      {[0,30,60,90,120,150].map((d,i) => (
        <g key={i} transform={`rotate(${d} 60 60)`}>
          <ellipse cx="60" cy="13" rx="5" ry="13" fill="#B8860B" />
          <ellipse cx="60" cy="107" rx="5" ry="13" fill="#B8860B" />
        </g>
      ))}
      <circle cx="60" cy="60" r="18" fill="none" stroke="#B8860B" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="5" fill="#B8860B" />
    </svg>
  );
}

/* ── DESKTOP: side-by-side layout ── */
function DesktopLayout({ active, setActive, onBook }) {
  return (
    <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">

      {/* LEFT: FAQ watermark + list */}
      <div className="relative bg-gradient-to-br from-[#F5EDD8] to-[#FBF3DC]
        border border-[#E8C878]/60 rounded-3xl overflow-hidden
        shadow-[0_8px_32px_rgba(184,134,11,0.1)]">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E8C878] to-transparent" />

        {/* FAQ watermark */}
        <div className="px-7 pt-6 pb-2 relative">
          <p className="text-[110px] font-black leading-none select-none
            text-[#E8C878]/35 [font-family:'Cinzel',serif] tracking-wide">
            FAQ
          </p>
          <div className="absolute top-5 right-6 pointer-events-none opacity-[0.09]">
            <svg viewBox="0 0 80 80" className="w-20 h-20 animate-[spin_60s_linear_infinite]">
              {[0,45,90,135].map((d,i) => (
                <g key={i} transform={`rotate(${d} 40 40)`}>
                  <ellipse cx="40" cy="8" rx="4" ry="9" fill="#B8860B" />
                </g>
              ))}
              <circle cx="40" cy="40" r="10" fill="none" stroke="#B8860B" strokeWidth="1" />
              <circle cx="40" cy="40" r="4" fill="#B8860B" />
            </svg>
          </div>
        </div>

        {/* Question list */}
        <div className="px-5 pb-7 flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isActive = active === i;
            return (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full flex items-center gap-4 text-left px-4 py-4 rounded-2xl
                  transition-all duration-200 group
                  ${isActive
                    ? "bg-[#FFFBF0] border border-[#B8860B] shadow-[0_4px_18px_rgba(184,134,11,0.15)]"
                    : "bg-[#FFFBF0]/50 border border-transparent hover:border-[#E8C878]/60 hover:bg-[#FFFBF0]/80"}`}>
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200
                  ${isActive
                    ? "border-[#B8860B] bg-gradient-to-br from-[#C8780A] to-[#B8860B]"
                    : "border-[#D4B060]/50 bg-white group-hover:border-[#E8C878]"}`}>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className={`text-[13.5px] flex-1 leading-snug [font-family:'Cinzel',serif] font-semibold tracking-wide transition-colors duration-200
                  ${isActive ? "text-[#C8780A]" : "text-[#5C4020] group-hover:text-[#1A1008]"}`}>
                  {faq.q}
                </span>
                <span className={`text-sm flex-shrink-0 transition-all duration-200
                  ${isActive ? "text-[#B8860B]" : "text-[#D4B060] group-hover:text-[#B8860B]"}`}>
                  {isActive ? "▾" : "›"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Answer panel */}
      <div className="relative bg-[#FFFBF0] border border-[#E8C878]/60 rounded-3xl
        overflow-hidden min-h-[560px] flex flex-col
        shadow-[0_12px_48px_rgba(184,134,11,0.12)]">
        <div className="h-[3px] bg-gradient-to-r from-[#C8780A] via-[#E8C878] to-[#B8860B]" />

        <div className="absolute top-4 right-4 pointer-events-none">
          <svg viewBox="0 0 60 60" className="w-14 h-14 opacity-[0.07] animate-[spin_90s_linear_infinite_reverse]">
            {[0,30,60,90,120,150].map((d,i) => (
              <g key={i} transform={`rotate(${d} 30 30)`}>
                <ellipse cx="30" cy="6" rx="3" ry="7" fill="#B8860B" />
              </g>
            ))}
            <circle cx="30" cy="30" r="8" fill="none" stroke="#B8860B" strokeWidth="1" />
            <circle cx="30" cy="30" r="3" fill="#B8860B" />
          </svg>
        </div>

        <div className="flex-1 flex flex-col justify-center px-10 py-14">
          <div className="inline-flex items-center gap-2 mb-6 self-start">
            <div className="bg-gradient-to-r from-[#C8780A] to-[#B8860B] text-[#FFF8E8]
              text-[10px] font-black px-4 py-1.5 rounded-full [font-family:'Cinzel',serif]
              tracking-[0.2em] shadow-[0_3px_10px_rgba(200,120,10,0.35)]">
              Q {String(active + 1).padStart(2, "0")}
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-[#E8C878] to-transparent" />
            <span className="text-[10px] text-[#B8860B] tracking-[0.2em] [font-family:'Cinzel',serif] uppercase">Answer</span>
          </div>

          <h3 className="text-[clamp(20px,2.2vw,28px)] font-black text-[#1A1008]
            [font-family:'Cinzel',serif] tracking-tight leading-tight mb-5">
            {faqs[active].q}
          </h3>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-10 bg-gradient-to-r from-[#C8780A] to-[#E8C878] rounded-full" />
            <span className="text-[#E8C878] text-xs">✦</span>
          </div>

          <p className="text-[16px] text-[#5C4020] leading-[1.9] [font-family:'Cormorant_Garamond',serif] font-medium">
            {faqs[active].a}
          </p>
        </div>

        <div className="border-t border-[#E8C878]/40 px-10 py-5
          bg-gradient-to-r from-[#FBF3DC]/60 to-[#FFFBF0]
          flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[12px] text-[#9E7840] italic [font-family:'Cormorant_Garamond',serif]">
            Still have questions? We're here to guide you.
          </p>
          <button
            type="button"
            onClick={onBook}
            className="relative overflow-hidden bg-gradient-to-r from-[#C8780A] to-[#B8860B]
            text-[#FFF8E8] font-bold text-[12px] px-6 py-2.5 rounded-full
            [font-family:'Cinzel',serif] tracking-wider
            hover:shadow-[0_6px_22px_rgba(200,120,10,0.45)] hover:-translate-y-0.5
            transition-all duration-200 group flex-shrink-0"
          >
            <span className="relative z-10 flex items-center gap-2">🪔 Book Free Strategy Call</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── MOBILE/TABLET: accordion — exactly like reference image ── */
function MobileLayout({ active, setActive, onBook }) {
  return (
    <div className="lg:hidden">

      {/* Outer card — reference ka light warm rounded card */}
      <div className="relative bg-gradient-to-br from-[#F5EDD8] to-[#FBF3DC]
        border border-[#E8C878]/60 rounded-3xl overflow-hidden
        shadow-[0_8px_36px_rgba(184,134,11,0.13)]">

        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E8C878] to-transparent" />

        {/* FAQ big watermark — top of card exactly like reference */}
        <div className="relative px-6 pt-5 pb-0 overflow-hidden select-none">
          <p className="text-[clamp(68px,21vw,104px)] font-black leading-[0.9]
            text-[#D4A85A]/30 [font-family:'Cinzel',serif] tracking-wider">
            FAQ
          </p>
          <div className="absolute top-3 right-5 pointer-events-none opacity-[0.08]">
            <svg viewBox="0 0 70 70" className="w-14 h-14 animate-[spin_60s_linear_infinite]">
              {[0,45,90,135].map((d,i)=>(
                <g key={i} transform={`rotate(${d} 35 35)`}>
                  <ellipse cx="35" cy="7" rx="3" ry="8" fill="#B8860B"/>
                </g>
              ))}
              <circle cx="35" cy="35" r="9" fill="none" stroke="#B8860B" strokeWidth="1"/>
              <circle cx="35" cy="35" r="3.5" fill="#B8860B"/>
            </svg>
          </div>
        </div>

        {/* ── ACCORDION LIST ── */}
        <div className="px-3 pt-4 pb-5 flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = active === i;
            return (
              <div key={i} className="overflow-hidden rounded-2xl
                transition-shadow duration-300"
                style={{ boxShadow: isOpen ? "0 4px 20px rgba(184,134,11,0.18)" : "none" }}>

                {/* ── QUESTION ROW ── */}
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className={`w-full flex items-center gap-3 px-4 py-[14px] text-left
                    transition-all duration-200
                    ${isOpen
                      ? "bg-[#FFFBF0] border border-[#B8860B] rounded-t-2xl border-b-0"
                      : "bg-[#FFFBF0]/80 border border-[#E8C878]/50 rounded-2xl hover:border-[#C8A050]/70"
                    }`}
                >
                  {/* Radio dot — filled saffron when open, grey ring when closed */}
                  <div className={`w-[22px] h-[22px] rounded-full flex-shrink-0
                    flex items-center justify-center border-2 transition-all duration-200
                    ${isOpen
                      ? "border-[#B8860B] bg-gradient-to-br from-[#C8780A] to-[#B8860B] shadow-[0_2px_8px_rgba(200,120,10,0.45)]"
                      : "border-[#C8A878]/50 bg-[#F5EDD8]"
                    }`}>
                    {isOpen && <div className="w-[7px] h-[7px] rounded-full bg-white" />}
                  </div>

                  {/* Question text */}
                  <span className={`flex-1 text-[13px] leading-snug font-bold
                    [font-family:'Cinzel',serif] tracking-wide transition-colors duration-200
                    ${isOpen ? "text-[#C8780A]" : "text-[#5C4020]"}`}>
                    {faq.q}
                  </span>

                  {/* Arrow — ▾ when open, › when closed  */}
                  <span className={`flex-shrink-0 font-bold transition-all duration-300 text-[18px]
                    ${isOpen ? "text-[#B8860B]" : "text-[#C8A878]"}`}>
                    {isOpen ? "▾" : "›"}
                  </span>
                </button>

                {/* ── ANSWER PANEL — expands below question row ── */}
                {isOpen && (
                  <div className="bg-[#FFFBF0] border border-[#B8860B] border-t-0
                    rounded-b-2xl px-5 pt-3 pb-5">
                    {/* Gold divider */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-[1.5px] w-8 bg-gradient-to-r from-[#C8780A] to-[#E8C878] rounded-full" />
                      <span className="text-[#E8C878] text-[10px]">✦</span>
                    </div>
                    <p className="text-[14.5px] text-[#5C4020] leading-[1.85]
                      [font-family:'Cormorant_Garamond',serif] font-medium">
                      {faq.a}
                    </p>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="mx-3 mb-5 p-4 rounded-2xl bg-[#FFFBF0]
          border border-[#E8C878]/60
          flex flex-col gap-3">
          <p className="text-[12px] text-[#9E7840] italic
            [font-family:'Cormorant_Garamond',serif]">
            Still have questions? We're here to guide you.
          </p>
          <button
            type="button"
            onClick={onBook}
            className="w-full bg-gradient-to-r from-[#C8780A] to-[#B8860B]
            text-[#FFF8E8] font-bold text-[13px] py-3 rounded-xl
            [font-family:'Cinzel',serif] tracking-wider text-center
            active:scale-95 transition-all duration-200
            shadow-[0_4px_16px_rgba(200,120,10,0.35)]"
          >
            🪔 Book Free Strategy Call
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── MAIN EXPORT ── */
export default function FAQSection() {
  const [active, setActive] = useState(2);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section
      className="relative bg-[#FDFAF3] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: "radial-gradient(circle, #C8A050 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

      {/* Corner mandalas */}
      <div className="absolute -top-12 -left-12 pointer-events-none">
        <Mandala size={200} opacity={0.07} />
      </div>
      <div className="absolute -bottom-12 -right-12 pointer-events-none">
        <Mandala size={170} opacity={0.06} reverse />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[260px] bg-[#FFE090]/14 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[340px] h-[220px] bg-[#F5C07A]/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1260px] mx-auto">

        {/* ── HEADING ── */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 bg-[#FBF3DC] border border-[#E8C878]
            rounded-full px-5 py-2 mb-5">
            <span className="text-sm">🪷</span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#B8860B] uppercase
              [font-family:'Cinzel',serif]">Sacred Knowledge</span>
            <span className="text-sm">🪷</span>
          </div>

          <h2 className="text-[clamp(26px,4.5vw,52px)] font-black text-[#1A1008]
            [font-family:'Cinzel',serif] tracking-tight leading-tight mb-4">
            Frequently Asked{" "}
            <span className="italic text-[#B8860B] [font-family:'Cormorant_Garamond',serif]">
              Questions
            </span>
          </h2>

          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E8C878]" />
            <span className="text-[#B8860B] text-base font-serif">ॐ</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E8C878]" />
          </div>

          <p className="text-[11px] sm:text-[13px] font-semibold tracking-[0.25em] text-[#C8780A] uppercase
            [font-family:'Cinzel',serif]">
            ✦ Clarity on your Digital Journey ✦
          </p>
        </div>

        {/* Layouts — mobile accordion / desktop side-by-side */}
        <MobileLayout active={active} setActive={setActive} onBook={() => setDemoOpen(true)} />
        <DesktopLayout active={active} setActive={setActive} onBook={() => setDemoOpen(true)} />

        {/* ── BOOKING MODAL ── */}
        <BookDemoModal
          isOpen={demoOpen}
          onClose={() => setDemoOpen(false)}
        />

        {/* ── MANTRA ── */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E8C878]" />
          <div className="flex items-center gap-2 bg-[#FBF3DC] border border-[#E8C878]/70
            rounded-full px-4 py-1.5">
            <span className="text-sm">🕉️</span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#7B1D1D] uppercase
              [font-family:'Cinzel',serif]">ज्ञानं परमं ध्येयम्</span>
            <span className="text-sm">🕉️</span>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#E8C878]" />
        </div>

      </div>
    </section>
  );
}