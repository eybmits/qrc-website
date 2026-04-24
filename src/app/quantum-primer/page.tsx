import Image from 'next/image';
import Link from 'next/link';
import { Essay, Section, SubSection } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { quantumPrimerCards } from '@/data/quantum-primer-cards';
import { BlochSphereExplorer } from './BlochSphereExplorer';
import styles from './page.module.css';

interface FigureFrameProps {
  title: string;
  caption: string;
  children: React.ReactNode;
}

function FigureFrame({ title, caption, children }: FigureFrameProps) {
  return (
    <figure className={styles.figureFrame}>
      <figcaption className={styles.figureHeader}>
        <span className={styles.figureTitle}>{title}</span>
        <span className={styles.figureCaption}>{caption}</span>
      </figcaption>
      <div className={styles.figureCanvas}>{children}</div>
    </figure>
  );
}

function BlochSphereVisual() {
  return (
    <FigureFrame
      title="Interactive Bloch Sphere"
      caption="Move the three controls to explore polar angle, azimuthal phase, and purity. Turn on auto-spin to watch the state sweep around the sphere."
    >
      <BlochSphereExplorer />
    </FigureFrame>
  );
}

function GateCircuitVisual() {
  return (
    <FigureFrame
      title="Quantum Circuit: Bell State Preparation"
      caption="Apply a Hadamard to q0, then a controlled-NOT, to prepare the Bell pair."
    >
      <svg viewBox="0 0 760 220" className={styles.figureSvg} role="img" aria-label="Bell-state circuit with Hadamard on q0 followed by a controlled-not gate">
        <defs>
          <linearGradient id="qpCircuitGateClean" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffdf7" />
            <stop offset="100%" stopColor="#f2ead9" />
          </linearGradient>
          <linearGradient id="qpCircuitOutputClean" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#eef6fd" stopOpacity="0.94" />
          </linearGradient>
          <filter id="qpCircuitGateShadowClean" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#456e94" floodOpacity="0.08" />
          </filter>
          <filter id="qpCircuitOutputShadowClean" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#456e94" floodOpacity="0.09" />
          </filter>
        </defs>

        <g opacity="0.52">
          <line x1="330" y1="30" x2="330" y2="194" stroke="#deebf6" strokeWidth="1.2" />
          <line x1="475" y1="30" x2="475" y2="194" stroke="#deebf6" strokeWidth="1.2" />
        </g>

        <text x="54" y="73" fill="#5f7286" style={{ fontFamily: 'var(--font-ui), sans-serif', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em' }}>Q0</text>
        <text x="54" y="141" fill="#5f7286" style={{ fontFamily: 'var(--font-ui), sans-serif', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em' }}>Q1</text>
        <text x="86" y="82" fill="#1f2731" style={{ fontFamily: 'var(--font-ui), sans-serif', fontSize: 17, fontWeight: 700 }}>|0⟩</text>
        <text x="86" y="150" fill="#1f2731" style={{ fontFamily: 'var(--font-ui), sans-serif', fontSize: 17, fontWeight: 700 }}>|0⟩</text>

        <line x1="138" y1="76" x2="662" y2="76" stroke="#262f38" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="138" y1="144" x2="662" y2="144" stroke="#262f38" strokeWidth="2.6" strokeLinecap="round" />

        <g filter="url(#qpCircuitGateShadowClean)">
          <rect x="238" y="48" width="72" height="56" rx="16" fill="url(#qpCircuitGateClean)" stroke="#262f38" strokeWidth="2.2" />
          <text x="274" y="84" textAnchor="middle" fill="#1f2731" style={{ fontFamily: 'var(--font-ui), sans-serif', fontSize: 28, fontWeight: 800 }}>H</text>
        </g>

        <g>
          <circle cx="440" cy="76" r="8.5" fill="#1f2731" />
          <line x1="440" y1="76" x2="440" y2="144" stroke="#1f2731" strokeWidth="4.6" strokeLinecap="round" />
          <circle cx="440" cy="144" r="23" fill="rgba(255,255,255,0.78)" stroke="#1f2731" strokeWidth="4.4" />
          <line x1="417" y1="144" x2="463" y2="144" stroke="#1f2731" strokeWidth="3.8" strokeLinecap="round" />
          <line x1="440" y1="121" x2="440" y2="167" stroke="#1f2731" strokeWidth="3.8" strokeLinecap="round" />
        </g>

        <g filter="url(#qpCircuitOutputShadowClean)">
          <rect x="510" y="49" width="186" height="70" rx="24" fill="url(#qpCircuitOutputClean)" stroke="#cfd7df" strokeWidth="1.4" />
          <text x="603" y="71" textAnchor="middle" fill="#6c7e92" style={{ fontFamily: 'var(--font-ui), sans-serif', fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Bell Pair</text>
          <text x="603" y="99" textAnchor="middle" fill="#1f2731" style={{ fontFamily: 'var(--font-display), serif', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>(|00⟩ + |11⟩) / √2</text>
        </g>
      </svg>
    </FigureFrame>
  );
}

function MeasurementCollapseVisual() {
  return (
    <FigureFrame
      title="Measurement and Collapse"
      caption="Measure in the Z basis: first compute the Born-rule probabilities, then one sampled outcome becomes the post-measurement state."
    >
      <svg viewBox="0 0 760 228" className={styles.figureSvg} role="img" aria-label="Measurement in the Z basis shown as a sequence from superposition to Born-rule probabilities to collapsed outcomes">
        <defs>
          <linearGradient id="qpMeasPanelFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#f5f9fd" stopOpacity="0.94" />
          </linearGradient>
          <linearGradient id="qpMeasStateFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffdf7" />
            <stop offset="100%" stopColor="#f2ebdb" />
          </linearGradient>
          <linearGradient id="qpMeasRuleFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eef5fb" />
          </linearGradient>
          <linearGradient id="qpMeasOutcomeFlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#eef6fd" stopOpacity="0.92" />
          </linearGradient>
          <marker id="qpMeasArrowFlow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#24303a" />
          </marker>
          <filter id="qpMeasShadowFlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#456e94" floodOpacity="0.08" />
          </filter>
          <filter id="qpMeasSoftShadowFlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="9" floodColor="#456e94" floodOpacity="0.07" />
          </filter>
        </defs>

        <rect x="16" y="18" width="728" height="192" rx="28" fill="url(#qpMeasPanelFlow)" stroke="#dbe7f2" strokeWidth="1.2" />

        <g opacity="0.45">
          <line x1="250" y1="40" x2="250" y2="190" stroke="#deebf5" strokeWidth="1.2" />
          <line x1="470" y1="40" x2="470" y2="190" stroke="#deebf5" strokeWidth="1.2" />
        </g>

        <text x="146" y="58" className={styles.svgEyebrow}>Before Measurement</text>
        <text x="360" y="58" className={styles.svgEyebrow}>Readout Rule</text>
        <text x="586" y="58" className={styles.svgEyebrow}>Possible Outcomes</text>

        <g filter="url(#qpMeasSoftShadowFlow)">
          <rect x="58" y="76" width="170" height="90" rx="26" fill="url(#qpMeasStateFlow)" stroke="#87988e" strokeWidth="2" />
          <text x="143" y="110" textAnchor="middle" className={styles.svgEquation}>α|0⟩ + β|1⟩</text>
          <text x="143" y="136" textAnchor="middle" fill="#6e86a1" style={{ fontFamily: 'var(--font-body), serif', fontSize: 17 }}>superposition state</text>
          <text x="143" y="156" textAnchor="middle" className={styles.svgHint}>amplitudes set the later probabilities</text>
        </g>

        <line x1="228" y1="121" x2="284" y2="121" stroke="#24303a" strokeWidth="3" strokeLinecap="round" markerEnd="url(#qpMeasArrowFlow)" />

        <g filter="url(#qpMeasShadowFlow)">
          <rect x="286" y="62" width="162" height="118" rx="28" fill="url(#qpMeasRuleFlow)" stroke="#90a2ac" strokeWidth="1.8" />
          <rect x="336" y="74" width="62" height="20" rx="999" fill="rgba(115, 140, 164, 0.10)" stroke="rgba(115, 140, 164, 0.14)" />
          <text x="367" y="88" textAnchor="middle" fill="#5d7793" style={{ fontFamily: 'var(--font-ui), sans-serif', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Z Basis</text>
          <text x="367" y="116" textAnchor="middle" className={styles.svgLabel}>p(0) = |α|²</text>
          <text x="367" y="139" textAnchor="middle" className={styles.svgLabel}>p(1) = |β|²</text>
          <line x1="320" y1="150" x2="414" y2="150" stroke="#dce7f1" strokeWidth="1.2" />
          <text x="367" y="168" textAnchor="middle" className={styles.svgHint}>sample one outcome</text>
        </g>

        <line x1="448" y1="121" x2="512" y2="121" stroke="#24303a" strokeWidth="3" strokeLinecap="round" markerEnd="url(#qpMeasArrowFlow)" />
        <text x="480" y="110" textAnchor="middle" className={styles.svgHint}>collapse after sampling</text>

        <g filter="url(#qpMeasSoftShadowFlow)">
          <rect x="518" y="72" width="184" height="98" rx="24" fill="url(#qpMeasOutcomeFlow)" stroke="#d8e6f2" strokeWidth="1.4" />
          <line x1="548" y1="121" x2="674" y2="121" stroke="#dce7f1" strokeWidth="1.2" />
          <circle cx="568" cy="98" r="7" fill="#c28a5b" />
          <text x="604" y="95" textAnchor="middle" className={styles.svgLabel}>|0⟩</text>
          <text x="652" y="95" textAnchor="middle" fill="#6e86a1" style={{ fontFamily: 'var(--font-body), serif', fontSize: 15 }}>with p = |α|²</text>
          <circle cx="568" cy="145" r="7" fill="#607a96" />
          <text x="604" y="142" textAnchor="middle" className={styles.svgLabel}>|1⟩</text>
          <text x="652" y="142" textAnchor="middle" fill="#6e86a1" style={{ fontFamily: 'var(--font-body), serif', fontSize: 15 }}>with p = |β|²</text>
          <text x="610" y="164" textAnchor="middle" className={styles.svgHint}>a single shot selects one row</text>
        </g>
      </svg>
    </FigureFrame>
  );
}

function OpenSystemVisual() {
  return (
    <FigureFrame
      title="Open Quantum System"
      caption="The system evolves under both coherent Hamiltonian dynamics and incoherent environment coupling."
    >
      <svg viewBox="0 0 700 240" className={styles.figureSvg} role="img" aria-label="Open quantum system with environment coupling">
        <defs>
          <marker id="qpEnvArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#1d5f54" />
          </marker>
        </defs>

        {/* System box */}
        <rect x="200" y="50" width="200" height="100" rx="14" fill="#f0eadc" stroke="#7d8f84" strokeWidth="1.3" />
        <text x="300" y="88" textAnchor="middle" className={styles.svgLabel}>System ρ</text>
        <text x="300" y="114" textAnchor="middle" className={styles.svgSub}>Ĥ drives unitary part</text>

        {/* Environment cloud */}
        <ellipse cx="560" cy="100" rx="90" ry="60" fill="rgba(167, 157, 137, 0.08)" stroke="#9a9484" strokeWidth="1" strokeDasharray="5 3" />
        <text x="560" y="96" textAnchor="middle" className={styles.svgSub}>Environment</text>
        <text x="560" y="114" textAnchor="middle" className={styles.svgSub}>(thermal, photon loss...)</text>

        {/* Coupling arrows */}
        <line x1="400" y1="82" x2="470" y2="82" stroke="#c26a58" strokeWidth="1.8" markerEnd="url(#qpEnvArrow)" />
        <line x1="470" y1="118" x2="400" y2="118" stroke="#c26a58" strokeWidth="1.8" markerEnd="url(#qpEnvArrow)" />
        <text x="435" y="72" fill="#c26a58" fontSize="12">Lₖ</text>

        {/* Hamiltonian arrow */}
        <line x1="100" y1="100" x2="200" y2="100" stroke="#1d5f54" strokeWidth="2" markerEnd="url(#qpEnvArrow)" />
        <text x="130" y="88" className={styles.svgSub}>Ĥ(t)</text>

        {/* Lindblad label */}
        <text x="300" y="190" textAnchor="middle" className={styles.svgSub}>dρ/dt = −i[Ĥ,ρ] + Σₖ dissipator(Lₖ)</text>

        {/* Decoherence note */}
        <text x="300" y="218" textAnchor="middle" fill="#6b7265" fontSize="12">Moderate noise → fading memory (useful for RC)</text>
      </svg>
    </FigureFrame>
  );
}

function cardIndex(id: string): number {
  const parsed = parseInt(id.split('-')[1] ?? '0', 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function QuantumPrimerPage() {
  const cardSets = {
    foundations: quantumPrimerCards.filter((c) => cardIndex(c.id) <= 6),
    advanced: quantumPrimerCards.filter((c) => cardIndex(c.id) >= 7),
  };

  return (
    <Essay
      title="Quantum Mechanics Basics"
      subtitle="Essential quantum mechanics for understanding quantum reservoir computing: states, gates, measurement, density matrices, and open-system dynamics."
      slug="/quantum-primer"
    >
      <Section id="qp-introduction" title="Introduction">
        <p>
          This primer covers the quantum mechanics you need before reading the QRC essay. It does not
          assume any prior physics background beyond basic linear algebra (vectors, matrices, complex numbers).
        </p>
        <p>
          The goal is not a full quantum mechanics course. It is the minimum viable quantum toolkit for
          understanding how quantum systems serve as reservoirs: how states encode information, how dynamics
          process it, and how measurement extracts it.
        </p>

        <div className={styles.quickMap}>
          <div className={styles.quickMapVisual} aria-hidden="true">
            <Image
              src="/assets/quantum-primer-concepts-path.jpg"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 760px"
              className={styles.quickMapImage}
            />
          </div>
          <div className={styles.quickMapContent}>
            <div className={styles.quickMapTitle}>Concepts Path</div>
            <div className={styles.quickMapFlow}>
              <span className={styles.quickStep}>States &amp; Qubits</span>
              <span className={styles.quickArrow}>&rarr;</span>
              <span className={styles.quickStep}>Gates &amp; Circuits</span>
              <span className={styles.quickArrow}>&rarr;</span>
              <span className={styles.quickStep}>Measurement</span>
              <span className={styles.quickArrow}>&rarr;</span>
              <span className={styles.quickStep}>Open Dynamics</span>
            </div>
            <p className={styles.quickMapNote}>
              Each section builds on the last. Review cards appear after related sections to reinforce
              definitions and key equations.
            </p>
          </div>
        </div>
      </Section>

      <Section id="qp-classical-vs-quantum" title="Classical vs Quantum">
        <p>
          A classical bit is either 0 or 1. A qubit generalizes this: its state is a unit vector
          in a two-dimensional complex vector space.
        </p>
        <MathBlock
          display
          math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \qquad |\alpha|^2 + |\beta|^2 = 1"
        />
        <p>
          The notation <MathBlock math="|\cdot\rangle" /> is called a &ldquo;ket&rdquo; in Dirac notation.
          The computational basis states are:
        </p>
        <MathBlock
          display
          math="|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}, \qquad |1\rangle = \begin{pmatrix}0\\1\end{pmatrix}"
        />
        <p>
          The complex coefficients <MathBlock math="\alpha" /> and <MathBlock math="\beta" /> are called
          probability amplitudes. They carry both magnitude (which determines measurement probabilities)
          and phase (which determines interference behavior).
        </p>
        <p>
          A &ldquo;bra&rdquo; <MathBlock math="\langle\psi|" /> is the conjugate transpose of the ket.
          The inner product <MathBlock math="\langle\phi|\psi\rangle" /> gives the overlap between two states.
        </p>
      </Section>

      <Section id="qp-bloch-sphere" title="The Bloch Sphere">
        <p>
          Any single-qubit pure state can be parameterized as:
        </p>
        <MathBlock
          display
          math="|\psi\rangle = \cos\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\frac{\theta}{2}|1\rangle"
        />
        <p>
          This maps to a point on the unit sphere in three dimensions. The angles <MathBlock math="\theta" /> (polar)
          and <MathBlock math="\phi" /> (azimuthal) have direct physical meaning: <MathBlock math="\theta" /> controls
          how &ldquo;close&rdquo; the state is to <MathBlock math="|0\rangle" /> vs <MathBlock math="|1\rangle" />,
          while <MathBlock math="\phi" /> is the relative phase between the two components.
        </p>
        <BlochSphereVisual />
        <p>
          Quantum gates correspond to rotations on the Bloch sphere. This geometric picture is the main
          intuition tool for understanding single-qubit transformations.
        </p>
      </Section>

      <Section id="qp-quantum-gates" title="Quantum Gates">
        <p>
          Quantum gates are unitary matrices acting on qubit states. Unitarity
          (<MathBlock math="U^\dagger U = I" />) ensures that gates are reversible and preserve
          probability normalization.
        </p>

        <SubSection id="qp-gates-pauli" title="Pauli Gates">
          <p>
            The three Pauli matrices are the fundamental single-qubit operations:
          </p>
          <MathBlock
            display
            math="X = \begin{pmatrix}0&1\\1&0\end{pmatrix}, \quad Y = \begin{pmatrix}0&-i\\i&0\end{pmatrix}, \quad Z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}"
          />
          <p>
            X is a bit flip, Z is a phase flip, and Y combines both. On the Bloch sphere, each Pauli
            gate is a 180&deg; rotation about the corresponding axis. The Pauli operators also serve as
            observables for measurement, which is directly relevant to QRC feature extraction.
          </p>
        </SubSection>

        <SubSection id="qp-gates-hadamard" title="Hadamard and Rotations">
          <p>
            The Hadamard gate creates equal superpositions:
          </p>
          <MathBlock
            display
            math="H = \frac{1}{\sqrt{2}}\begin{pmatrix}1&1\\1&-1\end{pmatrix}"
          />
          <p>
            General single-qubit rotations about axis <MathBlock math="\hat{n}" /> by
            angle <MathBlock math="\theta" /> have the form:
          </p>
          <MathBlock
            display
            math="R_{\hat{n}}(\theta) = e^{-i\theta\hat{n}\cdot\vec{\sigma}/2} = \cos\frac{\theta}{2}\,I - i\sin\frac{\theta}{2}\,(\hat{n}\cdot\vec{\sigma})"
          />
          <p>
            where <MathBlock math="\vec{\sigma} = (X, Y, Z)" /> is the vector of Pauli matrices. In QRC,
            rotation angles are often the control parameters modulated by classical input signals.
          </p>
        </SubSection>

        <SubSection id="qp-gates-multi" title="Multi-Qubit Gates">
          <p>
            The controlled-NOT (CNOT) gate flips the target qubit only when the control qubit is <MathBlock math="|1\rangle" />:
          </p>
          <MathBlock
            display
            math="\text{CNOT} = |0\rangle\langle 0| \otimes I + |1\rangle\langle 1| \otimes X"
          />
          <p>
            Together with arbitrary single-qubit rotations, CNOT forms a universal gate set: any unitary on
            n qubits can be decomposed into single-qubit gates and CNOTs. This is a cornerstone result in
            quantum computing.
          </p>
          <GateCircuitVisual />
        </SubSection>
      </Section>

      <Section id="qp-measurement" title="Measurement">
        <p>
          Measurement is the bridge from quantum to classical information. For a qubit in
          state <MathBlock math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />, measuring in the
          computational basis yields:
        </p>
        <MathBlock
          display
          math="P(0) = |\alpha|^2, \qquad P(1) = |\beta|^2"
        />
        <p>
          This is the Born rule. After measurement, the state collapses to the observed outcome.
          The process is irreversible and probabilistic.
        </p>
        <MeasurementCollapseVisual />
        <p>
          For a general observable <MathBlock math="\hat{O}" /> (a Hermitian operator), the expectation
          value is:
        </p>
        <MathBlock
          display
          math="\langle\hat{O}\rangle = \langle\psi|\hat{O}|\psi\rangle"
        />
        <p>
          In QRC, observables like the Pauli operators are measured on the reservoir state, and
          their expectation values become the classical feature vector fed to the readout layer.
        </p>
        <p>
          Part 5, <Link href="/measurement">Measurement and Readout</Link>, picks up from here and
          treats observable choice, shot budgets, and measurement backaction as first-class design
          problems rather than small implementation details.
        </p>
      </Section>

      <Section id="qp-density-matrices" title="Density Matrices">
        <p>
          A pure state <MathBlock math="|\psi\rangle" /> can also be written as a density
          matrix: <MathBlock math="\rho = |\psi\rangle\langle\psi|" />. But density matrices can also
          represent mixed states, which arise from:
        </p>
        <ul>
          <li>Statistical ensembles (classical uncertainty about which state was prepared)</li>
          <li>Tracing out part of an entangled system (the reduced state of a subsystem)</li>
          <li>Decoherence from environmental interaction</li>
        </ul>
        <p>
          A valid density matrix satisfies <MathBlock math="\rho \geq 0" /> (positive semi-definite)
          and <MathBlock math="\text{Tr}(\rho) = 1" />. Purity is measured
          by <MathBlock math="\text{Tr}(\rho^2)" />: equal to 1 for pure states, less than 1 for mixed.
        </p>
        <MathBlock
          display
          math="\rho_{\text{pure}} = |\psi\rangle\langle\psi|, \quad \text{Tr}(\rho_{\text{pure}}^2) = 1"
        />
        <MathBlock
          display
          math="\rho_{\text{mixed}} = \sum_k p_k |\psi_k\rangle\langle\psi_k|, \quad \text{Tr}(\rho_{\text{mixed}}^2) < 1"
        />
        <p>
          The expectation value formula generalizes naturally:
        </p>
        <MathBlock
          display
          math="\langle\hat{O}\rangle = \text{Tr}(\hat{O}\rho)"
        />
        <p>
          This is the central formula in QRC for extracting features from the quantum reservoir state.
          The partial trace operation, <MathBlock math="\rho_A = \text{Tr}_B(\rho_{AB})" />, gives
          the reduced state of subsystem A, which is generally mixed even if the global state is pure.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.foundations} />

      <Section id="qp-entanglement" title="Entanglement">
        <p>
          A multi-qubit state is formed by the tensor product of individual qubit spaces. For
          two qubits, the basis is <MathBlock math="\{|00\rangle, |01\rangle, |10\rangle, |11\rangle\}" />,
          spanning a four-dimensional Hilbert space.
        </p>
        <p>
          A state is entangled if it cannot be written as a product of individual qubit
          states. The canonical examples are the Bell states:
        </p>
        <MathBlock
          display
          math="|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)"
        />
        <MathBlock
          display
          math="|\Phi^-\rangle = \frac{1}{\sqrt{2}}(|00\rangle - |11\rangle)"
        />
        <MathBlock
          display
          math="|\Psi^+\rangle = \frac{1}{\sqrt{2}}(|01\rangle + |10\rangle)"
        />
        <MathBlock
          display
          math="|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|01\rangle - |10\rangle)"
        />
        <p>
          In an entangled state, measuring one qubit instantly constrains the possible outcomes
          of the other. This is non-classical: no local hidden variable model can reproduce the
          correlations.
        </p>
        <p>
          For QRC, entanglement is what makes n qubits produce correlations across a 2<sup>n</sup>-dimensional
          space. It enables richer feature dynamics than n independent qubits would provide.
        </p>
      </Section>

      <Section id="qp-dynamics" title="Quantum Dynamics">
        <p>
          Closed quantum systems evolve according to the Schr&ouml;dinger equation:
        </p>
        <MathBlock
          display
          math="i\hbar\frac{d}{dt}|\psi(t)\rangle = \hat{H}(t)|\psi(t)\rangle"
        />
        <p>
          The Hamiltonian <MathBlock math="\hat{H}" /> is a Hermitian operator that encodes the energy
          structure and interactions of the system. For a time-independent Hamiltonian, the solution is:
        </p>
        <MathBlock
          display
          math="|\psi(t)\rangle = e^{-i\hat{H}t/\hbar}|\psi(0)\rangle = U(t)|\psi(0)\rangle"
        />
        <p>
          The evolution operator <MathBlock math="U(t) = e^{-i\hat{H}t/\hbar}" /> is unitary, so it preserves
          the norm of the state vector and is invertible. In density-matrix form:
        </p>
        <MathBlock
          display
          math="\rho(t) = U(t)\rho(0)U^\dagger(t)"
        />
        <p>
          In QRC, the Hamiltonian is the reservoir itself. Its structure determines what dynamical
          features the reservoir can produce. The time-dependent case <MathBlock math="\hat{H}(t)" /> is
          common in QRC, since classical inputs modulate Hamiltonian parameters at each time step.
        </p>
      </Section>

      <Section id="qp-open-systems" title="Open Quantum Systems">
        <p>
          Real quantum hardware is never perfectly isolated. Environmental interactions cause decoherence
          (loss of quantum coherence) and dissipation (energy exchange with surroundings). The Lindblad
          master equation governs these processes:
        </p>
        <MathBlock
          display
          math="\frac{d\rho}{dt} = -\frac{i}{\hbar}[\hat{H}, \rho] + \sum_k \gamma_k \left( L_k \rho L_k^\dagger - \frac{1}{2}\{L_k^\dagger L_k, \rho\}\right)"
        />
        <p>
          The first term is coherent (Hamiltonian) evolution. The sum is the dissipator, where
          each <MathBlock math="L_k" /> is a Lindblad (jump) operator describing a specific noise
          channel, and <MathBlock math="\gamma_k" /> is its rate.
        </p>
        <p>
          Common noise channels include:
        </p>
        <ul>
          <li>Amplitude damping (<MathBlock math="L = \sqrt{\gamma}\,|0\rangle\langle 1|" />) &mdash; energy relaxation</li>
          <li>Dephasing (<MathBlock math="L = \sqrt{\gamma/2}\,Z" />) &mdash; loss of phase coherence</li>
          <li>Depolarizing &mdash; uniform contraction toward the maximally mixed state</li>
        </ul>
        <OpenSystemVisual />
        <p>
          In QRC, noise is not purely destructive. Moderate decoherence can implement fading memory,
          helping the reservoir forget old inputs at a controlled rate. Too much noise destroys useful
          structure; too little can cause the reservoir to retain information indefinitely, violating
          the fading-memory property needed for temporal processing.
        </p>
      </Section>

      <Section id="qp-bridge" title="Bridge to Reservoir Computing">
        <p>
          Every concept in this primer maps directly to a QRC component:
        </p>
        <ul>
          <li>
            The density matrix <MathBlock math="\rho" /> is the reservoir state, evolving in
            a 2<sup>n</sup>-dimensional space for n qubits.
          </li>
          <li>
            The Hamiltonian <MathBlock math="\hat{H}(t)" /> drives the reservoir dynamics, with
            classical inputs modulating its parameters at each time step.
          </li>
          <li>
            Lindblad operators <MathBlock math="L_k" /> model hardware noise, which can serve as a
            natural fading-memory mechanism.
          </li>
          <li>
            Expectation values <MathBlock math="\text{Tr}(\hat{O}_k\rho)" /> extract classical features
            for the linear readout layer.
          </li>
        </ul>
        <p>
          The exponentially large Hilbert space is the key resource: a few qubits can produce
          feature vectors of dimension far exceeding the physical qubit count, potentially enriching
          the readout&apos;s discrimination power.
        </p>
        <p>
          With this foundation in place, you are ready to read the main QRC essay, where these
          quantum ingredients combine with the reservoir computing paradigm.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.advanced} />
    </Essay>
  );
}
