import React, { useEffect, useRef, useState } from "react";

import sathyasaibaba from "../../assets/client Logo/sathya-sai-baba.jpg";
import DevotionalIndia from "../../assets/client Logo/Devotional India Official.webp";
import movementwithphysios from "../../assets/client Logo/movementwithphysios.png";
import PrashantjiMaharaj from "../../assets/client Logo/Prashant ji Maharaj.png";
import VipinKrishnaShastriJi from "../../assets/client Logo/Vipin Krishna Shastri Ji.jpeg";
import PujyaBhagwatji from "../../assets/client Logo/Pujya Bhagwat ji.png";

const clients = [
  { name: "Sathya Sai Baba", handle: "Sathya Sai Baba", role: "Spiritual Leader", image: sathyasaibaba },
  { name: "Devotional India Official", handle: "Devotional India Official", role: "Devotional Channel", image: DevotionalIndia },
  { name: "movement with PHYSIOS", handle: "movementwithphysios", role: "Health & Fitness", image: movementwithphysios },
  { name: "Prashantji Maharaj", handle: "@PujyaShriPrashantjimaharaj", role: "Spiritual Guide", image: PrashantjiMaharaj },
  { name: "Vipin Krishna Shastri Ji", handle: "@vipinkrishnashastriji", role: "Kathavachak", image: VipinKrishnaShastriJi },
  { name: "Pujya Bhagwat ji DHARMSHEEL", handle: "@shribhagwatji", role: "Spiritual Speaker", image: PujyaBhagwatji },
];

export default function ClientsSection() {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const moveCarousel = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".client-card");
    const gap = window.innerWidth <= 640 ? 20 : 32;
    const step = card ? card.getBoundingClientRect().width + gap : 320;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame;
    let previous = 0;

    const animate = (time) => {
      if (!previous) previous = time;
      const delta = time - previous;
      previous = time;

      if (!isPaused && track.scrollWidth > track.clientWidth) {
        track.scrollLeft += delta * 0.060;
        const loopPoint = track.scrollWidth / 2;
        if (track.scrollLeft >= loopPoint) track.scrollLeft -= loopPoint;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  return (
    <section className="team-section relative w-full overflow-hidden py-14 md:py-16">
      <div className="team-inner relative z-10 w-full px-3 sm:px-5">
        <header className="team-heading mx-auto text-center">
          <h2>Our Clients</h2>
          <p className="team-subtitle">Trusted by spiritual voices and creators.</p>
          <p className="team-description">
            We help spiritual creators grow their presence across YouTube,
            Instagram, Facebook and other digital platforms.
          </p>
        </header>

        <div className="team-carousel-wrap relative mt-8 md:mt-10 w-full">
          <div className="team-fade team-fade-left" />
          <div className="team-fade team-fade-right" />
          <div
            ref={trackRef}
            className="team-track"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {[...clients, ...clients].map((client, index) => (
              <article className="client-card" key={`${client.name}-${index}`}>
                <div className="client-photo-frame">
                  <img src={client.image} alt={client.name} loading="lazy" draggable="false" />
                </div>
                <div className="client-details">
                  <h3>{client.name}</h3>
                  <p>{client.role}</p>
                  <span className="client-handle">{client.handle}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="team-controls" aria-label="Carousel controls">
          <button type="button" onClick={() => moveCarousel(-1)} aria-label="Previous clients">‹</button>
          <button
            type="button"
            onClick={() => setIsPaused((value) => !value)}
            aria-label={isPaused ? "Play carousel" : "Pause carousel"}
          >
            {isPaused ? "▶" : "Ⅱ"}
          </button>
          <button type="button" onClick={() => moveCarousel(1)} aria-label="Next clients">›</button>
        </div>
      </div>

      <style>{`
        .team-section {
          width: 100%;
          background:
            radial-gradient(900px 520px at 7% 0%, rgba(255, 116, 45, .19), transparent 62%),
            radial-gradient(760px 480px at 96% 88%, rgba(239, 174, 111, .22), transparent 60%),
            radial-gradient(650px 360px at 52% 48%, rgba(255, 255, 255, .78), transparent 72%),
            linear-gradient(135deg, #FFF8F1 0%, #F8EDE3 46%, #F4E3D5 100%);
          color: #49352C;
          font-family: Inter, Arial, sans-serif;
        }
        .team-inner { max-width: none; }
        .team-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: min(520px, 70vw);
          height: 1px;
          transform: translateX(-50%);
          background: linear-gradient(90deg, transparent, rgba(255,90,31,.62), transparent);
          pointer-events: none;
        }
        .team-heading { max-width: 760px; }
        .team-heading h2 {
          margin: 0;
          color: #542D23;
          text-shadow: 0 2px 18px rgba(154,91,52,.10);
          font-size: clamp(30px, 3vw, 38px);
          line-height: 1.15;
          font-weight: 750;
          letter-spacing: -.035em;
        }
        .team-subtitle {
          margin: 14px 0 0;
          color: #765448;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(16px, 1.5vw, 20px);
        }
        .team-description {
          max-width: 760px;
          margin: 16px auto 0;
          color: #806D63;
          font-size: 15px;
          line-height: 1.8;
        }
        .team-carousel-wrap { width: 100%; }
        .team-track {
          display: flex;
          align-items: flex-start;
          gap: clamp(16px, 2vw, 32px);
          width: 100%;
          overflow-x: auto;
          padding: 6px 3px 16px;
          scrollbar-width: none;
          scroll-behavior: auto;
          overscroll-behavior-x: contain;
          -webkit-overflow-scrolling: touch;
        }
        .team-track::-webkit-scrollbar { display: none; }
        .client-card {
          flex: 0 0 calc((100vw - 100px) / 5);
          min-width: 0;
          text-align: center;
        }
        .client-photo-frame {
          width: 100%;
          height: clamp(300px, 25vw, 430px);
          overflow: hidden;
          background: #E9D8CB;
          box-shadow: 0 18px 42px rgba(112,66,39,.16), 0 0 0 1px rgba(255,255,255,.82);
          position: relative;
          clip-path: polygon(
            0 9%, 8% 12%, 18% 15%, 30% 17%, 42% 16%,
            54% 13%, 66% 8%, 78% 5%, 90% 7%, 100% 10%,
            100% 91%, 92% 94%, 82% 97%, 70% 99%, 58% 98%,
            46% 95%, 34% 92%, 22% 91%, 10% 93%, 0 96%
          );
        }
        .client-photo-frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 500ms ease;
        }
        .client-card:hover .client-photo-frame img { transform: scale(1.045); }
        .client-details { padding: 8px 6px 0; }
        .client-details h3 {
          display: inline-block;
          margin: 0;
          color: #5B382D;
          font-size: clamp(17px, 1.45vw, 23px);
          line-height: 1.35;
          font-weight: 500;
          border-bottom: 2px solid #FF5A1F;
          overflow-wrap: anywhere;
        }
        .client-details p {
          margin: 8px 0 0;
          color: #806D63;
          font-size: 13px;
          line-height: 1.5;
        }
        .client-handle {
          display: block;
          margin-top: 5px;
          color: #927D72;
          font-size: 11px;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }
        .team-fade {
          position: absolute;
          z-index: 2;
          top: 0;
          bottom: 0;
          width: 34px;
          pointer-events: none;
        }
        .team-fade-left {
          left: 0;
          background: linear-gradient(90deg, #FFF8F1 0%, rgba(255,248,241,0) 100%);
        }
        .team-fade-right {
          right: 0;
          background: linear-gradient(270deg, #F4E3D5 0%, rgba(244,227,213,0) 100%);
        }
        .team-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 18px;
        }
        .team-controls button {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border: 1px solid rgba(255,255,255,.9);
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(255,255,255,.92), rgba(248,232,219,.94));
          color: #E94F0A;
          font-size: 22px;
          line-height: 1;
          box-shadow: 0 8px 24px rgba(122,74,45,.12), 0 1px 0 rgba(255,255,255,.95) inset;
          cursor: pointer;
          transition: background .2s ease, transform .2s ease;
        }
        .team-controls button:hover {
          background: linear-gradient(145deg, #FF6A22, #E84700);
          color: #fff;
          border-color: rgba(255,106,34,.65);
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .client-card { flex-basis: calc((100vw - 72px) / 3); }
          .client-photo-frame { height: clamp(280px, 42vw, 380px); }
        }
        @media (max-width: 640px) {
          .team-section { padding-top: 44px; padding-bottom: 46px; }
          .team-description { font-size: 13px; line-height: 1.65; }
          .team-track { gap: 20px; padding-inline: 2px; }
          .client-card { flex-basis: calc(100vw - 64px); }
          .client-photo-frame { height: min(112vw, 520px); }
          .client-details h3 { font-size: 20px; }
          .team-fade { width: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .client-photo-frame img, .team-controls button { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
