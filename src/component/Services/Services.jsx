import React from "react";
import {
  PenTool,
  Code2,
  Hash,
  Camera,
  Video,
} from "lucide-react";
import CarStudio from "../Home/GraphicDesignSection";
import ElevionMedia from "../Home/SocialMedia";
import VideoEditingShowcase from "../Home/Productvideocarousel";
import SpiritualProjectsSection from "../Pricing/ProjectsSection";

/**
 * Elevion Media — Devotional & Spiritual Services Hero
 * Font styles/layout kept unchanged
 */

const orbitNodes = [
  {
    label: "Social Media",
    sub: "Content & Growth",
    icon: Hash,
    angle: 0,
  },
  {
    label: "Video Editing",
    sub: "Reels, Shorts & Videos",
    icon: Video,
    angle: 72,
  },
  {
    label: "Graphic Design",
    sub: "Posters & Thumbnails",
    icon: PenTool,
    angle: 144,
  },
  {
    label: "Website Design",
    sub: "Modern & Responsive",
    icon: Code2,
    angle: 216,
  },
  {
    label: "Product Photography",
    sub: "Creative Visuals",
    icon: Camera,
    angle: 288,
  },
];

const pills = [
  "Spiritual Content",
  "Creative Branding",
  "Digital Growth",
];

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
        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitCounterSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .orbit-ring {
          animation: orbitSpin 36s linear infinite;
        }

        .orbit-card {
          animation: orbitCounterSpin 36s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring,
          .orbit-card {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">

        {/* LEFT COLUMN */}
        <div>

          <span
            className="
              inline-block rounded-full
              border border-[#D97706]/30
              bg-[#FFF7E8]
              px-4 py-1.5
              text-xs font-bold tracking-wide
              text-[#B45309]
            "
          >
            DEVOTIONAL & SPIRITUAL MEDIA
          </span>

          <h1
            className="
              mt-6 text-5xl font-extrabold
              leading-[1.05]
              tracking-tight
              text-[#29231D]
              md:text-6xl
            "
          >
            Creative Soul.
            <br />

            <span className="text-[#D97706]">
              Spiritual Impact.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-[#29231D]">
            We blend{" "}
            <span className="font-bold">
              meaningful spiritual content
            </span>{" "}
            with{" "}
            <span className="font-bold">
              powerful digital creativity
            </span>
            .
          </p>

          <p className="mt-4 max-w-md text-base text-[#6B5B4B]">
            From devotional videos and social media creatives to
            branding and digital presence, we help spiritual brands
            connect with their audience and grow online.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {pills.map((pill) => (
              <span
                key={pill}
                className="
                  rounded-full
                  border border-[#E8DED0]
                  bg-white
                  px-5 py-2
                  text-sm font-semibold
                  text-[#29231D]
                  shadow-sm
                "
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — ORBIT */}
        <div
          className="
            relative mx-auto flex
            h-[560px] w-full
            max-w-[620px]
            items-center justify-center
          "
        >

          {/* OUTER ORBIT */}
          <div
            className="
              absolute
              h-[480px] w-[480px]
              rounded-full
              border border-dashed
              border-[#D97706]/30
            "
          />

          {/* INNER ORBIT */}
          <div
            className="
              absolute
              h-[340px] w-[340px]
              rounded-full
              border
              border-[#C9A227]/40
            "
          />

          {/* CENTER HUB */}
          <div
            className="
              relative z-10
              flex h-44 w-44
              flex-col items-center justify-center
              rounded-full
              bg-white
              text-center
              border border-[#C9A227]/20
              shadow-[0_20px_60px_-15px_rgba(217,119,6,0.25)]
            "
          >
            <p className="text-base font-extrabold text-[#29231D]">
              Elevion Media
            </p>

            <p className="mt-1 text-[11px] font-bold tracking-wide text-[#D97706]">
              Let's Elevate Your Brand
            </p>
          </div>

          {/* ROTATING SERVICES */}
          <div className="orbit-ring absolute h-[1px] w-[1px]">

            {orbitNodes.map(
              ({ label, sub, icon: Icon, angle }) => (
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
                      orbit-card
                      flex w-[200px]
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center gap-3
                      whitespace-nowrap
                      rounded-2xl
                      bg-white
                      px-4 py-3
                      border border-[#EEE5D8]
                      shadow-[0_10px_30px_-10px_rgba(80,60,30,0.15)]
                    "
                  >
                    <span
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-lg
                        bg-[#FFF7E8]
                        text-[#D97706]
                      "
                    >
                      <Icon size={18} />
                    </span>

                    <span>
                      <p className="text-sm font-bold leading-tight text-[#29231D]">
                        {label}
                      </p>

                      <p className="text-[11px] leading-tight text-[#8A7A68]">
                        {sub}
                      </p>
                    </span>
                  </div>
                </div>
              )
            )}

          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div
        className="
          mx-auto mt-20
          grid max-w-5xl
          grid-cols-2
          divide-y divide-[#F1E8DC]
          rounded-2xl
          bg-white
          py-8
          border border-[#F1E8DC]
          shadow-[0_20px_60px_-20px_rgba(80,60,30,0.12)]
          sm:grid-cols-4
          sm:divide-x
          sm:divide-y-0
        "
      >
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center py-4 sm:py-0"
          >
            <p className="text-3xl font-extrabold text-[#D97706]">
              {value}
            </p>

            <p className="mt-1 text-xs font-semibold tracking-wide text-[#8A7A68]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
    <SpiritualProjectsSection/>
              <VideoEditingShowcase/>
    <CarStudio/>
    <ElevionMedia/>
      
    </>
   
  );
}