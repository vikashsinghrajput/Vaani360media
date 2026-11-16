import { useEffect, useRef, useState } from "react";
import {
  Star,
  MapPin,
  BadgeCheck,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import sathyasaibaba from "../../assets/client Logo/sathya-sai-baba.jpg";
import DevotionalIndia from "../../assets/client Logo/Devotional India Official.webp";
import movementwithphysios from "../../assets/client Logo/movementwithphysios.png";
import WatchOverIndia from "../../assets/client Logo/Watch Over India.jpg";

/**
 * ClientReviews — Liquid Glass edition
 * Apple-style frosted glass cards on a soft light canvas.
 * Features: autoplay carousel (pauses on hover), center card + blurred peek
 * cards, read more, rating summary, write-review CTA, Google link,
 * optional live endpoint with fallback.
 */

const fallbackReviews = [
  {
    id: 1,
    name: "Sathya Sai Baba",
    initials: "SS",
    avatar: sathyasaibaba,
    rating: 5,
    time: "Spiritual Leadership",
    text: "Vaani 360 Media has managed our digital presence with care, professionalism and respect. Their understanding of spiritual content is impressive, and their social media strategy has helped us connect with a wider devotee community.",
  },
  {
    id: 2,
    name: "Devotional India Official",
    initials: "DI",
    avatar: DevotionalIndia,
    rating: 5,
    time: "Devotional Media",
    text: "Working with Vaani 360 Media has been a valuable experience for our channel. Their team manages our YouTube content and Instagram Reels with care. The quality of festival creatives and thumbnails has helped strengthen audience engagement.",
  },
  {
    id: 3,
    name: "Watch Over India",
    initials: "WO",
    avatar: WatchOverIndia,
    rating: 5,
    time: "Movement & Outreach",
    text: "The Vaani 360 Media team is dedicated and professional. Their social media campaigns and videos have helped us communicate our outreach programmes more effectively and build stronger community engagement.",
  },
  {
    id: 4,
    name: "Movement with PHYSIOS",
    initials: "MP",
    avatar: movementwithphysios,
    rating: 5,
    time: "Community & Wellness",
    text: "We were looking for a digital partner who understands wellness and community building. Vaani 360 Media has delivered thoughtful creative work and consistent support, helping us build a stronger connection with our audience.",
  },
];

function StarRow({ rating, size = 15 }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i <= rating ? "fill-[#F15A05]" : "fill-black/10"}
        />
      ))}
    </div>
  );
}

function GoogleGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.12-1.44.34-2.1V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function Avatar({ review, big }) {
  const [broken, setBroken] = useState(false);
  const dims = big ? "h-12 w-12" : "h-10 w-10";
  if (review.avatar && !broken) {
    return (
      <img
        src={review.avatar}
        alt={review.name}
        onError={() => setBroken(true)}
        className={`${dims} shrink-0 rounded-full object-cover ring-2 ring-white/80 shadow-md`}
      />
    );
  }
  return (
    <div
      className={`${dims} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8A3D] to-[#F15A05] text-sm font-semibold text-white ring-2 ring-white/80 shadow-md`}
    >
      {review.initials}
    </div>
  );
}

const LIMIT = 150;

function TestimonialCard({ review, main }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > LIMIT;
  const shown =
    main && (expanded || !isLong)
      ? review.text
      : review.text.slice(0, LIMIT) + (isLong ? "…" : "");

  return (
    <article
      aria-hidden={!main}
      className={`lg-glass relative shrink-0 rounded-[28px] p-6 sm:p-8 ${
        main
          ? "lg-main lg-in w-[88vw] max-w-[560px]"
          : "pointer-events-none hidden w-[320px] scale-[0.9] opacity-50 blur-[2px] md:block lg:w-[340px]"
      }`}
    >
      <div className="relative z-10 flex items-center gap-3.5">
        <Avatar review={review} big={main} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[15px] font-semibold tracking-[-0.01em] text-[#222222]">
              {review.name}
            </p>
            <BadgeCheck size={16} className="shrink-0 fill-[#F15A05] text-white" />
          </div>
          <p className="text-[13px] text-[#6b6259]">{review.time}</p>
        </div>
      </div>

      <div className="relative z-10 mt-5">
        <StarRow rating={review.rating} size={main ? 17 : 14} />
      </div>

      <p
        className={`relative z-10 mt-4 text-[#222222]/85 ${
          main
            ? "text-[16px] leading-[1.65] tracking-[-0.005em] sm:text-[17px]"
            : "text-[14px] leading-relaxed"
        }`}
      >
        {shown}
        {main && isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-1.5 font-medium text-[#D94E00] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F15A05]"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      <div className="relative z-10 mt-6 flex items-center gap-2 border-t border-black/[0.06] pt-4 text-[13px] text-[#6b6259]">
        <GoogleGlyph className="h-4 w-4" />
        Posted on Google
      </div>
    </article>
  );
}

function NavButton({ onClick, label, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`lg-glass lg-btn items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F15A05] ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

const VAANI_360_GOOGLE_SEARCH_URL =
  "https://www.google.com/search?q=Vaani+360+Media%2C+B-Block%2C+11%2F1%2C+Ekta+Vihar%2C+Near+Hindon+Airport%2C+Ghaziabad%2C+Uttar+Pradesh+201005%2C+India";

export default function ClientReviews({
  reviewsEndpoint = null,
  googleSearchUrl = VAANI_360_GOOGLE_SEARCH_URL,
  autoplayMs = 5500,
}) {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [meta, setMeta] = useState({ average: 4.8, total: 132 });
  const [status, setStatus] = useState(reviewsEndpoint ? "loading" : "fallback");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!reviewsEndpoint) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(reviewsEndpoint);
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.reviews) && data.reviews.length) setReviews(data.reviews);
        if (data.average || data.total) {
          setMeta((m) => ({
            average: data.average ?? m.average,
            total: data.total ?? m.total,
          }));
        }
        setStatus("live");
      } catch (err) {
        console.error("Google reviews fetch failed, showing fallback:", err);
        if (!cancelled) setStatus("fallback");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reviewsEndpoint]);

  // Autoplay — resets whenever index changes, so manual clicks restart the timer.
  useEffect(() => {
    if (paused || reviews.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % reviews.length), autoplayMs);
    return () => clearTimeout(t);
  }, [index, paused, reviews.length, autoplayMs]);

  const n = reviews.length;
  const goTo = (i) => setIndex(((i % n) + n) % n);
  const prevIndex = (index - 1 + n) % n;
  const nextIndex = (index + 1) % n;

  return (
    <section className="lg-section relative w-full overflow-hidden bg-[#fffaf2] px-4 py-16 sm:px-8 sm:py-24">
      <style>{`
        .lg-section { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", "Segoe UI", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }

        /* Liquid glass surface */
        .lg-glass {
          background: linear-gradient(145deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.28) 55%, rgba(255,255,255,0.4) 100%);
          -webkit-backdrop-filter: blur(30px) saturate(190%);
          backdrop-filter: blur(30px) saturate(190%);
          border: 1px solid rgba(255,255,255,0.65);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,0.95),
            inset 0 -1px 0 rgba(255,255,255,0.35),
            inset 1px 0 0 rgba(255,255,255,0.4),
            0 1px 2px rgba(60,40,10,0.06),
            0 24px 48px -16px rgba(120,50,10,0.22);
          transition: transform .6s cubic-bezier(.2,.8,.2,1), opacity .6s ease, filter .6s ease;
        }
        /* Specular sheen across the top-left */
        .lg-glass::before {
          content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
          background:
            radial-gradient(120% 70% at 12% -10%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 55%),
            linear-gradient(115deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 60%);
          mix-blend-mode: soft-light;
        }
        .lg-main { box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(255,255,255,0.4),
            0 2px 4px rgba(60,40,10,0.05),
            0 40px 80px -24px rgba(120,50,10,0.32); }
        .lg-btn {
          display: flex;
          background: rgba(255,255,255,0.92);
          -webkit-backdrop-filter: none; backdrop-filter: none;
          border: 1px solid rgba(34,34,34,0.12);
          color: #222222;
          box-shadow:
            inset 0 1px 0 #fff,
            0 2px 6px rgba(120,50,10,0.18),
            0 12px 28px -8px rgba(120,50,10,0.35);
        }
        .lg-btn:hover { background: #F15A05; color: #fff; border-color: #F15A05; }
        .lg-in { animation: lgIn .7s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes lgIn { from { opacity: 0; transform: translateY(10px) scale(.985); } to { opacity: 1; transform: none; } }

        .lg-orb { position: absolute; border-radius: 9999px; filter: blur(70px); pointer-events: none; }
        @media (prefers-reduced-motion: reduce) { .lg-in { animation: none; } .lg-glass { transition: none; } }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .lg-glass { background: rgba(255,255,255,0.88); }
        }
      `}</style>

      {/* Colour behind the glass — this is what makes it look liquid */}
      <div className="lg-orb -left-24 top-10 h-72 w-72 bg-[#FFB27A]/70" />
      <div className="lg-orb right-[-4rem] top-32 h-80 w-80 bg-[#F15A05]/25" />
      <div className="lg-orb bottom-[-3rem] left-1/3 h-72 w-72 bg-[#FFD9A8]/60" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="lg-glass relative flex items-center gap-2 rounded-full px-4 py-1.5">
          <GoogleGlyph className="relative z-10 h-4 w-4" />
          <span className="relative z-10 text-[13px] font-medium text-[#222222]">Google Reviews</span>
        </div>

        <h2 className="mt-6 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#222222] sm:text-[52px]">
          What Our Clients Say
        </h2>

        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#6b6259] sm:text-[18px]">
          Feedback shared by our clients on Google.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="lg-glass relative flex items-center gap-3 rounded-full py-2 pl-5 pr-6">
            <span className="relative z-10 text-[26px] font-semibold tracking-[-0.02em] text-[#222222]">
              {meta.average.toFixed(1)}
            </span>
            <div className="relative z-10 flex flex-col items-start gap-0.5 leading-none">
              <StarRow rating={Math.round(meta.average)} size={13} />
              <span className="text-[12px] text-[#6b6259]">{meta.total}+ reviews</span>
            </div>
          </div>

          <a
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#FF7A21] to-[#F15A05] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_28px_-10px_rgba(241,90,5,0.65)] transition-all duration-200 hover:brightness-105 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_16px_34px_-10px_rgba(241,90,5,0.75)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F15A05]"
          >
            Search on Google
            <ArrowUpRight size={16} />
          </a>
        </div>

        {status === "fallback" && reviewsEndpoint && (
          <p className="mt-4 text-[12px] text-[#D94E00]">
            Live Google reviews could not be loaded. Sample reviews are being displayed.
          </p>
        )}
      </div>

      <div
        className="relative z-10 mx-auto mt-14 flex max-w-6xl items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <NavButton
          onClick={() => goTo(index - 1)}
          label="Previous review"
          className="absolute left-0 z-20 hidden h-12 w-12 sm:flex"
        >
          <ChevronLeft size={22} strokeWidth={2.5} />
        </NavButton>

        <div className="flex w-full items-center justify-center gap-4 lg:gap-8" aria-live="polite">
          <TestimonialCard review={reviews[prevIndex]} main={false} />
          <TestimonialCard key={reviews[index].id} review={reviews[index]} main />
          <TestimonialCard review={reviews[nextIndex]} main={false} />
        </div>

        <NavButton
          onClick={() => goTo(index + 1)}
          label="Next review"
          className="absolute right-0 z-20 hidden h-12 w-12 sm:flex"
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </NavButton>
      </div>

      {/* Mobile arrows */}
      <div className="relative z-10 mt-7 flex items-center justify-center gap-4 sm:hidden">
        <NavButton onClick={() => goTo(index - 1)} label="Previous review" className="h-11 w-11">
          <ChevronLeft size={20} strokeWidth={2.5} />
        </NavButton>
        <NavButton onClick={() => goTo(index + 1)} label="Next review" className="h-11 w-11">
          <ChevronRight size={20} strokeWidth={2.5} />
        </NavButton>
      </div>

      {/* Dots in a glass pill */}
      <div className="relative z-10 mt-9 flex justify-center">
        <div className="lg-glass relative flex items-center gap-2 rounded-full px-3.5 py-2.5">
          {reviews.map((r, i) => (
            <button
              key={r.id}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={i === index}
              className={`relative z-10 h-2 rounded-full transition-all duration-500 ${
                i === index ? "w-6 bg-[#F15A05]" : "w-2 bg-black/20 hover:bg-black/35"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-10 flex justify-center">
        <a
          href={googleSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#D94E00] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F15A05]"
        >
          <MapPin size={16} />
          Find Vaani 360 Media on Google
        </a>
      </div>
    </section>
  );
}