import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./component/Home/Home";
import Header from "./component/Layout/Header";
import Footer from "./component/Layout/Footer";
import WhatsAppButton from "./component/Layout/WhatsAppButton";
import ScrollToTop from "./component/Layout/ScrollToTop";
import PaymentComponent from "./component/Services/PaymentComponent";

const Services = lazy(() => import("./component/Services/Services"));
const PricingSection = lazy(() => import("./component/Pricing/PricingSection"));
const Contact = lazy(() => import("./component/Contact/Contact"));

const ProductVideoCarousel = lazy(
  () => import("./component/Home/Productvideocarousel")
);
const CarStudio = lazy(
  () => import("./component/Home/GraphicDesignSection")
);
const ElevionMedia = lazy(
  () => import("./component/Home/SocialMedia")
);
const SpiritualProjectsSection = lazy(
  () => import("./component/Pricing/ProjectsSection")
);
const HowWeWork = lazy(() => import("./component/Home/HowWeWork"));
const FAQSection = lazy(() => import("./component/Pricing/FAQSection"));

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: "40vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FDFAF3",
        color: "#8B6914",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      Loading…
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/services/video-editing"
            element={<ProductVideoCarousel />}
          />
          <Route
            path="/payment"
            element={<PaymentComponent />}
          />
          <Route
            path="/services/graphic-design"
            element={<CarStudio />}
          />
          <Route
            path="/services/social-media-marketing"
            element={<ElevionMedia />}
          />
          <Route
            path="/services/web-development"
            element={<SpiritualProjectsSection />}
          />
          <Route path="/how-it-works" element={<HowWeWork />} />
          <Route path="/faq" element={<FAQSection />} />
        </Routes>
      </Suspense>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
