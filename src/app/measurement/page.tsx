'use client';

import { Essay, Section } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { measurementCards } from '@/data/measurement-cards';

interface FigureProps {
  title: string;
  caption: string;
  children: React.ReactNode;
}

function Figure({ title, caption, children }: FigureProps) {
  return (
    <figure
      style={{
        background: 'rgba(248, 252, 255, 0.78)',
        border: '1px solid rgba(67, 104, 138, 0.12)',
        borderRadius: 14,
        boxShadow: 'var(--shadow-soft)',
        margin: '1rem 0 1.25rem',
        overflow: 'hidden',
      }}
    >
      <figcaption
        style={{
          background: 'rgba(240, 247, 254, 0.92)',
          borderBottom: '1px solid rgba(67, 104, 138, 0.12)',
          padding: '0.72rem 0.9rem',
        }}
      >
        <div
          style={{
            color: 'var(--accent-secondary)',
            fontFamily: 'var(--font-ui), sans-serif',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.48 }}>{caption}</div>
      </figcaption>
      <div style={{ padding: '0.8rem 0.9rem 0.7rem' }}>{children}</div>
    </figure>
  );
}

function MeasurementPipelineVisual() {
  return (
    <Figure
      title="Measurement Pipeline"
      caption="The readout never sees the full quantum state. It only sees the classical summaries created by your measurement protocol."
    >
      <svg
        viewBox="0 0 900 200"
        style={{ display: 'block', width: '100%', height: 'auto' }}
        role="img"
        aria-label="Quantum state to classical feature pipeline"
      >
        <rect x="30" y="62" width="180" height="76" rx="14" fill="#f6efe4" stroke="#8d8478" />
        <rect x="250" y="62" width="160" height="76" rx="14" fill="#edf5fc" stroke="#7793ad" />
        <rect x="450" y="62" width="160" height="76" rx="14" fill="#eef7f0" stroke="#77907d" />
        <rect x="650" y="62" width="220" height="76" rx="14" fill="#f9f3ea" stroke="#9c8a6a" />

        <text x="120" y="92" textAnchor="middle" fill="#223243" fontSize="17" fontWeight="700">Reservoir State</text>
        <text x="120" y="117" textAnchor="middle" fill="#566679" fontSize="13">ρ(t), hidden in Hilbert space</text>

        <text x="330" y="92" textAnchor="middle" fill="#223243" fontSize="17" fontWeight="700">Observable Choice</text>
        <text x="330" y="117" textAnchor="middle" fill="#566679" fontSize="13">Z, X, correlators, POVM</text>

        <text x="530" y="92" textAnchor="middle" fill="#223243" fontSize="17" fontWeight="700">Shots</text>
        <text x="530" y="117" textAnchor="middle" fill="#566679" fontSize="13">finite samples, noisy estimates</text>

        <text x="760" y="92" textAnchor="middle" fill="#223243" fontSize="17" fontWeight="700">Classical Features</text>
        <text x="760" y="117" textAnchor="middle" fill="#566679" fontSize="13">means, variances, bitstrings, readout input</text>

        <line x1="210" y1="100" x2="250" y2="100" stroke="#40698d" strokeWidth="2.4" />
        <line x1="410" y1="100" x2="450" y2="100" stroke="#40698d" strokeWidth="2.4" />
        <line x1="610" y1="100" x2="650" y2="100" stroke="#40698d" strokeWidth="2.4" />

        <text x="328" y="34" textAnchor="middle" fill="#8b7a5f" fontSize="13">what do you ask the state?</text>
        <text x="530" y="34" textAnchor="middle" fill="#8b7a5f" fontSize="13">how well can you estimate it?</text>
        <text x="760" y="34" textAnchor="middle" fill="#8b7a5f" fontSize="13">what information reaches the learner?</text>
      </svg>
    </Figure>
  );
}

function TradeoffVisual() {
  return (
    <Figure
      title="Measurement Tradeoff"
      caption="Good measurement design balances information richness, disturbance, and cost rather than maximizing only one axis."
    >
      <svg
        viewBox="0 0 840 260"
        style={{ display: 'block', width: '100%', height: 'auto' }}
        role="img"
        aria-label="Triangle showing information disturbance and cost tradeoff"
      >
        <polygon points="420,26 120,220 720,220" fill="#f8fbff" stroke="#7c95ad" strokeWidth="2" />
        <circle cx="420" cy="44" r="28" fill="#d7ebfb" stroke="#7292b2" />
        <circle cx="140" cy="210" r="28" fill="#f5ead8" stroke="#9d8965" />
        <circle cx="700" cy="210" r="28" fill="#e4f3e8" stroke="#6e9076" />

        <text x="420" y="49" textAnchor="middle" fill="#1f3040" fontSize="15" fontWeight="700">Information</text>
        <text x="140" y="215" textAnchor="middle" fill="#1f3040" fontSize="15" fontWeight="700">Disturbance</text>
        <text x="700" y="215" textAnchor="middle" fill="#1f3040" fontSize="15" fontWeight="700">Cost</text>

        <circle cx="420" cy="142" r="16" fill="#255f93" opacity="0.92" />
        <text x="420" y="146" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">good</text>

        <text x="420" y="118" textAnchor="middle" fill="#66788a" fontSize="13">informative enough</text>
        <text x="315" y="188" textAnchor="middle" fill="#66788a" fontSize="13">not too destructive</text>
        <text x="530" y="188" textAnchor="middle" fill="#66788a" fontSize="13">still affordable</text>
      </svg>
    </Figure>
  );
}

export default function MeasurementPage() {
  const cardSets = {
    core: measurementCards.filter((_, index) => index < 4),
    advanced: measurementCards.filter((_, index) => index >= 4),
  };

  return (
    <Essay
      title="Measurement and Readout"
      subtitle="How quantum states become classical features, what measurement costs, and why readout design shapes reservoir performance."
      slug="/measurement"
    >
      <Section id="measurement-introduction" title="Introduction">
        <p>
          In quantum reservoir computing, measurement is not a final bookkeeping step. It is the interface between a
          high-dimensional quantum dynamical system and the classical learner that must actually make predictions.
        </p>
        <p>
          The reservoir may contain rich dynamics, but the readout only receives whatever your measurement protocol
          exposes. That makes measurement design part of the model, not an afterthought.
        </p>
        <p>
          This is why two systems with similar underlying dynamics can perform very differently if they use different
          observables, different shot budgets, or different timing for readout.
        </p>
        <MeasurementPipelineVisual />
      </Section>

      <Section id="observables-and-povms" title="Observables and POVMs">
        <p>
          The cleanest way to describe measurement is through observables and measurement operators. If the state is
          described by a density matrix <MathBlock math="\rho" />, then the expected value of an observable{' '}
          <MathBlock math="O" /> is
        </p>
        <MathBlock display math="\langle O \rangle = \mathrm{Tr}(\rho O)." />
        <p>
          In practice, QRC papers often use local Pauli observables such as <MathBlock math="Z_i" />, two-body
          correlators such as <MathBlock math="Z_i Z_j" />, or full bitstring outcomes measured in a fixed basis.
        </p>
        <p>
          More generally, a measurement can be described by a POVM. Outcome probabilities are
        </p>
        <MathBlock display math="p(m)=\mathrm{Tr}(\rho E_m), \qquad \sum_m E_m = I." />
        <p>
          This matters because the observable choice decides what structure is visible to the readout: population,
          correlations, basis-dependent structure, or some coarse-grained summary of the state.
        </p>
      </Section>

      <Section id="shots-and-estimators" title="Shots and Estimators">
        <p>
          On real hardware and in realistic simulation protocols, measurement is estimated from repeated samples. With
          <MathBlock math="S" /> shots, an empirical estimator for a scalar feature can be written as
        </p>
        <MathBlock display math="\hat{\mu}=\frac{1}{S}\sum_{s=1}^{S} x_s." />
        <p>
          The important scaling law is that sampling error typically shrinks only like{' '}
          <MathBlock math="S^{-1/2}" />. Doubling stability requires far more than doubling convenience.
        </p>
        <p>
          So every extra feature has a cost: more shots, more latency, more data movement, and often more variance in
          comparisons between papers if these choices are not reported explicitly.
        </p>
      </Section>

      <Section id="backaction-and-sequences" title="Backaction and Sequences">
        <p>
          Measurement is not passive. If an outcome <MathBlock math="m" /> is observed, the post-measurement state
          changes according to
        </p>
        <MathBlock
          display
          math="\rho_m = \frac{M_m \rho M_m^{\dagger}}{\mathrm{Tr}(M_m \rho M_m^{\dagger})}."
        />
        <p>
          This is the backaction problem: every measurement can change the internal state that would otherwise carry
          memory into future timesteps.
        </p>
        <p>
          That creates a design choice. Terminal measurement reads only after the evolution window and preserves earlier
          dynamics. Interleaved measurement probes the system during evolution and may expose richer temporal structure,
          but it also reshapes the reservoir itself.
        </p>
        <TradeoffVisual />
      </Section>

      <ReviewCardSet cards={cardSets.core} />

      <Section id="measurement-for-reservoirs" title="Measurement for Reservoirs">
        <p>
          For QRC, the central engineering question is not &quot;can I measure the state?&quot; but &quot;which measurement protocol
          creates the best classical feature map under realistic constraints?&quot;
        </p>
        <p>
          A practical measurement layer usually specifies four things: which observables are used, when they are
          measured, how many shots are allocated, and how outcomes are aggregated into a feature vector.
        </p>
        <MathBlock display math="\mathbf{z}_t = [\langle Z_1 \rangle_t,\langle Z_2 \rangle_t,\langle Z_1 Z_2 \rangle_t,\ldots]" />
        <p>
          The readout then acts on these classical features, for example with a linear model or ridge regression. This
          means the measurement layer partly determines what task-relevant nonlinearity the learner can access.
        </p>
      </Section>

      <Section id="benchmarking-measurement" title="Benchmarking Measurement">
        <p>
          Measurement choices are often underreported, even though they strongly affect runtime and accuracy. A fair
          paper should report observables, basis choices, shot budget, timing of measurement, and the exact feature
          construction pipeline.
        </p>
        <p>
          Otherwise two reservoirs may look comparable on paper while one is quietly spending far more measurement
          effort than the other.
        </p>
        <p>
          If Part 4 treated hardware as the physical bottleneck, this chapter treats measurement as the information
          bottleneck.
        </p>
        <p>
          Good QRC measurement reporting should make the readout interface reproducible: state which observables were
          chosen, how feature statistics were estimated, and what latency or sample budget was required to make those
          estimates reliable.
        </p>
      </Section>

      <Section id="synthesis" title="Synthesis">
        <p>
          The main lesson of a measurement-first view is that QRC performance is never only about the reservoir
          dynamics. It is about the entire pipeline from hidden quantum state to classical feature vector.
        </p>
        <p>
          Strong papers in this area make measurement explicit: what is measured, when, with how many shots, and why
          that particular readout interface is justified. Weak papers often leave this layer implicit even when it is
          doing much of the real work.
        </p>
        <p>
          That is the standard this chapter argues for: measurement should be discussed as part of the model design,
          budget, and benchmarking story, not as a hidden post-processing detail tacked on at the end.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.advanced} />
    </Essay>
  );
}
