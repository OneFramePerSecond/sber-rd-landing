import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollTo = useSmoothScroll();

  const navItems = [
    { id: "hero", label: "О центре" },
    { id: "benefits", label: "Возможности" },
    { id: "life", label: "Мероприятия" },
    { id: "contacts", label: "Контакты" }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {}
        <div className={styles.logo}>
          <img src="/images/sber-logo.svg" alt="Сбер" className={styles.logoImg} />
        </div>

        {/* Навигация по лендингу */}
        <div className={styles.links}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={styles.link}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://t.me/HubEventMatch_bot"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Telegram-бот
          </a>
        </div>

        {/* Копирайт */}
        <p className={styles.copy}>
          © {new Date().getFullYear()} Центр исследований и разработки Сбера в Нижнем Новгороде
        </p>
      </div>
    </footer>
  );
}