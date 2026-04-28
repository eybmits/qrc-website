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
  const sidebarId = 'site-sidebar';

  const currentEssay = essays.find((essay) => matchesRoute(pathname, essay.slug));

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen]);

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
        type="button"
        className={styles.hamburger}
        onClick={() => setMobileOpen((open) => !open)}
        aria-controls={sidebarId}
        aria-expanded={mobileOpen}
        aria-label="Toggle contents"
      >
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
      </button>

      {mobileOpen && <div className={styles.overlay} aria-hidden="true" onClick={() => setMobileOpen(false)} />}

      <aside id={sidebarId} className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <span className={styles.brandMark}>QRC</span>
            <span className={styles.brandText}>
              <span className={styles.brandTitle}>Quantum Reservoir</span>
              <span className={styles.brandSub}>for the very curious</span>
            </span>
          </Link>
        </div>

        <nav
          className={styles.contents}
          aria-label={currentEssay ? `Reading path and ${currentEssay.title} table of contents` : 'Reading path'}
        >
          <p className={styles.contentsLabel}>Chapters</p>

          <div className={styles.chapterList}>
            {essays.map((essay, index) => {
              const isCurrentEssay = matchesRoute(pathname, essay.slug);

              return (
                <div
                  key={essay.slug}
                  className={`${styles.chapterItem} ${isCurrentEssay ? styles.chapterCurrent : ''}`}
                >
                  <Link
                    href={essay.slug}
                    className={`${styles.chapterLink} ${isCurrentEssay ? styles.chapterActive : ''}`}
                    aria-current={isCurrentEssay ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className={styles.essayIndex}>Part {index + 1}</span>
                    <span>{essay.shortTitle}</span>
                  </Link>

                  {isCurrentEssay && essay.sections.length > 0 && (
                    <div className={styles.contentsList} aria-label={`${essay.title} sections`}>
                      <p className={styles.sectionListLabel}>In this chapter</p>
                      {essay.sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className={`${styles.sectionLink} ${
                            activeSection === section.id ? styles.sectionActive : ''
                          }`}
                          aria-current={activeSection === section.id ? 'location' : undefined}
                          onClick={() => setMobileOpen(false)}
                        >
                          {section.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <nav className={styles.meta} aria-label="Global links">
          <Link
            href="/"
            className={matchesRoute(pathname, '/') ? styles.metaActive : ''}
            aria-current={matchesRoute(pathname, '/') ? 'page' : undefined}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/review"
            className={matchesRoute(pathname, '/review') ? styles.metaActive : ''}
            aria-current={matchesRoute(pathname, '/review') ? 'page' : undefined}
            onClick={() => setMobileOpen(false)}
          >
            Review cards
          </Link>
        </nav>
      </aside>
    </>
  );
}
