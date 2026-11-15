
import React, { useState } from "react";
import {
  Instagram,
  Youtube,
  ArrowUpRight,
  TrendingUp,
  Users,
  Play,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";

// Instagram Screenshots
import instagramBefore from "../../assets/before&After /BEFORE.jpg";
import instagramAfter from "../../assets/before&After /After.jpg";

// YouTube Screenshots
import youtubeBefore from "../../assets/before&After /ytAfter.jpg";
import youtubeAfter from "../../assets/before&After /YTBEFORE.jpg";

// Platform Data
const platformData = {
  youtube: {
    before: {
      posts: "45",
      followers: "5.2K",
      following: "12",
      description: "Spiritual YouTube Channel",
      thumbnails: [
        { title: "Daily Pravachan", bg: "from-stone-400 to-stone-700" },
        { title: "Satsang Video", bg: "from-orange-300 to-amber-800" },
        { title: "Old Katha", bg: "from-slate-400 to-stone-600" },
      ],
    },
    after: {
      posts: "240",
      followers: "120K",
      following: "6",
      description: "Official Spiritual Channel",
      thumbnails: [
        { title: "गुरु की महिमा", bg: "from-amber-500 to-orange-950" },
        { title: "सनातन धर्म", bg: "from-slate-800 to-indigo-950" },
        { title: "कथा का महत्व", bg: "from-orange-500 to-red-950" },
      ],
    },
  },
};

const services = [
  { icon: ImageIcon, label: "Creative Design" },
  { icon: Play, label: "Video Content" },
  { icon: TrendingUp, label: "Growth Strategy" },
  { icon: Users, label: "Audience Growth" },
];

// Thumbnail Component
function ThumbnailGrid({ items, isAfter }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {items.map((item, index) => (
        <div
          key={index}
          className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${item.bg} flex items-end p-2`}
        >
          <div className="absolute inset-0 bg-black/10" />

          <span className="relative z-10 text-white text-[10px] sm:text-xs font-bold leading-tight">
            {item.title}
          </span>

          <div className="absolute top-2 right-2 bg-white/90 rounded-md p-1">
            <Play
              size={10}
              className="text-orange-600 fill-orange-600"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// YouTube Profile Card
function ProfileCard({ data, isAfter }) {
  return (
    <div
      className={`rounded-[26px] border p-4 sm:p-5 bg-white transition-all duration-300 ${
        isAfter
          ? "border-orange-200 shadow-[0_12px_40px_rgba(249,115,22,0.09)]"
          : "border-gray-200 shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
            isAfter
              ? "bg-gradient-to-br from-orange-400 to-orange-600"
              : "bg-gradient-to-br from-gray-400 to-gray-500"
          }`}
        >
          BM
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              Bhakti Marg
            </h3>

            {isAfter && (
              <CheckCircle2
                size={15}
                className="text-blue-500"
              />
            )}
          </div>

          <p className="text-xs text-gray-500">
            {data.description}
          </p>
        </div>

        <Youtube className="text-red-600" size={25} />
      </div>

      <div className="grid grid-cols-3 text-center border-y border-gray-100 py-4">
        <div>
          <p className="font-bold text-gray-900 text-lg sm:text-xl">
            {data.posts}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-500">
            Videos
          </p>
        </div>

        <div>
          <p
            className={`font-bold text-lg sm:text-xl ${
              isAfter ? "text-orange-600" : "text-gray-900"
            }`}
          >
            {data.followers}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-500">
            Subscribers
          </p>
        </div>

        <div>
          <p className="font-bold text-gray-900 text-lg sm:text-xl">
            {data.following}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-500">
            Playlists
          </p>
        </div>
      </div>

      <ThumbnailGrid
        items={data.thumbnails}
        isAfter={isAfter}
      />
    </div>
  );
}

// Main Component
export default function SocialMediaShowcase() {
  const [activeTab, setActiveTab] = useState("instagram");

  const youtubeData = platformData.youtube;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/30 to-white py-16 sm:py-24 px-4 sm:px-6">

      {/* Background */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">

          <p className="text-orange-600 text-xs font-bold tracking-[0.25em] uppercase mb-3">
            VAANI360MEDIA · OUR WORK
          </p>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
            Our Work in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Action.
            </span>
          </h2>

          <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            We transform social media presence into professional
            digital experiences through creative content and
            strategic management.
          </p>

        </div>

        {/* Platform Tabs */}
        <div className="flex justify-center mb-10">

          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white border border-gray-200 shadow-[0_5px_25px_rgba(0,0,0,0.06)]">

            <button
              onClick={() => setActiveTab("instagram")}
              className={`flex items-center gap-2 px-5 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "instagram"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Instagram size={18} />
              Instagram
            </button>

            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex items-center gap-2 px-5 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "youtube"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Youtube size={19} />
              YouTube
            </button>

          </div>
        </div>

        {/* Transformation Section */}
        <div
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start animate-[fadeIn_.4s_ease]"
        >

          {/* BEFORE */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">

              <div>
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                  01 / BEFORE
                </span>

                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  Before Management
                </h3>
              </div>

              <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1.5">
                Previous
              </span>

            </div>

            {activeTab === "instagram" ? (
              <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
                <img
                  src={instagramBefore}
                  alt="Instagram Before Management"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            ) : (
              <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
                <img
                  src={youtubeBefore}
                  alt="YouTube Before Management"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            )}

          </div>

          {/* AFTER */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">

              <div>
                <span className="text-orange-500 text-xs font-semibold uppercase tracking-widest">
                  02 / AFTER
                </span>

                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  With Our Management
                </h3>
              </div>

              <span className="text-xs text-orange-600 bg-orange-50 border border-orange-100 rounded-full px-3 py-1.5">
                Our Work
              </span>

            </div>

            {activeTab === "instagram" ? (
              <div className="bg-white p-2 rounded-2xl border border-orange-200 shadow-[0_10px_35px_rgba(249,115,22,0.08)]">
                <img
                  src={instagramAfter}
                  alt="Instagram After Management"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            ) : (
              <div className="bg-white p-2 rounded-2xl border border-orange-200 shadow-[0_10px_35px_rgba(249,115,22,0.08)]">
                <img
                  src={youtubeAfter}
                  alt="YouTube After Management"
                  className="w-full h-auto rounded-xl object-contain"
                />
              </div>
            )}

          </div>

        </div>

        {/* Growth Indicator */}
        <div className="mt-8 flex justify-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-5 py-3 shadow-sm">

            <TrendingUp className="text-green-600" size={19} />

            <span className="text-sm font-semibold text-gray-800">
              Strategy. Creativity. Consistent Growth.
            </span>

          </div>

        </div>

        {/* Services */}
        
        {/* CTA */}

      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </section>
  );
}
