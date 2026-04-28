import { useEffect, useState, useRef } from "react";
import styles from "./BenefitCard.module.css";

export default function BenefitCard({ item }) {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let start = 0;
    const end = item.stat;
    const duration = 2000;
    const stepTime = 16;
    const totalSteps = Math.ceil(duration / stepTime);
    const increment = end / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplayNumber(end);
        clearInterval(timer);
      } else {
        setDisplayNumber(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, item.stat]);

  return (
    <div
      className={styles.card}
      ref={ref}
      style={{ backgroundImage: `url(${item.photo})` }}
    >
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardDesc}>{item.description}</p>

      <div className={styles.statBlock}>
        <span className={styles.stat}>
          {displayNumber}{item.suffix}
        </span>
        <span className={styles.statLabel}>{item.statLabel}</span>
      </div>

      {item.link && (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
          {item.linkText} →
        </a>
      )}
    </div>
  );
}