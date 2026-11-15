import { useRef, useState,useEffect } from "react";


const C = {
  saffron: "#C8860A",
  gold: "#B8860B",
  goldLight: "#E8C87A",
  goldPale: "#FDF6E3",
  maroon: "#7B1D1D",
  ivory: "#FDFAF3",
  ivoryDark: "#F5EDD8",
  cream: "#FAF6ED",
  textDark: "#111111",
  textMid: "#444444",
  textLight: "#666666",
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
    border: 2px solid #c9963a;
    animation: ping 1.8s ease-out infinite;
    pointer-events: none;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 40px;
    align-items: start;
  }

  .services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 4px;
  }

  .name-phone-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .contact-input {
    width: 100%;
    background: ${C.cream};
    border: 1px solid ${C.goldLight};
    border-radius: 10px;
    padding: 13px 16px;
    font-size: 17px;
    color: ${C.textDark};
    outline: none;
    font-family: 'Inter', sans-serif;
  }

  .contact-input:focus {
    border-color: ${C.gold};
    box-shadow: 0 0 0 3px rgba(184,134,11,0.15);
  }

  .contact-heading {
    font-family: 'Inter', sans-serif;
    font-size: clamp(30px, 5vw, 46px);
  }

  @media (max-width: 860px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }
  }

  @media (max-width: 560px) {
    .name-phone-grid {
      grid-template-columns: 1fr;
      gap: 0;
    }
    .services-grid {
      grid-template-columns: 1fr 1fr;
    }
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const services = ["SEO", "Paid Ads", "Social Media", "Web Design", "Content", "Everything"];

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

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "clamp(28px, 6vw, 52px) clamp(16px, 5vw, 28px) 64px", position: "relative", zIndex: 5 }}>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.goldPale, border: `1px solid ${C.goldLight}`, borderRadius: 999, padding: "6px 20px 6px 10px", fontSize: 13, fontWeight: 700, color: C.maroon, letterSpacing: ".4px", marginBottom: 18, fontFamily: "'Inter', sans-serif" }}>
          <span style={{ width: 20, height: 20, borderRadius: "50%", background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", fontWeight: 900 }}>✦</span>
          Free Consultation Available
        </div>

        {/* Heading */}
        <h1 className="contact-heading" style={{ fontWeight: 900, color: C.textDark, lineHeight: 1.2, margin: "0 0 12px" }}>
          Let's Talk <span style={{ color: C.gold, fontStyle: "italic" }}>Growth</span><br />Today!
        </h1>
        <p style={{ color: C.textMid, fontSize: 20, margin: "0 0 32px", lineHeight: 1.7 }}>
          Start your brand's growth journey — fill out a simple form and we'll reply within 24 hours.
        </p>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
          <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, transparent, ${C.gold})` }} />
          <span style={{ color: C.gold, fontSize: 15 }}>✦</span>
          <span style={{ color: C.saffron, fontSize: 18 }}>✳</span>
          <span style={{ color: C.gold, fontSize: 15 }}>✦</span>
          <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
        </div>

        {/* Grid */}
        <div className="contact-grid">

          {/* LEFT — Info Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                icon: "📍",
                label: "",
                val: "Hindon Airport, Ghaziabad, Uttar Pradesh - 201005, India",
                sub: "M-6 3rd Floor Near Hindon Airport, Krishna Vihar Ghaziabad, Uttar Pradesh 201005",
                href: " https://maps.google.com/?cid=16207116013512532703 ",
              },
              {
                icon: "📞",
                label: "Phone / WhatsApp",
                val: "+91 75629 59515",
                sub: "Mon–Sat, 10am – 7pm",
                
                 
              },
              {
                icon: "📧",
                label: "Email",
                val: "hello@elevionmedia.com",
                sub: "Reply within 24 hours",
                href: "mailto:hello@elevionmedia.com",
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
                onClick={() => item.href && (window.location.href = item.href)}
                role={item.href ? "link" : undefined}
                tabIndex={item.href ? 0 : undefined}
                onKeyDown={(e) => {
                  if (item.href && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    window.location.href = item.href;
                  }
                }}
                style={{
                  background: C.cream,
                  border: `1px solid ${C.goldLight}`,
                  borderRadius: 16,
                  padding: "20px 22px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  cursor: item.href ? "pointer" : "default",
                }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, background: C.goldPale, border: `1px solid ${C.goldLight}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".7px", color: C.gold, fontWeight: 700, margin: "0 0 4px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 17, color: C.textDark, fontWeight: 700, margin: 0 }}>
                    {item.val}
                  </p>
                  <p style={{ fontSize: 14, color: C.textLight, margin: "3px 0 0" }}>
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}

            {/* Stats */}
            <div className="stats-grid">
              {[["2.4K+", "Happy Clients"], ["98%", "Success Rate"], ["340%", "Avg. ROI"], ["5★", "Rating"]].map(([num, lbl]) => (
                <div key={lbl} style={{ background: C.goldPale, border: `1px solid ${C.goldLight}`, borderRadius: 12, padding: "16px 16px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 25, fontWeight: 900, color: C.gold, margin: 0 }}>{num}</p>
                  <p style={{ fontSize: 13, color: C.textLight, margin: "4px 0 0" }}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form Card */}
          <div style={{ background: "#fff", border: `1px solid ${C.goldLight}`, borderRadius: 20, padding: "clamp(22px, 4vw, 32px) clamp(18px, 4vw, 28px)", boxShadow: `0 4px 32px rgba(201,150,58,0.1)` }}>

            {!submitted ? (
              <>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 19, fontWeight: 700, color: C.textDark, margin: "0 0 22px" }}>✦ Book Your Free Consultation</p>

                {/* Name + Phone */}
                <div className="name-phone-grid">
                  {[
                    { label: "Your Name *", name: "name", type: "text", placeholder: "Full name" },
                    { label: "Phone / WhatsApp *", name: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map((f) => (
                    <div key={f.name} style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: C.gold, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>{f.label}</label>
                      <input name={f.name} type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} className="contact-input" />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: C.gold, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Email Address *</label>
                  <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} className="contact-input" />
                </div>

                {/* Business Name */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: C.gold, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Business / Brand Name</label>
                  <input name="business" type="text" placeholder="Your company name" value={form.business} onChange={handleChange} className="contact-input" />
                </div>

                {/* Services */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: C.gold, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Which Service Do You Need? *</label>
                  <div className="services-grid">
                    {services.map((s) => {
                      const active = selectedServices.includes(s);
                      return (
                        <button key={s} onClick={() => toggleService(s)}
                          style={{ padding: "10px 10px", borderRadius: 10, border: `1px solid ${active ? C.gold : C.goldLight}`, background: active ? `linear-gradient(135deg, ${C.saffron}, ${C.gold})` : C.cream, color: active ? "white" : C.maroon, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.18s" }}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: C.gold, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Monthly Budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="contact-input">
                    <option value="">Select a budget</option>
                    <option>₹10,000 – ₹25,000</option>
                    <option>₹25,000 – ₹50,000</option>
                    <option>₹50,000 – ₹1,00,000</option>
                    <option>₹1,00,000+</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: C.gold, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Tell Us About Your Needs</label>
                  <textarea name="message" placeholder="What does your brand need? Growth, leads, sales — tell us anything..." value={form.message} onChange={handleChange} rows={4} className="contact-input" style={{ resize: "vertical" }} />
                </div>

                {RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== "YOUR_RECAPTCHA_SITE_KEY" && (
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                    <div ref={captchaRef} />
                  </div>
                )}

                {error && <p style={{ color: "#C0392B", fontSize: 14, margin: "0 0 12px" }}>{error}</p>}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  style={{ position: "relative", overflow: "hidden", width: "100%", background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`, color: "white", border: "none", borderRadius: 12, padding: "15px", fontSize: 16, fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.7 : 1, fontFamily: "'Inter', sans-serif", letterSpacing: ".5px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: btnHover ? `0 10px 28px rgba(201,150,58,0.45)` : `0 4px 16px rgba(201,150,58,0.35)`, transform: btnHover ? "translateY(-2px)" : "none", transition: "transform 0.2s, box-shadow 0.2s" }}>
                  {!sending && <div className="ping-ring" />}
                  {sending ? "Sending..." : "🚀 Book Free Consultation"}
                </button>

                <p style={{ textAlign: "center", fontSize: 14, color: C.textLight, fontStyle: "italic", marginTop: 14 }}>
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

                <div style={{ background: C.goldPale, border: `1px solid ${C.goldLight}`, borderRadius: 14, padding: "18px 20px", marginBottom: 24, textAlign: "left" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", color: C.gold, margin: "0 0 12px", fontFamily: "'Inter', sans-serif" }}>What Happens Next?</p>
                  {[
                    "Our expert will call or WhatsApp you",
                    "We'll discuss your business goals — free of charge",
                    "You'll receive a custom strategy plan",
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, color: C.textMid, marginBottom: i < 2 ? 10 : 0 }}>
                      <span style={{ background: C.saffron, color: "white", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>

                <button onClick={resetForm}
                  style={{ background: C.cream, border: `1px solid ${C.goldLight}`, borderRadius: 10, padding: "11px 26px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif", color: C.maroon }}>
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