'use client';

import { Essay, Section } from '@/components/Essay';
import { MathBlock } from '@/components/MathBlock';
import { ReviewCardSet } from '@/components/ReviewCardSet';
import { physicalReservoirCards } from '@/data/physical-reservoir-cards';

export default function PhysicalReservoirsPage() {
  const cardSets = {
    intro: physicalReservoirCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n <= 6;
    }),
    photonic: physicalReservoirCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 7 && n <= 14;
    }),
    quantum: physicalReservoirCards.filter((c) => {
      const n = parseInt(c.id.split('-')[1]);
      return n >= 15;
    }),
  };

  return (
    <Essay
      title="Physical Reservoir Computing"
      subtitle="From photonic circuits to nuclear spins — how physical systems can serve as powerful computational reservoirs, and why hardware implementations may hold the key to practical advantage."
    >
      <Section id="phys-introduction" title="Introduction">
        <p>
          Reservoir computing was born from a software abstraction — a randomly wired recurrent network
          simulated on a digital computer. But the paradigm contains a deeper insight:{' '}
          <strong>any sufficiently complex dynamical system can serve as a reservoir</strong>. The system
          doesn&apos;t need to be a neural network at all. It could be a bucket of water, a
          collection of electronic oscillators, or a quantum device.
        </p>
        <p>
          Physical reservoir computing (PRC) takes this insight literally, using the natural dynamics of
          physical systems — optical, mechanical, electronic, or quantum — as the computational reservoir.
          This approach offers compelling advantages: speed (physics operates at its natural timescale,
          often much faster than digital simulation), energy efficiency (no need to simulate dynamics that
          already occur naturally), and potentially novel computational capabilities that emerge from the
          physical substrate.
        </p>
      </Section>

      <Section id="why-physical" title="Why Physical Reservoirs?">
        <p>
          The case for physical reservoirs rests on several arguments:
        </p>
        <p>
          <strong>Speed:</strong> Digital simulation of a reservoir requires sequential computation of
          each neuron&apos;s state at each time step. A physical system evolves all its degrees of freedom
          simultaneously, in parallel, at the speed determined by its natural dynamics. A photonic reservoir,
          for instance, can process information at tens of GHz — orders of magnitude faster than digital
          simulation.
        </p>
        <p>
          <strong>Energy efficiency:</strong> Simulating the nonlinear dynamics of thousands of coupled
          oscillators on a GPU consumes watts of power. The same dynamics occurring naturally in a physical
          system may consume microwatts or less. For always-on sensor processing applications, this difference
          is decisive.
        </p>
        <p>
          <strong>Intrinsic nonlinearity:</strong> Physical systems are generically nonlinear. Optical
          components exhibit Kerr effects and saturable absorption. Mechanical systems have geometric
          nonlinearities. Magnetic systems have hysteresis. These nonlinearities come &quot;for free&quot; and often
          provide richer dynamics than the simple <MathBlock math="\tanh" /> activation used in software
          ESNs.
        </p>
        <p>
          <strong>Rich dynamics:</strong> Physical systems can exhibit a vast range of dynamical behaviors —
          oscillations, wave propagation, diffusion, interference, entanglement — that naturally encode
          input information in complex, high-dimensional ways. A reservoir doesn&apos;t need to be <em>designed</em>{' '}
          to be a good reservoir; it often just needs to be <em>sufficiently complex</em>.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.intro} />

      <Section id="photonic-reservoirs" title="Photonic Reservoirs">
        <p>
          Photonic reservoir computing is the most mature physical RC platform, with multiple experimental
          demonstrations achieving state-of-the-art performance on benchmark tasks. The key advantage of
          photonics is <strong>speed</strong>: optical systems can process information at bandwidths
          exceeding 10 GHz, enabling real-time processing of high-speed signals that would be impossible
          for digital systems.
        </p>
        <p>
          The most successful photonic RC architecture is the <strong>delay-line reservoir</strong>. Instead
          of many physical nodes, a single nonlinear element (such as a semiconductor optical amplifier or
          Mach-Zehnder modulator) is connected to a fiber-optic delay loop. The input signal is temporally
          multiplexed: it is divided into <MathBlock math="N" /> time slots within each delay period, and
          each time slot acts as a &quot;virtual node&quot; of the reservoir.
        </p>
        <p>
          The dynamics of the delay-line reservoir follow:
        </p>
        <MathBlock
          display
          math="x_i(n+1) = f\!\left[\eta \, x_{i-1}(n+1) + \gamma \, x_i(n) + \xi \, u_i(n)\right]"
        />
        <p>
          where <MathBlock math="x_i(n)" /> is the state of virtual node <MathBlock math="i" /> at
          time step <MathBlock math="n" />, <MathBlock math="f" /> is the nonlinear response of the
          optical component, <MathBlock math="\eta" /> is the coupling between adjacent virtual nodes,{' '}
          <MathBlock math="\gamma" /> is the feedback from the delay loop, and{' '}
          <MathBlock math="\xi" /> scales the input <MathBlock math="u_i(n)" />.
        </p>
        <p>
          Key experimental milestones include:
        </p>
        <ul>
          <li>
            Telecommunications channel equalization at 25+ Gb/s using semiconductor optical amplifiers
          </li>
          <li>
            Speech recognition tasks processed at GHz rates with error rates competitive with digital ESNs
          </li>
          <li>
            Integrated photonic chips implementing reservoir computing on a single silicon photonic circuit
          </li>
        </ul>
      </Section>

      <Section id="spintronic-reservoirs" title="Spintronic Reservoirs">
        <p>
          Spintronic reservoir computing uses the dynamics of magnetic systems — spin waves, magnetization
          dynamics, and magnetic textures — as computational resources. The magnetization dynamics of thin
          films and nanostructures are governed by the <strong>Landau-Lifshitz-Gilbert (LLG) equation</strong>:
        </p>
        <MathBlock
          display
          math="\frac{d\mathbf{M}}{dt} = -\gamma_0 \, \mathbf{M} \times \mathbf{H}_{\text{eff}} + \frac{\alpha}{M_s} \mathbf{M} \times \frac{d\mathbf{M}}{dt}"
        />
        <p>
          where <MathBlock math="\mathbf{M}" /> is the magnetization, <MathBlock math="\gamma_0" /> is the
          gyromagnetic ratio, <MathBlock math="\mathbf{H}_{\text{eff}}" /> is the effective magnetic field,{' '}
          <MathBlock math="\alpha" /> is the Gilbert damping parameter, and{' '}
          <MathBlock math="M_s" /> is the saturation magnetization.
        </p>
        <p>
          The nonlinear, high-dimensional nature of spin-wave propagation in magnetic films makes them
          natural reservoirs. Spin waves excited by input signals propagate through the magnetic medium,
          interact nonlinearly, and create complex spatiotemporal patterns that encode the input history.
        </p>
        <p>
          Advantages of spintronic reservoirs include nanoscale footprint, CMOS compatibility (enabling
          integration with conventional electronics), and the ability to operate at GHz frequencies. However,
          challenges remain in achieving reproducible fabrication and efficient readout of the high-dimensional
          magnetic states.
        </p>
      </Section>

      <Section id="mechanical-reservoirs" title="Mechanical Reservoirs">
        <p>
          One of the most surprising applications of physical RC is in mechanical systems. <strong>Soft body
          computing</strong> demonstrates that even simple mechanical objects can perform computation:
        </p>
        <ul>
          <li>
            <strong>Mass-spring networks:</strong> Arrays of masses connected by springs exhibit rich nonlinear
            dynamics when driven by input signals. The positions and velocities of the masses serve as the
            reservoir state.
          </li>
          <li>
            <strong>Silicone bodies:</strong> Octopus-arm-inspired soft robots use their body dynamics for
            real-time computation, combining sensing and computing in the same physical structure.
          </li>
          <li>
            <strong>Water waves:</strong> Circular containers of water, excited by input signals at specific
            points, generate wave interference patterns that encode temporal information. The heights of the
            water at readout points serve as reservoir features.
          </li>
        </ul>
        <p>
          Mechanical reservoirs highlight a profound conceptual point: computation is not restricted to
          electronic or optical systems. Any physical system with sufficient complexity and the right
          dynamical properties (nonlinearity, fading memory) can compute.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.photonic} />

      <Section id="quantum-hardware" title="Quantum Hardware Platforms">
        <p>
          Quantum reservoir computing takes physical RC to its logical extreme: using quantum-mechanical
          systems as reservoirs. The quantum nature of the reservoir provides access to an exponentially
          large state space (the Hilbert space) and uniquely quantum features like entanglement and
          superposition.
        </p>
        <p>
          Several quantum hardware platforms are being explored for QRC:
        </p>
        <ul>
          <li>
            <strong>Superconducting qubits:</strong> Currently the most accessible platform, with cloud-based
            access through IBM Quantum, Google, and others. Typical coherence times of 50–100 μs limit
            the depth of temporal processing but are sufficient for proof-of-concept demonstrations.
          </li>
          <li>
            <strong>Trapped ions:</strong> Offer the longest coherence times (seconds to minutes) and
            highest gate fidelities, but are slower in operation speed (~kHz gate rates) compared to
            superconducting circuits (~GHz).
          </li>
          <li>
            <strong>Photonic systems:</strong> Room-temperature operation, high speed, and natural
            connectivity make photonic platforms attractive. Both discrete-variable (single photon) and
            continuous-variable (squeezed light) approaches are being investigated.
          </li>
          <li>
            <strong>NMR systems:</strong> Nuclear spins in molecules provide well-characterized qubit
            systems with rich inter-qubit couplings determined by molecular structure. Limited scalability
            but excellent for fundamental studies.
          </li>
          <li>
            <strong>Nitrogen-vacancy (NV) centers in diamond:</strong> Room-temperature quantum systems
            with long spin coherence times. The coupling between nearby NV centers provides natural
            reservoir connectivity.
          </li>
        </ul>
        <p>
          The choice of platform involves trade-offs between coherence time, gate speed, connectivity,
          scalability, and operating temperature. For QRC specifically, the &quot;natural&quot; Hamiltonian dynamics
          of each platform (without requiring engineered gate sequences) are often sufficient, which relaxes
          many of the stringent requirements of gate-based quantum computing.
        </p>
      </Section>

      <Section id="superconducting" title="Superconducting Circuits">
        <p>
          Superconducting qubit systems — particularly transmon qubits — are the most widely used platform
          for QRC experiments. In a typical setup:
        </p>
        <ul>
          <li>
            The reservoir consists of <MathBlock math="n" /> transmon qubits with fixed capacitive or
            inductive couplings.
          </li>
          <li>
            Input signals modulate the frequency of individual qubits via microwave drive pulses.
          </li>
          <li>
            The system evolves under its natural Hamiltonian between input injections.
          </li>
          <li>
            Readout is performed via dispersive measurement of individual qubit states.
          </li>
        </ul>
        <p>
          A typical Hamiltonian for a transmon-based quantum reservoir is:
        </p>
        <MathBlock
          display
          math="\hat{H} = \sum_i \omega_i \hat{a}_i^\dagger \hat{a}_i + \frac{\delta_i}{2} \hat{a}_i^\dagger \hat{a}_i^\dagger \hat{a}_i \hat{a}_i + \sum_{\langle i,j \rangle} g_{ij}(\hat{a}_i^\dagger \hat{a}_j + \hat{a}_j^\dagger \hat{a}_i)"
        />
        <p>
          where <MathBlock math="\omega_i" /> are qubit frequencies, <MathBlock math="\delta_i" /> are
          anharmonicities (what makes transmons behave as qubits rather than harmonic oscillators), and{' '}
          <MathBlock math="g_{ij}" /> are coupling strengths. The anharmonicity provides the crucial
          nonlinearity that a good reservoir requires.
        </p>
        <p>
          Experiments on IBM quantum hardware have demonstrated successful QRC with 5–7 qubits, achieving
          performance comparable to classical ESNs with significantly more nodes.
        </p>
      </Section>

      <Section id="nmr-reservoirs" title="NMR-Based Reservoirs">
        <p>
          Nuclear Magnetic Resonance (NMR) offers a unique platform for quantum reservoir computing. In
          liquid-state NMR, the nuclear spins of atoms in dissolved molecules serve as qubits. The internal
          Hamiltonian of the molecule provides natural qubit-qubit couplings:
        </p>
        <MathBlock
          display
          math="\hat{H}_{\text{NMR}} = \sum_i \omega_i \hat{I}_i^z + \sum_{i < j} 2\pi J_{ij} \hat{I}_i^z \hat{I}_j^z"
        />
        <p>
          where <MathBlock math="\omega_i" /> are the Larmor frequencies of individual nuclei and{' '}
          <MathBlock math="J_{ij}" /> are the scalar coupling constants determined by molecular structure.
        </p>
        <p>
          The advantages of NMR for QRC are substantial: extremely long coherence times (seconds for{' '}
          <MathBlock math="{}^{13}\text{C}" /> nuclei in suitable molecules), precise Hamiltonian
          characterization (molecular structure is exactly known), and well-developed control techniques
          (decades of NMR spectroscopy expertise). The main limitation is scalability — the number of
          usable spins is limited by molecular size and spectral resolution, typically to fewer than
          10–20 qubits.
        </p>
        <p>
          Despite this limitation, NMR has been invaluable as a test bed for QRC concepts, providing
          clean experimental validation of theoretical predictions.
        </p>
      </Section>

      <Section id="challenges-outlook" title="Challenges & Outlook">
        <p>
          Physical reservoir computing faces several key challenges:
        </p>
        <ul>
          <li>
            <strong>Noise and reproducibility:</strong> Physical systems are inherently noisy. While some
            noise can beneficially act as the regularization or dissipation needed for fading memory,
            excessive noise degrades the signal-to-noise ratio of reservoir states and limits computational
            accuracy.
          </li>
          <li>
            <strong>Readout complexity:</strong> Extracting the high-dimensional state of a physical reservoir
            is often the practical bottleneck. For quantum systems, this requires many measurement repetitions
            (shots). For photonic and mechanical systems, it requires extensive sensor arrays.
          </li>
          <li>
            <strong>Reservoir design:</strong> While the reservoir isn&apos;t trained, its physical parameters
            must still be chosen wisely. Understanding the relationship between physical parameters and
            computational performance remains an active area of research.
          </li>
          <li>
            <strong>Benchmarking:</strong> Comparing physical reservoirs across different platforms requires
            standardized benchmarks that account for differences in speed, energy consumption, and accuracy.
          </li>
        </ul>
        <p>
          Looking ahead, the most exciting developments may come from <strong>hybrid architectures</strong>{' '}
          that combine multiple physical substrates. For example, a photonic front-end for high-speed input
          processing feeding into a quantum reservoir for complex feature extraction, with a classical
          neural network readout. Such systems could combine the speed of photonics, the computational
          power of quantum dynamics, and the flexibility of digital post-processing.
        </p>
        <p>
          Physical reservoir computing challenges our notion of what computation looks like. It suggests that
          the natural world is full of untapped computational resources — that every physical system with
          sufficiently complex dynamics is, in some sense, already computing. The task of the engineer is
          not to build a computer from scratch, but to listen to the computation that physics is already
          performing and learn to read its output.
        </p>
      </Section>

      <ReviewCardSet cards={cardSets.quantum} />
    </Essay>
  );
}
