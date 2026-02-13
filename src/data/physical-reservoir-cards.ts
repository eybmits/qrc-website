import { ReviewCard } from '@/lib/spaced-repetition';

export const physicalReservoirCards: ReviewCard[] = [
  // --- Why Physical Reservoirs? ---
  {
    id: 'phys-1',
    question:
      'What is the primary speed advantage of physical reservoir computers over digital simulations?',
    answer:
      'Physical reservoirs compute at the native speed of their underlying physics (e.g., speed of light in optics, spin-wave propagation in magnets), avoiding the clock-cycle bottleneck of digital processors that must simulate these dynamics step by step.',
  },
  {
    id: 'phys-2',
    question:
      'Why can physical reservoirs be dramatically more energy-efficient than conventional digital hardware?',
    answer:
      'Physical substrates perform computation as a byproduct of their natural dynamics, so no energy is spent on fetching instructions or shuttling data between memory and processor. The computation "comes for free" with the physics.',
  },
  {
    id: 'phys-3',
    question:
      'Why is intrinsic nonlinearity valuable in a physical reservoir, and how does it compare to artificial neural networks?',
    answer:
      'Reservoir computing requires nonlinear mixing of inputs to project them into a high-dimensional space. Physical systems (optical, magnetic, mechanical) provide this nonlinearity naturally, whereas digital networks must explicitly compute nonlinear activation functions.',
  },

  // --- Photonic Reservoirs ---
  {
    id: 'phys-4',
    question:
      'How does a semiconductor optical amplifier (SOA) act as a reservoir computing node?',
    answer:
      'An SOA exhibits nonlinear gain saturation and carrier-density dynamics with memory on picosecond timescales. When driven by modulated optical input, its output depends nonlinearly on both the current input and recent input history, fulfilling the reservoir requirements.',
  },
  {
    id: 'phys-5',
    question:
      'What is a delay-line photonic reservoir, and why does a single nonlinear node suffice?',
    answer:
      'A delay-line reservoir feeds the output of a single nonlinear node (e.g., a Mach-Zehnder modulator) back through a fiber loop with a fixed delay. Time-multiplexing creates virtual nodes along the loop, so one physical node emulates hundreds of interconnected reservoir nodes.',
  },
  {
    id: 'phys-6',
    question:
      'What processing speeds have photonic delay-line reservoirs demonstrated, and why?',
    answer:
      'Photonic reservoirs have reached processing rates exceeding 1 million words per second for speech recognition tasks. This is because the virtual node spacing can be as short as tens of picoseconds, set by the bandwidth of electro-optic modulators and photodetectors.',
  },
  {
    id: 'phys-7',
    question:
      'In a fiber-optic reservoir implementation, what role does chromatic dispersion play?',
    answer:
      'Chromatic dispersion causes different wavelength components of the input signal to travel at different speeds through the fiber, effectively mixing temporal features across timescales. This adds a form of fading memory and nonlinear interaction that enriches the reservoir state.',
  },
  {
    id: 'phys-8',
    question:
      'What is a key practical challenge when building integrated photonic reservoirs on a chip?',
    answer:
      'Fabrication imperfections cause random variations in waveguide coupling and resonator frequencies, making it hard to reproduce the exact reservoir dynamics across chips. Careful calibration or post-fabrication tuning is typically required.',
  },

  // --- Spintronic Reservoirs ---
  {
    id: 'phys-9',
    question:
      'How do spin waves in a ferromagnetic film provide reservoir computing capabilities?',
    answer:
      'Spin waves propagate through the film with nonlinear interactions (e.g., three- and four-magnon scattering) and interference, producing a rich, high-dimensional response to microwave input signals. The film\'s magnetization dynamics naturally implement fading memory.',
  },
  {
    id: 'phys-10',
    question:
      'What property of magnetic materials makes them particularly suited as reservoirs for time-series tasks?',
    answer:
      'Magnetic materials exhibit hysteresis and damped precessional dynamics, giving them an intrinsic short-term memory. The timescale of this memory can be tuned by adjusting the applied magnetic field strength or the material\'s damping constant.',
  },
  {
    id: 'phys-11',
    question:
      'What advantage do nanoscale spintronic reservoirs offer over bulk magnetic film implementations?',
    answer:
      'Nanoscale devices like spin-torque nano-oscillators can be fabricated in dense arrays using standard CMOS-compatible processes, enabling compact, low-power reservoir networks that could be integrated directly alongside conventional electronics.',
  },

  // --- Mechanical Reservoirs ---
  {
    id: 'phys-12',
    question:
      'How does a mass-spring network function as a reservoir computer?',
    answer:
      'Input forces are applied to one or more masses, and the resulting displacements of all masses form the reservoir state. Nonlinear springs and damping provide the required nonlinearity and fading memory, while the network\'s complex mode structure gives high dimensionality.',
  },
  {
    id: 'phys-13',
    question:
      'What is "soft body computing" in the context of mechanical reservoir computing?',
    answer:
      'Soft body computing uses the continuous deformation dynamics of compliant materials (silicone, hydrogels, octopus-like arms) as a computational reservoir. Sensor readings from multiple points on the body serve as the high-dimensional reservoir state for a linear readout.',
  },
  {
    id: 'phys-14',
    question:
      'Why are compliant mechanisms attractive for embodied reservoir computing in robotics?',
    answer:
      'A robot\'s own flexible body can serve as the reservoir, merging sensing, computation, and actuation into one structure. This eliminates the need for a separate processor to model body dynamics, reducing latency and exploiting the body\'s natural physics for control tasks.',
  },

  // --- Quantum Hardware Platforms ---
  {
    id: 'phys-15',
    question:
      'Name three quantum hardware platforms that have been explored for quantum reservoir computing.',
    answer:
      'Superconducting circuits (transmon qubits), nuclear magnetic resonance (NMR) spin ensembles, and photonic quantum systems (e.g., boson sampling networks) have all been used as quantum reservoir substrates.',
  },
  {
    id: 'phys-16',
    question:
      'Why do quantum reservoirs require less stringent coherence times than universal quantum computers?',
    answer:
      'Reservoir computing only requires the system to maintain coherence long enough to process one input and read out the state. It does not need the deep, error-corrected gate sequences demanded by universal quantum algorithms, so moderate decoherence is tolerable.',
  },
  {
    id: 'phys-17',
    question:
      'How does the exponential growth of Hilbert space dimension benefit quantum reservoir computing?',
    answer:
      'With n qubits the reservoir state lives in a 2^n-dimensional Hilbert space, giving an exponentially large feature space for the linear readout. This can enable richer nonlinear mappings from far fewer physical components than a classical reservoir would need.',
  },
  {
    id: 'phys-18',
    question:
      'What is a major scalability challenge shared across most quantum reservoir platforms?',
    answer:
      'As the number of qubits grows, maintaining controllable inter-qubit coupling while suppressing unwanted cross-talk and decoherence becomes exponentially harder. Readout fidelity also degrades, limiting the usable dimension of the reservoir state.',
  },

  // --- Superconducting Circuits ---
  {
    id: 'phys-19',
    question:
      'How can a network of transmon qubits function as a quantum reservoir?',
    answer:
      'Input data is encoded as microwave pulses that drive selected transmons. The coupled qubits undergo complex entangling dynamics, and the resulting expectation values of local observables (measured via dispersive readout) serve as the reservoir features fed to a linear classifier.',
  },
  {
    id: 'phys-20',
    question:
      'What coupling architectures are commonly used for superconducting qubit reservoirs?',
    answer:
      'Fixed-frequency transmons with always-on capacitive coupling and tunable-coupler architectures are both used. Always-on coupling is simpler to fabricate, while tunable couplers allow the effective reservoir connectivity to be reconfigured for different tasks.',
  },
  {
    id: 'phys-21',
    question:
      'Why are superconducting circuits considered a near-term-friendly platform for quantum reservoir computing?',
    answer:
      'Current noisy intermediate-scale quantum (NISQ) superconducting processors already have tens to hundreds of qubits with sufficient coherence for reservoir-style single-step processing, and they leverage mature fabrication and control infrastructure developed for gate-based quantum computing.',
  },

  // --- NMR-Based Reservoirs ---
  {
    id: 'phys-22',
    question:
      'How does a liquid-state NMR system implement reservoir computing?',
    answer:
      'Radiofrequency pulses encode input into the collective spin state of molecules in solution. The nuclear spins interact through J-coupling, evolving under a complex Hamiltonian, and the resulting free-induction decay signal provides a rich, high-dimensional readout of the reservoir state.',
  },
  {
    id: 'phys-23',
    question:
      'What is a key limitation of NMR-based quantum reservoirs compared to superconducting or photonic platforms?',
    answer:
      'NMR signals come from thermal ensembles with exponentially small polarization, leading to very weak signal-to-noise ratios that worsen as the number of spins increases. This makes scaling to large, highly entangled reservoir states impractical with standard liquid-state NMR.',
  },

  // --- Challenges & Outlook ---
  {
    id: 'phys-24',
    question:
      'What are the main obstacles to deploying physical reservoir computers in real-world applications?',
    answer:
      'Device-to-device variability, sensitivity to environmental noise and temperature fluctuations, and lack of standardized benchmarks make it difficult to guarantee reproducible performance. Interfacing analog reservoir outputs with digital downstream systems also adds complexity.',
  },
  {
    id: 'phys-25',
    question:
      'What developments are most likely to advance physical reservoir computing in the near future?',
    answer:
      'Integrated photonic chips with on-chip readout, hybrid classical-quantum reservoir architectures, and automated optimization of physical hyperparameters (e.g., via differentiable simulations or Bayesian methods) are among the most promising directions for making physical reservoirs practical and scalable.',
  },
];
