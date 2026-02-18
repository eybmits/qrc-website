import Link from 'next/link';
import { essays } from '@/data/toc';
import styles from './Essay.module.css';

interface EssayProps {
  title: string;
  subtitle?: string;
  slug?: string;
  children: React.ReactNode;
}

export function Essay({ title, subtitle, slug, children }: EssayProps) {
  const essayIndex = slug ? essays.findIndex((e) => e.slug === slug) : -1;
  const prev = essayIndex > 0 ? essays[essayIndex - 1] : null;
  const next = essayIndex >= 0 && essayIndex < essays.length - 1 ? essays[essayIndex + 1] : null;

  return (
    <article className={styles.essay}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </header>
      <div className={styles.content}>{children}</div>
      {(prev || next) && (
        <nav className={styles.essayNav}>
          {prev ? (
            <Link href={prev.slug} className={styles.navLink}>
              <span className={styles.navDirection}>Previous</span>
              <span className={styles.navTitle}>{prev.shortTitle}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.slug} className={`${styles.navLink} ${styles.navLinkNext}`}>
              <span className={styles.navDirection}>Next</span>
              <span className={styles.navTitle}>{next.shortTitle}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
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
