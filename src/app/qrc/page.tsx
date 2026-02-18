'use client';

import Link from 'next/link';
import { Essay, Section, SubSection } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { qrcCards } from '@/data/qrc-cards';
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

function StateUpdateVisual() {
  return (
    <FigureFrame
      title="Temporal State Update"
      caption="Reservoir state mixes new input and previous memory at every step."
    >
      <svg viewBox="0 0 860 200" className={styles.figureSvg} role="img" aria-label="State update flow">
        <defs>
          <linearGradient id="qrcFlowNode" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1f3f72" />
            <stop offset="100%" stopColor="#10233d" />
          </linearGradient>
          <marker id="qrcArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#86dbff" />
          </marker>
        </defs>

        <rect x="20" y="56" width="154" height="84" rx="12" fill="url(#qrcFlowNode)" stroke="#7ec6ff" strokeWidth="1.2" />
        <text x="97" y="88" textAnchor="middle" className={styles.svgLabel}>x(t)</text>
        <text x="97" y="110" textAnchor="middle" className={styles.svgSub}>input</text>

        <rect x="248" y="56" width="180" height="84" rx="12" fill="url(#qrcFlowNode)" stroke="#7ec6ff" strokeWidth="1.2" />
        <text x="338" y="88" textAnchor="middle" className={styles.svgLabel}>h(t-1)</text>
        <text x="338" y="110" textAnchor="middle" className={styles.svgSub}>memory</text>

        <rect x="494" y="42" width="176" height="112" rx="12" fill="#163054" stroke="#8de1ff" strokeWidth="1.3" />
        <text x="582" y="84" textAnchor="middle" className={styles.svgLabel}>f(·)</text>
        <text x="582" y="108" textAnchor="middle" className={styles.svgSub}>fixed dynamics</text>

        <rect x="726" y="56" width="116" height="84" rx="12" fill="url(#qrcFlowNode)" stroke="#7ec6ff" strokeWidth="1.2" />
        <text x="784" y="88" textAnchor="middle" className={styles.svgLabel}>h(t)</text>
        <text x="784" y="110" textAnchor="middle" className={styles.svgSub}>new state</text>

        <line x1="174" y1="98" x2="248" y2="98" stroke="#86dbff" strokeWidth="2" markerEnd="url(#qrcArrow)" />
        <line x1="428" y1="98" x2="494" y2="98" stroke="#86dbff" strokeWidth="2" markerEnd="url(#qrcArrow)" />
        <line x1="670" y1="98" x2="726" y2="98" stroke="#86dbff" strokeWidth="2" markerEnd="url(#qrcArrow)" />
      </svg>
    </FigureFrame>
  );
}

function GradientVisual() {
  return (
    <FigureFrame
      title="BPTT Gradient Behavior"
      caption="Long chains can contract gradients to zero or expand them uncontrollably."
    >
      <svg viewBox="0 0 860 210" className={styles.figureSvg} role="img" aria-label="Gradient regimes">
        <line x1="62" y1="176" x2="810" y2="176" stroke="#6da0d8" strokeWidth="1.2" />
        <line x1="62" y1="26" x2="62" y2="176" stroke="#6da0d8" strokeWidth="1.2" />

        <path d="M70 98 C 220 86, 380 62, 540 34 C 650 16, 740 16, 800 24" fill="none" stroke="#ff8b9b" strokeWidth="3" />
        <path d="M70 98 C 220 112, 380 136, 540 156 C 650 166, 740 170, 800 172" fill="none" stroke="#6fd7ff" strokeWidth="3" />

        <text x="736" y="26" fill="#ff8b9b" fontSize="14" fontWeight="700">exploding</text>
        <text x="720" y="170" fill="#6fd7ff" fontSize="14" fontWeight="700">vanishing</text>
      </svg>
    </FigureFrame>
  );
}

function ReservoirReadoutVisual() {
  return (
    <FigureFrame
      title="Reservoir + Linear Readout"
      caption="A fixed dynamic core plus a trainable linear layer."
    >
      <svg viewBox="0 0 860 220" className={styles.figureSvg} role="img" aria-label="Reservoir readout architecture">
        <rect x="24" y="64" width="118" height="88" rx="12" fill="#1b3660" stroke="#81ccff" />
        <text x="83" y="102" textAnchor="middle" className={styles.svgLabel}>Input</text>
        <text x="83" y="124" textAnchor="middle" className={styles.svgSub}>x(t)</text>

        <ellipse cx="372" cy="108" rx="188" ry="84" fill="#112742" stroke="#7fd1ff" strokeWidth="1.2" />
        <text x="372" y="36" textAnchor="middle" className={styles.svgLabel}>Fixed Reservoir Dynamics</text>

        <circle cx="290" cy="95" r="8" fill="#8ce4ff" />
        <circle cx="328" cy="128" r="7" fill="#9ab7ff" />
        <circle cx="368" cy="88" r="9" fill="#7fe2ff" />
        <circle cx="408" cy="120" r="8" fill="#8cc7ff" />
        <circle cx="442" cy="84" r="7" fill="#7fe2ff" />
        <circle cx="474" cy="126" r="8" fill="#8cc7ff" />

        <line x1="290" y1="95" x2="328" y2="128" stroke="#72b5ec" />
        <line x1="328" y1="128" x2="368" y2="88" stroke="#72b5ec" />
        <line x1="368" y1="88" x2="408" y2="120" stroke="#72b5ec" />
        <line x1="408" y1="120" x2="442" y2="84" stroke="#72b5ec" />
        <line x1="442" y1="84" x2="474" y2="126" stroke="#72b5ec" />
        <line x1="474" y1="126" x2="328" y2="128" stroke="#72b5ec" />

        <rect x="616" y="58" width="122" height="100" rx="12" fill="#1b3660" stroke="#81ccff" />
        <text x="677" y="98" textAnchor="middle" className={styles.svgLabel}>Readout</text>
        <text x="677" y="122" textAnchor="middle" className={styles.svgSub}>ridge fit</text>

        <rect x="774" y="72" width="66" height="72" rx="10" fill="#163054" stroke="#81ccff" />
        <text x="807" y="110" textAnchor="middle" className={styles.svgLabel}>y(t)</text>

        <line x1="142" y1="108" x2="186" y2="108" stroke="#83deff" strokeWidth="2" />
        <line x1="560" y1="108" x2="616" y2="108" stroke="#83deff" strokeWidth="2" />
        <line x1="738" y1="108" x2="774" y2="108" stroke="#83deff" strokeWidth="2" />
      </svg>
    </FigureFrame>
  );
}

function QuantumPotentialVisual() {
  return (
    <FigureFrame
      title="Quantum Barrier Intuition"
      caption="A driven quantum system can retain a tunneled component after a barrier interaction."
    >
      <svg viewBox="0 0 860 220" className={styles.figureSvg} role="img" aria-label="Quantum barrier and tunneling intuition">
        <line x1="52" y1="176" x2="810" y2="176" stroke="#6b9acd" strokeWidth="1.2" />
        <path d="M60 176 L250 176 L340 90 L520 90 L610 176 L810 176" fill="none" stroke="#8dc1ff" strokeWidth="3" />
        <path d="M86 138 C 140 90, 198 90, 252 138" fill="none" stroke="#79e2ff" strokeWidth="3" />
        <path d="M252 138 C 304 156, 334 152, 356 142" fill="none" stroke="#79e2ff" strokeWidth="2.4" opacity="0.58" />
        <path d="M520 140 C 566 112, 618 112, 664 140" fill="none" stroke="#79e2ff" strokeWidth="2.2" opacity="0.58" />
        <circle cx="150" cy="128" r="8" fill="#a9f0ff" />
        <circle cx="602" cy="134" r="6" fill="#a9f0ff" opacity="0.75" />
        <text x="378" y="78" textAnchor="middle" className={styles.svgSub}>potential barrier</text>
        <text x="112" y="196" className={styles.svgSub}>incoming packet</text>
        <text x="552" y="196" className={styles.svgSub}>transmitted component</text>
      </svg>
    </FigureFrame>
  );
}

function MeasurementVisual() {
  return (
    <FigureFrame
      title="Measurement to Feature Vector"
      caption="Observable expectations are converted into classical readout features."
    >
      <svg viewBox="0 0 860 220" className={styles.figureSvg} role="img" aria-label="Measurement and feature extraction">
        <rect x="34" y="58" width="172" height="104" rx="12" fill="#143058" stroke="#86cdff" />
        <text x="120" y="100" textAnchor="middle" className={styles.svgLabel}>rho(t)</text>
        <text x="120" y="122" textAnchor="middle" className={styles.svgSub}>quantum state</text>

        <rect x="282" y="46" width="212" height="128" rx="14" fill="#122946" stroke="#7ec8ff" />
        <text x="388" y="82" textAnchor="middle" className={styles.svgLabel}>Measure O_k</text>
        <text x="388" y="108" textAnchor="middle" className={styles.svgSub}>⟨sigma_x⟩, ⟨sigma_y⟩, ...</text>
        <text x="388" y="136" textAnchor="middle" className={styles.svgSub}>z(t) in R^k</text>

        <rect x="566" y="58" width="126" height="104" rx="12" fill="#15325a" stroke="#84d7ff" />
        <text x="629" y="100" textAnchor="middle" className={styles.svgLabel}>Features</text>
        <text x="629" y="122" textAnchor="middle" className={styles.svgSub}>z(t)</text>

        <rect x="730" y="72" width="104" height="78" rx="10" fill="#173764" stroke="#84d7ff" />
        <text x="782" y="108" textAnchor="middle" className={styles.svgLabel}>y(t)</text>
        <text x="782" y="128" textAnchor="middle" className={styles.svgSub}>readout</text>

        <line x1="206" y1="110" x2="282" y2="110" stroke="#83deff" strokeWidth="2" />
        <line x1="494" y1="110" x2="566" y2="110" stroke="#83deff" strokeWidth="2" />
        <line x1="692" y1="110" x2="730" y2="110" stroke="#83deff" strokeWidth="2" />
      </svg>
    </FigureFrame>
  );
}

function cardIndex(id: string): number {
  const parsed = parseInt(id.split('-')[1] ?? '0', 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function QRCPage() {
  const cardSets = {
    foundations: qrcCards.filter((c) => cardIndex(c.id) <= 7),
    quantumCore: qrcCards.filter((c) => cardIndex(c.id) >= 8 && cardIndex(c.id) <= 14),
    applications: qrcCards.filter((c) => cardIndex(c.id) >= 15),
  };

  return (
    <Essay
      title="Quantum Reservoir Computing for the Very Curious"
      subtitle="A deep path from classical temporal learning to quantum reservoirs: intuitive first steps, then full mathematical structure and realistic implementation constraints."
      slug="/qrc"
    >
      <Section id="introduction" title="Introduction">
        <p>
          This course is built as a staircase. We begin with intuition and simple equations, then move to full formal
          models used in current QRC research.
        </p>
        <p>
          The learning loop is deliberate: read carefully, work through the examples, then use a smaller set of in-text
          flashcards to anchor core ideas. The objective is not just understanding once, but durable recall.
        </p>
        <p>
          If a section feels dense, pause at the intuition sentence first, then read the equation line-by-line. This
          text is written so each equation directly corresponds to one physical or algorithmic mechanism.
        </p>

        <div className={styles.primerNote}>
          New to quantum mechanics? The{' '}
          <Link href="/quantum-primer">Quantum Mechanics Primer</Link> covers states, gates,
          measurement, and open-system dynamics — everything you need before the quantum sections
          of this essay.
        </div>

        <div className={styles.quickMap}>
          <div className={styles.quickMapTitle}>Learning Path</div>
          <div className={styles.quickMapFlow}>
            <span className={styles.quickStep}>Temporal Intuition</span>
            <span className={styles.quickArrow}>→</span>
            <span className={styles.quickStep}>Reservoir Principle</span>
            <span className={styles.quickArrow}>→</span>
            <span className={styles.quickStep}>Quantum Dynamics</span>
            <span className={styles.quickArrow}>→</span>
            <span className={styles.quickStep}>Hardware Reality</span>
          </div>
          <p className={styles.quickMapNote}>
            Embedded review cards are part of the method, not an extra. They lock in definitions, equations, and
            design tradeoffs over time.
          </p>
        </div>

        <div className={styles.pipelineVisual} aria-label="QRC pipeline" role="img">
          <div className={styles.pipelineNode}>
            <span className={styles.nodeLabel}>Input Sequence</span>
            <span className={styles.nodeSub}>u(t)</span>
          </div>
          <span className={styles.pipelineConnector} />
          <div className={styles.pipelineNode}>
            <span className={styles.nodeLabel}>Reservoir Dynamics</span>
            <span className={styles.nodeSub}>h(t) or rho(t)</span>
          </div>
          <span className={styles.pipelineConnector} />
          <div className={styles.pipelineNode}>
            <span className={styles.nodeLabel}>Features</span>
            <span className={styles.nodeSub}>z(t)</span>
          </div>
          <span className={styles.pipelineConnector} />
          <div className={styles.pipelineNode}>
            <span className={styles.nodeLabel}>Readout</span>
            <span className={styles.nodeSub}>y(t)</span>
          </div>
        </div>
      </Section>

      <Section id="recurrent-neural-networks" title="Recurrent Neural Networks">
        <p>
          A recurrent model keeps memory through state recursion. At time t, the new state depends on the previous
          state and current input:
        </p>
        <MathBlock
          display
          math="\mathbf{h}(t)=f\left(\mathbf{W}_{\text{in}}\mathbf{x}(t)+\mathbf{W}_{\text{res}}\mathbf{h}(t-1)+\mathbf{b}\right)"
        />
        <p>
          This is the core temporal template from which ESNs and QRC are derived. The challenge is not writing this
          equation; it is training such models stably for long contexts.
        </p>
        <p>
          Keep this interpretation in mind: <MathBlock math="\mathbf{W}_{\text{in}}\mathbf{x}(t)" /> injects new
          information, while <MathBlock math="\mathbf{W}_{\text{res}}\mathbf{h}(t-1)" /> carries temporal context.
          Reservoir methods keep that temporal machinery fixed and move learning pressure to the readout.
        </p>
        <StateUpdateVisual />
      </Section>

      <Section id="the-training-problem" title="The Training Problem">
        <p>
          Backpropagation through time multiplies many Jacobians across sequence depth. The product can collapse or
          explode, creating vanishing/exploding gradients:
        </p>
        <MathBlock
          display
          math="\frac{\partial \mathbf{h}(t)}{\partial \mathbf{h}(k)}=\prod_{i=k+1}^{t}\mathbf{W}_{\text{res}}^{\top}\,\mathrm{diag}(f'(\mathbf{h}(i)))"
        />
        <p>
          Reservoir computing avoids this by not training recurrent weights at all. It keeps temporal dynamics fixed
          and learns only a final mapping.
        </p>
        <p>
          This is a major engineering simplification: instead of solving a fragile non-convex temporal optimization,
          you solve a stable linear regression after collecting states.
        </p>
        <GradientVisual />
      </Section>

      <Section id="echo-state-networks" title="Echo State Networks">
        <p>
          ESNs are the classical prototype of reservoir computing. You initialize a random recurrent reservoir,
          optionally tune spectral radius and leak, and train only the readout.
        </p>
        <MathBlock
          display
          math="\mathbf{h}(t)=(1-\alpha)\mathbf{h}(t-1)+\alpha\tanh\!\left(\mathbf{W}_{\text{in}}\mathbf{x}(t)+\mathbf{W}_{\text{res}}\mathbf{h}(t-1)\right)"
        />
        <p>
          The readout is then a ridge-regressed linear map from state features to outputs.
        </p>
        <p>
          Conceptually, ESNs separate representation from training: representation is produced by dynamics, training is
          delegated to a lightweight statistical layer.
        </p>
      </Section>

      <Section id="reservoir-computing-paradigm" title="Reservoir Computing Paradigm">
        <p>
          A good reservoir must separate different input histories and keep fading memory of recent context. In
          practice this means operating near, but not beyond, instability.
        </p>
        <p>
          A common guideline for classical reservoirs is controlling spectral radius:
        </p>
        <MathBlock display math="\rho(\mathbf{W}_{\text{res}}) \lesssim 1" />
        <p>
          Values near one can improve memory depth, but they narrow the stability margin. Practical tuning is always a
          balance between expressive state trajectories and robust inference.
        </p>
        <ReservoirReadoutVisual />
      </Section>

      <Section id="readout-layer" title="Readout Layer and Ridge Regression">
        <p>
          Collect states into <MathBlock math="\mathbf{H}" />, targets into <MathBlock math="\mathbf{Y}" />, then solve:
        </p>
        <MathBlock
          display
          math="\mathbf{W}_{\text{out}}=\mathbf{Y}\mathbf{H}^{\top}(\mathbf{H}\mathbf{H}^{\top}+\beta\mathbf{I})^{-1}"
        />
        <p>
          This gives a stable, convex training objective and is one reason reservoirs transfer well to physical
          hardware settings.
        </p>
        <p>
          In implementation terms, you mainly tune regularization, state normalization, and washout length. Most
          gains come from improving feature quality before the solver, not from making the solver itself more complex.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.foundations} />

      <Section id="going-quantum" title="Going Quantum">
        <p>
          QRC keeps the same training philosophy but replaces classical recurrence with quantum dynamics. An
          n-qubit reservoir evolves in a 2^n-dimensional Hilbert space, which can provide rich temporal feature maps.
        </p>
        <p>
          Closed-system evolution follows Schrödinger dynamics:
        </p>
        <MathBlock display math="i\hbar\frac{d}{dt}|\psi(t)\rangle=\hat{H}(t)|\psi(t)\rangle" />
        <p>
          The reservoir viewpoint is practical here: we do not need universal fault-tolerant computation to get value.
          We need useful temporal feature dynamics that can be measured reliably.
        </p>
      </Section>

      <Section id="quantum-systems-as-reservoirs" title="Quantum Systems as Reservoirs">
        <p>
          Real hardware is open and noisy, so density-matrix form is often more useful:
        </p>
        <MathBlock
          display
          math="\frac{d\rho}{dt}=-\frac{i}{\hbar}[\hat{H}(t),\rho]+\mathcal{L}[\rho]"
        />
        <p>
          Here <MathBlock math="\mathcal{L}" /> captures dissipative channels. Moderate dissipation can help fading
          memory, while strong dissipation erases informative structure.
        </p>
        <p>
          So in QRC, noise is neither purely enemy nor friend. It is a design parameter that can regularize temporal
          memory when controlled, or destroy it when excessive.
        </p>
        <QuantumPotentialVisual />
      </Section>

      <Section id="input-encoding" title="Input Encoding">
        <p>
          QRC quality depends heavily on how classical signals are injected into quantum evolution.
        </p>

        <SubSection id="input-encoding-parameter" title="Parameter Encoding">
          <p>
            Input modulates Hamiltonian or gate parameters directly, for example:
          </p>
          <MathBlock display math="\hat{H}(t)=\hat{H}_0+u(t)\sum_i b_i\hat{\sigma}_i^x" />
          <p>
            This is usually the easiest strategy to deploy on real hardware because it aligns with native control
            channels.
          </p>
        </SubSection>

        <SubSection id="input-encoding-amplitude" title="Amplitude Encoding">
          <p>
            A normalized vector can be embedded in amplitudes:
          </p>
          <MathBlock
            display
            math="|\psi_{\text{in}}\rangle=\frac{1}{\|\mathbf{x}\|}\sum_{i=1}^{N}x_i|i\rangle"
          />
          <p>
            It is information-dense but can be costly to prepare on noisy hardware.
          </p>
          <p>
            In practice, teams often prototype with parameter encoding first and move to richer encodings only when
            the task justifies the added preparation cost.
          </p>
        </SubSection>

        <SubSection id="input-encoding-temporal" title="Time-Multiplexing">
          <p>
            Repeated sampling over short windows creates virtual nodes from one physical system, trading extra time for
            effective dimensionality.
          </p>
          <p>
            This is a frequent strategy when hardware qubit count is small but timing control is strong.
          </p>
        </SubSection>
      </Section>

      <Section id="measurement-and-features" title="Measurement and Features">
        <p>
          Readout uses measured observables:
        </p>
        <MathBlock display math="z_k(t)=\langle \hat{O}_k\rangle_t=\mathrm{Tr}(\hat{O}_k\rho(t))" />
        <p>
          The prediction is a linear map on these features:
        </p>
        <MathBlock display math="y(t)=\sum_{k}w_k z_k(t)+b" />
        <p>
          Measurement introduces shot noise and state disturbance, so feature richness must be balanced against
          coherence preservation.
        </p>
        <p>
          A useful workflow is to begin with a compact observable set, verify stability, then expand features
          incrementally while tracking calibration and shot budgets.
        </p>
        <MeasurementVisual />
      </Section>

      <ReviewCardSet cards={cardSets.quantumCore} />

      <Section id="time-series-prediction" title="Time-Series Workflow">
        <p>
          A complete QRC experiment includes temporal splitting, washout, feature extraction, ridge training, and both
          one-step and rollout evaluation. Rollout is essential for checking long-horizon stability.
        </p>
        <p>
          Typical benchmark families include nonlinear autoregressive tasks, chaotic forecasting, and streaming
          classification.
        </p>
        <p>
          Always report both one-step and rollout behavior. A model that wins one-step error can still drift badly
          under autoregressive rollout.
        </p>
      </Section>

      <Section id="quantum-advantage" title="Quantum Advantage Claims">
        <p>
          Advantage claims are meaningful only with matched resource budgets and strong classical baselines. Error-only
          comparisons are insufficient without latency, shot, and calibration costs.
        </p>
        <p>
          The relevant metric is task performance at fixed total budget, not isolated best-case numbers.
        </p>
        <p>
          Budget should include data protocol, shot count, latency, calibration cadence, and classical post-processing
          overhead.
        </p>
      </Section>

      <Section id="physical-implementations" title="Hardware Implementations">
        <p>
          Superconducting, photonic, and NMR-inspired setups each offer different tradeoffs in control, speed, and
          reproducibility. QRC design must be platform-aware from the start.
        </p>
        <p>
          A platform choice is a systems decision, not only an algorithm decision: control stack maturity and
          integration constraints often dominate lab-to-product transfer.
        </p>
      </Section>

      <Section id="research-directions" title="Research Directions">
        <p>
          Open questions include principled Hamiltonian design, robust low-shot feature sets, and reproducible
          benchmarking standards. The field is moving from proof-of-concept toward engineering discipline.
        </p>
        <p>
          In practical terms, the next milestone is not maximal novelty but reliable, repeatable performance on
          well-scoped temporal tasks.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.applications} />
    </Essay>
  );
}
