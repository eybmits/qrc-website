'use client';

import { Essay, Section } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { echoStateCards } from '@/data/echo-state-cards';

interface FigureProps {
  title: string;
  caption: string;
  children: React.ReactNode;
}

function Figure({ title, caption, children }: FigureProps) {
  return (
    <figure
      style={{
        background: 'linear-gradient(150deg, rgba(11,22,40,0.9), rgba(8,16,29,0.94))',
        border: '1px solid rgba(104,160,236,0.34)',
        borderRadius: 14,
        margin: '1rem 0 1.2rem',
        overflow: 'hidden',
      }}
    >
      <figcaption
        style={{
          background: 'linear-gradient(120deg, rgba(44,77,126,0.38), rgba(20,39,68,0.42))',
          borderBottom: '1px solid rgba(105,158,230,0.34)',
          padding: '0.65rem 0.84rem',
        }}
      >
        <div
          style={{
            color: '#def1ff',
            fontFamily: 'var(--font-ui), sans-serif',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        <div style={{ color: '#92aacc', fontSize: '0.78rem', lineHeight: 1.45 }}>{caption}</div>
      </figcaption>
      <div style={{ padding: '0.64rem 0.7rem 0.52rem' }}>{children}</div>
    </figure>
  );
}

function EsnFlowVisual() {
  return (
    <Figure
      title="ESN Update Flow"
      caption="Input and previous state are mixed by fixed dynamics; only readout is trained."
    >
      <svg viewBox="0 0 860 190" style={{ display: 'block', width: '100%', height: 'auto' }} role="img" aria-label="ESN update flow">
        <defs>
          <linearGradient id="esnNode" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1f3f72" />
            <stop offset="100%" stopColor="#10233d" />
          </linearGradient>
          <marker id="esnArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#86dbff" />
          </marker>
        </defs>

        <rect x="24" y="52" width="150" height="84" rx="12" fill="url(#esnNode)" stroke="#7ec6ff" strokeWidth="1.2" />
        <text x="99" y="84" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">x(t)</text>
        <text x="99" y="106" textAnchor="middle" fill="#95b0d2" fontSize="13">input</text>

        <rect x="244" y="52" width="168" height="84" rx="12" fill="url(#esnNode)" stroke="#7ec6ff" strokeWidth="1.2" />
        <text x="328" y="84" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">h(t-1)</text>
        <text x="328" y="106" textAnchor="middle" fill="#95b0d2" fontSize="13">memory</text>

        <rect x="482" y="40" width="176" height="108" rx="12" fill="#163054" stroke="#8de1ff" strokeWidth="1.3" />
        <text x="570" y="82" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">tanh(·)</text>
        <text x="570" y="106" textAnchor="middle" fill="#95b0d2" fontSize="13">fixed reservoir</text>

        <rect x="714" y="52" width="122" height="84" rx="12" fill="url(#esnNode)" stroke="#7ec6ff" strokeWidth="1.2" />
        <text x="775" y="84" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">h(t)</text>
        <text x="775" y="106" textAnchor="middle" fill="#95b0d2" fontSize="13">state</text>

        <line x1="174" y1="92" x2="244" y2="92" stroke="#86dbff" strokeWidth="2" markerEnd="url(#esnArrow)" />
        <line x1="412" y1="92" x2="482" y2="92" stroke="#86dbff" strokeWidth="2" markerEnd="url(#esnArrow)" />
        <line x1="658" y1="92" x2="714" y2="92" stroke="#86dbff" strokeWidth="2" markerEnd="url(#esnArrow)" />
      </svg>
    </Figure>
  );
}

function RadiusVisual() {
  return (
    <Figure
      title="Spectral Radius Regimes"
      caption="Small radius forgets quickly, near-one radius increases memory but can destabilize."
    >
      <svg viewBox="0 0 860 210" style={{ display: 'block', width: '100%', height: 'auto' }} role="img" aria-label="Spectral radius regimes">
        <line x1="60" y1="174" x2="810" y2="174" stroke="#6da0d8" strokeWidth="1.2" />
        <line x1="60" y1="24" x2="60" y2="174" stroke="#6da0d8" strokeWidth="1.2" />

        <path d="M70 124 C 220 132, 360 142, 510 152 C 640 160, 730 166, 800 170" fill="none" stroke="#6fd7ff" strokeWidth="3" />
        <path d="M70 110 C 220 96, 360 84, 510 68 C 640 54, 730 46, 800 38" fill="none" stroke="#ffd185" strokeWidth="3" />
        <path d="M70 96 C 220 66, 360 38, 510 24 C 630 14, 730 18, 800 40" fill="none" stroke="#ff8b9b" strokeWidth="3" />

        <text x="710" y="170" fill="#6fd7ff" fontSize="14" fontWeight="700">rho small</text>
        <text x="698" y="46" fill="#ffd185" fontSize="14" fontWeight="700">rho near 1</text>
        <text x="706" y="24" fill="#ff8b9b" fontSize="14" fontWeight="700">rho too large</text>
      </svg>
    </Figure>
  );
}

function ReadoutVisual() {
  return (
    <Figure
      title="State Matrix to Readout"
      caption="Collect states H, solve ridge regression once, deploy fast inference."
    >
      <svg viewBox="0 0 860 220" style={{ display: 'block', width: '100%', height: 'auto' }} role="img" aria-label="Ridge readout overview">
        <rect x="40" y="36" width="210" height="148" rx="10" fill="#122949" stroke="#7dc8ff" />
        <text x="145" y="72" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">State Matrix H</text>
        <text x="145" y="96" textAnchor="middle" fill="#95b0d2" fontSize="13">rows: time</text>
        <text x="145" y="114" textAnchor="middle" fill="#95b0d2" fontSize="13">cols: reservoir nodes</text>

        <rect x="330" y="60" width="196" height="100" rx="10" fill="#17345d" stroke="#89ddff" />
        <text x="428" y="96" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">Ridge Solve</text>
        <text x="428" y="120" textAnchor="middle" fill="#95b0d2" fontSize="13">W_out = YH^T(HH^T+lambda I)^(-1)</text>

        <rect x="620" y="60" width="190" height="100" rx="10" fill="#122949" stroke="#7dc8ff" />
        <text x="715" y="96" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">Prediction</text>
        <text x="715" y="120" textAnchor="middle" fill="#95b0d2" fontSize="13">y(t) = W_out h(t)</text>

        <line x1="250" y1="110" x2="330" y2="110" stroke="#83deff" strokeWidth="2" />
        <line x1="526" y1="110" x2="620" y2="110" stroke="#83deff" strokeWidth="2" />
      </svg>
    </Figure>
  );
}

function cardIndex(id: string): number {
  const parsed = parseInt(id.split('-')[1] ?? '0', 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function EchoStatePage() {
  const cardSets = {
    core: echoStateCards.filter((c) => cardIndex(c.id) <= 7),
    advanced: echoStateCards.filter((c) => cardIndex(c.id) >= 8),
  };

  return (
    <Essay
      title="How Echo State Networks Work"
      subtitle="A full guide to ESNs: intuitive start, then formal dynamics, diagnostics, and design decisions you can actually deploy."
    >
      <Section id="esn-introduction" title="Introduction">
        <p>
          Echo State Networks (ESNs) are the cleanest way to understand reservoir computing. You let a fixed recurrent
          system generate temporal features, then train only a linear readout. That keeps the learning pipeline simple
          while preserving useful memory.
        </p>
        <p>
          This essay starts with intuition, then moves into exact equations and engineering tradeoffs. By the end, you
          should be able to design and debug ESNs, not just describe them.
        </p>
        <p>
          The reading strategy is simple: understand the purpose of each equation before focusing on symbols. Every
          formula in this essay has an immediate operational interpretation for tuning or diagnostics.
        </p>
      </Section>

      <Section id="esn-architecture" title="ESN Architecture">
        <p>
          The ESN update combines three ingredients: input drive, recurrent memory, and a nonlinearity. With leak rate
          <MathBlock math="\alpha" />, the common update is:
        </p>
        <MathBlock
          display
          math="\mathbf{h}(t) = (1-\alpha)\mathbf{h}(t-1) + \alpha\tanh\!\left(\mathbf{W}_{\text{in}}\mathbf{x}(t) + \mathbf{W}_{\text{res}}\mathbf{h}(t-1) + \mathbf{b}\right)"
        />
        <p>
          Only the readout is trained:
        </p>
        <MathBlock display math="\mathbf{y}(t) = \mathbf{W}_{\text{out}}[\mathbf{h}(t);\mathbf{x}(t);1]" />
        <p>
          This separation between fixed dynamics and trainable output is what makes ESNs fast to retrain and practical
          for iterative experimentation.
        </p>
        <EsnFlowVisual />
      </Section>

      <Section id="echo-state-property" title="Echo State Property">
        <p>
          The echo state property (ESP) means the reservoir eventually forgets initial conditions and depends only on
          input history. Formally, for the same input sequence and two initial states, trajectories converge:
        </p>
        <MathBlock display math="\|\mathbf{h}_1(t)-\mathbf{h}_2(t)\| \to 0 \quad (t\to\infty)" />
        <p>
          Without ESP, readout training is unreliable because the same input could map to different internal states.
        </p>
        <p>
          In practical terms, ESP is what allows you to treat reservoir state as a stable feature extractor rather than
          a chaotic latent process.
        </p>
      </Section>

      <Section id="spectral-radius" title="Spectral Radius">
        <p>
          Spectral radius <MathBlock math="\rho(\mathbf{W}_{\text{res}})" /> is the main memory-stability knob. As
          a practical guideline, values near 1 increase memory, while very small values forget quickly.
        </p>
        <MathBlock
          display
          math="\mathbf{W}_{\text{res}} \leftarrow \frac{\rho_{\text{target}}}{\rho(\mathbf{W}_{\text{raw}})}\,\mathbf{W}_{\text{raw}}"
        />
        <p>
          This rescaling step is often the first thing you should verify when an ESN performs erratically across random
          seeds.
        </p>
        <RadiusVisual />
      </Section>

      <Section id="memory-vs-nonlinearity" title="Memory vs Nonlinearity">
        <p>
          Reservoirs cannot maximize everything at once. Settings that preserve long memory often reduce nonlinear
          mixing, while highly nonlinear regimes can erase past information faster.
        </p>
        <p>
          In practice, tune for task structure: forecasting with long horizons prefers stronger memory, while complex
          nonlinear classification may prefer richer transformation.
        </p>
      </Section>
      <ReviewCardSet cards={cardSets.core} />

      <Section id="reservoir-design" title="Reservoir Design">
        <p>
          Four knobs dominate ESN behavior: reservoir size <MathBlock math="N" />, sparsity, spectral radius, and
          input scaling. A fifth knob, leak rate <MathBlock math="\alpha" />, controls timescale.
        </p>
        <ul>
          <li>Increase <MathBlock math="N" /> for richer features, but require more data.</li>
          <li>Use sparse <MathBlock math="\mathbf{W}_{\text{res}}" /> for efficiency and diverse subdynamics.</li>
          <li>Tune input scaling to avoid both underdriving and saturation.</li>
          <li>Tune <MathBlock math="\alpha" /> to match task timescales.</li>
        </ul>
        <p>
          A good tuning order is: set spectral radius and leak for temporal behavior first, then adjust input scaling
          and regularization.
        </p>
      </Section>

      <Section id="training-readout" title="Training the Readout">
        <p>
          After washout, collect state matrix <MathBlock math="\mathbf{H}" /> and targets <MathBlock math="\mathbf{Y}" />.
          Then solve ridge regression:
        </p>
        <MathBlock
          display
          math="\mathbf{W}_{\text{out}} = \mathbf{Y}\mathbf{H}^{\top}(\mathbf{H}\mathbf{H}^{\top}+\beta\mathbf{I})^{-1}"
        />
        <p>
          This is convex and fast. Most ESN instability comes from dynamics choices, not from the readout solver.
        </p>
        <p>
          If validation remains unstable, inspect state quality before changing the regression routine. Better states
          usually beat more complicated solvers.
        </p>
        <ReadoutVisual />
      </Section>

      <Section id="diagnostics-and-metrics" title="Diagnostics and Metrics">
        <p>
          Inspect state norms, singular values of <MathBlock math="\mathbf{H}" />, and validation error across seeds.
          Strong seed sensitivity often signals an operating point too close to instability.
        </p>
        <p>
          Evaluate one-step and rollout metrics separately. One-step can look good while free-run prediction drifts.
        </p>
      </Section>

      <Section id="esn-applications" title="Applications">
        <p>
          ESNs are effective for medium-memory temporal tasks: forecasting, signal denoising, anomaly detection, and
          low-latency control preprocessing. Their main practical strength is fast retraining.
        </p>
        <p>
          This makes them useful when data distribution shifts quickly and you need frequent model updates with low
          operational overhead.
        </p>
      </Section>

      <Section id="esn-limitations" title="Limitations">
        <p>
          A fixed reservoir cannot adapt all internal representations to a task. For deeply hierarchical sequence
          structure, trained deep recurrent/attention models can outperform ESNs.
        </p>
        <p>
          Also, poor reservoir settings can make performance appear random across seeds. Reproducible tuning protocols
          are mandatory.
        </p>
      </Section>

      <Section id="esn-to-qrc-bridge" title="Bridge to QRC">
        <p>
          QRC keeps the ESN philosophy: fixed dynamics plus trained readout. The difference is that the dynamics come
          from quantum evolution and measured observables rather than classical recurrent activations.
        </p>
        <p>
          If you can reason about ESP, memory/nonlinearity tradeoff, and readout conditioning in ESNs, you already have
          the conceptual toolkit needed for QRC design.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.advanced} />
    </Essay>
  );
}
