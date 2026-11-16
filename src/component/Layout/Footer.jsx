import { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Linkedin, Phone, ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import BookDemoModal from "./BookDemoModal";

/* ───────────────────────── DATA ───────────────────────── */

// Logo ko /public folder me "logo.png" naam se rakho (ya path badal do)
const LOGO_SRC = "/logo.png";

const quickLinks = [
  { icon: "🎬", title: "Video Editing",          sub: "Cinematic cuts, reels & ads",  to: "/services/video-editing" },
  { icon: "🎨", title: "Graphic Design",         sub: "Logos, posts & brand visuals", to: "/services/graphic-design" },
  { icon: "📱", title: "Social Media Marketing", sub: "Grow reach, drive engagement", to: "/services/social-media-marketing" },
  { icon: "💻", title: "Website / Web Dev",      sub: "Fast, modern & responsive",    to: "/services/web-development" },
];

const features = [
  "Social Media Marketing",
  "Search Engine Optimization",
  "Paid Ads (Advertising)",
  "Content Creation",
  "Graphic Design",
  "Email Marketing",
  "Website Management",
  "Digital Marketing Jobs",
];

const resources = [
  { title: "Blogs", to: "/blog" },
  { title: "How it works", to: "/how-it-works" },
  { title: "FAQ's", to: "/faq" },
];

const legal = [
  {
    title: "Terms and Conditions",
    content: `Terms & Conditions

Last Updated: 18 August 2026

Welcome to Vaani 360 Media. By accessing our website, contacting us, purchasing our services, or engaging us for any project, you agree to the following Terms & Conditions.

1. About Vaani 360 Media

Vaani 360 Media provides digital media, creative, social media and digital marketing services, particularly for spiritual gurus, katha vachaks, temples, ashrams, spiritual institutions and devotional brands.

Our services may include:

* Social Media Management
* Tithi & Festival Posts
* Daily Vichar & Thought Posts
* Spiritual & Devotional Reels
* Katha & Satsang Reels
* YouTube Thumbnails
* YouTube Banners & Channel Branding
* Graphic Design
* Video Editing
* Content Creation
* Google & Meta Ads
* Website Design & Development
* SEO & Content Marketing
* Influencer & Video Marketing

The exact services provided will depend on the proposal, quotation, package or written agreement with the client.

2. Client Information & Responsibilities

Clients must provide accurate information, content, photographs, videos, logos, account access and other materials required for the project.

The client is responsible for ensuring that the information and materials supplied to Vaani 360 Media are accurate and do not infringe any third-party rights.

For religious and spiritual content, the client is responsible for confirming the accuracy of dates, names, religious references, event information, quotations and other factual details before approval.

3. Content Approval

The client is responsible for reviewing and approving content before publication where approval is required.

Once content has been approved, Vaani 360 Media may publish or deliver the approved content.

Any mistake in information supplied or approved by the client may be the client's responsibility.

4. Revisions

The number of revisions included in a package or project will be specified in the applicable quotation or proposal.

Additional revisions or changes outside the agreed scope may attract additional charges.

Major changes after approval may be treated as a new requirement.

5. Payments

Fees and payment schedules will be communicated through the applicable quotation, invoice, proposal or agreement.

Unless otherwise agreed:

* Work may begin after receipt of the required advance/payment.
* Payments must be made according to the agreed schedule.
* Delayed payments may result in suspension or delay of services.
* Advertising budgets and third-party charges are separate unless expressly included.

6. Advertising Services

Advertising spend paid to Google, Meta or another advertising platform is separate from Vaani 360 Media's service fee unless otherwise stated.

We do not guarantee a specific number of leads, sales, followers, views, reach, conversions or revenue.

Results may depend on budget, audience, competition, creative quality, market conditions, platform algorithms and other factors outside our control.

7. Third-Party Platforms

Our services may involve third-party platforms including Instagram, Facebook, YouTube, Google, Meta, LinkedIn, Pinterest and other services.

Vaani 360 Media is not responsible for platform outages, algorithm changes, account restrictions, suspensions, policy changes, technical failures or other actions taken by third-party platforms.

8. Intellectual Property

Unless otherwise agreed in writing, Vaani 360 Media retains ownership of its original concepts, templates, working files, source files, internal processes and reusable creative assets.

Upon full payment, the client receives the agreed usage rights for the final deliverables.

Editable/source files are not automatically included unless specifically agreed.

Third-party assets may be subject to separate licensing terms.

9. Client-Supplied Content

The client grants Vaani 360 Media permission to use supplied photographs, videos, logos, text, audio, trademarks and other materials for the purpose of providing the agreed services.

The client represents that it has the necessary rights and permissions to provide such materials.

10. Portfolio Usage

Unless otherwise agreed in writing, Vaani 360 Media may display completed work in its portfolio, website, social media, presentations and promotional materials.

Confidential projects may be excluded where specifically agreed.

11. Cancellation & Termination

Cancellation and termination will be governed by the applicable proposal, quotation or service agreement.

Fees for completed work, approved expenses and committed third-party costs remain payable.

Any refund will be subject to the applicable agreement and law.

12. No Guaranteed Results

Digital marketing results cannot be guaranteed.

Vaani 360 Media does not guarantee:

* Viral content
* Specific follower growth
* Specific views or reach
* Guaranteed leads
* Guaranteed sales
* Guaranteed revenue
* Guaranteed search rankings
* Guaranteed advertising performance

We provide professional services based on the agreed scope and strategy.

13. Limitation of Liability

To the extent permitted by applicable law, Vaani 360 Media will not be responsible for indirect or consequential losses arising from circumstances outside its reasonable control, including third-party platform changes, account restrictions, outages, algorithm changes or loss of business opportunities.

Nothing in these Terms excludes liability that cannot legally be excluded.

14. Force Majeure

Vaani 360 Media will not be responsible for delays caused by circumstances beyond reasonable control, including natural disasters, government actions, infrastructure failures, internet outages, cyber incidents, strikes or third-party service failures.

15. Changes to Terms

Vaani 360 Media may update these Terms & Conditions from time to time.

The latest version published on the website will apply prospectively, subject to any separate agreement with a client.

16. Governing Law

These Terms & Conditions shall be governed by the laws of India.

Disputes should first be attempted to be resolved amicably. If a dispute cannot be resolved, either party may seek remedies available under applicable law before the appropriate authority or court having jurisdiction.

17. Contact

Vaani 360 Media

📞 9315284073
Contact us through our website or WhatsApp
🌐 https://vaani360media.in
📍 B-Block, 11/1, Ekta Vihar, Near Hindon Airport, Ghaziabad, Uttar Pradesh – 201005, India

Digital Media for Spirituality, Faith & Impact.`,
  },
  {
    title: "Privacy Policy",
    content: `Privacy Policy

Last Updated: 18 August 2026

Vaani 360 Media respects your privacy and is committed to handling personal information responsibly.

This Privacy Policy explains what information we may collect, why we collect it, how we use it and the choices available to you.

1. Information We May Collect

Depending on how you interact with us, we may collect:

- Name
- Phone number
- Email address
- Business/organisation details
- Social media account information
- Website/project information
- Communication and enquiry details
- Billing and transaction information
- Information voluntarily provided through forms, WhatsApp, email or other communication channels
- Technical information such as IP address, browser/device information and website usage information where applicable

We request only information reasonably necessary for the relevant purpose.

2. How We Use Information

We may use information to:

- Respond to enquiries
- Provide quotations and proposals
- Deliver our services
- Communicate with clients
- Manage projects
- Process payments
- Provide customer support
- Improve our services and website
- Send service-related communications
- Manage advertising and marketing activities where applicable
- Prevent fraud, misuse or security incidents
- Meet legal and regulatory requirements

3. Cookies & Website Analytics

Our website may use cookies, analytics tools or similar technologies to understand website usage and improve user experience.

Third-party services may also use cookies or similar technologies according to their own policies.

You may be able to control cookies through your browser settings.

4. Sharing of Information

We may share information with service providers or technology partners where reasonably necessary to operate our business and provide services.

Examples may include:

- Website hosting providers
- Cloud storage providers
- Payment service providers
- Advertising platforms
- Analytics providers
- Communication platforms
- Professional advisers
- Government or law-enforcement authorities where legally required

We do not intend to sell personal information as a standalone commercial product.

5. Client Data

Where a client provides personal information to us for the purpose of providing a service, we will use that information for the agreed business purpose and handle it in accordance with applicable obligations.

Clients should avoid providing unnecessary sensitive personal information.

6. Data Security

We take reasonable technical and organisational measures designed to protect personal information against unauthorised access, loss, misuse, alteration or disclosure.

However, no internet-based system can be guaranteed to be completely secure.

7. Data Retention

We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, business requirements, contractual obligations, legal requirements or legitimate record-keeping needs.

When information is no longer required, we may delete, anonymise or securely dispose of it, subject to applicable requirements.

8. Third-Party Websites

Our website or communications may contain links to third-party websites and platforms.

Vaani 360 Media is not responsible for the privacy practices of third-party websites.

Users should review the privacy policies of those platforms separately.

9. Your Choices

Depending on applicable law, you may have rights relating to your personal information, including requesting access to information, correction or deletion, and raising a grievance.

Requests may be made using the contact details below.

10. Children's Information

Our services are primarily intended for businesses, organisations and adults.

We do not knowingly seek to collect personal information from children except where legally permitted and appropriately authorised.

11. Changes to This Policy

We may update this Privacy Policy from time to time.

The updated version will be published on this page with a revised "Last Updated" date.

12. Contact Us

For privacy-related questions or requests:

Vaani 360 Media

Contact us through our website or WhatsApp
📞 9315284073
🌐 https://vaani360media.in
📍 B-Block, 11/1, Ekta Vihar, Near Hindon Airport, Ghaziabad, Uttar Pradesh – 201005, India

Digital Media for Spirituality, Faith & Impact.`,
  },
  {
    title: "Data Protection",
    content: `Data Protection Policy

Last Updated: 18 August 2026

Vaani 360 Media is committed to protecting personal data handled in connection with its website, clients, employees, service providers and business operations.

This policy describes our approach to protecting personal data and should be read together with our Privacy Policy and Terms & Conditions.

1. Purpose

The purpose of this policy is to establish principles for responsible collection, use, storage, access, sharing and deletion of personal data.

Vaani 360 Media aims to process personal data lawfully, fairly and transparently and to use it only for appropriate business purposes.

2. Personal Data We Handle

Depending on the relationship and service involved, personal data may include:

- Name
- Contact details
- Email address
- Business information
- Account or project information
- Billing information
- Communication records
- Information provided through enquiry forms
- Information required to manage digital marketing or social media services

3. Data Minimisation

We seek to collect only information that is reasonably necessary for the relevant business purpose.

We do not intentionally request sensitive personal information unless it is genuinely required for a specific lawful purpose.

4. Purpose Limitation

Personal data will generally be used only for purposes such as:

- Providing contracted services
- Managing client relationships
- Responding to enquiries
- Project communication
- Billing and accounting
- Marketing where permitted
- Website and service improvement
- Security and fraud prevention
- Compliance with legal obligations

5. Access Control

Access to personal data should be limited to authorised persons who require the information for legitimate business purposes.

Where practical, access should be protected through passwords, authentication controls and appropriate account permissions.

6. Data Security

Vaani 360 Media takes reasonable security measures appropriate to the nature of the information handled.

These may include:

- Password protection
- Access controls
- Secure communication methods
- Device security
- Software and system updates
- Restricted access to confidential information
- Secure deletion where appropriate

No security system can guarantee absolute protection against every possible threat.

7. Third-Party Service Providers

We may use third-party providers for hosting, cloud storage, communication, analytics, advertising, payments, software and other business functions.

Where personal data is processed through such providers, we seek to use appropriate providers and reasonable safeguards consistent with the nature of the data and service.

8. Data Sharing

Personal data will not be shared unnecessarily.

Information may be disclosed where required to:

- Provide a requested service
- Work with authorised service providers
- Process transactions
- Meet legal obligations
- Respond to lawful government or regulatory requests
- Protect rights, security or property

9. Data Retention & Deletion

Personal data should not be retained longer than reasonably necessary for the relevant purpose, contractual requirement, legal obligation or legitimate business record.

When retention is no longer necessary, data may be deleted, anonymised or securely disposed of.

10. Data Breach & Security Incidents

If Vaani 360 Media becomes aware of a personal-data security incident, we will assess the incident and take reasonable steps appropriate to the circumstances.

Where notification is legally required, applicable notification requirements will be followed.

11. Client Responsibilities

Clients are responsible for ensuring that personal information supplied to Vaani 360 Media has been collected and shared with us lawfully and with appropriate permissions where required.

Clients should not provide unnecessary personal or sensitive information through ordinary communication channels.

12. Data Principal Requests

Where applicable, individuals may have rights concerning their personal data, including access, correction, erasure and grievance redressal.

Requests can be submitted using the contact information below.

Such requests will be handled in accordance with applicable law and the provisions that are in force at the relevant time.

13. Compliance

Vaani 360 Media intends to maintain its data-handling practices in accordance with applicable Indian laws and regulations, including the Digital Personal Data Protection Act, 2023 and applicable rules and provisions as they come into force. The Act contains provisions concerning notice, consent, security safeguards, breach handling, individual rights and grievance redressal.

The Digital Personal Data Protection Rules, 2025 were notified by the Ministry of Electronics and Information Technology on 13 November 2025 and provide the implementation framework for the Act. Their provisions have a phased commencement schedule.

14. Policy Updates

This Data Protection Policy may be updated when our services, technology, business practices or applicable legal requirements change.

The latest version will be published on our website.

15. Contact

For data-protection or privacy-related questions:

Vaani 360 Media

Contact us through our website or WhatsApp
📞 9315284073
🌐 https://vaani360media.in
📍 B-Block, 11/1, Ekta Vihar, Near Hindon Airport, Ghaziabad, Uttar Pradesh – 201005, India

Digital Media for Spirituality, Faith & Impact.`,
  },
];

const socials = [
  { label: "Instagram", href: "https://www.google.com/search?q=Vaani+360+Media+Instagram", Icon: Instagram },
  { label: "Facebook",  href: "https://www.google.com/search?q=Vaani+360+Media+Facebook",       Icon: Facebook },
  { label: "YouTube",   href: "https://www.google.com/search?q=Vaani+360+Media+YouTube", Icon: Youtube },
  { label: "LinkedIn",  href: "https://www.google.com/search?q=Vaani+360+Media+LinkedIn",  Icon: Linkedin },
];

const WHATSAPP_URL = "https://wa.me/919315284073?text=Hello%2C%20I%27m%20interested%20in%20your%20services."; 

/* ───────────────────────── STYLE TOKENS ───────────────────────── */
// Logo colors: orange #F25500 · charcoal #232323

// Liquid glass surface: frosted blur + bright top edge highlight + soft depth
const glass =
  "bg-white/45 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 " +
  "shadow-[0_10px_40px_-12px_rgba(35,35,35,0.14),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.35)]";

const glassHover =
  "transition-all duration-300 ease-out hover:bg-white/65 hover:-translate-y-0.5 " +
  "hover:shadow-[0_16px_44px_-12px_rgba(242,85,0,0.22),inset_0_1px_0_rgba(255,255,255,1)]";

/* ───────────────────────── SMALL PARTS ───────────────────────── */

const FooterHeading = ({ children }) => (
  <h3 className="text-[13px] font-semibold tracking-[0.02em] text-[#F25500] mb-5">
    {children}
  </h3>
);

const TextLink = ({ to, onClick, children }) => {
  const cls =
    "group inline-flex items-center gap-1.5 text-[15px] font-medium text-[#232323]/75 " +
    "hover:text-[#F25500] transition-colors duration-200 text-left";
  const arrow = (
    <ArrowUpRight
      size={13}
      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
    />
  );
  return (
    <li>
      {to ? (
        <Link to={to} className={cls}>{children}{arrow}</Link>
      ) : (
        <button type="button" onClick={onClick} className={cls}>{children}{arrow}</button>
      )}
    </li>
  );
};

/* Legal modal — liquid glass sheet */
const LegalModal = ({ item, onClose }) => {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#232323]/30 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[82vh] flex flex-col overflow-hidden rounded-[28px]
          bg-[#FDFAF3]/80 backdrop-blur-3xl backdrop-saturate-150 border border-white/80
          shadow-[0_30px_80px_-20px_rgba(35,35,35,0.45),inset_0_1px_0_rgba(255,255,255,1)]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232323]/10">
          <h2 className="text-[17px] font-semibold text-[#232323] tracking-tight">{item.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#232323]/8 text-[#232323]/70
              hover:bg-[#F25500] hover:text-white transition-colors duration-200"
          >
            <X size={16} strokeWidth={2.4} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">
          <p className="whitespace-pre-line text-[14px] leading-[1.75] text-[#232323]/75">
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── FOOTER ───────────────────────── */

export default function Footer() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@500;700&display=swap');
        .vaani-footer, .vaani-footer * {
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Noto Sans Devanagari', sans-serif;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
        }
        @media (prefers-reduced-motion: reduce) {
          .vaani-footer * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <footer className="vaani-footer relative bg-[#FDFAF3] border-t border-[#E8C878]/50 overflow-hidden">
        {/* Top gold shimmer */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E8C878] to-transparent" />

        {/* Dot pattern (same background as before) */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #D4A85A 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* Soft orange light behind the glass — this is what makes the blur read as "liquid" */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-[#F25500]/15 blur-[110px] pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-[#FF8A3D]/15 blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-[420px] h-[260px] rounded-full bg-[#FFE090]/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[1300px] mx-auto px-5 md:px-8 pt-14 pb-8">

          {/* ── MAIN GLASS PANEL ── */}
          <div className={`${glass} rounded-[32px] p-6 md:p-10`}>

            {/* Brand + CTA row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 mb-8 border-b border-[#232323]/10">
              <div className="flex flex-col gap-2">
                <img
                  src={LOGO_SRC}
                  alt="Vaani 360 Media"
                  className="h-12 md:h-14 w-auto object-contain self-start"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <p className="text-[15px] text-[#232323]/60 max-w-md leading-relaxed">
                  Website development, creative media and digital growth for temples, trusts and spiritual leaders.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5
                    text-[15px] font-semibold text-white
                    bg-gradient-to-b from-[#FF6A1A] to-[#F25500]
                    shadow-[0_10px_28px_-8px_rgba(242,85,0,0.65),inset_0_1px_0_rgba(255,255,255,0.45)]
                    hover:shadow-[0_14px_34px_-8px_rgba(242,85,0,0.8),inset_0_1px_0_rgba(255,255,255,0.55)]
                    hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25500] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFAF3]"
                >
                  Book a demo
                </button>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message us on WhatsApp"
                  className={`${glass} ${glassHover} inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5
                    text-[15px] font-semibold text-[#232323]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25500]`}
                >
                  <span aria-hidden="true">💬</span>
                  Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] gap-10 lg:gap-12">

              {/* Services */}
              <div>
                <FooterHeading>Services</FooterHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.title}
                      to={item.to}
                      className={`${glass} ${glassHover} group flex flex-col gap-3 rounded-[22px] p-4
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25500]`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="w-10 h-10 rounded-[14px] flex items-center justify-center text-lg
                            bg-gradient-to-b from-[#FF6A1A] to-[#F25500]
                            shadow-[0_6px_16px_-4px_rgba(242,85,0,0.55),inset_0_1px_0_rgba(255,255,255,0.5)]"
                        >
                          {item.icon}
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="text-[#232323]/30 group-hover:text-[#F25500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-[#232323] leading-tight">{item.title}</p>
                        <p className="text-[12.5px] text-[#232323]/55 mt-1 leading-snug">{item.sub}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* What we do */}
              <div>
                <FooterHeading>What we do</FooterHeading>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[15px] font-medium text-[#232323]/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F25500]/70 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources + Legal */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-8">
                <div>
                  <FooterHeading>Resources</FooterHeading>
                  <ul className="space-y-3">
                    {resources.map((r) => (
                      <TextLink key={r.title} to={r.to}>{r.title}</TextLink>
                    ))}
                  </ul>
                </div>
                <div>
                  <FooterHeading>Legal</FooterHeading>
                  <ul className="space-y-3">
                    {legal.map((l) => (
                      <TextLink key={l.title} onClick={() => setLegalModal(l)}>{l.title}</TextLink>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ── SOCIAL + CONTACT ── */}
          <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className={`${glass} rounded-full pl-6 pr-3 py-2.5 flex items-center gap-4`}>
              <p className="text-[14px] font-semibold text-[#232323] whitespace-nowrap">Follow us</p>
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Vaani 360 Media on ${label}`}
                    title={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center
                      bg-white/70 border border-white text-[#232323]
                      shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(35,35,35,0.06)]
                      hover:bg-[#F25500] hover:text-white hover:border-[#F25500] hover:-translate-y-0.5
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25500]"
                  >
                    <Icon size={18} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>

            <a
              href="tel:9315284073"
              aria-label="Call Vaani 360 Media"
              className={`${glass} ${glassHover} rounded-full pl-2.5 pr-6 py-2.5 flex items-center gap-3
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F25500]`}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white
                bg-gradient-to-b from-[#FF6A1A] to-[#F25500]
                shadow-[0_6px_16px_-4px_rgba(242,85,0,0.55),inset_0_1px_0_rgba(255,255,255,0.5)]">
                <Phone size={17} strokeWidth={2.2} />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-medium text-[#232323]/55">संपर्क सूत्र</p>
                <p className="text-[16px] font-bold text-[#232323] tracking-tight">9315284073</p>
              </div>
            </a>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="mt-8 pt-5 border-t border-[#232323]/10 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[13px] text-[#232323]/55">
              © 2026 Vaani 360 Media. Spiritual Media Agency. 🪷
            </p>
            <p className="text-[13px] font-semibold text-[#F25500]">जय श्री राम</p>
          </div>
        </div>

        <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
        <LegalModal item={legalModal} onClose={() => setLegalModal(null)} />
      </footer>
    </>
  );
}