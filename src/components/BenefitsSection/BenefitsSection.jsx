import { benefits } from "../../data/benefits";
import BenefitCard from "../BenefitCard/BenefitCard";
import styles from "./BenefitsSection.module.css";

export default function BenefitsSection() {
  return (
    <section className={styles.section} id="benefits">
      <h2 className={styles.title}>Возможности центра</h2>
      <p className={styles.subtitle}>
        Всё, что нужно для продуктивной работы и комфортной жизни
      </p>
      <div className={styles.grid}>
        {benefits.map((item) => (
          <BenefitCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}