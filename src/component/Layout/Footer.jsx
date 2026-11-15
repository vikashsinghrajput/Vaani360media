import { useState } from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
// 👇 Path apne folder structure ke hisaab se adjust kar lena
// Agar Footer aur Navbar alag folder me hain to path change karo, jaise "../Navbar/BookDemoModal"
import BookDemoModal from "./BookDemoModal";

const quickLinks = [
  { icon: "🎬", title: "Video Editing",           sub: "Cinematic cuts, reels & ads",   to: "/services/video-editing" },
  { icon: "🎨", title: "Graphic Design",          sub: "Logos, posts & brand visuals",  to: "/services/graphic-design" },
  { icon: "📱", title: "Social Media Marketing",  sub: "Grow reach, drive engagement",  to: "/services/social-media-marketing" },
  { icon: "💻", title: "Website / Web Dev",       sub: "Fast, modern & responsive",     to: "/services/web-development" },
];

const features = [
  "Social Media Marketing",
  "Search Engine Optimization ",
  "Paid Ads (Advertising)",
  "Content Creation",
  "Graphics banana ",
  "Email Marketing",
  "Website Management",
  "Digital Marketing Jobs",
];

// Resources ab route pe navigate karenge
const resources = [
  { title: "Blogs", to: "/blog" },
  { title: "How it works", to: "/how-it-works" },
  { title: "FAQ's", to: "/faq" },
];

// Legal links ab modal open karenge (route pe navigate nahi)
const legal = [
  {
    title: "Terms and Conditions",
    content: `Term and condition 

Terms & Conditions

Last Updated: 18 August 2026

Welcome to Elevion Media. By accessing our website, contacting us, purchasing our services, or engaging us for any project, you agree to the following Terms & Conditions.

1. About Elevion Media

Elevion Media provides digital media, creative, social media and digital marketing services, particularly for spiritual gurus, katha vachaks, temples, ashrams, spiritual institutions and devotional brands.

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

The client is responsible for ensuring that the information and materials supplied to Elevion Media are accurate and do not infringe any third-party rights.

For religious and spiritual content, the client is responsible for confirming the accuracy of dates, names, religious references, event information, quotations and other factual details before approval.

3. Content Approval

The client is responsible for reviewing and approving content before publication where approval is required.

Once content has been approved, Elevion Media may publish or deliver the approved content.

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

Advertising spend paid to Google, Meta or another advertising platform is separate from Elevion Media's service fee unless otherwise stated.

We do not guarantee a specific number of leads, sales, followers, views, reach, conversions or revenue.

Results may depend on budget, audience, competition, creative quality, market conditions, platform algorithms and other factors outside our control.

7. Third-Party Platforms

Our services may involve third-party platforms including Instagram, Facebook, YouTube, Google, Meta, LinkedIn, Pinterest and other services.

Elevion Media is not responsible for platform outages, algorithm changes, account restrictions, suspensions, policy changes, technical failures or other actions taken by third-party platforms.

8. Intellectual Property

Unless otherwise agreed in writing, Elevion Media retains ownership of its original concepts, templates, working files, source files, internal processes and reusable creative assets.

Upon full payment, the client receives the agreed usage rights for the final deliverables.

Editable/source files are not automatically included unless specifically agreed.

Third-party assets may be subject to separate licensing terms.

9. Client-Supplied Content

The client grants Elevion Media permission to use supplied photographs, videos, logos, text, audio, trademarks and other materials for the purpose of providing the agreed services.

The client represents that it has the necessary rights and permissions to provide such materials.

10. Portfolio Usage

Unless otherwise agreed in writing, Elevion Media may display completed work in its portfolio, website, social media, presentations and promotional materials.

Confidential projects may be excluded where specifically agreed.

11. Cancellation & Termination

Cancellation and termination will be governed by the applicable proposal, quotation or service agreement.

Fees for completed work, approved expenses and committed third-party costs remain payable.

Any refund will be subject to the applicable agreement and law.

12. No Guaranteed Results

Digital marketing results cannot be guaranteed.

Elevion Media does not guarantee:

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

To the extent permitted by applicable law, Elevion Media will not be responsible for indirect or consequential losses arising from circumstances outside its reasonable control, including third-party platform changes, account restrictions, outages, algorithm changes or loss of business opportunities.

Nothing in these Terms excludes liability that cannot legally be excluded.

14. Force Majeure

Elevion Media will not be responsible for delays caused by circumstances beyond reasonable control, including natural disasters, government actions, infrastructure failures, internet outages, cyber incidents, strikes or third-party service failures.

15. Changes to Terms

Elevion Media may update these Terms & Conditions from time to time.

The latest version published on the website will apply prospectively, subject to any separate agreement with a client.

16. Governing Law

These Terms & Conditions shall be governed by the laws of India.

Disputes should first be attempted to be resolved amicably. If a dispute cannot be resolved, either party may seek remedies available under applicable law before the appropriate authority or court having jurisdiction.

17. Contact

Elevion Media

📞 8287686509
📧 hello@elevionmedia.com
🌐 www.elevionmedia.com

Digital Media for Spirituality, Faith & Impact.`,
  },
  {
    title: "Privacy Policy",
    content: `Privacy Policy

Last Updated: 18 August 2026

Elevion Media respects your privacy and is committed to handling personal information responsibly.

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

Elevion Media is not responsible for the privacy practices of third-party websites.

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

Elevion Media

📧 hello@elevionmedia.com
📞 8287686509
🌐 www.elevionmedia.com

Digital Media for Spirituality, Faith & Impact.`,
  },
  {
    title: "Data Protection",
    content: `Data Protection Policy

Last Updated: 18 August 2026

Elevion Media is committed to protecting personal data handled in connection with its website, clients, employees, service providers and business operations.

This policy describes our approach to protecting personal data and should be read together with our Privacy Policy and Terms & Conditions.

1. Purpose

The purpose of this policy is to establish principles for responsible collection, use, storage, access, sharing and deletion of personal data.

Elevion Media aims to process personal data lawfully, fairly and transparently and to use it only for appropriate business purposes.

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

Elevion Media takes reasonable security measures appropriate to the nature of the information handled.

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

If Elevion Media becomes aware of a personal-data security incident, we will assess the incident and take reasonable steps appropriate to the circumstances.

Where notification is legally required, applicable notification requirements will be followed.

11. Client Responsibilities

Clients are responsible for ensuring that personal information supplied to Elevion Media has been collected and shared with us lawfully and with appropriate permissions where required.

Clients should not provide unnecessary personal or sensitive information through ordinary communication channels.

12. Data Principal Requests

Where applicable, individuals may have rights concerning their personal data, including access, correction, erasure and grievance redressal.

Requests can be submitted using the contact information below.

Such requests will be handled in accordance with applicable law and the provisions that are in force at the relevant time.

13. Compliance

Elevion Media intends to maintain its data-handling practices in accordance with applicable Indian laws and regulations, including the Digital Personal Data Protection Act, 2023 and applicable rules and provisions as they come into force. The Act contains provisions concerning notice, consent, security safeguards, breach handling, individual rights and grievance redressal.

The Digital Personal Data Protection Rules, 2025 were notified by the Ministry of Electronics and Information Technology on 13 November 2025 and provide the implementation framework for the Act. Their provisions have a phased commencement schedule.

14. Policy Updates

This Data Protection Policy may be updated when our services, technology, business practices or applicable legal requirements change.

The latest version will be published on our website.

15. Contact

For data-protection or privacy-related questions:

Elevion Media

📧 hello@elevionmedia.com
📞 8287686509
🌐 www.elevionmedia.com

Digital Media for Spirituality, Faith & Impact.`,
  },
];

/* ── tiny Om divider ── */
const OmDivider = () => (
  <div className="flex items-center gap-2 mb-5">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E8C878]/60" />
    <span className="text-[#B8860B] text-[10px] tracking-[0.3em] font-['Cinzel',serif]">✦</span>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E8C878]/60" />
  </div>
);

/* ── section heading ── */
const FooterHeading = ({ children }) => (
  <h3 className="text-3xl md:text-4xl font-extrabold text-[#B8860B]/70 mb-2
    [font-family:'Cinzel',serif] tracking-wide leading-tight">
    {children}
  </h3>
);

/* ── link item (route wale links ke liye) ── */
const FooterLink = ({ to, onClick, children }) => (
  <li>
    {to ? (
      <Link
        to={to}
        className="flex items-center gap-2 text-[#7A5C2E] text-[15px] md:text-base
          [font-family:'Cormorant_Garamond',serif] font-medium
          hover:text-[#B8860B] transition-colors duration-200 group">
        <span className="w-1 h-1 rounded-full bg-[#E8C878]/50 group-hover:bg-[#B8860B]
          transition-colors duration-200 flex-shrink-0" />
        {children}
      </Link>
    ) : (
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-[#7A5C2E] text-[15px] md:text-base
          [font-family:'Cormorant_Garamond',serif] font-medium text-left
          hover:text-[#B8860B] transition-colors duration-200 group">
        <span className="w-1 h-1 rounded-full bg-[#E8C878]/50 group-hover:bg-[#B8860B]
          transition-colors duration-200 flex-shrink-0" />
        {children}
      </button>
    )}
  </li>
);

/* ── simple legal modal (Terms / Privacy / Data Protection) ── */
const LegalModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FDFAF3] border border-[#E8C878] rounded-2xl max-w-lg w-full
          max-h-[80vh] overflow-y-auto p-6 shadow-[0_20px_60px_rgba(26,10,0,0.3)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#1A1008] [font-family:'Cinzel',serif]">
            {item.title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#5C4020] hover:text-[#B8860B] text-lg font-bold px-2"
          >
            ✕
          </button>
        </div>
        <p className="text-[#5C4020] text-sm leading-relaxed [font-family:'Cormorant_Garamond',serif]">
          {item.content}
        </p>
      </div>
    </div>
  );
};

export default function Footer() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .elevion-footer,
        .elevion-footer * {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-style: normal;
        }
      `}</style>
      <footer className="elevion-footer relative bg-[#FDFAF3] border-t border-[#E8C878]/50 overflow-hidden">

      {/* Top gold shimmer */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#E8C878] to-transparent" />

      {/* Dot pattern bg */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #D4A85A 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Mandala top-right */}
      <div className="absolute -top-12 -right-12 opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 120 120" className="w-52 h-52 animate-[spin_90s_linear_infinite]">
          {[0,30,60,90,120,150].map((d, i) => (
            <g key={i} transform={`rotate(${d} 60 60)`}>
              <ellipse cx="60" cy="14" rx="5" ry="13" fill="#B8860B" />
              <ellipse cx="60" cy="106" rx="5" ry="13" fill="#B8860B" />
            </g>
          ))}
          <circle cx="60" cy="60" r="16" fill="none" stroke="#B8860B" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="6" fill="#B8860B" />
        </svg>
      </div>

      {/* Mandala bottom-left */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-40 h-40 animate-[spin_120s_linear_infinite_reverse]">
          {[0,45,90,135].map((d, i) => (
            <g key={i} transform={`rotate(${d} 50 50)`}>
              <ellipse cx="50" cy="10" rx="4" ry="11" fill="#C8780A" />
            </g>
          ))}
          <circle cx="50" cy="50" r="12" fill="none" stroke="#C8780A" strokeWidth="1" />
        </svg>
      </div>

      {/* Warm glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-40
        bg-[#FFE090]/10 blur-[80px] rounded-full pointer-events-none" />

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 py-14
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* ── COL 1: Quick Links ── */}
        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <OmDivider />

          <div className="flex flex-col gap-3">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="flex items-center gap-3 bg-[#FFFBF0] border border-[#E8C878]/70
                  rounded-xl p-3.5 group
                  hover:border-[#B8860B] hover:-translate-y-0.5
                  hover:shadow-[0_6px_20px_rgba(184,134,11,0.15)]
                  transition-all duration-200 cursor-pointer"
              >
                {/* Icon box */}
                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center
                  text-xl bg-gradient-to-br from-[#C8780A] to-[#B8860B]
                  shadow-[0_3px_10px_rgba(200,120,10,0.25)]
                  group-hover:shadow-[0_5px_16px_rgba(200,120,10,0.4)]
                  transition-shadow duration-200">
                  {item.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[13px] text-[#1A1008]
                    [font-family:'Cinzel',serif] tracking-wide leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[12px] md:text-[13px] text-[#9E7840] mt-0.5 italic
                    [font-family:'Cormorant_Garamond',serif]">
                    {item.sub}
                  </p>
                </div>

                {/* Arrow */}
                <span className="text-[#E8C878] text-xs group-hover:text-[#B8860B]
                  transition-colors duration-200 flex-shrink-0">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── COL 2: Features ── */}
        <div>
          <FooterHeading>Features</FooterHeading>
          <OmDivider />

          <ul className="space-y-2.5">
            {features.map((f) => (
              <FooterLink key={f}>{f}</FooterLink>
            ))}
          </ul>
        </div>

        {/* ── COL 3: Resources + Legal ── */}
        <div className="flex flex-col gap-8">
          <div>
            <FooterHeading>Resources</FooterHeading>
            <OmDivider />
            <ul className="space-y-2.5">
              {resources.map((r) => (
                <FooterLink key={r.title} to={r.to}>{r.title}</FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Legal</FooterHeading>
            <OmDivider />
            <ul className="space-y-2.5">
              {legal.map((l) => (
                <FooterLink key={l.title} onClick={() => setLegalModal(l)}>
                  {l.title}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>

        {/* ── COL 4: CTA ── */}
        <div className="flex flex-col gap-6">

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setDemoOpen(true)}
              className="w-full border-2 border-[#B8860B] bg-transparent
              text-[#B8860B] font-extrabold text-base py-3.5 rounded-xl
              [font-family:'Cinzel',serif] tracking-wider
              hover:bg-[#FBF3DC] hover:shadow-[0_4px_16px_rgba(184,134,11,0.2)]
              hover:-translate-y-0.5 transition-all duration-200">
              ✦ Book Demo
            </button>

            {/* <button className="w-full bg-gradient-to-r from-[#C8780A] to-[#B8860B]
              text-[#FFF8E8] font-extrabold text-base py-3.5 rounded-xl
              [font-family:'Cinzel',serif] tracking-wider
              hover:shadow-[0_8px_24px_rgba(200,120,10,0.45)]
              hover:-translate-y-0.5 transition-all duration-200">
              🪷 Sign Up
            </button> */}
          </div>
        </div>

      </div>

      {/* ── SOCIAL MEDIA + CONTACT ── */}
      <div className="relative z-10 border-t border-[#E8C878]/30">
        <div className="max-w-[1300px] mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

            <div className="flex flex-col items-center lg:items-start gap-3">
              <p className="text-sm md:text-base font-extrabold text-[#7B1D1D]">
                Follow Elevion Media
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href="https://www.instagram.com/elevionmedia_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elevion Media on Instagram"
                  title="Instagram"
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FBF3DC] border border-[#E8C878] text-[#B8860B] hover:bg-[#B8860B] hover:text-white hover:-translate-y-1 transition-all duration-200"
                >
                  <Instagram size={19} strokeWidth={2} />
                </a>

                <a
                  href="https://www.facebook.com/share/1ENJXwKWgw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elevion Media on Facebook"
                  title="Facebook"
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FBF3DC] border border-[#E8C878] text-[#B8860B] hover:bg-[#B8860B] hover:text-white hover:-translate-y-1 transition-all duration-200"
                >
                  <Facebook size={19} strokeWidth={2} />
                </a>

                <a
                  href="https://youtube.com/@elevion_media?si=267XgeHoxfzbNaNm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elevion Media on YouTube"
                  title="YouTube"
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FBF3DC] border border-[#E8C878] text-[#B8860B] hover:bg-[#B8860B] hover:text-white hover:-translate-y-1 transition-all duration-200"
                >
                  <Youtube size={19} strokeWidth={2} />
                </a>

                <a
                  href="https://www.linkedin.com/company/elevion-media/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elevion Media on LinkedIn"
                  title="LinkedIn"
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#FBF3DC] border border-[#E8C878] text-[#B8860B] hover:bg-[#B8860B] hover:text-white hover:-translate-y-1 transition-all duration-200"
                >
                  <Linkedin size={19} strokeWidth={2} />
                </a>
              </div>
            </div>

            <a
              href="tel:8287686509"
              className="flex items-center gap-3 rounded-2xl border border-[#E8C878] bg-[#FBF3DC] px-5 py-3 text-[#7B1D1D] hover:border-[#B8860B] hover:-translate-y-0.5 transition-all duration-200"
              aria-label="Call Elevion Media"
              title="Call Elevion Media"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E8C878] flex items-center justify-center text-[#B8860B]">
                <Phone size={18} strokeWidth={2} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E7840]">
                  संपर्क सूत्र
                </p>
                <p className="text-base md:text-lg font-extrabold text-[#1A1008]">
                  8287686509
                </p>
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* ── WHATSAPP CTA ── */}
      <div className="relative z-10 flex justify-center px-6 pb-8">
        <a
          href="https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.+I%E2%80%99d+like+to+know+more+about+your+services+and+growth+solutions.&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send your message on WhatsApp"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B8860B] bg-gradient-to-r from-[#C8780A] to-[#B8860B] px-7 py-3 text-sm md:text-base font-extrabold text-white shadow-[0_8px_24px_rgba(200,120,10,0.28)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(200,120,10,0.38)] transition-all duration-200"
        >
          <span className="text-base md:text-lg">💬</span>
          Send Your Message on WhatsApp
        </a>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 border-t border-[#E8C878]/40">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8C878]/50 to-transparent" />

        <div className="max-w-[1300px] mx-auto px-6 py-5
          flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-[15px] md:text-base text-[#9E7840] italic
            [font-family:'Cormorant_Garamond',serif] tracking-wide">
            © 2026 Elevion Media. Where creativity  🪷 &amp; meets devotion.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[#E8C878] text-[9px]">✦</span>
            <span className="text-[12px] md:text-[13px] font-extrabold tracking-[0.2em] text-[#7B1D1D] uppercase
              [font-family:'Cinzel',serif]">
             जय श्री राम
            </span>
            <span className="text-[#E8C878] text-[9px]">✦</span>
          </div>

        </div>
      </div>

      {/* Book Demo modal — wahi component jo header mein use ho raha hai */}
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* Terms / Privacy / Data Protection modal */}
      <LegalModal item={legalModal} onClose={() => setLegalModal(null)} />

    </footer>
    </>
  );
}