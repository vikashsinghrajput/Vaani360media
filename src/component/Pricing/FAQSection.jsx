import { useState } from "react";
import { ChevronRight, Plus, CalendarCheck } from "lucide-react";
import BookDemoModal from "../Layout/BookDemoModal";

/**
 * FAQSection — Liquid Glass edition
 * Desktop: question list + answer panel. Mobile: smooth accordion.
 * Palette: brand orange #F15A05 + charcoal on the site's existing cream background.
 */

const faqs = [
  {
    q: "What services does Vaani360 Media provide?",
    a: "Vaani360 Media helps devotional and spiritual brands build a strong digital presence through social media management, video editing, graphic design, website design, product photography, content creation, SEO and paid advertising.",
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
    q: "How do I get started with Vaani360 Media?",
    a: "Click Book Free Strategy Call and our existing booking form will open. We can understand your brand, current digital presence, goals and requirements, then suggest the right growth plan for you.",
  },
  {
    q: "How long does it take to see results?",
    a: "The timeline depends on the service and starting point. Paid advertising can produce data and results quickly, while organic social media, SEO and brand growth usually require consistent content, testing and optimization over time.",
  },
];

function Mandala({ size, opacity, reverse = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      style={{
        width: size,
        height: size,
        opacity,
        animation: `lgSpin ${reverse ? "100s" : "80s"} linear infinite ${reverse ? "reverse" : ""}`,
      }}
    >
      {[0, 30, 60, 90, 120, 150].map((d, i) => (
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

function BookButton({ onClick, full = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#FF7A21] to-[#F15A05] px-6 py-3 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_28px_-10px_rgba(241,90,5,0.65)] transition-all duration-200 hover:brightness-105 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F15A05] ${
        full ? "w-full" : ""
      }`}
    >
      <CalendarCheck size={17} />
      Book free strategy call
    </button>
  );
}

function DesktopLayout({ active, setActive, onBook }) {
  const current = faqs[active] ?? faqs[0];
  return (
    <div className="hidden items-stretch gap-6 lg:grid lg:grid-cols-[1fr_1.05fr]">
      {/* Questions */}
      <div className="lg-glass relative flex flex-col gap-1.5 rounded-[32px] p-3">
        {faqs.map((faq, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`relative z-10 flex w-full items-center gap-3 rounded-[22px] px-5 py-4 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#F15A05] ${
                isActive
                  ? "bg-white/90 shadow-[inset_0_1px_0_#fff,0_8px_24px_-10px_rgba(120,50,10,0.35)]"
                  : "hover:bg-white/50"
              }`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${
                  isActive ? "scale-125 bg-[#F15A05]" : "bg-black/15"
                }`}
              />
              <span
                className={`flex-1 text-[15px] leading-snug tracking-[-0.01em] transition-colors ${
                  isActive ? "font-semibold text-[#222]" : "font-medium text-[#222]/70"
                }`}
              >
                {faq.q}
              </span>
              <ChevronRight
                size={18}
                className={`shrink-0 transition-all duration-300 ${
                  isActive ? "translate-x-0.5 text-[#F15A05]" : "text-black/25"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Answer */}
      <div className="lg-glass lg-main relative flex min-h-[560px] flex-col overflow-hidden rounded-[32px]">
        <div className="relative z-10 flex flex-1 flex-col justify-center px-11 py-12">
          <div key={active} className="lg-in">
            <h3 className="text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.15] tracking-[-0.025em] text-[#222]">
              {current.q}
            </h3>
            <p className="mt-6 text-[17px] leading-[1.7] text-[#222]/75">{current.a}</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] bg-white/40 px-11 py-6">
          <p className="text-[14px] text-[#6b6259]">Still have questions? We're here to guide you.</p>
          <BookButton onClick={onBook} />
        </div>
      </div>
    </div>
  );
}

function MobileLayout({ active, setActive, onBook }) {
  return (
    <div className="lg:hidden">
      <div className="lg-glass relative flex flex-col gap-2 rounded-[28px] p-2.5">
        {faqs.map((faq, i) => {
          const isOpen = active === i;
          return (
            <div
              key={i}
              className={`relative z-10 overflow-hidden rounded-[20px] transition-all duration-300 ${
                isOpen
                  ? "bg-white/90 shadow-[inset_0_1px_0_#fff,0_8px_24px_-10px_rgba(120,50,10,0.35)]"
                  : "bg-white/40"
              }`}
            >
              <button
                onClick={() => setActive(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-[#F15A05]"
              >
                <span
                  className={`flex-1 text-[15px] leading-snug tracking-[-0.01em] ${
                    isOpen ? "font-semibold text-[#222]" : "font-medium text-[#222]/80"
                  }`}
                >
                  {faq.q}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-[#F15A05] text-white" : "bg-black/[0.06] text-[#222]"
                  }`}
                >
                  <Plus size={16} strokeWidth={2.5} />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-5 pr-6 text-[15px] leading-[1.7] text-[#222]/75">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="relative z-10 mt-1 flex flex-col gap-3 rounded-[20px] bg-white/60 p-4">
          <p className="text-[14px] text-[#6b6259]">Still have questions? We're here to guide you.</p>
          <BookButton onClick={onBook} full />
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [active, setActive] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="lg-section relative w-full overflow-hidden bg-[#FDFAF3] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <style>{`
        .lg-section { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Segoe UI", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        .lg-glass {
          background: linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0.5) 100%);
          -webkit-backdrop-filter: blur(30px) saturate(190%);
          backdrop-filter: blur(30px) saturate(190%);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.95),
            inset 0 -1px 0 rgba(255,255,255,0.35),
            inset 1px 0 0 rgba(255,255,255,0.4),
            0 1px 2px rgba(60,40,10,0.06),
            0 24px 48px -16px rgba(120,50,10,0.22);
        }
        .lg-glass::before {
          content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background:
            radial-gradient(120% 70% at 12% -10%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 55%),
            linear-gradient(115deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 60%);
          mix-blend-mode: soft-light;
        }
        .lg-main { box-shadow:
            inset 0 1.5px 0 #fff,
            inset 0 -1px 0 rgba(255,255,255,0.4),
            0 2px 4px rgba(60,40,10,0.05),
            0 40px 80px -24px rgba(120,50,10,0.32); }
        .lg-in { animation: lgIn .55s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes lgSpin { to { transform: rotate(360deg); } }
        @keyframes lgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .lg-orb { position: absolute; border-radius: 9999px; filter: blur(70px); pointer-events: none; }
        @media (prefers-reduced-motion: reduce) { .lg-in { animation: none; } .lg-section svg { animation: none !important; } }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .lg-glass { background: rgba(255,255,255,0.88); }
        }
      `}</style>

      {/* Original site background: dot pattern, corner mandalas, glow orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: "radial-gradient(circle, #C8A050 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -left-12 -top-12">
        <Mandala size={200} opacity={0.07} />
      </div>
      <div className="pointer-events-none absolute -bottom-12 -right-12">
        <Mandala size={170} opacity={0.06} reverse />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-[260px] w-[400px] rounded-full bg-[#FFE090]/[0.14] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[220px] w-[340px] rounded-full bg-[#F5C07A]/10 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center sm:mb-16">
          <h2 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#222] sm:text-[52px]">
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#6b6259] sm:text-[18px]">
            Clear answers on how we help your spiritual brand grow online.
          </p>
        </div>

        <MobileLayout active={active} setActive={setActive} onBook={() => setDemoOpen(true)} />
        <DesktopLayout active={active} setActive={setActive} onBook={() => setDemoOpen(true)} />

        <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      </div>
    </section>
  );
}