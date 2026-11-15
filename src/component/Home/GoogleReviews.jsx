import { useEffect, useRef, useState } from "react";
import {
  Star,
  MapPin,
  BadgeCheck,
  ExternalLink,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import sathyasaibaba from "../../assets/client Logo/sathya-sai-baba.jpg";
import DevotionalIndia  from "../../assets/client Logo/Devotional India Official.webp";
import movementwithphysios  from "../../assets/client Logo/movementwithphysios.png";
import WatchOverIndia  from "../../assets/client Logo/Watch Over India.jpg";

/**
 * ClientReviews
 * -------------
 * Google Maps / Google Business Profile testimonial carousel.
 * Center me highlighted card, dono side me faded peek cards — saath me
 * pehle wale grid-version ke saare features: star rating, "Posted on Google"
 * badge, verified badge, expand/collapse lambe review ke liye, average
 * rating + total reviews header, "Write a review" CTA, "See all reviews"
 * footer link, aur fallback status messaging.
 */

const fallbackReviews = [
  {
    id: 1,
    name: "Sathya Sai Baba",
    initials: "SS",
    avatar: sathyasaibaba,
    rating: 5,
    time: "Spiritual Leadership",
    text:
      "Elevion Media ne hamari digital presence ko bahut sundar aur respectful tareeqe se manage kiya hai. Spiritual content ko samajhne ki inki depth amazing hai. Inki social media strategies se hum globally lakho devotees tak pahunch paaye hain.",
  },
  {
    id: 2,
    name: "Devotional India Official",
    initials: "DI",
    avatar: DevotionalIndia,
    rating: 5,
    time: "Devotional Media",
    text:
      "Hamare channel ke liye Elevion Media ke sath kaam karna ek game-changer raha. Ye hamare YouTube aur Instagram reels ko flawlessly handle karte hain. Festival creatives aur thumbnails ki quality hamesha top-notch hoti hai jis se engagement bahut badhi hai.",
  },
  {
    id: 3,
    name: "Watch Over India",
    initials: "WO",
    avatar: WatchOverIndia,
    rating: 5,
    time: "Movement & Outreach",
    text:
      "Elevion Media ki team bahut dedicated hai. Unhone impactful social media campaigns aur videos ke through hamare outreach programs ko amplify karne me bahut madad ki. Inki digital strategies se hamari community engagement kaafi strong hui hai.",
  },
  {
    id: 4,
    name: "Movement with PHYSIOS",
    initials: "MP",
    avatar: movementwithphysios,
    rating: 5,
    time: "Community & Wellness",
    text:
      "Hamein ek aise digital partner ki talaash thi jo wellness aur community building ko samjhe. Elevion Media ne bilkul wahi deliver kiya! Unke engaging creatives aur consistent support ne audience connection ko bahut improve kar diya hai.",
  },
];

function StarRow({ rating, size = 15, dim = false }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={
            i <= rating
              ? dim
                ? "fill-white/70"
                : "fill-[#E8A33D]"
              : dim
              ? "fill-white/20"
              : "fill-slate-200"
          }
        />
      ))}
    </div>
  );
}

function GoogleGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.12-1.44.34-2.1V7.05H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.95z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function TestimonialCard({ review, size = "main" }) {
  const isMain = size === "main";
  const [expanded, setExpanded] = useState(false);

  const isLong = review.text.length > 140;
  const shown =
    isMain && (expanded || !isLong)
      ? review.text
      : review.text.slice(0, 140) + (review.text.length > 140 ? "…" : "");

  return (
    <div
      className={`relative shrink-0 rounded-2xl transition-all duration-500 ${
        isMain
          ? "w-[88vw] max-w-[640px] bg-gradient-to-br from-[#6b3300] via-[#4a2000] to-[#3a1800] p-6 sm:p-8 shadow-xl shadow-[#4a2000]/25 border-2 border-[#d4a017]"
          : "hidden md:block w-[360px] border border-[#e2d0a0] bg-[#fffef8] p-6 opacity-60 blur-[0.5px] scale-95"
      }`}
    >
      <Quote
        size={36}
        strokeWidth={0}
        className={`absolute right-5 top-5 ${
          isMain ? "fill-[#f8dc70]/20" : "fill-[#e2d0a0]"
        }`}
      />

      <div className="flex items-center gap-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
            className={`h-11 w-11 shrink-0 rounded-full object-cover ring-2 ${
              isMain ? "ring-[#e8c878]/60" : "ring-[#e8dcc0]"
            }`}
          />
        ) : null}
        <div
          className={`${review.avatar ? "hidden" : "flex"} h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold [font-family:'Cinzel',serif] ${
            isMain
              ? "bg-[#f8dc70]/15 text-[#f8dc70]"
              : "bg-gradient-to-br from-[#C8780A] to-[#B8860B] text-white"
          }`}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <p
              className={`truncate [font-family:'Cinzel',serif] text-[14px] font-semibold tracking-wide ${
                isMain ? "text-[#f8dc70]" : "text-[#5C4020]"
              }`}
            >
              {review.name}
            </p>
            <BadgeCheck
              size={15}
              className={`shrink-0 ${
                isMain ? "fill-[#7ee0a8] text-[#3a1800]" : "fill-[#2E7D5B] text-white"
              }`}
            />
          </div>
          <p className={`text-xs ${isMain ? "text-[#daa84a]" : "text-[#9E7840]"}`}>
            {review.time}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <StarRow rating={review.rating} dim={isMain} />
      </div>

      <p
        className={`mt-3 text-[13px] sm:text-[14px] leading-relaxed ${
          isMain ? "text-[#f0d090]" : "text-[#7a6040]"
        }`}
      >
        {shown}
        {isMain && isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-1 font-medium text-[#f8dc70] underline decoration-[#f8dc70] decoration-2 underline-offset-2 hover:text-white"
          >
            {expanded ? "kam dikhayein" : "aur padhein"}
          </button>
        )}
      </p>

      <div
        className={`mt-4 flex items-center gap-1.5 border-t pt-3 text-xs ${
          isMain ? "border-[#d4a017]/30 text-[#daa84a]" : "border-[#ead8a8] text-[#9E7840]"
        }`}
      >
        <GoogleGlyph className="h-3.5 w-3.5" />
        Posted on Google
      </div>
    </div>
  );
}

export default function ClientReviews({
  reviewsEndpoint = null,
  googleMapsReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJBc_JSepW-qsR36L1MiU-6-A",
  googleMapsProfileUrl = "https://maps.google.com/?cid=16207116013512532703",
  autoplayMs = 5000,
}) {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [meta, setMeta] = useState({ average: 4.8, total: 132 });
  const [status, setStatus] = useState(reviewsEndpoint ? "loading" : "fallback");
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!reviewsEndpoint) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(reviewsEndpoint);
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data.reviews) && data.reviews.length) {
          setReviews(data.reviews);
        }
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

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, autoplayMs);
    return () => clearInterval(timerRef.current);
  }, [reviews.length, autoplayMs]);

  const restartAutoplay = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, autoplayMs);
  };

  const goTo = (i) => {
    setIndex(((i % reviews.length) + reviews.length) % reviews.length);
    restartAutoplay();
  };

  const prevIndex = ((index - 1) % reviews.length + reviews.length) % reviews.length;
  const nextIndex = (index + 1) % reviews.length;

  return (
    <section className="w-full overflow-hidden bg-[#FDFAF3] px-4 py-14 sm:px-8 sm:py-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="flex items-center gap-2 rounded-full border border-[#E8C878] bg-[#FBF3DC] px-4 py-1.5 shadow-sm">
          <GoogleGlyph className="h-4 w-4" />
          <span className="text-[11px] font-bold tracking-wide text-[#8b6914] [font-family:'Cinzel',serif]">
            GOOGLE REVIEWS
          </span>
        </div>

        <h2 className="mt-5 [font-family:'Cinzel',serif] text-3xl font-bold tracking-wide text-[#1A1008] sm:text-4xl">
          Hamare <span className="italic text-[#B8860B]">Clients</span> Kya Kehte Hain
        </h2>

        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#B8860B]" />
          <span className="text-base text-[#B8860B]">❀</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#B8860B]" />
        </div>

        <p className="mt-4 max-w-md text-[15px] italic text-[#7a6040] [font-family:'Cormorant_Garamond',serif] sm:text-base">
          Ye reviews seedhe humari Google Business Profile se aate hain — koi editing nahi, sirf asli feedback.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-[#E8C878] bg-white px-4 py-2.5 shadow-sm">
            <span className="[font-family:'Cinzel',serif] text-2xl font-bold text-[#1A1008]">
              {meta.average.toFixed(1)}
            </span>
            <div className="flex flex-col items-start leading-tight">
              <StarRow rating={Math.round(meta.average)} size={13} />
              <span className="text-[11px] text-[#9E7840]">{meta.total}+ reviews</span>
            </div>
          </div>

          <a
            href={googleMapsReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C8780A] to-[#B8860B] px-5 py-2.5 text-sm font-bold tracking-wide text-[#FFF8E8] shadow-sm [font-family:'Cinzel',serif] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,120,10,0.4)]"
          >
            Apna Review Daalein
            <ExternalLink size={14} />
          </a>
        </div>

        {status === "fallback" && reviewsEndpoint && (
          <p className="mt-3 text-[11px] text-amber-600">
            Live Google data load nahi ho payi, sample reviews dikhaye ja rahe hain.
          </p>
        )}
      </div>

      <div className="relative mx-auto mt-12 flex max-w-6xl items-center justify-center">
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous review"
          className="absolute left-0 z-20 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8C878] bg-white text-[#8b6914] shadow-sm transition-colors hover:border-[#B8860B] hover:bg-[#FBF3DC] sm:flex"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex w-full items-center justify-center gap-4 sm:gap-6 lg:gap-10">
          <TestimonialCard review={reviews[prevIndex]} size="peek" />
          <TestimonialCard key={reviews[index].id} review={reviews[index]} size="main" />
          <TestimonialCard review={reviews[nextIndex]} size="peek" />
        </div>

        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next review"
          className="absolute right-0 z-20 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8C878] bg-white text-[#8b6914] shadow-sm transition-colors hover:border-[#B8860B] hover:bg-[#FBF3DC] sm:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8C878] bg-white text-[#8b6914] shadow-sm"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next review"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8C878] bg-white text-[#8b6914] shadow-sm"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {reviews.map((r, i) => (
          <button
            key={r.id}
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-gradient-to-r from-[#C8780A] to-[#B8860B]" : "w-2 bg-[#e8dcc0] hover:bg-[#d4b870]"
            }`}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={googleMapsProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 [font-family:'Cinzel',serif] text-sm font-semibold tracking-wide text-[#8b6914] underline decoration-[#B8860B] decoration-2 underline-offset-4 hover:text-[#B8860B]"
        >
          <MapPin size={15} />
          Google Maps Par Saari Reviews Dekhein
        </a>
      </div>
    </section>
  );
}