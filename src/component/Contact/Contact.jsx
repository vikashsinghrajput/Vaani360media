import { useRef, useState,useEffect } from "react";


/* Vaani 360 Media brand palette: orange + charcoal on light.
   (same keys as before, so every existing style still works) */
const C = {
  saffron: "#FF7A2E",
  gold: "#F25400",
  goldLight: "#FFD2B0",
  goldPale: "#FFF3E8",
  maroon: "#232323",
  ivory: "#FDFAF3",
  ivoryDark: "#F5EDD8",
  cream: "#FAF6ED",
  textDark: "#232323",
  textMid: "#4A4540",
  textLight: "#6F6A64",
};

// ---- EmailJS config ----
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) and note the Service ID
// 3. Create an Email Template and note the Template ID
// 4. Find your Public Key under Account > API Keys
// 5. Paste all three values below
const EMAILJS_SERVICE_ID = "service_efgqrfq";
const EMAILJS_TEMPLATE_ID = "template_uxwycqq";
const EMAILJS_PUBLIC_KEY = "W4G86M_g7xq2ZPgSn";

// ---- Auto-Reply (sends a confirmation to the customer) ----
// Set this to the Template ID of the second template you created,
// with "To Email" set to {{email}} in that template's Settings tab.
// If you don't want an auto-reply, leave this as "" (empty string).
const EMAILJS_AUTOREPLY_TEMPLATE_ID = "template_63o7kbq";

// ---- Google reCAPTCHA v2 ----
// 1. Register your site at https://www.google.com/recaptcha/admin (choose "v2 Checkbox")
// 2. Paste the SITE KEY here
// 3. Paste the SECRET KEY into EmailJS → your Email Service → reCAPTCHA section
const RECAPTCHA_SITE_KEY = "6LfDeoctAAAAAGDA9ty2egIf1trKByn_k7NU2gtH";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  @keyframes ping { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.7); opacity: 0; } }

  .ping-ring {
    position: absolute; inset: 0; border-radius: 12px;
    border: 2px solid #F25400;
    animation: ping 1.8s ease-out infinite;
    pointer-events: none;
  }

  /* ---------- LIQUID GLASS ---------- */
  .lg-glass {
    position: relative;
    background: linear-gradient(135deg, rgba(255,255,255,.78) 0%, rgba(255,255,255,.42) 100%);
    -webkit-backdrop-filter: blur(22px) saturate(180%);
    backdrop-filter: blur(22px) saturate(180%);
    border: 1px solid rgba(255,255,255,.8);
    box-shadow:
      inset 0 1.5px 0 rgba(255,255,255,.95),
      inset 0 -1px 0 rgba(242,84,0,.06),
      0 1px 2px rgba(35,35,35,.04),
      0 20px 48px -18px rgba(242,84,0,.20),
      0 10px 26px -12px rgba(35,35,35,.12);
  }
  .lg-glass::before {
    content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none;
    background: linear-gradient(160deg, rgba(255,255,255,.95), rgba(255,255,255,0) 40%, rgba(242,84,0,.22) 100%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
  }
  .lg-tint {
    background: linear-gradient(135deg, rgba(255,214,184,.55) 0%, rgba(255,255,255,.5) 100%);
  }
  .lg-hover { transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease; }
  @media (hover: hover) { .lg-hover:hover { transform: translateY(-2px); } }

  /* service chips */
  .svc-btn {
    position: relative; overflow: hidden; isolation: isolate;
    padding: 10px 10px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: 'Inter', sans-serif; color: ${C.maroon};
    border: 1px solid rgba(255,255,255,.85);
    background: linear-gradient(135deg, rgba(255,255,255,.75), rgba(255,255,255,.3));
    -webkit-backdrop-filter: blur(12px) saturate(190%); backdrop-filter: blur(12px) saturate(190%);
    box-shadow: inset 0 1.5px 1px rgba(255,255,255,.95), inset 0 -2px 5px rgba(242,84,0,.08), 0 6px 14px -8px rgba(35,35,35,.2);
    transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, background .25s ease, color .2s;
  }
  .svc-btn:active { transform: scale(.96); }
  @media (hover: hover) { .svc-btn:hover { transform: translateY(-2px); } }
  .svc-btn.on {
    color: #fff; border-color: rgba(255,255,255,.5);
    background: linear-gradient(135deg, #FF7A2E 0%, #F25400 100%);
    box-shadow: inset 0 1.5px 1px rgba(255,255,255,.5), inset 0 -3px 6px rgba(160,50,0,.3), 0 10px 20px -6px rgba(242,84,0,.5);
  }
  .svc-btn::after, .liquid-submit::after, .back-btn::after {
    content: ""; position: absolute; left: 8%; right: 8%; top: 2px; height: 45%; border-radius: 999px; pointer-events: none;
    background: linear-gradient(to bottom, rgba(255,255,255,.5), rgba(255,255,255,0));
  }

  /* submit button gloss */
  .liquid-submit {
    border: 1px solid rgba(255,255,255,.45) !important;
    box-shadow: inset 0 1.5px 1px rgba(255,255,255,.5), inset 0 -3px 6px rgba(160,50,0,.35), 0 10px 22px -6px rgba(242,84,0,.55) !important;
  }
  .liquid-submit:hover { box-shadow: inset 0 1.5px 1px rgba(255,255,255,.55), inset 0 -3px 6px rgba(160,50,0,.35), 0 14px 30px -6px rgba(242,84,0,.62) !important; }

  .back-btn {
    position: relative; overflow: hidden; isolation: isolate;
    color: #fff !important;
    border: 1px solid rgba(255,255,255,.45) !important;
    background: linear-gradient(135deg, #FF7A2E 0%, #F25400 100%) !important;
    box-shadow: inset 0 1.5px 1px rgba(255,255,255,.5), inset 0 -3px 6px rgba(160,50,0,.35), 0 10px 22px -6px rgba(242,84,0,.55);
    transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
  }
  @media (hover: hover) { .back-btn:hover { transform: translateY(-2px) scale(1.03); } }
  .back-btn:active { transform: scale(.96); }

  .contact-grid {
    display: grid;
    grid-template-columns: minmax(0, .82fr) minmax(0, 1.5fr);
    gap: 24px;
    align-items: stretch; /* both cards always the same height */
  }
  .info-col { min-width: 0; display: flex; }
  .info-panel { border-radius: 24px; padding: 6px 22px 22px; width: 100%; display: flex; flex-direction: column; }
  /* rows share the extra height evenly, so the panel looks airy instead of stretched */
  .info-row { flex: 1 1 auto; display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid rgba(35,35,35,.07); }
  .info-row.link { cursor: pointer; transition: opacity .2s; }
  @media (hover: hover) { .info-row.link:hover { opacity: .75; } }
  .info-ico {
    width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 16px;
    background: rgba(242,84,0,.1);
  }
  .info-lbl { font-size: 11px; text-transform: uppercase; letter-spacing: .8px; color: ${C.textLight}; font-weight: 600; margin: 0 0 2px; }
  .info-lbl:empty { display: none; }
  .info-val { font-size: 14.5px; color: ${C.textDark}; font-weight: 600; margin: 0; overflow-wrap: anywhere; line-height: 1.4; }
  .info-sub { font-size: 12.5px; color: ${C.textLight}; margin: 2px 0 0; line-height: 1.45; }
  .stat-n { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 800; color: ${C.gold}; margin: 0; }
  .stat-l { font-size: 11.5px; color: ${C.textLight}; margin: 2px 0 0; }

  .form-col { border-radius: 26px; padding: clamp(18px, 2.8vw, 28px); min-width: 0; }
  .form-title { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700; color: ${C.textDark}; margin: 0 0 18px; }

  .fg2 { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0 14px; }
  .fld { margin-bottom: 14px; min-width: 0; }
  .fld label {
    display: block; font-size: 11.5px; font-weight: 600; text-transform: uppercase; letter-spacing: .7px;
    color: ${C.textLight}; margin-bottom: 6px; font-family: 'Inter', sans-serif;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 8px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
    margin-top: 2px;
  }

  .submit-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; }
  .submit-row .captcha { flex: 0 0 auto; max-width: 100%; }
  .submit-row .liquid-submit { flex: 1 1 220px; }

  .contact-input {
    width: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,.8), rgba(255,255,255,.5));
    border: 1px solid rgba(242,84,0,.2);
    border-radius: 12px;
    padding: 10px 14px;
    font-size: 15px;
    color: ${C.textDark};
    outline: none;
    font-family: 'Inter', sans-serif;
    box-shadow: inset 0 1.5px 2px rgba(35,35,35,.05), inset 0 -1px 0 rgba(255,255,255,.9);
    transition: border-color .2s, box-shadow .2s, background .2s;
  }

  .contact-input:focus {
    border-color: ${C.gold};
    background: rgba(255,255,255,.95);
    box-shadow: 0 0 0 3px rgba(242,84,0,0.15), inset 0 1.5px 2px rgba(35,35,35,.04);
  }

  .contact-heading {
    font-family: 'Inter', sans-serif;
    font-size: clamp(26px, 4vw, 38px);
  }
  .contact-br { display: none; }


  /* calmer, lighter controls */
  .contact-input {
    background: rgba(255,255,255,.7);
    border: 1px solid rgba(35,35,35,.1);
    box-shadow: none;
    padding: 11px 14px;
  }
  .contact-input::placeholder { color: #A39B92; }
  .contact-input:focus { background: #fff; border-color: ${C.gold}; box-shadow: 0 0 0 3px rgba(242,84,0,.14); }
  .svc-btn {
    border-radius: 999px; padding: 9px 8px; font-size: 13.5px;
    background: rgba(255,255,255,.65); border: 1px solid rgba(35,35,35,.1);
    box-shadow: none; -webkit-backdrop-filter: none; backdrop-filter: none;
  }
  .svc-btn::after { display: none; }
  .svc-btn.on {
    color: #fff; border: 1px solid rgba(255,255,255,.45);
    background: linear-gradient(135deg, #FF7A2E 0%, #F25400 100%);
    box-shadow: inset 0 1.5px 1px rgba(255,255,255,.5), inset 0 -3px 6px rgba(160,50,0,.35), 0 10px 22px -6px rgba(242,84,0,.55);
  }
  .svc-btn.on::after { display: block; }
  .lg-glass { box-shadow: inset 0 1.5px 0 rgba(255,255,255,.95), 0 18px 44px -22px rgba(242,84,0,.2), 0 8px 22px -14px rgba(35,35,35,.1); }

  @media (max-width: 860px) {
    .contact-grid { grid-template-columns: 1fr; gap: 20px; align-items: start; }
    .info-row { flex: 0 0 auto; align-items: flex-start; }
    /* form first on tablet / phone so it is reached with the least scrolling */
    .form-col { order: -1; }
    .contact-br { display: inline; }
  }

  @media (max-width: 560px) {
    .fg2 { grid-template-columns: 1fr; gap: 0; }
    .fld { margin-bottom: 10px; }
    .services-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
    .svc-btn { padding: 9px 4px !important; font-size: 13px !important; }
    .stats-grid { grid-template-columns: 1fr 1fr; }
    /* 16px stops iOS from zooming into the field */
    .contact-input { font-size: 16px; padding: 10px 12px; }
  }

  @media (max-width: 400px) {
    .services-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ping-ring { animation: none; }
    .lg-hover, .svc-btn { transition: none; }
  }
  @media (prefers-reduced-transparency: reduce) {
    .lg-glass, .svc-btn, .back-btn { -webkit-backdrop-filter: none; backdrop-filter: none; }
    .lg-glass { background: rgba(255,255,255,.95); }
  }
`;

const services = ["Website Development", "Website Design", "Video Editing", "Graphic Design", "Social Media", "Paid Ads"];

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState(["SEO"]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", business: "", budget: "", message: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [sending, setSending] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);
  const captchaRef = useRef(null);
  const widgetIdRef = useRef(null);

  // Load the reCAPTCHA script once and render the widget
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY === "YOUR_RECAPTCHA_SITE_KEY") return;

    const renderWidget = () => {
      if (window.grecaptcha && captchaRef.current && widgetIdRef.current === null) {
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
        });
        setCaptchaReady(true);
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
  }, []);

  const toggleService = (s) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = async (templateId, templateParams, captchaToken) => {
    // Per EmailJS docs, the reCAPTCHA token must live INSIDE template_params,
    // under the exact key "g-recaptcha-response" — not at the top level.
    const finalParams = { ...templateParams };
    if (captchaToken) {
      finalParams["g-recaptcha-response"] = captchaToken;
    }

    const body = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: finalParams,
    };

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Email send failed");
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setError("Please fill in your name, phone, and email.");
      return;
    }

    const recaptchaEnabled = RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== "YOUR_RECAPTCHA_SITE_KEY";
    let captchaToken = "";
    if (recaptchaEnabled) {
      captchaToken = window.grecaptcha ? window.grecaptcha.getResponse(widgetIdRef.current) : "";
      if (!captchaToken) {
        setError("Please verify you're not a robot before submitting.");
        return;
      }
    }

    setError("");
    setSending(true);
    try {
      const templateParams = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        business: form.business,
        budget: form.budget,
        message: form.message,
        services: selectedServices.join(", "),
      };

      // 1) Notify the business
      await sendEmail(EMAILJS_TEMPLATE_ID, templateParams, captchaToken);

      // 2) Optionally confirm to the customer (no captcha token needed on this one)
      if (EMAILJS_AUTOREPLY_TEMPLATE_ID) {
        await sendEmail(EMAILJS_AUTOREPLY_TEMPLATE_ID, templateParams, null);
      }

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong sending your message. Please try again, or contact us directly.");
    } finally {
      setSending(false);
      if (recaptchaEnabled && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    }
  };

  const resetForm = () => {
    setForm({ name: "", phone: "", email: "", business: "", budget: "", message: "" });
    setSelectedServices(["SEO"]);
    setError("");
    setSubmitted(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.ivory,  position: "relative", overflow: "hidden" }}>
      <style>{globalStyles}</style>

      {/* Dot Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.35, backgroundImage: `radial-gradient(circle, ${C.goldLight} 1.5px, transparent 1.5px)`, backgroundSize: "30px 30px" }} />

      {/* Glow Orbs */}
      <div style={{ position: "absolute", width: 320, height: 320, background: "#FFE8B0", opacity: 0.4, top: -80, right: "5%", borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 220, height: 220, background: "#F5C07A", opacity: 0.25, bottom: 0, left: 0, borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(20px, 4vw, 32px) clamp(16px, 5vw, 28px) 40px", position: "relative", zIndex: 5 }}>

        {/* Badge */}
        <div className="lg-glass" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "6px 20px 6px 10px", fontSize: 13, fontWeight: 700, color: C.maroon, letterSpacing: ".4px", marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
          <span style={{ width: 20, height: 20, borderRadius: "50%", background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", fontWeight: 900, boxShadow: "inset 0 1px 0 rgba(255,255,255,.5), 0 3px 8px -2px rgba(242,84,0,.5)" }}>✦</span>
          Free Consultation Available
        </div>

        {/* Heading */}
        <h1 className="contact-heading" style={{ fontWeight: 900, color: C.textDark, lineHeight: 1.2, margin: "0 0 8px" }}>
          Let's Talk <span style={{ color: C.gold, fontStyle: "italic" }}>Growth</span><br className="contact-br" /> Today!
        </h1>
        <p style={{ color: C.textMid, fontSize: "clamp(14px, 1.6vw, 17px)", margin: "0 0 16px", lineHeight: 1.6 }}>
          Let's build a stronger digital presence for your temple, trust, ashram or spiritual brand. Share your requirements and our team will get in touch.
        </p>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, transparent, ${C.gold})` }} />
          <span style={{ color: C.gold, fontSize: 15 }}>✦</span>
          <span style={{ color: C.saffron, fontSize: 18 }}>✳</span>
          <span style={{ color: C.gold, fontSize: 15 }}>✦</span>
          <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
        </div>

        {/* Grid */}
        <div className="contact-grid">

          {/* LEFT — Info Cards */}
          <div className="info-col">
            <div className="lg-glass info-panel">
            {[
              {
                icon: "📍",
                label: "",
                val: "B-Block, 11/1, Ekta Vihar, Near Hindon Airport, Ghaziabad, Uttar Pradesh – 201005, India",
                sub: "Vaani 360 Media Office",
                href: "https://www.google.com/maps/search/?api=1&query=B-Block%2C%2011%2F1%2C%20Ekta%20Vihar%2C%20Near%20Hindon%20Airport%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201005",
              },
              {
                icon: "📞",
                label: "Phone / WhatsApp",
                val: "+91 93152 84073",
                sub: "Mon–Sat, 10am – 7pm",
                
                 
              },
              {
                icon: "📧",
                label: "Email",
                val: "vaanimedia360@gmail.com",
                sub: "Reply within 24 hours",
                href: "mailto:vaanimedia360@gmail.com",
              },
              {
                icon: "⏱️",
                label: "Response Time",
                val: "Same-day reply",
                sub: "Guaranteed on weekdays",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`info-row ${item.href ? "link" : ""}`}
                onClick={() => item.href && (window.location.href = item.href)}
                role={item.href ? "link" : undefined}
                tabIndex={item.href ? 0 : undefined}
                onKeyDown={(e) => {
                  if (item.href && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    window.location.href = item.href;
                  }
                }}
              >
                <div className="info-ico">{item.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <p className="info-lbl">{item.label}</p>
                  <p className="info-val">{item.val}</p>
                  <p className="info-sub">{item.sub}</p>
                </div>
              </div>
            ))}

            {/* Stats */}
            <div className="stats-grid" style={{ marginTop: 20 }}>
              {[["360°", "Digital Services"], ["5+", "Core Services"], ["24×7", "Online Presence"], ["100%", "Brand Focused"]].map(([num, lbl]) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <p className="stat-n">{num}</p>
                  <p className="stat-l">{lbl}</p>
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* RIGHT — Form Card */}
          <div className="lg-glass form-col">

            {!submitted ? (
              <>
                <p className="form-title"><span style={{ color: C.gold }}>✦</span> Book Your Free Consultation</p>

                {/* Name + Phone */}
                <div className="fg2">
                  {[
                    { label: "Your Name *", name: "name", type: "text", placeholder: "Full name" },
                    { label: "Phone / WhatsApp *", name: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map((f) => (
                    <div key={f.name} className="fld">
                      <label>{f.label}</label>
                      <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} className="contact-input" />
                    </div>
                  ))}
                </div>

                {/* Email + Business Name */}
                <div className="fg2">
                  <div className="fld">
                    <label>Email Address *</label>
                    <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className="contact-input" />
                  </div>
                  <div className="fld">
                    <label>Business / Brand Name</label>
                    <input name="business" type="text" placeholder="Your company name" value={form.business} onChange={handleChange} className="contact-input" />
                  </div>
                </div>

                {/* Services */}
                <div className="fld">
                  <label>Which Service Do You Need? *</label>
                  <div className="services-grid">
                    {services.map((s) => {
                      const active = selectedServices.includes(s);
                      return (
                        <button key={s} onClick={() => toggleService(s)} className={`svc-btn ${active ? "on" : ""}`}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget + Message */}
                <div className="fg2">
                  <div className="fld">
                    <label>Monthly Budget</label>
                    <select name="budget" value={form.budget} onChange={handleChange} className="contact-input">
                      <option value="">Select a budget</option>
                      <option>₹10,000 – ₹25,000</option>
                      <option>₹25,000 – ₹50,000</option>
                      <option>₹50,000 – ₹1,00,000</option>
                      <option>₹1,00,000+</option>
                    </select>
                  </div>
                  <div className="fld">
                    <label>Tell Us About Your Needs</label>
                    <textarea name="message" placeholder="Tell us about your temple, trust, ashram or spiritual project and the services you need..." value={form.message} onChange={handleChange} rows={2} className="contact-input" style={{ resize: "vertical" }} />
                  </div>
                </div>

                {error && <p style={{ color: "#C0392B", fontSize: 14, margin: "0 0 10px" }}>{error}</p>}

                {/* Captcha + Submit on one row (stacks on small screens) */}
                <div className="submit-row">
                  {RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== "YOUR_RECAPTCHA_SITE_KEY" && (
                    <div className="captcha">
                      <div ref={captchaRef} />
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={sending}
                    className="liquid-submit"
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                    style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #FF7A2E 0%, #F25400 100%)", color: "white", border: "none", borderRadius: 14, padding: "15px", fontSize: 16, fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.7 : 1, fontFamily: "'Inter', sans-serif", letterSpacing: ".5px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transform: btnHover ? "translateY(-2px)" : "none", transition: "transform 0.2s, box-shadow 0.2s" }}>
                    {!sending && <div className="ping-ring" />}
                    {sending ? "Sending..." : "🚀 Book Free Consultation"}
                  </button>
                </div>

                <p style={{ textAlign: "center", fontSize: 13, color: C.textLight, fontStyle: "italic", margin: "10px 0 0" }}>
                  🔒 Your details are 100% safe &nbsp;|&nbsp; No spam, ever
                </p>
              </>
            ) : (
              /* SUCCESS STATE */
              <div style={{ textAlign: "center", padding: "32px 16px" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 900, color: C.textDark, margin: "0 0 10px" }}>Thank You!</h2>
                <p style={{ fontSize: 17, color: C.textMid, fontStyle: "italic", lineHeight: 1.7, margin: "0 0 24px" }}>
                  We've received your message. We'll reach out via <strong style={{ color: C.textDark }}>WhatsApp or Email within 24 hours</strong>. Talk soon!
                </p>

                <div className="lg-glass lg-tint" style={{ borderRadius: 18, padding: "18px 20px", marginBottom: 24, textAlign: "left" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: C.gold, margin: "0 0 12px", fontFamily: "'Inter', sans-serif" }}>What Happens Next?</p>
                  {[
                    "Our expert will call or WhatsApp you",
                    "We'll discuss your digital goals and requirements",
                    "You'll receive a custom strategy plan",
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, color: C.textMid, marginBottom: i < 2 ? 10 : 0 }}>
                      <span style={{ background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`, color: "white", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, boxShadow: "inset 0 1px 0 rgba(255,255,255,.5), 0 3px 8px -2px rgba(242,84,0,.5)" }}>{i + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>

                <button onClick={resetForm} className="back-btn"
                  style={{ borderRadius: 12, padding: "11px 26px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif", color: "#fff" }}>
                  ← Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}