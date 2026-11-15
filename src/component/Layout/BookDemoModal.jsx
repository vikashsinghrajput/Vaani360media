import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { X, ChevronLeft, ChevronRight, Clock, Calendar, User, ChevronDown } from "lucide-react";

// ─────────────────────────────────────────────────────────
//  🔧 EMAILJS CONFIG — Yahan apni EmailJS details daalo
//     Step-by-step guide neeche comment mein hai
// ─────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_efgqrfq";
const EMAILJS_TEMPLATE_ID = "template_uxwycqq";
const EMAILJS_PUBLIC_KEY = "W4G86M_g7xq2ZPgSn";   // EmailJS dashboard > Account > API Keys

// ─────────────────────────────────────────────────────────
//  🔧 reCAPTCHA v2 CONFIG
//  1. https://www.google.com/recaptcha/admin/create pe site register karo
//     (type: "reCAPTCHA v2" -> "I'm not a robot Checkbox")
//  2. Yahan neeche apni SITE KEY paste karo
//  3. SECRET KEY EmailJS -> apna Template -> Settings tab -> "Enable reCAPTCHA V2
//     verification" mein paste karo
// ─────────────────────────────────────────────────────────
const RECAPTCHA_SITE_KEY = "6LfDeoctAAAAAGDA9ty2egIf1trKByn_k7NU2gtH";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Mo","Tu","We","Th","Fr","Sa","Su"];

const getDaysInMonth  = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
};

const EVENING_SLOTS = ["04:30 pm","05:00 pm","05:30 pm","06:00 pm","06:30 pm","07:00 pm","07:30 pm"];
const NIGHT_SLOTS   = ["08:00 pm","08:30 pm","09:00 pm","09:30 pm","10:00 pm","10:30 pm","11:00 pm","11:30 pm"];

export default function BookDemoModal({ isOpen, onClose }) {
  const today = new Date();
  const [step, setStep]                 = useState(1);
  const [year, setYear]                 = useState(today.getFullYear());
  const [month, setMonth]               = useState(today.getMonth());
  const [selectedDay, setSelectedDay]   = useState(today.getDate());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm]                 = useState({ name: "", email: "", company: "", phone: "" });
  const [submitted, setSubmitted]       = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");

  // ── reCAPTCHA state/refs ──
  const captchaRef    = useRef(null);
  const widgetIdRef   = useRef(null);
  const recaptchaOn   = RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== "YOUR_RECAPTCHA_SITE_KEY";

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else        document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDay(today.getDate());
      setSelectedSlot(null);
      setForm({ name: "", email: "", company: "", phone: "" });
      setSubmitted(false);
      setError("");
      setYear(today.getFullYear());
      setMonth(today.getMonth());
      widgetIdRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Load reCAPTCHA script + render widget once we reach Step 2
  useEffect(() => {
    if (!isOpen || step !== 2 || submitted || !recaptchaOn) return;

    const renderWidget = () => {
      if (window.grecaptcha && captchaRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
        });
      }
    };

    if (window.grecaptcha && window.grecaptcha.render) {
      renderWidget();
      return;
    }

    const existing = document.getElementById("recaptcha-script");
    if (!existing) {
      window.onRecaptchaLoad = renderWidget;
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      window.onRecaptchaLoad = renderWidget;
    }
  }, [isOpen, step, submitted, recaptchaOn]);

  if (!isOpen) return null;

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDayOffs = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null); setSelectedSlot(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null); setSelectedSlot(null);
  };

  const isPast = (d) => {
    const sel = new Date(year, month, d);
    const now = new Date(); now.setHours(0,0,0,0);
    return sel < now;
  };

  // ── EmailJS send function ──
  const handleSubmit = async () => {
    if (!form.name || !form.email) return;

    // Verify captcha before sending, if enabled
    let captchaToken = "";
    if (recaptchaOn) {
      captchaToken = window.grecaptcha ? window.grecaptcha.getResponse(widgetIdRef.current) : "";
      if (!captchaToken) {
        setError("Please verify you're not a robot before submitting.");
        return;
      }
    }

    setLoading(true);
    setError("");

    const bookingDate = `${MONTHS[month]} ${selectedDay}, ${year}`;
    const bookingTime = selectedSlot;

    // Ye template variables aapke EmailJS template mein {{variable}} se match karne chahiye
    const templateParams = {
      to_email:    "vsr81150@gmail.com",
      from_name:   form.name,
      from_email:  form.email,
      company:     form.company || "N/A",
      phone:       form.phone   || "N/A",
      demo_date:   bookingDate,
      demo_time:   bookingTime,
      timezone:    "Asia/Kolkata - IST (+05:30)",
      // message field — saara data ek jagah (fallback ke liye)
      message: `
📋 NEW DEMO BOOKING

👤 Name    : ${form.name}
📧 Email   : ${form.email}
🏢 Company : ${form.company || "N/A"}
📞 Phone   : ${form.phone   || "N/A"}

📅 Date    : ${bookingDate}
⏰ Time    : ${bookingTime}
🌐 Timezone: Asia/Kolkata - IST (+05:30)
      `.trim(),
    };

    // reCAPTCHA token must live INSIDE template_params, under the exact
    // key "g-recaptcha-response" — this is required by EmailJS's API.
    if (captchaToken) {
      templateParams["g-recaptcha-response"] = captchaToken;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Email send karne mein problem aayi. Dobara try karein.");
      if (recaptchaOn && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    } finally {
      setLoading(false);
    }
  };

  const SlotBtn = ({ slot }) => (
    <button
      onClick={() => setSelectedSlot(slot)}
      className={`px-3 py-2 rounded-xl text-[12px] font-semibold border transition-all duration-200 [font-family:'Cinzel',serif]
        ${selectedSlot === slot
          ? "bg-gradient-to-r from-[#C8780A] to-[#B8860B] text-[#FFF8E8] border-transparent shadow-[0_4px_14px_rgba(200,120,10,0.4)]"
          : "bg-[#FFFBF0] border-[#E8C878] text-[#5C4020] hover:border-[#B8860B] hover:text-[#B8860B] hover:shadow-[0_2px_10px_rgba(184,134,11,0.15)]"
        }`}
    >
      {slot}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .emailjs-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,248,232,0.3);
          border-top-color: #FFF8E8;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1A0A00]/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl bg-[#FDFAF3] rounded-3xl overflow-hidden
          shadow-[0_30px_80px_rgba(26,10,0,0.35)] border border-[#E8C878]"
        style={{ animation: "modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Shimmer top */}
        <div className="h-[3px] bg-gradient-to-r from-transparent via-[#E8C878] to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8C878]/50 bg-[#FBF3DC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8780A] to-[#B8860B]
              flex items-center justify-center shadow-[0_4px_12px_rgba(200,120,10,0.3)]">
              <span className="text-[#FFF8E8] text-lg">🕉️</span>
            </div>
            <div>
              <h2 className="text-[15px] font-black text-[#1A1008] [font-family:'Cinzel',serif] tracking-wide">
                Book a Demo
              </h2>
              <p className="text-[11px] text-[#9E7840] italic [font-family:'Cormorant_Garamond',serif]">
                Product Discussion | Demo &nbsp;·&nbsp; 30 mins
              </p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl
              border border-[#E8C878] bg-[#FFFBF0] text-[#5C4020]
              hover:border-[#B8860B] hover:text-[#B8860B] transition-all duration-200">
            <X size={16} />
          </button>
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-0 px-6 pt-4 pb-2">
          {[
            { n: 1, icon: <Calendar size={13} />, label: "Date & Time" },
            { n: 2, icon: <User size={13} />,     label: "Your Info"   },
          ].map(({ n, icon, label }, i) => (
            <div key={n} className="flex items-center">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold
                [font-family:'Cinzel',serif] transition-all duration-200
                ${step === n
                  ? "bg-gradient-to-r from-[#C8780A] to-[#B8860B] text-[#FFF8E8] shadow-[0_3px_10px_rgba(200,120,10,0.3)]"
                  : step > n ? "bg-[#E8C878]/40 text-[#B8860B]" : "text-[#9E7840]"
                }`}>
                {icon}&nbsp;{label}
              </div>
              {i < 1 && <div className="w-8 h-px bg-gradient-to-r from-[#E8C878] to-[#E8C878]/30 mx-1" />}
            </div>
          ))}
        </div>
        <div className="mx-6 h-px bg-gradient-to-r from-[#E8C878]/60 via-[#E8C878] to-[#E8C878]/60" />

        {/* ── STEP 1: Calendar + Slots ── */}
        {step === 1 && (
          <div className="grid md:grid-cols-[1fr_1.1fr] max-h-[65vh] overflow-y-auto">

            {/* Calendar */}
            <div className="p-5 border-r border-[#E8C878]/40">
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth}
                  className="w-7 h-7 flex items-center justify-center rounded-lg
                    border border-[#E8C878] text-[#5C4020] hover:border-[#B8860B]
                    hover:text-[#B8860B] transition-all duration-200">
                  <ChevronLeft size={14} />
                </button>
                <span className="text-[13px] font-bold text-[#1A1008] [font-family:'Cinzel',serif] tracking-wide">
                  {MONTHS[month]} {year}
                </span>
                <button onClick={nextMonth}
                  className="w-7 h-7 flex items-center justify-center rounded-lg
                    border border-[#E8C878] text-[#5C4020] hover:border-[#B8860B]
                    hover:text-[#B8860B] transition-all duration-200">
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                  <div key={d} className="text-center text-[10px] font-bold text-[#B8860B]
                    [font-family:'Cinzel',serif] tracking-wider py-1">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1">
                {Array(firstDayOffs).fill(null).map((_, i) => <div key={`e${i}`} />)}
                {Array(daysInMonth).fill(null).map((_, i) => {
                  const d    = i + 1;
                  const past = isPast(d);
                  const sel  = selectedDay === d;
                  return (
                    <button key={d} disabled={past}
                      onClick={() => { setSelectedDay(d); setSelectedSlot(null); }}
                      className={`w-full aspect-square flex items-center justify-center rounded-xl
                        text-[12px] font-semibold [font-family:'Cinzel',serif] transition-all duration-200
                        ${past ? "text-[#C8B89A]/40 cursor-not-allowed"
                          : sel
                            ? "bg-gradient-to-br from-[#C8780A] to-[#B8860B] text-[#FFF8E8] shadow-[0_4px_14px_rgba(200,120,10,0.4)]"
                            : "text-[#5C4020] hover:bg-[#F5EDD8] hover:text-[#B8860B]"
                        }`}>
                      {d}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-2 bg-[#FBF3DC] border border-[#E8C878] rounded-xl px-3 py-2">
                <span className="text-[#B8860B] text-xs">🌐</span>
                <span className="text-[11px] text-[#5C4020] [font-family:'Cinzel',serif] font-semibold flex-1">
                  Asia/Kolkata – IST (+05:30)
                </span>
                <ChevronDown size={12} className="text-[#B8860B]" />
              </div>
            </div>

            {/* Slots */}
            <div className="p-5 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-[#B8860B]" />
                <span className="text-[12px] font-bold text-[#1A1008] [font-family:'Cinzel',serif] tracking-wide">
                  Slot Availability
                </span>
                {selectedDay && (
                  <span className="text-[10px] text-[#9E7840] italic [font-family:'Cormorant_Garamond',serif]">
                    — {MONTHS[month]} {selectedDay}
                  </span>
                )}
              </div>

              {!selectedDay ? (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <span className="text-3xl mb-2">📅</span>
                  <p className="text-[12px] text-[#9E7840] italic [font-family:'Cormorant_Garamond',serif]">
                    Please select a date to see available slots
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest [font-family:'Cinzel',serif] mb-3">Evening</p>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {EVENING_SLOTS.map(s => <SlotBtn key={s} slot={s} />)}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#E8C878] to-transparent mb-4" />
                  <p className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest [font-family:'Cinzel',serif] mb-3">Night</p>
                  <div className="grid grid-cols-3 gap-2">
                    {NIGHT_SLOTS.map(s => <SlotBtn key={s} slot={s} />)}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 2: Your Info ── */}
        {step === 2 && !submitted && (
          <div className="p-6 max-h-[65vh] overflow-y-auto">
            <div className="max-w-md mx-auto space-y-4">

              {/* Booking summary badge */}
              <div className="bg-[#FBF3DC] border border-[#E8C878] rounded-2xl p-3 flex items-center gap-3 mb-6">
                <span className="text-[#B8860B] text-xl">✦</span>
                <div>
                  <p className="text-[11px] font-bold text-[#1A1008] [font-family:'Cinzel',serif]">
                    {MONTHS[month]} {selectedDay}, {year} · {selectedSlot}
                  </p>
                  <p className="text-[10px] text-[#9E7840] italic [font-family:'Cormorant_Garamond',serif]">
                    30-min Product Demo · IST (+05:30)
                  </p>
                </div>
              </div>

              {[
                { key: "name",    label: "Full Name *",          placeholder: "Arjun Sharma",         type: "text"  },
                { key: "email",   label: "Email Address *",      placeholder: "arjun@company.com",    type: "email" },
                { key: "company", label: "Company / Dealership", placeholder: "AutoBazaar Pvt. Ltd.", type: "text"  },
                { key: "phone",   label: "Phone Number",         placeholder: "+91 98765 43210",      type: "tel"   },
              ].map(({ key, label, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-[10px] font-bold text-[#B8860B] uppercase tracking-widest
                    [font-family:'Cinzel',serif] mb-1.5">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-[#FFFBF0] border border-[#E8C878] rounded-xl px-4 py-2.5
                      text-[13px] text-[#1A1008] [font-family:'Cinzel',serif]
                      placeholder:text-[#C8B89A] placeholder:italic placeholder:[font-family:'Cormorant_Garamond',serif]
                      focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.12)]
                      transition-all duration-200"
                  />
                </div>
              ))}

              {/* reCAPTCHA v2 widget */}
              {recaptchaOn && (
                <div className="flex justify-center pt-1">
                  <div ref={captchaRef} />
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-[12px] text-red-600
                  [font-family:'Cormorant_Garamond',serif] italic">
                  ⚠️ {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {submitted && (
          <div className="p-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8780A] to-[#B8860B]
              flex items-center justify-center text-3xl text-[#FFF8E8] mb-4
              shadow-[0_8px_24px_rgba(200,120,10,0.4)]">
              ✓
            </div>
            <h3 className="text-xl font-black text-[#1A1008] [font-family:'Cinzel',serif] mb-2">
              Demo Confirmed!
            </h3>
            <p className="text-[13px] text-[#9E7840] italic [font-family:'Cormorant_Garamond',serif] mb-1">
              {MONTHS[month]} {selectedDay}, {year} · {selectedSlot}
            </p>
            <p className="text-[12px] text-[#5C4020] [font-family:'Cormorant_Garamond',serif] max-w-xs mt-2">
              Booking details <span className="font-bold text-[#B8860B]">vsr81150@gmail.com</span> par
              send kar diye gaye hain. We look forward to meeting you!
            </p>
            <button onClick={onClose}
              className="mt-6 bg-gradient-to-r from-[#C8780A] to-[#B8860B] text-[#FFF8E8]
                px-8 py-2.5 rounded-full font-bold text-[12px] [font-family:'Cinzel',serif] tracking-widest
                hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,120,10,0.4)] transition-all duration-200">
              Done ✦
            </button>
          </div>
        )}

        {/* Footer */}
        {!submitted && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8C878]/50 bg-[#FBF3DC]">
            {step === 2
              ? <button onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#9E7840]
                    [font-family:'Cinzel',serif] hover:text-[#5C4020] transition-colors">
                  <ChevronLeft size={13} /> Back
                </button>
              : <div />
            }

            {step === 1
              ? <button disabled={!selectedDay || !selectedSlot} onClick={() => setStep(2)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-[12px]
                    [font-family:'Cinzel',serif] tracking-widest transition-all duration-200
                    ${selectedDay && selectedSlot
                      ? "bg-gradient-to-r from-[#C8780A] to-[#B8860B] text-[#FFF8E8] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,120,10,0.4)]"
                      : "bg-[#E8C878]/30 text-[#C8B89A] cursor-not-allowed"
                    }`}>
                  Continue <ChevronRight size={13} />
                </button>

              : <button
                  disabled={!form.name || !form.email || loading}
                  onClick={handleSubmit}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-[12px]
                    [font-family:'Cinzel',serif] tracking-widest transition-all duration-200
                    ${form.name && form.email && !loading
                      ? "bg-gradient-to-r from-[#C8780A] to-[#B8860B] text-[#FFF8E8] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,120,10,0.4)]"
                      : "bg-[#E8C878]/30 text-[#C8B89A] cursor-not-allowed"
                    }`}>
                  {loading
                    ? <><span className="emailjs-spinner" /> Sending...</>
                    : <>✦ Confirm Booking</>
                  }
                </button>
            }
          </div>
        )}
      </div>
    </div>
  );
}