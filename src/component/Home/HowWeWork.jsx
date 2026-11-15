import React from "react";

export default function HowWeWork() {
  const steps = [
    {
      number: "01",
      title: "Understand Your Brand",
      desc: "We understand your spiritual brand, audience, goals and content needs before we begin.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="18" cy="18" r="9" stroke="#b8860b" strokeWidth="1.6" />
          <path d="M24.5 24.5L31 31" stroke="#b8860b" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14 18h8M18 14v8" stroke="#b8860b" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Plan the Content",
      desc: "We create a clear content strategy for reels, posts, campaigns, events and social media growth.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <rect x="8" y="7" width="24" height="26" rx="3" stroke="#b8860b" strokeWidth="1.5" />
          <path d="M13 13h14M13 18h14M13 23h9" stroke="#b8860b" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M25 27h4M27 25v4" stroke="#b8860b" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Create & Edit",
      desc: "Our team handles graphic design, video editing, thumbnails, creative posts and visual storytelling.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <path d="M11 29L13 22L25 10L30 15L18 27L11 29Z" stroke="#b8860b" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M22 13L27 18" stroke="#b8860b" strokeWidth="1.2" />
          <path d="M11 34h19" stroke="#b8860b" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Publish & Manage",
      desc: "We manage social media, publish content consistently, optimize the presence and keep your brand active.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <rect x="8" y="10" width="24" height="21" rx="4" stroke="#b8860b" strokeWidth="1.5" />
          <path d="M13 16h14M13 21h9" stroke="#b8860b" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M24 25l3-3 3 3" stroke="#b8860b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      number: "05",
      title: "Grow & Improve",
      desc: "We track performance, study what works and continuously improve content, reach and engagement.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <path d="M10 29L16 23L21 26L30 13" stroke="#b8860b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="24,13 30,13 30,19" stroke="#b8860b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="29" r="2" fill="#b8860b" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white px-5 py-16 md:px-8 md:py-20"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .how-card {
          transition:
            transform .28s ease,
            box-shadow .28s ease,
            border-color .28s ease;
        }

        .how-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 40px rgba(184, 134, 11, 0.14);
          border-color: rgba(184, 134, 11, 0.38);
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase px-5 py-2 rounded-full border border-amber-300 text-amber-700 bg-amber-50">
              OUR PROCESS
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 text-gray-900 leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            How We Work
          </h2>

          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            A simple, creative and transparent process built for devotional & spiritual brands.
          </p>
        </div>

        {/* STEPS */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-5 lg:gap-4">
          {steps.map((step, i) => (
            <React.Fragment key={step.number}>
              <div className="how-card w-full lg:flex-1 lg:min-w-0">
                <div
                  className="
                    h-full
                    rounded-3xl
                    border border-amber-100
                    bg-white
                    px-6 py-7
                    md:px-7 md:py-8
                    shadow-sm
                  "
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center bg-amber-50 border border-amber-200">
                      {step.icon}
                    </div>

                    <span className="text-3xl md:text-4xl font-extrabold text-[#7c2d12] leading-none">
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="text-lg md:text-xl font-extrabold text-gray-900 mb-3 leading-snug"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm md:text-[15px] leading-7 text-gray-500">
                    {step.desc}
                  </p>
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center shrink-0 opacity-50">
                  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                    <line
                      x1="1"
                      y1="8"
                      x2="20"
                      y2="8"
                      stroke="#d4a84b"
                      strokeWidth="1.3"
                    />
                    <polyline
                      points="16,3 22,8 16,13"
                      stroke="#d4a84b"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {i < steps.length - 1 && (
                <div className="flex lg:hidden items-center justify-center my-1 opacity-50">
                  <svg width="16" height="26" viewBox="0 0 16 26" fill="none">
                    <line
                      x1="8"
                      y1="1"
                      x2="8"
                      y2="19"
                      stroke="#d4a84b"
                      strokeWidth="1.3"
                    />
                    <polyline
                      points="3,15 8,21 13,15"
                      stroke="#d4a84b"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* SERVICE STRIP */}
        <div className="mt-10 md:mt-12 rounded-2xl border border-amber-100 bg-amber-50/50 px-5 py-4 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-wide text-amber-800">
            Social Media Management • Video Editing • Graphic Design • Website Design • Product Photography • Marketing & Growth
          </p>
        </div>
      </div>
    </section>
  );
}