import { ReviewCard } from '@/lib/spaced-repetition';

export const physicalReservoirCards: ReviewCard[] = [
  {
    id: 'phys2-1',
    question: 'What is the main idea behind physical reservoir computing?',
    answer:
      'Use a real physical dynamical system as the reservoir instead of simulating one in software. Train only a lightweight readout on measured system states.',
  },
  {
    id: 'phys2-2',
    question: 'Why can physical reservoirs be faster than digital simulation?',
    answer:
      'Physical systems evolve in parallel at their native timescale. Digital simulation must compute each step numerically, which often adds latency.',
  },
  {
    id: 'phys2-3',
    question: 'Why are physical reservoirs often energy-efficient?',
    answer:
      'Computation is embedded in natural dynamics, so less energy is spent on explicit instruction execution and memory transfer. This is especially useful for edge inference.',
  },
  {
    id: 'phys2-4',
    question: 'What two properties must a physical substrate show to work as a reservoir?',
    answer:
      'It needs nonlinear transformation and fading memory. Without both, readout cannot reliably separate temporal input histories.',
  },
  {
    id: 'phys2-5',
    question: 'Why is calibration a major issue in physical reservoirs?',
    answer:
      'Real devices drift with temperature, fabrication variation, and aging. That changes internal dynamics and can invalidate a previously trained readout.',
  },
  {
    id: 'phys2-6',
    question: 'What is a "virtual node" in delay-based reservoirs?',
    answer:
      'A virtual node is a time slice of one physical nonlinear element sampled along a feedback delay. Many time slices emulate a larger recurrent network.',
  },
  {
    id: 'phys2-7',
    question: 'What is the core advantage of photonic reservoirs?',
    answer:
      'Photonic platforms can operate at very high bandwidth and low latency. They are strong candidates for real-time signal processing tasks.',
  },
  {
    id: 'phys2-8',
    question: 'How does a delay-line photonic reservoir compute?',
    answer:
      'Input drives a nonlinear optical element with delayed feedback. The transient optical states across delay taps form the reservoir features.',
  },
  {
    id: 'phys2-9',
    question: 'How do spintronic reservoirs process information?',
    answer:
      'They use magnetization and spin-wave dynamics as the nonlinear state evolution. External drives perturb the magnetic system, and readout captures the resulting temporal response.',
  },
  {
    id: 'phys2-10',
    question: 'How can mechanical systems function as reservoirs?',
    answer:
      'Their coupled oscillatory dynamics naturally encode temporal inputs in displacement and velocity states. Sensors on the body provide features for linear readout.',
  },
  {
    id: 'phys2-11',
    question: 'Why are quantum hardware platforms considered for physical reservoirs?',
    answer:
      'Quantum systems provide high-dimensional dynamics in small devices and expose unique correlation structures. They can serve as compact temporal feature generators.',
  },
  {
    id: 'phys2-12',
    question: 'What makes superconducting platforms practical for QRC prototyping?',
    answer:
      'They offer programmability, established control stacks, and accessible tooling. This accelerates rapid iteration on encoding, dynamics, and readout designs.',
  },
  {
    id: 'phys2-13',
    question: 'What is the "benchmarking gap" in physical reservoir computing?',
    answer:
      'Many studies use different tasks, preprocessing, and resource assumptions, making comparison difficult. Standardized benchmark suites are still maturing.',
  },
  {
    id: 'phys2-14',
    question: 'What is the near-term realistic outlook for physical reservoirs?',
    answer:
      'They are promising for niche high-speed or low-power temporal tasks where standard digital models are costly. Broad adoption depends on stronger standardization and reliability engineering.',
  },
];
