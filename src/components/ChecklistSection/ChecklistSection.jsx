import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { checklistItems } from "../../data/checklist";
import styles from "./ChecklistSection.module.css";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ChecklistSection() {
  const [checked, setChecked] = useState({});
  const total = checklistItems.length;
  const done = Object.values(checked).filter(Boolean).length;
  const confettiFired = useRef(false);

  const toggleItem = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Запуск конфетти при 100%
  useEffect(() => {
    if (done === total && !confettiFired.current) {
      confettiFired.current = true;
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.7 },
          colors: ["#34C924", "#ffffff", "#a5d6a7"]
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.7 },
          colors: ["#34C924", "#ffffff", "#a5d6a7"]
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [done, total]);

  return (
    <section className={styles.section} id="checklist">
      <h2 className={styles.title}>Что тебя ждёт?</h2>
      <p className={styles.subtitle}>Чек-лист первой недели</p>

      {/* Прогресс-бар */}
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <span className={styles.progressText}>
          {done} / {total}
        </span>
      </div>

      {/* Список */}
      <motion.ul
        className={styles.list}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AnimatePresence>
          {checklistItems.map((item) => (
            <motion.li
              key={item.id}
              variants={itemAnim}
              className={`${styles.item} ${checked[item.id] ? styles.done : ""}`}
              onClick={() => toggleItem(item.id)}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {/* Пустой круг или зелёная галочка */}
              <span className={styles.icon}>
                {checked[item.id] ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={styles.checkmark}
                  >
                    ✓
                  </motion.span>
                ) : (
                  <span className={styles.iconCircle} />
                )}
              </span>

              <div className={styles.content}>
                <span className={styles.label}>{item.text}</span>
                <span className={styles.day}>{item.day}</span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}