'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { essays } from '@/data/toc';
import styles from './Sidebar.module.css';

function normalizePath(path: string): string {
  const normalized = path.replace(/\/+$/, '');
  return normalized === '' ? '/' : normalized;
}

function matchesRoute(pathname: string, route: string): boolean {
  const path = normalizePath(pathname);
  const target = normalizePath(route);
  return path === target || path.endsWith(target);
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const currentEssay = essays.find((essay) => matchesRoute(pathname, essay.slug));

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!currentEssay) {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-18% 0px -64% 0px' }
    );

    for (const section of currentEssay.sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [currentEssay]);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-label="Toggle contents"
      >
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
      </button>

      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <span className={styles.brandMark}>QRC</span>
            <span className={styles.brandText}>
              <span className={styles.brandTitle}>Quantum Reservoir</span>
              <span className={styles.brandSub}>for the very curious</span>
            </span>
          </Link>
        </div>

        <nav className={styles.contents}>
          <p className={styles.contentsLabel}>{currentEssay ? 'Contents' : 'Reading path'}</p>

          {currentEssay ? (
            <>
              <Link
                href={currentEssay.slug}
                className={styles.currentEssay}
                onClick={() => setMobileOpen(false)}
              >
                {currentEssay.title}
              </Link>
              <div className={styles.contentsList}>
                {currentEssay.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`${styles.sectionLink} ${
                      activeSection === section.id ? styles.sectionActive : ''
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.contentsList}>
              {essays.map((essay, index) => (
                <Link
                  key={essay.slug}
                  href={essay.slug}
                  className={`${styles.essayLink} ${
                    matchesRoute(pathname, essay.slug) ? styles.sectionActive : ''
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.essayIndex}>Part {index + 1}</span>
                  <span>{essay.title}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className={styles.meta}>
          <Link
            href="/"
            className={matchesRoute(pathname, '/') ? styles.metaActive : ''}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/review"
            className={matchesRoute(pathname, '/review') ? styles.metaActive : ''}
            onClick={() => setMobileOpen(false)}
          >
            Review cards
          </Link>
        </div>
      </aside>
    </>
  );
}
