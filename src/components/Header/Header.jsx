import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { useActiveSection } from "../../hooks/useActiveSection";
import styles from "./Header.module.css";

const sections = [
  { id: "hero", label: "Главная" },
  { id: "benefits", label: "Возможности" },
  { id: "life", label: "Жизнь центра" },
  { id: "reviews", label: "Отзывы" },
  { id: "checklist", label: "Новичкам" },
  { id: "contacts", label: "Контакты" }
];

export default function Header() {
  const scrollTo = useSmoothScroll();
  const active = useActiveSection(sections.map((s) => s.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Мобильное меню (портал в body)
  const mobileMenu = (
    <div className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}>
      {/* Крестик закрытия */}
      <button
        className={styles.closeBtn}
        onClick={closeMenu}
        aria-label="Закрыть меню"
      >
        ✕
      </button>

      <div className={styles.mobileNavInner}>
        {sections.map((s) => (
          <button
            key={s.id}
            className={`${styles.mobileNavItem} ${active === s.id ? styles.mobileNavItemActive : ""}`}
            onClick={() => handleNav(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <img
          src="/images/sber-logo.svg"
          alt="Сбер"
          className={`${styles.logoImg} ${!scrolled ? styles.logoWhite : ""}`}
        />
      </div>

      {/* Десктопное меню */}
      <nav className={styles.desktopNav}>
        {sections.map((s) => (
          <button
            key={s.id}
            className={`${styles.desktopNavItem} ${active === s.id ? styles.desktopNavItemActive : ""}`}
            onClick={() => scrollTo(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Бургер */}
      <button
        className={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Меню"
      >
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ""}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ""}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ""}`} />
      </button>

      {/* Мобильное меню — портал */}
      {typeof document !== "undefined" && ReactDOM.createPortal(mobileMenu, document.body)}
    </header>
  );
}