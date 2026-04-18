'use client';

import Link from 'next/link';
import { essays } from '@/data/toc';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <div className={styles.hero}>
      <section className={styles.masthead}>
        <div className={styles.mastheadTop}>
          <div className={styles.brandLockup}>
            <span className={styles.brandMark}>QRC</span>
            <span className={styles.brandName}>Quantum Reservoir Computing</span>
          </div>
        </div>

        <h1 className={styles.title}>
          Introduction to quantum reservoir computing
        </h1>

        <div className={styles.introGrid}>
          <p className={styles.lead}>
            Put information into a quantum system, watch how it evolves, and
            extract useful information from the result.
          </p>
          <div className={styles.actions}>
            <Link href="/qrc#introduction" className={styles.primaryLink}>
              Start reading
            </Link>
            <Link href="/review" className={styles.secondaryLink}>
              Open review cards
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.promise}>
        <div className={styles.promiseTitleBlock}>
          <p className={styles.sectionLabel}>Built to stay with you</p>
          <h2 className={styles.sectionTitle}>
            Presented as a technical book you can actually remember
          </h2>
        </div>

        <div className={styles.promiseCopy}>
          <p>
            Quantum reservoir computing is promising because it uses the natural
            dynamics of quantum systems to process information, without requiring every
            part of the system to be trained.
          </p>
          <p>
            This site is meant to be a clear, intuitive introduction to the field:
            what the idea is, why it matters, and how the main pieces fit together.
            Explanations and flashcards are woven together so the key ideas have a
            better chance of staying in long-term memory.
          </p>
        </div>
      </section>

      <section className={styles.readingPath}>
        <div className={styles.sectionHeading}>
          <p className={styles.sectionLabel}>Reading path</p>
        </div>

        <div className={styles.pathList}>
          {essays.map((essay, index) => (
            <Link
              key={essay.slug}
              href={`${essay.slug}#${essay.sections[0].id}`}
              className={styles.pathItem}
            >
              <div className={styles.pathMeta}>
                <span className={styles.pathNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.pathKind}>{index === 0 ? 'Recommended first' : 'Essay'}</span>
              </div>
              <div className={styles.pathText}>
                <h3 className={styles.pathTitle}>{essay.title}</h3>
                <p className={styles.pathDescription}>{essay.description}</p>
              </div>
              <span className={styles.pathArrow}>Read</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
