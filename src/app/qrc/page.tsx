import Link from 'next/link';
import { Essay, Section } from '@/components/Essay';
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

function VisualHint({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.visualHint}>
      <span className={styles.visualHintLabel}>What to look at</span>
      <p>{children}</p>
    </div>
  );
}

function IntuitionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.intuitionBlock}>
      <span className={styles.intuitionLabel}>Read this as</span>
      <strong>{title}</strong>
      <div className={styles.intuitionBody}>{children}</div>
    </div>
  );
}

interface ScriptStep {
  label: string;
  title: string;
  body: React.ReactNode;
}

function ScriptStepBlock({ title, steps }: { title: string; steps: ScriptStep[] }) {
  return (
    <div className={styles.scriptBlock}>
      <div className={styles.scriptHeader}>
        <span>Step by step</span>
        <strong>{title}</strong>
      </div>
      <div className={styles.scriptSteps}>
        {steps.map((step) => (
          <div className={styles.scriptStep} key={step.label}>
            <span className={styles.scriptStepNumber}>{step.label}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckpointBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.checkpointBlock}>
      <span className={styles.checkpointLabel}>Pause and check</span>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

function PlainWordsBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.plainWordsBlock}>
      <span>In plain words</span>
      <p>{children}</p>
    </div>
  );
}

function SectionRecap({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.sectionRecap}>
      <span className={styles.sectionRecapLabel}>What we now know</span>
      <p>{children}</p>
    </div>
  );
}

interface ExamplePanelProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  note?: string;
}

function ExamplePanel({ eyebrow, title, children, note }: ExamplePanelProps) {
  return (
    <div className={styles.examplePanel}>
      <div className={styles.exampleHeader}>
        <span className={styles.exampleEyebrow}>{eyebrow}</span>
        <strong>{title}</strong>
      </div>
      {children}
      {note ? <p className={styles.exampleNote}>{note}</p> : null}
    </div>
  );
}

interface ExampleStepProps {
  label: string;
  title: string;
  children: React.ReactNode;
}

function ExampleStep({ label, title, children }: ExampleStepProps) {
  return (
    <div className={styles.exampleStep}>
      <span className={styles.exampleBadge}>{label}</span>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}

function NonQuantumFeatureExample() {
  return (
    <ExamplePanel
      eyebrow="Before quantum"
      title="A feature is just a useful description of the data"
      note="Quantum features follow the same logic. The difference is only how the new descriptions are produced."
    >
      <div className={styles.exampleGrid}>
        <ExampleStep label="raw" title="Raw object">
          A sound clip is a long list of pressure values over time. That raw list is hard to classify directly.
        </ExampleStep>
        <ExampleStep label="feature" title="Useful descriptions">
          We compute features such as average loudness, dominant frequency, and how quickly the sound changes.
        </ExampleStep>
        <ExampleStep label="readout" title="Simple decision">
          A simple model can now combine those few descriptions to decide whether the sound is calm or sharp.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function WorkedReadoutExample() {
  return (
    <ExamplePanel
      eyebrow="Worked readout"
      title="A linear readout is just a weighted sum of the measured features"
      note="In real training, the data chooses the weights. Here the numbers only make the mechanics visible."
    >
      <div className={styles.calculationBox}>
        <MathBlock display math="\mathbf{z}=[0.31,-0.44,0.72],\quad \mathbf{w}=[0.8,-0.2,0.5],\quad b=-0.1" />
        <div className={styles.calculationRows}>
          <span>First feature contribution</span>
          <MathBlock math="0.8\cdot 0.31=0.248" />
          <span>Second feature contribution</span>
          <MathBlock math="-0.2\cdot(-0.44)=0.088" />
          <span>Third feature contribution</span>
          <MathBlock math="0.5\cdot 0.72=0.36" />
          <span>Bias and final score</span>
          <MathBlock math="\hat{y}=0.248+0.088+0.36-0.1\approx 0.60" />
        </div>
      </div>
    </ExamplePanel>
  );
}

function QelmSinglePointStory() {
  return (
    <ExamplePanel
      eyebrow="Single data point story"
      title="Follow one example all the way through QELM"
      note="Nothing in this story depends on the previous data point. That is the static QELM assumption."
    >
      <div className={`${styles.exampleGrid} ${styles.exampleGridFour}`}>
        <ExampleStep label="1" title="A pattern arrives">
          The raw input is <MathBlock math="\mathbf{x}=[0.2,0.8]" />.
        </ExampleStep>
        <ExampleStep label="2" title="The quantum map acts">
          The fixed quantum recipe transforms the input into a state <MathBlock math="\rho(\mathbf{x})" />.
        </ExampleStep>
        <ExampleStep label="3" title="Measurements become features">
          We estimate <MathBlock math="\mathbf{z}=[0.31,-0.44,0.72]" />.
        </ExampleStep>
        <ExampleStep label="4" title="The readout scores it">
          The trained readout returns a score, for example <MathBlock math="\hat{y}\approx0.60" />.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function FeatureToyExample() {
  return (
    <ExamplePanel
      eyebrow="Toy feature map"
      title="One tiny input becomes coordinates for a simple readout"
      note="The numbers are illustrative. The structure is the important part: the feature map creates coordinates, then the trained readout combines them."
    >
      <div className={styles.exampleGrid}>
        <ExampleStep label="1" title="Start with two values">
          <MathBlock math="\mathbf{x}=[0.2,0.8]" /> could mean two simple descriptors of a signal.
        </ExampleStep>
        <ExampleStep label="2" title="Transform once">
          A fixed map turns that input into measured features, for example{' '}
          <MathBlock math="\mathbf{z}(\mathbf{x})=[0.31,-0.44,0.72]" />.
        </ExampleStep>
        <ExampleStep label="3" title="Train only the readout">
          The readout computes <MathBlock math="\hat{y}=\mathbf{w}^{\top}\mathbf{z}+b" /> and learns the
          weights <MathBlock math="\mathbf{w}" /> from examples.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function MentalModelBlock() {
  return (
    <ExamplePanel
      eyebrow="Common beginner trap"
      title="Wrong mental model versus right mental model"
    >
      <div className={`${styles.exampleGrid} ${styles.exampleGridTwo}`}>
        <ExampleStep label="wrong" title="The quantum system is the whole learner">
          This makes the topic feel mysterious and too large. It suggests the quantum device must directly know
          the task.
        </ExampleStep>
        <ExampleStep label="right" title="The quantum system makes features">
          The quantum part creates useful measured coordinates. The classical readout learns the task-specific
          combination.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function QelmSlowSteps() {
  return (
    <ExamplePanel
      eyebrow="QELM in four slow steps"
      title="The quantum part is a fixed feature factory"
    >
      <div className={`${styles.exampleGrid} ${styles.exampleGridFour}`}>
        <ExampleStep label="1" title="Encode">
          Put the input values into controllable parameters, such as rotation angles or drive amplitudes.
        </ExampleStep>
        <ExampleStep label="2" title="Transform">
          Let the fixed quantum circuit or fixed physical dynamics mix the encoded information.
        </ExampleStep>
        <ExampleStep label="3" title="Measure">
          Read out selected observables and turn those measurement averages into a feature vector.
        </ExampleStep>
        <ExampleStep label="4" title="Fit">
          Train only a classical linear readout on top of those features.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function QrcThreeStepStory() {
  return (
    <ExamplePanel
      eyebrow="Three time steps"
      title="How the previous state becomes useful memory"
      note="This is the key beginner intuition: QRC does not only see the latest value; it sees the latest value through a state shaped by recent values."
    >
      <div className={styles.timelineGrid}>
        <div className={styles.timelineStep}>
          <span>t-2</span>
          <strong>Inject 0.2</strong>
          <p>The reservoir state starts forming a trace of the signal.</p>
        </div>
        <div className={styles.timelineStep}>
          <span>t-1</span>
          <strong>Inject 0.5</strong>
          <p>The state changes again. It now reflects that the signal rose.</p>
        </div>
        <div className={styles.timelineStep}>
          <span>t</span>
          <strong>Inject 0.4</strong>
          <p>The state reflects the current value plus the recent rise-and-drop context.</p>
        </div>
        <div className={styles.timelineStep}>
          <span>t+1</span>
          <strong>Predict next</strong>
          <p>The readout uses measured features from that state to estimate what comes next.</p>
        </div>
      </div>
    </ExamplePanel>
  );
}

function QelmToyExample() {
  return (
    <ExamplePanel
      eyebrow="One-shot QELM example"
      title="The quantum system does not remember the previous data point"
      note="After this input is processed, the next input starts from the same fixed recipe. That is why QELM is static."
    >
      <div className={styles.exampleGrid}>
        <ExampleStep label="A" title="Input">
          A small pattern is encoded as <MathBlock math="\mathbf{x}" />.
        </ExampleStep>
        <ExampleStep label="B" title="Fixed quantum pass">
          The same circuit or quantum dynamics are used for every training example.
        </ExampleStep>
        <ExampleStep label="C" title="Class score">
          Measurements give <MathBlock math="\mathbf{z}(\mathbf{x})" />; a linear readout turns them into a
          score such as <MathBlock math="\hat{y}=0.56" />.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function MeasurementAverageExample() {
  return (
    <ExamplePanel
      eyebrow="Measurement average"
      title="A feature can be an average over repeated measurements"
      note="This is why the page writes features as expectation values. They summarize repeated measurement statistics, not a single magical readout."
    >
      <div className={styles.exampleGrid}>
        <ExampleStep label="O1" title="Measure an observable">
          Suppose one observable returns <MathBlock math="+1" /> in 68 shots and <MathBlock math="-1" /> in 32
          shots.
        </ExampleStep>
        <ExampleStep label="avg" title="Convert shots into a number">
          The estimated feature is <MathBlock math="(68-32)/100=0.36" />.
        </ExampleStep>
        <ExampleStep label="z" title="Repeat for several observables">
          Doing this for <MathBlock math="O_1,O_2,O_3" /> gives a vector such as{' '}
          <MathBlock math="\mathbf{z}=[0.36,-0.12,0.61]" />.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function LinearToyExample() {
  return (
    <ExamplePanel
      eyebrow="Geometry example"
      title="The feature map changes the coordinate system, not the labels"
    >
      <div className={`${styles.exampleGrid} ${styles.exampleGridTwo}`}>
        <ExampleStep label="Raw" title="Before the map">
          Imagine two signal types curled around each other. A straight line cuts through both groups, so a
          linear model is confused.
        </ExampleStep>
        <ExampleStep label="Mapped" title="After the map">
          The quantum features spread the same examples into new coordinates. Now one simple line can separate
          most red points from most green points.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function ResetReuseExample() {
  return (
    <ExamplePanel
      eyebrow="Reset versus reuse"
      title="The whole difference starts with what happens between inputs"
    >
      <div className={`${styles.exampleGrid} ${styles.exampleGridTwo}`}>
        <ExampleStep label="QELM" title="Reset or start fresh">
          Process <MathBlock math="\mathbf{x}_1" />, measure <MathBlock math="\mathbf{z}(\mathbf{x}_1)" />,
          then process <MathBlock math="\mathbf{x}_2" /> independently. The second feature vector does not
          know what the first input was.
        </ExampleStep>
        <ExampleStep label="QRC" title="Reuse the state">
          Process <MathBlock math="u_1" />, keep the resulting state, then inject <MathBlock math="u_2" /> into
          that state. The second feature vector can now contain traces of both inputs.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function TimeSeriesToyExample() {
  return (
    <ExamplePanel
      eyebrow="Toy time series"
      title="A reused state turns isolated values into a short memory"
      note="The reservoir does not need to store the whole past exactly. It only needs a useful fading trace for the prediction task."
    >
      <div className={styles.sequenceStrip} aria-label="Toy sequence 0.2, 0.5, 0.4, predict next value">
        <span>u(t-2)=0.2</span>
        <span>u(t-1)=0.5</span>
        <span>u(t)=0.4</span>
        <span className={styles.sequencePrediction}>predict u(t+1)</span>
      </div>
      <div className={styles.exampleGrid}>
        <ExampleStep label="1" title="Update">
          The new value <MathBlock math="u_t=0.4" /> updates the old reservoir state{' '}
          <MathBlock math="\rho_{t-1}" />.
        </ExampleStep>
        <ExampleStep label="2" title="Measure">
          The measured vector <MathBlock math="\mathbf{z}_t" /> now reflects the current input and traces of
          earlier inputs.
        </ExampleStep>
        <ExampleStep label="3" title="Predict">
          The readout uses <MathBlock math="\hat{u}_{t+1}=\mathbf{w}^{\top}\mathbf{z}_t+b" /> to estimate the
          next value.
        </ExampleStep>
      </div>
    </ExamplePanel>
  );
}

function QelmPipelineVisual() {
  return (
    <FigureFrame
      title="Static Quantum Feature Map"
      caption="QELM uses a fixed quantum system once per input. Only the final linear readout is trained."
    >
      <svg viewBox="0 0 900 230" className={styles.figureSvg} role="img" aria-label="Static QELM pipeline from input to fixed quantum feature map to measurement features to linear readout">
        <defs>
          <linearGradient id="qelmNode" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#edf6fd" />
          </linearGradient>
          <linearGradient id="qelmQuantum" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#faf5ea" />
            <stop offset="100%" stopColor="#e9f2ef" />
          </linearGradient>
          <marker id="qelmArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill="#255f93" />
          </marker>
        </defs>

        <rect x="34" y="72" width="130" height="86" rx="12" fill="url(#qelmNode)" stroke="#8ca8bd" />
        <text x="99" y="100" textAnchor="middle" className={styles.svgLabel}>Input</text>
        <text x="99" y="124" textAnchor="middle" className={styles.svgSub}>x</text>
        <text x="99" y="146" textAnchor="middle" className={styles.svgTiny}>[0.2, 0.8]</text>

        <rect x="230" y="48" width="230" height="134" rx="16" fill="url(#qelmQuantum)" stroke="#7d8f84" strokeWidth="1.4" />
        <text x="345" y="84" textAnchor="middle" className={styles.svgLabel}>Fixed quantum map</text>
        <text x="345" y="110" textAnchor="middle" className={styles.svgSub}>encode x, evolve once</text>
        <circle cx="288" cy="140" r="9" fill="#9db9d4" />
        <circle cx="330" cy="130" r="9" fill="#cdb98d" />
        <circle cx="374" cy="146" r="9" fill="#a6bbae" />
        <circle cx="414" cy="126" r="9" fill="#9db9d4" />
        <line x1="288" y1="140" x2="330" y2="130" stroke="#8e9d91" />
        <line x1="330" y1="130" x2="374" y2="146" stroke="#8e9d91" />
        <line x1="374" y1="146" x2="414" y2="126" stroke="#8e9d91" />

        <rect x="530" y="62" width="160" height="106" rx="14" fill="url(#qelmNode)" stroke="#8ca8bd" />
        <text x="610" y="94" textAnchor="middle" className={styles.svgLabel}>Measurements</text>
        <text x="610" y="119" textAnchor="middle" className={styles.svgSub}>z(x)</text>
        <text x="610" y="140" textAnchor="middle" className={styles.svgTiny}>[.31, -.44, .72]</text>

        <rect x="760" y="72" width="112" height="86" rx="12" fill="#f8f1e6" stroke="#9c8a6a" />
        <text x="816" y="100" textAnchor="middle" className={styles.svgLabel}>Readout</text>
        <text x="816" y="124" textAnchor="middle" className={styles.svgSub}>y</text>
        <text x="816" y="146" textAnchor="middle" className={styles.svgTiny}>score .56</text>

        <line x1="164" y1="115" x2="230" y2="115" stroke="#255f93" strokeWidth="2.3" markerEnd="url(#qelmArrow)" />
        <line x1="460" y1="115" x2="530" y2="115" stroke="#255f93" strokeWidth="2.3" markerEnd="url(#qelmArrow)" />
        <line x1="690" y1="115" x2="760" y2="115" stroke="#255f93" strokeWidth="2.3" markerEnd="url(#qelmArrow)" />
      </svg>
    </FigureFrame>
  );
}

function LinearSeparationVisual() {
  return (
    <FigureFrame
      title="Why Transform Features?"
      caption="The readout is simple. The transformation makes the data easier for that simple readout."
    >
      <svg viewBox="0 0 900 310" className={styles.figureSvg} role="img" aria-label="Raw data not linearly separable becomes separable after feature transformation">
        <defs>
          <marker id="separationArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill="#255f93" />
          </marker>
        </defs>

        <rect x="40" y="38" width="300" height="230" rx="16" fill="rgba(255,255,255,0.72)" stroke="#d6e3ee" />
        <text x="190" y="68" textAnchor="middle" className={styles.svgLabel}>Raw input space</text>
        <text x="190" y="92" textAnchor="middle" className={styles.svgSub}>hard for one straight line</text>
        <line x1="74" y1="228" x2="312" y2="228" stroke="#9babb7" />
        <line x1="74" y1="228" x2="74" y2="104" stroke="#9babb7" />
        <circle cx="130" cy="162" r="9" fill="#c46459" />
        <circle cx="166" cy="136" r="9" fill="#c46459" />
        <circle cx="204" cy="169" r="9" fill="#c46459" />
        <circle cx="162" cy="202" r="9" fill="#c46459" />
        <text x="120" y="126" textAnchor="middle" className={styles.svgTiny}>red class</text>
        <circle cx="250" cy="129" r="9" fill="#47716a" />
        <circle cx="274" cy="170" r="9" fill="#47716a" />
        <circle cx="226" cy="214" r="9" fill="#47716a" />
        <circle cx="112" cy="210" r="9" fill="#47716a" />
        <text x="262" y="112" textAnchor="middle" className={styles.svgTiny}>green class</text>
        <path d="M92 122 C 158 236, 236 104, 302 220" fill="none" stroke="#748496" strokeDasharray="6 5" strokeWidth="2" />

        <line x1="365" y1="153" x2="520" y2="153" stroke="#255f93" strokeWidth="2.5" markerEnd="url(#separationArrow)" />
        <text x="442" y="134" textAnchor="middle" className={styles.svgSub}>fixed quantum map</text>

        <rect x="560" y="38" width="300" height="230" rx="16" fill="rgba(255,255,255,0.72)" stroke="#d6e3ee" />
        <text x="710" y="68" textAnchor="middle" className={styles.svgLabel}>Feature space</text>
        <text x="710" y="92" textAnchor="middle" className={styles.svgSub}>one linear boundary is enough</text>
        <line x1="594" y1="228" x2="832" y2="228" stroke="#9babb7" />
        <line x1="594" y1="228" x2="594" y2="104" stroke="#9babb7" />
        <line x1="708" y1="105" x2="708" y2="232" stroke="#255f93" strokeWidth="3" />
        <text x="720" y="118" className={styles.svgTiny}>linear boundary</text>
        <circle cx="636" cy="134" r="9" fill="#c46459" />
        <circle cx="652" cy="178" r="9" fill="#c46459" />
        <circle cx="675" cy="212" r="9" fill="#c46459" />
        <circle cx="650" cy="220" r="9" fill="#c46459" />
        <circle cx="760" cy="128" r="9" fill="#47716a" />
        <circle cx="790" cy="166" r="9" fill="#47716a" />
        <circle cx="738" cy="204" r="9" fill="#47716a" />
        <circle cx="812" cy="216" r="9" fill="#47716a" />
      </svg>
    </FigureFrame>
  );
}

function StaticToTemporalVisual() {
  return (
    <FigureFrame
      title="The Missing Ingredient: Time"
      caption="QELM is one-shot. QRC reuses a state, so the current feature vector can carry recent history."
    >
      <svg viewBox="0 0 900 300" className={styles.figureSvg} role="img" aria-label="Comparison between static QELM one-shot mapping and QRC recurrent state update">
        <defs>
          <marker id="bridgeArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill="#255f93" />
          </marker>
        </defs>

        <text x="225" y="44" textAnchor="middle" className={styles.svgLabel}>QELM: static</text>
        <rect x="46" y="78" width="110" height="66" rx="12" fill="#ffffff" stroke="#8ca8bd" />
        <text x="101" y="116" textAnchor="middle" className={styles.svgLabel}>x</text>
        <rect x="222" y="62" width="170" height="98" rx="14" fill="#f4efe3" stroke="#7d8f84" />
        <text x="307" y="102" textAnchor="middle" className={styles.svgLabel}>fixed map</text>
        <text x="307" y="126" textAnchor="middle" className={styles.svgSub}>used once</text>
        <rect x="462" y="78" width="118" height="66" rx="12" fill="#ffffff" stroke="#8ca8bd" />
        <text x="521" y="116" textAnchor="middle" className={styles.svgLabel}>z(x)</text>
        <line x1="156" y1="111" x2="222" y2="111" stroke="#255f93" strokeWidth="2.2" markerEnd="url(#bridgeArrow)" />
        <line x1="392" y1="111" x2="462" y2="111" stroke="#255f93" strokeWidth="2.2" markerEnd="url(#bridgeArrow)" />

        <text x="225" y="202" textAnchor="middle" className={styles.svgLabel}>QRC: temporal</text>
        <rect x="46" y="232" width="110" height="44" rx="10" fill="#ffffff" stroke="#8ca8bd" />
        <text x="101" y="260" textAnchor="middle" className={styles.svgLabel}>u(t)</text>
        <rect x="222" y="216" width="170" height="74" rx="14" fill="#f4efe3" stroke="#7d8f84" />
        <text x="307" y="248" textAnchor="middle" className={styles.svgLabel}>quantum state</text>
        <text x="307" y="270" textAnchor="middle" className={styles.svgSub}>rho(t)</text>
        <rect x="462" y="232" width="118" height="44" rx="10" fill="#ffffff" stroke="#8ca8bd" />
        <text x="521" y="260" textAnchor="middle" className={styles.svgLabel}>z(t)</text>
        <path d="M306 216 C 356 178, 434 182, 428 238" fill="none" stroke="#47716a" strokeWidth="2.4" markerEnd="url(#bridgeArrow)" />
        <text x="394" y="194" textAnchor="middle" className={styles.svgSub}>memory</text>
        <line x1="156" y1="254" x2="222" y2="254" stroke="#255f93" strokeWidth="2.2" markerEnd="url(#bridgeArrow)" />
        <line x1="392" y1="254" x2="462" y2="254" stroke="#255f93" strokeWidth="2.2" markerEnd="url(#bridgeArrow)" />

        <rect x="642" y="78" width="210" height="198" rx="16" fill="rgba(240,247,254,0.84)" stroke="#d6e3ee" />
        <text x="747" y="118" textAnchor="middle" className={styles.svgLabel}>Same training idea</text>
        <text x="747" y="150" textAnchor="middle" className={styles.svgSub}>measure features</text>
        <text x="747" y="178" textAnchor="middle" className={styles.svgSub}>train linear readout</text>
        <text x="747" y="206" textAnchor="middle" className={styles.svgSub}>keep quantum part fixed</text>
        <text x="747" y="234" textAnchor="middle" className={styles.svgSub}>add memory for QRC</text>
      </svg>
    </FigureFrame>
  );
}

function TimePredictionVisual() {
  return (
    <FigureFrame
      title="A Simple Prediction Loop"
      caption="For time-series prediction, the reservoir state is updated at every step and the readout predicts the next value."
    >
      <svg viewBox="0 0 920 250" className={styles.figureSvg} role="img" aria-label="QRC time prediction workflow">
        <defs>
          <marker id="timeArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill="#255f93" />
          </marker>
        </defs>

        <text x="356" y="28" textAnchor="end" className={styles.svgTiny}>toy sequence</text>
        <polyline points="380,34 430,18 480,27 530,16" fill="none" stroke="#255f93" strokeWidth="2.4" />
        <circle cx="380" cy="34" r="4.5" fill="#9db9d4" />
        <circle cx="430" cy="18" r="4.5" fill="#9db9d4" />
        <circle cx="480" cy="27" r="4.5" fill="#9db9d4" />
        <circle cx="530" cy="16" r="4.5" fill="#cdb98d" />
        <text x="458" y="48" textAnchor="middle" className={styles.svgTiny}>0.2 -&gt; 0.5 -&gt; 0.4 -&gt; ?</text>

        <rect x="34" y="84" width="112" height="70" rx="12" fill="#ffffff" stroke="#8ca8bd" />
        <text x="90" y="113" textAnchor="middle" className={styles.svgLabel}>input</text>
        <text x="90" y="136" textAnchor="middle" className={styles.svgSub}>u(t)</text>

        <rect x="214" y="58" width="164" height="122" rx="16" fill="#f4efe3" stroke="#7d8f84" />
        <text x="296" y="92" textAnchor="middle" className={styles.svgLabel}>previous state</text>
        <text x="296" y="118" textAnchor="middle" className={styles.svgSub}>rho(t-1)</text>
        <text x="296" y="146" textAnchor="middle" className={styles.svgSub}>recent history</text>

        <rect x="446" y="58" width="172" height="122" rx="16" fill="#eef7f0" stroke="#7d8f84" />
        <text x="532" y="92" textAnchor="middle" className={styles.svgLabel}>quantum update</text>
        <text x="532" y="118" textAnchor="middle" className={styles.svgSub}>rho(t)=F(...)</text>
        <text x="532" y="146" textAnchor="middle" className={styles.svgSub}>fixed dynamics</text>

        <rect x="686" y="72" width="112" height="94" rx="12" fill="#ffffff" stroke="#8ca8bd" />
        <text x="742" y="106" textAnchor="middle" className={styles.svgLabel}>features</text>
        <text x="742" y="132" textAnchor="middle" className={styles.svgSub}>z(t)</text>

        <rect x="850" y="84" width="48" height="70" rx="12" fill="#f8f1e6" stroke="#9c8a6a" />
        <text x="874" y="113" textAnchor="middle" className={styles.svgLabel}>y</text>
        <text x="874" y="136" textAnchor="middle" className={styles.svgSub}>t+1</text>

        <line x1="146" y1="119" x2="214" y2="119" stroke="#255f93" strokeWidth="2.2" markerEnd="url(#timeArrow)" />
        <line x1="378" y1="119" x2="446" y2="119" stroke="#255f93" strokeWidth="2.2" markerEnd="url(#timeArrow)" />
        <line x1="618" y1="119" x2="686" y2="119" stroke="#255f93" strokeWidth="2.2" markerEnd="url(#timeArrow)" />
        <line x1="798" y1="119" x2="850" y2="119" stroke="#255f93" strokeWidth="2.2" markerEnd="url(#timeArrow)" />

        <path d="M532 180 C 572 220, 350 220, 314 180" fill="none" stroke="#47716a" strokeWidth="2.4" markerEnd="url(#timeArrow)" />
        <text x="426" y="224" textAnchor="middle" className={styles.svgSub}>state is reused at the next time step</text>
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
    qelm: qrcCards.filter((card) => cardIndex(card.id) <= 7),
    qrc: qrcCards.filter((card) => cardIndex(card.id) >= 8 && cardIndex(card.id) <= 14),
    comparison: qrcCards.filter((card) => cardIndex(card.id) >= 15),
  };

  return (
    <Essay
      title="What is Quantum Reservoir Computing"
      subtitle="A gentle path from static quantum feature maps to temporal quantum reservoirs."
      slug="/qrc"
    >
      <Section id="introduction" title="Introduction">
        <p>
          The easiest way to understand quantum reservoir computing is to begin with a simpler idea:
          use a quantum system as a feature maker.
        </p>
        <ScriptStepBlock
          title="The whole page in four moves"
          steps={[
            {
              label: '1',
              title: 'Start with ordinary features',
              body: 'A feature is a useful description of data, such as a frequency, an average, or a measured coordinate.',
            },
            {
              label: '2',
              title: 'Make those features quantum',
              body: 'A fixed quantum system transforms the input and measurements become the new feature vector.',
            },
            {
              label: '3',
              title: 'Train only the readout',
              body: 'The classical readout learns how to combine the measured features for the task.',
            },
            {
              label: '4',
              title: 'Add time only at the end',
              body: 'QRC is the same idea, but the quantum state is reused so features can contain recent history.',
            },
          ]}
        />
        <p>
          Think of the quantum system like a strange optical prism. A prism does not decide what the object is.
          It changes how light is spread out, so details that were hidden can become easier to inspect. In the
          same spirit, a quantum feature map does not need to be the final decision maker. It can reshape the
          input into measurement numbers that a simple classical model can use.
        </p>
        <p>
          In this view, the quantum part is not the whole model. It is a fixed transformation. Data goes in,
          the quantum system produces measurement features, and a small classical readout learns how to use
          those features.
        </p>
        <IntuitionBlock title="Separate the model into two jobs">
          <p>
            The quantum system creates coordinates. The readout learns what those coordinates mean for the task.
            This separation is the main reason the idea is approachable: we do not have to train every internal
            quantum interaction to understand the basic workflow.
          </p>
        </IntuitionBlock>
        <p>
          This page builds the idea slowly. We first look at Quantum Extreme Learning Machines, where each
          input is transformed once. Then we add time and memory, which turns the same readout principle into
          quantum reservoir computing.
        </p>
        <p>
          The path is deliberately staged. If the data points are independent, the static QELM picture is the
          cleanest starting point. If the data arrives as a sequence, the QRC picture adds one missing ingredient:
          the quantum state is reused, so the current feature vector can carry a trace of what came before.
        </p>

        <div className={styles.primerNote}>
          New to quantum mechanics? The{' '}
          <Link href="/quantum-primer">Quantum Mechanics Basics</Link> primer covers states, gates, measurement,
          and open-system dynamics. You do not need all details for this page, but the primer explains the symbols.
        </div>

        <div className={styles.quickMap}>
          <div className={styles.quickMapTitle}>Learning path</div>
          <div className={styles.quickMapFlow}>
            <span className={styles.quickStep}>Feature maps</span>
            <span className={styles.quickArrow}>-&gt;</span>
            <span className={styles.quickStep}>QELM</span>
            <span className={styles.quickArrow}>-&gt;</span>
            <span className={styles.quickStep}>Linear readout</span>
            <span className={styles.quickArrow}>-&gt;</span>
            <span className={styles.quickStep}>Time and memory</span>
            <span className={styles.quickArrow}>-&gt;</span>
            <span className={styles.quickStep}>QRC</span>
          </div>
          <p className={styles.quickMapNote}>
            Keep one sentence in mind: QELM is a static quantum feature transformation, while QRC is a
            quantum feature transformation that also carries temporal state.
          </p>
        </div>
        <CheckpointBlock title="If this is your first contact with the topic">
          <p>
            Do not try to understand QRC first. First understand the static pipeline:
            input, fixed transformation, measured features, trained readout. QRC only adds state reuse over time.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          We have separated the big idea into two parts: a fixed feature maker and a trained readout. Next we
          slow down and define what a feature map is before making it quantum.
        </SectionRecap>
      </Section>

      <Section id="why-feature-maps" title="Why Feature Maps?">
        <p>
          Many learning problems become easier after we change how the data is represented. The original input
          may be hard to separate with a line, but a transformed version can expose useful structure.
        </p>
        <p>
          This is not a quantum-specific trick. It is a general learning idea. A raw image is often transformed
          into edges and textures. A sentence is transformed into embeddings. A sound wave may be transformed
          into frequency features. The point is always the same: choose coordinates where the useful pattern is
          easier to express.
        </p>
        <NonQuantumFeatureExample />
        <p>
          A feature map is just a transformation:
        </p>
        <MathBlock display math="\mathbf{x} \longmapsto \mathbf{z}(\mathbf{x})" />
        <PlainWordsBlock>
          Take the original description <MathBlock math="\mathbf{x}" /> and rewrite it as a new description{' '}
          <MathBlock math="\mathbf{z}(\mathbf{x})" />. Nothing has been classified yet. We have only changed
          how the data is represented.
        </PlainWordsBlock>
        <p>
          The vector <MathBlock math="\mathbf{x}" /> is the original input. The vector{' '}
          <MathBlock math="\mathbf{z}(\mathbf{x})" /> is the new representation. After that transformation,
          we often use a very simple readout:
        </p>
        <MathBlock display math="y = \mathbf{w}^{\top}\mathbf{z}(\mathbf{x}) + b" />
        <PlainWordsBlock>
          Multiply each feature by a learned weight, add the results, then add a bias. The readout is simple;
          the feature map is what made the coordinates useful.
        </PlainWordsBlock>
        <p>
          The readout is linear, but the features can be rich. That is the trick. Instead of training a large
          complicated model everywhere, we keep the feature maker fixed and train only the final layer.
        </p>
        <IntuitionBlock title="The readout can stay simple because the coordinates changed">
          <p>
            A linear readout can only add weighted coordinates. It cannot invent complex geometry by itself.
            The feature map does the geometric work first. After that, the readout only has to learn which
            measured coordinates should count positively, negatively, or barely at all.
          </p>
        </IntuitionBlock>
        <FeatureToyExample />
        <WorkedReadoutExample />
        <VisualHint>
          The sketch below shows the same idea geometrically. The labels do not change; only the coordinate
          system changes, making a simple linear boundary more useful.
        </VisualHint>
        <LinearSeparationVisual />
        <CheckpointBlock title="Can you say what is trained?">
          <p>
            At this stage, only the readout weights are trained. The feature map can be fixed. This simple
            separation will carry directly into QELM and QRC.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          A feature map changes the coordinate system. A linear readout then combines those coordinates. Quantum
          feature maps use a quantum system to create the coordinates, but the learning logic is the same.
        </SectionRecap>
      </Section>

      <Section id="quantum-extreme-learning-machines" title="Quantum Extreme Learning Machines">
        <p>
          A Quantum Extreme Learning Machine, or QELM, applies this feature-map idea with a quantum system.
          The word &ldquo;extreme&rdquo; comes from classical extreme learning machines: the hidden layer is fixed,
          and only the output layer is trained.
        </p>
        <PlainWordsBlock>
          QELM means: use a quantum system as the fixed hidden layer, measure what comes out, and train a
          classical output layer on top.
        </PlainWordsBlock>
        <p>
          That last sentence is the whole mental model. A QELM does not try to tune the quantum system for every
          task. Instead, it treats the quantum system as a fixed, expressive hidden layer. The training problem is
          pushed to the classical readout, where ordinary regression or classification tools are stable and cheap.
        </p>
        <p>
          In a QELM, the hidden layer is quantum. You encode an input into a quantum circuit or quantum system,
          let it transform the input, measure observables, and train a classical readout on those measured
          values.
        </p>
        <QelmSlowSteps />
        <p>
          The important point is that this is static. One input goes in. One feature vector comes out. The
          quantum system is not remembering a previous input.
        </p>
        <IntuitionBlock title="Static means independent examples">
          <p>
            If the first example is a red point and the second example is a green point, the second feature
            vector should not depend on the first example. Each data point receives the same fixed transformation
            recipe. That is exactly what you want for many ordinary classification or regression datasets.
          </p>
        </IntuitionBlock>
        <QelmToyExample />
        <QelmSinglePointStory />
        <VisualHint>
          Read the diagram left to right. The quantum block is fixed; the trainable part is only the small
          readout block at the end.
        </VisualHint>
        <QelmPipelineVisual />
        <CheckpointBlock title="Static should now mean one-shot">
          <p>
            If you can say “one input creates one feature vector, independently of the previous input,” you have
            the core QELM picture.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          QELM is the first quantum version of the feature-map idea. It is powerful but still static: the feature
          vector describes the current input, not a history.
        </SectionRecap>
      </Section>

      <Section id="static-quantum-features" title="Static Quantum Features">
        <p>
          Let the input be <MathBlock math="\mathbf{x}" />. A fixed quantum map prepares a state that depends
          on that input. We do not need to specify the full circuit here. Conceptually, it creates a state:
        </p>
        <MathBlock display math="\rho(\mathbf{x})" />
        <PlainWordsBlock>
          After the input has gone through the fixed quantum recipe, the quantum system is in a state that
          depends on that input.
        </PlainWordsBlock>
        <p>
          Read <MathBlock math="\rho(\mathbf{x})" /> as &ldquo;the quantum state after the input has been encoded
          and transformed.&rdquo; The page does not need the full machinery of density matrices yet. For now, the
          important part is simply that the state depends on the input.
        </p>
        <p>
          Then we measure a small list of observables. These measurements become the feature vector:
        </p>
        <MathBlock
          display
          math="\mathbf{z}(\mathbf{x}) = [\langle O_1\rangle_{\mathbf{x}},\langle O_2\rangle_{\mathbf{x}},\ldots,\langle O_m\rangle_{\mathbf{x}}]"
        />
        <PlainWordsBlock>
          Measure several chosen quantities. Each measurement average becomes one coordinate of the feature
          vector <MathBlock math="\mathbf{z}(\mathbf{x})" />.
        </PlainWordsBlock>
        <p>
          Each entry in this vector is one measured summary of the quantum state. One observable might capture
          one kind of correlation, another observable might capture a different kind of population imbalance, and
          another might respond strongly only when two parts of the system interact. Together they form a richer
          coordinate system than the raw input.
        </p>
        <MeasurementAverageExample />
        <p>
          The trained part is still only the readout:
        </p>
        <MathBlock display math="\hat{y} = \mathbf{w}^{\top}\mathbf{z}(\mathbf{x}) + b" />
        <p>
          This makes QELM easy to reason about. The quantum system is a fixed feature generator. The classical
          readout learns how to combine those features for classification or regression.
        </p>
        <IntuitionBlock title="The quantum system creates many possible views of the same input">
          <p>
            The readout does not need to know how the quantum dynamics produced every feature. It only needs a
            table of feature vectors and target labels. This is why QELM is often a good baseline: it tells us
            how much can already be achieved by static quantum features before adding temporal memory.
          </p>
        </IntuitionBlock>
        <CheckpointBlock title="Expectation value does not need to feel abstract here">
          <p>
            For this page, read an expectation value as a measured average. It is one number extracted from many
            repeated measurements of the transformed quantum state.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          Static quantum features are measurement summaries of a fixed quantum transformation. They become the
          inputs to the classical readout.
        </SectionRecap>
      </Section>

      <Section id="linear-separation" title="Linear Separation">
        <p>
          Suppose two classes are mixed together in the original input space. A linear model may fail because
          no straight boundary separates them well.
        </p>
        <p>
          For example, imagine two kinds of sensor signal. In the raw coordinates, one axis might be average
          amplitude and the other axis might be average frequency. Those two numbers may not be enough: the two
          classes overlap because the important distinction is hidden in a more subtle pattern.
        </p>
        <p>
          A good feature map bends the representation without making the readout complicated. After the quantum
          transformation, the same classes may be separated by a simple linear boundary in feature space.
        </p>
        <p>
          The phrase &ldquo;linear separation&rdquo; can sound abstract, but the picture is simple. We are not changing
          the labels. Red examples stay red and green examples stay green. We are only changing the coordinate
          system in which the readout sees them.
        </p>
        <p>
          This is the first mental model for QELM: the quantum system does not directly make the final decision.
          It creates coordinates where the final decision is easier.
        </p>
        <LinearToyExample />
        <MentalModelBlock />
        <IntuitionBlock title="Do not think of the quantum map as a classifier yet">
          <p>
            The fixed quantum map is more like a complicated lens. It can reveal useful structure, but the
            task-specific decision still belongs to the readout. This keeps the training story clean and gives us
            a fair way to compare static feature maps against temporal reservoirs later.
          </p>
        </IntuitionBlock>
        <div className={styles.conceptBox}>
          <span className={styles.conceptLabel}>Key idea</span>
          <p>
            The quantum system does the representation work. The linear readout does the task-specific learning.
          </p>
        </div>
        <CheckpointBlock title="Ask this before claiming QRC is needed">
          <p>
            Is the task really temporal, or can independent static quantum features already solve much of it?
            This question is why QELM is an important baseline.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          Linear separation explains why a fixed feature map can be useful. It does not yet explain memory.
          Memory enters only when we stop resetting the system between inputs.
        </SectionRecap>
      </Section>

      <ReviewCardSet cards={cardSets.qelm} />

      <Section id="from-static-to-time" title="From Static to Time">
        <p>
          QELM is useful, but it does not automatically model time. If you give it one input, it returns one
          transformed feature vector. If you give it the next input, it starts again.
        </p>
        <ScriptStepBlock
          title="The transition from QELM to QRC"
          steps={[
            {
              label: '1',
              title: 'Keep the readout idea',
              body: 'We still measure features and train a simple classical readout.',
            },
            {
              label: '2',
              title: 'Stop treating inputs as isolated',
              body: 'The next input should be processed in the context left by previous inputs.',
            },
            {
              label: '3',
              title: 'Reuse an internal state',
              body: 'The reservoir state becomes the carrier of short-term memory.',
            },
          ]}
        />
        <p>
          Starting again is not a bug. For independent data points it is exactly what we want. But it becomes a
          limitation when the meaning of the current input depends on what happened just before it.
        </p>
        <p>
          Many real tasks are not like that. A signal, a sensor stream, a financial series, or a chaotic system
          depends on what happened before. The current value often makes sense only together with recent history.
        </p>
        <p>
          Consider a sequence <MathBlock math="0.2,0.5,0.4" />. The value <MathBlock math="0.4" /> alone tells
          us something, but the short history tells us more: the signal rose and then slightly fell. A static
          feature map that sees only <MathBlock math="0.4" /> cannot directly know that local trend.
        </p>
        <p>
          To handle that, we need one extra ingredient: a state that is reused over time. That is where reservoir
          computing enters.
        </p>
        <ResetReuseExample />
        <PlainWordsBlock>
          QELM asks, “What features does this input produce?” QRC asks, “What features does the current
          reservoir state produce after seeing this input and recent previous inputs?”
        </PlainWordsBlock>
        <VisualHint>
          Compare the two rows. In QELM, each input is processed independently. In QRC, the state loops forward,
          so the next feature vector can carry context.
        </VisualHint>
        <StaticToTemporalVisual />
        <CheckpointBlock title="The one new ingredient is state reuse">
          <p>
            If you remember only one sentence here, use this: QRC is QELM-like feature generation plus a state
            that is carried forward in time.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          We have crossed from independent examples to sequences. The next section gives that sequence idea a
          compact state-update formula.
        </SectionRecap>
      </Section>

      <Section id="quantum-reservoir-computing" title="Quantum Reservoir Computing">
        <p>
          Quantum reservoir computing keeps the readout idea from QELM, but changes the feature maker from
          static to temporal.
        </p>
        <ScriptStepBlock
          title="One QRC update step"
          steps={[
            {
              label: '1',
              title: 'Receive the current input',
              body: 'A new value arrives, such as the next point in a signal.',
            },
            {
              label: '2',
              title: 'Mix it with the old state',
              body: 'The reservoir does not start from zero; it starts from what the previous inputs left behind.',
            },
            {
              label: '3',
              title: 'Measure the new state',
              body: 'The measured features now describe a history-aware state.',
            },
          ]}
        />
        <p>
          The quantum system is now used more like a dynamical medium than a one-shot feature map. Each new
          input nudges the current state. The state responds according to its own fixed quantum dynamics, and
          then we measure features from the resulting state.
        </p>
        <p>
          Instead of preparing a completely fresh feature map for each input, the quantum system has a state at
          time <MathBlock math="t" />. The new input updates that state:
        </p>
        <MathBlock display math="\rho_t = F(\rho_{t-1}, u_t)" />
        <PlainWordsBlock>
          The new reservoir state equals the result of applying the fixed update rule to the old state and the
          new input.
        </PlainWordsBlock>
        <IntuitionBlock title="Unpack the state update term by term">
          <p>
            <MathBlock math="\rho_{t-1}" /> means what the reservoir currently remembers.{' '}
            <MathBlock math="u_t" /> is the new incoming value. <MathBlock math="F" /> is the fixed update rule:
            encode the new input, let the quantum system evolve, and produce the next state{' '}
            <MathBlock math="\rho_t" />.
          </p>
        </IntuitionBlock>
        <p>
          Here <MathBlock math="u_t" /> is the input at the current time step. The previous state{' '}
          <MathBlock math="\rho_{t-1}" /> carries recent history. The fixed update rule{' '}
          <MathBlock math="F" /> is the quantum evolution plus input injection.
        </p>
        <p>
          The word &ldquo;fixed&rdquo; is important. The internal quantum dynamics are not usually trained by
          backpropagation through every time step. Instead, the reservoir provides a rich stream of temporal
          features, and the classical readout learns how to combine them.
        </p>
        <p>
          After the update, we measure features:
        </p>
        <MathBlock display math="\mathbf{z}_t = [\langle O_1\rangle_t,\ldots,\langle O_m\rangle_t]" />
        <PlainWordsBlock>
          The feature vector at time <MathBlock math="t" /> is made from measurements of the current reservoir
          state. Because the state was reused, those features can contain recent history.
        </PlainWordsBlock>
        <p>
          And again, the trained part is only a simple readout. The difference is that{' '}
          <MathBlock math="\mathbf{z}_t" /> can now contain information about the recent past, not only the
          current input.
        </p>
        <p>
          This memory should be useful but not permanent. Very recent inputs should often matter more than very
          old inputs. This is the idea of fading memory: the reservoir carries context forward, but old context
          gradually loses influence so the system remains stable.
        </p>
        <CheckpointBlock title="Do not confuse memory with perfect storage">
          <p>
            QRC does not need to remember every old input exactly. It needs a useful trace of recent history,
            shaped by the reservoir dynamics and readable through measurements.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          QRC turns a fixed quantum feature maker into a temporal feature maker. The readout is still simple,
          but the measured features now come from a state that has memory.
        </SectionRecap>
      </Section>

      <Section id="prediction-task" title="A Simple Prediction Task">
        <p>
          Imagine a time series:
        </p>
        <MathBlock display math="u_1,u_2,u_3,\ldots" />
        <p>
          A next-step prediction task asks: after seeing values up to time <MathBlock math="t" />, what should
          come next? The target is not the current value. The target is the future value{' '}
          <MathBlock math="u_{t+1}" />.
        </p>
        <QrcThreeStepStory />
        <p>
          At every time step, the quantum reservoir receives the next value. Its state changes. We measure a
          feature vector <MathBlock math="\mathbf{z}_t" /> and ask a linear readout to predict the next value:
        </p>
        <MathBlock display math="\hat{u}_{t+1} = \mathbf{w}^{\top}\mathbf{z}_t + b" />
        <PlainWordsBlock>
          Use the measurements available now to predict the next value. The readout learns which measured
          temporal features are useful for that prediction.
        </PlainWordsBlock>
        <p>
          Read this formula from right to left. The reservoir measurements <MathBlock math="\mathbf{z}_t" /> are
          the evidence available now. The weights <MathBlock math="\mathbf{w}" /> say which pieces of evidence
          tend to matter. The bias <MathBlock math="b" /> shifts the final prediction up or down.
        </p>
        <p>
          The reservoir is useful because <MathBlock math="\mathbf{z}_t" /> is not just a transformed version of
          <MathBlock math="u_t" />. It is a transformed version of the current input together with a fading trace
          of earlier inputs.
        </p>
        <p>
          In the toy sequence <MathBlock math="0.2,0.5,0.4" />, a static map would only transform the last value
          if we gave it only <MathBlock math="0.4" />. A reservoir can transform the last value while still being
          influenced by the rise from <MathBlock math="0.2" /> to <MathBlock math="0.5" /> and the drop from{' '}
          <MathBlock math="0.5" /> to <MathBlock math="0.4" />.
        </p>
        <p>
          That is the core reason QRC is a temporal model. The state is reused, so the system can remember enough
          context for prediction without training the quantum dynamics themselves.
        </p>
        <TimeSeriesToyExample />
        <VisualHint>
          The important loop is the green feedback arrow. It means the reservoir state after this step becomes
          the previous state for the next step.
        </VisualHint>
        <TimePredictionVisual />
        <CheckpointBlock title="Can you identify the training target?">
          <p>
            The readout is trained so that features at time <MathBlock math="t" /> predict the next value{' '}
            <MathBlock math="u_{t+1}" />. The reservoir creates the features; the readout learns the prediction.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          Prediction is where the temporal nature becomes practical. The model uses a history-aware feature
          vector now to estimate a future value.
        </SectionRecap>
      </Section>

      <ReviewCardSet cards={cardSets.qrc} />

      <Section id="qelm-vs-qrc" title="QELM vs QRC">
        <p>
          QELM and QRC share the same learning philosophy: keep the quantum part fixed, measure features, and
          train a classical readout.
        </p>
        <p>
          The difference is memory. QELM is a static feature map. QRC is a temporal feature map with state reuse.
        </p>
        <p>
          This comparison matters scientifically. If a QRC model performs well, we should ask whether the gain
          came from quantum feature expansion alone or from the temporal reservoir state. A static QELM baseline
          helps separate those two explanations.
        </p>
        <PlainWordsBlock>
          QELM tests the value of quantum features. QRC tests the value of quantum features plus temporal memory.
          A careful comparison needs both.
        </PlainWordsBlock>

        <div className={styles.comparisonTable} role="table" aria-label="QELM and QRC comparison">
          <div className={styles.tableHeader} role="row">
            <span role="columnheader">Question</span>
            <span role="columnheader">QELM</span>
            <span role="columnheader">QRC</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Input</span>
            <span role="cell" data-label="QELM">One data point</span>
            <span role="cell" data-label="QRC">A sequence over time</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Between inputs</span>
            <span role="cell" data-label="QELM">Start fresh or treat examples independently</span>
            <span role="cell" data-label="QRC">Reuse the previous quantum state</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Quantum role</span>
            <span role="cell" data-label="QELM">Static feature map</span>
            <span role="cell" data-label="QRC">Stateful dynamical system</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Feature meaning</span>
            <span role="cell" data-label="QELM">Features describe the current input</span>
            <span role="cell" data-label="QRC">Features describe the current state after recent history</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Memory</span>
            <span role="cell" data-label="QELM">No built-in temporal memory</span>
            <span role="cell" data-label="QRC">Previous state affects current features</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Readout</span>
            <span role="cell" data-label="QELM">Linear model on measured features</span>
            <span role="cell" data-label="QRC">Linear model on measured temporal features</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Natural task</span>
            <span role="cell" data-label="QELM">Static classification or regression</span>
            <span role="cell" data-label="QRC">Forecasting, streaming signals, temporal pattern recognition</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Baseline role</span>
            <span role="cell" data-label="QELM">Shows what static quantum features already achieve</span>
            <span role="cell" data-label="QRC">Shows what state reuse and fading memory add</span>
          </div>
          <div className={styles.tableRow} role="row">
            <span role="cell" data-label="Question">Best mental model</span>
            <span role="cell" data-label="QELM">Quantum kernel-like feature expansion</span>
            <span role="cell" data-label="QRC">Quantum feature expansion with fading memory</span>
          </div>
        </div>
        <CheckpointBlock title="The comparison is not just vocabulary">
          <p>
            If a task has no meaningful temporal structure, QRC may not be the right explanation for a gain.
            If the task depends on history, QRC can add something that static QELM cannot.
          </p>
        </CheckpointBlock>
        <SectionRecap>
          QELM and QRC share a readout philosophy. The difference is whether measured features describe one
          input or a state shaped by an input history.
        </SectionRecap>
      </Section>

      <Section id="what-to-remember" title="What to Remember">
        <p>
          Start with QELM: input goes into a fixed quantum feature map, measurements become features, and a
          linear readout learns the output.
        </p>
        <p>
          This already captures a useful pattern: the quantum system can be valuable even when it is not trained
          internally. It can act as a high-dimensional, nonlinear feature generator. For independent examples,
          that may be the right model to use.
        </p>
        <p>
          Then add time: the quantum state is not reset after every input. It evolves from one step to the next,
          so measurements can reflect recent history. That is quantum reservoir computing.
        </p>
        <p>
          This is the extra step that makes QRC different. The feature vector is no longer only about the current
          input. It is about the current input as seen through a state that has been shaped by previous inputs.
          That is why QRC belongs naturally to forecasting and sequence-processing tasks.
        </p>
        <p>
          The simplest summary is:
        </p>
        <div className={styles.takeaway}>
          QELM transforms inputs into quantum features. QRC transforms input histories into quantum features.
        </div>
        <ScriptStepBlock
          title="Final script to keep in your head"
          steps={[
            {
              label: '1',
              title: 'Feature map',
              body: 'Change the representation so a simple readout can work.',
            },
            {
              label: '2',
              title: 'QELM',
              body: 'Use a fixed quantum system as a static feature map for independent examples.',
            },
            {
              label: '3',
              title: 'QRC',
              body: 'Reuse the quantum state so measured features can carry recent history.',
            },
          ]}
        />
        <IntuitionBlock title="Use the simplest model that matches the data">
          <p>
            If examples are independent, start with the QELM picture. If order matters, if trends matter, or if
            the current value only makes sense in context, move to the QRC picture. The readout idea stays the
            same; the feature maker gains memory.
          </p>
        </IntuitionBlock>
        <CheckpointBlock title="One last self-test">
          <p>
            If someone asks for the difference in one sentence, answer: QELM maps a single input to quantum
            features; QRC maps a recent input history to quantum features through a reused quantum state.
          </p>
        </CheckpointBlock>
        <p>
          Once this distinction is clear, the more technical pages on{' '}
          <Link href="/measurement">measurement</Link>,{' '}
          <Link href="/echo-state">classical reservoirs</Link>, and{' '}
          <Link href="/physical-reservoirs">physical implementations</Link> become much easier to read.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.comparison} />
    </Essay>
  );
}
