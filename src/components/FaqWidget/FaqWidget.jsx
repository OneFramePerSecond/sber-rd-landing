import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "../../data/faq";
import styles from "./FaqWidget.module.css";

export default function FaqWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const togglePanel = () => setIsOpen(!isOpen);
  const toggleQuestion = (id) => {
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Кнопка-виджет */}
      <button
        className={`${styles.widgetBtn} ${isOpen ? styles.widgetBtnActive : ""}`}
        onClick={togglePanel}
        aria-label="Часто задаваемые вопросы"
      >
        <span className={styles.widgetIcon}>?</span>
      </button>

      {/* Оверлей + панель (только на мобильных) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePanel}
          >
            <motion.div
              className={styles.panel}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.header}>
                <h3 className={styles.title}>Частые вопросы</h3>
                <button className={styles.closeBtn} onClick={togglePanel}>
                  ✕
                </button>
              </div>

              <div className={styles.list}>
                {faqItems.map((item) => {
                  const isQuestionOpen = activeQuestion === item.id;
                  return (
                    <div key={item.id} className={styles.item}>
                      <button
                        className={styles.question}
                        onClick={() => toggleQuestion(item.id)}
                      >
                        <span>{item.question}</span>
                        <span className={`${styles.chevron} ${isQuestionOpen ? styles.chevronOpen : ""}`}>›</span>
                      </button>

                      <AnimatePresence>
                        {isQuestionOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.answer}
                          >
                            <p>{item.answer}</p>
                            {item.link && (
                              <a
                                href={item.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                              >
                                {item.link.text} →
                              </a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}