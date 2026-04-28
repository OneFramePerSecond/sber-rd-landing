import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "../../data/reviews";
import styles from "./ReviewsSection.module.css";

const getInitial = (fullName) => fullName.trim().charAt(0).toUpperCase();

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Индексы боковых отзывов (зацикленные)
  const leftIndex = (activeIndex - 1 + reviews.length) % reviews.length;
  const rightIndex = (activeIndex + 1) % reviews.length;

  // Карточка отзыва в зависимости от позиции
  const renderCard = (review, position) => {
    const isCenter = position === "center";
    return (
      <div
        className={`${styles.card} ${
          isCenter ? styles.cardCenter : styles.cardSide
        }`}
        onClick={() => {
          if (position === "left") prevSlide();
          if (position === "right") nextSlide();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (position === "left") prevSlide();
            if (position === "right") nextSlide();
          }
        }}
      >
        <div className={isCenter ? styles.avatarCenter : styles.avatarSide}>
          {review.photo ? (
            <img src={review.photo} alt={review.name} className={styles.photo} />
          ) : (
            getInitial(review.name)
          )}
        </div>
        {isCenter ? (
          <>
            <div className={styles.name}>{review.name}</div>
            <div className={styles.role}>{review.role}</div>
            <p className={styles.text}>{review.text}</p>
            <div className={styles.starsRow}>
              {"★".repeat(review.rating)}
            </div>
          </>
        ) : (
          <>
            <div className={styles.nameSmall}>{review.name}</div>
            <div className={styles.roleSmall}>{review.role}</div>
            <p className={styles.textSmall}>
              {review.text.length > 60
                ? review.text.slice(0, 60) + "…"
                : review.text}
            </p>
            <div className={styles.starsSmall}>
              {"★".repeat(review.rating)}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <section className={styles.section} id="reviews">
      <h2 className={styles.title}>Отзывы</h2>

      {/* Общий рейтинг */}
      <div className={styles.rating}>
        <span className={styles.starsRating}>★★★★★</span>
        <span className={styles.score}>5,0</span>
      </div>

      {/* Карусель */}
      <div className={styles.carousel}>
        {/* Стрелка влево */}
        <button onClick={prevSlide} className={styles.arrow} aria-label="Назад">
          ‹
        </button>

        {/* Три карточки */}
        <div className={styles.track}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`left-${leftIndex}`}
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              animate={{ opacity: 0.7, x: 0, scale: 0.85 }}
              exit={{ opacity: 0, x: -40, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={styles.cardWrapper}
            >
              {renderCard(reviews[leftIndex], "left")}
            </motion.div>

            <motion.div
              key={`center-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={styles.cardWrapper}
            >
              {renderCard(reviews[activeIndex], "center")}
            </motion.div>

            <motion.div
              key={`right-${rightIndex}`}
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 0.7, x: 0, scale: 0.85 }}
              exit={{ opacity: 0, x: 40, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={styles.cardWrapper}
            >
              {renderCard(reviews[rightIndex], "right")}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Стрелка вправо */}
        <button onClick={nextSlide} className={styles.arrow} aria-label="Вперёд">
          ›
        </button>
      </div>

      {/* Точки */}
      <div className={styles.dots}>
        {reviews.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ""}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Отзыв ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}