import React, { useState } from "react";

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Understand Your Brand",
      desc: "We understand your spiritual brand, audience, goals and content needs before we begin.",
      tone: "orange",
      icon: (
        <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="9" stroke="currentColor" strokeWidth="1.7" />
          <path d="M24.5 24.5L31 31" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M14 18h8M18 14v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Plan the Content",
      desc: "We create a clear content strategy for reels, posts, campaigns, events and social media growth.",
      tone: "pink",
      icon: (
        <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
          <rect x="8" y="7" width="24" height="26" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 13h14M13 18h14M13 23h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M25 27h4M27 25v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Create & Edit",
      desc: "Our team handles graphic design, video editing, thumbnails, creative posts and visual storytelling.",
      tone: "purple",
      icon: (
        <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
          <path d="M11 29L13 22L25 10L30 15L18 27L11 29Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M22 13L27 18M11 34h19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Publish & Manage",
      desc: "We manage social media, publish content consistently, optimize the presence and keep your brand active.",
      tone: "teal",
      icon: (
        <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
          <rect x="8" y="10" width="24" height="21" rx="4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M13 16h14M13 21h9M24 25l3-3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      number: "05",
      title: "Grow & Improve",
      desc: "We track performance, study what works and continuously improve content, reach and engagement.",
      tone: "gold",
      icon: (
        <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
          <path d="M10 29L16 23L21 26L30 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="24,13 30,13 30,19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="29" r="2" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="process"
      className="how-process relative overflow-hidden px-5 py-16 md:px-8 md:py-24"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap');

        .how-process {
          --process-ink: #211d19;
          --process-muted: #77716b;
          background: linear-gradient(115deg, #faf7f1 0%, #f8f3e9 58%, #fbf6ed 100%);
          color: var(--process-ink);
          font-family: 'DM Sans', sans-serif;
        }
        .how-process .process-heading,
        .how-process .process-title {
          font-family: 'Playfair Display', Georgia, serif;
          letter-spacing: -.035em;
        }
        .how-process .process-track {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 22px;
          align-items: start;
        }
        .how-process .process-track::before {
          content: '';
          position: absolute;
          top: 63px;
          left: 9.5%;
          right: 9.5%;
          height: 2px;
          background: linear-gradient(90deg, #f59a18 0%, #e7a2b4 27%, #a99bd8 52%, #82c9bd 76%, #d5b66d 100%);
          z-index: 0;
          opacity: .9;
        }
        .how-process .process-track::after {
          content: '';
          position: absolute;
          top: 61px;
          left: 9.5%;
          width: 0;
          height: 5px;
          border-radius: 99px;
          background: linear-gradient(90deg, #ff9b12, #e7a2b4, #a99bd8, #82c9bd, #d5b66d);
          filter: blur(4px);
          opacity: .8;
          z-index: 0;
          transition: width .65s cubic-bezier(.2,.8,.2,1);
          pointer-events: none;
        }
        .how-process .process-step {
          position: relative;
          z-index: 1;
          min-width: 0;
          text-align: center;
          cursor: pointer;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }
        .how-process .process-node-wrap {
          height: 142px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          position: relative;
        }
        .how-process .process-node {
          width: 126px;
          height: 126px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 6px solid rgba(255,255,255,.78);
          box-shadow: 0 9px 26px rgba(90, 70, 40, .08);
          transform: scale(.94);
          opacity: .68;
          transition: transform .45s cubic-bezier(.2,.8,.2,1), opacity .35s ease, box-shadow .45s ease, filter .35s ease;
        }
        .how-process .process-node svg {
          transition: transform .5s cubic-bezier(.2,.8,.2,1);
        }
        .how-process .process-step:hover .process-node,
        .how-process .process-step:focus-visible .process-node,
        .how-process .process-step.is-active .process-node {
          transform: translateY(-4px) scale(1.04);
          opacity: 1;
          box-shadow: 0 14px 32px rgba(90, 70, 40, .16), 0 0 0 7px rgba(255,255,255,.36);
          filter: saturate(1.12);
        }
        .how-process .process-step:hover .process-node svg,
        .how-process .process-step:focus-visible .process-node svg,
        .how-process .process-step.is-active .process-node svg {
          transform: scale(1.12) rotate(-5deg);
        }
        .how-process .process-step.is-active .process-node::after,
        .how-process .process-step:hover .process-node::after {
          content: '';
          position: absolute;
          inset: -12px;
          border: 2px dashed currentColor;
          border-radius: 50%;
          opacity: .35;
          animation: processOrbit 9s linear infinite;
        }
        .how-process .process-number {
          position: absolute;
          top: -7px;
          right: -5px;
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255,255,255,.96);
          color: #77716b;
          font-size: 13px;
          font-weight: 800;
          box-shadow: 0 3px 12px rgba(40,30,20,.09);
          transform: scale(.88);
          transition: transform .35s ease, background .35s ease, color .35s ease;
        }
        .how-process .process-step.is-active .process-number,
        .how-process .process-step:hover .process-number,
        .how-process .process-step:focus-visible .process-number {
          background: #f59a00;
          color: #fff;
          transform: scale(1.08);
        }
        .how-process .tone-orange .process-node { background: #ff9b12; color: #fff; }
        .how-process .tone-pink .process-node { background: #dfa0b4; color: white; }
        .how-process .tone-purple .process-node { background: #aaa0d9; color: white; }
        .how-process .tone-teal .process-node { background: #24b6aa; color: white; }
        .how-process .tone-gold .process-node { background: #d6b66e; color: white; }
        .how-process .process-title {
          font-size: 21px;
          line-height: 1.25;
          font-weight: 600;
          color: #6f6861;
          margin: 0 0 11px;
          transition: color .3s ease, transform .3s ease;
        }
        .how-process .process-description {
          max-width: 245px;
          margin: 0 auto;
          color: #a19a93;
          font-size: 13px;
          line-height: 1.65;
          transition: color .3s ease;
        }
        .how-process .process-step.is-active .process-title,
        .how-process .process-step:hover .process-title,
        .how-process .process-step:focus-visible .process-title {
          color: #211d19;
          transform: translateY(-2px);
        }
        .how-process .process-step.is-active .process-description,
        .how-process .process-step:hover .process-description,
        .how-process .process-step:focus-visible .process-description {
          color: #625b54;
        }
        .how-process .process-service-strip {
          border: 1px solid rgba(213, 182, 109, .28);
          background: rgba(255,255,255,.48);
        }
        @keyframes processOrbit {
          to { transform: rotate(360deg); }
        }
        @keyframes processPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,154,0,.18); }
          50% { box-shadow: 0 0 0 10px rgba(245,154,0,0); }
        }
        .how-process .process-step.is-active .process-node {
          animation: processPulse 2.8s ease-in-out infinite;
        }

        @media (max-width: 767px) {
          .how-process .process-track {
            display: flex;
            overflow-x: auto;
            overflow-y: hidden;
            gap: 0;
            padding: 12px 5px 22px;
            margin-right: -20px;
            margin-left: -20px;
            scroll-snap-type: x mandatory;
            scrollbar-width: thin;
            scrollbar-color: #d8c6a4 transparent;
            -webkit-overflow-scrolling: touch;
          }
          .how-process .process-track::before {
            top: 73px;
            left: 105px;
            right: auto;
            width: calc(5 * 250px - 120px);
          }
          .how-process .process-track::after {
            top: 71px;
            left: 105px;
            width: 0;
          }
          .how-process .process-step {
            flex: 0 0 250px;
            width: 250px;
            padding: 0 14px;
            scroll-snap-align: center;
          }
          .how-process .process-node-wrap { height: 152px; }
          .how-process .process-node { width: 126px; height: 126px; }
          .how-process .process-title { font-size: 20px; }
          .how-process .process-description { max-width: 220px; font-size: 13px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .how-process *,
          .how-process *::before,
          .how-process *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.28em] text-orange-600">
            HOW WE WORK
          </p>
          <h2 className="process-heading mb-4 text-3xl font-semibold leading-tight text-[#211d19] sm:text-4xl md:text-5xl lg:text-[56px]">
            How We Work
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#77716b] md:text-base">
            A simple, creative and transparent process built for devotional &amp; spiritual brands.
          </p>
        </div>

        {/* INTERACTIVE PROCESS TIMELINE */}
        <div className="process-track" aria-label="Our five-step process">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`process-step tone-${step.tone} ${activeStep === index ? "is-active" : ""}`}
              role="button"
              tabIndex={0}
              aria-pressed={activeStep === index}
              onMouseEnter={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
              onClick={() => setActiveStep(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveStep(index);
                }
              }}
            >
              <div className="process-node-wrap">
                <div className="process-node">
                  {step.icon}
                  <span className="process-number">{step.number}</span>
                </div>
              </div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-description">{step.desc}</p>
            </article>
          ))}
        </div>

        {/* SERVICE STRIP */}
        <div className="process-service-strip mt-12 rounded-2xl px-5 py-4 text-center md:mt-16">
          <p className="text-xs font-semibold leading-6 tracking-wide text-[#80622c] md:text-sm">
            Social Media Management <span className="px-1 text-orange-400">•</span> Video Editing <span className="px-1 text-orange-400">•</span> Graphic Design <span className="px-1 text-orange-400">•</span> Website Design <span className="px-1 text-orange-400"></span>  <span className="px-1 text-orange-400">•</span> Marketing &amp; Growth
          </p>
        </div>
      </div>
    </section>
  );
}
