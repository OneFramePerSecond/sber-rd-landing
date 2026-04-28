import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./FadeInSection.module.css";

export default function FadeInSection({ children, direction = "up", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };

  const initial = directions[direction] || directions.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={styles.wrapper}
    >
      {children}
    </motion.div>
  );
}