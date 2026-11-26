import React from "react";
import { PenTool, Code2, Hash, Camera, Video } from "lucide-react";
import CarStudio from "../Home/GraphicDesignSection";
import ElevionMedia from "../Home/SocialMedia";
import VideoEditingShowcase from "../Home/Productvideocarousel";
import SpiritualProjectsSection from "../Pricing/ProjectsSection";

/**
 * Elevion Media — Hero (Liquid Glass / Premium)
 * Brand colors from logo: Orange #F25400 · Charcoal #232323
 * Background & content unchanged.
 */

const orbitNodes = [
  { label: "Social Media", sub: "Content & Growth", icon: Hash, angle: 0 },
  { label: "Video Editing", sub: "Reels, Shorts & Videos", icon: Video, angle: 72 },
  { label: "Graphic Design", sub: "Posters & Thumbnails", icon: PenTool, angle: 144 },
  { label: "Website Design", sub: "Modern & Responsive", icon: Code2, angle: 216 },
  { label: "Product Photography", sub: "Creative Visuals", icon: Camera, angle: 288 },
];

const pills = ["Spiritual Content", "Creative Branding", "Digital Growth"];

const stats = [
  { value: "360°", label: "DIGITAL SERVICES" },
  { value: "5+", label: "CORE SERVICES" },
  { value: "100%", label: "BRAND FOCUSED" },
  { value: "24×7", label: "DIGITAL PRESENCE" },
];

const radius = 240;

export default function HeroSection() {
  return (
    <>
      <section
        className="
          relative w-full overflow-hidden
          bg-gradient-to-b from-[#FFFDF8] via-white to-[#FFF7E8]
          px-6 py-20 md:px-14
        "
      >
        <style>{`
          @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes orbitCounterSpin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
          @keyframes glowDrift {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(24px, -18px) scale(1.06); }
          }

          .orbit-ring { animation: orbitSpin 36s linear infinite; }
          .orbit-card { animation: orbitCounterSpin 36s linear infinite; }
          .glow-blob { animation: glowDrift 14s ease-in-out infinite; }

          /* ---------- LIQUID GLASS ---------- */
          .glass {
            background: linear-gradient(
              135deg,
              rgba(255,255,255,0.72) 0%,
              rgba(255,255,255,0.38) 100%
            );
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            backdrop-filter: blur(24px) saturate(180%);
            border: 1px solid rgba(255,255,255,0.75);
            box-shadow:
              inset 0 1.5px 0 rgba(255,255,255,0.95),
              inset 0 -1px 0 rgba(242,84,0,0.06),
              0 1px 2px rgba(35,35,35,0.04),
              0 24px 60px -18px rgba(242,84,0,0.22),
              0 12px 30px -12px rgba(35,35,35,0.14);
            position: relative;
          }
          /* specular highlight on top edge */
          .glass::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(
              160deg,
              rgba(255,255,255,0.95),
              rgba(255,255,255,0) 40%,
              rgba(242,84,0,0.25) 100%
            );
            -webkit-mask:
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }

          .glass-tint {
            background: linear-gradient(
              135deg,
              rgba(242,84,0,0.14) 0%,
              rgba(255,255,255,0.45) 100%
            );
          }

          .glass-hover { transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease; }
          .glass-hover:hover { transform: translateY(-2px); }

          /* ---------- LIQUID GLASS BUTTON ---------- */
          .liquid-btn {
            --mx: 50%;
            --my: 50%;
            position: relative;
            isolation: isolate;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(255,255,255,0.8);
            background: linear-gradient(
              135deg,
              rgba(255,255,255,0.55) 0%,
              rgba(255,255,255,0.18) 50%,
              rgba(242,84,0,0.12) 100%
            );
            -webkit-backdrop-filter: blur(14px) saturate(200%) brightness(1.06);
            backdrop-filter: blur(14px) saturate(200%) brightness(1.06);
            box-shadow:
              inset 0 2px 1px rgba(255,255,255,0.95),
              inset 0 -3px 6px rgba(242,84,0,0.18),
              inset 2px 0 3px rgba(255,255,255,0.5),
              inset -2px 0 3px rgba(255,255,255,0.35),
              0 10px 24px -8px rgba(242,84,0,0.35),
              0 4px 10px -4px rgba(35,35,35,0.18);
            transition:
              transform .45s cubic-bezier(.34,1.56,.64,1),
              box-shadow .35s ease,
              background .35s ease;
          }
          /* liquid lens: wobbly refraction on supporting browsers */
          @supports (backdrop-filter: url(#liquid-distort)) {
            .liquid-btn {
              -webkit-backdrop-filter: url(#liquid-distort) blur(6px) saturate(200%);
              backdrop-filter: url(#liquid-distort) blur(6px) saturate(200%);
            }
          }
          /* light that follows the cursor */
          .liquid-btn::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            border-radius: inherit;
            background: radial-gradient(
              120px circle at var(--mx) var(--my),
              rgba(255,255,255,0.9),
              rgba(255,255,255,0) 65%
            );
            opacity: 0;
            transition: opacity .3s ease;
          }
          /* glossy top sheen */
          .liquid-btn::after {
            content: "";
            position: absolute;
            left: 8%;
            right: 8%;
            top: 2px;
            height: 45%;
            border-radius: 999px;
            background: linear-gradient(
              to bottom,
              rgba(255,255,255,0.85),
              rgba(255,255,255,0)
            );
            pointer-events: none;
            opacity: .7;
          }
          .liquid-btn:hover {
            transform: translateY(-3px) scale(1.06);
            background: linear-gradient(
              135deg,
              rgba(255,255,255,0.7) 0%,
              rgba(255,255,255,0.28) 50%,
              rgba(242,84,0,0.22) 100%
            );
            box-shadow:
              inset 0 2px 1px rgba(255,255,255,1),
              inset 0 -3px 8px rgba(242,84,0,0.28),
              0 18px 34px -10px rgba(242,84,0,0.5),
              0 6px 14px -6px rgba(35,35,35,0.2);
          }
          .liquid-btn:hover::before { opacity: 1; }
          .liquid-btn:active {
            transform: translateY(0) scale(0.96);
            transition-duration: .12s;
          }
          .liquid-btn:focus-visible {
            outline: 2px solid #F25400;
            outline-offset: 3px;
          }

          .brand-gradient-text {
            background: linear-gradient(100deg, #F25400 0%, #FF8A3D 55%, #F25400 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .icon-chip {
            background: linear-gradient(135deg, #FF7A2E 0%, #F25400 100%);
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.45),
              0 6px 14px -4px rgba(242,84,0,0.55);
          }

          @media (prefers-reduced-motion: reduce) {
            .orbit-ring, .orbit-card, .glow-blob { animation: none; }
          }
        `}</style>

        {/* SVG filter for liquid refraction */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <filter id="liquid-distort" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
            <feDisplacementMap in="SourceGraphic" in2="soft" scale="28" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>

        {/* soft ambient light behind the glass (so blur has something to refract) */}
        <div
          aria-hidden
          className="glow-blob pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[#F25400]/20 blur-[110px]"
        />
        <div
          aria-hidden
          className="glow-blob pointer-events-none absolute -left-24 bottom-10 h-[360px] w-[360px] rounded-full bg-[#FFB27A]/30 blur-[110px]"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div>
            <span
              className="
                glass inline-block rounded-full
                px-4 py-1.5
                text-xs font-bold tracking-wide
                text-[#F25400]
              "
            >
              SPIRITUAL MEDIA AGENCY
            </span>

            <h1
              className="
                mt-6 text-5xl font-extrabold
                leading-[1.05] tracking-tight
                text-[#232323]
                md:text-6xl
              "
            >
              Creative Soul.
              <br />
              <span className="brand-gradient-text">Spiritual Impact.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-[#232323]">
              We blend{" "}
              <span className="font-bold">meaningful spiritual content</span>{" "}
              with{" "}
              <span className="font-bold">powerful digital creativity</span>.
            </p>

            <p className="mt-4 max-w-md text-base text-[#5A5550]">
              From devotional videos and social media creatives to
              branding and digital presence, we help spiritual brands
              connect with their audience and grow online.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {pills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  className="
                    liquid-btn
                    rounded-full
                    px-6 py-2.5
                    text-sm font-semibold
                    text-[#232323]
                  "
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — ORBIT */}
          <div
            className="
              relative mx-auto flex
              h-[560px] w-full max-w-[620px]
              items-center justify-center
            "
          >
            {/* OUTER ORBIT */}
            <div
              className="
                absolute h-[480px] w-[480px]
                rounded-full border border-dashed
                border-[#F25400]/30
              "
            />

            {/* INNER ORBIT */}
            <div
              className="
                absolute h-[340px] w-[340px]
                rounded-full border
                border-[#232323]/10
              "
            />

            {/* CENTER HUB */}
            <div
              className="
                glass glass-tint relative z-10
                flex h-44 w-44
                flex-col items-center justify-center
                rounded-full text-center
              "
            >
              <p className="text-base font-extrabold text-[#232323]">
             Vaani 360 Media
              </p>
              <p className="mt-1 text-[11px] font-bold tracking-wide text-[#F25400]">
              Your Spiritual Brand. 
              Our Digital Vision
              </p>
            </div>

            {/* ROTATING SERVICES */}
            <div className="orbit-ring absolute h-[1px] w-[1px]">
              {orbitNodes.map(({ label, sub, icon: Icon, angle }) => (
                <div
                  key={label}
                  className="absolute"
                  style={{
                    transform: `
                      rotate(${angle}deg)
                      translate(${radius}px)
                      rotate(${-angle}deg)
                    `,
                  }}
                >
                  <div
                    className="
                      orbit-card glass
                      flex w-[200px]
                      -translate-x-1/2 -translate-y-1/2
                      items-center gap-3
                      whitespace-nowrap
                      rounded-2xl
                      px-4 py-3
                    "
                  >
                    <span
                      className="
                        icon-chip
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-xl text-white
                      "
                    >
                      <Icon size={18} />
                    </span>

                    <span>
                      <p className="text-sm font-bold leading-tight text-[#232323]">
                        {label}
                      </p>
                      <p className="text-[11px] leading-tight text-[#6F6A64]">
                        {sub}
                      </p>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div
          className="
            glass relative
            mx-auto mt-20
            grid max-w-5xl
            grid-cols-2
            divide-y divide-[#232323]/10
            rounded-3xl py-8
            sm:grid-cols-4 sm:divide-x sm:divide-y-0
          "
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center py-4 sm:py-0"
            >
              <p className="brand-gradient-text text-3xl font-extrabold">
                {value}
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-[#6F6A64]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SpiritualProjectsSection />
      <VideoEditingShowcase />
      <CarStudio />
      <ElevionMedia />
    </>
  );
}