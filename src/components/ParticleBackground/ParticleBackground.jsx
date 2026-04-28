import styles from "./ParticleBackground.module.css";

export default function ParticleBackground() {
  return (
    <div className={styles.container}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={styles.particle}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${5 + Math.random() * 7}s`,
          }}
        />
      ))}
    </div>
  );
}