'use client';

import { Essay, Section } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { physicalReservoirCards } from '@/data/physical-reservoir-cards';

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

function DelayLineVisual() {
  return (
    <Figure
      title="Photonic Delay-Line Reservoir"
      caption="A single nonlinear optical node plus delayed feedback creates many virtual nodes."
    >
      <svg viewBox="0 0 860 230" style={{ display: 'block', width: '100%', height: 'auto' }} role="img" aria-label="Delay-line reservoir">
        <rect x="70" y="84" width="190" height="70" rx="12" fill="#17345d" stroke="#84d7ff" />
        <text x="165" y="120" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">Nonlinear Node</text>

        <rect x="356" y="84" width="170" height="70" rx="12" fill="#17345d" stroke="#84d7ff" />
        <text x="441" y="120" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">Delay Loop</text>

        <rect x="620" y="84" width="170" height="70" rx="12" fill="#17345d" stroke="#84d7ff" />
        <text x="705" y="120" textAnchor="middle" fill="#e8f6ff" fontSize="16" fontWeight="700">Readout</text>

        <line x1="260" y1="119" x2="356" y2="119" stroke="#83deff" strokeWidth="2" />
        <line x1="526" y1="119" x2="620" y2="119" stroke="#83deff" strokeWidth="2" />

        <path d="M 520 84 C 610 36, 770 38, 780 84" fill="none" stroke="#74c8ff" strokeWidth="2" />
        <path d="M 780 154 C 700 208, 280 208, 180 154" fill="none" stroke="#74c8ff" strokeWidth="2" />
        <line x1="180" y1="154" x2="180" y2="119" stroke="#74c8ff" strokeWidth="2" />

        <text x="432" y="56" textAnchor="middle" fill="#95b0d2" fontSize="13">feedback path</text>
        <text x="436" y="198" textAnchor="middle" fill="#95b0d2" fontSize="13">virtual nodes sampled over time</text>
      </svg>
    </Figure>
  );
}

function PlatformMapVisual() {
  return (
    <Figure
      title="Platform Landscape"
      caption="Different hardware substrates occupy different corners of speed, control, and scalability."
    >
      <svg viewBox="0 0 860 220" style={{ display: 'block', width: '100%', height: 'auto' }} role="img" aria-label="Platform map">
        <line x1="70" y1="178" x2="810" y2="178" stroke="#6da0d8" strokeWidth="1.2" />
        <line x1="70" y1="24" x2="70" y2="178" stroke="#6da0d8" strokeWidth="1.2" />
        <text x="740" y="202" fill="#95b0d2" fontSize="13">speed</text>
        <text x="20" y="28" fill="#95b0d2" fontSize="13">control</text>

        <circle cx="600" cy="90" r="22" fill="#65d8ff" opacity="0.8" />
        <text x="600" y="95" textAnchor="middle" fill="#062233" fontSize="12" fontWeight="700">Photonic</text>

        <circle cx="500" cy="74" r="22" fill="#89b8ff" opacity="0.8" />
        <text x="500" y="79" textAnchor="middle" fill="#0f2643" fontSize="12" fontWeight="700">SC Qubits</text>

        <circle cx="370" cy="98" r="20" fill="#7ce1bb" opacity="0.8" />
        <text x="370" y="103" textAnchor="middle" fill="#0d2e28" fontSize="12" fontWeight="700">Spintronic</text>

        <circle cx="280" cy="122" r="20" fill="#ffd48b" opacity="0.85" />
        <text x="280" y="127" textAnchor="middle" fill="#3b2b10" fontSize="12" fontWeight="700">Mechanical</text>

        <circle cx="190" cy="64" r="20" fill="#c8b5ff" opacity="0.85" />
        <text x="190" y="69" textAnchor="middle" fill="#261a42" fontSize="12" fontWeight="700">NMR</text>
      </svg>
    </Figure>
  );
}

function cardIndex(id: string): number {
  const parsed = parseInt(id.split('-')[1] ?? '0', 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function PhysicalReservoirsPage() {
  const cardSets = {
    core: physicalReservoirCards.filter((c) => cardIndex(c.id) <= 5),
    advanced: physicalReservoirCards.filter((c) => cardIndex(c.id) >= 6),
  };

  return (
    <Essay
      title="Physical Reservoir Computing"
      subtitle="A hardware-first guide: photonic, spintronic, mechanical, and quantum reservoirs with realistic engineering constraints."
      slug="/physical-reservoirs"
    >
      <Section id="phys-introduction" title="Introduction">
        <p>
          Reservoir computing does not require a digital neural network. Any physical dynamical system with nonlinear
          response and fading memory can serve as a reservoir, as long as you can measure its state and fit a readout.
        </p>
        <p>
          This section explains the practical payoff: high-throughput temporal processing with potentially lower energy
          and latency than full digital simulation.
        </p>
        <p>
          The key mindset is systems-first: the reservoir is not an abstract layer anymore, but a real device with
          calibration needs, drift behavior, and readout constraints.
        </p>
      </Section>

      <Section id="why-physical" title="Why Physical Reservoirs?">
        <p>
          Three reasons dominate: native-speed dynamics, analog parallelism, and intrinsic nonlinearity. Physical
          systems &quot;compute&quot; by evolving, while digital systems must numerically emulate that same evolution.
        </p>
        <p>
          For edge and streaming tasks, this can shift the bottleneck from model complexity to measurement and I/O
          design.
        </p>
        <p>
          In other words, once the physical dynamics are fast enough, interface engineering often dominates real-world
          performance.
        </p>
      </Section>

      <Section id="photonic-reservoirs" title="Photonic Reservoirs">
        <p>
          Photonic RC is currently the most mature high-speed route. Delay-line setups use one nonlinear optical node
          with feedback to emulate many virtual nodes.
        </p>
        <MathBlock
          display
          math="x_i(n+1)=f\left(\eta x_{i-1}(n+1)+\gamma x_i(n)+\xi u_i(n)\right)"
        />
        <p>
          Here <MathBlock math="\eta" /> controls neighbor coupling, <MathBlock math="\gamma" /> controls feedback,
          and <MathBlock math="\xi" /> scales input injection.
        </p>
        <p>
          This architecture is attractive because one nonlinear element can emulate a much larger recurrent network via
          temporal slicing.
        </p>
        <DelayLineVisual />
      </Section>

      <Section id="spintronic-reservoirs" title="Spintronic Reservoirs">
        <p>
          Spintronic reservoirs exploit nonlinear magnetization dynamics and spin-wave interactions. Their core physics
          is often summarized by the Landau-Lifshitz-Gilbert equation:
        </p>
        <MathBlock
          display
          math="\frac{d\mathbf{M}}{dt}=-\gamma_0\mathbf{M}\times\mathbf{H}_{\text{eff}}+\frac{\alpha}{M_s}\mathbf{M}\times\frac{d\mathbf{M}}{dt}"
        />
        <p>
          They are attractive for compact, low-power temporal hardware, but process variability and readout quality
          remain key constraints.
        </p>
        <p>
          For deployment, reproducibility across fabricated units is as important as single-device peak performance.
        </p>
      </Section>

      <Section id="mechanical-reservoirs" title="Mechanical Reservoirs">
        <p>
          Mechanical reservoirs use coupled oscillations, damping, and nonlinear restoring forces as computation.
          Flexible bodies in robotics can perform embodied temporal preprocessing before digital control layers.
        </p>
        <p>
          This is especially useful when low-latency control is needed and a full model-based simulator would be too
          heavy for onboard compute.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.core} />

      <Section id="quantum-hardware" title="Quantum Hardware Platforms">
        <p>
          Quantum reservoirs are physical reservoirs with quantum state dynamics as the feature engine. Candidate
          platforms include superconducting circuits, photonic quantum systems, trapped ions, and NMR spin ensembles.
        </p>
        <p>
          They differ in coherence, control bandwidth, and calibration overhead, so platform-task matching is critical.
        </p>
        <p>
          A platform is never &quot;best&quot; in isolation; it is best relative to a specific task, latency budget, and
          operating environment.
        </p>
        <PlatformMapVisual />
      </Section>

      <Section id="superconducting" title="Superconducting Circuits">
        <p>
          Superconducting implementations can use fixed couplings and microwave drives to realize reservoir evolution.
          A representative model is:
        </p>
        <MathBlock
          display
          math="\hat{H}=\sum_i\omega_i\hat{a}_i^{\dagger}\hat{a}_i+\sum_i\frac{\delta_i}{2}\hat{a}_i^{\dagger}\hat{a}_i^{\dagger}\hat{a}_i\hat{a}_i+\sum_{\langle i,j\rangle}g_{ij}(\hat{a}_i^{\dagger}\hat{a}_j+\hat{a}_j^{\dagger}\hat{a}_i)"
        />
        <p>
          Strong tooling and programmability make this platform excellent for rapid prototyping, despite calibration and
          noise management overhead.
        </p>
        <p>
          As systems scale, control-line crowding and calibration complexity become first-order design constraints.
        </p>
      </Section>

      <Section id="nmr-reservoirs" title="NMR Reservoirs">
        <p>
          NMR platforms provide highly controlled spin dynamics and excellent interpretability for method development.
          Their main limitation is weak polarization scaling, which constrains large-system deployment.
        </p>
        <p>
          They remain valuable for testing protocol ideas before committing to more expensive hardware platforms.
        </p>
      </Section>

      <Section id="benchmarking-and-noise" title="Benchmarking and Noise">
        <p>
          Physical RC papers are often hard to compare because tasks, data protocols, and resource budgets differ.
          Reliable reporting should include runtime cost, calibration cadence, and run-to-run uncertainty.
        </p>
        <p>
          Without standardized reporting, apparent improvements can be driven by evaluation choices rather than model
          quality.
        </p>
      </Section>

      <Section id="engineering-patterns" title="Engineering Patterns">
        <p>
          Robust deployments usually combine periodic recalibration, drift monitoring, and hybrid pipelines where a
          physical core provides features and software layers handle denoising and control logic.
        </p>
        <p>
          This architecture reduces risk: physics does feature generation, software handles orchestration and safety
          checks.
        </p>
      </Section>

      <Section id="challenges-outlook" title="Challenges and Outlook">
        <p>
          The near-term opportunity is specialized temporal workloads where physics-native dynamics outperform generic
          digital processing on latency or power. Long-term scaling depends on standard benchmarks and stronger
          manufacturing reproducibility.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.advanced} />
    </Essay>
  );
}
