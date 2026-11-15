import { useState, useEffect } from "react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=8287686509&text=Hi%21+I%E2%80%99m+interested+in+working+with+India%E2%80%99s+%231+Spiritual+Digital+Marketing+Agency.+I%E2%80%99d+like+to+know+more+about+your+services+and+growth+solutions.&type=phone_number&app_absent=0";

const WhatsAppIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.1h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.53 3.69-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.42a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.22-8.22 8.22Zm4.51-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31s-.86.84-.86 2.05.88 2.38 1 2.55c.12.16 1.74 2.66 4.22 3.72.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z"
      fill="currentColor"
    />
  </svg>
);

const WhatsAppButton = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        top: "80%",
        right: isMobile ? "12px" : "24px",
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: isMobile ? "0" : "8px",
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "50px",
        padding: isMobile ? "12px" : "12px 18px",
        boxShadow: "0 8px 24px rgba(18, 140, 126, 0.4)",
        fontWeight: 700,
        fontSize: "14px",
        fontFamily: "system-ui, sans-serif",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-50%) translateX(-3px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(18, 140, 126, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(-50%) translateX(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(18, 140, 126, 0.4)";
      }}
    >
      <WhatsAppIcon size={isMobile ? 26 : 20} />
      {!isMobile && <span>Chat</span>}
    </a>
  );
};

export default WhatsAppButton;