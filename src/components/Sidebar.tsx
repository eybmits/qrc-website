'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { essays } from '@/data/toc';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const currentEssay = essays.find((e) => e.slug === pathname);

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
      { rootMargin: '-20% 0px -60% 0px' }
    );

    for (const section of currentEssay.sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [currentEssay, pathname]);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Toggle navigation"
      >
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
      </button>

      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <span className={styles.logoIcon}>◈</span>
            <span>
              <span className={styles.logoText}>QRC Nexus</span>
              <span className={styles.logoSub}>Quantum memory playground</span>
            </span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navLabel}>Explore</div>

          <Link
            href="/"
            className={`${styles.essayLink} ${pathname === '/' ? styles.active : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Overview
          </Link>

          <Link
            href="/review"
            className={`${styles.reviewLink} ${pathname === '/review' ? styles.active : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <span className={styles.reviewLinkText}>
              <span className={styles.reviewLinkIcon}>◉</span>
              Review Hub
            </span>
            <span className={styles.badge}>Spaced</span>
          </Link>

          <div className={styles.navDivider} />

          <div className={styles.navLabel}>Essays</div>
          {essays.map((essay) => {
            const isActive = pathname === essay.slug;

            return (
              <div key={essay.slug} className={styles.essayGroup}>
                <Link
                  href={essay.slug}
                  className={`${styles.essayLink} ${isActive ? styles.active : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {essay.shortTitle}
                </Link>

                {isActive && currentEssay && (
                  <div className={styles.sections}>
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
                )}
              </div>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <span className={styles.footerText}>
            A mnemonic medium for quantum computing
          </span>
        </div>
      </aside>
    </>
  );
}
