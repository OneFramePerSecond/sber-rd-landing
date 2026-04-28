import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import BenefitsSection from "./components/BenefitsSection/BenefitsSection";
import LifeSection from "./components/LifeSection/LifeSection";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import ChecklistSection from "./components/ChecklistSection/ChecklistSection";
import ContactsSection from "./components/ContactsSection/ContactsSection";
import Footer from "./components/Footer/Footer";
import FaqWidget from "./components/FaqWidget/FaqWidget";
import FadeInSection from "./components/FadeInSection/FadeInSection";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollTop}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 99,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#34C924",
        color: "#fff",
        border: "none",
        fontSize: 20,
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
      }}
    >
      ↑
    </button>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FadeInSection><BenefitsSection /></FadeInSection>
        <FadeInSection><LifeSection /></FadeInSection>
        <FadeInSection><ReviewsSection /></FadeInSection>
        <FadeInSection><ChecklistSection /></FadeInSection>
        <FadeInSection><ContactsSection /></FadeInSection>
      </main>
      <Footer />
      <ScrollToTop />
      <FaqWidget />
    </>
  );
}