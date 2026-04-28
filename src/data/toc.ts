export interface TocSection {
  id: string;
  title: string;
}

export interface TocEssay {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  sections: TocSection[];
}

export const essays: TocEssay[] = [
  {
    slug: '/quantum-primer',
    title: 'Quantum Mechanics Basics',
    shortTitle: 'Quantum Mechanics Basics',
    description:
      'Essential quantum mechanics for reservoir computing: states, gates, measurement, density matrices, and open-system dynamics.',
    sections: [
      { id: 'qp-introduction', title: 'Introduction' },
      { id: 'qp-classical-vs-quantum', title: 'Classical vs Quantum' },
      { id: 'qp-bloch-sphere', title: 'The Bloch Sphere' },
      { id: 'qp-quantum-gates', title: 'Quantum Gates' },
      { id: 'qp-measurement', title: 'Measurement' },
      { id: 'qp-density-matrices', title: 'Density Matrices' },
      { id: 'qp-entanglement', title: 'Entanglement' },
      { id: 'qp-dynamics', title: 'Quantum Dynamics' },
      { id: 'qp-open-systems', title: 'Open Quantum Systems' },
      { id: 'qp-bridge', title: 'Bridge to Reservoir Computing' },
    ],
  },
  {
    slug: '/qrc',
    title: 'What is Quantum Reservoir Computing',
    shortTitle: 'What is Quantum Reservoir Computing',
    description:
      'A gentle path from static quantum feature maps and QELMs to temporal quantum reservoir computing.',
    sections: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'why-feature-maps', title: 'Why Feature Maps?' },
      { id: 'quantum-extreme-learning-machines', title: 'Quantum Extreme Learning Machines' },
      { id: 'static-quantum-features', title: 'Static Quantum Features' },
      { id: 'linear-separation', title: 'Linear Separation' },
      { id: 'from-static-to-time', title: 'From Static to Time' },
      { id: 'quantum-reservoir-computing', title: 'Quantum Reservoir Computing' },
      { id: 'prediction-task', title: 'A Simple Prediction Task' },
      { id: 'qelm-vs-qrc', title: 'QELM vs QRC' },
      { id: 'what-to-remember', title: 'What to Remember' },
    ],
  },
  {
    slug: '/echo-state',
    title: 'Why Go Quantum? From Classical to Quantum Reservoirs',
    shortTitle: 'Why Go Quantum? From Classical to Quantum Reservoirs',
    description:
      'From intuitive dynamics to full ESN mathematics, diagnostics, and design patterns for practical temporal learning.',
    sections: [
      { id: 'esn-introduction', title: 'Introduction' },
      { id: 'esn-architecture', title: 'ESN Architecture' },
      { id: 'echo-state-property', title: 'Echo State Property' },
      { id: 'spectral-radius', title: 'Spectral Radius' },
      { id: 'memory-vs-nonlinearity', title: 'Memory vs Nonlinearity' },
      { id: 'reservoir-design', title: 'Reservoir Design' },
      { id: 'training-readout', title: 'Training the Readout' },
      { id: 'diagnostics-and-metrics', title: 'Diagnostics and Metrics' },
      { id: 'esn-applications', title: 'Applications' },
      { id: 'esn-limitations', title: 'Limitations' },
      { id: 'esn-to-qrc-bridge', title: 'Bridge to QRC' },
    ],
  },
  {
    slug: '/physical-reservoirs',
    title: 'Physical Quantum Reservoirs',
    shortTitle: 'Physical Quantum Reservoirs',
    description:
      'A hardware-first guide to reservoirs in photonics, magnetics, mechanics, and quantum platforms with realistic constraints.',
    sections: [
      { id: 'phys-introduction', title: 'Introduction' },
      { id: 'why-physical', title: 'Why Physical Reservoirs?' },
      { id: 'photonic-reservoirs', title: 'Photonic Reservoirs' },
      { id: 'spintronic-reservoirs', title: 'Spintronic Reservoirs' },
      { id: 'mechanical-reservoirs', title: 'Mechanical Reservoirs' },
      { id: 'quantum-hardware', title: 'Quantum Hardware Platforms' },
      { id: 'superconducting', title: 'Superconducting Circuits' },
      { id: 'nmr-reservoirs', title: 'NMR Reservoirs' },
      { id: 'benchmarking-and-noise', title: 'Benchmarking and Noise' },
      { id: 'engineering-patterns', title: 'Engineering Patterns' },
      { id: 'challenges-outlook', title: 'Challenges and Outlook' },
    ],
  },
  {
    slug: '/measurement',
    title: 'Measurement and Readout',
    shortTitle: 'Measurement and Readout',
    description:
      'A measurement-first guide to observables, shot noise, backaction, readout design, and fair benchmarking of the measurement layer.',
    sections: [
      { id: 'measurement-introduction', title: 'Introduction' },
      { id: 'observables-and-povms', title: 'Observables and POVMs' },
      { id: 'shots-and-estimators', title: 'Shots and Estimators' },
      { id: 'backaction-and-sequences', title: 'Backaction and Sequences' },
      { id: 'measurement-for-reservoirs', title: 'Measurement for Reservoirs' },
      { id: 'benchmarking-measurement', title: 'Benchmarking Measurement' },
      { id: 'synthesis', title: 'Synthesis' },
    ],
  },
];
