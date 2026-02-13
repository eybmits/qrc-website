'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import styles from './Hero.module.css';

const topicBlocks = [
  {
    id: 'recurrent-neural-networks',
    tag: 'Foundations',
    title: 'Recurrent Dynamics',
    description: 'Understand memory-bearing state evolution and why temporal structure matters.',
  },
  {
    id: 'the-training-problem',
    tag: 'Bottleneck',
    title: 'Training Instability',
    description: 'See exactly why BPTT suffers from vanishing and exploding gradients.',
  },
  {
    id: 'echo-state-networks',
    tag: 'Shift',
    title: 'Echo State Strategy',
    description: 'Move to fixed reservoirs and train only the readout for stable learning.',
  },
  {
    id: 'going-quantum',
    tag: 'Quantum',
    title: 'Quantum Reservoir Leap',
    description: 'Map reservoir principles onto qubit dynamics and Hilbert-space structure.',
  },
  {
    id: 'input-encoding',
    tag: 'Interface',
    title: 'Encoding & Measurement',
    description: 'Inject classical signals and extract observables as trainable features.',
  },
  {
    id: 'research-directions',
    tag: 'Frontier',
    title: 'Research Directions',
    description: 'Track open questions on noise, hardware scaling, and practical advantage.',
  },
];

const driftParticles = [
  { x: 9, y: 16, size: 14, duration: 24, delay: 0 },
  { x: 22, y: 34, size: 11, duration: 20, delay: -6 },
  { x: 38, y: 18, size: 9, duration: 22, delay: -11 },
  { x: 57, y: 30, size: 12, duration: 26, delay: -3 },
  { x: 72, y: 14, size: 10, duration: 18, delay: -9 },
  { x: 84, y: 36, size: 15, duration: 29, delay: -14 },
  { x: 15, y: 62, size: 10, duration: 21, delay: -8 },
  { x: 31, y: 74, size: 13, duration: 25, delay: -12 },
  { x: 49, y: 66, size: 8, duration: 19, delay: -5 },
  { x: 66, y: 78, size: 12, duration: 27, delay: -16 },
  { x: 81, y: 68, size: 10, duration: 23, delay: -7 },
];

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.bgStars} />
      <div className={styles.bgLattice} />
      <div className={styles.bgAurora} />
      <div className={styles.bgMesh} />
      <div className={styles.bgInterference} />
      <div className={styles.bgWave} />
      <div className={styles.bgNoise} />
      <div className={styles.driftField} aria-hidden>
        {driftParticles.map((particle, index) => {
          const vars = {
            '--dot-x': `${particle.x}%`,
            '--dot-y': `${particle.y}%`,
            '--dot-size': `${particle.size}px`,
            '--dot-duration': `${particle.duration}s`,
            '--dot-delay': `${particle.delay}s`,
          } as CSSProperties;

          return <span key={`drift-${index}`} className={styles.driftDot} style={vars} />;
        })}
      </div>
      <div className={styles.orbitOne} />
      <div className={styles.orbitTwo} />

      <div className={styles.content}>
        <div className={styles.badge}>Interactive QRC Learning Project</div>
        <div className={styles.strapline}>Quantum Reservoir Computing for the Very Curious</div>

        <h1 className={styles.title}>
          Quantum Reservoir
          <br />
          Computing
        </h1>

        <p className={styles.subtitle}>
          This project helps you learn Quantum Reservoir Computing from first principles:
          read each section, answer interactive flashcards inside the content, and reinforce
          your understanding with spaced repetition so the knowledge truly sticks.
        </p>

        <div className={styles.actions}>
          <Link href="/qrc#introduction" className={styles.primaryCta}>
            Introduction
          </Link>
        </div>

        <div className={styles.topicGrid}>
          {topicBlocks.map((topic, i) => (
            <Link
              key={topic.id}
              href={`/qrc#${topic.id}`}
              className={styles.topicCard}
            >
              <div className={styles.topicTop}>
                <div className={styles.topicNumber}>{String(i + 1).padStart(2, '0')}</div>
                <span className={styles.topicTag}>{topic.tag}</span>
              </div>
              <h2 className={styles.topicTitle}>{topic.title}</h2>
              <p className={styles.topicDesc}>{topic.description}</p>
              <span className={styles.topicJump}>Jump to section</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
