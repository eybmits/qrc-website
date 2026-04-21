import type { CSSProperties } from 'react';
import styles from './AmbientBackground.module.css';

type SquareTone = 'soft' | 'outline' | 'ghost';

interface SquareDef {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  tone: SquareTone;
}

interface AtomDef {
  left: number;
  top: number;
  size: number;
  tilt: number;
  delay: number;
  duration: number;
  opacity: number;
}

const squares: SquareDef[] = [
  { left: -6, top: 8, size: 96, delay: -5, duration: 24, tone: 'soft' },
  { left: -2, top: 56, size: 128, delay: -9, duration: 30, tone: 'soft' },
  { left: 6, top: 48, size: 68, delay: -11, duration: 19, tone: 'outline' },
  { left: 9, top: 10, size: 34, delay: -2, duration: 18, tone: 'ghost' },
  { left: 16, top: 72, size: 112, delay: -7, duration: 22, tone: 'soft' },
  { left: 22, top: 58, size: 76, delay: -6, duration: 21, tone: 'outline' },
  { left: 16, top: 43, size: 88, delay: -14, duration: 26, tone: 'ghost' },
  { left: 22, top: 7, size: 44, delay: -3, duration: 17, tone: 'outline' },
  { left: 32, top: 76, size: 118, delay: -16, duration: 25, tone: 'soft' },
  { left: 72, top: 4, size: 160, delay: -8, duration: 28, tone: 'soft' },
  { left: 64, top: 18, size: 54, delay: -12, duration: 20, tone: 'outline' },
  { left: 38, top: 60, size: 102, delay: -18, duration: 23, tone: 'ghost' },
  { left: 56, top: 70, size: 52, delay: -6, duration: 21, tone: 'ghost' },
  { left: 78, top: 18, size: 138, delay: -11, duration: 29, tone: 'soft' },
  { left: 86, top: 40, size: 74, delay: -10, duration: 18, tone: 'outline' },
  { left: 58, top: 6, size: 104, delay: -15, duration: 24, tone: 'soft' },
  { left: 66, top: 56, size: 92, delay: -4, duration: 22, tone: 'outline' },
  { left: 72, top: 66, size: 142, delay: -20, duration: 29, tone: 'ghost' },
  { left: 66, top: 22, size: 46, delay: -4, duration: 16, tone: 'outline' },
  { left: 82, top: 62, size: 126, delay: -13, duration: 25, tone: 'soft' },
  { left: 92, top: 14, size: 64, delay: -17, duration: 21, tone: 'ghost' },
  { left: 94, top: 52, size: 174, delay: -24, duration: 31, tone: 'soft' },
  { left: 88, top: 26, size: 154, delay: -9, duration: 27, tone: 'soft' },
  { left: 98, top: 6, size: 40, delay: -1, duration: 18, tone: 'outline' },
  { left: 96, top: 34, size: 92, delay: -16, duration: 23, tone: 'ghost' },
  { left: 100, top: 64, size: 122, delay: -22, duration: 26, tone: 'soft' },
  { left: 4, top: 56, size: 58, delay: -7, duration: 18, tone: 'outline' },
  { left: 21, top: 66, size: 36, delay: -5, duration: 15, tone: 'ghost' },
  { left: 35, top: 68, size: 108, delay: -14, duration: 24, tone: 'soft' },
  { left: 47, top: 64, size: 82, delay: -19, duration: 22, tone: 'soft' },
  { left: 73, top: 62, size: 50, delay: -8, duration: 17, tone: 'outline' },
  { left: 88, top: 58, size: 116, delay: -20, duration: 28, tone: 'ghost' },
];

const atoms: AtomDef[] = [
  { left: 4, top: 10, size: 224, tilt: -14, delay: -1.2, duration: 12.6, opacity: 0.22 },
  { left: 69, top: 9, size: 188, tilt: 11, delay: -5.2, duration: 10.8, opacity: 0.18 },
  { left: 54, top: 61, size: 204, tilt: -8, delay: -8.4, duration: 11.8, opacity: 0.16 },
];

function squareStyle(square: SquareDef): CSSProperties {
  const driftX = Math.max(18, Math.round(square.size * 0.24));
  const driftY = Math.max(16, Math.round(square.size * 0.2));
  const tilt = Math.max(3, Math.round(square.size * 0.035));

  return {
    '--ambient-left': `${square.left}%`,
    '--ambient-top': `${square.top}%`,
    '--ambient-size': `${square.size}px`,
    '--ambient-delay': `${square.delay}s`,
    '--ambient-duration': `${square.duration}s`,
    '--ambient-shift-x': `${driftX}px`,
    '--ambient-shift-y': `${driftY}px`,
    '--ambient-tilt': `${tilt}deg`,
  } as CSSProperties;
}

function atomStyle(atom: AtomDef): CSSProperties {
  return {
    '--atom-left': `${atom.left}%`,
    '--atom-top': `${atom.top}%`,
    '--atom-size': `${atom.size}px`,
    '--atom-tilt': `${atom.tilt}deg`,
    '--atom-delay': `${atom.delay}s`,
    '--atom-duration': `${atom.duration}s`,
    '--atom-opacity': `${atom.opacity}`,
  } as CSSProperties;
}

export function AmbientBackground() {
  return (
    <div className={styles.ambient} aria-hidden="true">
      <div className={styles.washPrimary} />
      <div className={styles.washSecondary} />
      <div className={styles.washTertiary} />

      <div className={styles.squareField}>
        {squares.map((square, index) => (
          <span
            key={`${square.left}-${square.top}-${square.size}-${index}`}
            className={`${styles.square} ${
              square.tone === 'soft'
                ? styles.squareSoft
                : square.tone === 'outline'
                  ? styles.squareOutline
                  : styles.squareGhost
            }`}
            style={squareStyle(square)}
          />
        ))}
      </div>

      <div className={styles.atomField}>
        {atoms.map((atom, index) => (
          <div key={`${atom.left}-${atom.top}-${index}`} className={styles.atom} style={atomStyle(atom)}>
            <svg className={styles.atomSvg} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
              <circle cx="100" cy="100" r="38" className={styles.nucleusGlow} />
              <circle cx="100" cy="100" r="10.5" className={styles.nucleusCore} />

              <g className={`${styles.orbit} ${styles.orbitA}`}>
                <ellipse cx="100" cy="100" rx="74" ry="23" className={styles.orbitPath} />
                <circle cx="174" cy="100" r="4.7" className={styles.orbitElectronBright} />
              </g>

              <g className={`${styles.orbit} ${styles.orbitB}`}>
                <ellipse cx="100" cy="100" rx="74" ry="23" className={styles.orbitPath} />
                <circle cx="26" cy="100" r="4.2" className={styles.orbitElectronSoft} />
              </g>

              <g className={`${styles.orbit} ${styles.orbitC}`}>
                <ellipse cx="100" cy="100" rx="60" ry="17" className={styles.orbitPathSoft} />
                <circle cx="160" cy="100" r="3.8" className={styles.orbitElectronSoft} />
              </g>

              <g className={`${styles.orbit} ${styles.orbitD}`}>
                <ellipse cx="100" cy="100" rx="88" ry="30" className={styles.orbitPathSoft} />
                <circle cx="12" cy="100" r="3.4" className={styles.orbitElectronBright} />
              </g>
            </svg>
          </div>
        ))}
      </div>

      <div className={styles.centerGlow} />
    </div>
  );
}
