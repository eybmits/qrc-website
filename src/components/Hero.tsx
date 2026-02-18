'use client';

import Link from 'next/link';
import { essays } from '@/data/toc';
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

type WaveBand = {
  baseY: number;
  className: string;
  frequency: number;
  id: string;
  lineCount: number;
  lineGap: number;
  phase: number;
  amplitude: number;
};

const waveBands: WaveBand[] = [
  {
    id: 'band-a',
    className: styles.waveBandA,
    baseY: 50,
    amplitude: 13.2,
    frequency: 1.85,
    phase: 0.22,
    lineCount: 14,
    lineGap: 1.06,
  },
  {
    id: 'band-b',
    className: styles.waveBandB,
    baseY: 53,
    amplitude: 10.8,
    frequency: 2.1,
    phase: 1.24,
    lineCount: 12,
    lineGap: 0.98,
  },
  {
    id: 'band-c',
    className: styles.waveBandC,
    baseY: 46,
    amplitude: 8.2,
    frequency: 2.55,
    phase: 2.06,
    lineCount: 10,
    lineGap: 0.92,
  },
];

const PATH_STEPS = 84;
const PATH_X_MIN = -16;
const PATH_X_MAX = 116;

function buildWavePath(
  baseY: number,
  amplitude: number,
  frequency: number,
  phase: number,
  verticalOffset: number
): string {
  const points: string[] = [];

  for (let step = 0; step <= PATH_STEPS; step += 1) {
    const t = step / PATH_STEPS;
    const x = PATH_X_MIN + t * (PATH_X_MAX - PATH_X_MIN);
    const theta = t * Math.PI * 2 * frequency + phase;
    const y = baseY + verticalOffset + Math.sin(theta) * amplitude;
    points.push(`${x.toFixed(3)} ${y.toFixed(3)}`);
  }

  return `M ${points.join(' L ')}`;
}

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.bgSky} />
      <div className={styles.bgStars} />
      <div className={styles.bgStarsSoft} />
      <div className={styles.bgAurora} />
      <div className={styles.bgRings} />

      <div className={styles.bgWaveScene} aria-hidden>
        <svg className={styles.waveSvg} viewBox="-8 -8 116 116" preserveAspectRatio="none" role="presentation">
          {waveBands.map((band) => (
            <g key={band.id} className={`${styles.waveGroup} ${band.className}`}>
              {Array.from({ length: band.lineCount }, (_, lineIndex) => {
                const centered = lineIndex - (band.lineCount - 1) / 2;
                const lineAmp = band.amplitude * (1 - Math.abs(centered) * 0.022);
                const linePhase = band.phase + centered * 0.078;
                const path = buildWavePath(
                  band.baseY,
                  lineAmp,
                  band.frequency,
                  linePhase,
                  centered * band.lineGap
                );

                return (
                  <g key={`${band.id}-line-${lineIndex}`}>
                    <path className={styles.waveGlow} d={path} />
                    <path className={styles.waveLine} d={path} />
                  </g>
                );
              })}
            </g>
          ))}
        </svg>
      </div>

      <div className={styles.bgGlow} />
      <div className={styles.bgGrain} />

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

        <div className={styles.essayGrid}>
          <div className={styles.essayGridLabel}>Reading Path</div>
          <div className={styles.essayCards}>
            {essays.map((essay, i) => (
              <Link
                key={essay.slug}
                href={`${essay.slug}#${essay.sections[0].id}`}
                className={styles.essayCard}
              >
                <div className={styles.essayCardTop}>
                  <span className={styles.essayNumber}>{String(i + 1).padStart(2, '0')}</span>
                  {i === 0 && <span className={styles.startBadge}>Start here</span>}
                </div>
                <h2 className={styles.essayTitle}>{essay.shortTitle}</h2>
                <p className={styles.essayDesc}>{essay.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.topicGrid}>
          {topicBlocks.map((topic, i) => (
            <Link key={topic.id} href={`/qrc#${topic.id}`} className={styles.topicCard}>
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
