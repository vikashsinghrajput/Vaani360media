import React from "react";
import {
  Search,
  Facebook,
  Instagram,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";

const adServices = [
  {
    name: "Google Ads",
    icon: Search,
    label: "GOOGLE ADS",
    sub: "Search • Display • YouTube",
    description:
      "Targeted Google campaigns that put your spiritual brand in front of people actively searching for your services.",
  },
  {
    name: "Meta Ads",
    icon: Facebook,
    label: "META ADS",
    sub: "Facebook • Instagram",
    description:
      "Creative-focused ad campaigns built to increase reach, engagement, leads and conversions across Meta platforms.",
  },
  {
    name: "Instagram Advertising",
    icon: Instagram,
    label: "INSTAGRAM ADS",
    sub: "Reels • Stories • Feed",
    description:
      "High-impact campaigns for spiritual creators, gurus and devotional brands using the formats your audience already watches.",
  },
  {
    name: "Retargeting",
    icon: RefreshCcw,
    label: "RETARGETING",
    sub: "Reconnect • Convert",
    description:
      "We reconnect with people who already interacted with your brand and bring interested audiences back into the journey.",
  },
  {
    name: "Campaign Optimization",
    icon: TrendingUp,
    label: "PERFORMANCE",
    sub: "Optimize • Scale • Grow",
    description:
      "Continuous campaign optimization focused on stronger targeting, better creative performance and smarter ad spend.",
  },
];

function MandalaRing() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute opacity-[0.07] animate-[spin_80s_linear_infinite]"
      style={{ width: 260, height: 260 }}
    >
      {[0, 30, 60, 90, 120, 150].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 50 50)`}>
          <ellipse cx="50" cy="12" rx="5" ry="12" fill="#B8860B" />
          <ellipse cx="50" cy="88" rx="5" ry="12" fill="#B8860B" />
        </g>
      ))}

      <circle
        cx="50"
        cy="50"
        r="18"
        fill="none"
        stroke="#B8860B"
        strokeWidth="1.5"
      />

      <circle cx="50" cy="50" r="6" fill="#B8860B" />
    </svg>
  );
}

export default function PartnershipsSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#FDFAF3] py-20 px-6"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .ads-card {
          transition:
            transform .3s ease,
            box-shadow .3s ease,
            border-color .3s ease;
        }

        .ads-card:hover {
          transform: translateY(-7px);
          border-color: #B8860B;
          box-shadow: 0 18px 40px rgba(184,134,11,0.15);
        }

        .ads-icon {
          transition:
            transform .3s ease,
            background-color .3s ease,
            border-color .3s ease;
        }

        .ads-card:hover .ads-icon {
          transform: scale(1.06);
          background: #F5EDD8;
          border-color: #B8860B;
        }

        @media (max-width: 640px) {
          .ads-card:hover {
            transform: none;
          }
        }
      `}</style>

      {/* Dot background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4A85A 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Mandala decorations */}
      <div className="absolute -top-16 -right-16 pointer-events-none flex items-center justify-center">
        <MandalaRing />
      </div>

      <div className="absolute -bottom-16 -left-16 pointer-events-none flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="opacity-[0.06]"
          style={{
            width: 200,
            height: 200,
            animation: "spin 100s linear infinite reverse",
          }}
        >
          {[0, 45, 90, 135].map((deg, i) => (
            <g key={i} transform={`rotate(${deg} 50 50)`}>
              <ellipse cx="50" cy="10" rx="4" ry="10" fill="#FAF9F6" />
            </g>
          ))}

          <circle
            cx="50"
            cy="50"
            r="14"
            fill="none"
            stroke="#C8780A"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#FAF9F6] opacity-[0.15] blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* LABEL */}
        <div className="flex items-center gap-3 justify-center mb-5">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#E8C878]" />

          <span className="text-[10px] font-bold tracking-[0.35em] text-[#B8860B] uppercase">
            Paid Advertising
          </span>

          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#E8C878]" />
        </div>

        {/* HEADING */}
        <h2 className="text-center text-[clamp(28px,4vw,46px)] font-extrabold text-[#1A1008] leading-tight mb-4 tracking-tight">
          Paid Advertising That{" "}
          <span className="text-[#B8860B]">
            Drives Growth
          </span>
        </h2>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#E8C878]" />

          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FBF3DC] border border-[#E8C878]">
            <span className="text-[#B8860B] text-sm">✦</span>
          </div>

          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#E8C878]" />
        </div>

        {/* DESCRIPTION */}
        <p className="text-center text-[#5C4020] text-sm md:text-base leading-7 max-w-3xl mx-auto mb-12">
          We run targeted Google and Meta ad campaigns for spiritual brands,
          gurus and creators — designed to increase reach, engagement,
          qualified leads and conversions while keeping campaigns optimized
          for performance.
        </p>

        {/* AD SERVICES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adServices.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.name}
                className="
                  ads-card
                  relative
                  bg-[#FFFBF0]
                  border border-[#E8C878]
                  rounded-3xl
                  px-6 py-7
                  shadow-sm
                "
              >
                <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#E8C878] to-transparent rounded-full" />

                {/* ICON */}
                <div className="ads-icon flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FBF3DC] border border-[#E8C878] mb-5">
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className="text-[#B8860B]"
                  />
                </div>

                {/* LABEL */}
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B8860B] mb-2">
                  {service.label}
                </p>

                {/* TITLE */}
                <h3 className="text-lg md:text-xl font-extrabold text-[#1A1008] leading-snug mb-2">
                  {service.name}
                </h3>

                {/* SUB */}
                <p className="text-xs font-semibold text-[#9E7840] mb-3">
                  {service.sub}
                </p>

                {/* DESCRIPTION */}
                <p className="text-sm leading-6 text-[#6F5A3E]">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />

                  <span className="text-[10px] font-semibold tracking-wide text-[#9E7840]">
                    Elevion Media Ads
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* TRUST / PERFORMANCE STRIP */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[#E8C878] bg-[#FBF3DC] px-4 py-4 text-center">
            <p className="text-lg font-extrabold text-[#7B1D1D]">
              Google
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#9E7840]">
              Search & YouTube Ads
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8C878] bg-[#FBF3DC] px-4 py-4 text-center">
            <p className="text-lg font-extrabold text-[#7B1D1D]">
              Meta
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#9E7840]">
              Facebook & Instagram
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8C878] bg-[#FBF3DC] px-4 py-4 text-center">
            <p className="text-lg font-extrabold text-[#7B1D1D]">
              ROI
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#9E7840]">
              Optimize & Scale
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}