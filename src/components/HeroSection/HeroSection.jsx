import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>
        <h1 className={styles.title}>Центр исследований и разработки Сбера</h1>
        <p className={styles.subtitle}>Нижний Новгород</p>
        <p className={styles.mission}>
          Мы создаем решения для развития бизнеса через исследования
          клиентского опыта, анализ данных, применяя креативный подход и
          современные технологии.
        </p>
        <a
          href="https://www.calameo.com/books/0078424579ffe3b17c996"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Читать о нас в Собака.RU →
        </a>
      </div>
    </section>
  );
}