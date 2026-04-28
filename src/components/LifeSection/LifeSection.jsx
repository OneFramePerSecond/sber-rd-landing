import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "../../data/life";
import styles from "./LifeSection.module.css";

export default function LifeSection() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section} id="life">
      <h2 className={styles.title}>Жизнь центра</h2>
      <p className={styles.subtitle}>Ближайшие мероприятия для резидентов и гостей</p>

      <div className={styles.grid}>
        {events.map((event) => {
          const isOpen = expandedId === event.id;

          return (
            <div
              key={event.id}
              className={`${styles.card} ${isOpen ? styles.cardExpanded : ""}`}
              style={{ backgroundImage: `url(${event.mainPhoto})` }}
            >
              {/* Затемняющий слой */}
              <div className={styles.cardOverlay} />

              {/* Видимая часть (всегда) */}
              <div className={styles.cardContent}>
                <span className={styles.tag}>{event.tag}</span>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <time className={styles.date}>{event.date}</time>
              </div>

              {/* Кнопка «Подробнее» */}
              <button
                className={`${styles.detailsBtn} ${isOpen ? styles.detailsBtnOpen : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(event.id);
                }}
              >
                {isOpen ? "Скрыть ↑" : "Подробнее ↓"}
              </button>

              {/* Раскрывающаяся часть (только описание и ссылка, без галереи) */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className={styles.expandedContent}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className={styles.description}>{event.description}</p>
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionLink}
                    >
                      Участвовать →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <a
        href="https://t.me/HubEventMatch_bot"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.botLink}
      >
        Подобрать мероприятия в Telegram-боте →
      </a>
    </section>
  );
}