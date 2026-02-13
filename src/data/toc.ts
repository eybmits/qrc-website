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
    slug: '/qrc',
    title: 'Quantum Reservoir Computing for the Very Curious',
    shortTitle: 'Quantum RC',
    description:
      'A full-path introduction to quantum reservoir computing: intuition first, mathematics next, and implementation details last.',
    sections: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'recurrent-neural-networks', title: 'Recurrent Neural Networks' },
      { id: 'the-training-problem', title: 'The Training Problem' },
      { id: 'echo-state-networks', title: 'Echo State Networks' },
      { id: 'reservoir-computing-paradigm', title: 'Reservoir Computing Paradigm' },
      { id: 'readout-layer', title: 'Readout Layer and Ridge Regression' },
      { id: 'going-quantum', title: 'Going Quantum' },
      { id: 'quantum-systems-as-reservoirs', title: 'Quantum Systems as Reservoirs' },
      { id: 'input-encoding', title: 'Input Encoding' },
      { id: 'measurement-and-features', title: 'Measurement and Features' },
      { id: 'time-series-prediction', title: 'Time-Series Workflow' },
      { id: 'quantum-advantage', title: 'Quantum Advantage Claims' },
      { id: 'physical-implementations', title: 'Hardware Implementations' },
      { id: 'research-directions', title: 'Research Directions' },
    ],
  },
  {
    slug: '/echo-state',
    title: 'How Echo State Networks Work',
    shortTitle: 'Echo State Networks',
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
    title: 'Physical Reservoir Computing',
    shortTitle: 'Physical Reservoirs',
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
];
