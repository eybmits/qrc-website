'use client';

import { Essay, Section, SubSection } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { quantumPrimerCards } from '@/data/quantum-primer-cards';
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
      title="The Bloch Sphere"
      caption="Every pure single-qubit state maps to a point on the unit sphere."
    >
      <svg viewBox="0 0 400 380" className={styles.figureSvg} role="img" aria-label="Bloch sphere with qubit state">
        <defs>
          <radialGradient id="qpSphereGrad" cx="0.4" cy="0.35" r="0.6">
            <stop offset="0%" stopColor="rgba(100,180,255,0.12)" />
            <stop offset="100%" stopColor="rgba(10,20,40,0.02)" />
          </radialGradient>
          <marker id="qpArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#86dbff" />
          </marker>
          <marker id="qpArrowState" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#ff9b6a" />
          </marker>
        </defs>

        {/* Sphere outline */}
        <ellipse cx="200" cy="200" rx="140" ry="140" fill="url(#qpSphereGrad)" stroke="#5a9ad6" strokeWidth="1" opacity="0.5" />
        {/* Equator ellipse */}
        <ellipse cx="200" cy="200" rx="140" ry="40" fill="none" stroke="#4a7fb8" strokeWidth="0.8" strokeDasharray="4 3" />

        {/* Z axis */}
        <line x1="200" y1="46" x2="200" y2="354" stroke="#6da0d8" strokeWidth="1.2" />
        {/* X axis */}
        <line x1="60" y1="200" x2="340" y2="200" stroke="#6da0d8" strokeWidth="1.0" strokeDasharray="4 3" />
        {/* Y axis (projected) */}
        <line x1="130" y1="260" x2="270" y2="140" stroke="#6da0d8" strokeWidth="1.0" strokeDasharray="4 3" />

        {/* |0⟩ label at north pole */}
        <circle cx="200" cy="56" r="4" fill="#8ce4ff" />
        <text x="218" y="54" className={styles.svgLabel}>|0⟩</text>

        {/* |1⟩ label at south pole */}
        <circle cx="200" cy="344" r="4" fill="#8ce4ff" />
        <text x="218" y="348" className={styles.svgLabel}>|1⟩</text>

        {/* Axis labels */}
        <text x="346" y="204" className={styles.svgSub}>x</text>
        <text x="274" y="136" className={styles.svgSub}>y</text>
        <text x="206" y="38" className={styles.svgSub}>z</text>

        {/* State vector |ψ⟩ */}
        <line x1="200" y1="200" x2="290" y2="110" stroke="#ff9b6a" strokeWidth="2.5" markerEnd="url(#qpArrowState)" />
        <text x="296" y="106" fill="#ff9b6a" className={styles.svgLabel}>|ψ⟩</text>

        {/* Theta arc */}
        <path d="M200,180 Q210,168 214,160" fill="none" stroke="#ffb88a" strokeWidth="1.2" />
        <text x="218" y="168" fill="#ffb88a" fontSize="13" fontStyle="italic">θ</text>

        {/* Phi arc on equator */}
        <path d="M230,200 Q226,210 220,215" fill="none" stroke="#88d4ff" strokeWidth="1.2" />
        <text x="232" y="218" fill="#88d4ff" fontSize="13" fontStyle="italic">φ</text>
      </svg>
    </FigureFrame>
  );
}

function GateCircuitVisual() {
  return (
    <FigureFrame
      title="Quantum Circuit: Bell State Preparation"
      caption="A Hadamard gate followed by CNOT creates maximal entanglement from |00⟩."
    >
      <svg viewBox="0 0 580 180" className={styles.figureSvg} role="img" aria-label="H gate and CNOT circuit creating Bell state">
        {/* Qubit wires */}
        <line x1="60" y1="60" x2="520" y2="60" stroke="#6da0d8" strokeWidth="1.5" />
        <line x1="60" y1="120" x2="520" y2="120" stroke="#6da0d8" strokeWidth="1.5" />

        {/* Input labels */}
        <text x="28" y="64" className={styles.svgLabel}>|0⟩</text>
        <text x="28" y="124" className={styles.svgLabel}>|0⟩</text>

        {/* Hadamard gate */}
        <rect x="140" y="36" width="52" height="48" rx="6" fill="#1b3660" stroke="#81ccff" strokeWidth="1.3" />
        <text x="166" y="66" textAnchor="middle" className={styles.svgLabel}>H</text>

        {/* CNOT gate */}
        {/* Control dot on qubit 0 */}
        <circle cx="290" cy="60" r="7" fill="#8ce4ff" />
        {/* Vertical line to target */}
        <line x1="290" y1="67" x2="290" y2="103" stroke="#8ce4ff" strokeWidth="2" />
        {/* Target circle on qubit 1 */}
        <circle cx="290" cy="120" r="17" fill="none" stroke="#8ce4ff" strokeWidth="2" />
        <line x1="290" y1="103" x2="290" y2="137" stroke="#8ce4ff" strokeWidth="2" />
        <line x1="273" y1="120" x2="307" y2="120" stroke="#8ce4ff" strokeWidth="2" />

        {/* Output label */}
        <text x="400" y="90" textAnchor="middle" className={styles.svgSub}>(|00⟩ + |11⟩) / √2</text>
      </svg>
    </FigureFrame>
  );
}

function MeasurementCollapseVisual() {
  return (
    <FigureFrame
      title="Measurement and Collapse"
      caption="A superposition state collapses to a definite outcome with Born-rule probabilities."
    >
      <svg viewBox="0 0 700 200" className={styles.figureSvg} role="img" aria-label="Measurement collapse from superposition to basis state">
        <defs>
          <marker id="qpMeasArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#86dbff" />
          </marker>
        </defs>

        {/* Superposition state */}
        <rect x="30" y="50" width="160" height="100" rx="12" fill="#1b3660" stroke="#81ccff" strokeWidth="1.2" />
        <text x="110" y="88" textAnchor="middle" className={styles.svgLabel}>α|0⟩ + β|1⟩</text>
        <text x="110" y="116" textAnchor="middle" className={styles.svgSub}>superposition</text>

        {/* Measurement box */}
        <rect x="260" y="50" width="120" height="100" rx="12" fill="#163054" stroke="#8de1ff" strokeWidth="1.3" />
        <text x="320" y="92" textAnchor="middle" className={styles.svgLabel}>Measure</text>
        <text x="320" y="116" textAnchor="middle" className={styles.svgSub}>in Z basis</text>

        {/* Arrows in */}
        <line x1="190" y1="100" x2="260" y2="100" stroke="#86dbff" strokeWidth="2" markerEnd="url(#qpMeasArrow)" />

        {/* Outcome |0⟩ */}
        <rect x="460" y="24" width="100" height="56" rx="10" fill="#1b3660" stroke="#7ec6ff" strokeWidth="1.1" />
        <text x="510" y="50" textAnchor="middle" className={styles.svgLabel}>|0⟩</text>
        <text x="510" y="68" textAnchor="middle" className={styles.svgSub}>prob |α|²</text>

        {/* Outcome |1⟩ */}
        <rect x="460" y="120" width="100" height="56" rx="10" fill="#1b3660" stroke="#7ec6ff" strokeWidth="1.1" />
        <text x="510" y="146" textAnchor="middle" className={styles.svgLabel}>|1⟩</text>
        <text x="510" y="164" textAnchor="middle" className={styles.svgSub}>prob |β|²</text>

        {/* Arrows out */}
        <line x1="380" y1="80" x2="460" y2="52" stroke="#86dbff" strokeWidth="2" markerEnd="url(#qpMeasArrow)" />
        <line x1="380" y1="120" x2="460" y2="148" stroke="#86dbff" strokeWidth="2" markerEnd="url(#qpMeasArrow)" />
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
            <path d="M0,0 L8,4 L0,8 Z" fill="#86dbff" />
          </marker>
        </defs>

        {/* System box */}
        <rect x="200" y="50" width="200" height="100" rx="14" fill="#143058" stroke="#86cdff" strokeWidth="1.3" />
        <text x="300" y="88" textAnchor="middle" className={styles.svgLabel}>System ρ</text>
        <text x="300" y="114" textAnchor="middle" className={styles.svgSub}>Ĥ drives unitary part</text>

        {/* Environment cloud */}
        <ellipse cx="560" cy="100" rx="90" ry="60" fill="rgba(100,160,220,0.08)" stroke="#5a8fba" strokeWidth="1" strokeDasharray="5 3" />
        <text x="560" y="96" textAnchor="middle" className={styles.svgSub}>Environment</text>
        <text x="560" y="114" textAnchor="middle" className={styles.svgSub}>(thermal, photon loss...)</text>

        {/* Coupling arrows */}
        <line x1="400" y1="82" x2="470" y2="82" stroke="#ff9b6a" strokeWidth="1.8" markerEnd="url(#qpEnvArrow)" />
        <line x1="470" y1="118" x2="400" y2="118" stroke="#ff9b6a" strokeWidth="1.8" markerEnd="url(#qpEnvArrow)" />
        <text x="435" y="72" fill="#ff9b6a" fontSize="12">Lₖ</text>

        {/* Hamiltonian arrow */}
        <line x1="100" y1="100" x2="200" y2="100" stroke="#86dbff" strokeWidth="2" markerEnd="url(#qpEnvArrow)" />
        <text x="130" y="88" className={styles.svgSub}>Ĥ(t)</text>

        {/* Lindblad label */}
        <text x="300" y="190" textAnchor="middle" className={styles.svgSub}>dρ/dt = −i[Ĥ,ρ] + Σₖ dissipator(Lₖ)</text>

        {/* Decoherence note */}
        <text x="300" y="218" textAnchor="middle" fill="#92aacc" fontSize="12">Moderate noise → fading memory (useful for RC)</text>
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
      title="Quantum Mechanics Primer"
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
