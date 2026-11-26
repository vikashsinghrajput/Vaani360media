import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { X, ChevronLeft, ChevronRight, Clock, Calendar, User, ChevronDown } from "lucide-react";

// ─────────────────────────────────────────────────────────
//  🔧 EMAILJS CONFIG — Yahan apni EmailJS details daalo
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

/* =========================================================
   STYLES — liquid glass, same gold / saffron palette as before
   ========================================================= */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap');

.bd-layer {
  --ink: #1A1008; --ink-2: #5C4020; --ink-3: #9E7840;
  --gold-1: #C8780A; --gold-2: #B8860B; --line: #E8C878; --cream: #FDFAF3; --cream-2: #FBF3DC;
  --edge: rgba(255,255,255,.78);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased; color: var(--ink);
  position: fixed; inset: 0; z-index: 9999; display: grid; place-items: center; padding: 12px;
}
.bd-layer *, .bd-layer *::before, .bd-layer *::after { box-sizing: border-box; }
.bd-layer button, .bd-layer input { font-family: inherit; }

.bd-backdrop {
  position: absolute; inset: 0;
  background:
    radial-gradient(640px 460px at 18% 22%, rgba(242,140,40,.62), transparent 62%),
    radial-gradient(620px 460px at 86% 82%, rgba(226,92,112,.42), transparent 62%),
    radial-gradient(520px 420px at 74% 14%, rgba(232,184,64,.5), transparent 62%),
    rgba(32,14,0,.5);
  -webkit-backdrop-filter: blur(24px) saturate(170%); backdrop-filter: blur(24px) saturate(170%); animation: bdFade .25s ease;
}

/* modal shell */
.bd-modal {
  position: relative; isolation: isolate; width: 100%; max-width: 820px; max-height: calc(100dvh - 24px); display: flex; flex-direction: column; overflow: hidden; border-radius: 36px;
  background: linear-gradient(135deg, rgba(255,251,242,.58), rgba(255,238,210,.34));
  -webkit-backdrop-filter: blur(34px) saturate(230%); backdrop-filter: blur(34px) saturate(230%);
  border: 1px solid var(--edge);
  box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 -1px 0 rgba(255,255,255,.3) inset, 0 40px 120px rgba(26,10,0,.4);
  animation: bdPop .42s cubic-bezier(.2,.9,.25,1.05);
}
.bd-modal::before { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 0;
  background: linear-gradient(180deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 30%); mix-blend-mode: soft-light; }
.bd-blob { position: absolute; border-radius: 50%; filter: blur(60px); z-index: -1; pointer-events: none; }
.bd-blob.a { width: 320px; height: 320px; background: #F59A2A; opacity: .8; top: -100px; left: -70px; }
.bd-blob.b { width: 340px; height: 340px; background: #F08A7C; opacity: .62; bottom: -120px; right: -80px; }
.bd-blob.c { width: 220px; height: 220px; background: #F4CB4C; opacity: .6; top: 38%; right: 18%; }
.bd-modal > *:not(.bd-blob) { position: relative; z-index: 1; }

/* glass pieces */
.bd-glass { background: linear-gradient(135deg, rgba(255,255,255,.5), rgba(255,255,255,.22)); border: 1px solid var(--edge); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset; }

/* header */
.bd-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 20px 22px 14px; }
.bd-brand { display: flex; align-items: center; gap: 13px; min-width: 0; }
.bd-logo { width: 46px; height: 46px; border-radius: 15px; display: grid; place-items: center; font-size: 22px; flex: none;
  background: linear-gradient(145deg, #E49A2C, var(--gold-1)); box-shadow: 0 1px 0 rgba(255,255,255,.5) inset, 0 10px 24px rgba(200,120,10,.35); }
.bd-head h2 { margin: 0; font-size: 19px; font-weight: 800; letter-spacing: -.025em; }
.bd-head p { margin: 2px 0 0; font-size: 12.5px; color: var(--ink-3); }
.bd-x { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; padding: 0; color: var(--ink-2);
  background: rgba(255,255,255,.65); border: 1px solid var(--edge); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 4px 14px rgba(120,70,20,.12); transition: transform .2s, background .2s, color .2s; flex: none; }
.bd-x:hover { transform: scale(1.07); background: #fff; color: var(--gold-2); }
.bd-x:active { transform: scale(.93); }

/* step switch */
.bd-steps { display: flex; margin: 0 22px; padding: 4px; border-radius: 999px; gap: 4px; width: max-content; max-width: calc(100% - 44px); }
.bd-step { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 999px; border: 0; background: transparent; font-size: 12.5px; font-weight: 600; color: var(--ink-3); cursor: default; transition: background .3s, color .3s, box-shadow .3s; }
.bd-step.done { color: var(--gold-2); cursor: pointer; }
.bd-step.on { color: #fff; background: linear-gradient(180deg, #E49A2C, var(--gold-1)); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 6px 16px rgba(200,120,10,.35); }

/* body */
.bd-body { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 18px 22px 8px; scrollbar-width: thin; }
.bd-cols { display: grid; grid-template-columns: 1fr 1.05fr; gap: 14px; }

.bd-panel { border-radius: 28px; padding: 18px; }
.bd-cal-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.bd-cal-head b { font-size: 15px; font-weight: 700; letter-spacing: -.015em; }
.bd-nav { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; padding: 0; cursor: pointer; color: var(--ink-2);
  background: rgba(255,255,255,.7); border: 1px solid var(--edge); transition: transform .2s, color .2s, background .2s; }
.bd-nav:hover { transform: scale(1.08); color: var(--gold-2); background: #fff; }
.bd-week { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 6px; }
.bd-week span { text-align: center; font-size: 11px; font-weight: 700; letter-spacing: .06em; color: var(--gold-2); padding: 4px 0; }
.bd-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.bd-day { aspect-ratio: 1; border: 0; border-radius: 50%; background: transparent; cursor: pointer; display: grid; place-items: center; font-size: 13.5px; font-weight: 600; color: var(--ink-2); font-variant-numeric: tabular-nums; transition: background .2s, color .2s, transform .2s; }
.bd-day:hover:not(:disabled):not(.on) { background: rgba(255,255,255,.85); color: var(--gold-2); }
.bd-day:disabled { color: rgba(158,120,64,.32); cursor: not-allowed; }
.bd-day.today:not(.on) { box-shadow: inset 0 0 0 1.5px var(--line); }
.bd-day.on { color: #fff; background: linear-gradient(145deg, #E49A2C, var(--gold-1)); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 8px 18px rgba(200,120,10,.4); transform: scale(1.04); }
.bd-tz { margin-top: 14px; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; color: var(--ink-2); }
.bd-tz .lbl { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.bd-slot-head { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.bd-slot-head b { font-size: 14px; font-weight: 700; letter-spacing: -.01em; }
.bd-slot-head small { font-size: 12px; color: var(--ink-3); }
.bd-group { margin: 0 0 10px; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--gold-2); }
.bd-slots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 18px; }
.bd-slot { padding: 11px 6px; border-radius: 16px; font-size: 12.5px; font-weight: 600; color: var(--ink-2); cursor: pointer; font-variant-numeric: tabular-nums;
  background: rgba(255,255,255,.5); border: 1px solid rgba(255,255,255,.9); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset; transition: transform .2s, background .2s, color .2s, box-shadow .2s; }
.bd-slot:hover:not(:disabled):not(.on) { background: #fff; color: var(--gold-2); transform: translateY(-1px); }
.bd-slot:disabled { opacity: .4; cursor: not-allowed; }
.bd-slot.on { color: #fff; border-color: transparent; background: linear-gradient(180deg, #E49A2C, var(--gold-1)); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 8px 18px rgba(200,120,10,.38); }
.bd-empty { display: grid; place-items: center; text-align: center; min-height: 200px; color: var(--ink-3); font-size: 13.5px; }
.bd-empty i { display: block; font-style: normal; font-size: 34px; margin-bottom: 8px; }
.bd-sep { height: 1px; margin: 2px 0 16px; background: linear-gradient(90deg, transparent, rgba(232,200,120,.9), transparent); }

/* step 2 */
.bd-form { max-width: 460px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; padding-bottom: 8px; }
.bd-summary { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 22px; }
.bd-summary .ic { width: 40px; height: 40px; border-radius: 13px; display: grid; place-items: center; color: #fff; font-size: 16px; flex: none; background: linear-gradient(145deg, #E49A2C, var(--gold-1)); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 8px 18px rgba(200,120,10,.32); }
.bd-summary b { display: block; font-size: 14px; font-weight: 700; letter-spacing: -.01em; }
.bd-summary small { display: block; margin-top: 2px; font-size: 12px; color: var(--ink-3); }
.bd-field label { display: block; margin: 0 0 6px 6px; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--gold-2); }
.bd-field input {
  width: 100%; padding: 13px 18px; border-radius: 18px; font-size: 14.5px; color: var(--ink); outline: none;
  background: rgba(255,255,255,.62); border: 1px solid rgba(255,255,255,.95); box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 2px 8px rgba(120,70,20,.06);
  transition: border-color .2s, box-shadow .2s, background .2s;
}
.bd-field input::placeholder { color: #B9A88C; }
.bd-field input:focus { background: #fff; border-color: var(--gold-2); box-shadow: 0 0 0 4px rgba(184,134,11,.16); }
.bd-captcha { display: flex; justify-content: center; padding-top: 2px; }
@media (max-width: 360px) { .bd-captcha > div { transform: scale(.88); transform-origin: center; } }
.bd-error { padding: 11px 16px; border-radius: 16px; font-size: 13px; color: #B3261E; background: rgba(255,240,238,.85); border: 1px solid rgba(240,170,160,.8); }

/* success */
.bd-done { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 34px 28px 30px; }
.bd-check { position: relative; width: 78px; height: 78px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-size: 34px; margin-bottom: 18px;
  background: linear-gradient(145deg, #E49A2C, var(--gold-1)); box-shadow: 0 1px 0 rgba(255,255,255,.5) inset, 0 14px 34px rgba(200,120,10,.42); animation: bdPopIn .5s cubic-bezier(.2,.9,.25,1.2); }
.bd-check::after { content: ''; position: absolute; inset: -9px; border-radius: 50%; border: 2px solid rgba(200,120,10,.28); animation: bdRing 1.8s ease-out infinite; }
.bd-done h3 { margin: 0 0 6px; font-size: 26px; font-weight: 800; letter-spacing: -.03em; }
.bd-done .when { font-size: 14px; font-weight: 600; color: var(--gold-2); }
.bd-done p { max-width: 340px; margin: 12px auto 0; font-size: 13.5px; line-height: 1.65; color: var(--ink-2); }
.bd-done p b { color: var(--gold-2); }

/* footer */
.bd-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 22px 20px; }
.bd-btn { border: 0; cursor: pointer; border-radius: 999px; padding: 13px 26px; font-size: 14px; font-weight: 600; color: #fff; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(180deg, #E49A2C, var(--gold-1)); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 10px 26px rgba(200,120,10,.38);
  transition: transform .2s cubic-bezier(.2,.8,.2,1), box-shadow .2s, opacity .2s; }
.bd-btn:hover:not(:disabled) { transform: translateY(-1px) scale(1.02); box-shadow: 0 1px 0 rgba(255,255,255,.45) inset, 0 14px 32px rgba(200,120,10,.46); }
.bd-btn:active:not(:disabled) { transform: scale(.97); }
.bd-btn:disabled { cursor: not-allowed; color: rgba(158,120,64,.7); background: rgba(232,200,120,.28); box-shadow: 0 1px 0 rgba(255,255,255,.7) inset; }
.bd-btn.ghost { color: var(--ink-2); background: rgba(255,255,255,.65); border: 1px solid var(--edge); box-shadow: 0 1px 0 rgba(255,255,255,.95) inset, 0 4px 14px rgba(120,70,20,.1); padding: 12px 20px; }
.bd-btn.ghost:hover { background: #fff; }
.bd-spin { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 50%; animation: bdSpin .7s linear infinite; display: inline-block; }

.bd-layer :focus-visible { outline: 2px solid var(--gold-1); outline-offset: 2px; }

@keyframes bdFade { from { opacity: 0; } }
@keyframes bdPop { from { opacity: 0; transform: translateY(22px) scale(.95); } }
@keyframes bdPopIn { from { transform: scale(.4); opacity: 0; } }
@keyframes bdRing { from { transform: scale(.9); opacity: .9; } to { transform: scale(1.35); opacity: 0; } }
@keyframes bdSpin { to { transform: rotate(360deg); } }

@media (max-width: 720px) {
  .bd-cols { grid-template-columns: 1fr; }
  .bd-modal { border-radius: 30px; }
  .bd-head { padding: 16px 16px 12px; }
  .bd-steps { margin: 0 16px; }
  .bd-body { padding: 14px 14px 6px; }
  .bd-foot { padding: 12px 16px 16px; }
  .bd-panel { padding: 14px; border-radius: 24px; }
  .bd-step { padding: 8px 13px; }
}
@media (prefers-reduced-motion: reduce) { .bd-layer *, .bd-layer *::before, .bd-layer *::after { animation: none !important; transition: none !important; } }
@media (prefers-reduced-transparency: reduce) { .bd-modal, .bd-backdrop { -webkit-backdrop-filter: none; backdrop-filter: none; } .bd-modal { background: #FDFAF3; } }
`;

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

  // Lock page scroll WITHOUT the layout jumping sideways:
  // scrollbar-gutter keeps the scrollbar's space reserved while overflow is hidden.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prevGutter = html.style.scrollbarGutter;
    const prevOverflow = document.body.style.overflow;
    html.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.scrollbarGutter = prevGutter;
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Esc closes
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose && onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

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

  // The captcha <div> is removed when we leave step 2 — forget its widget id,
  // so it is rendered again when the user comes back (Back → Continue).
  useEffect(() => {
    if (step !== 2) widgetIdRef.current = null;
  }, [step]);

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

  const isTodayCell = (d) =>
    year === today.getFullYear() && month === today.getMonth() && d === today.getDate();

  // on today's date, slots that have already passed can't be booked
  const slotPassed = (slot) => {
    if (!selectedDay || !isTodayCell(selectedDay)) return false;
    const [t, ap] = slot.split(" ");
    let [h, m] = t.split(":").map(Number);
    if (ap === "pm" && h !== 12) h += 12;
    if (ap === "am" && h === 12) h = 0;
    const now = new Date();
    return h * 60 + m <= now.getHours() * 60 + now.getMinutes();
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

  const renderSlots = (list) => (
    <div className="bd-slots">
      {list.map((slot) => (
        <button
          key={slot}
          type="button"
          disabled={slotPassed(slot)}
          onClick={() => setSelectedSlot(slot)}
          className={`bd-slot ${selectedSlot === slot ? "on" : ""}`}
        >
          {slot}
        </button>
      ))}
    </div>
  );

  const fields = [
    { key: "name",    label: "Full Name *",          placeholder: "Arjun Sharma",         type: "text"  },
    { key: "email",   label: "Email Address *",      placeholder: "arjun@company.com",    type: "email" },
    { key: "company", label: "Company / Dealership", placeholder: "AutoBazaar Pvt. Ltd.", type: "text"  },
    { key: "phone",   label: "Phone Number",         placeholder: "+91 98765 43210",      type: "tel"   },
  ];

  const canContinue = selectedDay && selectedSlot;
  const canSubmit = form.name && form.email && !loading;

  return (
    <div className="bd-layer" role="dialog" aria-modal="true" aria-label="Book a demo">
      <style>{STYLES}</style>

      {/* Backdrop */}
      <div className="bd-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="bd-modal">
        <div className="bd-blob a" />
        <div className="bd-blob b" />
        <div className="bd-blob c" />

        {/* Header */}
        <div className="bd-head">
          <div className="bd-brand">
            <div className="bd-logo" aria-hidden="true">🕉️</div>
            <div>
              <h2>Book a Demo</h2>
              <p>Product Discussion | Demo &nbsp;·&nbsp; 30 mins</p>
            </div>
          </div>
          <button type="button" className="bd-x" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>

        {/* Step switch */}
        {!submitted && (
          <div className="bd-steps bd-glass">
            {[
              { n: 1, icon: <Calendar size={13} />, label: "Date & Time" },
              { n: 2, icon: <User size={13} />,     label: "Your Info"   },
            ].map(({ n, icon, label }) => (
              <button
                key={n}
                type="button"
                className={`bd-step ${step === n ? "on" : step > n ? "done" : ""}`}
                onClick={() => { if (step > n) setStep(n); }}
              >
                {icon}{label}
              </button>
            ))}
          </div>
        )}

        {/* ── BODY ── */}
        <div className="bd-body">

          {/* STEP 1: Calendar + Slots */}
          {step === 1 && !submitted && (
            <div className="bd-cols">
              {/* Calendar */}
              <div className="bd-panel bd-glass">
                <div className="bd-cal-head">
                  <button type="button" className="bd-nav" onClick={prevMonth} aria-label="Previous month"><ChevronLeft size={15} /></button>
                  <b>{MONTHS[month]} {year}</b>
                  <button type="button" className="bd-nav" onClick={nextMonth} aria-label="Next month"><ChevronRight size={15} /></button>
                </div>

                <div className="bd-week">
                  {DAYS.map((d) => <span key={d}>{d}</span>)}
                </div>

                <div className="bd-days">
                  {Array(firstDayOffs).fill(null).map((_, i) => <div key={`e${i}`} />)}
                  {Array(daysInMonth).fill(null).map((_, i) => {
                    const d    = i + 1;
                    const past = isPast(d);
                    const sel  = selectedDay === d;
                    return (
                      <button
                        key={d}
                        type="button"
                        disabled={past}
                        onClick={() => { setSelectedDay(d); setSelectedSlot(null); }}
                        className={`bd-day ${sel ? "on" : ""} ${isTodayCell(d) ? "today" : ""}`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                <div className="bd-tz bd-glass">
                  <span aria-hidden="true">🌐</span>
                  <span className="lbl">Asia/Kolkata – IST (+05:30)</span>
                  <ChevronDown size={13} color="#B8860B" />
                </div>
              </div>

              {/* Slots */}
              <div className="bd-panel bd-glass">
                <div className="bd-slot-head">
                  <Clock size={15} color="#B8860B" />
                  <b>Slot Availability</b>
                  {selectedDay && <small>— {MONTHS[month]} {selectedDay}</small>}
                </div>

                {!selectedDay ? (
                  <div className="bd-empty">
                    <div>
                      <i>📅</i>
                      Please select a date to see available slots
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="bd-group">Evening</p>
                    {renderSlots(EVENING_SLOTS)}
                    <div className="bd-sep" />
                    <p className="bd-group">Night</p>
                    {renderSlots(NIGHT_SLOTS)}
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Your Info */}
          {step === 2 && !submitted && (
            <div className="bd-form">
              <div className="bd-summary bd-glass">
                <div className="ic">✦</div>
                <div>
                  <b>{MONTHS[month]} {selectedDay}, {year} · {selectedSlot}</b>
                  <small>30-min Product Demo · IST (+05:30)</small>
                </div>
              </div>

              {fields.map(({ key, label, placeholder, type }) => (
                <div key={key} className="bd-field">
                  <label htmlFor={`bd-${key}`}>{label}</label>
                  <input
                    id={`bd-${key}`}
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  />
                </div>
              ))}

              {/* reCAPTCHA v2 widget */}
              {recaptchaOn && (
                <div className="bd-captcha">
                  <div ref={captchaRef} />
                </div>
              )}

              {error && <div className="bd-error" role="alert">⚠️ {error}</div>}
            </div>
          )}

          {/* SUCCESS */}
          {submitted && (
            <div className="bd-done">
              <div className="bd-check">✓</div>
              <h3>Demo Confirmed!</h3>
              <div className="when">{MONTHS[month]} {selectedDay}, {year} · {selectedSlot}</div>
              <p>
                Booking details <b>vsr81150@gmail.com</b> par send kar diye gaye hain. We look forward to meeting you!
              </p>
              <button type="button" className="bd-btn" style={{ marginTop: 24 }} onClick={onClose}>Done ✦</button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="bd-foot">
            {step === 2 ? (
              <button type="button" className="bd-btn ghost" onClick={() => setStep(1)}>
                <ChevronLeft size={15} /> Back
              </button>
            ) : <div />}

            {step === 1 ? (
              <button type="button" className="bd-btn" disabled={!canContinue} onClick={() => setStep(2)}>
                Continue <ChevronRight size={15} />
              </button>
            ) : (
              <button type="button" className="bd-btn" disabled={!canSubmit} onClick={handleSubmit}>
                {loading ? <><span className="bd-spin" /> Sending...</> : <>✦ Confirm Booking</>}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}