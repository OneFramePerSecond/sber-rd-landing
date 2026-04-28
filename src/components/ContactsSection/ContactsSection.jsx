import { contacts } from "../../data/contacts";
import styles from "./ContactsSection.module.css";

export default function ContactsSection() {
  return (
    <section className={styles.section} id="contacts">
      <h2 className={styles.title}>К кому обратиться?</h2>
      <p className={styles.subtitle}>Наши специалисты готовы помочь вам освоиться</p>

      <div className={styles.grid}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.card}>
            <div className={styles.avatar}>
              {contact.initials}
            </div>
            <h3 className={styles.name}>{contact.name}</h3>
            <p className={styles.role}>{contact.role}</p>
            <p className={styles.description}>{contact.description}</p>
            <a
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              Написать в Telegram →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}