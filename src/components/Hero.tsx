'use client';

import Link from 'next/link';
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

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.bgSky} />
      <div className={styles.bgStars} />
      <div className={styles.bgStarsSoft} />
      <div className={styles.bgAurora} />
      <div className={styles.bgRings} />
      <div className={styles.bgGlow} />
      <div className={styles.bgGrain} />
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
          A deep introduction to quantum reservoir computing, building from classical
          foundations to quantum implementations. Embedded review cards help you truly
          remember what you learn.
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
