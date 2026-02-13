import styles from './Essay.module.css';

interface EssayProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Essay({ title, subtitle, children }: EssayProps) {
  return (
    <article className={styles.essay}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </header>
      <div className={styles.content}>{children}</div>
    </article>
  );
}

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <a href={`#${id}`} className={styles.anchor}>
          #
        </a>
        {title}
      </h2>
      {children}
    </section>
  );
}

interface SubSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function SubSection({ id, title, children }: SubSectionProps) {
  return (
    <div id={id} className={styles.subsection}>
      <h3 className={styles.subsectionTitle}>
        <a href={`#${id}`} className={styles.anchor}>
          #
        </a>
        {title}
      </h3>
      {children}
    </div>
  );
}
