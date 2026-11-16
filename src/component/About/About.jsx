
import React, { useEffect, useState } from "react";
import VideoEditing from "../../assets/WorkImage/VideoEditing.png";
import GraphicDesign from "../../assets/WorkImage/Graphic Design.png";
import WebsiteDesign from "../../assets/WorkImage/Website Design.png";
import ProductPhotography from "../../assets/WorkImage/Product Photography.png";
import MarketingGrowth from "../../assets/WorkImage/Marketing & Growth.png";

const SEO_KEYWORDS = [
  "Vaani 360 Media",
  "devotional social media management",
  "spiritual social media management",
  "devotional video editing",
  "spiritual video editing",
  "Baba Ji video editing",
  "devotional reels editing",
  "spiritual reels",
  "Bhakti video editing",
  "religious content creation",
  "Sanatan social media management",
  "spiritual digital marketing",
  "devotional content creation",
  "YouTube devotional video editing",
  "Instagram devotional content",
  "spiritual branding",
  "darbar promotion",
  "devotional graphic design",
  "spiritual website design",
  "temple website development",
  "trust website design",
  "ashram website development",
  "spiritual brand marketing",
];

export default function WhiteServicesUI() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const title =
      "Spiritual Digital Services | Vaani 360 Media";

    const description =
      "Vaani 360 Media provides website development, website design, devotional and spiritual social media management, video editing, graphic design, product photography and digital marketing for temples, trusts, ashrams, spiritual leaders and devotional brands.";

    document.title = title;

    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", SEO_KEYWORDS.join(", "));
    setMeta("robots", "index, follow");
  }, []);

  const services = [
    {
      title: "Website Development & Design",
      img: WebsiteDesign,
      tag: "WEB",
      bg: "bg-[#fff1f2]",
    },
    {
      title: "Video Editing",
      img: VideoEditing,
      tag: "VIDEO",
      bg: "bg-[#fff7ed]",
    },
    {
      title: "Graphic Design",
      img: GraphicDesign,
      tag: "DESIGN",
      bg: "bg-[#fefce8]",
    },
    {
      title: "Product Photography",
      img: ProductPhotography,
      tag: "PHOTO",
      bg: "bg-[#fef3c7]",
    },
    {
      title: "Marketing & Growth",
      img: MarketingGrowth,
      tag: "ADS / AI",
      bg: "bg-[#f9fafb]",
    },
  ];

  return (
    <section className="services-temple-section relative overflow-hidden py-16 md:py-20 px-5 md:px-8 mt-5">

      <style>{`
        .services-temple-section {
          background:
            radial-gradient(ellipse at 5% 90%, rgba(242,107,0,0.055), transparent 35%),
            radial-gradient(ellipse at 95% 15%, rgba(201,151,43,0.07), transparent 30%),
            linear-gradient(180deg, #fffdf9 0%, #fff8ef 100%);
        }

        .services-temple-section * {
          box-sizing: border-box;
        }

        .temple-heading {
          color: #4b200d;
          font-family: inherit;
        }

        .temple-heading-highlight {
          color: #ed6800;
        }

        .temple-card {
          position: relative;
          isolation: isolate;
          overflow: visible;
          min-width: 0;
          min-height: 440px;
          background: linear-gradient(180deg, #fff4e3 0%, #fffdf9 75%);
          border: 1.5px solid #f4b45c;
          border-radius: 48% 48% 15px 15px / 18% 18% 15px 15px;
          box-shadow:
            0 8px 16px rgba(91, 43, 12, 0.07),
            inset 0 0 0 4px rgba(255,255,255,0.85);
          transition:
            transform 0.4s ease,
            box-shadow 0.4s ease,
            border-color 0.4s ease;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .temple-card::before {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px solid rgba(239, 133, 26, 0.45);
          border-radius: 48% 48% 11px 11px / 18% 18% 11px 11px;
          pointer-events: none;
          z-index: -1;
        }

        .temple-card:hover,
        .temple-card.is-active {
          transform: translateY(-9px);
          border-color: #e97812;
          box-shadow:
            0 18px 30px rgba(117, 55, 13, 0.13),
            inset 0 0 0 4px rgba(255,255,255,0.9);
        }

        .temple-spire {
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          z-index: 5;
        }

        .temple-spire::before {
          content: "";
          position: absolute;
          left: 9px;
          top: 0;
          width: 6px;
          height: 25px;
          background: linear-gradient(90deg, #b94c00, #ff9a26);
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }

        .temple-flag {
          position: absolute;
          top: 1px;
          left: 15px;
          width: 20px;
          height: 11px;
          background: #f07808;
          clip-path: polygon(0 0, 100% 0, 72% 50%, 100% 100%, 0 100%);
        }

        /* BIG SERVICE IMAGES */
        .temple-card-image {
          height: 290px;
          width: 100%;
          object-fit: contain;
          padding: 0;
          transform: scale(1.12);
          transition: transform 0.5s ease;
          filter: none;
        }

        .temple-card:hover .temple-card-image,
        .temple-card.is-active .temple-card-image {
          transform: scale(1.2);
        }

        .temple-tag {
          color: #a4470b;
          letter-spacing: 3px;
          font-size: 11px;
          font-weight: 700;
        }

        .temple-service-title {
          color: #4b200d;
          font-weight: 700;
          letter-spacing: -0.4px;
        }

        .temple-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-top: 23px;
          color: #ed790d;
        }

        .temple-divider::before,
        .temple-divider::after {
          content: "";
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ed790d);
        }

        .temple-divider::after {
          background: linear-gradient(90deg, #ed790d, transparent);
        }

        .temple-lotus {
          font-size: 23px;
          line-height: 1;
          color: #e97808;
        }

        .temple-watermark {
          position: absolute;
          top: 10px;
          right: 0;
          width: 230px;
          opacity: 0.09;
          pointer-events: none;
        }

        @media (max-width: 1023px) {
          .temple-card {
            min-height: 420px;
          }

          .temple-card-image {
            height: 270px;
          }
        }

        @media (max-width: 639px) {
          .temple-card {
            min-height: 390px;
            max-width: 330px;
            width: 100%;
            margin: 0 auto;
          }

          .temple-card-image {
            height: 250px;
          }

          .temple-card:hover {
            transform: none;
          }

          .temple-card:active {
            transform: translateY(-5px);
          }

          .temple-watermark {
            width: 130px;
            top: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .temple-card,
          .temple-card-image {
            transition: none;
          }
        }
      `}</style>

      {/* TEMPLE WATERMARK */}
      <div className="temple-watermark">
        <svg viewBox="0 0 240 250" fill="none">
          <path
            d="M120 12 L133 42 L150 65 L166 89 L183 113 L205 145 L220 174 L20 174 L35 145 L57 113 L74 89 L90 65 L107 42 Z"
            stroke="#d97706"
            strokeWidth="3"
          />
          <path
            d="M120 12 V174 M90 65 H150 M57 113 H183 M35 145 H205 M75 89 H165"
            stroke="#d97706"
            strokeWidth="2"
          />
          <path
            d="M20 174 H220 M30 184 H210 M45 194 H195"
            stroke="#d97706"
            strokeWidth="3"
          />
          <path
            d="M120 12 L120 0 L145 10 L120 20"
            fill="#ed790d"
          />
          <path
            d="M100 174 V145 Q120 112 140 145 V174"
            stroke="#d97706"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center mb-16 md:mb-20">

        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs md:text-sm font-bold tracking-[0.35em] text-[#8b390e]">
              OUR SERVICES
            </span>
            <span className="w-16 h-[2px] bg-[#ed790d]" />
          </div>

          <h1 className="temple-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight">
            Divine Digital
            <br />
            <span className="temple-heading-highlight">
              Growth Solutions
            </span>
          </h1>
        </div>

        <div className="md:border-l-2 border-[#e9c49b] md:pl-9">
          <p className="text-[#40352e] text-base md:text-xl leading-relaxed max-w-2xl">
            We help spiritual brands grow with devotion-driven design,
            powerful content and soulful storytelling. From darbar promotions
            to भक्त community growth, we deliver divine results.
          </p>
        </div>

      </div>

      {/* TEMPLE SERVICE CARDS */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 md:gap-5">

        {services.map((item, i) => (
          <div
            key={i}
            className={`temple-card service-mobile-card cursor-pointer ${
              activeCard === i ? "is-active" : ""
            }`}
            onClick={() =>
              setActiveCard(activeCard === i ? null : i)
            }
            role="button"
            tabIndex={0}
            aria-pressed={activeCard === i}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveCard(activeCard === i ? null : i);
              }
            }}
          >

            {/* TEMPLE TOP */}
            <div className="temple-spire">
              <span className="temple-flag" />
            </div>

            {/* SERVICE TAG */}
            <div className="relative z-10 text-center pt-10">
              <span className="temple-tag">
                {item.tag}
              </span>
            </div>

            {/* BIG SERVICE IMAGE */}
            <div className="relative flex items-center justify-center px-1 mt-2 overflow-hidden">
              <img
                src={item.img}
                alt={`${item.title} - Vaani 360 Media spiritual digital service`}
                title={`${item.title} | Vaani 360 Media`}
                className="temple-card-image"
              />
            </div>

            {/* SERVICE TITLE */}
            <div className="relative z-10 text-center px-2 pt-3 pb-5">

              <h3 className="temple-service-title text-lg md:text-[17px] lg:text-lg">
                {item.title}
              </h3>

              {/* LOTUS DECORATION */}
              <div className="temple-divider">
                <span className="temple-lotus">❀</span>
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* SEO CONTEXT */}
      <div className="relative z-10 max-w-5xl mx-auto mt-14 text-center">
        <p className="text-sm leading-7 text-[#705746]">
          Vaani 360 Media specializes in website development and design,
          devotional video editing, spiritual graphic design, social media
          management, product photography and digital marketing for temples,
          trusts, ashrams, spiritual leaders and devotional brands.
        </p>
      </div>

      {/* FOOTER SERVICES */}
      <div className="relative z-10 max-w-7xl mx-auto mt-8 text-center text-[#9b4b13] text-xs md:text-sm font-semibold tracking-wide">
        Social Media Seva • Bhakti Branding • Darbar Promotion • Spiritual Growth
      </div>

    </section>
  );
}
