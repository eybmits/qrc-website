'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const BLOCH_CENTER_X = 200;
const BLOCH_CENTER_Y = 200;
const BLOCH_RADIUS = 140;

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}

function projectBlochPoint(x: number, y: number, z: number) {
  return {
    x: BLOCH_CENTER_X + BLOCH_RADIUS * (x + 0.48 * y),
    y: BLOCH_CENTER_Y - BLOCH_RADIUS * (z + 0.42 * y),
  };
}

function pathFromPoints(points: Array<{ x: number; y: number }>) {
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(' ');
}

function sampleArc(
  start: number,
  end: number,
  samples: number,
  pointAt: (value: number) => { x: number; y: number },
) {
  return Array.from({ length: samples + 1 }, (_, index) => {
    const progress = samples === 0 ? 0 : index / samples;
    return pointAt(start + (end - start) * progress);
  });
}

export function BlochSphereExplorer() {
  const [theta, setTheta] = useState(58);
  const [phi, setPhi] = useState(34);
  const [radius, setRadius] = useState(1);
  const [autoSpin, setAutoSpin] = useState(false);

  useEffect(() => {
    if (!autoSpin) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setPhi((current) => (current >= 180 ? -180 : current + 2));
    }, 72);

    return () => window.clearInterval(timer);
  }, [autoSpin]);

  const thetaRad = degreesToRadians(theta);
  const phiRad = degreesToRadians(phi);
  const blochX = radius * Math.sin(thetaRad) * Math.cos(phiRad);
  const blochY = radius * Math.sin(thetaRad) * Math.sin(phiRad);
  const blochZ = radius * Math.cos(thetaRad);
  const vectorEnd = projectBlochPoint(blochX, blochY, blochZ);
  const equatorProjection = projectBlochPoint(blochX, blochY, 0);
  const thetaArcPath = pathFromPoints(
    sampleArc(0, thetaRad, 24, (angle) =>
      projectBlochPoint(
        0.24 * Math.sin(angle) * Math.cos(phiRad),
        0.24 * Math.sin(angle) * Math.sin(phiRad),
        0.24 * Math.cos(angle),
      ),
    ),
  );
  const phiArcPath = pathFromPoints(
    sampleArc(0, phiRad, 20, (angle) => projectBlochPoint(0.18 * Math.cos(angle), 0.18 * Math.sin(angle), 0)),
  );
  const amplitudeZero = Math.cos(thetaRad / 2);
  const amplitudeOne = Math.sin(thetaRad / 2);
  const purity = 0.5 * (1 + radius * radius);
  const isPureState = radius > 0.999;
  const phaseDisplay = phi === 0 ? '1' : phi > 0 ? `e^{i${phi.toFixed(0)}°}` : `e^{-i${Math.abs(phi).toFixed(0)}°}`;
  const ketLabel = isPureState ? 'Current ket' : 'Surface-direction ket';
  const ketSymbol = isPureState ? '|ψ⟩' : '|ψdir⟩';
  const densityMatrix = `ρ = 1/2 (I + ${blochX.toFixed(2)}σx + ${blochY.toFixed(2)}σy + ${blochZ.toFixed(2)}σz)`;
  const autoSpinButtonClassName = autoSpin
    ? `${styles.blochAutoButton} ${styles.blochAutoButtonActive}`
    : styles.blochAutoButton;

  return (
    <div className={styles.blochExplorer}>
      <div className={styles.blochCanvas}>
        <svg viewBox="0 0 400 380" className={styles.figureSvg} role="img" aria-label="Interactive Bloch sphere with adjustable qubit state">
          <defs>
            <radialGradient id="qpSphereGradInteractive" cx="0.45" cy="0.35" r="0.62">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.94)" />
              <stop offset="55%" stopColor="rgba(233, 241, 250, 0.46)" />
              <stop offset="100%" stopColor="rgba(198, 214, 229, 0.14)" />
            </radialGradient>
            <marker id="qpArrowStateInteractive" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="#c26a58" />
            </marker>
          </defs>

          <ellipse cx={BLOCH_CENTER_X} cy={BLOCH_CENTER_Y} rx={BLOCH_RADIUS} ry={BLOCH_RADIUS} fill="url(#qpSphereGradInteractive)" stroke="#a9a293" strokeWidth="1.4" />
          <ellipse cx={BLOCH_CENTER_X} cy={BLOCH_CENTER_Y} rx={BLOCH_RADIUS} ry="42" fill="none" stroke="#a39c8e" strokeWidth="1" strokeDasharray="6 5" />
          <line x1={BLOCH_CENTER_X} y1="46" x2={BLOCH_CENTER_X} y2="354" stroke="#a39c8e" strokeWidth="1.2" />
          <line x1="60" y1={BLOCH_CENTER_Y} x2="340" y2={BLOCH_CENTER_Y} stroke="#9b9586" strokeWidth="1" strokeDasharray="6 5" />
          <line x1="130" y1="260" x2="270" y2="140" stroke="#9b9586" strokeWidth="1" strokeDasharray="6 5" />

          <circle cx={BLOCH_CENTER_X} cy="56" r="5.5" fill="#b7a47c" />
          <circle cx={BLOCH_CENTER_X} cy="344" r="5.5" fill="#b7a47c" />
          <text x="218" y="54" className={styles.svgLabel}>|0⟩</text>
          <text x="218" y="348" className={styles.svgLabel}>|1⟩</text>
          <text x="346" y="204" className={styles.svgSub}>x</text>
          <text x="274" y="136" className={styles.svgSub}>y</text>
          <text x="208" y="38" className={styles.svgSub}>z</text>

          <line
            x1={BLOCH_CENTER_X}
            y1={BLOCH_CENTER_Y}
            x2={equatorProjection.x}
            y2={equatorProjection.y}
            stroke="#7d8f84"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <line
            x1={equatorProjection.x}
            y1={equatorProjection.y}
            x2={vectorEnd.x}
            y2={vectorEnd.y}
            stroke="#7d8f84"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <path d={thetaArcPath} fill="none" stroke="#c28a5b" strokeWidth="1.4" />
          <path d={phiArcPath} fill="none" stroke="#2b6b61" strokeWidth="1.4" />
          <line
            x1={BLOCH_CENTER_X}
            y1={BLOCH_CENTER_Y}
            x2={vectorEnd.x}
            y2={vectorEnd.y}
            stroke="#c26a58"
            strokeWidth="3"
            markerEnd="url(#qpArrowStateInteractive)"
          />
          <circle cx={equatorProjection.x} cy={equatorProjection.y} r="4" fill="#2b6b61" opacity="0.8" />
          <circle cx={vectorEnd.x} cy={vectorEnd.y} r="5.5" fill="#c26a58" />

          <text x={BLOCH_CENTER_X + 20} y={BLOCH_CENTER_Y - 36} fill="#c28a5b" fontSize="14" fontStyle="italic">θ</text>
          <text x={BLOCH_CENTER_X + 36} y={BLOCH_CENTER_Y + 20} fill="#2b6b61" fontSize="14" fontStyle="italic">φ</text>
          <text
            x={vectorEnd.x + (blochX >= 0 ? 10 : -16)}
            y={vectorEnd.y - 12}
            fill="#c26a58"
            className={styles.svgLabel}
            textAnchor={blochX >= 0 ? 'start' : 'end'}
          >
            {isPureState ? '|ψ⟩' : 'ρ'}
          </text>
        </svg>
      </div>

      <div className={styles.blochPanel}>
        <div className={styles.blochReadout}>
          <div className={styles.blochMetric}>
            <span className={styles.blochMetricLabel}>x</span>
            <span className={styles.blochMetricValue}>{blochX.toFixed(2)}</span>
          </div>
          <div className={styles.blochMetric}>
            <span className={styles.blochMetricLabel}>y</span>
            <span className={styles.blochMetricValue}>{blochY.toFixed(2)}</span>
          </div>
          <div className={styles.blochMetric}>
            <span className={styles.blochMetricLabel}>z</span>
            <span className={styles.blochMetricValue}>{blochZ.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.blochControls}>
          <div className={styles.blochControlsHeader}>
            <span className={styles.blochControlsTitle}>State Controls</span>
            <button
              type="button"
              className={autoSpinButtonClassName}
              aria-pressed={autoSpin}
              onClick={() => setAutoSpin((current) => !current)}
            >
              {autoSpin ? 'Pause spin' : 'Auto spin φ'}
            </button>
          </div>

          <label className={styles.controlRow}>
            <span className={styles.controlHeader}>
              <span>Polar angle θ</span>
              <span className={styles.controlValue}>{theta.toFixed(0)}°</span>
            </span>
            <input
              className={styles.controlSlider}
              type="range"
              min="0"
              max="180"
              step="1"
              value={theta}
              onChange={(event) => setTheta(Number(event.target.value))}
            />
          </label>

          <label className={styles.controlRow}>
            <span className={styles.controlHeader}>
              <span>Azimuth φ</span>
              <span className={styles.controlValue}>{phi.toFixed(0)}°</span>
            </span>
            <input
              className={styles.controlSlider}
              type="range"
              min="-180"
              max="180"
              step="1"
              value={phi}
              onChange={(event) => setPhi(Number(event.target.value))}
            />
          </label>

          <label className={styles.controlRow}>
            <span className={styles.controlHeader}>
              <span>Radius r</span>
              <span className={styles.controlValue}>{radius.toFixed(2)}</span>
            </span>
            <input
              className={styles.controlSlider}
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
            />
          </label>
        </div>

        <div className={styles.blochStateCard}>
          <div className={styles.blochStateHeader}>
            <span className={styles.blochStateBadge}>{isPureState ? 'Pure state' : 'Mixed state'}</span>
            <span className={styles.blochPurity}>Purity {purity.toFixed(2)}</span>
          </div>
          <div className={styles.blochExpressionBlock}>
            <div className={styles.blochFormulaLabel}>{ketLabel}</div>
            <div className={styles.blochStateExpression}>
              <span className={styles.blochStateSymbol}>{ketSymbol}</span>
              <span className={styles.blochStateEquals}>≈</span>
              <span className={styles.blochStateTerm}>
                <span className={styles.blochAmplitude}>{amplitudeZero.toFixed(2)}</span>
                <span className={styles.blochKet}>|0⟩</span>
              </span>
              <span className={styles.blochStatePlus}>+</span>
              <span className={styles.blochPhase}>{phaseDisplay}</span>
              <span className={styles.blochStateTerm}>
                <span className={styles.blochAmplitude}>{amplitudeOne.toFixed(2)}</span>
                <span className={styles.blochKet}>|1⟩</span>
              </span>
            </div>
          </div>
          <div className={styles.blochExpressionBlock}>
            <div className={styles.blochFormulaLabel}>Density matrix</div>
            <div className={styles.blochEquation}>{densityMatrix}</div>
          </div>
          <p className={styles.blochMicrocopy}>
            {isPureState
              ? 'At r = 1 the ket and the density matrix describe the same pure state.'
              : 'The ket above shows the direction set by θ and φ. The density matrix below additionally encodes the shorter radius r.'}
          </p>
          <p className={styles.blochHint}>
            {isPureState
              ? 'For the primer section, keep r = 1 to stay on the surface of the sphere. Lowering r moves the point inward and models decoherence.'
              : 'The point now sits inside the Bloch ball. Increasing r sharpens the state; setting r back to 1 returns to a pure state.'}
          </p>
        </div>
      </div>
    </div>
  );
}
