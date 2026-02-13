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
      'A comprehensive introduction to quantum reservoir computing, from classical foundations to quantum implementations and current frontiers.',
    sections: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'recurrent-neural-networks', title: 'Recurrent Neural Networks' },
      { id: 'the-training-problem', title: 'The Training Problem' },
      { id: 'echo-state-networks', title: 'Echo State Networks' },
      { id: 'reservoir-computing-paradigm', title: 'The Reservoir Computing Paradigm' },
      { id: 'readout-layer', title: 'The Readout Layer' },
      { id: 'going-quantum', title: 'Going Quantum' },
      { id: 'quantum-systems-as-reservoirs', title: 'Quantum Systems as Reservoirs' },
      { id: 'input-encoding', title: 'Input Encoding Strategies' },
      { id: 'measurement-and-features', title: 'Measurement & Feature Extraction' },
      { id: 'time-series-prediction', title: 'Time Series Prediction' },
      { id: 'quantum-advantage', title: 'Quantum Advantage Arguments' },
      { id: 'physical-implementations', title: 'Physical Implementations' },
      { id: 'research-directions', title: 'Current Research Directions' },
    ],
  },
  {
    slug: '/echo-state',
    title: 'How Echo State Networks Work',
    shortTitle: 'Echo State Networks',
    description:
      'A detailed exploration of echo state networks: the echo state property, spectral radius, and practical reservoir design.',
    sections: [
      { id: 'esn-introduction', title: 'Introduction' },
      { id: 'esn-architecture', title: 'ESN Architecture' },
      { id: 'echo-state-property', title: 'The Echo State Property' },
      { id: 'spectral-radius', title: 'Spectral Radius' },
      { id: 'reservoir-design', title: 'Reservoir Design Principles' },
      { id: 'training-readout', title: 'Training the Readout' },
      { id: 'esn-applications', title: 'Applications' },
      { id: 'esn-limitations', title: 'Limitations & Extensions' },
    ],
  },
  {
    slug: '/physical-reservoirs',
    title: 'Physical Reservoir Computing',
    shortTitle: 'Physical Reservoirs',
    description:
      'From photonic circuits to nuclear spins: how physical systems can serve as powerful computational reservoirs.',
    sections: [
      { id: 'phys-introduction', title: 'Introduction' },
      { id: 'why-physical', title: 'Why Physical Reservoirs?' },
      { id: 'photonic-reservoirs', title: 'Photonic Reservoirs' },
      { id: 'spintronic-reservoirs', title: 'Spintronic Reservoirs' },
      { id: 'mechanical-reservoirs', title: 'Mechanical Reservoirs' },
      { id: 'quantum-hardware', title: 'Quantum Hardware Platforms' },
      { id: 'superconducting', title: 'Superconducting Circuits' },
      { id: 'nmr-reservoirs', title: 'NMR-Based Reservoirs' },
      { id: 'challenges-outlook', title: 'Challenges & Outlook' },
    ],
  },
];
